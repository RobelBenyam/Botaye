import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth.user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const isAuthenticated = !!user;

  const signIn = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 300));
    const mockUser: User = { id: '1', name: 'Sarah Admin', email, role: 'admin' };
    setUser(mockUser);
    localStorage.setItem('auth.user', JSON.stringify(mockUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('auth.user');
  };

  const resetPassword = async (_email: string) => {
    await new Promise((r) => setTimeout(r, 300));
  };

  const value = useMemo(() => ({ user, isAuthenticated, signIn, signOut, resetPassword }), [user, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
} 