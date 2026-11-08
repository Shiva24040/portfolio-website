import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Calendar, MapPin, CheckCircle2, BookOpen, School } from 'lucide-react';

export const Education: React.FC = () => {
  const { data } = usePortfolio();
  const educationData = Array.isArray(data?.education) ? data.education : [];
  return (
    <section id="education" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06"
          tag="Academics"
          title="Educational"
          gradientWord="Background"
          subtitle="Foundational computer science principles, engineering mathematics, and systematic problem solving."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-cyber-violet/40 space-y-12">
            {educationData.map((edu, idx) => (
              <div key={edu.id} className="relative group">
                
                {/* Glowing Node on Timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full ring-4 ring-dark-base shadow-neon-violet ${
                    edu.current ? 'bg-cyber-violet animate-pulse' : 'bg-slate-500'
                  }`} />
                </div>

                <GlassCard className="border-cyber-violet/25 hover:border-cyber-violet/50 p-6 sm:p-8 bg-dark-surface/90">
                  {/* Top Bar with Degree, Institution & Timeline */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-5">
                    <div>
                      {edu.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                          <span>Currently Enrolled</span>
                        </span>
                      )}
                      
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                        {edu.degree}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-300">
                        <span className="flex items-center gap-1 font-semibold text-purple-300">
                          {idx === 0 ? <GraduationCap className="w-3.5 h-3.5" /> : <School className="w-3.5 h-3.5" />}
                          {edu.institution}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3.5 h-3.5" />
                          {edu.location}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono self-start sm:self-center">
                      <Calendar className="w-3.5 h-3.5 text-cyber-violet" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  {/* Highlights / Curricular focus */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      Key Academic Highlights &amp; Foundations:
                    </h4>
                    <ul className="space-y-2">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyber-violet flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
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
