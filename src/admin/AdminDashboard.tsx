import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  Image as ImageIcon, 
  FileText, 
  Code, 
  Briefcase, 
  FolderGit2, 
  Award, 
  GraduationCap, 
  Star, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Terminal, 
  Menu, 
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { OverviewTab } from './tabs/OverviewTab';
import { ProfileTab } from './tabs/ProfileTab';
import { PhotoMediaTab } from './tabs/PhotoMediaTab';
import { AboutTab } from './tabs/AboutTab';
import { SkillsTab } from './tabs/SkillsTab';
import { ExperienceTab } from './tabs/ExperienceTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { CertificationsTab } from './tabs/CertificationsTab';
import { EducationTab } from './tabs/EducationTab';
import { AchievementsTab } from './tabs/AchievementsTab';
import { SettingsTab } from './tabs/SettingsTab';
import { ToastContainer } from '../components/Toast';
import type { ToastMessage } from '../components/Toast';

export const AdminDashboard: React.FC = () => {
  const { ownerEmail, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Personal Profile', icon: User },
    { id: 'photo', label: 'Profile Photo & Media', icon: ImageIcon },
    { id: 'about', label: 'About & Philosophy', icon: FileText },
    { id: 'skills', label: 'Technical Skills', icon: Code },
    { id: 'experience', label: 'Work & Internships', icon: Briefcase },
    { id: 'projects', label: 'Projects Showcase', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications (8)', icon: Award },
    { id: 'education', label: 'Education History', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements & Roles', icon: Star },
    { id: 'settings', label: 'Security & Settings', icon: Settings },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'profile':
        return <ProfileTab onToast={addToast} />;
      case 'photo':
        return <PhotoMediaTab onToast={addToast} />;
      case 'about':
        return <AboutTab onToast={addToast} />;
      case 'skills':
        return <SkillsTab onToast={addToast} />;
      case 'experience':
        return <ExperienceTab onToast={addToast} />;
      case 'projects':
        return <ProjectsTab onToast={addToast} />;
      case 'certifications':
        return <CertificationsTab onToast={addToast} />;
      case 'education':
        return <EducationTab onToast={addToast} />;
      case 'achievements':
        return <AchievementsTab onToast={addToast} />;
      case 'settings':
        return <SettingsTab onToast={addToast} />;
      default:
        return <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-base text-slate-100 flex flex-col md:flex-row relative">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 lg:w-72 flex-col justify-between border-r border-cyber-cyan/15 bg-dark-surface/95 backdrop-blur-xl p-5 sticky top-0 h-screen z-30">
        <div>
          {/* Brand & Identity */}
          <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-dark-base border border-cyber-cyan/40 shadow-neon-cyan flex items-center justify-center flex-shrink-0">
              <Terminal className="w-5 h-5 text-cyber-cyan" />
            </div>
            <div>
              <span className="font-extrabold text-base font-heading text-white tracking-wide block">
                SHIVA NANI <span className="text-cyber-cyan">HUB</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{ownerEmail || 'Owner Active'}</span>
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                    isActive
                      ? 'bg-cyber-cyan text-dark-base font-bold shadow-neon-cyan'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Public Website</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">Live</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-dark-surface border-b border-cyber-cyan/15 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-dark-base border border-cyber-cyan/40 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-cyber-cyan" />
          </div>
          <span className="font-extrabold text-sm text-white font-heading">
            SHIVA NANI <span className="text-cyber-cyan">HUB</span>
          </span>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5 text-cyber-cyan" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-dark-base/95 backdrop-blur-2xl p-6 flex flex-col justify-between animate-in slide-in-from-top-4">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <span className="font-bold text-white text-base font-heading">Admin Navigation</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400"
              >
                <X className="w-6 h-6 text-cyber-cyan" />
              </button>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-left ${
                      isActive
                        ? 'bg-cyber-cyan text-dark-base font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white border border-slate-800"
            >
              <ExternalLink className="w-4 h-4 text-cyber-cyan" />
              <span>View Public Website</span>
            </a>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto min-h-screen">
        {renderActiveTab()}
      </main>

      {/* Toast Feedback System */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
