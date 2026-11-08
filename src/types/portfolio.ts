export type SkillLevel = 'Completed' | 'Familiar' | 'Learning' | 'Practicing';

export type SkillCategory = 'Programming' | 'Frontend' | 'Artificial Intelligence' | 'Tools and Technologies';

export interface SkillItem {
  name: string;
  level: SkillLevel;
  iconName: string;
  description: string;
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Frontend' | 'All';
  tagline: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  accentColor: string;
  status: 'Completed' | 'In Development' | 'Prototype';
  image: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  skillsGained: string[];
  credentialUrl?: string;
  badgeType: 'ai' | 'cloud' | 'dev' | 'productivity';
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  details: string[];
  current?: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  highlights: string[];
  skills: string[];
  current?: boolean;
}
