import { z } from 'zod';

// ============================================
// Authentication Schemas
// ============================================

export const signupSchema = z.object({
    fullName: z
        .string()
        .min(2, 'Full name must be at least 2 characters')
        .max(100, 'Full name is too long')
        .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

    email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required')
        .toLowerCase(),

    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password is too long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),

    role: z.enum(['student', 'lecturer'], {
        message: 'Please select a role',
    }),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required')
        .toLowerCase(),

    password: z
        .string()
        .min(1, 'Password is required'),
});

export const resetPasswordSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .min(1, 'Email is required')
        .toLowerCase(),
});

// ============================================
// Course Registration Schemas
// ============================================

export const courseEnrollmentSchema = z.object({
    courseId: z.string().uuid('Invalid course ID'),
    semester: z.enum(['first', 'second'], {
        message: 'Please select a semester',
    }),
    academicYear: z
        .string()
        .regex(/^\d{4}\/\d{4}$/, 'Academic year must be in format YYYY/YYYY (e.g., 2023/2024)'),
});

// Validation for total credit units
export const creditLimitSchema = z.object({
    totalCredits: z
        .number()
        .min(1, 'You must register for at least one course')
        .max(24, 'Maximum credit units is 24 per semester'),

    requiredCourses: z
        .array(z.string())
        .min(1, 'You must register for all required courses'),
});

// ============================================
// Payment Schemas
// ============================================

export const paymentSchema = z.object({
    amount: z
        .number()
        .positive('Amount must be greater than 0')
        .max(10000000, 'Amount is too large')
        .multipleOf(0.01, 'Amount can have at most 2 decimal places'),

    description: z
        .string()
        .min(3, 'Description must be at least 3 characters')
        .max(200, 'Description is too long'),

    paymentType: z.enum(['tuition', 'hostel', 'library', 'other'], {
        message: 'Please select a payment type',
    }),
});

// ============================================
// Profile Update Schemas
// ============================================

export const profileUpdateSchema = z.object({
    fullName: z
        .string()
        .min(2, 'Full name must be at least 2 characters')
        .max(100, 'Full name is too long')
        .optional(),

    phone: z
        .string()
        .regex(/^(\+234|0)[789]\d{9}$/, 'Invalid Nigerian phone number')
        .optional()
        .or(z.literal('')),

    address: z
        .string()
        .min(10, 'Address must be at least 10 characters')
        .max(500, 'Address is too long')
        .optional()
        .or(z.literal('')),
});

// ============================================
// File Upload Schemas
// ============================================

export const fileUploadSchema = z.object({
    file: z
        .instanceof(File, { message: 'Please select a file' })
        .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
        .refine(
            (file) => ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type),
            'Only PDF, JPEG, and PNG files are allowed'
        ),
});

export const avatarUploadSchema = z.object({
    avatar: z
        .instanceof(File, { message: 'Please select an image' })
        .refine((file) => file.size <= 2 * 1024 * 1024, 'Image size must be less than 2MB')
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
            'Only JPEG, PNG, and WebP images are allowed'
        ),
});

// ============================================
// Grade Entry Schemas (for lecturers)
// ============================================

export const gradeEntrySchema = z.object({
    midtermScore: z
        .number()
        .min(0, 'Score cannot be negative')
        .max(30, 'Midterm score cannot exceed 30')
        .optional(),

    assignmentScore: z
        .number()
        .min(0, 'Score cannot be negative')
        .max(20, 'Assignment score cannot exceed 20')
        .optional(),

    finalScore: z
        .number()
        .min(0, 'Score cannot be negative')
        .max(50, 'Final score cannot exceed 50')
        .optional(),
}).refine(
    (data) => {
        const total = (data.midtermScore || 0) + (data.assignmentScore || 0) + (data.finalScore || 0);
        return total <= 100;
    },
    {
        message: 'Total score cannot exceed 100',
        path: ['finalScore'],
    }
);

// ============================================
// TypeScript Types (exported for use in components)
// ============================================

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type CourseEnrollmentFormData = z.infer<typeof courseEnrollmentSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type FileUploadFormData = z.infer<typeof fileUploadSchema>;
export type GradeEntryFormData = z.infer<typeof gradeEntrySchema>;
