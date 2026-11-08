import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project } from '../../types/portfolio';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';

interface ProjectsTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ onToast }) => {
  const { data, updateSection } = usePortfolio();
  const [projects, setProjects] = useState<Project[]>(Array.isArray(data.projects) ? data.projects : []);
  const [saving, setSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Edit / Add form state
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      category: 'AI/ML',
      tagline: '',
      description: '',
      technologies: [],
      keyFeatures: [],
      githubUrl: 'https://github.com/Shiva24040/',
      demoUrl: '#',
      featured: true,
      accentColor: '#00D9FF',
      status: 'In Development',
      image: './images/project-portfolio.svg',
    });
    setTechInput('');
    setFeatureInput('');
  };

  const handleOpenEdit = (project: Project) => {
    setIsNew(false);
    setEditingProject({ ...project });
    setTechInput(project.technologies.join(', '));
    setFeatureInput(project.keyFeatures.join('\n'));
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete project "${title}"?`)) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      onToast(`Deleted "${title}"`, 'info');
    }
  };

  const handleSaveModal = () => {
    if (!editingProject || !editingProject.title.trim()) return;

    const formattedTechs = techInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const formattedFeatures = featureInput
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const finalized: Project = {
      ...editingProject,
      technologies: formattedTechs,
      keyFeatures: formattedFeatures,
    };

    if (isNew) {
      setProjects([...projects, finalized]);
    } else {
      setProjects(projects.map(p => (p.id === finalized.id ? finalized : p)));
    }

    setEditingProject(null);
    onToast(`Staged changes for "${finalized.title}". Click 'Save All Projects' to publish.`);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    const res = await updateSection('projects', projects);
    setSaving(false);

    if (res.success) {
      onToast('All projects updated and published successfully!');
    } else {
      onToast(res.message || 'Error saving projects', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Projects Portfolio Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Add new projects, update repositories, live demonstration links, and architectural feature descriptions.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-cyber-cyan" />
            <span>Add Project</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Projects'}</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start gap-4 flex-1">
              <img
                src={project.image}
                alt={project.title}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-slate-800 bg-slate-950 flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base font-heading">{project.title}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-cyber-cyan font-medium">{project.tagline}</p>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.technologies.slice(0, 5).map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleOpenEdit(project)}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                title="Edit Project"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(project.id, project.title)}
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors border border-slate-700/60"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-base/85 backdrop-blur-md">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-2xl border border-cyber-cyan/40 bg-dark-surface space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white font-heading">
                {isNew ? 'Create New Project' : `Edit: ${editingProject.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Category *</label>
                <select
                  value={editingProject.category}
                  onChange={e => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                >
                  <option value="AI/ML">AI/ML</option>
                  <option value="Frontend">Frontend</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Tagline / Subheading</label>
                <input
                  type="text"
                  value={editingProject.tagline}
                  onChange={e => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Description *</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">GitHub Repo URL</label>
                <input
                  type="url"
                  value={editingProject.githubUrl}
                  onChange={e => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Live Demo URL</label>
                <input
                  type="text"
                  value={editingProject.demoUrl}
                  onChange={e => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Status</label>
                <select
                  value={editingProject.status}
                  onChange={e => setEditingProject({ ...editingProject, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Development">In Development</option>
                  <option value="Prototype">Prototype</option>
                </select>
              </div>

              <div>
                <label className="block font-mono uppercase text-slate-400 mb-1">Image Path</label>
                <input
                  type="text"
                  value={editingProject.image}
                  onChange={e => setEditingProject({ ...editingProject, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Tailwind, Python"
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-mono uppercase text-slate-400 mb-1">Key Features (One feature per line)</label>
                <textarea
                  rows={3}
                  placeholder="ATS compatibility scoring&#10;Action verb optimizer&#10;Instant feedback"
                  value={featureInput}
                  onChange={e => setFeatureInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
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
