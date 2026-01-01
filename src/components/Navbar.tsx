



import { GraduationCap, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
            <div className={`mx-auto max-w-7xl px-6 transition-all duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-gray-200/5 rounded-full mx-4 lg:mx-auto' : 'bg-transparent'}`}>
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-red-600 to-red-500 text-white p-2 rounded-xl shadow-lg shadow-red-500/20">
                            <GraduationCap size={24} strokeWidth={2} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            Adeleke <span className="text-red-600">University</span>
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Admissions</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Faculties</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Research</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Contact</a>
                        <button className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30">
                            Apply Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 p-4 md:hidden">
                    <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-4 space-y-2">
                        <a href="#" className="block px-4 py-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium transition-colors">Admissions</a>
                        <a href="#" className="block px-4 py-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium transition-colors">Faculties</a>
                        <a href="#" className="block px-4 py-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium transition-colors">Research</a>
                        <a href="#" className="block px-4 py-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium transition-colors">Contact</a>
                        <div className="pt-2">
                            <button className="w-full bg-red-600 text-white px-5 py-3 rounded-xl font-medium shadow-lg shadow-red-500/20">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
