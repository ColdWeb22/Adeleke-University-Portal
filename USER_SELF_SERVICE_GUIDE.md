# User Self-Service Setup Guide

Your portal is now configured for **user self-service**! Students can add their own profile information and enroll in courses directly through the UI.

## 🚀 Quick Start

### Step 1: Add Sample Courses to Database

1. Open your [Supabase SQL Editor](https://supabase.com/dashboard/project/gqahsfvvuvqfkvctvicj/sql)
2. Open the file `supabase/add_sample_courses.sql` from your project
3. Copy and paste the entire SQL script
4. Click **Run** to add 50+ courses across different departments

**Courses added:**
- Computer Science (100-400 level) - 20+ courses
- Business Administration - 5 courses
- Engineering - 5 courses
- Law - 5 courses
- Mathematics, Physics, Chemistry, General Studies

### Step 2: Complete Your Profile

1. Log in to your portal
2. Navigate to **Settings** or **Profile** page
3. Fill in your details:
   - **Matric Number** (e.g., AU/CSC/23/001)
   - **Department** (select from dropdown)
   - **Current Level** (100, 200, 300, 400)
   - **Date of Birth**
   - **Phone Number**
   - **Address**
4. Click **Save Changes**

### Step 3: Enroll in Courses

1. Navigate to **Registration** page
2. Browse available courses for your level
3. Use the search bar to find specific courses
4. Click the **+** button to add courses
5. Monitor your credit units (max 24 units)
6. Click **Register Selected Courses** when done

## ✨ Features

### Profile Management
- ✅ Edit all personal details through the UI
- ✅ Auto-saves to Supabase `students` table
- ✅ Real-time validation
- ✅ Department and level dropdowns

### Course Registration
- ✅ Browse real courses from database
- ✅ Search by code, title, or department
- ✅ View course details (units, level, semester)
- ✅ Credit unit limit enforcement (24 units max)
- ✅ Add/remove courses before submitting
- ✅ One-click enrollment

### Dashboard Integration
Your Student Dashboard automatically displays:
- Your name, department, and level
- Current CGPA and total credits
- Enrolled courses
- Progress towards graduation

## 🔄 How It Works

### Profile Updates
```
UI Form → Supabase students.upsert() → Database → Dashboard reflects changes
```

### Course Enrollment
```
Browse Courses → Select courses → Click Register → Creates enrollments → Shows in dashboard
```

## 📊 Database Tables Used

1. **students** - Your profile information
   - user_id, matric_number, department, level, cgpa, etc.

2. **courses** - Available course catalog
   - code, title, units, department, level, semester

3. **enrollments** - Your course selections
   - student_id, course_id, semester, status

## 🎯 Next Steps

After completing profile and enrollments:

1. **View Your Schedule** - Navigate to Timetable page
2. **Check Grades** - Visit Grades page (populated after assessments)
3. **View Financials** - Check fee payments and balances
4. **Browse Library** - Access learning resources

## ⚡ Tips

- **Complete your profile first** before enrolling in courses
- **Choose courses matching your level** (e.g., 200-level student → 200-level courses)
- **Stay within credit limits** - System enforces 24 units max
- **You can modify enrollments** anytime before semester starts
- **All data is stored in Supabase** - changes are permanent

## 🆘 Troubleshooting

**"Please complete your profile first"**
- Go to Profile/Settings page and fill all required fields
- Save changes before enrolling in courses

**"No courses showing"**
- Make sure you ran the `add_sample_courses.sql` script
- Check Supabase table browser for courses table

**"Maximum credit limit exceeded"**
- Remove some courses to stay under 24 units
- Each course shows its unit count

## 🎓 Ready to Go!

Your portal is fully functional. Students can now:
- ✅ Create and manage their own profiles
- ✅ Browse and enroll in courses
- ✅ View personalized dashboard
- ✅ Access all portal features

No manual database entries needed - everything is done through the beautiful UI! 🚀
