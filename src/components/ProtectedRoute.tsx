import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ('student' | 'lecturer' | 'admin')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, profile, loading } = useAuth();

    // Show loading state
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
                <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="w-20 h-20 border-4 border-red-200 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-gray-900 text-lg font-semibold mb-2">Loading your dashboard...</p>
                    <p className="text-gray-500 text-sm">Please wait a moment</p>
                </div>
            </div>
        );
    }

    // Check authentication
    if (!user) {
        console.log('No user found, redirecting to login');
        return <Navigate to="/" replace />;
    }

    // Check profile - if no profile after loading, redirect to login
    if (!profile) {
        console.error('Profile not found after loading');
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(profile.role)) {
        // Redirect to appropriate dashboard based on role
        if (profile.role === 'student') {
            return <Navigate to="/dashboard" replace />;
        } else if (profile.role === 'lecturer') {
            return <Navigate to="/lecturer/dashboard" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
