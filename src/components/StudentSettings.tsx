
import React, { useState } from 'react';
import {
    LayoutGrid, BookOpen, Calendar, GraduationCap,
    Settings, LogOut, Info, User, Lock,
    Bell, Moon, Shield, Save
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentSettings() {
    const [activeTab, setActiveTab] = useState('profile');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: true,
        news: false
    });


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
                    <SidebarItem icon={<Info size={18} />} label="Grades" href="/grades" />

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <SidebarItem icon={<Settings size={18} />} label="Settings" active />
                    </div>
                </nav>

                <button className="mt-auto flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:text-red-600 transition-colors">
                    <LogOut size={18} />
                    Log Out
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">

                <header className="mb-8 border-b border-gray-200 pb-8">
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">Account Settings</h1>
                    <p className="text-gray-500 text-sm">Manage your profile, security, and application preferences.</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Settings Nav */}
                    <div className="w-full lg:w-64 shrink-0 space-y-2">
                        <SettingsTab label="Profile Info" icon={User} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                        <SettingsTab label="Security" icon={Lock} active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
                        <SettingsTab label="Notifications" icon={Bell} active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
                        <SettingsTab label="Appearance" icon={Moon} active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')} />
                        <SettingsTab label="Privacy" icon={Shield} active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-6 text-gray-900">Personal Information</h2>

                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 shrink-0 overflow-hidden border-4 border-white shadow-sm">
                                        <img src="https://i.pravatar.cc/300" alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <button title="Change Avatar" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">Change Avatar</button>
                                        <div className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size 800K</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup label="First Name" value="Alex" />
                                    <InputGroup label="Last Name" value="Rivera" />
                                    <InputGroup label="Email Address" value="alex.rivera@student.au.edu.ng" disabled />
                                    <InputGroup label="Phone Number" value="+234 812 345 6789" />
                                    <InputGroup label="Matric Number" value="19/08834" disabled />
                                    <InputGroup label="Department" value="Computer Science" disabled />
                                </div>

                                <div className="pt-6 border-t border-gray-200 flex justify-end">
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-900/20">
                                        <Save size={16} /> Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-8">
                                <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>

                                <div className="space-y-6">
                                    <ToggleRow
                                        label="Email Notifications"
                                        desc="Receive updates, course alerts, and announcements via email."
                                        checked={notifications.email}
                                        onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                                    />
                                    <ToggleRow
                                        label="Push Notifications"
                                        desc="Receive real-time alerts on your mobile device."
                                        checked={notifications.push}
                                        onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
                                    />
                                    <ToggleRow
                                        label="SMS Alerts"
                                        desc="Receive critical alerts (e.g., grades released) via SMS."
                                        checked={notifications.sms}
                                        onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                                    />
                                    <ToggleRow
                                        label="University News"
                                        desc="Weekly newsletter and periodic updates from the VC."
                                        checked={notifications.news}
                                        onChange={() => setNotifications({ ...notifications, news: !notifications.news })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Placeholders for other tabs */}
                        {(activeTab === 'security' || activeTab === 'appearance' || activeTab === 'privacy') && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <Settings size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Coming Soon</h3>
                                <p className="text-gray-500 text-sm mt-2">This settings panel is currently under development.</p>
                            </div>
                        )}

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

function SettingsTab({ label, icon: Icon, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-red-50 text-red-600 border border-red-200' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
        >
            <Icon size={18} />
            {label}
        </button>
    )
}

function InputGroup({ label, value, disabled }: any) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500">{label}</label>
            <input
                type="text"
                defaultValue={value}
                disabled={disabled}
                aria-label={label}
                className={`w-full bg-white border border-gray-200 text-gray-900 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-red-600 transition-all ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
            />
        </div>
    )
}

function ToggleRow({ label, desc, checked, onChange }: any) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <div className="font-bold text-sm text-gray-900">{label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
            </div>
            <button
                onClick={onChange}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-red-600' : 'bg-gray-300'}`}
            >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
        </div>
    )
}
