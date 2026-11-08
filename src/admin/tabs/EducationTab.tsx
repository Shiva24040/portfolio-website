import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { EducationItem } from '../../types/portfolio';
import { Plus, Trash2, Edit2, Save, X, GraduationCap, MapPin } from 'lucide-react';

interface EducationTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const EducationTab: React.FC<EducationTabProps> = ({ onToast }) => {
  const { data, updateSection } = usePortfolio();
  const [education, setEducation] = useState<EducationItem[]>(Array.isArray(data.education) ? data.education : []);
  const [saving, setSaving] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [detailsInput, setDetailsInput] = useState('');

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingEdu({
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      period: 'August 2025 – Present',
      location: 'Telangana, India',
      current: true,
      details: [],
    });
    setDetailsInput('');
  };

  const handleOpenEdit = (edu: EducationItem) => {
    setIsNew(false);
    setEditingEdu({ ...edu });
    setDetailsInput(edu.details.join('\n'));
  };

  const handleDelete = (id: string, institution: string) => {
    if (window.confirm(`Delete education record "${institution}"?`)) {
      const updated = education.filter(e => e.id !== id);
      setEducation(updated);
      onToast(`Deleted "${institution}"`, 'info');
    }
  };

  const handleSaveModal = () => {
    if (!editingEdu || !editingEdu.institution.trim()) return;

    const formattedDetails = detailsInput
      .split('\n')
      .map(d => d.trim())
      .filter(Boolean);

    const finalized: EducationItem = {
      ...editingEdu,
      details: formattedDetails,
    };

    if (isNew) {
      setEducation([...education, finalized]);
    } else {
      setEducation(education.map(e => (e.id === finalized.id ? finalized : e)));
    }

    setEditingEdu(null);
    onToast(`Staged "${finalized.institution}". Click 'Save All Education' to publish.`);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    const res = await updateSection('education', education);
    setSaving(false);

    if (res.success) {
      onToast('Education history published successfully!');
    } else {
      onToast(res.message || 'Error saving education', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Education History
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your diplomas, secondary school certificates, and computer science coursework.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-cyber-cyan" />
            <span>Add Institution</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Education'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-lg font-heading">{edu.degree}</span>
                  {edu.current && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      Currently Enrolled
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="font-semibold text-purple-300 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {edu.institution}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  {edu.period}
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(edu)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(edu.id, edu.institution)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              {edu.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingEdu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-base/85 backdrop-blur-md">
          <div className="glass-card max-w-xl w-full p-6 rounded-2xl border border-cyber-cyan/40 bg-dark-surface space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                {isNew ? 'Add Academic Credential' : `Edit: ${editingEdu.institution}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingEdu(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Degree / Qualification *</label>
                <input
                  type="text"
                  placeholder="e.g. Diploma in Computer Science Engineering"
                  value={editingEdu.degree}
                  onChange={e => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Institution Name *</label>
                <input
                  type="text"
                  placeholder="e.g. T.R.R. College of Technology"
                  value={editingEdu.institution}
                  onChange={e => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Timeline / Period</label>
                <input
                  type="text"
                  placeholder="e.g. August 2025 – Present"
                  value={editingEdu.period}
                  onChange={e => setEditingEdu({ ...editingEdu, period: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Telangana, India"
                  value={editingEdu.location}
                  onChange={e => setEditingEdu({ ...editingEdu, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Status</label>
                <label className="flex items-center gap-2 mt-2 text-white">
                  <input
                    type="checkbox"
                    checked={editingEdu.current || false}
                    onChange={e => setEditingEdu({ ...editingEdu, current: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-800 text-cyber-cyan"
                  />
                  <span>Currently Enrolled</span>
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Coursework &amp; Academic Highlights (One per line)</label>
                <textarea
                  rows={4}
                  value={detailsInput}
                  onChange={e => setDetailsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingEdu(null)}
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
