import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

// Hook for fetching student data with caching
export function useStudent() {
    const { user } = useAuth();

    return useQuery({
        queryKey: ['student', user?.id],
        queryFn: async () => {
            if (!user?.id) return null;

            const { data, error } = await supabase
                .from('students')
                .select('*')
                .eq('user_id', user.id as string)
                .single();

            if (error) throw error;
            return data;
        },
        enabled: !!user?.id,
    });
}

// Hook for fetching student enrollments with course details
export function useEnrollments(studentId: string | undefined) {
    return useQuery({
        queryKey: ['enrollments', studentId],
        queryFn: async () => {
            if (!studentId) return [];

            const { data, error } = await supabase
                .from('enrollments')
                .select(`
          *,
          course:courses(*)
        `)
                .eq('student_id', studentId as string)
                .eq('status', 'enrolled');

            if (error) throw error;
            return data || [];
        },
        enabled: !!studentId,
    });
}

// Hook for fetching student grades
export function useGrades(studentId: string | undefined) {
    return useQuery({
        queryKey: ['grades', studentId],
        queryFn: async () => {
            if (!studentId) return [];

            const { data, error } = await supabase
                .from('grades')
                .select(`
          *,
          enrollment:enrollments(
            *,
            course:courses(code, title, units)
          )
        `)
                .eq('enrollment.student_id', studentId as string);

            if (error) throw error;
            return data || [];
        },
        enabled: !!studentId,
    });
}

// Hook for fetching available courses
export function useCourses(level?: number, department?: string) {
    return useQuery({
        queryKey: ['courses', level, department],
        queryFn: async () => {
            let query = supabase.from('courses').select('*');

            if (level) query = query.eq('level', level);
            if (department) query = query.eq('department', department);

            const { data, error } = await query;

            if (error) throw error;
            return data || [];
        },
    });
}

// Hook for fetching student payments
export function usePayments(studentId: string | undefined) {
    return useQuery({
        queryKey: ['payments', studentId],
        queryFn: async () => {
            if (!studentId) return [];

            const { data, error } = await supabase
                .from('payments')
                .select('*')
                .eq('student_id', studentId as string)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        },
        enabled: !!studentId,
    });
}

// Hook for fetching announcements with caching
export function useAnnouncements() {
    return useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('announcements')
                .select('*')
                .order('published_at', { ascending: false })
                .limit(10);

            if (error) throw error;
            return data || [];
        },
        staleTime: 2 * 60 * 1000, // Announcements are fresh for 2 minutes
    });
}

// Hook for fetching timetable
export function useTimetable(courseIds: string[]) {
    return useQuery({
        queryKey: ['timetable', courseIds],
        queryFn: async () => {
            if (courseIds.length === 0) return [];

            const { data, error } = await supabase
                .from('timetable')
                .select(`
          *,
          course:courses(code, title)
        `)
                .in('course_id', courseIds);

            if (error) throw error;
            return data || [];
        },
        enabled: courseIds.length > 0,
    });
}

// Hook for enrolling in a course with optimistic updates
export function useEnrollCourse() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            studentId,
            courseId,
            semester,
            academicYear,
        }: {
            studentId: string;
            courseId: string;
            semester: string;
            academicYear: string;
        }) => {
            const { data, error } = await supabase
                .from('enrollments')
                .insert({
                    student_id: studentId,
                    course_id: courseId,
                    semester: semester,
                    academic_year: academicYear,
                    status: 'enrolled' as const,
                } as any)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: (_, variables) => {
            // Invalidate and refetch enrollments after successful enrollment
            queryClient.invalidateQueries({ queryKey: ['enrollments', variables.studentId] });
            queryClient.invalidateQueries({ queryKey: ['timetable'] });
        },
    });
}
