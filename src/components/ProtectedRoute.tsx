import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLogin } from '../admin/AdminLogin';
import { Terminal } from 'lucide-react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-base flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-dark-surface border border-cyber-cyan/40 shadow-neon-cyan flex items-center justify-center mb-4">
          <Terminal className="w-6 h-6 text-cyber-cyan animate-pulse" />
        </div>
        <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="w-full h-full bg-cyber-cyan animate-pulse" />
        </div>
        <p className="mt-3 text-xs font-mono text-slate-400">Verifying owner credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
};
