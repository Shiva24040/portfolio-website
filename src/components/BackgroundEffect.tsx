import React from 'react';

export const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dark Base Cyber Gradient Mesh */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyber-cyan/10 rounded-full blur-[130px] transform -translate-x-1/2 -translate-y-1/2 will-change-transform animate-pulse-slow" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyber-violet/10 rounded-full blur-[140px] will-change-transform animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-cyber-cyan/5 rounded-full blur-[160px]" />
      
      {/* Lightweight Grid Pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-70 mask-radial" />

      {/* Futuristic SVG Neural Connection Wave at Bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-20 text-cyber-cyan"
        viewBox="0 0 1440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 160L48 144C96 128 192 96 288 96C384 96 480 128 576 154.7C672 181 768 203 864 192C960 181 1056 139 1152 122.7C1248 107 1344 117 1392 122.7L1440 128V280H1392C1344 280 1248 280 1152 280C1056 280 960 280 864 280C768 280 672 280 576 280C480 280 384 280 288 280C192 280 96 280 48 280H0V160Z"
          fill="url(#wave-grad)"
        />
        <defs>
          <linearGradient id="wave-grad" x1="0" y1="0" x2="1440" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00D9FF" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.08" />
            <stop offset="1" stopColor="#080B14" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
