import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'violet' | 'none';
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = 'none',
  hoverEffect = true,
  onClick,
}) => {
  const glowClasses = {
    cyan: 'border-cyber-cyan/30 shadow-neon-cyan/20',
    violet: 'border-cyber-violet/30 shadow-neon-violet/20',
    none: 'border-cyber-cyan/15 hover:border-cyber-cyan/40',
  }[glow];

  const hoverClasses = hoverEffect
    ? 'hover:-translate-y-1.5 hover:shadow-glass-card-hover transition-all duration-300'
    : '';

  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden group ${glowClasses} ${hoverClasses} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Top subtle highlight line for realistic glass edge reflection */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent pointer-events-none" />
      
      {children}
    </div>
  );
};
