
import React, { useState } from 'react';
import {
    LayoutGrid, Users, FileText, Calendar,
    Settings, LogOut, BookOpen, Search, Filter,
    MoreVertical, Mail, Eye
} from 'lucide-react';

interface Student {
    id: string;
    name: string;
    course: string;
    attendance: number;
    grade: number;
    status: 'Good Standing' | 'At Risk' | 'Excellent';
    avatar: string;
}

const studentsData: Student[] = [
    { id: '882101', name: 'Alice Johnson', course: 'CSC 201', attendance: 92, grade: 88, status: 'Good Standing', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '882104', name: 'Bob Smith', course: 'CSC 201', attendance: 75, grade: 62, status: 'At Risk', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '882109', name: 'Charlie Brown', course: 'CSC 405', attendance: 98, grade: 95, status: 'Excellent', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '882215', name: 'Diana Prince', course: 'CSC 405', attendance: 85, grade: 78, status: 'Good Standing', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: '882301', name: 'Evan Wright', course: 'CSC 201', attendance: 60, grade: 55, status: 'At Risk', avatar: 'https://i.pravatar.cc/150?u=5' },
    { id: '882310', name: 'Fiona Gallagher', course: 'CSC 201', attendance: 95, grade: 91, status: 'Excellent', avatar: 'https://i.pravatar.cc/150?u=6' },
];

export default function LecturerStudents() {
    const [selectedCourse, setSelectedCourse] = useState('All Courses');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = studentsData.filter(student => {
        const matchesCourse = selectedCourse === 'All Courses' || student.course === selectedCourse;
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.includes(searchTerm);
        return matchesCourse && matchesSearch;
    });

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-[sans-serif]">

            {/* Sidebar (Reused logic for consistency) */}
            <aside className="w-64 border-r border-gray-200 bg-white flex flex-col fixed h-full z-10 p-4">
                <div className="bg-gray-50 rounded-xl p-4 mb-8 flex items-center gap-3 border border-gray-200">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-red-600">
                        <img src="https://i.pravatar.cc/150?u=b042581f4e29026704e" alt="Lecturer" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="text-sm font-bold">Dr. Sarah Wilson</div>
                        <div className="text-[10px] text-gray-500">Computer Science Dept.</div>
                    </div>
                </div>

                <nav className="space-y-1">
                    <SidebarItem icon={<LayoutGrid size={18} />} label="Overview" href="/lecturer/dashboard" />
                    <SidebarItem icon={<Users size={18} />} label="My Students" active href="/lecturer/students" />
                    <SidebarItem icon={<FileText size={18} />} label="Grading" href="/lecturer/grading" />
                    <SidebarItem icon={<Calendar size={18} />} label="Schedule" />
                    <SidebarItem icon={<BookOpen size={18} />} label="Resources" />

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <SidebarItem icon={<Settings size={18} />} label="Settings" />
                    </div>
                </nav>

                <button className="mt-auto flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <LogOut size={18} />
                    Log Out
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Students</h1>
                        <p className="text-gray-600 text-sm">Manage and monitor student performance across your courses.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-red-900/20 transition-all flex items-center gap-2">
                            <Mail size={16} />
                            Email All Students
                        </button>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-red-600 w-64 placeholder-gray-500"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Course:</span>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                aria-label="Filter by course"
                                className="bg-white border border-gray-300 text-gray-900 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-red-600 cursor-pointer"
                            >
                                <option value="All Courses">All Courses</option>
                                <option value="CSC 201">CSC 201</option>
                                <option value="CSC 405">CSC 405</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Filter size={16} />
                        <span>Showing {filteredStudents.length} students</span>
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-xs text-gray-600 uppercase border-b border-gray-200">
                                    <th className="py-4 px-6 font-semibold">Student</th>
                                    <th className="py-4 px-6 font-semibold">ID</th>
                                    <th className="py-4 px-6 font-semibold">Course</th>
                                    <th className="py-4 px-6 font-semibold">Attendance</th>
                                    <th className="py-4 px-6 font-semibold">Current Grade</th>
                                    <th className="py-4 px-6 font-semibold">Status</th>
                                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-200">
                                {filteredStudents.map(student => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full bg-gray-200 object-cover" />
                                                <span className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors">{student.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-gray-500 font-mono text-xs">{student.id}</td>
                                        <td className="py-4 px-6 text-gray-700">{student.course}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`absolute inset-0 h-full rounded-full transition-all ${student.attendance >= 90 ? 'bg-green-600 w-[90%]' : student.attendance >= 75 ? 'bg-yellow-500 w-[75%]' : 'bg-red-600 w-[60%]'}`}
                                                        data-width={student.attendance}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-gray-600">{student.attendance}%</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`font-bold ${student.grade >= 90 ? 'text-green-600' : student.grade >= 70 ? 'text-gray-900' : student.grade >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {student.grade}%
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${student.status === 'Excellent' ? 'bg-green-100 text-green-700 border-green-200' :
                                                    student.status === 'Good Standing' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                                                        'bg-red-100 text-red-700 border-red-200'
                                                }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors" title="View Profile">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors" title="Send Email">
                                                    <Mail size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 transition-colors" title="More Options">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredStudents.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No students found matching your criteria.
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                        <span>Showing {filteredStudents.length} of {studentsData.length} records</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 rounded hover:bg-gray-200">Next</button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

// Helper for Sidebar (modified to accept href)
function SidebarItem({ icon, label, active = false, href = '#' }: { icon: React.ReactNode, label: string, active?: boolean, href?: string }) {
    return (
        <a href={href} className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-red-700 text-white shadow-lg shadow-red-900/20' : 'text-gray-600 hover:text-gray-900'}`}>
            {icon}
            {label}
        </a>
    )
}
