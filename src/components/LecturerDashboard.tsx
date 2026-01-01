
import React from 'react';
import {
    LayoutGrid, Users, FileText, Calendar,
    Settings, LogOut, BookOpen, Clock,
    AlertCircle, Zap, ChevronRight, MoreHorizontal,
    GraduationCap, CheckCircle2
} from 'lucide-react';

export default function LecturerDashboard() {
    return (
        <div className="flex min-h-screen bg-[#f8f9fc] text-gray-900 font-[sans-serif] selection:bg-red-100 selection:text-red-900">

            {/* Glassmorphism Sidebar */}
            <aside className="w-72 fixed h-full z-20 hidden lg:flex flex-col">
                <div className="h-full bg-white/80 backdrop-blur-xl border-r border-white/40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col p-6">
                    <div className="flex items-center gap-4 mb-10 px-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 text-white">
                            <Zap size={20} fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight">Adeleke<span className="text-red-600">Portal</span></h1>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lecturer</span>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <SidebarItem icon={<LayoutGrid size={20} />} label="Overview" active href="/lecturer/dashboard" />
                        <SidebarItem icon={<Users size={20} />} label="My Students" href="/lecturer/students" />
                        <SidebarItem icon={<FileText size={20} />} label="Grading" href="/lecturer/grading" />
                        <SidebarItem icon={<Calendar size={20} />} label="Schedule" />
                        <SidebarItem icon={<BookOpen size={20} />} label="Resources" />
                    </nav>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <div className="bg-gradient-to-br from-gray-50 to-white border border-white/50 rounded-2xl p-4 shadow-sm mb-4 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-all"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white shadow-sm">
                                    <img src="https://i.pravatar.cc/150?u=b042581f4e29026704e" alt="Lecturer" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">Dr. Sarah Wilson</div>
                                    <div className="text-[10px] text-gray-500 font-medium">Computer Science</div>
                                </div>
                            </div>
                        </div>
                        <SidebarItem icon={<Settings size={20} />} label="Settings" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 p-8 relative">
                {/* Background Decor */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lecturer Overview</h1>
                        <p className="text-gray-500 text-sm mt-1">Welcome back, Dr. Wilson. You have 2 classes today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/60 shadow-sm">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Semester</div>
                            <div className="font-bold text-sm text-red-600">Fall 2023 - Week 8</div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard icon={Users} label="Total Students" value="142" color="red" />
                    <StatCard icon={BookOpen} label="Classes Taught" value="3" color="orange" />
                    <StatCard icon={FileText} label="Items to Grade" value="28" color="green" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Schedule & Activity */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Upcoming Classes */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-xl shadow-gray-200/40">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-gray-900">Today's Schedule</h3>
                                <button className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors">
                                    View Full Schedule <ChevronRight size={16} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <ClassItem
                                    time="09:00 AM - 10:30 AM"
                                    course="CSC 201: Data Structures"
                                    room="Tech Hall 304"
                                    students={45}
                                    type="Lecture"
                                    status="In Progress"
                                />
                                <ClassItem
                                    time="02:00 PM - 03:30 PM"
                                    course="CSC 405: Artificial Intelligence"
                                    room="Lab 2B"
                                    students={32}
                                    type="Lab"
                                    status="Upcoming"
                                />
                            </div>
                        </div>

                        {/* Pending Grading */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-xl shadow-gray-200/40">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-gray-900">Pending Grading</h3>
                                <div className="flex gap-2">
                                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200 flex items-center gap-1">
                                        <CheckCircle2 size={12} /> All Caught Up in CSC 201
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <PendingItem
                                    task="Midterm Projects"
                                    course="CSC 405"
                                    submitted="28/32"
                                    due="Oct 12"
                                />
                                <PendingItem
                                    task="Algorithm Analysis Quiz"
                                    course="CSC 201"
                                    submitted="45/45"
                                    due="Oct 10"
                                    urgent
                                />
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Quick Students & Notices */}
                    <div className="space-y-8">

                        {/* Student Requests */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-xl shadow-gray-200/40">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg text-gray-900">Student Requests</h3>
                                <button 
                                    title="More options"
                                    className="text-gray-400 hover:text-gray-900 transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <RequestItem
                                    name="James Miller"
                                    id="882103"
                                    action="Requested Extension"
                                    course="CSC 201"
                                    time="2h ago"
                                />
                                <RequestItem
                                    name="Sarah Connor"
                                    id="882109"
                                    action="Meeting Request"
                                    course="CSC 405"
                                    time="5h ago"
                                />
                                <RequestItem
                                    name="Mike Ross"
                                    id="882221"
                                    action="Grade Review"
                                    course="CSC 201"
                                    time="1d ago"
                                />
                            </div>
                            <button className="w-full mt-6 py-3 text-xs font-bold text-gray-500 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-white transition-all uppercase tracking-wide">
                                View All Requests
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-xl shadow-gray-200/40">
                            <h3 className="font-bold text-lg text-gray-900 mb-6">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <QuickAction label="Post Announcement" icon={AlertCircle} />
                                <QuickAction label="Upload Materials" icon={FileText} />
                                <QuickAction label="Email Class" icon={Users} />
                                <QuickAction label="Create Assignment" icon={Clock} />
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
    return (
        <a href={href} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${active ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
            {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full"></div>}
            <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{icon}</span>
            <span className="relative z-10">{label}</span>
        </a>
    )
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType, label: string, value: string, color: string }) {
    const colorClasses: Record<string, string> = {
        red: 'bg-red-50 text-red-600',
        orange: 'bg-orange-50 text-orange-600',
        green: 'bg-green-50 text-green-600',
    }

    return (
        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-6 shadow-xl shadow-gray-200/40 flex items-center gap-5 group hover:-translate-y-1 transition-transform duration-300">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <Icon size={24} />
            </div>
            <div>
                <div className="text-3xl font-bold text-gray-900 tracking-tight">{value}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{label}</div>
            </div>
        </div>
    )
}

function ClassItem({ time, course, room, students, type, status }: any) {
    const isLive = status === "In Progress";
    return (
        <div className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl relative overflow-hidden group hover:border-red-100 hover:shadow-lg hover:shadow-red-500/5 transition-all cursor-pointer">
            {isLive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 animate-pulse"></div>}

            <div className="flex items-center gap-5">
                <div className="text-center w-16">
                    <div className="text-xs font-bold text-gray-500">{time.split(' - ')[0]}</div>
                    <div className="text-[10px] text-gray-400 uppercase mt-1 font-bold">{time.split(' ')[1]}</div>
                </div>
                <div>
                    <div className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition-colors">{course}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md"><Users size={12} /> {students} Students</span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md"><GraduationCap size={12} /> {room}</span>
                    </div>
                </div>
            </div>

            <div className="text-right">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${isLive ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-100 text-gray-500'}`}>
                    {status}
                </span>
                <div className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">{type}</div>
            </div>
        </div>
    )
}

function PendingItem({ task, course, submitted, due, urgent }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-red-100 hover:shadow-md hover:shadow-red-500/5 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-white shadow-sm ${urgent ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                <div>
                    <div className="font-bold text-sm text-gray-900 group-hover:text-red-600 transition-colors">{task}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{course} • Due {due}</div>
                </div>
            </div>
            <div className="text-xs font-bold font-mono text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                {submitted}
            </div>
        </div>
    )
}

function RequestItem({ name, id, action, course, time }: any) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-red-100 hover:shadow-md hover:shadow-red-500/5 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shadow-inner">
                {name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">{name}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{time}</span>
                </div>
                <div className="text-xs text-red-600 font-bold mt-0.5 bg-red-50 inline-block px-2 py-0.5 rounded-md mb-1">{action}</div>
                <div className="text-[10px] text-gray-500 font-medium">{course} • ID: {id}</div>
            </div>
        </div>
    )
}

function QuickAction({ label, icon: Icon }: any) {
    return (
        <button className="flex flex-col items-center justify-center p-5 bg-white border border-gray-100 rounded-[1.5rem] hover:bg-white hover:shadow-lg hover:shadow-gray-200/40 hover:-translate-y-1 transition-all group">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-red-50 transition-colors">
                <Icon size={20} className="text-gray-500 group-hover:text-red-600 transition-colors" />
            </div>
            <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900 transition-colors text-center uppercase tracking-wide">{label}</span>
        </button>
    )
}
