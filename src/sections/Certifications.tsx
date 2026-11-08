import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { certificationsData } from '../data/portfolioData';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  ShieldCheck, 
  Terminal, 
  Bot, 
  GitBranch, 
  Users, 
  Sparkles 
} from 'lucide-react';

const badgeIconMap: Record<string, React.FC<{ className?: string }>> = {
  dev: Terminal,
  ai: Bot,
  productivity: Users,
  cloud: GitBranch,
};

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="05"
          tag="Credentials"
          title="Verified"
          gradientWord="Certifications"
          subtitle="Accredited training across Linux systems, Generative AI fundamentals, GitHub version control, and Microsoft Copilot workflows."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert) => {
            const BadgeIcon = badgeIconMap[cert.badgeType] || Award;
            return (
              <GlassCard
                key={cert.id}
                className="border-cyber-cyan/20 hover:border-cyber-cyan/50 p-6 flex flex-col justify-between bg-dark-surface/90"
              >
                <div>
                  {/* Top Badge Icon & Verified Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyber-cyan group-hover:border-cyber-cyan/50 group-hover:text-white transition-colors">
                      <BadgeIcon className="w-5 h-5" />
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Title and Issuer */}
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-cyber-cyan transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">{cert.issuer}</span>
                    <span>&bull;</span>
                    <span className="font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyber-cyan" />
                      {cert.year}
                    </span>
                  </div>

                  {/* Skills Gained Breakdown */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      Competencies Covered:
                    </div>
                    <ul className="space-y-1.5">
                      {cert.skillsGained.map((skill, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/80 flex-shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Verification Link */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-cyber-cyan border border-slate-800 hover:border-cyber-cyan/40 transition-colors"
                  >
                    <span>View LinkedIn Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyber-cyan" />
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
