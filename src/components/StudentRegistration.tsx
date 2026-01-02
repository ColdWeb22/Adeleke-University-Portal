
import React, { useState, useEffect } from 'react';
import {
    LayoutGrid, BookOpen, Calendar, GraduationCap,
    Settings, LogOut, Search, Plus, X,
    AlertCircle, CheckCircle2, Info, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

// Interfaces
interface Course {
    id: string;
    code: string;
    title: string;
    units: number;
    lecturer_id: string | null;
    department: string;
    level: number;
    semester: string;
}

export default function StudentRegistration() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    const [courseCatalog, setCourseCatalog] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const { user } = useAuth();

    const MAX_UNITS = 24;
    const currentUnits = selectedCourses.reduce((acc, curr) => acc + curr.units, 0);

    const loadCourses = React.useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .order('code');

            if (error) throw error;
            setCourseCatalog(data || []);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadEnrolledCourses = React.useCallback(async () => {
        if (!user) return;

        try {
            // Get student ID first
            const { data: studentData, error: studentError } = await supabase
                .from('students')
                .select('id')
                .eq('user_id', user.id)
                .single() as { data: { id: string } | null; error: unknown };

            if (studentError || !studentData) return;

            // Get enrolled courses
            const { data: enrollments } = await supabase
                .from('enrollments')
                .select('course_id, courses(*)')
                .eq('student_id', studentData.id)
                .eq('status', 'enrolled');

            if (enrollments) {
                const enrolled = enrollments
                    .map(e => (e as { courses: Course }).courses)
                    .filter(Boolean);
                setSelectedCourses(enrolled);
            }
        } catch (error) {
            console.error('Error loading enrolled courses:', error);
        }
    }, [user]);

    useEffect(() => {
        loadCourses();
        loadEnrolledCourses();
    }, [loadCourses, loadEnrolledCourses]);

    const handleEnrollment = async () => {
        if (!user || selectedCourses.length === 0) return;

        setEnrolling(true);
        try {
            // Get student ID
            const { data: studentData, error: studentError } = await supabase
                .from('students')
                .select('id')
                .eq('user_id', user.id)
                .single() as { data: { id: string } | null; error: unknown };

            if (studentError || !studentData) {
                alert('Please complete your profile first in the Profile section.');
                return;
            }

            // Prepare enrollment records
            const enrollments = selectedCourses.map(course => ({
                student_id: studentData.id,
                course_id: course.id,
                semester: 'first',
                academic_year: '2025/2026',
                status: 'enrolled'
            }));

            // Insert or update enrollments
            const { error } = await supabase
                .from('enrollments')
                .upsert(enrollments as Array<{
                    student_id: string;
                    course_id: string;
                    semester: string;
                    academic_year: string;
                    status: string;
                }>, {
                    onConflict: 'student_id,course_id,academic_year,semester'
                });

            if (error) throw error;

            alert(`Successfully enrolled in ${selectedCourses.length} course(s)!`);
        } catch (error) {
            console.error('Error enrolling:', error);
            alert('Error enrolling in courses: ' + (error as Error).message);
        } finally {
            setEnrolling(false);
        }
    };

    const toggleCourse = (course: Course) => {
        if (selectedCourses.find(c => c.id === course.id)) {
            setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
        } else {
            if (currentUnits + course.units > MAX_UNITS) {
                alert(`Cannot add ${course.code}. Maximum credit limit (${MAX_UNITS}) exceeded.`);
                return;
            }
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const filteredCourses = courseCatalog.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#f8f9fc] text-gray-900 font-[sans-serif] overflow-hidden relative selection:bg-red-100 selection:text-red-900">
            {/* Background Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Sidebar */}
            <aside className="w-72 border-r border-white/40 bg-white/60 backdrop-blur-xl flex flex-col fixed h-full z-20 p-6 shadow-2xl shadow-gray-200/50">
                <div className="flex items-center gap-3 px-2 mb-12">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-gray-900">
                        Adeleke <span className="text-red-600">Uni</span>
                    </span>
                </div>

                <nav className="space-y-2">
                    <SidebarItem icon={<LayoutGrid size={20} />} label="Dashboard" href="/dashboard" />
                    <SidebarItem icon={<BookOpen size={20} />} label="My Courses" href="/schedule" />
                    <SidebarItem icon={<Calendar size={20} />} label="Timetable" href="/timetable" />
                    <SidebarItem icon={<GraduationCap size={20} />} label="Registration" active />
                    <SidebarItem icon={<Info size={20} />} label="Grades" href="/grades" />

                    <div className="mt-8 pt-6 border-t border-gray-200/50">
                        <SidebarItem icon={<Settings size={20} />} label="Settings" />
                    </div>
                </nav>

                <button className="mt-auto flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all group">
                    <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                    Log Out
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-8 lg:p-12 relative z-10 overflow-y-auto h-screen">

                <header className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Course Registration</h1>
                        <p className="text-gray-500 font-medium">Select and register for your First Semester courses.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Registration Open</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col: Course Catalog */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Search */}
                        <div className="relative group">
                            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search for courses by code or title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/70 backdrop-blur-xl border border-white/60 text-gray-900 pl-14 pr-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder-gray-400 shadow-sm hover:shadow-md"
                            />
                        </div>

                        {/* Course List */}
                        <div className="space-y-4">
                            {filteredCourses.length === 0 ? (
                                <div className="text-center py-12 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60">
                                    <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500 font-medium">No courses found</p>
                                    <p className="text-sm text-gray-400 mt-2">Try adjusting your search</p>
                                </div>
                            ) : (
                                filteredCourses.map(course => {
                                    const isSelected = selectedCourses.find(c => c.id === course.id);
                                    return (
                                        <div key={course.id} className={`p-6 rounded-2xl border transition-all duration-300 group ${isSelected ? 'bg-red-50/40 border-red-200 shadow-lg shadow-red-500/5' : 'bg-white/60 backdrop-blur-md border-white/60 hover:bg-white hover:shadow-xl hover:shadow-gray-200/40'}`}>
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="font-bold text-lg text-gray-900">{course.code}</span>
                                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>{course.units} Units</span>
                                                    </div>
                                                    <h3 className="font-bold text-gray-800 mb-2 text-lg">{course.title}</h3>

                                                    <div className="flex items-center gap-6 text-xs font-medium text-gray-500 mt-3">
                                                        <div className="flex items-center gap-2">
                                                            <Info size={14} className="text-gray-400" />
                                                            {course.department}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <GraduationCap size={14} className="text-gray-400" />
                                                            {course.level} Level
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={14} className="text-gray-400" />
                                                            {course.semester}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => toggleCourse(course)}
                                                    className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${isSelected ? 'bg-red-100 text-red-600 hover:bg-red-200 rotate-90' : 'bg-gray-900 text-white hover:bg-red-600 hover:scale-110 shadow-lg shadow-gray-900/20 hover:shadow-red-500/30'}`}
                                                >
                                                    {isSelected ? <X size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>

                    {/* Right Col: Selection Summary */}
                    <div className="space-y-6">

                        {/* Credit Tracker */}
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-6 sticky top-8 shadow-xl shadow-gray-200/40">
                            <h3 className="font-bold text-xl mb-6 text-gray-900 flex items-center gap-2">
                                <GraduationCap size={24} className="text-red-600" />
                                Course Bag
                            </h3>

                            <div className="mb-8 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                <div className="flex justify-between text-sm mb-3 font-medium">
                                    <span className="text-gray-500">Total Units</span>
                                    <span className={`font-bold ${currentUnits > MAX_UNITS ? 'text-red-600' : 'text-gray-900'}`}>
                                        {currentUnits} / {MAX_UNITS}
                                    </span>
                                </div>
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ease-out ${currentUnits >= MAX_UNITS ? 'bg-red-600' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}
                                        data-progress={Math.min((currentUnits / MAX_UNITS) * 100, 100)}
                                        style={{ width: `${Math.min((currentUnits / MAX_UNITS) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {selectedCourses.length === 0 ? (
                                    <div className="text-center text-gray-400 py-12 text-sm border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                                        No courses selected yet
                                    </div>
                                ) : (
                                    selectedCourses.map(course => (
                                        <div key={course.id} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm group hover:border-red-100 transition-colors">
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{course.code}</div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider line-clamp-1">{course.title}</div>
                                            </div>
                                            <button title="Remove course" onClick={() => toggleCourse(course)} className="text-gray-300 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-lg">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            <button
                                onClick={handleEnrollment}
                                disabled={selectedCourses.length === 0 || enrolling}
                                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                {enrolling ? 'Processing...' : 'Register Selected Courses'}
                                <CheckCircle2 size={20} />
                            </button>

                            <div className="mt-6 flex gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-xs font-medium text-blue-700 items-start">
                                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                You can modify your course selection anytime before the semester starts. Maximum {MAX_UNITS} units allowed.
                            </div>
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}

// Helpers
function SidebarItem({ icon, label, active = false, href = '#' }: { icon: React.ReactNode, label: string, active?: boolean, href?: string }) {
    if (active) {
        return (
            <div className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all bg-red-600 text-white shadow-lg shadow-red-500/30`}>
                {icon}
                {label}
            </div>
        )
    }
    return (
        <Link to={href} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-md hover:shadow-gray-200/20`}>
            {icon}
            {label}
        </Link>
    )
}
