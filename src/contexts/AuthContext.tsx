import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signUp: (email: string, password: string, fullName: string, role: 'student' | 'lecturer') => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

interface UserProfile {
    id: string;
    role: 'student' | 'lecturer' | 'admin';
    full_name: string;
    email: string;
    avatar_url?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth event:', event, session?.user?.email);
            
            setSession(session);
            setUser(session?.user ?? null);
            
            // Handle email confirmation
            if (event === 'SIGNED_IN' && session?.user) {
                await fetchProfile(session.user.id);
                
                // Redirect to appropriate dashboard after email confirmation
                const userRole = session.user.user_metadata?.role;
                if (userRole === 'lecturer') {
                    window.location.href = '/lecturer/dashboard';
                } else {
                    window.location.href = '/dashboard';
                }
            } else if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (error) throw error;
            
            // If no profile exists, try to create one from the user's auth metadata
            if (!data && user) {
                const { data: { user: authUser } } = await supabase.auth.getUser();
                if (authUser) {
                    const newProfile = {
                        id: authUser.id,
                        email: authUser.email || '',
                        full_name: authUser.user_metadata?.full_name || 'User',
                        role: (authUser.user_metadata?.role as 'student' | 'lecturer') || 'student',
                    };
                    
                    const { error: insertError } = await supabase
                        .from('profiles')
                        .insert(newProfile);
                    
                    if (!insertError) {
                        setProfile(newProfile);
                    } else {
                        console.error('Error creating profile:', insertError);
                    }
                }
            } else {
                setProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            // Set profile to null but don't crash the app
            setProfile(null);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const signUp = async (
        email: string,
        password: string,
        fullName: string,
        role: 'student' | 'lecturer'
    ) => {
        // Sign up the user with email confirmation redirect
        // Profile will be created automatically via database trigger
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: role,
                },
                emailRedirectTo: `${window.location.origin}`,
            },
        });

        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        return { error };
    };

    const value = {
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
