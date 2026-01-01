// This file is auto-generated. You can generate it from your Supabase project
// by running: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    role: 'student' | 'lecturer' | 'admin'
                    full_name: string
                    email: string
                    phone: string | null
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    role: 'student' | 'lecturer' | 'admin'
                    full_name: string
                    email: string
                    phone?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    role?: 'student' | 'lecturer' | 'admin'
                    full_name?: string
                    email?: string
                    phone?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            students: {
                Row: {
                    id: string
                    user_id: string
                    matric_number: string
                    department: string
                    level: 100 | 200 | 300 | 400 | 500
                    cgpa: number
                    total_credits: number
                    status: 'active' | 'probation' | 'suspended' | 'graduated'
                    date_of_birth: string | null
                    address: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    matric_number: string
                    department: string
                    level: 100 | 200 | 300 | 400 | 500
                    cgpa?: number
                    total_credits?: number
                    status?: 'active' | 'probation' | 'suspended' | 'graduated'
                    date_of_birth?: string | null
                    address?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    matric_number?: string
                    department?: string
                    level?: 100 | 200 | 300 | 400 | 500
                    cgpa?: number
                    total_credits?: number
                    status?: 'active' | 'probation' | 'suspended' | 'graduated'
                    date_of_birth?: string | null
                    address?: string | null
                    created_at?: string
                }
            }
            courses: {
                Row: {
                    id: string
                    code: string
                    title: string
                    description: string | null
                    units: number
                    department: string
                    level: number
                    semester: 'first' | 'second' | null
                    lecturer_id: string | null
                    max_capacity: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    code: string
                    title: string
                    description?: string | null
                    units: number
                    department: string
                    level: number
                    semester?: 'first' | 'second' | null
                    lecturer_id?: string | null
                    max_capacity?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    code?: string
                    title?: string
                    description?: string | null
                    units?: number
                    department?: string
                    level?: number
                    semester?: 'first' | 'second' | null
                    lecturer_id?: string | null
                    max_capacity?: number
                    created_at?: string
                }
            }
            enrollments: {
                Row: {
                    id: string
                    student_id: string
                    course_id: string
                    semester: string
                    academic_year: string
                    status: 'enrolled' | 'dropped' | 'completed'
                    enrolled_at: string
                }
                Insert: {
                    id?: string
                    student_id: string
                    course_id: string
                    semester: string
                    academic_year: string
                    status?: 'enrolled' | 'dropped' | 'completed'
                    enrolled_at?: string
                }
                Update: {
                    id?: string
                    student_id?: string
                    course_id?: string
                    semester?: string
                    academic_year?: string
                    status?: 'enrolled' | 'dropped' | 'completed'
                    enrolled_at?: string
                }
            }
            grades: {
                Row: {
                    id: string
                    enrollment_id: string
                    midterm_score: number
                    assignment_score: number
                    final_score: number
                    total_score: number
                    letter_grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | null
                    grade_point: number | null
                    remarks: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    enrollment_id: string
                    midterm_score?: number
                    assignment_score?: number
                    final_score?: number
                    letter_grade?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | null
                    grade_point?: number | null
                    remarks?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    enrollment_id?: string
                    midterm_score?: number
                    assignment_score?: number
                    final_score?: number
                    letter_grade?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | null
                    grade_point?: number | null
                    remarks?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            payments: {
                Row: {
                    id: string
                    student_id: string
                    amount: number
                    currency: string
                    description: string
                    payment_type: 'tuition' | 'hostel' | 'library' | 'other' | null
                    status: 'pending' | 'success' | 'failed' | 'cancelled'
                    paystack_reference: string | null
                    paystack_access_code: string | null
                    payment_date: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    student_id: string
                    amount: number
                    currency?: string
                    description: string
                    payment_type?: 'tuition' | 'hostel' | 'library' | 'other' | null
                    status?: 'pending' | 'success' | 'failed' | 'cancelled'
                    paystack_reference?: string | null
                    paystack_access_code?: string | null
                    payment_date?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    student_id?: string
                    amount?: number
                    currency?: string
                    description?: string
                    payment_type?: 'tuition' | 'hostel' | 'library' | 'other' | null
                    status?: 'pending' | 'success' | 'failed' | 'cancelled'
                    paystack_reference?: string | null
                    paystack_access_code?: string | null
                    payment_date?: string | null
                    created_at?: string
                }
            }
            announcements: {
                Row: {
                    id: string
                    title: string
                    content: string
                    category: 'academic' | 'sports' | 'general' | 'urgent' | null
                    author_id: string | null
                    published_at: string
                    expires_at: string | null
                    is_pinned: boolean
                }
                Insert: {
                    id?: string
                    title: string
                    content: string
                    category?: 'academic' | 'sports' | 'general' | 'urgent' | null
                    author_id?: string | null
                    published_at?: string
                    expires_at?: string | null
                    is_pinned?: boolean
                }
                Update: {
                    id?: string
                    title?: string
                    content?: string
                    category?: 'academic' | 'sports' | 'general' | 'urgent' | null
                    author_id?: string | null
                    published_at?: string
                    expires_at?: string | null
                    is_pinned?: boolean
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
