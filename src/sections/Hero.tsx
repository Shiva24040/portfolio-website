import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin } from '../components/Icons';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  MapPin, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
  onToast: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onToast }) => {
  const { data } = usePortfolio();
  const profile = data.profile;

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(profile.email)
        .then(() => onToast('Email copied to clipboard: ' + profile.email))
        .catch(() => onToast('Email: ' + profile.email));
    } else {
      onToast('Email: ' + profile.email);
    }
  };

  const title = profile?.title || 'Aspiring AI/ML Engineer | Frontend Development Intern';
  const photoSrc = profile?.avatarUrl || './images/shiva-photo.jpg';

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Status & Location Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan backdrop-blur-md shadow-sm shadow-cyber-cyan/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold">Available for Opportunities</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-slate-900/60 border border-slate-800 text-slate-300 backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Name Heading with Futuristic Animated Gradient */}
            <div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-heading tracking-tight text-white leading-[1.1]">
                Hi, I'm <br />
                <span className="text-gradient drop-shadow-sm">
                  {profile.name}
                </span>
              </h1>
              
              {/* Professional Title */}
              <p className="mt-3 text-lg sm:text-xl md:text-2xl font-semibold text-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-cyber-cyan font-bold">{title.split('|')[0] || title}</span>
                {title.includes('|') && (
                  <>
                    <span className="text-slate-500 hidden sm:inline">&bull;</span>
                    <span className="text-purple-300">{title.split('|')[1]}</span>
                  </>
                )}
              </p>
            </div>

            {/* Tagline / Introduction */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl border-l-2 border-cyber-cyan/40 pl-4 py-1 italic bg-cyber-cyan/5 rounded-r-lg">
              "{profile.tagline}"
            </p>

            {/* Micro Highlights Pill Row */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-slate-900/70 border border-slate-800 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
                AI &amp; Generative Models
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-slate-900/70 border border-slate-800 text-slate-300">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Unified Mentor Intern
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-slate-900/70 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Clean Modern Frontend
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
              <button
                onClick={handleScrollToProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyber-cyan to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[46px]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-cyber-cyan/30 hover:border-cyber-cyan/60 transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-md min-h-[46px]"
              >
                <Download className="w-4 h-4 text-cyber-cyan" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Connection Buttons: LinkedIn, GitHub, Email */}
            <div className="pt-3 flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Connect:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-cyber-cyan/20 text-slate-300 hover:text-cyber-cyan border border-slate-800 hover:border-cyber-cyan/50 transition-all shadow-sm"
                  title="Connect on LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-purple-500/20 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/50 transition-all shadow-sm"
                  title="View GitHub (Shiva24040)"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-slate-900/70 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-sm cursor-pointer"
                  title="Copy Email Address"
                  aria-label="Copy Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Futuristic Avatar Graphic & Floating Glass Cards */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Glowing Accent Ring Behind Graphic */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-cyber-cyan/15 blur-3xl animate-pulse-slow" />
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-cyber-violet/20 blur-2xl animate-pulse-slow" style={{ animationDelay: '2.5s' }} />
            </div>

            {/* Central Graphic Container with Shiva's Photograph */}
            <div className="relative w-full max-w-sm sm:max-w-md group">
              <div className="relative rounded-3xl p-2.5 glass-card border-2 border-cyber-cyan/40 shadow-neon-cyan transition-all duration-300 hover:border-cyber-cyan/70 hover:shadow-glass-card-hover bg-dark-surface/95 overflow-hidden">
                <img
                  src={photoSrc}
                  alt={profile.name}
                  className="w-full h-80 sm:h-96 rounded-2xl object-cover object-top transform transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />

                {/* Subtle Lighting Reflection Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-dark-base via-dark-base/40 to-transparent pointer-events-none rounded-b-2xl" />

                {/* Corner Cyber HUD Accents */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyber-violet" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyber-violet" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan" />

                {/* Name & Badge at Bottom of Photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3 py-2 rounded-xl bg-dark-surface/90 border border-cyber-cyan/30 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white font-heading">{profile.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyber-cyan uppercase">Verified Owner</span>
                </div>
              </div>

              {/* Floating Glassmorphic Pill 1: Internship Badge */}
              <div className="absolute top-2 right-2 sm:-top-4 sm:-right-6 glass-panel px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-lg border border-cyber-cyan/30 flex items-center gap-2 sm:gap-2.5 animate-float-slow bg-dark-surface/95 backdrop-blur-md z-10">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">Current Role</div>
                  <div className="text-[11px] sm:text-xs font-bold text-white">Unified Mentor Intern</div>
                </div>
              </div>

              {/* Floating Glassmorphic Pill 2: Performance & AI Focus */}
              <div className="absolute bottom-14 sm:-bottom-4 left-2 sm:-left-6 glass-panel px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-lg border border-cyber-violet/40 flex items-center gap-2 sm:gap-2.5 bg-dark-surface/95 backdrop-blur-md animate-float-slow z-10" style={{ animationDelay: '1.5s' }}>
                <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-purple-400" />
                <div className="text-left">
                  <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">AI Learning Path</div>
                  <div className="text-[11px] sm:text-xs font-bold text-purple-200">Generative AI &amp; ML</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
