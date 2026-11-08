import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Upload, Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';

interface PhotoMediaTabProps {
  onToast: (msg: string, type?: 'success' | 'info') => void;
}

export const PhotoMediaTab: React.FC<PhotoMediaTabProps> = ({ onToast }) => {
  const { data, updateSection } = usePortfolio();

  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(data.profile.avatarUrl || './images/shiva-photo.jpg');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setPreviewUrl(json.fileUrl);
        // Save to profile in database
        const updatedProfile = {
          ...data.profile,
          avatarUrl: json.fileUrl,
        };
        const updateRes = await updateSection('profile', updatedProfile);
        if (updateRes.success) {
          onToast('Profile photo uploaded and updated successfully!');
        } else {
          setError(updateRes.message || 'Failed to update profile record');
        }
      } else {
        setError(json.message || 'File upload failed');
      }
    } catch (err: any) {
      setError(err.message || 'Network error during upload');
    } finally {
      setUploading(false);
    }
  };

  const handleResetToDefault = async () => {
    const updatedProfile = {
      ...data.profile,
      avatarUrl: './images/shiva-photo.jpg',
    };
    const res = await updateSection('profile', updatedProfile);
    if (res.success) {
      setPreviewUrl('./images/shiva-photo.jpg');
      onToast('Profile photo reset to official portrait');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div>
        <h2 className="text-2xl font-extrabold text-white font-heading">
          Profile Photograph &amp; Media Assets
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal portrait and media files. Uploaded images preserve your original, authentic appearance with zero AI alterations.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Profile Photo Section */}
      <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-cyber-cyan" />
          <span>Primary Profile Portrait</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Photo Preview Container with Cyber Glow Border */}
          <div className="relative group">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-1.5 glass-card border-2 border-cyber-cyan/50 shadow-neon-cyan relative overflow-hidden bg-dark-surface">
              <img
                src={previewUrl}
                alt="Shiva Nani Gurrala"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-cyber-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md whitespace-nowrap">
              Active Portrait
            </div>
          </div>

          {/* Upload Controls & Guidelines */}
          <div className="flex-1 space-y-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-white">Upload New Photograph</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Upload your latest professional photograph. The image will be stored securely on the server and immediately displayed on the public hero section.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-cyber-cyan hover:bg-cyan-400 text-dark-base shadow-neon-cyan cursor-pointer transition-all transform hover:-translate-y-0.5">
                <Upload className="w-4 h-4" />
                <span>{uploading ? 'Uploading...' : 'Choose Photo File'}</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleResetToDefault}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Reset to Original</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1">
              <div>&bull; Recommended aspect ratio: 1:1 (Square or Portrait)</div>
              <div>&bull; Formats accepted: PNG, JPG, JPEG, WEBP (Max 10 MB)</div>
              <div>&bull; Original facial appearance strictly preserved without modification</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
