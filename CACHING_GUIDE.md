# React Query Caching Guide

This project uses **React Query (TanStack Query)** for intelligent data caching and state management.

## What React Query Does

### Automatic Features
- ✅ **Smart Caching** - Data is cached for 5 minutes by default
- ✅ **Background Refetching** - Stale data is automatically updated
- ✅ **Deduplication** - Multiple components requesting the same data trigger only one fetch
- ✅ **Window Focus Refetching** - Data refreshes when you return to the tab
- ✅ **Network Status Handling** - Auto-retry on reconnection
- ✅ **Optimistic Updates** - UI updates immediately, syncs with server in background

## How It Works

### Queries (Data Fetching)
All `useQuery` hooks automatically cache data:

```tsx
import { useStudent, useEnrollments } from '../hooks/useSupabase';

function StudentDashboard() {
  // Data is automatically cached by student ID
  const { data: student, isLoading, error } = useStudent();
  const { data: enrollments } = useEnrollments(student?.id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{student?.full_name}</div>;
}
```

**Benefits:**
- If you navigate away and come back, data loads instantly from cache
- Data refetches in background if it's stale (>5 minutes old)
- Multiple components using the same hook share one request

### Mutations (Data Modification)
All `useMutation` hooks automatically update the cache:

```tsx
import { useEnrollCourse } from '../hooks/useSupabase';

function CourseRegistration() {
  const enrollMutation = useEnrollCourse();

  const handleEnroll = async () => {
    await enrollMutation.mutateAsync({
      studentId: 'xxx',
      courseId: 'yyy',
      semester: 'first',
      academicYear: '2023/2024',
    });
    // Cache is automatically refreshed!
  };

  return (
    <button 
      onClick={handleEnroll}
      disabled={enrollMutation.isPending}
    >
      {enrollMutation.isPending ? 'Enrolling...' : 'Enroll'}
    </button>
  );
}
```

**Benefits:**
- After enrolling in a course, your enrollment list auto-refreshes
- No need to manually refetch data
- UI updates feel instant

## Cache Configuration

### Global Settings
Located in `App.tsx`:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,        // 5 minutes
      gcTime: 10 * 60 * 1000,          // 10 minutes (cache retention)
      refetchOnWindowFocus: true,      // Refetch when tab regains focus
      refetchOnReconnect: true,        // Refetch when internet reconnects
      retry: 1,                        // Retry failed requests once
    },
  },
});
```

### Per-Query Overrides
Some queries have custom settings:

```tsx
// Announcements stay fresh for only 2 minutes (more dynamic data)
queryKey: ['announcements'],
staleTime: 2 * 60 * 1000
```

## Cache Keys

Each query has a unique cache key:

| Hook | Cache Key | Purpose |
|------|-----------|---------|
| `useStudent()` | `['student', userId]` | Student data by user |
| `useEnrollments(id)` | `['enrollments', studentId]` | Enrollments by student |
| `useGrades(id)` | `['grades', studentId]` | Grades by student |
| `useCourses()` | `['courses', level, dept]` | Available courses |
| `usePayments(id)` | `['payments', studentId]` | Payment history |
| `useAnnouncements()` | `['announcements']` | Latest announcements |
| `useTimetable(ids)` | `['timetable', courseIds]` | Class schedule |
| `useLecturer()` | `['lecturer', userId]` | Lecturer profile |
| `useLecturerCourses(id)` | `['lecturer-courses', lecturerId]` | Courses taught |
| `useLecturerStudents(id)` | `['lecturer-students', lecturerId]` | Students enrolled |
| `useCourseGrades(id)` | `['course-grades', courseId]` | Grades for course |

## Performance Impact

### Before React Query:
- Every component mount = new database query
- Navigating back = refetch all data
- No background updates
- Manual loading states everywhere

### After React Query:
- ✅ First mount fetches, rest use cache
- ✅ Instant page loads from cache
- ✅ Automatic background sync
- ✅ Built-in loading/error states

## Dev Tools

Press the **React Query DevTools** button (bottom-right in development) to:
- 🔍 See all cached queries
- ⏱️ Check query freshness
- 🔄 Monitor background refetches
- 🗑️ Manually invalidate cache

## Manual Cache Control

### Invalidate specific query:
```tsx
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// Force refetch of student data
queryClient.invalidateQueries({ queryKey: ['student', studentId] });
```

### Prefetch data:
```tsx
// Prefetch before user needs it
await queryClient.prefetchQuery({
  queryKey: ['courses'],
  queryFn: fetchCourses,
});
```

### Clear all cache:
```tsx
queryClient.clear();
```

## Best Practices

1. **Let React Query handle loading states** - Don't create custom loading state
2. **Trust the cache** - Don't manually refetch unless necessary
3. **Use mutation callbacks** - Let mutations auto-invalidate queries
4. **Keep query keys simple** - Use consistent naming
5. **Monitor DevTools** - Check for over-fetching or stale data

## Common Patterns

### Dependent Queries
```tsx
const { data: student } = useStudent();
const { data: enrollments } = useEnrollments(student?.id); // Waits for student
```

### Conditional Fetching
```tsx
const { data } = useCourses(level, department);
// Only fetches when level/department change
```

### Error Handling
```tsx
const { data, error, isError } = useStudent();

if (isError) {
  return <ErrorMessage error={error} />;
}
```

## Troubleshooting

**Data not updating?**
- Check if mutation calls `invalidateQueries`
- Verify cache keys match between query and invalidation

**Too many requests?**
- Increase `staleTime` for that query
- Check if `enabled` option is properly set

**DevTools not showing?**
- Only visible in development mode
- Check bottom-right corner for floating button

---

**TL;DR**: All data fetching now uses intelligent caching. Your app loads faster, uses less bandwidth, and feels more responsive!
