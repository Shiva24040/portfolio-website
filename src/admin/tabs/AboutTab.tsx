import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';

interface AboutTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const AboutTab: React.FC<AboutTabProps> = ({ onToast }) => {
  const { data, updateSection } = usePortfolio();
  const [about, setAbout] = useState(data.about || {});
  const [saving, setSaving] = useState(false);
  const initialInterests = Array.isArray(data.about?.interests)
    ? data.about.interests.join(', ')
    : '';
  const [interestsInput, setInterestsInput] = useState(initialInterests);

  const handleGoalChange = (index: number, field: 'title' | 'description', value: string) => {
    const updatedGoals = Array.isArray(about.goals) ? [...about.goals] : [];
    if (updatedGoals[index]) {
      updatedGoals[index] = { ...updatedGoals[index], [field]: value };
      setAbout({ ...about, goals: updatedGoals });
    }
  };

  const handleAddGoal = () => {
    const currentGoals = Array.isArray(about.goals) ? about.goals : [];
    setAbout({
      ...about,
      goals: [
        ...currentGoals,
        { title: 'New Strategic Goal', description: 'Describe your milestone and practical focus.' },
      ],
    });
  };

  const handleDeleteGoal = (index: number) => {
    const currentGoals = Array.isArray(about.goals) ? about.goals : [];
    const updated = currentGoals.filter((_, i) => i !== index);
    setAbout({ ...about, goals: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formattedInterests = interestsInput
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    const finalized = {
      ...about,
      interests: formattedInterests,
    };

    const res = await updateSection('about', finalized);
    setSaving(false);

    if (res.success) {
      onToast('About narrative and strategic goals published!');
    } else {
      onToast(res.message || 'Error updating about data', 'info');
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            About Me &amp; Engineering Philosophy
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Update your professional narrative, core engineering philosophy, and strategic career milestones.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50 self-start sm:self-center"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save About Changes'}</span>
        </button>
      </div>

      {/* Narrative */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white font-heading border-b border-slate-800/80 pb-3">
          Detailed About Narrative (LinkedIn Verified Story)
        </h3>
        <textarea
          rows={6}
          value={about.narrative}
          onChange={e => setAbout({ ...about, narrative: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan leading-relaxed"
        />
      </div>

      {/* Engineering Principle */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white font-heading border-b border-slate-800/80 pb-3">
          Core Engineering Principle
        </h3>
        <input
          type="text"
          value={about.engineeringPrinciple}
          onChange={e => setAbout({ ...about, engineeringPrinciple: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
        />
      </div>

      {/* Strategic Goals */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-base font-bold text-white font-heading">
            Professional Career Goals &amp; Milestones
          </h3>
          <button
            type="button"
            onClick={handleAddGoal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyber-cyan/15 hover:bg-cyber-cyan text-cyber-cyan hover:text-dark-base transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Goal</span>
          </button>
        </div>

        <div className="space-y-4">
          {(Array.isArray(about.goals) ? about.goals : []).map((goal, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyber-cyan font-bold">
                  Goal #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteGoal(idx)}
                  className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                  title="Remove goal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={goal.title}
                  onChange={e => handleGoalChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={goal.description}
                  onChange={e => handleGoalChange(idx, 'description', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Interests */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-base font-bold text-white font-heading border-b border-slate-800/80 pb-3">
          Primary Technical Interests (Comma separated)
        </h3>
        <input
          type="text"
          value={interestsInput}
          onChange={e => setInterestsInput(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyber-cyan font-mono"
        />
      </div>
    </form>
  );
};
