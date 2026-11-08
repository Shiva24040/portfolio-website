import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { SkillLevelBadge } from '../components/Badge';
import { skillGroups } from '../data/portfolioData';
import type { SkillLevel, SkillItem } from '../types/portfolio';
import { 
  Code2, 
  FileCode2, 
  Server, 
  Layout, 
  Palette, 
  Sparkles, 
  Atom, 
  BrainCircuit, 
  Cpu, 
  Bot, 
  Wand2, 
  GitBranch, 
  Terminal, 
  Boxes, 
  FolderGit2
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  FileCode2,
  Server,
  Layout,
  Palette,
  Sparkles,
  Atom,
  BrainCircuit,
  Cpu,
  Bot,
  Wand2,
  GitBranch,
  Terminal,
  Boxes,
  FolderGit2,
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const categories = ['All', 'Programming', 'Frontend', 'Artificial Intelligence', 'Tools and Technologies'];
  const levels: (string | SkillLevel)[] = ['All', 'Completed', 'Familiar', 'Learning', 'Practicing'];

  const filteredGroups = skillGroups
    .filter(g => selectedCategory === 'All' || g.category === selectedCategory)
    .map(group => ({
      ...group,
      skills: group.skills.filter(s => selectedLevel === 'All' || s.level === selectedLevel)
    }))
    .filter(g => g.skills.length > 0);

  return (
    <section id="skills" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02"
          tag="Competencies"
          title="Technical"
          gradientWord="Skill Matrix"
          subtitle="Honest, verified technical proficiencies categorized by current learning stage — strictly without fabricated percentages."
        />

        {/* Skill Level Explanation / Legend Bar */}
        <div className="mb-8 p-4 rounded-2xl glass-card border-cyber-cyan/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
            <span className="font-semibold text-white">Skill Status Classification:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-300 font-medium">Completed:</span>
              <span className="text-slate-400">Mastered foundational curriculum</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
              <span className="text-slate-300 font-medium">Familiar:</span>
              <span className="text-slate-400">Practical application experience</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyber-violet" />
              <span className="text-slate-300 font-medium">Learning:</span>
              <span className="text-slate-400">Actively studying concepts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-slate-300 font-medium">Practicing:</span>
              <span className="text-slate-400">Hands-on workflow integration</span>
            </div>
          </div>
        </div>

        {/* Category & Level Filter Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyber-cyan text-dark-base font-semibold shadow-neon-cyan'
                    : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Level Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Filter Level:</span>
            {levels.map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedLevel === lvl
                    ? 'bg-slate-700 text-white border border-cyber-cyan/50 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-transparent'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Groups and Cards Showcase */}
        <div className="space-y-10">
          {filteredGroups.map(group => (
            <div key={group.category} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                    {group.category}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {group.description}
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.skills.map((skill: SkillItem) => {
                  const Icon = iconMap[skill.iconName] || Code2;
                  return (
                    <GlassCard
                      key={skill.name}
                      hoverEffect={true}
                      className="p-5 border-cyber-cyan/15 hover:border-cyber-cyan/40 bg-dark-surface/85 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-cyber-cyan group-hover:text-white group-hover:border-cyber-cyan/40 transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <SkillLevelBadge level={skill.level} />
                        </div>

                        <h4 className="text-base font-bold text-white font-heading">
                          {skill.name}
                        </h4>

                        <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>Category: {group.category}</span>
                        <span className="text-cyber-cyan/80">Active</span>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredGroups.length === 0 && (
            <div className="text-center py-12 glass-card rounded-2xl border-dashed border-slate-800">
              <p className="text-slate-400 text-sm">
                No skills matching the selected filter criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                }}
                className="mt-3 px-4 py-1.5 rounded-lg text-xs font-medium bg-cyber-cyan/20 text-cyber-cyan hover:bg-cyber-cyan/30 border border-cyber-cyan/40"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
