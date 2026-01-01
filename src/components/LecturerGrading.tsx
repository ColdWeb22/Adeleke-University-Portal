
import React, { useState } from 'react';
import {
    LayoutGrid, Users, FileText, Calendar,
    Settings, LogOut, BookOpen, ChevronDown,
    Save, Download, Upload, PieChart
} from 'lucide-react';

// Interfaces
interface StudentGrade {
    id: string;
    name: string;
    midterm: number;
    assignments: number;
    final: number;
    total: number;
    grade: string;
}

const initialData: StudentGrade[] = [
    { id: '882101', name: 'Alice Johnson', midterm: 85, assignments: 90, final: 0, total: 87.5, grade: 'B+' },
    { id: '882104', name: 'Bob Smith', midterm: 65, assignments: 70, final: 0, total: 67.5, grade: 'D' },
    { id: '882109', name: 'Charlie Brown', midterm: 92, assignments: 95, final: 0, total: 93.5, grade: 'A' },
    { id: '882215', name: 'Diana Prince', midterm: 78, assignments: 85, final: 0, total: 81.5, grade: 'B-' },
    { id: '882310', name: 'Fiona Gallagher', midterm: 88, assignments: 92, final: 0, total: 90.0, grade: 'A-' },
];

export default function LecturerGrading() {
    const [selectedCourse] = useState('CSC 201: Data Structures');
    const [grades, setGrades] = useState<StudentGrade[]>(initialData);

    // Helper to update grade (mock logic)
    const handleGradeChange = (id: string, field: keyof StudentGrade, value: string) => {
        const numValue = parseFloat(value) || 0;
        setGrades(grades.map(student => {
            if (student.id === id) {
                const updated = { ...student, [field]: numValue };
                // Simple total calculation mock
                updated.total = (updated.midterm * 0.3) + (updated.assignments * 0.3) + (updated.final * 0.4);
                updated.grade = updated.total >= 90 ? 'A' : updated.total >= 80 ? 'B' : updated.total >= 70 ? 'C' : 'F';
                return updated;
            }
            return student;
        }));
    };

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
                    <SidebarItem icon={<Users size={18} />} label="My Students" href="/lecturer/students" />
                    <SidebarItem icon={<FileText size={18} />} label="Grading" active href="/lecturer/grading" />
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
                        <h1 className="text-3xl font-bold mb-2">Grading Portal</h1>
                        <p className="text-gray-600 text-sm">Input and manage grades for your courses.</p>
                    </div>

                    {/* Course Selector */}
                    <div className="relative group">
                        <button className="flex items-center gap-3 bg-white border border-gray-200 hover:border-red-600 text-gray-900 px-5 py-2.5 rounded-xl transition-all min-w-[200px] justify-between">
                            <span className="font-semibold text-sm">{selectedCourse}</span>
                            <ChevronDown size={16} className="text-gray-400 group-hover:text-red-600" />
                        </button>
                        {/* Dropdown would go here */}
                    </div>
                </div>

                {/* Stats & distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <StatBox label="Class Average" value="82.4%" trend="+2.1%" good />
                    <StatBox label="Submitted" value="28/32" sub="4 Pending" />
                    <StatBox label="Highest Score" value="98%" sub="Charlie Brown" />

                    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <div className="text-gray-600 text-xs mb-1">Grade Distribution</div>
                            <div className="text-sm font-bold flex gap-2">
                                <span className="text-green-600">12 A</span>
                                <span className="text-gray-600">8 B</span>
                                <span className="text-yellow-600">5 C</span>
                            </div>
                        </div>
                        <PieChart className="text-red-600 opacity-50" size={32} />
                    </div>
                </div>

                {/* Access Toolbar */}
                <div className="flex justify-between mb-4">
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:text-gray-900 text-gray-600 hover:border-gray-300 transition-all">
                            <Upload size={16} /> Import CSV
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:text-gray-900 text-gray-600 hover:border-gray-300 transition-all">
                            <Download size={16} /> Export
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-sm font-bold shadow-lg shadow-red-900/20 transition-all">
                        <Save size={16} /> Save Changes
                    </button>
                </div>

                {/* Grading Table */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-xs text-gray-600 uppercase border-b border-gray-200">
                                    <th className="py-4 px-6 font-semibold w-64">Student</th>
                                    <th className="py-4 px-6 font-semibold w-32">Midterm (30%)</th>
                                    <th className="py-4 px-6 font-semibold w-32">Assign. (30%)</th>
                                    <th className="py-4 px-6 font-semibold w-32">Final (40%)</th>
                                    <th className="py-4 px-6 font-semibold w-32 text-right">Total</th>
                                    <th className="py-4 px-6 font-semibold w-24 text-center">Grade</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-200">
                                {grades.map(student => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-bold text-gray-900">{student.name}</div>
                                                <div className="text-xs text-gray-500 font-mono">{student.id}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <input
                                                aria-label={`Midterm grade for ${student.name}`}
                                                type="number"
                                                value={student.midterm}
                                                onChange={(e) => handleGradeChange(student.id, 'midterm', e.target.value)}
                                                className="w-20 bg-white border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <input
                                                aria-label={`Assignments grade for ${student.name}`}
                                                type="number"
                                                value={student.assignments}
                                                onChange={(e) => handleGradeChange(student.id, 'assignments', e.target.value)}
                                                className="w-20 bg-white border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <input
                                                aria-label={`Final grade for ${student.name}`}
                                                type="number"
                                                value={student.final}
                                                onChange={(e) => handleGradeChange(student.id, 'final', e.target.value)}
                                                className={`w-20 bg-white border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all ${student.final === 0 ? 'text-gray-400' : 'text-gray-900'}`}
                                            />
                                        </td>
                                        <td className="py-4 px-6 text-right font-mono font-bold text-gray-900">
                                            {student.total.toFixed(1)}%
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className={`inline-block w-8 py-1 rounded font-bold text-xs ${student.grade.startsWith('A') ? 'bg-green-100 text-green-700 border border-green-200' :
                                                student.grade.startsWith('B') ? 'bg-gray-100 text-gray-700 border border-gray-200' :
                                                    student.grade === 'F' ? 'bg-red-100 text-red-700 border border-red-200' :
                                                        'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                                }`}>
                                                {student.grade}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-gray-50 p-3 text-center text-xs text-gray-500 border-t border-gray-200">
                        Auto-saved 2 minutes ago
                    </div>
                </div>

            </main>
        </div>
    );
}

// Helpers
function SidebarItem({ icon, label, active = false, href = '#' }: { icon: React.ReactNode, label: string, active?: boolean, href?: string }) {
    return (
        <a href={href} className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-red-700 text-white shadow-lg shadow-red-900/20' : 'text-gray-600 hover:text-gray-900'}`}>
            {icon}
            {label}
        </a>
    )
}

function StatBox({ label, value, sub, trend, good }: any) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="text-gray-600 text-xs mb-1">{label}</div>
            <div className="flex items-end gap-2">
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <div className={`text-xs font-bold mb-1 ${good ? 'text-green-600' : 'text-red-600'}`}>
                        {trend}
                    </div>
                )}
            </div>
            {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
        </div>
    )
}
