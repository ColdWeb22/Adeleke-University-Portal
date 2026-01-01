
import React from 'react';
import {
    Home, BookOpen, User, Folder, Settings, Search, Bell,
    MoreHorizontal, Video, FileText, ChevronLeft, ChevronRight,
    Code, Palette, Sigma, Brain, Coffee, Calendar as CalendarIcon,
    Clock
} from 'lucide-react';

// Interfaces
interface Course {
    id: string;
    code: string;
    title: string;
    professor: string;
    icon: React.ReactNode;
    color: string; // for background/accent
    type: 'Progress' | 'Assignment';
    progress?: number;
    nextAssignment?: string;
    nextAssignmentDue?: string;
}

interface ScheduleItem {
    id: string;
    courseCode?: string;
    title: string;
    time: string;
    type: 'Class' | 'Break';
    location?: string;
    mode?: 'In-Person' | 'Online';
    icon: React.ReactNode;
    iconBg: string; // Tailwind class
}

// Dummy Data
const courses: Course[] = [
    {
        id: '1', code: 'CS-101', title: 'Intro to Computer Science', professor: 'Prof. Sarah Smith',
        icon: <Code size={40} className="text-red-500 opacity-20" />,
        color: 'from-red-900/40 to-red-900/10',
        type: 'Progress', progress: 85
    },
    {
        id: '2', code: 'AH-202', title: 'Modern Art History', professor: 'Prof. John Doe',
        icon: <Palette size={40} className="text-orange-500 opacity-20" />,
        color: 'from-orange-900/40 to-orange-900/10',
        type: 'Assignment', nextAssignment: 'Essay due Tuesday'
    },
    {
        id: '3', code: 'MATH-303', title: 'Linear Algebra', professor: 'Prof. Alan Turing',
        icon: <Sigma size={40} className="text-cyan-500 opacity-20" />,
        color: 'from-cyan-900/40 to-cyan-900/10',
        type: 'Progress', progress: 45
    },
    {
        id: '4', code: 'PSY-101', title: 'Intro to Psychology', professor: 'Prof. Jung',
        icon: <Brain size={40} className="text-purple-500 opacity-20" />,
        color: 'from-purple-900/40 to-purple-900/10',
        type: 'Assignment', nextAssignment: 'Friday, 2:00 PM', nextAssignmentDue: 'Next Quiz'
    },
];

const schedule: ScheduleItem[] = [
    { id: '1', courseCode: 'CS-101', title: 'Intro to CS', time: '9:00 AM - 10:30 AM', type: 'Class', location: 'Room 304', mode: 'In-Person', icon: <Code size={16} />, iconBg: 'bg-red-600' },
    { id: '2', title: 'Lunch Break', time: '11:00 AM - 12:00 PM', type: 'Break', icon: <Coffee size={16} />, iconBg: 'bg-orange-500' },
    { id: '3', courseCode: 'AH-202', title: 'Modern Art', time: '1:00 PM - 2:30 PM', type: 'Class', mode: 'Online', location: 'Online Zoom', icon: <Palette size={16} />, iconBg: 'bg-pink-600' },
];

