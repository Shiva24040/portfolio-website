import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Key, ShieldCheck, AlertCircle } from 'lucide-react';

interface SettingsTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ onToast }) => {
  const { ownerEmail } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        onToast('Password changed successfully! Keep your credentials safe.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(json.message || 'Failed to change password.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold text-white font-heading">
          Security &amp; Account Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your owner credentials, password hashing keys, and access controls.
        </p>
      </div>

      {/* Account Info */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Authorized Owner Profile</span>
        </h3>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-mono">OWNER EMAIL</span>
            <span className="text-sm font-bold text-white">{ownerEmail || 'shivananigurrala22@gmail.com'}</span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Active Administrator
          </span>
        </div>
      </div>

      {/* Change Password Form */}
      <form onSubmit={handleChangePassword} className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white font-heading flex items-center gap-2 border-b border-slate-800 pb-3">
          <Key className="w-5 h-5 text-cyber-cyan" />
          <span>Change Account Password</span>
        </h3>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-mono uppercase text-slate-400 mb-1.5">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-slate-400 mb-1.5">
              New Password (Minimum 8 characters) *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
              placeholder="Enter new strong password"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-slate-400 mb-1.5">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
              placeholder="Re-enter new password"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Updating Password...' : 'Update Password'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
