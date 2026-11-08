import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save } from 'lucide-react';

interface ProfileTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ onToast }) => {
  const { data, updateSection } = usePortfolio();
  const [form, setForm] = useState(data.profile);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...form.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setForm(prev => ({ ...prev, stats: newStats }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateSection('profile', form);
    setSaving(false);

    if (res.success) {
      onToast('Personal profile updated successfully!');
    } else {
      onToast(res.message || 'Error updating profile', 'info');
    }
  };

  const handleReset = () => {
    setForm(data.profile);
    onToast('Reset unsaved changes', 'info');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Personal Profile &amp; Core Identity
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure your professional titles, tagline, contact handles, and summary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white font-heading border-b border-slate-800/80 pb-3">
          Primary Identity &amp; Headline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Display / Short Name
            </label>
            <input
              type="text"
              value={form.shortName}
              onChange={e => handleChange('shortName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Professional Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Secondary Subtitle / Specialization
            </label>
            <input
              type="text"
              value={form.subTitle}
              onChange={e => handleChange('subTitle', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
            Introductory Tagline
          </label>
          <input
            type="text"
            value={form.tagline}
            onChange={e => handleChange('tagline', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
          />
        </div>
      </div>

      {/* Contact & Social Links */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white font-heading border-b border-slate-800/80 pb-3">
          Contact Coordinates &amp; Social Links
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={e => handleChange('location', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Primary Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Mobile Phone
            </label>
            <input
              type="text"
              value={form.phone || ''}
              onChange={e => handleChange('phone', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={form.linkedin}
              onChange={e => handleChange('linkedin', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={form.github}
              onChange={e => handleChange('github', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
            />
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white font-heading border-b border-slate-800/80 pb-3">
          Bio &amp; Professional Narrative
        </h3>

        <div>
          <textarea
            rows={5}
            value={form.bio}
            onChange={e => handleChange('bio', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan leading-relaxed"
          />
        </div>
      </div>

      {/* Stats Counter Cards */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white font-heading border-b border-slate-800/80 pb-3">
          Key Metric Highlights (Hero &amp; About Grid)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {form.stats.map((stat, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                  Value (e.g. 8 Verified)
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={e => handleStatChange(idx, 'value', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                  Label (e.g. Certifications)
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={e => handleStatChange(idx, 'label', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
