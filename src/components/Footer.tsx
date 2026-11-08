import React from 'react';
import { ArrowUp, Mail, Sparkles, MapPin } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { usePortfolio } from '../context/PortfolioContext';

const currentYear = 2026;

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const personalInfo = data.profile;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative z-10 border-t border-cyber-cyan/15 bg-dark-base/95 backdrop-blur-xl pt-16 pb-12 overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-dark-surface border border-cyber-cyan/40 flex items-center justify-center shadow-neon-cyan">
                <Sparkles className="w-5 h-5 text-cyber-cyan" />
              </div>
              <div>
                <span className="font-extrabold text-xl font-heading tracking-wide text-white">
                  SHIVA NANI <span className="text-cyber-cyan">GURRALA</span>
                </span>
                <p className="text-xs font-mono text-slate-400">
                  Aspiring AI/ML Engineer &bull; Frontend Development Intern
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Exploring Artificial Intelligence, building intelligent solutions, and crafting responsive, high-performance web experiences with modern architecture.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-cyber-cyan transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles & Direct Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-violet" />
              Connect With Me
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900/50 hover:bg-slate-800 border border-slate-800 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-cyber-cyan" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900/50 hover:bg-slate-800 border border-slate-800 transition-colors"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>GitHub (Shiva24040)</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900/50 hover:bg-slate-800 border border-slate-800 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>shivananigurrala22@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>&copy; {currentYear} Shiva Nani Gurrala. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Intel UHD 620 Optimized &bull; 60 FPS CSS
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors shadow-sm"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyber-cyan" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
