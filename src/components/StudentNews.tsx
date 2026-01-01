
import React, { useState } from 'react';
import {
    Bell, Search, AlertTriangle, X, Book, Mail,
    BarChart2, GraduationCap, Calendar, ArrowRight,
    Clock, MapPin
} from 'lucide-react';

// Interfaces
interface NewsArticle {
    id: string;
    category: 'Featured' | 'Campus Life' | 'Sports' | 'Academic';
    title: string;
    date: string;
    image: string;
    description: string;
    readTime?: string;
}

interface EventItem {
    id: string;
    day: string;
    month: string;
    title: string;
    location: string;
    time: string;
}

// Dummy Data
const events: EventItem[] = [
    { id: '1', day: '12', month: 'OCT', title: 'Fall Career Fair', location: 'Student Center', time: '10:00 AM' },
    { id: '2', day: '15', month: 'OCT', title: 'Mid-term Study Break', location: 'Main Library', time: '6:00 PM' },
    { id: '3', day: '22', month: 'OCT', title: 'Alumni Meet & Greet', location: 'Alumni Hall', time: '4:00 PM' }
];

const newsArticles: NewsArticle[] = [
    {
        id: '2',
        category: 'Campus Life',
        title: 'New Science Wing Ribbon Cutting Ceremony',
        date: 'Oct 10, 2023',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
        description: 'Join us for the grand opening of the new state-of-the-art laboratory facilities this Friday.'
    },
    {
        id: '3',
        category: 'Sports',
        title: 'Varsity Football: Home Game Tickets Now Available',
        date: 'Oct 08, 2023',
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000',
        description: 'Students get 50% off for the homecoming game. Grab yours before they sell out!'
    },
    {
        id: '4',
        category: 'Academic',
        title: 'Guest Lecture: The Future of AI in 2024',
        date: 'Oct 05, 2023',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
        description: 'Dr. Sarah Connor will be discussing the ethical implications of generative AI in modern education.'
    }
];

export default function StudentNews() {
    const [activeTab, setActiveTab] = useState('All News');

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-[sans-serif]">

            {/* Top Navigation */}
            <nav className="border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-lg">Adeleke University</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Academics</a>
                        <a href="#" className="text-gray-900">Campus Life</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button title="Notifications" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
                        </button>
                        <div className="w-9 h-9 rounded-full bg-orange-200 overflow-hidden border-2 border-gray-200">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Alert Banner */}
            <div className="bg-red-700 text-white px-6 py-3 flex items-center justify-center relative shadow-[0_0_20px_rgba(220,38,38,0.3)] z-10">
                <div className="flex items-center gap-3 text-sm font-medium">
                    <AlertTriangle size={18} fill="white" className="text-red-700" />
                    <span><span className="font-bold">CAMPUS ALERT:</span> Heavy Snowfall Warning. Classes cancelled for Feb 12th.</span>
                </div>
                <button title="Close alert" className="absolute right-6 top-1/2 -translate-y-1/2 hover:bg-red-600 p-1 rounded-full transition-colors">
                    <X size={16} />
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="flex justify-between items-center mb-8">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input type="text" placeholder="Search announcements, news, or events..." className="w-full bg-white text-gray-900 rounded-full pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 shadow-lg" />
                    </div>

                    {/* Quick Access Icons */}
                    <div className="flex items-center gap-6">
                        <QuickAccessItem icon={<Book size={18} />} label="Library" color="text-cyan-700" bg="bg-cyan-100" />
                        <QuickAccessItem icon={<Mail size={18} />} label="Email" color="text-purple-700" bg="bg-purple-100" />
                        <QuickAccessItem icon={<BarChart2 size={18} />} label="Grades" color="text-green-700" bg="bg-green-100" />
                        <QuickAccessItem icon={<GraduationCap size={18} />} label="Canvas" color="text-orange-700" bg="bg-orange-100" />
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Content (News) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero News */}
                        <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000" alt="New Term" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
                                <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Featured</span>
                                <h2 className="text-4xl font-bold mb-4 leading-tight text-white">Fall Semester Registration Opens Monday</h2>
                                <p className="text-gray-200 mb-6 text-sm line-clamp-2">Get ready to pick your classes for the upcoming term. Check your eligibility status now and schedule an appointment with your advisor.</p>
                                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
                                    Read More <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* News Tabs/Filters */}
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {['All News', 'Academic', 'Campus Life', 'Sports'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${activeTab === tab ? 'bg-red-700 border-red-700 text-white' : 'bg-transparent border-gray-300 text-gray-600 hover:border-gray-400'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {newsArticles.map(article => (
                                <div key={article.id} className={`bg-white border border-gray-200 rounded-2xl overflow-hidden group cursor-pointer hover:border-gray-300 transition-colors ${article.category === 'Academic' ? 'md:col-span-2 flex flex-row' : ''}`}>
                                    {/* Image Handling for Featured Layouts */}
                                    <div className={`${article.category === 'Academic' ? 'w-1/3' : 'h-48'} overflow-hidden relative`}>
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded uppercase">{article.category}</span>
                                        </div>
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>

                                    <div className={`p-5 flex flex-col justify-center ${article.category === 'Academic' ? 'w-2/3' : ''}`}>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                            <Calendar size={12} />
                                            <span>{article.date}</span>
                                        </div>
                                        <h3 className={`${article.category === 'Academic' ? 'text-2xl' : 'text-lg'} font-bold mb-2 leading-snug group-hover:text-red-600 transition-colors`}>{article.title}</h3>
                                        <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed mb-4">{article.description}</p>
                                        {article.category === 'Academic' && (
                                            <span className="text-red-600 text-xs font-bold hover:underline">Read Full Article</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Right Content (Events) */}
                    <div className="space-y-8">
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-red-600" size={20} />
                                    <h3 className="font-bold text-lg">Upcoming Events</h3>
                                </div>
                                <a href="#" className="text-red-600 text-xs hover:underline">View Calendar</a>
                            </div>

                            <div className="space-y-6 relative before:content-[''] before:absolute before:left-[2.25rem] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200">
                                {events.map(event => (
                                    <div key={event.id} className="relative flex items-start gap-4 z-10 group cursor-pointer">
                                        <div className="bg-white border border-gray-200 rounded-xl w-[4.5rem] py-3 flex flex-col items-center justify-center shrink-0 group-hover:border-red-600 transition-colors shadow-sm">
                                            <span className="text-[10px] text-red-600 font-bold uppercase">{event.month}</span>
                                            <span className="text-xl font-bold">{event.day}</span>
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="font-bold text-sm mb-1 group-hover:text-red-600 transition-colors">{event.title}</h4>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <div className="flex items-center gap-1"><MapPin size={10} /> {event.location}</div>
                                                <div className="flex items-center gap-1"><Clock size={10} /> {event.time}</div>
                                            </div>
                                            <div className="mt-2 text-[10px] text-gray-500 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
                                                    <span className="text-[8px]">+</span>
                                                </div>
                                                Add to calendar
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-6 border-t border-gray-200">
                                <button className="w-full py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 transition-colors">
                                    See Full Schedule
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

// Helpers
function QuickAccessItem({ icon, label, bg, color }: { icon: React.ReactNode, label: string, bg: string, color: string }) {
    return (
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className={`w-12 h-12 rounded-full ${bg} ${color} flex items-center justify-center border border-gray-200 shadow-sm group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <span className="text-[10px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
        </div>
    )
}
