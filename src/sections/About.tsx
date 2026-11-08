import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  BrainCircuit, 
  Sparkles, 
  Target, 
  Layers, 
  Rocket,
  Compass
} from 'lucide-react';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const profile = data.profile;
  const about = data.about;

  // Normalize stats to array format safely to prevent any runtime exceptions
  let statsList: { label: string; value: string }[] = [];
  if (Array.isArray(profile?.stats)) {
    statsList = profile.stats;
  } else if (profile?.stats && typeof profile.stats === 'object') {
    statsList = Object.entries(profile.stats).map(([k, v]) => ({
      label: k.replace(/([A-Z])/g, ' $1').toUpperCase(),
      value: String(v),
    }));
  } else {
    statsList = [
      { label: 'Focused Domains', value: 'AI, ML & Frontend' },
      { label: 'Active Projects', value: '4+ Prototypes' },
      { label: 'Certifications', value: '8 Verified' },
      { label: 'Internship', value: 'Unified Mentor' },
    ];
  }

  const interestsList = Array.isArray(about?.interests)
    ? about.interests
    : [
        'Artificial Intelligence',
        'Machine Learning',
        'Generative AI & LLMs',
        'Frontend Architecture',
        'Linux Systems',
        'Kubernetes & Cloud',
      ];

  const goalsList = Array.isArray(about?.goals) ? about.goals : [];

  return (
    <section id="about" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="01"
          tag="Identity &amp; Vision"
          title="About"
          gradientWord={profile.shortName || 'Shiva Nani'}
          subtitle="Building foundations at the intersection of Artificial Intelligence, Systems, and Frontend Engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Core Bio & Journey */}
          <div className="lg:col-span-7 space-y-6">
            <GlassCard className="border-cyber-cyan/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Professional Biography
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    LinkedIn Verified Profile Narrative
                  </span>
                </div>
              </div>

              {/* Verbatim LinkedIn Introduction */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {about.narrative}
              </div>

              {/* Core Interests Tags */}
              <div className="mt-6 pt-5 border-t border-slate-800/80">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyber-cyan" />
                  Primary Technical Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interestsList.map(interest => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800/70 text-slate-300 border border-slate-700/60 hover:border-cyber-cyan/40 hover:text-white transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statsList.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card p-4 rounded-xl text-center border-cyber-cyan/15 hover:border-cyber-cyan/30 transition-colors"
                >
                  <div className="text-sm sm:text-base font-extrabold text-white font-heading">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Goals & Approach */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 px-1">
              <Target className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Professional Goals &amp; Philosophy
              </h3>
            </div>

            {goalsList.map((goal, idx) => (
              <GlassCard
                key={goal.title}
                className="border-cyber-violet/20 hover:border-cyber-violet/50"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex-shrink-0 mt-0.5">
                    {idx === 0 ? (
                      <BrainCircuit className="w-4 h-4" />
                    ) : idx === 1 ? (
                      <Rocket className="w-4 h-4" />
                    ) : (
                      <Layers className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-heading">
                      {goal.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}

            {/* Practical Mindset Callout Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-dark-surface/90 border border-cyber-cyan/25 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-2 text-cyber-cyan text-xs font-mono uppercase font-bold tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>My Core Engineering Principle</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "{about.engineeringPrinciple}"
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
