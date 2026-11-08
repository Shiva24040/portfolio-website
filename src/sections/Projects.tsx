import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { TechBadge } from '../components/Badge';
import { projectsData } from '../data/portfolioData';
import type { Project } from '../types/portfolio';
import { Github } from '../components/Icons';
import { Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'All' | 'AI/ML' | 'Frontend'>('All');

  const filteredProjects = projectsData.filter(
    (p) => filter === 'All' || p.category === filter
  );

  return (
    <section id="projects" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          tag="Portfolio Works"
          title="Featured"
          gradientWord="Projects"
          subtitle="Real-world software prototypes and AI-assisted tools developed with clean code, modern frontend standards, and practical problem solving."
        />

        {/* Category Filter Tabs */}
        <div className="flex justify-center items-center gap-2 mb-12">
          {(['All', 'AI/ML', 'Frontend'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-cyber-cyan text-dark-base shadow-neon-cyan scale-105'
                  : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat === 'All' ? 'All Projects (4)' : cat === 'AI/ML' ? 'AI / ML Solutions (3)' : 'Frontend & Web (1)'}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <GlassCard
              key={project.id}
              className="border-cyber-cyan/20 hover:border-cyber-cyan/50 p-0 overflow-hidden flex flex-col justify-between group"
            >
              {/* Project Image Preview with Overlay */}
              <div
                className="relative w-full h-52 sm:h-60 overflow-hidden bg-slate-950 cursor-pointer border-b border-slate-800"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Floating Category and Status Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-dark-base/85 text-cyber-cyan border border-cyber-cyan/30 backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-md border ${
                    project.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-cyber-violet/20 text-purple-300 border-cyber-violet/40'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-dark-base/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-surface/90 text-white text-xs font-medium border border-cyber-cyan/50 shadow-lg">
                    <span>View Architecture Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyber-cyan" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="text-xl sm:text-2xl font-extrabold text-white font-heading group-hover:text-cyber-cyan transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-cyber-cyan flex items-center gap-1.5 mb-3">
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{project.tagline}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="space-y-1.5 mb-5">
                    {project.keyFeatures.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Tech Badges & Actions */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-800/80">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[11px] font-mono text-slate-400 self-center">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700/80 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4 text-slate-300" />
                      <span>Code</span>
                    </a>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-cyber-cyan/15 hover:bg-cyber-cyan text-cyber-cyan hover:text-dark-base border border-cyber-cyan/40 hover:border-cyber-cyan transition-all"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
