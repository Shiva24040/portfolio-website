import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { SkillGroup, SkillItem, SkillLevel } from '../../types/portfolio';
import { Plus, Trash2, Save, Code } from 'lucide-react';
import { SkillLevelBadge } from '../../components/Badge';

interface SkillsTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({ onToast }) => {
  const { data, updateSection } = usePortfolio();
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(data.skills);
  const [saving, setSaving] = useState(false);

  // New Skill Modal / Inline State
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState<SkillItem>({
    name: '',
    level: 'Learning',
    iconName: 'Code2',
    description: '',
  });

  const handleLevelChange = (categoryIndex: number, skillIndex: number, newLevel: SkillLevel) => {
    const updated = [...skillGroups];
    updated[categoryIndex].skills[skillIndex].level = newLevel;
    setSkillGroups(updated);
  };

  const handleDeleteSkill = (categoryIndex: number, skillIndex: number) => {
    const skillName = skillGroups[categoryIndex].skills[skillIndex].name;
    if (window.confirm(`Are you sure you want to delete "${skillName}"?`)) {
      const updated = [...skillGroups];
      updated[categoryIndex].skills.splice(skillIndex, 1);
      setSkillGroups(updated);
      onToast(`Deleted skill "${skillName}"`, 'info');
    }
  };

  const handleAddSkill = (categoryIndex: number) => {
    if (!newSkill.name.trim()) return;

    const updated = [...skillGroups];
    updated[categoryIndex].skills.push({ ...newSkill });
    setSkillGroups(updated);
    setNewSkill({ name: '', level: 'Learning', iconName: 'Code2', description: '' });
    setActiveCategory(null);
    onToast(`Added skill "${newSkill.name}"`);
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await updateSection('skills', skillGroups);
    setSaving(false);

    if (res.success) {
      onToast('Skills matrix saved and published successfully!');
    } else {
      onToast(res.message || 'Error updating skills', 'info');
    }
  };

  const skillLevels: SkillLevel[] = ['Completed', 'Familiar', 'Learning', 'Practicing'];

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Technical Skills Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Add, update proficiency levels (Completed, Familiar, Learning, Practicing), and remove skills across all categories.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50 self-start sm:self-center"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Skills Changes'}</span>
        </button>
      </div>

      {/* Category Groups */}
      <div className="space-y-6">
        {skillGroups.map((group, catIdx) => (
          <div key={group.category} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyber-cyan" />
                  <span>{group.category}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{group.description}</p>
              </div>

              <button
                type="button"
                onClick={() => setActiveCategory(activeCategory === group.category ? null : group.category)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyber-cyan/15 hover:bg-cyber-cyan text-cyber-cyan hover:text-dark-base transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Inline Add Skill Form */}
            {activeCategory === group.category && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyber-cyan/30 space-y-3 animate-in fade-in">
                <h4 className="text-xs font-mono uppercase text-cyber-cyan font-bold">
                  New {group.category} Skill
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Skill Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. PyTorch"
                      value={newSkill.name}
                      onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Status Level *</label>
                    <select
                      value={newSkill.level}
                      onChange={e => setNewSkill({ ...newSkill, level: e.target.value as SkillLevel })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                    >
                      {skillLevels.map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Short Description</label>
                    <input
                      type="text"
                      placeholder="Brief note or concept"
                      value={newSkill.description}
                      onChange={e => setNewSkill({ ...newSkill, description: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(null)}
                    className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddSkill(catIdx)}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyber-cyan text-dark-base hover:bg-cyan-400 shadow-sm"
                  >
                    Save Skill
                  </button>
                </div>
              </div>
            )}

            {/* Existing Skills Rows */}
            <div className="space-y-2">
              {group.skills.map((skill, skillIdx) => (
                <div
                  key={skill.name}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-white text-sm">{skill.name}</span>
                      <SkillLevelBadge level={skill.level} size="sm" />
                    </div>
                    {skill.description && (
                      <p className="text-xs text-slate-400 mt-0.5">{skill.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <select
                      value={skill.level}
                      onChange={e => handleLevelChange(catIdx, skillIdx, e.target.value as SkillLevel)}
                      className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] text-slate-200"
                    >
                      {skillLevels.map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(catIdx, skillIdx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                      title="Delete skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
