
import React from 'react';
import {
    LayoutGrid, BookOpen, Calendar, GraduationCap,
    Settings, LogOut, Info, Download, Printer,
    FileText, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SemesterResult {
    semester: string;
    gpa: number;
    cgpa: number;
    credits: number;
    status: 'Good Standing' | 'Probation' | 'Distinction';
}

const academicHistory: SemesterResult[] = [
    { semester: '2023/2024 First Semester', gpa: 4.85, cgpa: 4.52, credits: 18, status: 'Distinction' },
    { semester: '2022/2023 Second Semester', gpa: 4.50, cgpa: 4.45, credits: 21, status: 'Distinction' },
    { semester: '2022/2023 First Semester', gpa: 4.35, cgpa: 4.40, credits: 18, status: 'Good Standing' },
    { semester: '2021/2022 Second Semester', gpa: 4.60, cgpa: 4.42, credits: 20, status: 'Distinction' },
    { semester: '2021/2022 First Semester', gpa: 4.25, cgpa: 4.25, credits: 18, status: 'Good Standing' },
];

export default function StudentTranscripts() {
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-[sans-serif]">

            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white flex flex-col fixed h-full z-10 p-4">
                <div className="flex items-center gap-3 px-2 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 to-red-800 flex items-center justify-center font-bold text-lg text-white">
                        A
                    </div>
                    <span className="font-bold text-lg tracking-tight text-gray-900">Adeleke Uni</span>
                </div>

                <nav className="space-y-1">
                    <SidebarItem icon={<LayoutGrid size={18} />} label="Dashboard" href="/dashboard" />
                    <SidebarItem icon={<BookOpen size={18} />} label="My Courses" href="/schedule" />
                    <SidebarItem icon={<Calendar size={18} />} label="Timetable" href="/timetable" />
                    <SidebarItem icon={<GraduationCap size={18} />} label="Registration" href="/registration" />
                    <SidebarItem icon={<Info size={18} />} label="Grades" href="/grades" active />

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <SidebarItem icon={<Settings size={18} />} label="Settings" href="/settings" />
                    </div>
                </nav>

                <button className="mt-auto flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:text-red-600 transition-colors">
                    <LogOut size={18} />
                    Log Out
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">

                <header className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 text-gray-900">My Transcripts</h1>
                        <p className="text-gray-500 text-sm">View your full academic history and request official copies.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                            <Printer size={16} /> Print View
                        </button>
                        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-red-900/20 transition-colors">
                            <Download size={16} /> Download PDF
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col: Transcript View */}
                    <div className="lg:col-span-2">
                        <div className="bg-white text-black p-8 rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[600px] relative">
                            {/* Watermark */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                                <div className="w-96 h-96 rounded-full border-[20px] border-black flex items-center justify-center text-9xl font-black">
                                    AU
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-red-800 text-white flex items-center justify-center font-bold text-2xl rounded">AU</div>
                                        <div>
                                            <h2 className="text-2xl font-bold uppercase tracking-wider">Adeleke University</h2>
                                            <p className="text-xs font-serif italic text-gray-600">Ede, Osun State, Nigeria</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">Unofficial Transcript</div>
                                        <div className="text-sm text-gray-600">Generated: Oct 05, 2023</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                                    <div>
                                        <div className="font-bold uppercase text-gray-500 text-xs mb-1">Student Name</div>
                                        <div className="font-bold text-lg">Alex Rivera</div>
                                    </div>
                                    <div>
                                        <div className="font-bold uppercase text-gray-500 text-xs mb-1">Matric Number</div>
                                        <div className="font-bold text-lg font-mono">19/08834</div>
                                    </div>
                                    <div>
                                        <div className="font-bold uppercase text-gray-500 text-xs mb-1">Program</div>
                                        <div>B.Sc. Computer Science</div>
                                    </div>
                                    <div>
                                        <div className="font-bold uppercase text-gray-500 text-xs mb-1">Current Level</div>
                                        <div>400 Level</div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {academicHistory.map((term, index) => (
                                        <div key={index} className="border border-gray-200 rounded p-4 bg-gray-50">
                                            <div className="flex justify-between items-center mb-3 border-b border-gray-200 pb-2">
                                                <h3 className="font-bold uppercase text-sm">{term.semester}</h3>
                                                <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded">{term.status}</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500 text-xs">Credits</span>
                                                    <div className="font-bold">{term.credits}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 text-xs">GPA</span>
                                                    <div className="font-bold">{term.gpa.toFixed(2)}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 text-xs">CGPA</span>
                                                    <div className="font-bold">{term.cgpa.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t-2 border-black text-center text-xs text-gray-500 italic">
                                    This document is generated electronically and is valid without a signature for unofficial use.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Actions & Stats */}
                    <div className="space-y-6">

                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <span className="text-sm text-gray-600">Total Credits Earned</span>
                                    </div>
                                    <span className="font-bold text-xl text-gray-900">95</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <span className="text-sm text-gray-600">CGPA</span>
                                    </div>
                                    <span className="font-bold text-xl text-red-600">4.52</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Request Official Copy</h3>
                            <p className="text-xs text-gray-500 mb-6">Official transcripts are sealed and sent directly to institutions/employers.</p>

                            <button className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 py-3 rounded-xl text-sm font-semibold transition-all mb-3 flex items-center justify-center gap-2 shadow-sm">
                                <FileText size={16} />
                                Order Hard Copy (₦5,000)
                            </button>
                            <button className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm">
                                <FileText size={16} />
                                Order E-Transcript (₦2,500)
                            </button>

                            <div className="mt-4 flex gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-700 items-start">
                                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                Processing time is typically 5-7 business days.
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
            <div className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-red-600 text-white shadow-lg shadow-red-900/20`}>
                {icon}
                {label}
            </div>
        )
    }
    return (
        <Link to={href} className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-gray-500 hover:text-gray-900 hover:bg-gray-100`}>
            {icon}
            {label}
        </Link>
    )
}
