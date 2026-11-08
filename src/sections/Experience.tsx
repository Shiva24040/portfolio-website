import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { TechBadge } from '../components/Badge';
import { usePortfolio } from '../context/PortfolioContext';
import { Calendar, MapPin, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const experienceData = Array.isArray(data?.experience) ? data.experience : [];
  return (
    <section id="experience" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="03"
          tag="Work History"
          title="Professional"
          gradientWord="Experience"
          subtitle="Hands-on industry internship journey focusing on frontend engineering, interface optimization, and problem-solving."
        />

        <div className="max-w-4xl mx-auto">
          {/* Timeline Container */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-cyber-cyan/30 space-y-12">
            {experienceData.map((exp) => (
              <div key={exp.id} className="relative group">
                
                {/* Glowing Node on Timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-cyber-cyan shadow-neon-cyan animate-pulse ring-4 ring-dark-base" />
                  <div className="absolute w-8 h-8 rounded-full bg-cyber-cyan/20 animate-ping" />
                </div>

                {/* Experience Glass Card */}
                <GlassCard className="border-cyber-cyan/25 hover:border-cyber-cyan/50 p-6 sm:p-8 bg-dark-surface/90">
                  {/* Top Bar with Role, Company and Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Active Internship</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                        {exp.position}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-300">
                        <span className="flex items-center gap-1 font-semibold text-cyber-cyan">
                          <Building2 className="w-3.5 h-3.5" />
                          {exp.company}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono self-start sm:self-center">
                      <Calendar className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Responsibilities & Highlights Checklist */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
                      Key Responsibilities &amp; Learnings:
                    </h4>
                    <ul className="space-y-2.5">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Applied */}
                  <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">Applied Stack:</span>
                      {exp.skills.map((skill) => (
                        <TechBadge key={skill} name={skill} highlight={skill === 'JavaScript' || skill === 'Responsive Web Design'} />
                      ))}
                    </div>

                    <span className="text-[11px] font-mono text-cyber-cyan/90 bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/20">
                      3-Month Term
                    </span>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
