
import React from 'react';
import {
    Home, BookOpen, Folder, Settings, Search, Download, ChevronRight, GraduationCap,
    Award, TrendingUp, Calendar as CalendarIcon, PieChart
} from 'lucide-react';

// Interfaces
interface GradeRecord {
    id: string;
    courseCode: string;
    courseTitle: string;
    professor: string;
    credits: number;
    grade: string;
    color: string; // for icon bg
}

interface UpcomingEvent {
    id: string;
    day: string;
    month: string;
    title: string;
    subtext: string;
}

// Dummy Data
const gradeRecords: GradeRecord[] = [
    { id: '1', courseCode: 'CS 401', courseTitle: 'Advanced Algorithms', professor: 'Dr. Alan Turing', credits: 4.0, grade: 'A', color: 'bg-red-600' },
    { id: '2', courseCode: 'CS 350', courseTitle: 'Operating Systems', professor: 'Prof. Grace Hopper', credits: 4.0, grade: 'A-', color: 'bg-purple-600' },
    { id: '3', courseCode: 'MATH 302', courseTitle: 'Linear Algebra', professor: 'Dr. Katherine Johnson', credits: 3.0, grade: 'B+', color: 'bg-orange-600' },
    { id: '4', courseCode: 'HIST 205', courseTitle: 'Modern World History', professor: 'Prof. Howard Zinn', credits: 3.0, grade: 'A', color: 'bg-pink-600' },
    { id: '5', courseCode: 'ENG 101', courseTitle: 'Technical Writing', professor: 'Prof. Emily Dickinson', credits: 2.0, grade: 'A', color: 'bg-teal-600' },
];

const upcomingEvents: UpcomingEvent[] = [
    { id: '1', day: '24', month: 'OCT', title: 'OS Kernel Project', subtext: 'CS 350 • 11:59 PM' },
    { id: '2', day: '28', month: 'OCT', title: 'Midterm Exam', subtext: 'MATH 302 • 2:00 PM' }
];

