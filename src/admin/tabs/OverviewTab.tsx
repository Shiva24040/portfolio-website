import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  Briefcase, 
  FolderGit2, 
  Award, 
  Code, 
  ExternalLink, 
  ShieldCheck 
} from 'lucide-react';

interface OverviewTabProps {
  onNavigateTab: (tabId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { data } = usePortfolio();

  const totalSkills = Array.isArray(data.skills)
    ? data.skills.reduce((acc, g) => acc + (Array.isArray(g?.skills) ? g.skills.length : 0), 0)
    : 0;

  const statCards = [
    {
      label: 'Featured Projects',
      value: Array.isArray(data.projects) ? data.projects.length : 0,
      icon: FolderGit2,
      tab: 'projects',
      color: 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10',
    },
    {
      label: 'Verified Certifications',
      value: Array.isArray(data.certifications) ? data.certifications.length : 0,
      icon: Award,
      tab: 'certifications',
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
    {
      label: 'Technical Skills',
      value: totalSkills,
      icon: Code,
      tab: 'skills',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
    {
      label: 'Experience & Roles',
      value: (Array.isArray(data.experience) ? data.experience.length : 0) + (Array.isArray(data.positions) ? data.positions.length : 0),
      icon: Briefcase,
      tab: 'experience',
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl glass-card border border-cyber-cyan/30 bg-gradient-to-r from-dark-surface via-slate-900 to-dark-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan uppercase font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Portfolio Status: Published &amp; Live</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Welcome back, {data.profile.shortName || data.profile.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            All modifications made in this dashboard are validated on the server and immediately update your public portfolio.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 flex-shrink-0"
        >
          <span>View Live Public Site</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.label}
              onClick={() => onNavigateTab(card.tab)}
              className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-cyber-cyan/40 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl border ${card.color}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-white font-heading">
                {card.value}
              </div>
              <div className="mt-3 text-xs text-cyber-cyan group-hover:underline flex items-center gap-1 font-mono">
                <span>Manage entries &rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Snapshot & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 glass-card p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={data.profile.avatarUrl || './images/shiva-photo.jpg'}
              alt={data.profile.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-cyber-cyan/50 shadow-neon-cyan"
            />
            <div>
              <h3 className="text-lg font-bold text-white font-heading">{data.profile.name}</h3>
              <p className="text-xs text-cyber-cyan font-mono">{data.profile.title}</p>
              <span className="text-[11px] text-slate-400 block mt-0.5">{data.profile.location}</span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('photo')}
            className="w-full mt-2 py-2 px-3 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors"
          >
            Update Profile Photo
          </button>
        </div>

        {/* Security & System Info */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Active Security Safeguards</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-0.5">Authentication</span>
              <span>HTTP-Only SameSite Cookie Session</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-0.5">Password Storage</span>
              <span>Bcrypt Salt 12 Hash</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-0.5">Rate Limiting</span>
              <span>Active on login (5 attempts max / 15m)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-white block mb-0.5">Public Protection</span>
              <span>All write endpoints require server token</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
