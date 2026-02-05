'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    email: string;
    name?: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, name?: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('sparrow_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error('Failed to parse user', e);
            }
        }
    }, []);

    // Save user to localStorage when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('sparrow_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('sparrow_user');
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Placeholder: Local auth only for now
        // In production, this would call Wix Members API
        if (email && password) {
            setUser({
                id: `user_${Date.now()}`,
                email,
                name: email.split('@')[0],
            });
            return true;
        }
        return false;
    };

    const signup = async (email: string, password: string, name?: string): Promise<boolean> => {
        // Placeholder: Local auth only for now
        if (email && password) {
            setUser({
                id: `user_${Date.now()}`,
                email,
                name: name || email.split('@')[0],
            });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (data: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...data });
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn: !!user,
            login,
            signup,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
