'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

interface AuthContextProps {
  user: { id: string; name: string; email: string, role: string } | null;
  login: (userData: { id: string; name: string; email: string, role: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; name: string; email: string, role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.session) {
      const userData = JSON.parse(cookies.session);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData: { id: string; name: string; email: string, role: string }) => {
    setUser(userData);
    setCookie(null, 'session', JSON.stringify(userData), {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  };

  const logout = () => {
    setUser(null);
    destroyCookie(null, 'session');
    router.push('/auth/signin');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};