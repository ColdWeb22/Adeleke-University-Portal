import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

// Hook for fetching lecturer data with caching
export function useLecturer() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['lecturer', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('lecturers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
}

// Hook for fetching lecturer's courses
export function useLecturerCourses(lecturerId: string | undefined) {
  return useQuery({
    queryKey: ['lecturer-courses', lecturerId],
    queryFn: async () => {
      if (!lecturerId) return [];
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('lecturer_id', lecturerId as string);

      if (error) throw error;
      return data || [];
    },
    enabled: !!lecturerId,
  });
}

// Hook for fetching students enrolled in lecturer's courses
export function useLecturerStudents(lecturerId: string | undefined) {
  return useQuery({
    queryKey: ['lecturer-students', lecturerId],
    queryFn: async () => {
      if (!lecturerId) return [];
      
      // First get lecturer's courses
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('id')
        .eq('lecturer_id', lecturerId as string);

      if (coursesError) throw coursesError;

      const courseIds = (courses as any)?.map((c: any) => c.id) || [];

      if (courseIds.length === 0) return [];

      // Then get students enrolled in those courses
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          student:students(
            *,
            profile:profiles(full_name, email)
          ),
          course:courses(code, title)
        `)
        .in('course_id', courseIds)
        .eq('status', 'enrolled');

      if (error) throw error;

      // Transform data to unique students
      const uniqueStudents = data?.reduce((acc: any[], enrollment: any) => {
        const existingStudent = acc.find(s => s.id === enrollment.student.id);
        if (!existingStudent) {
          acc.push({
            ...enrollment.student,
            courses: [enrollment.course],
          });
        } else {
          existingStudent.courses.push(enrollment.course);
        }
        return acc;
      }, []);

      return uniqueStudents || [];
    },
    enabled: !!lecturerId,
    staleTime: 3 * 60 * 1000, // Student list stays fresh for 3 minutes
  });
}

// Hook for fetching grades for a specific course
export function useCourseGrades(courseId: string | undefined) {
  return useQuery({
    queryKey: ['course-grades', courseId],
    queryFn: async () => {
      if (!courseId) return [];
      
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          student:students(
            *,
            profile:profiles(full_name, email)
          ),
          grade:grades(*)
        `)
        .eq('course_id', courseId as string)
        .eq('status', 'enrolled');

      if (error) throw error;
      return data || [];
    },
    enabled: !!courseId,
  });
}

// Hook for updating grades with automatic cache updates
export function useUpdateGrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      enrollmentId,
      courseId,
      scores,
    }: {
      enrollmentId: string;
      courseId?: string;
      scores: {
        midterm_score?: number;
        assignment_score?: number;
        final_score?: number;
        letter_grade?: string;
        grade_point?: number;
      };
    }) => {
      // Check if grade exists
      const { data: existingGrade } = await supabase
        .from('grades')
        .select('id')
        .eq('enrollment_id', enrollmentId)
        .single();

      let result;
      if (existingGrade) {
        // Update existing grade
        result = await (supabase as any)
          .from('grades')
          .update(scores)
          .eq('enrollment_id', enrollmentId)
          .select()
          .single();
      } else {
        // Insert new grade
        result = await supabase
          .from('grades')
          .insert({
            enrollment_id: enrollmentId,
            ...scores,
          } as any)
          .select()
          .single();
      }

      if (result.error) throw result.error;
      return { data: result.data, courseId };
    },
    onSuccess: (result) => {
      // Invalidate related queries
      if (result.courseId) {
        queryClient.invalidateQueries({ queryKey: ['course-grades', result.courseId] });
      }
      queryClient.invalidateQueries({ queryKey: ['grades'] });
    },
  });
}
