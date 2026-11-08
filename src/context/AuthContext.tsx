import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  ownerEmail: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  ownerEmail: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
  checkAuth: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.authenticated) {
          setIsAuthenticated(true);
          setOwnerEmail(json.owner.email);
          return true;
        }
      }
      setIsAuthenticated(false);
      setOwnerEmail(null);
      return false;
    } catch {
      setIsAuthenticated(false);
      setOwnerEmail(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setOwnerEmail(data.owner.email);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Authentication failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Unable to connect to authentication server' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsAuthenticated(false);
      setOwnerEmail(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        ownerEmail,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
