
import React, { useState } from 'react';
import {
    MapPin, Navigation, Clock, Calendar,
    Settings, ChevronLeft, ChevronRight, AlertTriangle, Info,
    LayoutGrid, List, FileText
} from 'lucide-react';

// Interfaces
interface ClassSession {
    id: string;
    courseCode: string;
    title: string;
    day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
    startTime: string; // HH:MM
    duration: number; // in minutes
    location: string;
    type: 'Lecture' | 'Lab' | 'Studio';
    color: string; // Tailwind border/text color
    bgVal: string; // bg opacity color
}

interface Notification {
    id: string;
    type: 'Alert' | 'Info';
    title: string;
    description: string;
    time: string;
}

// Dummy Data
const classes: ClassSession[] = [
    { id: '1', courseCode: 'PHYS-101', title: 'Physics: Mechanics', day: 'TUE', startTime: '08:00', duration: 120, location: 'Lab 4', type: 'Lab', color: 'border-green-500 text-green-700', bgVal: 'bg-green-50' },
    { id: '2', courseCode: 'CS-101', title: 'Intro to Computer Science', day: 'MON', startTime: '09:00', duration: 90, location: 'Hall B', type: 'Lecture', color: 'border-red-500 text-red-700', bgVal: 'bg-red-50' },
    { id: '3', courseCode: 'CS-101', title: 'Comp. Sci Lab', day: 'FRI', startTime: '09:00', duration: 110, location: 'Lab 2', type: 'Lab', color: 'border-red-400 text-red-600', bgVal: 'bg-red-50' },
    { id: '4', courseCode: 'ART-105', title: 'History of Art', day: 'WED', startTime: '10:00', duration: 90, location: 'Studio A', type: 'Studio', color: 'border-orange-500 text-orange-700', bgVal: 'bg-orange-50' },
    { id: '5', courseCode: 'MATH-202', title: 'Linear Algebra', day: 'MON', startTime: '12:00', duration: 80, location: 'Room 304', type: 'Lecture', color: 'border-purple-500 text-purple-700', bgVal: 'bg-purple-50' },
    { id: '6', courseCode: 'MATH-202', title: '', day: 'WED', startTime: '13:00', duration: 80, location: 'Room 304', type: 'Lecture', color: 'border-purple-500 text-purple-700', bgVal: 'bg-purple-50' },
];

const notifications: Notification[] = [
    { id: '1', type: 'Alert', title: 'Class Rescheduled', description: 'MATH-202 moved to Wed 14:00', time: '2h ago' },
    { id: '2', type: 'Info', title: 'Exam Registration', description: 'Deadline for finals is tomorrow', time: '5h ago' }
];

const weekDays = [
    { day: 'MON', date: '23' },
    { day: 'TUE', date: '24' },
    { day: 'WED', date: '25' },
    { day: 'THU', date: '26' },
    { day: 'FRI', date: '27' },
];

const timeSlots = Array.from({ length: 9 }, (_, i) => i + 8); // 8 to 16

