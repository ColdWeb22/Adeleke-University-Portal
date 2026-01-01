# Adeleke University Portal 🎓

A comprehensive university management system built with **React**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Paystack**.

## ✨ Features

### Student Portal
- 📊 **Dashboard** - Overview of academic performance
- 📚 **Course Management** - Course enrollment and schedule
- 📝 **Grades & Transcripts** - View academic records
- 💰 **Financial Management** - Fee payments with Paystack
- 📖 **Digital Library** - Access to resources and materials
- 🗓️ **Timetable** - Weekly class schedule
- 👤 **Profile Management** - Update personal information
- ⚙️ **Settings** - Customize preferences

### Lecturer Portal
- 👨‍🏫 **Dashboard** - Class overview and statistics
- 👥 **Student Management** - View enrolled students
- 📋 **Grading System** - Input and manage student grades

### Core Features
- 🔐 **Authentication** - Secure email/password auth with role-based access
- 📧 **SMTP Email** - Custom email templates for confirmation and password reset
- 🔒 **Row Level Security** - Granular data access control
- 💳 **Payment Integration** - Paystack for NGN payments
- 🎨 **Modern UI** - Dark mode with glassmorphism effects

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Supabase account (free tier works)
- Paystack account (test mode)
- SMTP service (Gmail, SendGrid, etc.)

### 1. Clone & Install

```bash
cd "c:\Users\owner\OneDrive\Documents\School portal\adeleke-university-portal"
pnpm install
```

### 2. Set Up Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Run database migration:
   - Go to **SQL Editor** in Supabase Dashboard
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Execute the query
3. Configure SMTP (see `BACKEND_SETUP.md` for details)
4. Set up email templates from `supabase/email_templates.sql`

### 3. Configure Environment

Create `.env.local` file in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your-public-key-here
VITE_APP_NAME=Adeleke University Portal
VITE_APP_URL=http://localhost:5173
```

Get your Supabase credentials from: **Settings > API**  
Get your Paystack key from: **Settings > API Keys & Webhooks**

### 4. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173)

### 5. Test Authentication

1. Click "Sign Up" on the login page
2. Select role (Student or Lecturer)
3. Fill in details and submit
4. Check your email for confirmation link
5. Click link to verify account
6. Log in with your credentials

## 📁 Project Structure

```
adeleke-university-portal/
├── src/
│   ├── components/        # React components
│   │   ├── Student*.tsx   # Student-facing pages
│   │   ├── Lecturer*.tsx  # Lecturer-facing pages
│   │   ├── ProtectedRoute.tsx  # Auth guard
│   │   └── Login.tsx      # Authentication UI
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx  # Authentication state
│   ├── lib/               # Utilities
│   │   ├── supabase.ts    # Supabase client
│   │   └── database.types.ts  # TypeScript types
│   └── App.tsx            # Main app with routing
├── supabase/              # Database setup
│   ├── migrations/        # SQL schema
│   └── email_templates.sql  # SMTP templates
├── .env.local.example     # Environment template
├── BACKEND_SETUP.md       # Detailed setup guide
└── package.json
```

## 🗄️ Database Schema

- **profiles** - User accounts (extends auth.users)
- **students** - Student-specific data
- **lecturers** - Lecturer-specific data
- **courses** - Course catalog
- **enrollments** - Student course registrations
- **grades** - Academic grades
- **payments** - Fee payments (Paystack)
- **timetable** - Class schedules
- **announcements** - News and events
- **library_resources** - Digital library items

## 🔐 Authentication Flow

1. User signs up with email/password
2. Supabase sends confirmation email (via your SMTP)
3. User clicks confirmation link
4. Account is verified
5. User can log in
6. AuthContext checks role and redirects:
   - Students → `/dashboard`
   - Lecturers → `/lecturer/dashboard`
7. ProtectedRoute enforces role-based access

## 💳 Payment Integration (Next Steps)

The Paystack integration is ready to be implemented:

1. Import `PaystackButton` from `react-paystack`
2. Use in `StudentFinancials.tsx` component
3. Initialize payment with student email and amount
4. Handle callback to verify and record payment

## 📧 SMTP Email Setup

Configure custom SMTP in Supabase Dashboard:

**For Gmail (Testing):**
- Host: `smtp.gmail.com`
- Port: `587`
- User: your-email@gmail.com
- Password: App-specific password

**For SendGrid (Production):**
- Host: `smtp.sendgrid.net`
- Port: `587`
- User: `apikey`
- Password: Your SendGrid API key

See `BACKEND_SETUP.md` for detailed SMTP configuration.

## 🔒 Security Features

- ✅ Row Level Security (RLS) policies on all tables
- ✅ Role-based access control (Student/Lecturer/Admin)
- ✅ Email confirmation required for new accounts
- ✅ Environment variables for sensitive keys
- ✅ Protected routes with authentication guards
- ✅ Password hashing via Supabase Auth

## 🛠️ Development

```bash
pnpm build      # Build for production
pnpm tsc        # Type check
pnpm preview    # Preview production build
```

## 📚 Documentation

- **BACKEND_SETUP.md** - Complete backend setup guide
- **backend_implementation_plan.md** - Technical architecture
- **supabase/email_templates.sql** - Email templates

---

**Built with** ❤️ **for Adeleke University**
