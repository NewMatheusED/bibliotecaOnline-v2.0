'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  user: { id: string; name: string; email: string, role: string, profilePicture: string } | null;
  login: (userData: { id: string; name: string; email: string, role: string, profilePicture: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; name: string; email: string, role: string, profilePicture: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTimestamp = localStorage.getItem('userTimestamp');
    if (storedUser && storedTimestamp) {
      const userData = JSON.parse(storedUser);
      const timestamp = parseInt(storedTimestamp, 10);
      const currentTime = new Date().getTime();

      if (currentTime - timestamp < SESSION_DURATION) {
        setUser(userData);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('userTimestamp');
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userTimestamp', new Date().getTime().toString());
      const lastVisitedPage = localStorage.getItem('lastVisitedPage') || '/';
      if (lastVisitedPage === '/auth/signin') {
        router.push('/');
      } else {
        router.push(lastVisitedPage);
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userTimestamp');
    }
  }, [user, router]);

  const login = (userData: { id: string; name: string; email: string, role: string, profilePicture: string }) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userTimestamp', new Date().getTime().toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userTimestamp');
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