export default function StudentSchedule() {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-[sans-serif]">
            {/* Sidebar - Matching the specific image provided */}
            <aside className="w-64 border-r border-gray-200 bg-white flex flex-col fixed h-full z-10 p-4">
                {/* User Profile at Top */}
                <div className="flex items-center gap-3 mb-10 px-2 mt-4">
                    <div className="w-12 h-12 rounded-full border-2 border-red-500 p-0.5">
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-gray-900">Alex Johnson</h3>
                        <p className="text-[10px] text-gray-500">Computer Science</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    <SidebarItem icon={<Home size={20} />} label="Home" active />
                    <SidebarItem icon={<BookOpen size={20} />} label="Grades" />
                    <SidebarItem icon={<User size={20} />} label="Profile" />
                    <SidebarItem icon={<Folder size={20} />} label="Resources" />
                </nav>

                <div className="mt-auto">
                    <SidebarItem icon={<Settings size={20} />} label="Settings" />
                    {/* Semester Progress */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-6">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-red-600 font-bold">Fall Semester</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                            <div className="bg-red-600 h-1.5 rounded-full w-[60%]"></div>
                        </div>
                        <div className="text-[10px] text-gray-500">Week 8 of 12</div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">

                {/* Header */}
                <header className="flex justify-between items-start mb-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-1 text-gray-900">My Schedule</h1>
                        <p className="text-gray-500 text-sm">Manage your courses and deadlines</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="Search courses, documents..." className="bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-600 w-80 text-gray-900 placeholder-gray-400 shadow-sm" />
                        </div>
                        <button title="Notifications" className="bg-white p-2.5 rounded-full hover:bg-gray-50 transition-colors relative border border-gray-200 shadow-sm">
                            <Bell size={18} className="text-gray-600" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column - Courses (2/3 width on large) */}
                    <div className="xl:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Enrolled Courses</h2>
                            <button className="text-red-600 text-sm font-semibold hover:underline">View All</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {courses.map((course) => (
                                <div key={course.id} className="bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden group hover:border-red-200 hover:shadow-md transition-all">
                                    {/* Abstract BG Icon */}
                                    <div className="absolute top-4 right-4">{course.icon}</div>

                                    {/* Badges/Tags - e.g. Course Code */}
                                    <div className="mb-8">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${course.code.startsWith('CS') ? 'bg-red-50 text-red-600' : course.code.startsWith('MATH') ? 'bg-cyan-50 text-cyan-600' : 'bg-purple-50 text-purple-600'} border border-gray-100`}>
                                            {course.code}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="font-bold text-lg mb-1 text-gray-900">{course.title}</h3>
                                            <p className="text-xs text-gray-500">{course.professor}</p>
                                        </div>
                                        <button title="More options" className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={18} /></button>
                                    </div>

                                    {/* Dynamic Content Area: Progress or Assignment */}
                                    <div className="mb-6">
                                        {course.type === 'Progress' ? (
                                            <>
                                                <div className="flex justify-between text-[10px] uppercase text-gray-500 font-bold mb-2">
                                                    <span>Progress</span>
                                                    <span className="text-gray-900">{course.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                    <div className={`h-1.5 rounded-full w-[${course.progress}%] ${course.code.startsWith('MATH') ? 'bg-cyan-500' : 'bg-red-600'}`}></div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-100">
                                                <div className="bg-pink-50 p-2 rounded-lg">
                                                    {course.nextAssignmentDue ? <CalendarIcon size={16} className="text-pink-500" /> : <FileText size={16} className="text-pink-500" />}
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-gray-500">{course.nextAssignmentDue || 'Next Assignment'}</div>
                                                    <div className="text-xs font-bold text-gray-900">{course.nextAssignment}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm">
                                            {course.type === 'Assignment' ? 'Syllabus' : 'Materials'}
                                        </button>
                                        <button title="Video lectures" className="px-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-500 shadow-sm">
                                            <Video size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Schedule & Resources */}
                    <div className="space-y-8">

                        {/* Calendar Widget */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-gray-900">October 2023</h3>
                                <div className="flex gap-2 text-gray-400">
                                    <button title="Previous month" className="hover:text-gray-900"><ChevronLeft size={16} /></button>
                                    <button title="Next month" className="hover:text-gray-900"><ChevronRight size={16} /></button>
                                </div>
                            </div>

                            {/* Simple Calendar Grid Mockup */}
                            <div className="grid grid-cols-7 text-center gap-y-4 text-xs">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-gray-400 font-bold">{d}</div>)}

                                {/* Empty cells */}
                                <div></div><div></div><div className="text-gray-600">1</div><div className="text-gray-600">2</div><div className="text-gray-600">3</div><div className="text-gray-600">4</div> {/** Mock Start */}

                                <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto shadow-sm">5</div>
                                <div className="text-gray-600">6</div><div className="text-gray-600">7</div><div className="text-gray-600">8</div><div className="text-gray-600">9</div>
                                <div className="relative text-gray-600">10 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></span></div>
                                <div className="text-gray-600">11</div>
                                <div className="text-gray-600">12</div><div className="text-gray-600">13</div><div className="text-gray-600">14</div>
                            </div>
                        </div>

                        {/* Today's Schedule */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-gray-900">Today's Schedule</h3>
                                <a href="#" className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors">Full Schedule <ChevronRight size={12} /></a>
                            </div>

                            <div className="relative space-y-8 pl-4 before:content-[''] before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-100">
                                {schedule.map((item) => (
                                    <div key={item.id} className="relative flex gap-4">
                                        {/* Timeline Dot */}
                                        <div className={`absolute -left-[19px] w-10 h-10 rounded-full ${item.iconBg} bg-opacity-10 flex items-center justify-center z-10 border-4 border-white`}>
                                            <div className={`${item.iconBg.replace('bg-', 'text-')} `}>
                                                {item.icon}
                                            </div>
                                        </div>

                                        <div className="pl-6">
                                            <div className="font-bold text-sm mb-1 text-gray-900">{item.courseCode ? `${item.courseCode}: ` : ''}{item.title}</div>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-2">
                                                <Clock size={10} />
                                                {item.time}
                                            </div>
                                            {item.type === 'Class' && (
                                                <div className="flex gap-2">
                                                    {item.location && <span className="bg-gray-50 text-gray-500 px-2 py-0.5 rounded text-[10px] border border-gray-200">{item.location}</span>}
                                                    {item.mode && <span className={`px-2 py-0.5 rounded text-[10px] border border-transparent ${item.mode === 'In-Person' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>{item.mode === 'In-Person' ? 'Active' : item.mode}</span>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Resources */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold mb-4 text-gray-900">Quick Resources</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
                                    <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                        <BookOpen size={16} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">Student Handbook</div>
                                        <div className="text-[10px] text-gray-500">PDF • 2.4 MB</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
                                    <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                        <CalendarIcon size={16} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">Academic Calendar</div>
                                        <div className="text-[10px] text-gray-500">Fall 2023</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
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
