-- ============================================
-- Add Sample Courses for Student Registration
-- Run this once in Supabase SQL Editor to populate course catalog
-- ============================================

-- Computer Science Courses (100 Level)
INSERT INTO courses (code, title, units, department, level, semester) VALUES
('CSC 101', 'Introduction to Computer Science', 3, 'Computer Science', 100, 'Fall'),
('CSC 103', 'Introduction to Programming', 4, 'Computer Science', 100, 'Fall'),
('MTH 101', 'General Mathematics I', 3, 'Mathematics', 100, 'Fall'),
('PHY 101', 'General Physics I', 3, 'Physics', 100, 'Fall'),
('CHM 101', 'General Chemistry I', 3, 'Chemistry', 100, 'Fall'),
('GNS 101', 'Use of Library', 1, 'General Studies', 100, 'Fall'),
('GNS 103', 'Philosophy and Logic', 2, 'General Studies', 100, 'Fall')
ON CONFLICT (code) DO NOTHING;

-- Computer Science Courses (200 Level)
INSERT INTO courses (code, title, units, department, level, semester) VALUES
('CSC 201', 'Data Structures', 3, 'Computer Science', 200, 'Fall'),
('CSC 203', 'Computer Architecture', 3, 'Computer Science', 200, 'Fall'),
('CSC 205', 'Object-Oriented Programming', 4, 'Computer Science', 200, 'Fall'),
('MTH 201', 'Linear Algebra', 3, 'Mathematics', 200, 'Fall'),
('MTH 203', 'Discrete Mathematics', 3, 'Mathematics', 200, 'Fall'),
('STA 201', 'Probability and Statistics', 3, 'Statistics', 200, 'Fall')
ON CONFLICT (code) DO NOTHING;

-- Computer Science Courses (300 Level)
INSERT INTO courses (code, title, units, department, level, semester) VALUES
('CSC 301', 'Data Structures & Algorithms', 4, 'Computer Science', 300, 'Fall'),
('CSC 303', 'Database Management Systems', 3, 'Computer Science', 300, 'Fall'),
('CSC 305', 'Operating Systems', 4, 'Computer Science', 300, 'Fall'),
('CSC 307', 'Software Engineering', 3, 'Computer Science', 300, 'Fall'),
('CSC 309', 'Computer Networks', 3, 'Computer Science', 300, 'Fall'),
('MTH 301', 'Numerical Analysis', 3, 'Mathematics', 300, 'Fall')
ON CONFLICT (code) DO NOTHING;

-- Computer Science Courses (400 Level)
INSERT INTO courses (code, title, units, department, level, semester) VALUES
('CSC 401', 'Artificial Intelligence', 3, 'Computer Science', 400, 'Fall'),
('CSC 403', 'Machine Learning', 4, 'Computer Science', 400, 'Fall'),
('CSC 405', 'Compiler Construction', 3, 'Computer Science', 400, 'Fall'),
('CSC 407', 'Computer Graphics', 3, 'Computer Science', 400, 'Fall'),
('CSC 409', 'Cybersecurity', 3, 'Computer Science', 400, 'Fall'),
('CSC 499', 'Final Year Project', 6, 'Computer Science', 400, 'Fall')
ON CONFLICT (code) DO NOTHING;

-- Business Administration Courses
INSERT INTO courses (code, title, units, department, level, semester) VALUES
('BUS 101', 'Introduction to Business', 3, 'Business Administration', 100, 'Fall'),
('BUS 201', 'Principles of Management', 3, 'Business Administration', 200, 'Fall'),
('BUS 203', 'Financial Accounting', 3, 'Business Administration', 200, 'Fall'),
('BUS 301', 'Marketing Management', 3, 'Business Administration', 300, 'Fall'),
('BUS 303', 'Human Resource Management', 3, 'Business Administration', 300, 'Fall')
ON CONFLICT (code) DO NOTHING;

-- Engineering Courses
INSERT INTO courses (code, title, units, department, level, semester) VALUES
('ENG 101', 'Engineering Mathematics I', 3, 'Engineering', 100, 'Fall'),
('ENG 103', 'Engineering Drawing', 2, 'Engineering', 100, 'Fall'),
('ENG 201', 'Thermodynamics', 3, 'Engineering', 200, 'Fall'),
('ENG 203', 'Strength of Materials', 3, 'Engineering', 200, 'Fall'),
('ENG 301', 'Fluid Mechanics', 3, 'Engineering', 300, 'Fall')
ON CONFLICT (code) DO NOTHING;

-- Law Courses
INSERT INTO courses (code, title, units, department, level, semester) VALUES
('LAW 101', 'Introduction to Nigerian Legal System', 3, 'Law', 100, 'Fall'),
('LAW 103', 'Legal Methods', 2, 'Law', 100, 'Fall'),
('LAW 201', 'Constitutional Law', 4, 'Law', 200, 'Fall'),
('LAW 203', 'Law of Contract', 3, 'Law', 200, 'Fall'),
('LAW 301', 'Criminal Law', 4, 'Law', 300, 'Fall')
ON CONFLICT (code) DO NOTHING;

-- Verify courses were added
SELECT department, COUNT(*) as course_count 
FROM courses 
GROUP BY department 
ORDER BY course_count DESC;
