import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ExperienceItem } from '../../types/portfolio';
import { Plus, Trash2, Edit2, Save, X, MapPin, Building2 } from 'lucide-react';

interface ExperienceTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ExperienceTab: React.FC<ExperienceTabProps> = ({ onToast }) => {
  const { data, updateSection } = usePortfolio();
  const [experiences, setExperiences] = useState<ExperienceItem[]>(data.experience);
  const [saving, setSaving] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const [highlightsInput, setHighlightsInput] = useState('');
  const [skillsInput, setSkillsInput] = useState('');

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingExp({
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      period: 'Present',
      location: 'Remote / India',
      current: true,
      highlights: [],
      skills: [],
    });
    setHighlightsInput('');
    setSkillsInput('');
  };

  const handleOpenEdit = (exp: ExperienceItem) => {
    setIsNew(false);
    setEditingExp({ ...exp });
    setHighlightsInput(exp.highlights.join('\n'));
    setSkillsInput(exp.skills.join(', '));
  };

  const handleDelete = (id: string, position: string) => {
    if (window.confirm(`Delete experience role "${position}"?`)) {
      const updated = experiences.filter(e => e.id !== id);
      setExperiences(updated);
      onToast(`Deleted "${position}"`, 'info');
    }
  };

  const handleSaveModal = () => {
    if (!editingExp || !editingExp.company.trim()) return;

    const formattedHighlights = highlightsInput
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    const formattedSkills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const finalized: ExperienceItem = {
      ...editingExp,
      highlights: formattedHighlights,
      skills: formattedSkills,
    };

    if (isNew) {
      setExperiences([...experiences, finalized]);
    } else {
      setExperiences(experiences.map(e => (e.id === finalized.id ? finalized : e)));
    }

    setEditingExp(null);
    onToast(`Staged "${finalized.position}". Click 'Save All Experience' to publish.`);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    const res = await updateSection('experience', experiences);
    setSaving(false);

    if (res.success) {
      onToast('Work experience and internships published successfully!');
    } else {
      onToast(res.message || 'Error saving experience', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Work Experience &amp; Internships
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your professional roles, hands-on learning responsibilities, and applied technologies.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-cyber-cyan" />
            <span>Add Experience</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Experience'}</span>
          </button>
        </div>
      </div>

      {/* Experience Cards */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-lg font-heading">{exp.position}</span>
                  {exp.current && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Current
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="font-semibold text-cyber-cyan flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {exp.company}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  {exp.period}
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(exp)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(exp.id, exp.position)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {exp.skills.map((s) => (
                <span key={s} className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-base/85 backdrop-blur-md">
          <div className="glass-card max-w-xl w-full p-6 rounded-2xl border border-cyber-cyan/40 bg-dark-surface space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                {isNew ? 'Add Professional Experience' : `Edit: ${editingExp.position}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingExp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  value={editingExp.company}
                  onChange={e => setEditingExp({ ...editingExp, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Position / Role *</label>
                <input
                  type="text"
                  value={editingExp.position}
                  onChange={e => setEditingExp({ ...editingExp, position: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Duration / Period</label>
                <input
                  type="text"
                  placeholder="e.g. September 2026 – Present"
                  value={editingExp.period}
                  onChange={e => setEditingExp({ ...editingExp, period: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Remote / India"
                  value={editingExp.location}
                  onChange={e => setEditingExp({ ...editingExp, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Responsibilities &amp; Highlights (One per line)</label>
                <textarea
                  rows={4}
                  value={highlightsInput}
                  onChange={e => setHighlightsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Skills &amp; Technologies Used (Comma separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={e => setSkillsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingExp(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModal}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-cyber-cyan text-dark-base hover:bg-cyan-400 shadow-neon-cyan"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
