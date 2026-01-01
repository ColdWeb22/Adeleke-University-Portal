


import LoginCard from './Login';
import { BookOpen, Calendar, Users, ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
    return (
        <div className="min-h-screen w-full bg-[#f8f9fc] flex items-center justify-center relative overflow-hidden px-6 lg:px-16 pt-20 selection:bg-red-100 selection:text-red-900">
            {/* Background Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px]"></div>
            <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]"></div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center z-10 relative">
                <div className="text-left space-y-8 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/60 px-4 py-1.5 rounded-full text-xs font-bold text-red-600 uppercase tracking-wider shadow-sm mb-2">
                        <Zap size={14} fill="currentColor" />
                        <span>Next Gen Portal</span>
                    </div>
                    
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 leading-[0.9] tracking-tighter">
                        Future <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Ready.</span>
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
                        Experience the new standard of academic management. Seamless, fast, and designed for you.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/60 hover:bg-white hover:shadow-xl hover:shadow-red-500/10 text-gray-900 px-6 py-4 rounded-[2rem] transition-all group">
                            <div className="p-2 bg-red-50 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors text-red-600">
                                <BookOpen size={20} />
                            </div>
                            <span className="font-bold text-sm">Resources</span>
                        </button>
                        <button className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/60 hover:bg-white hover:shadow-xl hover:shadow-orange-500/10 text-gray-900 px-6 py-4 rounded-[2rem] transition-all group">
                            <div className="p-2 bg-orange-50 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors text-orange-600">
                                <Calendar size={20} />
                            </div>
                            <span className="font-bold text-sm">Schedules</span>
                        </button>
                        <button className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/60 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 text-gray-900 px-6 py-4 rounded-[2rem] transition-all group">
                            <div className="p-2 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
                                <Users size={20} />
                            </div>
                            <span className="font-bold text-sm">Community</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-center lg:justify-end w-full relative">
                    {/* Decorative Elements behind Login */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-red-500/10 to-transparent rounded-full blur-3xl -z-10"></div>
                    <LoginCard />
                </div>
            </div>
        </div>
    );
}
