# Supabase Realtime Guide

Complete guide to using Supabase Realtime features for live notifications and updates.

## 🎯 What's Implemented

All realtime hooks are in `src/hooks/useRealtime.ts`:

✅ **Live Announcements** - Instant notifications when new announcements are posted  
✅ **Grade Updates** - Real-time alerts when grades are posted or updated  
✅ **Payment Confirmations** - Immediate notification when payment status changes  
✅ **Course Enrollment Count** - Live student count for courses  

---

## 🚀 Quick Start

### 1. Enable Realtime in Supabase (One-time setup)

1. Go to **Supabase Dashboard** → **Database** → **Replication**
2. Enable replication for the following tables:
   - ✅ `announcements`
   - ✅ `grades`
   - ✅ `payments`
   - ✅ `enrollments`

---

## 📡 How to Use

### Live Announcement Notifications

Add to any component:

```tsx
import { useAnnouncementNotifications } from '../hooks/useRealtime';

export default function StudentDashboard() {
  // Automatically shows toast when admin posts announcement
  useAnnouncementNotifications();

  return <div>Your content</div>;
}
```

**What it does:**
- Listens for new announcements
- Shows rich toast notification with title
- Provides "View" and "Dismiss" actions
- Plays notification sound
- Auto-dismisses after 8 seconds

---

### Grade Update Notifications

Add to student components:

```tsx
import { useGradeNotifications } from '../hooks/useRealtime';
import { useStudent } from '../hooks/useSupabase';

export default function StudentGrades() {
  const { data: student } = useStudent();
  
  // Automatically notifies when lecturer posts/updates grade
  useGradeNotifications(student?.id);

  return <div>Grades content</div>;
}
```

**What it does:**
- Listens for grade INSERT or UPDATE
- Shows course code, title, and score
- Displays letter grade (A, B, C, etc.)
- Provides "View Details" link to /grades
- Plays notification sound
- Auto-dismisses after 10 seconds

---

### Payment Confirmation Alerts

Add to financial components:

```tsx
import { usePaymentNotifications } from '../hooks/useRealtime';
import { useStudent } from '../hooks/useSupabase';

export default function Financials() {
  const { data: student } = useStudent();
  
  // Notifies when payment status changes to success
  usePaymentNotifications(student?.id);

  return <div>Payment content</div>;
}
```

**What it does:**
- Listens for payment status updates
- Only notifies on `pending` → `success`
- Shows amount, payment type, and description
- Provides "View Receipt" link
- Plays notification sound
- Auto-dismisses after 10 seconds

---

### Real-time Course Enrollment Count

Add to course listing:

```tsx
import { useCourseEnrollmentCount } from '../hooks/useRealtime';

function CourseCard({ course }: { course: any }) {
  const { count, loading } = useCourseEnrollmentCount(course.id);

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p className="text-gray-400">
        {loading ? 'Loading...' : `${count} students enrolled`}
      </p>
      {/* Count updates live as students enroll */}
    </div>
  );
}
```

**What it does:**
- Fetches initial enrollment count
- Subscribes to enrollment changes
- Automatically updates when students enroll/drop
- Shows loading state

---

## 🔔 Notification Customization

### Disable Sound

Edit `useRealtime.ts` and comment out:

```tsx
// playNotificationSound(); // ← Comment this line
```

### Change Toast Duration

```tsx
toast.custom((t) => (
  // ... your toast content
), {
  duration: 5000, // Change from 8000/10000 to 5000ms
});
```

### Custom Toast Styling

All toasts match your dark theme. Modify the tailwind classes in `useRealtime.ts`:

```tsx
<div className="bg-[#0f1021] border border-blue-500/20 rounded-lg p-4">
  {/* Change colors here */}
</div>
```

---

## 📱 Complete Integration Example

**StudentDashboard.tsx:**

