
import React, { useState } from 'react';
import {
    User, Shield, Bell, Eye, Link, LogOut, Camera, CheckCircle,
    Calendar, Mail, Lock, Sliders
} from 'lucide-react';

export default function StudentProfile() {
    const [activeTab, setActiveTab] = useState('Personal Info');

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-[sans-serif] flex">

            {/* Sidebar - Matching specific profile view sidebar */}
            <aside className="w-72 border-r border-gray-200 bg-white flex flex-col fixed h-full z-10">
                <div className="p-6 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-lg text-gray-900">Adeleke University</span>
                    </div>
                </div>

                {/* Mini Profile Card in Sidebar */}
                <div className="px-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-900">Alex Rivera</div>
                            <div className="text-[10px] text-gray-500">CS Major</div>
                        </div>
                    </div>
                </div>

                <nav className="px-4 space-y-1">
                    <SidebarResultItem icon={<User size={18} />} label="Profile Overview" active />
                    <SidebarResultItem icon={<Shield size={18} />} label="Account Security" />
                    <SidebarResultItem icon={<Bell size={18} />} label="Notifications" />
                    <SidebarResultItem icon={<Eye size={18} />} label="Appearance" />
                    <SidebarResultItem icon={<Link size={18} />} label="Connected Apps" />
                </nav>

                <div className="mt-auto p-6 border-t border-gray-200">
                    <button className="flex items-center gap-3 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-8 relative">

                {/* Header & Search */}
                <header className="flex justify-end mb-8 gap-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" placeholder="Search courses, resources..." className="bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-600 w-80 text-gray-900 placeholder-gray-400" />
                    </div>
                    <div className="flex gap-2">
                        <button title="Notifications" className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-red-600"><Bell size={18} /></button>
                        <button title="Filters" className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-red-600"><Sliders size={18} /></button>
                        <div className="w-9 h-9 rounded-full bg-red-100 overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Profile Banner */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="flex items-center gap-8 relative z-10">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-red-600 to-red-800">
                                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Large Profile" className="w-full h-full rounded-full object-cover border-4 border-white" />
                            </div>
                            <button title="Change profile picture" className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-full border-4 border-white hover:bg-red-700 transition-colors shadow-sm">
                                <Camera size={14} />
                            </button>
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-gray-900">Alex Rivera</h1>
                            <div className="text-gray-500 text-sm mb-4">Student ID: <span className="text-gray-900 font-mono">90210</span> • Computer Science • Class of 2025</div>
                            <div className="flex gap-3">
                                <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div> Enrolled
                                </span>
                                <span className="bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1.5">
                                    <GraduationCapIcon size={12} /> Good Standing
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 border-b border-gray-200 mb-8 text-sm font-medium">
                    {['Personal Info', 'Academic Data', 'Emergency Contacts', 'Privacy'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 transition-colors relative ${activeTab === tab ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-t-full"></div>}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-20">

                    {/* Left Column (Forms) */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Basic Details */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="text-red-600" size={20} />
                                <h3 className="font-bold text-lg text-gray-900">Basic Details</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                                    <input type="text" defaultValue="Alex" aria-label="First Name" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-600 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                                    <input type="text" defaultValue="Rivera" aria-label="Last Name" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-600 transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date of Birth</label>
                                    <div className="relative">
                                        <input type="text" defaultValue="January 15, 2003" aria-label="Date of Birth" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-600 transition-colors" />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pronouns</label>
                                    <input type="text" defaultValue="He/Him" aria-label="Pronouns" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-600 transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Mail className="text-red-600" size={20} />
                                <h3 className="font-bold text-lg text-gray-900">Contact Information</h3>
                            </div>

                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">University Email</label>
                                <div className="flex gap-2">
                                    <input type="text" defaultValue="alex.rivera@adeleke.edu" disabled aria-label="University Email" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed" />
                                    <div className="bg-green-50 border border-green-200 px-3 rounded-lg flex items-center justify-center">
                                        <CheckCircle size={18} className="text-green-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Personal Email</label>
                                    <input type="text" defaultValue="alex.r@gmail.com" aria-label="Personal Email" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-600 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                                    <input type="text" defaultValue="+1 (555) 012-3456" aria-label="Phone Number" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-red-600 transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Campus Address</label>
                                <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 flex justify-between items-center">
                                    <span>North Quad Dorms, Building B, Room 304</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Preferences) */}
                    <div className="space-y-6">
                        {/* Preferences */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Sliders className="text-red-600" size={20} />
                                <h3 className="font-bold text-lg text-gray-900">Preferences</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium text-sm text-gray-900">Grade Notifications</div>
                                        <div className="text-xs text-gray-500">Email me when grades post</div>
                                    </div>
                                    <div className="w-10 h-6 bg-red-600 rounded-full relative cursor-pointer">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium text-sm text-gray-900">Public Profile</div>
                                        <div className="text-xs text-gray-500">Visible to other students</div>
                                    </div>
                                    <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center opacity-50">
                                    <div>
                                        <div className="font-medium text-sm flex items-center gap-2 text-gray-900">Campus Alerts <Lock size={10} /></div>
                                        <div className="text-xs text-gray-500">Emergency broadcasts</div>
                                    </div>
                                    <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Advisor */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Academic Advisor</div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Advisor" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Dr. Sarah Chen</div>
                                    <div className="text-xs text-gray-500">Computer Science Dept.</div>
                                </div>
                            </div>
                            <button className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                                Schedule Appointment
                            </button>
                        </div>
                    </div>

                </div>

                {/* Floating Footer Action */}
                <div className="fixed bottom-8 right-8 z-20 flex items-center gap-4 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-2xl flex-row-reverse animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-red-900/20 transition-all">
                        Save Changes
                    </button>
                    <button className="text-gray-500 hover:text-gray-900 text-sm font-medium mr-4">
                        Reset
                    </button>
                    <div className="h-6 w-px bg-gray-200 mx-2"></div>
                    <span className="text-gray-500 text-sm">Unsaved changes</span>
                </div>

            </main>
        </div>
    );
}

// Helpers
function SearchIcon({ className, size }: { className?: string, size?: number }) {
    return <Search className={className} size={size} strokeWidth={2} />
}

function GraduationCapIcon({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
    )
}

// Lucide Icon Wrapper to avoid conflicts if needed, but using direct imports above.
import { Search } from 'lucide-react';

function SidebarResultItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
            {icon}
            {label}
        </a>
    )
}
