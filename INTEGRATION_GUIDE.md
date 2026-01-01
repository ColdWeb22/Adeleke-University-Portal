# Integration Guide: Using Supabase Hooks and Paystack

This document explains how to integrate real data fetching and payments into your components once you've configured Supabase and Paystack credentials.

## Prerequisites

1. `.env.local` file with:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_your-key
   ```

2. Database schema created (run `supabase/migrations/001_initial_schema.sql`)

## Using Supabase Hooks

### For Student Components

```tsx
import { useStudent, useEnrollments, useGrades } from '../hooks/useSupabase';

function StudentDashboard() {
  const { student, loading, error } = useStudent();
  const { enrollments } = useEnrollments(student?.id);
  const { grades } = useGrades(student?.id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome, {student?.profile?.full_name}</h1>
      <p>Matric: {student?.matric_number}</p>
      <p>CGPA: {student?.cgpa}</p>
      {/* Use enrollments and grades data */}
    </div>
  );
}
```

### Available Student Hooks

- `useStudent()` - Get current student's data
- `useEnrollments(studentId)` - Get student's enrolled courses
- `useGrades(studentId)` - Get student's grades with course details
- `useCourses(level?, department?)` - Get available courses
- `usePayments(studentId)` - Get payment history
- `useAnnouncements()` - Get recent announcements
- `useTimetable(courseIds)` - Get timetable for courses
- `useEnrollCourse()` - Enroll in a course (returns `enroll` function)

### For Lecturer Components

```tsx
import { useLecturer, useLecturerCourses, useLecturerStudents } from '../hooks/useLecturerData';

function LecturerDashboard() {
  const { lecturer } = useLecturer();
  const { courses } = useLecturerCourses(lecturer?.id);
  const { students } = useLecturerStudents(lecturer?.id);

  return (
    <div>
      <h1>Welcome, {lecturer?.title} {lecturer?.profile?.full_name}</h1>
      <p>Teaching {courses?.length} courses</p>
      <p>Total Students: {students?.length}</p>
    </div>
  );
}
```

### Available Lecturer Hooks

- `useLecturer()` - Get current lecturer's data
- `useLecturerCourses(lecturerId)` - Get courses taught by lecturer
- `useLecturerStudents(lecturerId)` - Get students enrolled in lecturer's courses
- `useCourseGrades(courseId)` - Get all grades for a course
- `useUpdateGrade()` - Update student grades (returns `updateGrade` function)

### Example: Updating Grades

```tsx
import { useUpdateGrade } from '../hooks/useLecturerData';

function GradingForm({ enrollmentId }) {
  const { updateGrade, loading, error } = useUpdateGrade();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await updateGrade(enrollmentId, {
      midterm_score: 30,
      assignment_score: 20,
      final_score: 45,
      letter_grade: 'A',
      grade_point: 5.0
    });

    if (!error) {
      alert('Grade updated successfully!');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Using Paystack Payment Widget

### Basic Usage

```tsx
import PaymentWidget from '../components/PaymentWidget';
import { useStudent } from '../hooks/useSupabase';
import { useAuth } from '../contexts/AuthContext';

function FinancialsPage() {
  const { user } = useAuth();
  const { student } = useStudent();
  const [showPayment, setShowPayment] = useState(false);

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    // Refresh payments list
  };

  return (
    <div>
      <h1>Outstanding Balance: ₦250,000</h1>
      <button onClick={() => setShowPayment(true)}>Pay Now</button>

      {showPayment && (
        <PaymentWidget
          studentId={student.id}
          studentEmail={user.email}
          amount={250000}
          description="Tuition Fee - First Semester 2023/2024"
          paymentType="tuition"
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}
```

### Payment Widget Props

| Prop | Type | Description |
|------|------|-------------|
| `studentId` | string | Student's database ID |
| `studentEmail` | string | Student's email for Paystack |
| `amount` | number | Amount in Naira (e.g., 250000) |
| `description` | string | Description of payment |
| `paymentType` | 'tuition' \| 'hostel' \| 'library' \| 'other' | Type of payment |
| `onSuccess` | function | Called after successful payment |
| `onClose` | function | Called when payment modal closes |

### Fetching Payment History

```tsx
import { usePayments } from '../hooks/useSupabase';

function PaymentHistory({ studentId }) {
  const { payments, loading } = usePayments(studentId);

  return (
    <div>
      {payments.map(payment => (
        <div key={payment.id}>
          <span>{payment.description}</span>
          <span>₦{payment.amount.toLocaleString()}</span>
          <span>{payment.status}</span>
        </div>
      ))}
    </div>
  );
}
```

## Example: Complete Student Dashboard Integration

```tsx
import { useStudent, useEnrollments, useGrades, usePayments } from '../hooks/useSupabase';

export default function StudentDashboard() {
  const { student, loading, error } = useStudent();
  const { enrollments } = useEnrollments(student?.id);
  const { grades } = useGrades(student?.id);
  const { payments } = usePayments(student?.id);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const outstandingBalance = payments
    ?.filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0) || 0;

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <h1 className="text-3xl font-bold">
        Welcome, {student.profile?.full_name}!
      </h1>
      
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <StatCard title="CGPA" value={student.cgpa.toFixed(2)} />
        <StatCard title="Enrolled Courses" value={enrollments.length} />
        <StatCard 
          title="Outstanding Balance" 
          value={`₦${outstandingBalance.toLocaleString()}`} 
        />
      </div>

      {/* Enrolled Courses */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">My Courses</h2>
        <div className="grid grid-cols-2 gap-4">
          {enrollments.map(enrollment => (
            <CourseCard 
              key={enrollment.id}
              code={enrollment.course.code}
              title={enrollment.course.title}
              units={enrollment.course.units}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
```

## Testing Without Real Data

The hooks handle missing data gracefully:
- They return `loading: true` while fetching
- They return empty arrays `[]` if no data exists
- They set `error` if something fails

This means your UI will work even without real data, just showing empty states.

## Notes

- All hooks automatically refetch when dependencies change
- Hooks respect Row Level Security policies
- Error handling is built-in
- Loading states are provided for better UX

## Next Steps

1. Add environment variables to `.env.local`
2. Run database migration in Supabase
3. Create test data or sign up test users
4. Replace mock data in components with hooks
5. Test payment flow with Paystack test cards