export default function StudentTimetable() {
    const [view, setView] = useState<'Week' | 'Day'>('Week');

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-[sans-serif]">

            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white flex flex-col fixed h-full z-10 p-4">
                <div className="flex items-center gap-3 px-2 mb-10 mt-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-red-100">
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">Alex Chen</div>
                        <div className="text-[10px] text-gray-500">Comp. Sci</div>
                    </div>
                </div>

                <nav className="space-y-1">
                    <SidebarItem icon={<LayoutGrid size={18} />} label="Dashboard" />
                    <SidebarItem icon={<Calendar size={18} />} label="Timetable" active />
                    <SidebarItem icon={<List size={18} />} label="Grades" />
                    <SidebarItem icon={<FileText size={18} />} label="Exams" />
                    <SidebarItem icon={<Navigation size={18} />} label="Library" />
                </nav>

                <div className="mt-auto">
                    <SidebarItem icon={<Settings size={18} />} label="Settings" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-6">

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-1 text-gray-900">Timetable & Venues</h1>
                        <p className="text-gray-500 text-sm">Good Morning, Alex • Fall Semester 2023</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-1 rounded-full flex gap-1 shadow-sm">
                        <button
                            onClick={() => setView('Week')}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${view === 'Week' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Week View
                        </button>
                        <button
                            onClick={() => setView('Day')}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${view === 'Day' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Day View
                        </button>
                        <button className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">Exam Schedule</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-140px)]">

                    {/* Timetable Grid (3 Columns) */}
                    <div className="xl:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden flex flex-col shadow-sm">

                        {/* Header Row */}
                        <div className="grid grid-cols-6 mb-4 border-b border-gray-200 pb-2">
                            <div className="text-center text-xs text-gray-500 font-bold uppercase pt-2">Time</div>
                            {weekDays.map(day => (
                                <div key={day.day} className="text-center">
                                    <div className={`text-[10px] font-bold ${day.day === 'MON' ? 'text-red-600' : 'text-gray-500'}`}>{day.day}</div>
                                    <div className={`text-xl font-bold ${day.day === 'MON' ? 'text-gray-900' : 'text-gray-400'}`}>{day.date}</div>
                                    {day.day === 'MON' && <div className="h-0.5 w-8 bg-red-600 mx-auto mt-1 rounded-full"></div>}
                                </div>
                            ))}
                        </div>

                        {/* Grid Content */}
                        <div className="flex-1 relative overflow-y-auto custom-scrollbar">
                            {/* Horizontal Time Lines */}
                            {timeSlots.map(hour => (
                                <div key={hour} className="flex border-b border-gray-100 h-24 relative group hover:bg-gray-50 transition-colors">
                                    <div className="w-[16.666%] text-xs text-gray-500 border-r border-gray-100 py-2 px-2 text-right">{hour}:00</div>
                                    <div className="w-[16.666%] border-r border-gray-100"></div> {/* MON */}
                                    <div className="w-[16.666%] border-r border-gray-100"></div> {/* TUE */}
                                    <div className="w-[16.666%] border-r border-gray-100"></div> {/* WED */}
                                    <div className="w-[16.666%] border-r border-gray-100"></div> {/* THU */}
                                    {/* FRI - No Border R */}
                                    {/* THU Area has 'Free Day' icon in mockup */}
                                    {hour === 13 && (
                                        <div className="absolute left-[66.66%] top-6 w-[16.66%] flex flex-col items-center justify-center opacity-20 pointer-events-none text-gray-400">
                                            <div className="mb-2"><Settings size={28} /></div> {/* Placeholder icon for Sofa/Free */}
                                            <span className="text-xs">Free Day</span>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Current Time Line Mock (09:45) */}
                            <div className="absolute top-[168px] left-0 w-full flex items-center z-20 pointer-events-none">
                                <div className="w-[16.666%] text-right pr-2 text-[10px] font-bold text-red-600">09:45</div>
                                <div className="flex-1 h-px bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] relative">
                                    <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-red-600"></div>
                                </div>
                            </div>

                            {/* Class Cards Absolute Positioning */}
                            {classes.map(cls => {
                                // Calculate Position
                                const dayIndex = weekDays.findIndex(d => d.day === cls.day);
                                const startHour = parseInt(cls.startTime.split(':')[0]);
                                const startMin = parseInt(cls.startTime.split(':')[1]);
                                const top = (startHour - 8) * 96 + (startMin / 60) * 96; // 96px = 24 * 4 (h-24 class)
                                const height = (cls.duration / 60) * 96;
                                const left = (dayIndex + 1) * 16.666; // +1 for Time column

                                return (
                                    <div
                                        key={cls.id}
                                        className={`absolute w-[15.5%] p-3 rounded-2xl border ${cls.color} ${cls.bgVal} backdrop-blur-sm z-10 hover:brightness-95 hover:scale-[1.02] transition-all cursor-pointer shadow-sm`}
                                        style={{ ['--top' as string]: `${top}px`, ['--left' as string]: `${left}%`, ['--height' as string]: `${height}px`, top: `var(--top)`, left: `var(--left)`, height: `var(--height)` } as React.CSSProperties}
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-bold uppercase">{cls.courseCode}</span>
                                            {cls.type === 'Lab' && <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                                        </div>
                                        <div className="font-bold text-xs leading-tight mt-1 mb-1 line-clamp-2 text-gray-900">{cls.title || cls.courseCode}</div>
                                        <div className="text-[9px] opacity-80 mt-auto flex flex-col gap-0.5 text-gray-700">
                                            <div className="flex items-center gap-1"><Clock size={8} /> {cls.startTime} - {(startHour + Math.floor((startMin + cls.duration) / 60)).toString().padStart(2, '0')}:{(startMin + cls.duration) % 60 || '00'}</div>
                                            <div className="flex items-center gap-1"><MapPin size={8} /> {cls.location}</div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>

                    {/* Right Sidebar (Widgets) */}
                    <div className="space-y-6">

                        {/* Up Next Card */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase mb-4">
                                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                                In 15 Min
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">CS-101</h2>
                                    <p className="text-red-600 text-sm">Intro to Computer Science</p>
                                </div>
                                <button title="Settings" className="text-gray-400 hover:text-gray-900"><Settings size={16} /></button>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 mt-4">
                                <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded">
                                    <Clock size={12} /> 09:00 - 10:30
                                </div>
                                <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded">
                                    <MapPin size={12} className="text-red-600" /> Lecture Hall B
                                </div>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 transition-all">
                                <Navigation size={16} fill="white" />
                                Get Directions
                            </button>
                        </div>

                        {/* Mini Calendar */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-sm text-gray-900">October 2023</h3>
                                <div className="flex gap-2">
                                    <button title="Previous month" className="hover:text-gray-900 text-gray-500"><ChevronLeft size={16} /></button>
                                    <button title="Next month" className="hover:text-gray-900 text-gray-500"><ChevronRight size={16} /></button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 text-center gap-y-3 text-[10px]">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-gray-500 font-bold">{d}</div>)}

                                {/* Calendar Days Mockup */}
                                {[...Array(30)].map((_, i) => {
                                    const day = i + 1;
                                    const isToday = day === 23;
                                    const isSelected = day === 24;
                                    return (
                                        <div key={day} className={`
                                    w-7 h-7 flex items-center justify-center rounded-full mx-auto cursor-pointer transition-colors
                                    ${isToday ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' :
                                                isSelected ? 'bg-gray-100 border border-red-200 text-red-600' : 'text-gray-500 hover:bg-gray-100'}
                                  `}>
                                            {day}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-sm mb-4 text-gray-900">Notifications</h3>
                            <div className="space-y-4">
                                {notifications.map(note => (
                                    <div key={note.id} className="flex gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${note.type === 'Alert' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                                            {note.type === 'Alert' ? <AlertTriangle size={14} /> : <Info size={14} />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-xs text-gray-900">{note.title}</div>
                                            <div className="text-[10px] text-gray-500 mb-0.5">{note.description}</div>
                                            <div className="text-[9px] text-gray-400">{note.time}</div>
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
function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-red-50 text-red-600 border-l-2 border-red-600 rounded-l-none' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
            {icon}
            {label}
        </a>
    )
}
