# Error Handling & UX Guide

This guide shows how to use the new error handling and UX features in your project.

## 🛡️ Error Boundary

**Already set up!** The entire app is wrapped in an ErrorBoundary that catches all React component errors.

### What it does:
- Catches JavaScript errors anywhere in the component tree
- Displays a user-friendly error screen
- Logs errors to console (dev) or monitoring service (production)
- Allows users to retry or go home

### When it triggers:
```tsx
// Example of code that would trigger the boundary
function BuggyComponent() {
  throw new Error('Something went wrong!');
  return <div>Hello</div>;
}
```

User sees a nice error screen instead of a blank page! ✅

---

## 🔔 Toast Notifications

Use `toast` from `sonner` for success/error/info messages.

### Basic Usage:

```tsx
import { toast } from 'sonner';

// Success notification
toast.success('Course enrolled successfully!');

// Error notification
toast.error('Failed to save changes');

// Info notification
toast.info('Please verify your email');

// Loading toast (updates when done)
const promise = fetch('/api/data');
toast.promise(promise, {
  loading: 'Saving...',
  success: 'Saved!',
  error: 'Failed to save',
});
```

### In Your Components:

```tsx
import { toast } from 'sonner';
import { useEnrollCourse } from '../hooks/useSupabase';

function CourseRegistration() {
  const enrollMutation = useEnrollCourse();

  const handleEnroll = async () => {
    try {
      await enrollMutation.mutateAsync({...});
      toast.success('Successfully enrolled in course!');
    } catch (error) {
      toast.error('Failed to enroll. Please try again.');
    }
  };

  return <button onClick={handleEnroll}>Enroll</button>;
}
```

### Advanced Options:

```tsx
// Toast with action button
toast.success('Grade updated', {
  action: {
    label: 'View',
    onClick: () => navigate('/grades'),
  },
});

// Custom duration
toast.error('Invalid password', {
  duration: 5000, // 5 seconds
});

// Rich content
toast.custom((t) => (
  <div className="bg-blue-500 p-4 rounded">
    Custom toast content!
  </div>
));
```

---

## ⏳ Skeleton Loaders

Replace "Loading..." text with beautiful skeleton loaders!

### Available Skeletons:

```tsx
import {
  Skeleton,
  DashboardCardSkeleton,
  TableRowSkeleton,
  CourseCardSkeleton,
  ListItemSkeleton,
  PageSkeleton,
} from '../components/Skeleton';
```

### Usage Examples:

#### Dashboard Cards:
```tsx
function StudentDashboard() {
  const { data, isLoading } = useStudent();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
    );
  }

  return <div>{/* Real content */}</div>;
}
```

#### Table Rows:
```tsx
function GradesTable() {
  const { data: grades, isLoading } = useGrades(studentId);

  return (
    <table>
      <thead>...</thead>
      <tbody>
        {isLoading ? (
          <>
            <TableRowSkeleton columns={5} />
            <TableRowSkeleton columns={5} />
            <TableRowSkeleton columns={5} />
          </>
        ) : (
          grades?.map(grade => <tr key={grade.id}>...</tr>)
        )}
      </tbody>
    </table>
  );
}
```

#### Course Cards:
```tsx
function CourseCatalog() {
  const { data: courses, isLoading } = useCourses();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return <div>{ /* Real courses */ }</div>;
}
```

#### Custom Skeleton:
```tsx
// Create your own shapes
<Skeleton className="w-full h-40 rounded-lg mb-4" />
<Skeleton className="w-3/4 h-6 rounded mb-2" />
<Skeleton className="w-1/2 h-4 rounded" />
```

---

## 📡 Offline Detection

**Already set up!** The `<OfflineIndicator />` component automatically appears when internet connection is lost.

### What it does:
- Monitors internet connectivity
- Shows orange banner when offline
- Shows green "Back Online" message when reconnected
- Auto-hides after 3 seconds when connection restored

### Manual Usage (if needed):

```tsx
import { useOnlineStatus } from '../components/OfflineIndicator';

function MyComponent() {
  const isOnline = useOnlineStatus();

  return (
    <div>
      {!isOnline && (
        <div className="text-orange-400">
          You're offline. Some features may not work.
        </div>
      )}
      {/* Rest of component */}
    </div>
  );
}
```

---

## 🔄 Retry Mechanisms

**Already configured!** React Query automatically retries failed requests.

### Current Settings:
- **Queries**: Retry up to 2 times (no retry for 404/401 errors)
- **Mutations**: Retry once
- **Retry Delay**: Exponential backoff (1s, 2s, 4s, etc.)
- **Network Mode**: Only retry when online

### Smart Retry Logic:
```tsx
// Automatic - no code needed!
const { data, isError, isFetching } = useStudent();

// Query retries automatically if:
// ✅ Network request fails
// ✅ Server returns 500 error
// ✅ Timeout occurs

// Query does NOT retry if:
// ❌ 404 Not Found
// ❌ 401 Unauthorized
// ❌ User is offline
```

### Manual Retry:
```tsx
const { data, refetch, isError } = useStudent();

// Let user manually retry
{isError && (
  <button onClick={() => refetch()}>
    Try Again
  </button>
)}
```

---

## 📋 Complete Example

Here's a component using all features:

```tsx
import { toast } from 'sonner';
import { useStudent } from '../hooks/useSupabase';
import { DashboardCardSkeleton } from '../components/Skeleton';
import { useOnlineStatus } from '../components/OfflineIndicator';

export default function StudentDashboard() {
  const isOnline = useOnlineStatus();
  const { data: student, isLoading, isError, error, refetch } = useStudent();

  // Show loading skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
    );
  }

  // Show error state with retry
  if (isError) {
    toast.error('Failed to load dashboard');
    return (
      <div className="text-center">
        <p className="text-red-400">Error: {error.message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  // Show offline warning
  if (!isOnline) {
    toast.warning('You are offline. Data may be outdated.');
  }

  // Render actual content
  return (
    <div>
      <h1>Welcome, {student.full_name}!</h1>
      {/* Dashboard content */}
    </div>
  );
}
```

---

## 🎯 Best Practices

1. **Use skeletons instead of "Loading..."** - Better UX
2. **Toast for actions** - Success/error feedback on user actions
3. **Let React Query handle retries** - Don't manually retry unless needed
4. **Error boundaries catch big issues** - They're your safety net
5. **Check network status for critical actions** - Warn users before saving offline

---

## 🚨 Error Recovery Strategies

### Level 1: Component Error (React Query)
- **Caught by**: React Query's error handling
- **User sees**: Error message, retry button
- **Action**: User can retry or navigate away

### Level 2: Render Error (Error Boundary)
- **Caught by**: ErrorBoundary component
- **User sees**: Full error screen with details
- **Action**: User can reload page or go home

### Level 3: Network Error (Offline Detection)
- **Caught by**: OfflineIndicator
- **User sees**: "No Internet" banner
- **Action**: Automatic retry when back online

All three work together to create a resilient app! 🛡️