```tsx
import { useStudent } from '../hooks/useSupabase';
import {
  useAnnouncementNotifications,
  useGradeNotifications,
  usePaymentNotifications,
} from '../hooks/useRealtime';

export default function StudentDashboard() {
  const { data: student } = useStudent();

  // Enable all realtime features
  useAnnouncementNotifications();
  useGradeNotifications(student?.id);
  usePaymentNotifications(student?.id);

  return (
    <div>
      <h1>Welcome, {student?.full_name}!</h1>
      {/* Your dashboard content */}
    </div>
  );
}
```

**CourseCatalog.tsx:**

```tsx
import { useCourses } from '../hooks/useSupabase';
import { useCourseEnrollmentCount } from '../hooks/useRealtime';

export default function CourseCatalog() {
  const { data: courses } = useCourses();

  return (
    <div className="grid grid-cols-2 gap-4">
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

function CourseCard({ course }: any) {
  const { count, loading } = useCourseEnrollmentCount(course.id);

  return (
    <div className="bg-[#0f1021] rounded-lg p-6">
      <h3 className="font-bold text-white">{course.code}</h3>
      <p className="text-gray-400">{course.title}</p>
      <div className="flex items-center gap-2 mt-4">
        <div className="text-sm text-gray-400">
          {loading ? (
            'Counting students...'
          ) : (
            <>
              <span className="text-blue-400 font-semibold">{count}</span>
              /{course.max_capacity || 100} enrolled
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 🛡️ How It Works

### Subscription Pattern

Each hook:
1. Creates a channel with unique name
2. Subscribes to `postgres_changes` event
3. Filters by specific table and optionally row
4. Cleans up subscription on unmount

```tsx
const channel = supabase
  .channel('unique-channel-name')
  .on('postgres_changes', {
    event: 'INSERT', // or 'UPDATE', 'DELETE', '*'
    schema: 'public',
    table: 'table_name',
    filter: 'column=eq.value', // Optional
  }, (payload) => {
    // Handle change
  })
  .subscribe();

// Cleanup
return () => {
  supabase.removeChannel(channel);
};
```

### Security

Realtime respects your RLS policies:
- Students only see their own grade updates
- Payments filtered by `student_id`
- Announcements visible to all authenticated users

**No extra security needed!** ✅

---

## 🔧 Troubleshooting

### Notifications not showing?

1. **Check Replication is enabled**
   - Dashboard → Database → Replication
   - Enable for the relevant table

2. **Check browser permissions**
   - Some browsers block notifications
   - Check browser console for errors

3. **Check subscription status**
   ```tsx
   useEffect(() => {
     const channel = supabase.channel('test');
     
     channel.on('system', {}, (status) => {
       console.log('Channel status:', status);
     });
   }, []);
   ```

### Count not updating?

- Verify RLS policy allows reading enrollments
- Check browser console for Supabase errors
- Ensure `course_id` is correct UUID

### Sound not playing?

- User must interact with page first (browser requirement)
- Check browser console for Audio API errors
- Disable sound if not needed (see customization above)

---

## 📊 Performance

**Optimizations:**
- Each hook subscribes only to relevant data
- Automatic cleanup prevents memory leaks
- Debounced updates for course counts
- Minimal payload transfers

**Bandwidth usage:**
- ~1KB per notification message
- Count updates: ~500 bytes
- No polling! (uses WebSocket)

---

## 🎯 When to Use

✅ **Use Realtime for:**
- Critical updates (grades, payments)
- Live dashboards (enrollment counts)
- Collaborative features
- Real-time messaging

❌ **Don't use for:**
- Bulk data fetching (use React Query)
- Static content
- Historical data

---

## 🚀 Quick Enable

Add to your main layout or dashboard:

```tsx
// Enable all notifications at once
import {
  useAnnouncementNotifications,
  useGradeNotifications,
  usePaymentNotifications
} from '../hooks/useRealtime';
import { useStudent } from '../hooks/useSupabase';

function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: student } = useStudent();
  
  // Global realtime features
  useAnnouncementNotifications();
  useGradeNotifications(student?.id);
  usePaymentNotifications(student?.id);
  
  return <div>{children}</div>;
}
```

---

**Your realtime features are ready! Enable replication in Supabase and start using the hooks.** 🎉
