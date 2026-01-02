-- ============================================
-- Sample Data Population Script
-- Run this in Supabase SQL Editor after signup
-- ============================================

-- Step 1: Get your user_id (check the output, you'll need it)
SELECT id, email, full_name FROM profiles WHERE email = 'YOUR_EMAIL_HERE';

-- Step 2: Create your student record
-- Replace 'YOUR_USER_ID' with the id from Step 1
INSERT INTO students (user_id, matric_number, department, level, cgpa, total_credits, status, date_of_birth, address)
VALUES (
    'YOUR_USER_ID',  -- Replace with your actual user_id
    'AU/CSC/23/001',
    'Computer Science',
    300,  -- 300 level
    3.85,
    78,
    'active',
    '2003-05-15',
    'Osun State, Nigeria'
)
ON CONFLICT (user_id) DO UPDATE SET
    matric_number = EXCLUDED.matric_number,
    department = EXCLUDED.department,
    level = EXCLUDED.level,
    cgpa = EXCLUDED.cgpa,
    total_credits = EXCLUDED.total_credits;

-- Step 3: Create sample courses
INSERT INTO courses (code, title, units, department, level, semester, lecturer_id) VALUES
('CSC 301', 'Data Structures & Algorithms', 3, 'Computer Science', 300, 'Fall', NULL),
('CSC 305', 'Database Management Systems', 3, 'Computer Science', 300, 'Fall', NULL),
('CSC 311', 'Operating Systems', 4, 'Computer Science', 300, 'Fall', NULL),
('MTH 301', 'Linear Algebra', 3, 'Mathematics', 300, 'Fall', NULL),
('STA 303', 'Probability & Statistics', 3, 'Statistics', 300, 'Fall', NULL)
ON CONFLICT (code) DO NOTHING;

-- Step 4: Enroll yourself in courses
-- Replace 'YOUR_USER_ID' with your actual user_id
INSERT INTO enrollments (student_id, course_id, semester, status)
SELECT 
    (SELECT id FROM students WHERE user_id = 'YOUR_USER_ID'),
    c.id,
    'Fall 2023',
    'enrolled'
FROM courses c
WHERE c.code IN ('CSC 301', 'CSC 305', 'CSC 311', 'MTH 301', 'STA 303')
ON CONFLICT (student_id, course_id, semester) DO NOTHING;

-- Step 5: Add sample grades
-- Replace 'YOUR_USER_ID' with your actual user_id
INSERT INTO grades (student_id, course_id, semester, midterm_score, assignment_score, final_score, total_score, letter_grade, grade_point)
SELECT 
    (SELECT id FROM students WHERE user_id = 'YOUR_USER_ID'),
    c.id,
    'Fall 2023',
    CASE 
        WHEN c.code = 'CSC 301' THEN 28
        WHEN c.code = 'CSC 305' THEN 25
        WHEN c.code = 'CSC 311' THEN 30
        WHEN c.code = 'MTH 301' THEN 27
        WHEN c.code = 'STA 303' THEN 29
    END,
    CASE 
        WHEN c.code = 'CSC 301' THEN 18
        WHEN c.code = 'CSC 305' THEN 17
        WHEN c.code = 'CSC 311' THEN 20
        WHEN c.code = 'MTH 301' THEN 16
        WHEN c.code = 'STA 303' THEN 19
    END,
    CASE 
        WHEN c.code = 'CSC 301' THEN 48
        WHEN c.code = 'CSC 305' THEN 45
        WHEN c.code = 'CSC 311' THEN 42
        WHEN c.code = 'MTH 301' THEN 50
        WHEN c.code = 'STA 303' THEN 47
    END,
    CASE 
        WHEN c.code = 'CSC 301' THEN 94
        WHEN c.code = 'CSC 305' THEN 87
        WHEN c.code = 'CSC 311' THEN 92
        WHEN c.code = 'MTH 301' THEN 93
        WHEN c.code = 'STA 303' THEN 95
    END,
    CASE 
        WHEN c.code = 'CSC 301' THEN 'A'
        WHEN c.code = 'CSC 305' THEN 'B+'
        WHEN c.code = 'CSC 311' THEN 'A'
        WHEN c.code = 'MTH 301' THEN 'A'
        WHEN c.code = 'STA 303' THEN 'A'
    END,
    CASE 
        WHEN c.code = 'CSC 301' THEN 5.0
        WHEN c.code = 'CSC 305' THEN 4.5
        WHEN c.code = 'CSC 311' THEN 5.0
        WHEN c.code = 'MTH 301' THEN 5.0
        WHEN c.code = 'STA 303' THEN 5.0
    END
FROM courses c
WHERE c.code IN ('CSC 301', 'CSC 305', 'CSC 311', 'MTH 301', 'STA 303')
ON CONFLICT (student_id, course_id, semester) DO NOTHING;

-- Step 6: Create sample announcements
INSERT INTO announcements (title, content, category, priority, pinned, published_at) VALUES
('Important: Mid-Semester Break Notification', 'The mid-semester break is scheduled from February 10-17. Classes will resume on February 18. All assignments due during this period have been extended.', 'Academic', 'high', true, NOW()),
('Library Resources Update', 'New digital resources have been added to the university library portal. Students can now access IEEE Xplore, ACM Digital Library, and SpringerLink databases.', 'Library', 'medium', false, NOW() - INTERVAL '2 hours'),
('Career Fair: Tech Industry Leaders', 'Join us for the annual Tech Career Fair on February 25 at the Student Center. Companies like Microsoft, Google, and local tech startups will be recruiting.', 'Event', 'high', true, NOW() - INTERVAL '1 day'),
('Exam Registration Deadline', 'Final exam registration closes on February 28. Please ensure you are registered for all your courses through the student portal.', 'Academic', 'high', false, NOW() - INTERVAL '3 days'),
('Sports Complex Maintenance', 'The university sports complex will be closed for maintenance from February 5-7. We apologize for any inconvenience.', 'Facilities', 'low', false, NOW() - INTERVAL '5 days')
ON CONFLICT DO NOTHING;

-- Step 7: Create sample timetable entries
-- Replace 'YOUR_USER_ID' with your actual user_id
INSERT INTO timetable (course_id, student_id, day_of_week, start_time, end_time, room, building, type)
SELECT 
    c.id,
    (SELECT id FROM students WHERE user_id = 'YOUR_USER_ID'),
    CASE 
        WHEN c.code = 'CSC 301' THEN 'Monday'
        WHEN c.code = 'CSC 305' THEN 'Tuesday'
        WHEN c.code = 'CSC 311' THEN 'Wednesday'
        WHEN c.code = 'MTH 301' THEN 'Thursday'
        WHEN c.code = 'STA 303' THEN 'Friday'
    END,
    CASE 
        WHEN c.code = 'CSC 301' THEN '09:00:00'
        WHEN c.code = 'CSC 305' THEN '11:00:00'
        WHEN c.code = 'CSC 311' THEN '08:00:00'
        WHEN c.code = 'MTH 301' THEN '10:00:00'
        WHEN c.code = 'STA 303' THEN '14:00:00'
    END,
    CASE 
        WHEN c.code = 'CSC 301' THEN '11:00:00'
        WHEN c.code = 'CSC 305' THEN '13:00:00'
        WHEN c.code = 'CSC 311' THEN '11:00:00'
        WHEN c.code = 'MTH 301' THEN '12:00:00'
        WHEN c.code = 'STA 303' THEN '16:00:00'
    END,
    CASE 
        WHEN c.code = 'CSC 301' THEN 'LH 201'
        WHEN c.code = 'CSC 305' THEN 'LAB 3'
        WHEN c.code = 'CSC 311' THEN 'LH 305'
        WHEN c.code = 'MTH 301' THEN 'LH 102'
        WHEN c.code = 'STA 303' THEN 'LH 204'
    END,
    'Science Building',
    CASE 
        WHEN c.code = 'CSC 305' THEN 'Lab'
        ELSE 'Lecture'
    END
FROM courses c
WHERE c.code IN ('CSC 301', 'CSC 305', 'CSC 311', 'MTH 301', 'STA 303')
ON CONFLICT (course_id, student_id, day_of_week, start_time) DO NOTHING;

-- Step 8: Verify the data
SELECT 'Student Record' as data_type, COUNT(*) as count FROM students WHERE user_id = 'YOUR_USER_ID'
UNION ALL
SELECT 'Enrollments', COUNT(*) FROM enrollments WHERE student_id = (SELECT id FROM students WHERE user_id = 'YOUR_USER_ID')
UNION ALL
SELECT 'Grades', COUNT(*) FROM grades WHERE student_id = (SELECT id FROM students WHERE user_id = 'YOUR_USER_ID')
UNION ALL
SELECT 'Timetable', COUNT(*) FROM timetable WHERE student_id = (SELECT id FROM students WHERE user_id = 'YOUR_USER_ID')
UNION ALL
SELECT 'Announcements', COUNT(*) FROM announcements;
