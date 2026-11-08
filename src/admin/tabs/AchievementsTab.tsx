import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Save, Star, Users } from 'lucide-react';

interface AchievementsTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const AchievementsTab: React.FC<AchievementsTabProps> = ({ onToast }) => {
  const { data, updateSection } = usePortfolio();
  const [achievements, setAchievements] = useState(data.achievements || []);
  const [positions, setPositions] = useState(data.positions || []);
  const [saving, setSaving] = useState(false);

  const handleAddAchievement = () => {
    setAchievements([
      ...achievements,
      {
        id: `ach-${Date.now()}`,
        title: 'New Achievement',
        date: '2026',
        description: 'Describe honor, distinction, or technical milestone.',
      },
    ]);
  };

  const handleDeleteAchievement = (id: string) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  const handleAchievementChange = (id: string, field: string, val: string) => {
    setAchievements(achievements.map(a => (a.id === id ? { ...a, [field]: val } : a)));
  };

  const handleAddPosition = () => {
    setPositions([
      ...positions,
      {
        id: `pos-${Date.now()}`,
        title: 'Leadership / Coordinator Role',
        organization: 'Organization Name',
        period: '2026',
        description: 'Leadership responsibilities and team coordination.',
      },
    ]);
  };

  const handleDeletePosition = (id: string) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  const handlePositionChange = (id: string, field: string, val: string) => {
    setPositions(positions.map(p => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    const res1 = await updateSection('achievements', achievements);
    const res2 = await updateSection('positions', positions);
    setSaving(false);

    if (res1.success && res2.success) {
      onToast('Achievements & leadership positions saved!');
    } else {
      onToast('Failed to save updates', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Achievements &amp; Leadership Positions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your academic distinctions, competition milestones, and organizational leadership roles.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50 self-start sm:self-center"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Records'}</span>
        </button>
      </div>

      {/* Achievements Section */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span>Honors &amp; Milestones</span>
          </h3>
          <button
            type="button"
            onClick={handleAddAchievement}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyber-cyan/15 hover:bg-cyber-cyan text-cyber-cyan hover:text-dark-base transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Achievement</span>
          </button>
        </div>

        <div className="space-y-3">
          {achievements.map((ach) => (
            <div key={ach.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={ach.title}
                  onChange={e => handleAchievementChange(ach.id, 'title', e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-bold"
                  placeholder="Achievement title"
                />
                <input
                  type="text"
                  value={ach.date}
                  onChange={e => handleAchievementChange(ach.id, 'date', e.target.value)}
                  className="w-28 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                  placeholder="Date/Year"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteAchievement(ach.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={2}
                value={ach.description}
                onChange={e => handleAchievementChange(ach.id, 'description', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed"
                placeholder="Description of the milestone or recognition"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Positions Section */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span>Positions of Responsibility</span>
          </h3>
          <button
            type="button"
            onClick={handleAddPosition}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyber-cyan/15 hover:bg-cyber-cyan text-cyber-cyan hover:text-dark-base transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Position</span>
          </button>
        </div>

        <div className="space-y-3">
          {positions.map((pos) => (
            <div key={pos.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={pos.title}
                  onChange={e => handlePositionChange(pos.id, 'title', e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-bold"
                  placeholder="Position title"
                />
                <input
                  type="text"
                  value={pos.organization}
                  onChange={e => handlePositionChange(pos.id, 'organization', e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                  placeholder="Organization"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pos.period}
                    onChange={e => handlePositionChange(pos.id, 'period', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                    placeholder="Duration"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeletePosition(pos.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <textarea
                rows={2}
                value={pos.description}
                onChange={e => handlePositionChange(pos.id, 'description', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed"
                placeholder="Description of activities and contributions"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
