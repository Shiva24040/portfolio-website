import React, { useEffect } from 'react';
import { X, Download, Printer, Briefcase, GraduationCap, Award, Code } from 'lucide-react';
import { personalInfo, experienceData, skillGroups, certificationsData, educationData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onToast }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    window.open(`${baseUrl}resume/Shiva_Nani_Gurrala_Resume.html`, '_blank');
    onToast('Opened printable resume format');
  };

  const handleDownload = () => {
    const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
    const link = document.createElement('a');
    link.href = `${baseUrl}resume/Shiva_Nani_Gurrala_Resume.html`;
    link.download = 'Shiva_Nani_Gurrala_Resume.html';
    link.click();
    onToast('Resume downloaded successfully');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-dark-base/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="glass-card max-w-3xl w-full max-h-[92vh] flex flex-col rounded-2xl border border-cyber-cyan/30 shadow-2xl relative bg-dark-surface/98 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Actions */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyber-cyan animate-pulse" />
            <h3 id="resume-modal-title" className="text-base md:text-lg font-bold text-white font-heading">
              Shiva Nani Gurrala — Verified Resume
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Open full page / Print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-colors"
              title="Download Resume HTML"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
              aria-label="Close resume viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Formatted Resume Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-200 text-sm">
          {/* Identity Header */}
          <div className="border-b border-slate-800 pb-5">
            <h2 className="text-2xl font-extrabold text-white font-heading tracking-wide">
              {personalInfo.name}
            </h2>
            <p className="text-cyber-cyan font-semibold text-sm mt-0.5">
              {personalInfo.title}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-400">
              <span>{personalInfo.location}</span>
              <span>•</span>
              <a href={`mailto:${personalInfo.email}`} className="text-cyber-cyan hover:underline">
                {personalInfo.email}
              </a>
              <span>•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-purple-300 hover:underline">
                LinkedIn Profile
              </a>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:underline">
                GitHub: Shiva24040
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyber-cyan font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-cyber-cyan rounded-full" />
              Professional Summary
            </h4>
            <p className="text-xs leading-relaxed text-slate-300">
              {personalInfo.bio}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyber-cyan font-bold mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              Work Experience
            </h4>
            {experienceData.map(exp => (
              <div key={exp.id} className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-white text-sm">{exp.position}</span>
                    <span className="text-slate-400 text-xs block">{exp.company} • {exp.location}</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-2.5 space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Skills Breakdown */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyber-cyan font-bold mb-3">
              <Code className="w-3.5 h-3.5" />
              Technical Skills
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {skillGroups.map(group => (
                <div key={group.category} className="p-3 bg-slate-900/40 rounded-lg border border-slate-800/60">
                  <span className="font-bold text-slate-200 block mb-1 text-xs font-mono">
                    {group.category}:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {group.skills.map(s => (
                      <span key={s.name} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                        {s.name} <span className="text-cyber-cyan">({s.level})</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyber-cyan font-bold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              Education
            </h4>
            <div className="space-y-2 text-xs">
              {educationData.map(edu => (
                <div key={edu.id} className="p-3 bg-slate-900/40 rounded-lg border border-slate-800/60 flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-white block">{edu.degree}</span>
                    <span className="text-slate-400">{edu.institution} • {edu.location}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyber-cyan font-bold mb-2">
              <Award className="w-3.5 h-3.5" />
              Certifications &amp; Credentials
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
              {certificationsData.map(cert => (
                <li key={cert.id} className="flex items-center gap-2 p-2 rounded bg-slate-900/30 border border-slate-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-violet flex-shrink-0" />
                  <span className="truncate">{cert.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer info note */}
        <div className="p-3 bg-slate-900/80 border-t border-slate-800 text-center text-[11px] text-slate-500 font-mono">
          Verified for professional portfolio • Shiva Nani Gurrala • Telangana, India
        </div>
      </div>
    </div>
  );
};
