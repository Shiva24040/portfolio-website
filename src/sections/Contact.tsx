import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { personalInfo } from '../data/portfolioData';
import { Github, Linkedin } from '../components/Icons';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface ContactProps {
  onToast: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(personalInfo.email)
        .then(() => onToast('Copied email: ' + personalInfo.email))
        .catch(() => onToast('Email: ' + personalInfo.email));
    } else {
      onToast('Email: ' + personalInfo.email);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject line';
    if (!formData.message.trim()) newErrors.message = 'Please enter your message';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Create functional direct mailto link with encoded content
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Hello Shiva,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent via Shiva Nani Portfolio Website`
    );

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    
    // Trigger user mail client
    window.location.href = mailtoUrl;

    setSubmitted(true);
    onToast('Message composed! Opening your email client to send to Shiva.');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="07"
          tag="Initiate Contact"
          title="Get In"
          gradientWord="Touch"
          subtitle="Interested in collaboration, internship opportunities, or discussing AI engineering? Send a direct message."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="border-cyber-cyan/20 p-6 bg-dark-surface/90">
              <h3 className="text-xl font-bold text-white font-heading mb-2">
                Let's Build Together
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                I am actively seeking software engineering internships, collaborative AI/ML development, and practical frontend challenges. Reach out through any of these verified channels:
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Primary Email</span>
                      <a href={`mailto:${personalInfo.email}`} className="text-slate-200 hover:text-cyber-cyan font-medium truncate">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors ml-2 flex-shrink-0"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* LinkedIn Item */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyber-cyan/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Professional Network</span>
                      <span className="text-slate-200 group-hover:text-cyber-cyan font-medium">LinkedIn Profile</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyber-cyan group-hover:underline">View &rarr;</span>
                </a>

                {/* GitHub Item */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Source Code</span>
                      <span className="text-slate-200 group-hover:text-purple-300 font-medium">GitHub: Shiva24040</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-purple-300 group-hover:underline">View &rarr;</span>
                </a>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Location Base</span>
                    <span className="text-slate-200 font-medium">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <GlassCard className="border-cyber-cyan/20 p-6 sm:p-8 bg-dark-surface/90">
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-cyan uppercase font-bold tracking-wider mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>Direct Dispatch Form</span>
              </div>
              <h3 className="text-xl font-bold text-white font-heading mb-4">
                Send a Message
              </h3>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white font-heading">
                    Email Client Triggered!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Your message has been formatted and passed directly to your default mail application addressed to <strong>{personalInfo.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-3 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyber-cyan ${
                          errors.name ? 'border-red-500/60' : 'border-slate-800'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyber-cyan ${
                          errors.email ? 'border-red-500/60' : 'border-slate-800'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Subject Line *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Internship Opportunity / Collaboration"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyber-cyan ${
                        errors.subject ? 'border-red-500/60' : 'border-slate-800'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your note, feedback, or project details..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyber-cyan ${
                        errors.message ? 'border-red-500/60' : 'border-slate-800'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyber-cyan to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-dark-base shadow-neon-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Dispatch to Shiva Nani</span>
                    </button>
                    <span className="block sm:inline sm:ml-4 text-[11px] font-mono text-slate-400 mt-2 sm:mt-0">
                      Zero spam &bull; 100% direct mail transmission
                    </span>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
};
