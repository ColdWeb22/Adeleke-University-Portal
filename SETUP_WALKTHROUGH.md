# Step-by-Step Setup Walkthrough

Follow this guide to get your Adeleke University Portal up and running!

---

## ✅ Step 1: Create Supabase Project (5 minutes)

1. **Go to** [supabase.com](https://supabase.com)
2. **Sign up** or **Log in**
3. Click **"New Project"**
4. Fill in:
   - **Name**: `adeleke-university-portal`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to Nigeria (e.g., `eu-west-2` London)
5. Click **"Create new project"** (wait 2-3 minutes)

---

## ✅ Step 2: Get Supabase Credentials (1 minute)

Once your project is created:

1. Go to **Settings** (gear icon) → **API**
2. **Copy these values:**
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

**Keep these open - you'll need them soon!**

---

## ✅ Step 3: Run Database Migration (2 minutes)

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. **Copy the entire contents** of:
   ```
   supabase/migrations/001_initial_schema.sql
   ```
4. **Paste** into the SQL editor
5. Click **"Run"** (bottom right)
6. ✅ You should see: **"Success. No rows returned"**

**If you get an error**, check the troubleshooting section below.

---

## ✅ Step 4: Configure SMTP Email (5 minutes)

### Option A: Gmail (Quick, for Testing)

1. Go to **Authentication** → **Templates** in Supabase
2. Scroll down to **SMTP Settings**
3. Enable **"Enable Custom SMTP"**
4. Fill in:
   - **Host**: `smtp.gmail.com`
   - **Port**: `587`
   - **Username**: Your Gmail address
   - **Password**: Get an App Password:
     - Go to [Google Account Security](https://myaccount.google.com/security)
     - Enable 2-Step Verification (if not enabled)
     - Search "App passwords" → Generate for "Mail"
     - Copy the 16-character password
   - **Sender email**: Same Gmail address
   - **Sender name**: `Adeleke University Portal`

5. Click **"Save"**

### Option B: SendGrid (Better for Production)

1. Sign up at [sendgrid.com](https://sendgrid.com) (free tier: 100 emails/day)
2. Create an API key
3. In Supabase SMTP settings:
   - **Host**: `smtp.sendgrid.net`
   - **Port**: `587`
   - **Username**: `apikey` (literally type "apikey")
   - **Password**: Your SendGrid API key
   - **Sender email**: Verified email in SendGrid
   - **Sender name**: `Adeleke University Portal`

---

## ✅ Step 5: Get Paystack Test Key (2 minutes)

1. Go to [paystack.com](https://paystack.com)
2. **Sign up** or **Log in**
3. Go to **Settings** → **API Keys & Webhooks**
4. **Copy** the **Test Public Key** (starts with `pk_test_...`)

> **Note**: Use TEST mode while developing. Switch to LIVE mode only when ready for production.

---

## ✅ Step 6: Create `.env.local` File (1 minute)

1. **Copy** the file `.env.local.example`
2. **Rename** the copy to `.env.local`
3. **Fill in** your credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx

# App Configuration
VITE_APP_NAME=Adeleke University Portal
VITE_APP_URL=http://localhost:5173
```

**Replace:**
- `YOUR-PROJECT-ID` with your actual Supabase URL
- `eyJhbGciOiJI...` with your actual anon key
- `pk_test_xxxxx` with your actual Paystack test key

4. **Save** the file

---

## ✅ Step 7: Test Authentication (5 minutes)

1. **Start the dev server:**
   ```bash
   pnpm dev
   ```

2. **Open** http://localhost:5173 in your browser

3. **Test Signup:**
   - Click "Sign Up" tab
   - Select role: **Student**
   - Fill in:
     - Full Name: `Test Student`
     - Email: Your real email (you'll receive a confirmation)
     - Password: `Test123!`
   - Click **"Create Account"**

4. **Check your email:**
   - You should receive a confirmation email
   - Click the confirmation link

5. **Test Login:**
   - Go back to the portal
   - Click "Log In" tab
   - Enter your email and password
   - Click **"Log In"**
   - ✅ You should be redirected to `/dashboard`

---

## ✅ Step 8: Add Sample Data (Optional, 10 minutes)

To test the full portal, add some sample data:

### In Supabase Dashboard → Table Editor:

**1. Add a Course:**
- Table: `courses`
- Click "Insert row"
- Fill in:
  - `code`: CSC101
  - `title`: Introduction to Computer Science
  - `units`: 3
  - `department`: Computer Science
  - `level`: 100
  - `semester`: first

**2. Enroll Yourself:**
- First, find your `student_id`:
  - Go to `students` table
  - Find the row with your `user_id`
  - Copy the `id` column value
- Go to `enrollments` table
- Insert row:
  - `student_id`: (paste your student ID)
  - `course_id`: (copy course ID from courses table)
  - `semester`: first
  - `academic_year`: 2023/2024
  - `status`: enrolled

**3. Add an Announcement:**
- Table: `announcements`
- Insert row:
  - `title`: Welcome to Portal!
  - `content`: This is a test announcement
  - `category`: general
  - `author_id`: (your user ID from profiles table)

---

## 🎉 You're Done!

Your portal is now fully configured and ready to use!

**Next Steps:**
- Add more courses and students via Supabase
- Test all features (grades, payments, library)
- Customize the UI if needed
- Deploy to production when ready

---

## 🐛 Troubleshooting

### Database Migration Failed?

**Error: "relation 'lecturers' does not exist"**
- ✅ **Fixed!** The SQL file has been corrected
- Copy the file again from `supabase/migrations/001_initial_schema.sql`

**Error: "permission denied"**
- Make sure you're using the **SQL Editor**, not the terminal
- The project owner must run the migration

### Email Not Sending?

**Gmail:**
- Make sure 2-Step Verification is enabled
- Use an App Password, not your regular password
- Check spam folder

**SendGrid:**
- Verify your sender email in SendGrid
- Make sure API key has "Mail Send" permissions

### Login Not Working?

**"Invalid credentials"**
- Make sure email is confirmed (check spam folder)
- Password is case-sensitive

**"Missing environment variables"**
- Check that `.env.local` exists (not `.env.local.example`)
- Restart dev server: `Ctrl+C` then `pnpm dev`

### DevTools Shows "No queries"?

- This is normal on first load
- Navigate to Dashboard to trigger data fetching
- Queries will appear as you use the app

---

## 📞 Need Help?

If you're stuck:
1. Check `BACKEND_SETUP.md` for detailed SMTP guide
2. Review `README.md` for troubleshooting
3. Check browser console for errors (F12)
4. Verify all credentials are correct in `.env.local`

---

**Happy coding! 🚀**
