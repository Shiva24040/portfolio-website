import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackgroundEffect } from '../components/BackgroundEffect';
import { ProjectModal } from '../components/ProjectModal';
import { ResumeModal } from '../components/ResumeModal';
import { ToastContainer } from '../components/Toast';
import type { ToastMessage } from '../components/Toast';

import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Certifications } from '../sections/Certifications';
import { Education } from '../sections/Education';
import { Contact } from '../sections/Contact';

import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../hooks/useTheme';
import type { Project } from '../types/portfolio';

export const PublicPortfolio: React.FC = () => {
  const sectionIds = [
    'home',
    'about',
    'skills',
    'experience',
    'projects',
    'certifications',
    'education',
    'contact',
  ];

  const activeSection = useScrollSpy(sectionIds, 150);
  const { theme, toggleTheme } = useTheme();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-dark-base text-slate-100 flex flex-col relative selection:bg-cyber-cyan/30 selection:text-white transition-colors duration-300">
      {/* Background SVG Neural Grid and Glows (Lightweight & 60fps) */}
      <BackgroundEffect />

      {/* Sticky Header with Navigation and Scroll Progress */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Content Sections - STRICTLY READ ONLY, NO ADMIN CONTROLS */}
      <main className="flex-1 w-full">
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onToast={(msg) => addToast(msg, 'success')}
        />
        <About />
        <Skills />
        <Experience />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Certifications />
        <Education />
        <Contact onToast={(msg) => addToast(msg, 'success')} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Public Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        onToast={(msg) => addToast(msg, 'info')}
      />

      {/* Floating Feedback Toasts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
