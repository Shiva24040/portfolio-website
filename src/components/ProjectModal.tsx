import React, { useEffect } from 'react';
import type { Project } from '../types/portfolio';
import { X, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';
import { Github } from './Icons';
import { TechBadge } from './Badge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-dark-base/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-cyber-cyan/30 shadow-2xl relative bg-dark-surface/95 p-6 md:p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/50 z-10"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image Preview */}
        <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-6 border border-slate-800 relative bg-dark-base">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-dark-base/90 text-cyber-cyan border border-cyber-cyan/30 backdrop-blur-md">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              {project.status}
            </span>
          </div>
        </div>

        {/* Title and Tagline */}
        <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          {project.title}
        </h3>
        <p className="text-cyber-cyan text-sm sm:text-base font-medium mt-1 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          {project.tagline}
        </p>

        {/* Full Description */}
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>

        {/* Key Features */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Key Architecture &amp; Features
          </h4>
          <ul className="space-y-2">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyber-cyan mt-0.5 flex-shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Badges */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
            Technologies &amp; Libraries
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
          {project.demoUrl && project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-cyber-cyan hover:bg-cyan-400 text-dark-base font-semibold shadow-neon-cyan transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
