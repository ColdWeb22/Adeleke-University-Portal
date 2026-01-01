
import React from 'react';
import { 
    Bell, Search, Plus, MoreVertical, Clock, Calendar, 
    BarChart2, Book, FileText, Settings, LayoutDashboard, 
    Folder, MessageSquare, Zap, Target, Award, ChevronRight 
} from 'lucide-react';

// Interfaces for Data Types
interface Assignment {
    id: string;
    course: string;
    courseCode: string;
    title: string;
    dueDate: string;
    status: 'In Progress' | 'Not Started' | 'Submitted';
    color: string;
}

interface Announcement {
    id: string;
    type: 'Alert' | 'Event' | 'Info';
    title: string;
    description: string;
    timeAgo: string;
}

// Dummy Data
const assignments: Assignment[] = [
    { id: '1', course: 'Physics 101', courseCode: 'PHY101', title: 'Lab Report 4', dueDate: 'Tomorrow, 11:59 PM', status: 'In Progress', color: 'text-red-600' },
    { id: '2', course: 'History 202', courseCode: 'HIS202', title: 'Midterm Essay', dueDate: 'Fri, Oct 24', status: 'Not Started', color: 'text-orange-600' },
    { id: '3', course: 'CS 101', courseCode: 'CS101', title: 'Sorting Algorithms', dueDate: 'Mon, Oct 27', status: 'Submitted', color: 'text-green-600' },
];

const announcements: Announcement[] = [
    { id: '1', type: 'Alert', title: 'Library Maintenance', description: 'The main library portal will be down for scheduled maintenance tonight.', timeAgo: '2h ago' },
    { id: '2', type: 'Event', title: 'Fall Career Fair', description: 'Register now for the upcoming career fair at the Student Center.', timeAgo: 'Yesterday' },
];

export default function StudentDashboard() {
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
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Student</span>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                        <SidebarItem icon={<Book size={20} />} label="My Courses" />
                        <SidebarItem icon={<Calendar size={20} />} label="Calendar" />
                        <SidebarItem icon={<BarChart2 size={20} />} label="Grades & GPA" />
                        <SidebarItem icon={<Folder size={20} />} label="Resources" />
                    </nav>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <div className="bg-gradient-to-br from-gray-50 to-white border border-white/50 rounded-2xl p-4 shadow-sm mb-4 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-all"></div>
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white shadow-sm">
                                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">Alex Morgan</div>
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

                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
                        <p className="text-gray-500 text-sm mt-1">Welcome back, ready to learn?</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search anything..." 
                                className="bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 w-72 shadow-sm transition-all" 
                            />
                        </div>
                        <button 
                            title="Notifications"
                            className="bg-white/80 backdrop-blur-md border border-gray-200/60 p-3 rounded-2xl hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all relative group">
                            <Bell size={20} className="text-gray-600 group-hover:text-red-600 transition-colors" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </button>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-gray-900/20 group">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/30 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>
                        
                        <div className="relative z-10 flex justify-between items-end h-full">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-medium mb-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                                    Priority Update
                                </div>
                                <h1 className="text-4xl font-bold mb-2 tracking-tight">Hello, Alex!</h1>
                                <p className="text-gray-300 max-w-md text-sm leading-relaxed">You have <span className="text-white font-semibold">2 classes</span> today and a deadline for <span className="text-white font-semibold">Physics 101</span> approaching.</p>
                                
                                <div className="flex gap-3 mt-8">
                                    <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 flex items-center gap-2">
                                        <Plus size={18} /> New Project
                                    </button>
                                    <button className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors">
                                        View Schedule
                                    </button>
                                </div>
                            </div>
                            
                            {/* Abstract 3D Shape Placeholder */}
                            <div className="hidden sm:block relative">
                                <div className="w-32 h-32 bg-gradient-to-tr from-red-500 to-orange-500 rounded-2xl rotate-12 opacity-80 blur-sm absolute top-0 right-0"></div>
                                <div className="w-32 h-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl rotate-6 relative z-10 flex items-center justify-center shadow-2xl">
                                    <Target size={48} className="text-white" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-xl shadow-gray-200/40 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-[100px]"></div>
                        
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                    <Award size={20} />
                                </div>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">GPA Score</span>
                            </div>
                            <div className="text-5xl font-bold text-gray-900 tracking-tighter">3.8</div>
                            <div className="text-sm text-gray-500 mt-1">Top 5% of class</div>
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                                <span>Progress</span>
                                <span>42/120 Credits</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full w-[35%] shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Assignments Section */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-xl shadow-gray-200/40">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-gray-900">Upcoming Tasks</h3>
                                <button className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors">
                                    View All <ChevronRight size={16} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {assignments.map((item) => (
                                    <div key={item.id} className="group flex items-center p-4 rounded-2xl bg-white border border-gray-100 hover:border-red-100 hover:shadow-lg hover:shadow-red-500/5 transition-all cursor-pointer">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color.replace('text-', 'bg-').replace('600', '50')} mr-4 group-hover:scale-110 transition-transform`}>
                                            <Book size={20} className={item.color} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{item.title}</h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                                <span className="font-medium">{item.course}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span>{item.dueDate}</span>
                                            </div>
                                        </div>
                                        <StatusBadge status={item.status} />
                                        <button 
                                            title="More options"
                                            className="ml-4 p-2 text-gray-300 hover:text-gray-600 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Announcements */}
                        <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 shadow-xl shadow-gray-200/40">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Updates</h3>
                                <button 
                                    title="View history"
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-900">
                                    <Clock size={18} />
                                </button>
                            </div>
                            
                            <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                                {announcements.map((item) => (
                                    <div key={item.id} className="relative">
                                        <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${item.type === 'Alert' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{item.timeAgo}</div>
                                        <h4 className="font-bold text-sm text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-white/60 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all flex flex-col items-center gap-3 group">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Folder size={24} />
                                </div>
                                <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900">Library</span>
                            </button>
                            <button className="bg-white/60 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all flex flex-col items-center gap-3 group">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <FileText size={24} />
                                </div>
                                <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900">Transcript</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Modern Sidebar Item
function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${active ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
            {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full"></div>}
            <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{icon}</span>
            <span className="relative z-10">{label}</span>
        </a>
    )
}

// Modern Status Badge
function StatusBadge({ status }: { status: Assignment['status'] }) {
    const styles = {
        'In Progress': 'bg-orange-50 text-orange-600 border-orange-100',
        'Not Started': 'bg-gray-50 text-gray-500 border-gray-100',
        'Submitted': 'bg-green-50 text-green-600 border-green-100'
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status]}`}>
            {status}
        </span>
    )
}
