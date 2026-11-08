import React from 'react';

interface SectionHeadingProps {
  number?: string;
  tag: string;
  title: string;
  gradientWord?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  tag,
  title,
  gradientWord,
  subtitle,
  align = 'center',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {/* Category Tag Pill */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase mb-3 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan shadow-sm shadow-cyber-cyan/10 ${isCenter ? 'mx-auto' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping" />
        <span>
          {number ? `${number} // ` : ''}
          {tag}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
        {title}{' '}
        {gradientWord && (
          <span className="text-gradient">
            {gradientWord}
          </span>
        )}
      </h2>

      {/* Subtitle / Description */}
      {subtitle && (
        <p className="mt-3.5 text-base md:text-lg text-slate-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Subtle Glowing Accent Bar */}
      <div className={`mt-5 flex items-center gap-1.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="w-12 h-1 rounded-full bg-cyber-cyan glow-cyan-sm" />
        <div className="w-4 h-1 rounded-full bg-cyber-violet glow-violet-sm" />
        <div className="w-1.5 h-1 rounded-full bg-slate-600" />
      </div>
    </div>
  );
};
