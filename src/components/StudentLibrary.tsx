
import React, { useState } from 'react';
import {
    LayoutGrid, BookOpen, Calendar, GraduationCap,
    Settings, LogOut, Search, Info, Book, FileText,
    Clock, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Resource {
    id: string;
    title: string;
    author: string;
    type: 'Book' | 'Journal' | 'PDF';
    cover: string;
    available?: boolean;
}

const featuredResources: Resource[] = [
    { id: '1', title: 'Introduction to Algorithms', author: 'Cormen et al.', type: 'Book', cover: 'https://m.media-amazon.com/images/I/41T0iUx8loo.jpg', available: true },
    { id: '2', title: 'Clean Code', author: 'Robert C. Martin', type: 'Book', cover: 'https://m.media-amazon.com/images/I/41jEbK-jG+L.jpg', available: false },
    { id: '3', title: 'Modern Operating Systems', author: 'Andrew S. Tanenbaum', type: 'Book', cover: 'https://m.media-amazon.com/images/I/51fRKyqVtvL.jpg', available: true },
    { id: '4', title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig', type: 'Book', cover: 'https://m.media-amazon.com/images/I/51L-4d1lJBL.jpg', available: true },
];

const digitalReserves: Resource[] = [
    { id: '5', title: 'CSC 201: Data Structures Notes', author: 'Dr. Wilson', type: 'PDF', cover: '' },
    { id: '6', title: 'MTH 201: Linear Algebra Workbook', author: 'Dr. Johnson', type: 'PDF', cover: '' },
    { id: '7', title: 'Research Methodology 101', author: 'Library Staff', type: 'PDF', cover: '' },
];

export default function StudentLibrary() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-[sans-serif]">

            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white flex flex-col fixed h-full z-10 p-4">
                <div className="flex items-center gap-3 px-2 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 to-yellow-600 flex items-center justify-center font-bold text-lg text-white">
                        A
                    </div>
                    <span className="font-bold text-lg tracking-tight">Adeleke Uni</span>
                </div>

                <nav className="space-y-1">
                    <SidebarItem icon={<LayoutGrid size={18} />} label="Dashboard" href="/dashboard" />
                    <SidebarItem icon={<BookOpen size={18} />} label="My Courses" href="/schedule" />
                    <SidebarItem icon={<Calendar size={18} />} label="Timetable" href="/timetable" />
                    <SidebarItem icon={<GraduationCap size={18} />} label="Registration" href="/registration" />
                    <SidebarItem icon={<Info size={18} />} label="Grades" href="/grades" />

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

                <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Digital Library</h1>
                    <p className="text-gray-600 text-sm">Access millions of resources, books, and journals.</p>
                </header>

                {/* Search Hero */}
                <div className="bg-gradient-to-r from-red-900/40 to-yellow-900/40 border border-gray-200 rounded-2xl p-8 mb-10 relative overflow-hidden">
                    <div className="max-w-2xl mx-auto text-center relative z-10">
                        <h2 className="text-2xl font-bold mb-6">What are you looking for today?</h2>
                        <div className="relative">
                            <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for books, articles, journals, or media..."
                                className="w-full bg-white border border-gray-300 text-gray-900 pl-14 pr-6 py-4 rounded-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-lg shadow-lg"
                            />
                        </div>
                        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
                            <span className="hover:text-red-600 cursor-pointer">Advanced Search</span>
                            <span>•</span>
                            <span className="hover:text-red-600 cursor-pointer">Course Reserves</span>
                            <span>•</span>
                            <span className="hover:text-red-600 cursor-pointer">Ask a Librarian</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Col: Catalog */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Featured Books */}
                        <section>
                            <div className="flex justify-between items-end mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Book size={20} className="text-red-600" />
                                    Featured & New Arrivals
                                </h3>
                                <a href="#" className="text-xs text-red-600 font-semibold hover:underline">View All</a>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {featuredResources.map(book => (
                                    <div key={book.id} className="group">
                                        <div className="aspect-[2/3] bg-gray-200 rounded-lg mb-3 overflow-hidden relative shadow-lg">
                                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            {!book.available && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Checked Out</span>
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-sm leading-tight mb-1 group-hover:text-red-600 transition-colors">{book.title}</h4>
                                        <p className="text-xs text-gray-500">{book.author}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Course Reserves / Digital Materials */}
                        <section>
                            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                                <FileText size={20} className="text-yellow-600" />
                                Digital Course Reserves
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {digitalReserves.map(item => (
                                    <div key={item.id} className="bg-white border border-gray-200 p-4 rounded-xl flex items-start gap-4 hover:border-gray-300 transition-all group cursor-pointer">
                                        <div className="w-12 h-12 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                                            <FileText size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm group-hover:text-red-600 transition-colors">{item.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{item.author}</p>
                                        </div>
                                        <div className="text-gray-400 group-hover:text-red-600 transition-colors">
                                            <Download size={18} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Right Col: Account & Borrowing */}
                    <div className="space-y-6">

                        {/* Borrowed Status */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <h3 className="font-bold text-lg mb-6">My Account</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Clock size={16} className="text-orange-600" />
                                        <span className="text-sm font-semibold">Due Soon</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex gap-3">
                                        <div className="w-10 h-14 bg-gray-200 rounded overflow-hidden shrink-0">
                                            <img src="https://m.media-amazon.com/images/I/41-11x78cIL.jpg" alt="Book" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold line-clamp-2">Database System Concepts</div>
                                            <div className="text-[10px] text-orange-600 mt-1">Due: Oct 12</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div>
                                            <div className="text-2xl font-bold">1</div>
                                            <div className="text-[10px] text-gray-500">Borrowed</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">0</div>
                                            <div className="text-[10px] text-gray-500">Overdue</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">4</div>
                                            <div className="text-[10px] text-gray-500">Saved</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Library Hours */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                                <Clock size={16} />
                                Library Hours
                            </h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Mon - Fri</span>
                                    <span className="font-bold text-green-600">08:00 AM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sat</span>
                                    <span className="font-bold text-green-600">10:00 AM - 06:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sun</span>
                                    <span className="font-bold text-gray-500">Closed</span>
                                </div>
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
            <div className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-red-700 text-white shadow-lg shadow-red-900/20`}>
                {icon}
                {label}
            </div>
        )
    }
    return (
        <Link to={href} className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-gray-600 hover:text-gray-900`}>
            {icon}
            {label}
        </Link>
    )
}
