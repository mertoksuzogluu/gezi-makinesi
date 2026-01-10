'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AdminContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Default context value for SSR
const defaultContextValue: AdminContextType = {
  admin: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false, error: 'Not initialized' }),
  logout: () => {},
};

const AdminContext = createContext<AdminContextType>(defaultContextValue);

// Demo admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@gezimakinesi.com',
  password: 'admin123',
  name: 'Admin',
  id: 'admin-1'
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for admin session
    try {
      const storedAdmin = localStorage.getItem('gezi_admin');
      if (storedAdmin) {
        const parsed = JSON.parse(storedAdmin);
        setAdmin(parsed);
      }
    } catch {
      localStorage.removeItem('gezi_admin');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser: AdminUser = {
        id: ADMIN_CREDENTIALS.id,
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: 'admin'
      };
      setAdmin(adminUser);
      localStorage.setItem('gezi_admin', JSON.stringify(adminUser));
      return { success: true };
    }

    return { success: false, error: 'Geçersiz e-posta veya şifre' };
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('gezi_admin');
  };

  return (
    <AdminContext.Provider value={{
      admin,
      isAuthenticated: !!admin,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}

// Admin guard component
export function AdminGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/admin/giris');
      } else {
        setChecked(true);
      }
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
