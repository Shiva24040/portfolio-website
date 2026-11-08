import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Moon, Sun, Terminal } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';

interface NavbarProps {
  activeSection: string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenResume: () => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  theme,
  toggleTheme,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  // Prevent background scroll on mobile when menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-slate-800/40">
        <div
          className="h-full bg-gradient-to-r from-cyber-cyan via-purple-500 to-cyber-violet transition-all duration-150 ease-out glow-cyan-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-dark-base/85 border-b border-cyber-cyan/15 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="group flex items-center gap-2.5 sm:gap-3 text-white transition-transform hover:scale-[1.02]"
              aria-label="Shiva Nani - Home"
            >
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-dark-surface border border-cyber-cyan/40 shadow-sm shadow-cyber-cyan/30 group-hover:border-cyber-cyan transition-colors overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/20 to-cyber-violet/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-cyber-cyan group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg lg:text-xl font-heading tracking-wider flex items-center gap-1.5 leading-tight">
                  <span>SHIVA</span>
                  <span className="text-cyber-cyan">NANI</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  AI &bull; FRONTEND
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Desktop Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-all duration-200 relative cursor-pointer ${
                      isActive
                        ? 'text-cyber-cyan font-semibold bg-cyber-cyan/10 border border-cyber-cyan/30 shadow-sm shadow-cyber-cyan/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyber-cyan rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark AI Theme'}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-cyber-violet" />
                )}
              </button>

              {/* Resume Button */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyber-cyan to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>

            {/* Tablet & Mobile Right Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 border border-slate-700/60 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-cyber-violet" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/60 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyber-cyan" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-cyber-cyan/20 bg-dark-surface/98 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'text-cyber-cyan bg-cyber-cyan/15 font-semibold border border-cyber-cyan/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />}
                  </button>
                );
              })}
              <div className="pt-3 mt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyber-cyan to-blue-500 text-dark-base shadow-neon-cyan cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / View Resume</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