export default function StudentGrades() {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-[sans-serif]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white flex flex-col fixed h-full z-10 p-4">
                {/* Simple Logo Area for this view based on image */}
                <div className="flex items-center gap-3 px-2 mb-10 mt-2">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-lg text-gray-900">Adeleke University</span>
                </div>

                <nav className="space-y-1">
                    <SidebarItem icon={<Home size={20} />} label="Home" />
                    <SidebarItem icon={<CalendarIcon size={20} />} label="Schedule" />
                    <SidebarItem icon={<BarIcon size={20} />} label="Grades" active />
                    <SidebarItem icon={<BookOpen size={20} />} label="Financials" />
                    <SidebarItem icon={<Folder size={20} />} label="Resources" />
                </nav>

                <div className="mt-auto">
                    <SidebarItem icon={<Settings size={20} />} label="Settings" />
                    {/* Profile at bottom for this view */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-orange-200 overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-900">Alex Morgan</div>
                            <div className="text-[10px] text-gray-500">Comp. Sci. • 2024</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span>Academics</span>
                            <ChevronRight size={12} />
                            <span className="text-red-600">Grades</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2 text-gray-900">Grades & Progress</h1>
                        <p className="text-gray-500 text-sm max-w-xl">Track your academic performance, view current semester grades, and download official transcripts.</p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-red-900/20 transition-all">
                        <Download size={18} />
                        Download Report
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* GPA Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                        <div className="absolute top-4 right-4 text-gray-100"><GraduationCap size={48} /></div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">Cumulative GPA</div>
                        <div className="flex items-end gap-3 mb-4">
                            <span className="text-5xl font-bold text-gray-900">3.82</span>
                            <span className="text-green-600 text-sm font-bold mb-2 flex items-center gap-1"><TrendingUp size={14} /> +0.05</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-red-600 to-red-400 h-1.5 rounded-full w-[85%]"></div>
                        </div>
                    </div>

                    {/* Degree Progress */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                        <div className="absolute top-4 right-4 text-gray-100"><PieChart size={48} /></div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Degree Progress</div>
                            <div className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">71% Complete</div>
                        </div>
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-5xl font-bold text-gray-900">85</span>
                            <span className="text-gray-500 text-sm mb-2">/ 120 Credits</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-red-600 h-1.5 rounded-full w-[71%]"></div>
                        </div>
                    </div>

                    {/* Academic Standing */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                        <div className="absolute top-4 right-4 text-gray-100"><Award size={48} /></div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">Academic Standing</div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-gray-900">Dean's List</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-600">Good Standing • Fall 2024</span>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column - Grades List (2/3) */}
                    <div className="xl:col-span-2">

                        {/* Controls */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                                <button className="px-4 py-1.5 bg-white text-gray-900 shadow-sm rounded-md text-sm font-semibold border border-gray-200">Current</button>
                                <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 rounded-md text-sm font-medium transition-colors">Spring '23</button>
                                <button className="px-4 py-1.5 text-gray-500 hover:text-gray-900 rounded-md text-sm font-medium transition-colors">Fall '22</button>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input type="text" placeholder="Search courses..." className="bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-red-600 w-48 text-gray-900 placeholder-gray-400" />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50">
                                <div className="col-span-5">Course</div>
                                <div className="col-span-4">Professor</div>
                                <div className="col-span-2 text-center">Credits</div>
                                <div className="col-span-1 text-center">Grade</div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {gradeRecords.map((record) => (
                                    <div key={record.id} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors group cursor-pointer">
                                        <div className="col-span-5 flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${record.color} bg-opacity-10 text-gray-900 font-bold text-xs`}>
                                                {record.courseCode.split(' ')[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition-colors">{record.courseCode}</div>
                                                <div className="text-xs text-gray-500">{record.courseTitle}</div>
                                            </div>
                                        </div>
                                        <div className="col-span-4 text-sm text-gray-500">{record.professor}</div>
                                        <div className="col-span-2 text-center text-sm font-medium text-gray-900">{record.credits.toFixed(1)}</div>
                                        <div className="col-span-1 flex justify-center">
                                            <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${getGradeColor(record.grade)} bg-opacity-10 border border-opacity-20`}>
                                                {record.grade}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 py-4 border-t border-gray-200 text-center bg-gray-50">
                                <button className="text-xs text-red-600 font-semibold hover:text-red-700 flex items-center justify-center gap-1 mx-auto transition-colors">
                                    View all history <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats (1/3) */}
                    <div className="space-y-6">

                        {/* Grade Distribution */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold mb-6 text-gray-900">Grade Distribution</h3>
                            <div className="flex flex-col items-center mb-6 relative">
                                {/* Mock Donut Chart */}
                                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />

                                    {/* Red segment (65%) */}
                                    <path className="text-red-600" strokeDasharray="65, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />

                                    {/* Green segment (20%) - offset by 65 */}
                                    <path className="text-green-500" strokeDasharray="20, 100" strokeDashoffset="-65" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />

                                    {/* Yellow segment (15%) - offset by 85 */}
                                    <path className="text-yellow-500" strokeDasharray="15, 100" strokeDashoffset="-85" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                </svg>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <div className="text-2xl font-bold text-gray-900">4.0</div>
                                    <div className="text-[10px] text-gray-500 uppercase">SEM GPA</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                        <span className="text-gray-600">A Range</span>
                                    </div>
                                    <span className="font-bold text-gray-900">65%</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <span className="text-gray-600">B Range</span>
                                    </div>
                                    <span className="font-bold text-gray-900">20%</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                        <span className="text-gray-600">C Range</span>
                                    </div>
                                    <span className="font-bold text-gray-900">15%</span>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-gray-900">Upcoming</h3>
                                <a href="#" className="text-xs text-red-600 hover:underline">View Calendar</a>
                            </div>
                            <div className="space-y-4">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="flex gap-4 items-center">
                                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 w-12 text-center flex-shrink-0">
                                            <div className="text-[10px] text-gray-500 uppercase">{event.month}</div>
                                            <div className="text-lg font-bold text-gray-900">{event.day}</div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-gray-900">{event.title}</div>
                                            <div className="text-xs text-gray-500">{event.subtext}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}

// Helpers
function getGradeColor(grade: string) {
    if (grade.startsWith('A')) return 'text-green-600 border-green-200 bg-green-50';
    if (grade.startsWith('B')) return 'text-yellow-600 border-yellow-200 bg-yellow-50';
    return 'text-red-600 border-red-200 bg-red-50';
}

function BarIcon({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
    )
}





// Sub-components
function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-red-50 text-red-700 border-r-2 border-red-600 rounded-r-none' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
            {icon}
            {label}
        </a>
    )
}
