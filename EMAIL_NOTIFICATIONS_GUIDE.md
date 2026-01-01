# Email Notification System Guide

Complete guide to automated email notifications for your Adeleke University Portal.

## 🔔 Features Implemented

✅ **Payment Confirmations** - Auto-sent when payment succeeds  
✅ **Grade Notifications** - Auto-sent when grades are posted  
✅ **Enrollment Confirmations** - Auto-sent when student enrolls in course  
✅ **Deadline Reminders** - Manual/scheduled reminders  

---

## 🚀 Quick Setup

### Step 1: Get Email Service (Choose One)

#### Option A: Resend (Recommended - Easiest)

1. Sign up at [resend.com](https://resend.com) (Free: 100 emails/day)
2. Get your API key from Dashboard
3. Verify your domain (or use `onboarding@resend.dev` for testing)

#### Option B: Custom SMTP

Use your existing SMTP server (Gmail, SendGrid, etc.)

### Step 2: Deploy Edge Function

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy function
supabase functions deploy send-email
```

### Step 3: Set Environment Variables

In Supabase Dashboard → **Settings → Edge Functions**:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
SMTP_FROM_EMAIL=noreply@adeleke.edu.ng
```

### Step 4: Run Email Triggers SQL

Run this in **SQL Editor**:

```sql
-- Copy entire contents of:
supabase/email_triggers.sql
```

This creates database triggers that automatically send emails.

---

## 📧 How It Works

### Automatic Triggers

**1. Payment Confirmation** (Triggered when payment status → success)
```
User pays → Paystack confirms → Database updated → Email sent automatically
```

**2. Grade Notification** (Triggered when grade is posted)
```
Lecturer enters grade → Saves to database → Email sent to student
```

**3. Enrollment Confirmation** (Triggered on new enrollment)
```
Student registers for course → Enrollment created → Email sent immediately
```

### Manual Emails (Deadline Reminders)

```typescript
import { supabase } from './lib/supabase';

// Send deadline reminder
await supabase.functions.invoke('send-email', {
  body: {
    type: 'deadline_reminder',
    to: 'student@example.com',
    data: {
      student_name: 'John Doe',
      title: 'Course Registration Deadline',
      deadline: '2024-01-15',
      description: 'Please complete your course registration by this date.',
    },
  },
});
```

---

## 🎨 Email Templates

All emails are beautifully designed with:
- Gradient headers
- Responsive layout
- University branding
- Clear call-to-action

### Payment Confirmation
- ✓ Shows amount, payment type, reference
- ✓ Formatted with Naira symbol
- ✓ Professional invoice-style layout

### Grade Notification
- ✓ Large grade display (A, B, C, etc.)
- ✓ Shows score out of 100
- ✓ Course code and title

### Enrollment Confirmation
- ✓ Course details
- ✓ Semester and academic year
- ✓ Credit units

### Deadline Reminder
- ✓ Warning-style design
- ✓ Clear deadline date
- ✓ Custom description

---

## 🔧 Customization

### Change Email Sender Name

Edit `send-email/index.ts`:

```typescript
const SMTP_FROM_EMAIL = 'Adeleke University <noreply@adeleke.edu.ng>'
```

### Modify Email Templates

Edit the `generate*Email()` functions in `send-email/index.ts`:

```typescript
function generatePaymentConfirmationEmail(data: any): string {
  return `
    <div class="header" style="background: YOUR_COLOR;">
      <h1>Custom Header</h1>
    </div>
    <!-- Your custom HTML -->
  `
}
```

### Add New Email Type

1. Add type to EmailRequest interface:
```typescript
interface EmailRequest {
  type: 'payment_confirmation' | 'your_new_type'
  // ...
}
```

2. Add case in switch statement:
```typescript
case 'your_new_type':
  subject = 'Your Subject'
  html = generateYourEmail(data)
  break
```

3. Create template function:
```typescript
function generateYourEmail(data: any): string {
  return `<!-- Your HTML template -->`
}
```

---

## 📊 Testing

### Test Payment Email

```sql
-- Manually trigger in SQL Editor
UPDATE payments 
SET status = 'success' 
WHERE id = 'your-payment-id';
```

### Test Grade Email

```sql
-- Insert a test grade
INSERT INTO grades (enrollment_id, total_score, letter_grade)
VALUES ('enrollment-id', 85, 'A');
```

### Test Enrollment Email

```sql
-- Insert test enrollment
INSERT INTO enrollments (student_id, course_id, semester, academic_year, status)
VALUES ('student-id', 'course-id', 'first', '2023/2024', 'enrolled');
```

### Test Edge Function Directly

```bash
curl -L -X POST 'https://your-project.supabase.co/functions/v1/send-email' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "payment_confirmation",
    "to": "test@example.com",
    "data": {
      "student_name": "Test Student",
      "amount": 50000,
      "payment_type": "tuition",
      "reference": "TEST-12345",
      "payment_date": "2024-01-01"
    }
  }'
```

---

## 🐛 Troubleshooting

### Emails Not Sending

**Check Edge Function Logs:**
```bash
supabase functions logs send-email
```

**Verify Environment Variables:**
- Go to Dashboard → Settings → Edge Functions
- Ensure `RESEND_API_KEY` is set

**Check Triggers:**
```sql
-- List all triggers
SELECT * FROM pg_trigger WHERE tgname LIKE '%email%';
```

### Trigger Not Firing

**Verify trigger exists:**
```sql
SELECT tgname FROM pg_trigger 
WHERE tgrelid = 'payments'::regclass;
```

**Check function:**
```sql
SELECT prosrc FROM pg_proc 
WHERE proname = 'send_payment_confirmation_email';
```

### Wrong Email Content

- Check data passed to trigger function
- Verify template generates correct HTML
- Test with known values

---

## 💰 Cost Estimates

### Resend (Recommended)
- **Free Tier**: 100 emails/day = 3,000/month
- **Paid**: $20/month for 50,000 emails

### SendGrid
- **Free Tier**: 100 emails/day
- **Paid**: $15/month for 40,000 emails

### SMTP (Gmail)
- **Free**: 500 emails/day
- **Workspace**: 2,000 emails/day

**Recommendation**: Start with Resend free tier, upgrade if needed.

---

## 🔒 Security

### Email Triggers Use:
- ✅ `SECURITY DEFINER` - Runs with creator permissions
- ✅ Only triggers on specific conditions
- ✅ Validates data before sending

### Edge Function Uses:
- ✅ Environment variables for secrets
- ✅ No credentials in code
- ✅ HTTPS only

### Best Practices:
- Store API keys in Supabase Secrets (not env vars)
- Use service role key for triggers (not anon key)
- Rate limit Edge Function if publicly accessible

---

## 📈 Monitoring

### Track Email Sends

Add logging table:

```sql
CREATE TABLE email_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_type text NOT NULL,
  recipient text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  success boolean DEFAULT true,
  error_message text
);

-- Log in trigger function:
INSERT INTO email_logs (email_type, recipient)
VALUES ('payment_confirmation', student_email);
```

### Monitor with Dashboard

```sql
-- Count emails sent today
SELECT email_type, COUNT(*) 
FROM email_logs 
WHERE sent_at >= CURRENT_DATE
GROUP BY email_type;

-- Check failures
SELECT * FROM email_logs 
WHERE success = false 
ORDER BY sent_at DESC;
```

---

## 🚀 ** Production Checklist**

Before going live:

- [ ] Set up custom domain for emails (improves deliverability)
- [ ] Configure SPF/DKIM records
- [ ] Test all email types
- [ ] Set up error logging
- [ ] Configure rate limiting
- [ ] Add unsubscribe link (for marketing emails)
- [ ] Test spam score (mail-tester.com)
- [ ] Set up monitoring/alerts

---

## 🎯 Usage in Components

### Send Manual Email from Frontend

```tsx
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

async function sendDeadlineReminder() {
  const { data, error } = await supabase.functions.invoke('send-email', {
    body: {
      type: 'deadline_reminder',
      to: 'student@example.com',
      data: {
        student_name: 'John Doe',
        title: 'Payment Deadline',
        deadline: '2024-01-31',
        description: 'Please complete your tuition payment.',
      },
    },
  });

  if (error) {
    toast.error('Failed to send email');
  } else {
    toast.success('Reminder sent!');
  }
}
```

---

**Your email notification system is ready!** Set up Resend, deploy the Edge Function, and run the triggers SQL. 📧
