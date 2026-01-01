import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ('student' | 'lecturer' | 'admin')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-900 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user || !profile) {
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
