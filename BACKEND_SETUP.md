# Adeleke University Portal - Backend Setup Guide with SMTP

## Prerequisites
- [ ] Supabase account (free tier is fine)
- [ ] Paystack account (test mode)
- [ ] SMTP email service (Gmail, SendGrid, AWS SES, etc.)

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details:
   - Name: `adeleke-university-portal`
   - Database Password: (generate a strong password and save it)
   - Region: Choose closest to Nigeria (e.g., Frankfurt, London)
4. Click "Create new project" and wait ~2 minutes

## Step 2: Configure SMTP Email (IMPORTANT)

### Option A: Gmail (for testing)
1. In Supabase Dashboard, go to **Authentication > Settings**
2. Scroll to **SMTP Settings**
3. Enable "Enable Custom SMTP"
4. Fill in:
   ```
   SMTP Host: smtp.gmail.com
   SMTP Port: 587
   SMTP User: your-gmail@gmail.com
   SMTP Password: [Your App-Specific Password]
   Sender Name: Adeleke University Portal
   Sender Email: your-gmail@gmail.com
   ```
5. **Get Gmail App Password**:
   - Go to Google Account > Security
   - Enable 2FA if not already
   - Go to "App passwords"
   - Generate new app password for "Mail"
   - Copy the 16-character password

### Option B: SendGrid (recommended for production)
1. Create SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Verify your sender email/domain
3. Create an API key
4. In Supabase SMTP Settings:
   ```
   SMTP Host: smtp.sendgrid.net
   SMTP Port: 587
   SMTP User: apikey
   SMTP Password: [Your SendGrid API Key]
   Sender Name: Adeleke University Portal
   Sender Email: noreply@adelekeuniversity.edu.ng
   ```

## Step 3: Customize Email Templates

1. In Supabase Dashboard, go to **Authentication > Email Templates**
2. Edit each template (Confirm signup, Magic Link, Change Email, Reset Password)
3. Copy templates from `supabase/email_templates.sql`
4. Replace placeholders:
   - Update branding
   - Update support email
   - Customize styling

## Step 4: Set Up Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `supabase/migrations/001_initial_schema.sql`
4. Click "Run" to execute
5. Verify tables created under **Database > Tables**

## Step 5: Configure Authentication

1. Go to **Authentication > Settings**
2. Under "Auth Providers", ensure **Email** is enabled
3. Configure settings:
   - **Confirm email**: Enabled
   - **Mailer**: Use your custom SMTP (configured in Step 2)
   - **Email redirect URLs**: Add `http://localhost:5173/**` for development
   - For production, add your domain: `https://yourdomain.com/**`

## Step 6: Get Supabase Credentials

1. Go to **Settings > API**
2. Copy the following:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...`
3. Save these for the next step

## Step 7: Set Up Paystack

1. Go to [paystack.com](https://paystack.com) and sign up
2. Complete business verification (can skip for testing)
3. Go to **Settings > API Keys & Webhooks**
4. Copy **Test Public Key**: `pk_test_xxxxx`
5. Save for next step

## Step 8: Configure Environment Variables

1. In your project root, create `.env.local` file
2. Copy from `.env.local.example` and fill in:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_your-public-key-here
   VITE_APP_NAME=Adeleke University Portal
   VITE_APP_URL=http://localhost:5173
   ```
3. **IMPORTANT**: Never commit `.env.local` to git

## Step 9: Test Email Authentication

1. Start the dev server: `pnpm dev`
2. Go to the login page
3. Click "Sign Up"
4. Fill in test user details
5. Submit form
6. Check your email for confirmation link
7. Click confirmation link
8. Verify you can log in

## Step 10: Create Test Data

### Create Test Student
```sql
-- First create user in Auth (use Supabase Dashboard > Authentication > Users)
-- Then insert profile and student data:

INSERT INTO students (user_id, matric_number, department, level, status)
VALUES (
  'user-id-from-auth',
  '19/08834',
  'Computer Science',
  400,
  'active'
);
```

### Create Test Lecturer
```sql
INSERT INTO lecturers (user_id, staff_id, department, title)
VALUES (
  'lecturer-user-id',
  'STAFF001',
  'Computer Science',
  'Dr.'
);
```

### Create Sample Courses
```sql
INSERT INTO courses (code, title, units, department, level, semester, lecturer_id)
VALUES
  ('CSC 201', 'Data Structures & Algorithms', 3, 'Computer Science', 200, 'first', 'lecturer-id'),
  ('MTH 201', 'Linear Algebra', 2, 'Mathematics', 200, 'first', NULL);
```

## Step 11: Verify Everything Works

### Test Authentication:
- [ ] Sign up with email confirmation
- [ ] Log in with email/password
- [ ] Password reset flow
- [ ] Email verification works
- [ ] SMTP emails are delivered

### Test Database:
- [ ] Can fetch student profile
- [ ] Can fetch courses
- [ ] RLS policies work (students only see their data)

### Test Payments (to be implemented):
- [ ] Can initialize Paystack payment
- [ ] Can verify payment

## Troubleshooting

### Email not sending?
- Check SMTP credentials in Supabase
- Verify sender email is verified
- Check spam folder
- Test SMTP connection using external tool

### Cannot fetch data?
- Check RLS policies are correctly configured
- Verify user is authenticated
- Check browser console for errors
- Verify table relationships

### Authentication errors?
- Clear browser localStorage
- Check Supabase project URL and anon key
- Verify user exists in auth.users table

## Next Steps

1. Wrap App.tsx with AuthProvider
2. Update Login.tsx to use real authentication
3. Replace mock data in components with Supabase queries
4. Implement Paystack payment integration
5. Test thoroughly with real data

## Important Security Notes

- ✅ All sensitive keys are in `.env.local` (not committed)
- ✅ RLS policies protect data access
- ✅ Email confirmation required for new accounts
- ✅ HTTPS required in production
- ✅ Never expose database password
- ✅ Use environment variables for all API keys
