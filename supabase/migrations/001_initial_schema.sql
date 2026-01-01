-- ============================================
-- Adeleke University Portal - Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('student', 'lecturer', 'admin')),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- 2. STUDENTS TABLE
-- ============================================
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  matric_number TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level IN (100, 200, 300, 400, 500)),
  cgpa DECIMAL(3,2) DEFAULT 0.00,
  total_credits INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'probation', 'suspended', 'graduated')),
  date_of_birth DATE,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own data"
  ON students FOR SELECT
  USING (auth.uid() = user_id);

-- Note: Policy for lecturers viewing students will be added after lecturers table is created

-- ============================================
-- 3. LECTURERS TABLE
-- ============================================
CREATE TABLE lecturers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  staff_id TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  title TEXT, -- Dr., Prof., Mr., Mrs., etc.
  office_location TEXT,
  consultation_hours TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE lecturers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecturers can view own data"
  ON lecturers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can view lecturers"
  ON lecturers FOR SELECT
  TO authenticated
  USING (true);

-- Now add the policy for lecturers viewing students (moved from students table section)
CREATE POLICY "Lecturers can view enrolled students"
  ON students FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lecturers l
      WHERE l.user_id = auth.uid()
    )
  );

-- ============================================
-- 4. COURSES TABLE
-- ============================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  units INTEGER NOT NULL,
  department TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level IN (100, 200, 300, 400, 500)),
  semester TEXT CHECK (semester IN ('first', 'second')),
  lecturer_id UUID REFERENCES lecturers(id) ON DELETE SET NULL,
  max_capacity INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Lecturers can update own courses"
  ON courses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM lecturers l
      WHERE l.id = courses.lecturer_id
      AND l.user_id = auth.uid()
    )
  );

-- ============================================
-- 5. ENROLLMENTS TABLE
-- ============================================
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  semester TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  status TEXT DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'dropped', 'completed')),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id, academic_year, semester)
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own enrollments"
  ON enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM students s
      WHERE s.id = enrollments.student_id
      AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can enroll in courses"
  ON enrollments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students s
      WHERE s.id = enrollments.student_id
      AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Lecturers can view course enrollments"
  ON enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses c
      JOIN lecturers l ON c.lecturer_id = l.id
      WHERE c.id = enrollments.course_id
      AND l.user_id = auth.uid()
    )
  );

-- ============================================
-- 6. GRADES TABLE
-- ============================================
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE UNIQUE,
  midterm_score DECIMAL(5,2) DEFAULT 0,
  assignment_score DECIMAL(5,2) DEFAULT 0,
  final_score DECIMAL(5,2) DEFAULT 0,
  total_score DECIMAL(5,2) GENERATED ALWAYS AS (midterm_score + assignment_score + final_score) STORED,
  letter_grade TEXT CHECK (letter_grade IN ('A', 'B', 'C', 'D', 'E', 'F')),
  grade_point DECIMAL(3,2),
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own grades"
  ON grades FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN students s ON e.student_id = s.id
      WHERE e.id = grades.enrollment_id
      AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Lecturers can manage grades for their courses"
  ON grades FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      JOIN lecturers l ON c.lecturer_id = l.id
      WHERE e.id = grades.enrollment_id
      AND l.user_id = auth.uid()
    )
  );

-- ============================================
-- 7. TIMETABLE TABLE
-- ============================================
CREATE TABLE timetable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 1 AND 5), -- 1=Mon, 5=Fri
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  venue TEXT NOT NULL,
  semester TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE timetable ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view timetable"
  ON timetable FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- 8. PAYMENTS TABLE
-- ============================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  description TEXT NOT NULL,
  payment_type TEXT CHECK (payment_type IN ('tuition', 'hostel', 'library', 'other')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
  paystack_reference TEXT UNIQUE,
  paystack_access_code TEXT,
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own payments"
  ON payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM students s
      WHERE s.id = payments.student_id
      AND s.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can create payments"
  ON payments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students s
      WHERE s.id = payments.student_id
      AND s.user_id = auth.uid()
    )
  );

-- ============================================
-- 9. ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('academic', 'sports', 'general', 'urgent')),
  author_id UUID REFERENCES profiles(id),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_pinned BOOLEAN DEFAULT false
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published announcements"
  ON announcements FOR SELECT
  TO authenticated
  USING (
    published_at <= NOW()
    AND (expires_at IS NULL OR expires_at > NOW())
  );

CREATE POLICY "Admins can manage announcements"
  ON announcements FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid()
      AND p.role = 'admin'
    )
  );

-- ============================================
-- 10. LIBRARY RESOURCES TABLE
-- ============================================
CREATE TABLE library_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT,
  isbn TEXT,
  resource_type TEXT CHECK (resource_type IN ('book', 'journal', 'pdf', 'video')),
  category TEXT,
  total_copies INTEGER DEFAULT 1,
  available_copies INTEGER DEFAULT 1,
  cover_url TEXT,
  file_url TEXT, -- For digital resources
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE library_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view library resources"
  ON library_resources FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- 11. BORROWED ITEMS TABLE
-- ============================================
CREATE TABLE borrowed_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES library_resources(id) ON DELETE CASCADE,
  borrowed_at TIMESTAMPTZ DEFAULT NOW(),
  due_date TIMESTAMPTZ NOT NULL,
  returned_at TIMESTAMPTZ,
  status TEXT DEFAULT 'borrowed' CHECK (status IN ('borrowed', 'returned', 'overdue'))
);

ALTER TABLE borrowed_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own borrowed items"
  ON borrowed_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM students s
      WHERE s.id = borrowed_items.student_id
      AND s.user_id = auth.uid()
    )
  );

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_lecturers_user_id ON lecturers(user_id);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_grades_enrollment_id ON grades(enrollment_id);
CREATE INDEX idx_payments_student_id ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_announcements_published_at ON announcements(published_at);

-- ============================================
-- INITIAL DATA (Optional)
-- ============================================

-- Create a test admin profile
-- Note: You'll need to create this user in Supabase Auth first
-- Then insert the profile manually with their auth.users id
