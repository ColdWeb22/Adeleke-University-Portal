import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, Cast, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { signupSchema, loginSchema, type SignupFormData, type LoginFormData } from '../lib/validations';

export default function LoginCard() {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [role, setRole] = useState<'student' | 'lecturer'>('student');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { signIn, signUp } = useAuth();

    // Login form with validation
    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Signup form with validation
    const signupForm = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            role: 'student',
        },
    });

    // Sync role with form
    const handleRoleChange = (newRole: 'student' | 'lecturer') => {
        setRole(newRole);
        signupForm.setValue('role', newRole);
    };

    const handleLogin = async (data: LoginFormData) => {
        setLoading(true);

        const { error: signInError } = await signIn(data.email, data.password);

        if (signInError) {
            toast.error(signInError.message);
            setLoading(false);
        } else {
            toast.success('Login successful!');
            // Navigate based on selected role
            if (role === 'student') {
                navigate('/dashboard');
            } else {
                navigate('/lecturer/dashboard');
            }
        }
    };

    const handleSignup = async (data: SignupFormData) => {
        setLoading(true);

        const { error: signUpError } = await signUp(data.email, data.password, data.fullName, data.role);

        if (signUpError) {
            toast.error(signUpError.message);
        } else {
            toast.success('Account created! Please check your email to confirm your account.');
            signupForm.reset();
            // Switch to login tab after 2 seconds
            setTimeout(() => {
                setActiveTab('login');
            }, 2000);
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl shadow-gray-200/50 p-8 relative overflow-hidden">
            {/* Decorative top gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>

            {/* Tab Switcher */}
            <div className="flex p-1 bg-gray-100/50 backdrop-blur-sm rounded-full mb-8 border border-white/50">
                <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'login'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                        }`}
                >
                    Log In
                </button>
                <button
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'signup'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                        }`}
                >
                    Sign Up
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                    {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-500 text-sm">
                    {activeTab === 'login' ? 'Please select your role to continue' : 'Join Adeleke University Portal'}
                </p>
            </div>

            {/* Role Selector */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                    onClick={() => handleRoleChange('student')}
                    type="button"
                    className={`relative p-4 rounded-2xl border flex flex-col items-start gap-3 transition-all cursor-pointer group ${role === 'student'
                        ? 'bg-red-50/50 border-red-200 shadow-lg shadow-red-500/10'
                        : 'bg-white/50 border-white/60 hover:border-red-200 hover:bg-red-50/30'
                        }`}
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${role === 'student' ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' : 'bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-600'}`}>
                        <GraduationCap size={20} />
                    </div>
                    <div className="text-left">
                        <div className="text-gray-900 font-bold text-sm">Student</div>
                        <div className="text-gray-500 text-[10px] font-medium">Access courses</div>
                    </div>
                    {role === 'student' && (
                        <div className="absolute top-3 right-3 text-red-500">
                            <div className="bg-red-100 rounded-full p-1">
                                <Check size={10} className="text-red-600" strokeWidth={3} />
                            </div>
                        </div>
                    )}
                </button>

                <button
                    onClick={() => handleRoleChange('lecturer')}
                    type="button"
                    className={`relative p-4 rounded-2xl border flex flex-col items-start gap-3 transition-all cursor-pointer group ${role === 'lecturer'
                        ? 'bg-red-50/50 border-red-200 shadow-lg shadow-red-500/10'
                        : 'bg-white/50 border-white/60 hover:border-red-200 hover:bg-red-50/30'
                        }`}
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${role === 'lecturer' ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' : 'bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-600'}`}>
                        <Cast size={20} />
                    </div>
                    <div className="text-left">
                        <div className="text-gray-900 font-bold text-sm">Lecturer</div>
                        <div className="text-gray-500 text-[10px] font-medium">Manage classes</div>
                    </div>
                    {role === 'lecturer' && (
                        <div className="absolute top-3 right-3 text-red-500">
                            <div className="bg-red-100 rounded-full p-1">
                                <Check size={10} className="text-red-600" strokeWidth={3} />
                            </div>
                        </div>
                    )}
                </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Email Address</label>
                        <input
                            {...loginForm.register('email')}
                            type="email"
                            placeholder="your-email@student.au.edu.ng"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                        />
                        {loginForm.formState.errors.email && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {loginForm.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Password</label>
                        <input
                            {...loginForm.register('password')}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                        />
                        {loginForm.formState.errors.password && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {loginForm.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 bg-white border border-gray-300 rounded text-red-600 focus:ring-red-600 focus:ring-offset-0" />
                            <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-xs text-red-600 hover:text-red-700 font-medium hover:underline">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Log In'}
                        {!loading && <ArrowRight size={16} />}
                    </button>
                </form>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
                <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Full Name</label>
                        <input
                            {...signupForm.register('fullName')}
                            type="text"
                            placeholder="Alex Rivera"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                        />
                        {signupForm.formState.errors.fullName && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {signupForm.formState.errors.fullName.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Email Address</label>
                        <input
                            {...signupForm.register('email')}
                            type="email"
                            placeholder="your-email@student.au.edu.ng"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                        />
                        {signupForm.formState.errors.email && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {signupForm.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5 block">Password</label>
                        <input
                            {...signupForm.register('password')}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                        />
                        {signupForm.formState.errors.password && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle size={12} />
                                {signupForm.formState.errors.password.message}
                            </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                            Must contain uppercase, lowercase, and number
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                        {!loading && <ArrowRight size={16} />}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </form>
            )}

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-center text-xs text-gray-400 font-medium">
                    Need help? <a href="#" className="text-red-600 hover:text-red-700 hover:underline">Contact Support</a>
                </p>
            </div>
        </div>
    );
}
