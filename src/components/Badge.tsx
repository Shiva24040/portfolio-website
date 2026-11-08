import React from 'react';
import type { SkillLevel } from '../types/portfolio';
import { CheckCircle2, Eye, BookOpen, Flame } from 'lucide-react';

interface SkillLevelBadgeProps {
  level: SkillLevel;
  size?: 'sm' | 'md';
}

export const SkillLevelBadge: React.FC<SkillLevelBadgeProps> = ({ level, size = 'sm' }) => {
  const getBadgeConfig = (lvl: SkillLevel) => {
    switch (lvl) {
      case 'Completed':
        return {
          icon: CheckCircle2,
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'Familiar':
        return {
          icon: Eye,
          bg: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30',
          dot: 'bg-cyber-cyan',
        };
      case 'Learning':
        return {
          icon: BookOpen,
          bg: 'bg-cyber-violet/15 text-purple-300 border-cyber-violet/30',
          dot: 'bg-cyber-violet',
        };
      case 'Practicing':
        return {
          icon: Flame,
          bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          dot: 'bg-amber-400',
        };
    }
  };

  const config = getBadgeConfig(level);
  const IconComponent = config.icon;

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-sm transition-all duration-200 ${config.bg} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${config.dot}`} />
      <IconComponent className="w-3 h-3" />
      <span>{level}</span>
    </span>
  );
};

export const TechBadge: React.FC<{ name: string; highlight?: boolean }> = ({ name, highlight }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium border transition-colors ${
        highlight
          ? 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/40 shadow-sm shadow-cyber-cyan/20'
          : 'bg-slate-800/60 text-slate-300 border-slate-700/50 hover:border-slate-500/50 hover:text-white'
      }`}
    >
      {name}
    </span>
  );
};
