import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  personalInfo as defaultProfile, 
  skillGroups as defaultSkills, 
  experienceData as defaultExperience, 
  projectsData as defaultProjects, 
  certificationsData as defaultCerts, 
  educationData as defaultEducation 
} from '../data/portfolioData';
import type { SkillGroup, Project, Certification, EducationItem, ExperienceItem } from '../types/portfolio';

export interface PortfolioData {
  profile: typeof defaultProfile & { phone?: string; avatarUrl: string; resumeUrl: string };
  about: {
    narrative: string;
    engineeringPrinciple: string;
    goals: { title: string; description: string }[];
    interests: string[];
  };
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: Project[];
  certifications: Certification[];
  education: EducationItem[];
  achievements: { id: string; title: string; date: string; description: string }[];
  positions: { id: string; title: string; organization: string; period: string; description: string }[];
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
}

const defaultPortfolio: PortfolioData = {
  profile: {
    ...defaultProfile,
    phone: '+91 9059860870',
    avatarUrl: './images/shiva-photo.jpg',
    resumeUrl: './resume/Shiva_Nani_Gurrala_Resume.html',
  },
  about: {
    narrative: defaultProfile.bio,
    engineeringPrinciple: 'Real AI innovation is not about hype or bloated interfaces. It is about crafting reliable, lightweight, and accessible digital tools that solve tangible problems for people.',
    goals: defaultProfile.goals,
    interests: [
      'Artificial Intelligence',
      'Machine Learning',
      'Generative AI & LLMs',
      'Frontend Architecture',
      'Linux Systems',
      'Kubernetes & Cloud',
    ],
  },
  skills: defaultSkills,
  experience: defaultExperience,
  projects: defaultProjects,
  certifications: defaultCerts,
  education: defaultEducation,
  achievements: [
    {
      id: 'ach-1',
      title: 'Unified Mentor Frontend Selection',
      date: 'Sep 2026',
      description: 'Selected for competitive 3-month frontend internship among nationwide applicants.',
    },
    {
      id: 'ach-2',
      title: 'IBM AI & Agentic Specialization',
      date: 'Sep-Oct 2026',
      description: 'Completed dual IBM professional certifications in Artificial Intelligence and AI Agents.',
    },
    {
      id: 'ach-3',
      title: 'Cloud & Containerization Foundation',
      date: 'Oct 2026',
      description: 'Accredited in KodeKloud Linux & Kubernetes foundations and Databricks Generative AI.',
    },
  ],
  positions: [
    {
      id: 'pos-1',
      title: 'Frontend Development Intern',
      organization: 'Unified Mentor Private Limited',
      period: 'Sep 2026 – Present',
      description: 'Building responsive user interfaces, implementing modern CSS/JS designs, and refining web performance.',
    },
  ],
  contact: {
    email: 'shivananigurrala22@gmail.com',
    phone: '+91 9059860870',
    location: 'Telangana, India',
    linkedin: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/',
    github: 'https://github.com/Shiva24040',
  },
};

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  refreshPortfolio: () => Promise<void>;
  updateSection: (sectionKey: keyof PortfolioData, payload: any) => Promise<{ success: boolean; message?: string }>;
}

const PortfolioContext = createContext<PortfolioContextType>({
  data: defaultPortfolio,
  loading: false,
  refreshPortfolio: async () => {},
  updateSection: async () => ({ success: false }),
});

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolio);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      }
    } catch (err) {
      console.warn('API unavailable, rendering from verified local cache:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const updateSection = async (sectionKey: keyof PortfolioData, payload: any) => {
    try {
      const res = await fetch(`/api/admin/section/${sectionKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setData(prev => ({ ...prev, [sectionKey]: result.data }));
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message || 'Update failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error' };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        refreshPortfolio: fetchPortfolio,
        updateSection,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
