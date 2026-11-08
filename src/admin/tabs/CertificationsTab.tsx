import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Certification } from '../../types/portfolio';
import { Plus, Trash2, Edit2, Save, X, ShieldCheck } from 'lucide-react';

interface CertificationsTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const CertificationsTab: React.FC<CertificationsTabProps> = ({ onToast }) => {
  const { data, updateSection } = usePortfolio();
  const [certs, setCerts] = useState<Certification[]>(data.certifications);
  const [saving, setSaving] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [skillsInput, setSkillsInput] = useState('');

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingCert({
      id: `cert-${Date.now()}`,
      title: '',
      issuer: 'IBM',
      year: '2026',
      issuedDate: 'Nov 2026',
      credentialId: '',
      badgeType: 'ai',
      skillsGained: [],
      credentialUrl: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/',
    });
    setSkillsInput('');
  };

  const handleOpenEdit = (cert: Certification) => {
    setIsNew(false);
    setEditingCert({ ...cert });
    setSkillsInput(cert.skillsGained.join(', '));
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete credential "${title}"?`)) {
      const updated = certs.filter(c => c.id !== id);
      setCerts(updated);
      onToast(`Deleted "${title}"`, 'info');
    }
  };

  const handleSaveModal = () => {
    if (!editingCert || !editingCert.title.trim()) return;

    const formattedSkills = skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const finalized: Certification = {
      ...editingCert,
      skillsGained: formattedSkills,
    };

    if (isNew) {
      setCerts([...certs, finalized]);
    } else {
      setCerts(certs.map(c => (c.id === finalized.id ? finalized : c)));
    }

    setEditingCert(null);
    onToast(`Staged "${finalized.title}". Click 'Save All Certifications' to publish.`);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    const res = await updateSection('certifications', certs);
    setSaving(false);

    if (res.success) {
      onToast('Certifications matrix published successfully!');
    } else {
      onToast(res.message || 'Error saving certifications', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Licenses &amp; Certifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your verified credentials, official Credential IDs, and accreditation issuers.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-cyber-cyan" />
            <span>Add Certification</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Certifications'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-bold text-white text-sm font-heading">{cert.title}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <span className="font-semibold text-cyber-cyan">{cert.issuer}</span>
                <span>&bull;</span>
                <span className="font-mono text-slate-400">{cert.issuedDate || cert.year}</span>
              </div>

              {cert.credentialId && (
                <div className="mt-2 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-1 rounded border border-slate-800 truncate">
                  <span className="text-slate-500">ID: </span>
                  <span className="text-slate-300">{cert.credentialId}</span>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-1">
                {cert.skillsGained.slice(0, 3).map((skill) => (
                  <span key={skill} className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80">
              <span className="text-[10px] font-mono uppercase text-slate-500">Badge: {cert.badgeType}</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(cert)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(cert.id, cert.title)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-base/85 backdrop-blur-md">
          <div className="glass-card max-w-xl w-full p-6 rounded-2xl border border-cyber-cyan/40 bg-dark-surface space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                {isNew ? 'Add Verified Credential' : `Edit: ${editingCert.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Certification Name *</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={e => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Issuer / Organization *</label>
                <input
                  type="text"
                  placeholder="e.g. IBM, Databricks, KodeKloud"
                  value={editingCert.issuer}
                  onChange={e => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Issue Date</label>
                <input
                  type="text"
                  placeholder="e.g. Oct 2026"
                  value={editingCert.issuedDate || ''}
                  onChange={e => setEditingCert({ ...editingCert, issuedDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. ALM-COURSE_3825456"
                  value={editingCert.credentialId || ''}
                  onChange={e => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Badge Type</label>
                <select
                  value={editingCert.badgeType}
                  onChange={e => setEditingCert({ ...editingCert, badgeType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                >
                  <option value="ai">AI / Machine Learning</option>
                  <option value="cloud">Cloud / Infrastructure</option>
                  <option value="dev">Developer / Version Control</option>
                  <option value="productivity">Productivity / Enterprise</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Verification / LinkedIn Credential URL</label>
                <input
                  type="url"
                  value={editingCert.credentialUrl || ''}
                  onChange={e => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Competencies Covered (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Prompt Engineering, LLM Workflows, Deep Learning"
                  value={skillsInput}
                  onChange={e => setSkillsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingCert(null)}
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
