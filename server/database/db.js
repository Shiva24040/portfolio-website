import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data.json');

const initialData = {
  auth: {
    email: process.env.ADMIN_EMAIL || 'shivananigurrala22@gmail.com',
    passwordHash: '',
    updatedAt: new Date().toISOString(),
  },
  profile: {
    name: 'Shiva Nani Gurrala',
    shortName: 'Shiva Nani',
    title: 'Aspiring AI/ML Engineer | Frontend Development Intern',
    subTitle: 'Generative AI Enthusiast & Problem Solver',
    tagline: 'Exploring Artificial Intelligence. Building Intelligent Solutions. Creating Digital Experiences.',
    location: 'Telangana, India',
    email: 'shivananigurrala22@gmail.com',
    phone: '+91 9059860870',
    linkedin: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/',
    github: 'https://github.com/Shiva24040',
    avatarUrl: './images/shiva-photo.jpg',
    resumeUrl: './resume/Shiva_Nani_Gurrala_Resume.html',
    bio: `I am an aspiring AI/ML Engineer with a strong interest in Artificial Intelligence, Machine Learning, and Generative AI. I am focused on developing the technical knowledge and problem-solving skills required to build intelligent, practical, and scalable solutions.

My learning journey includes programming fundamentals, AI and machine learning concepts, Generative AI, and modern technologies such as GitHub, Linux, and Kubernetes.

I enjoy exploring emerging technologies and understanding how they can be applied to solve real-world problems.`,
    stats: [
      { label: 'Focused Domains', value: 'AI, ML & Frontend' },
      { label: 'Active Projects', value: '4+ Prototypes' },
      { label: 'Certifications', value: '8 Verified' },
      { label: 'Internship', value: 'Unified Mentor' },
    ],
  },
  about: {
    narrative: `I am an aspiring AI/ML Engineer with a strong interest in Artificial Intelligence, Machine Learning, and Generative AI. I am focused on developing the technical knowledge and problem-solving skills required to build intelligent, practical, and scalable solutions.

My learning journey includes programming fundamentals, AI and machine learning concepts, Generative AI, and modern technologies such as GitHub, Linux, and Kubernetes.

I enjoy exploring emerging technologies and understanding how they can be applied to solve real-world problems.`,
    engineeringPrinciple: 'Real AI innovation is not about hype or bloated interfaces. It is about crafting reliable, lightweight, and accessible digital tools that solve tangible problems for people.',
    goals: [
      {
        title: 'Core AI/ML Mastery',
        description: 'Deepening practical capabilities in machine learning models, computer vision, and neural network foundations.',
      },
      {
        title: 'Generative AI Innovation',
        description: 'Developing intelligent workflow accelerators and real-world tools that harness large foundation models.',
      },
      {
        title: 'Frontend & Systems Integration',
        description: 'Bridging the gap between cutting-edge AI backend services and accessible, lightning-fast user interfaces.',
      },
    ],
    interests: [
      'Artificial Intelligence',
      'Machine Learning',
      'Generative AI & LLMs',
      'Frontend Architecture',
      'Linux Systems',
      'Kubernetes & Cloud',
    ],
  },
  skills: [
    {
      category: 'Programming',
      description: 'Core algorithmic problem-solving and back-end logic languages.',
      skills: [
        {
          name: 'C Programming',
          level: 'Completed',
          iconName: 'Code2',
          description: 'Foundational programming, memory management, and data structures.',
        },
        {
          name: 'JavaScript',
          level: 'Familiar',
          iconName: 'FileCode2',
          description: 'ES6+, DOM manipulation, asynchronous programming, and web APIs.',
        },
        {
          name: 'PHP',
          level: 'Familiar',
          iconName: 'Server',
          description: 'Server-side scripting, form processing, and backend logic fundamentals.',
        },
      ],
    },
    {
      category: 'Frontend',
      description: 'Modern, responsive, user-first web interface technologies.',
      skills: [
        {
          name: 'HTML',
          level: 'Completed',
          iconName: 'Layout',
          description: 'Semantic markup, modern HTML5 accessibility, and document structure.',
        },
        {
          name: 'CSS',
          level: 'Completed',
          iconName: 'Palette',
          description: 'Responsive layouts, Flexbox, Grid, transitions, and modern glassmorphism.',
        },
        {
          name: 'JavaScript',
          level: 'Familiar',
          iconName: 'Sparkles',
          description: 'Interactive UI logic, state management, and modern client-side scripting.',
        },
        {
          name: 'React',
          level: 'Learning',
          iconName: 'Atom',
          description: 'Component architecture, hooks, state workflows, and SPA lifecycle.',
        },
      ],
    },
    {
      category: 'Artificial Intelligence',
      description: 'Exploring machine intelligence, neural networks, and generative paradigms.',
      skills: [
        {
          name: 'Artificial Intelligence',
          level: 'Learning',
          iconName: 'BrainCircuit',
          description: 'Conceptual frameworks, search algorithms, heuristic decision systems.',
        },
        {
          name: 'Machine Learning',
          level: 'Learning',
          iconName: 'Cpu',
          description: 'Supervised and unsupervised models, data preprocessing, and evaluation metrics.',
        },
        {
          name: 'Generative AI',
          level: 'Learning',
          iconName: 'Bot',
          description: 'Prompt engineering principles, LLM workflows, and multimodal applications.',
        },
        {
          name: 'Microsoft Copilot',
          level: 'Practicing',
          iconName: 'Wand2',
          description: 'Leveraging Copilot ecosystem for productivity, coding acceleration, and research.',
        },
      ],
    },
    {
      category: 'Tools and Technologies',
      description: 'Modern developer tooling, containerization, and enterprise operating systems.',
      skills: [
        {
          name: 'GitHub',
          level: 'Completed',
          iconName: 'GitBranch',
          description: 'Version control workflows, repositories, branching strategies, and collaboration.',
        },
        {
          name: 'Linux',
          level: 'Familiar',
          iconName: 'Terminal',
          description: 'Command-line navigation, file permissions, bash scripting, and shell tools.',
        },
        {
          name: 'Kubernetes',
          level: 'Familiar',
          iconName: 'Boxes',
          description: 'Container orchestration basics, pod concepts, and deployment architecture.',
        },
        {
          name: 'Microsoft 365',
          level: 'Completed',
          iconName: 'FolderGit2',
          description: 'Cloud office suite, collaborative tools, workflows, and administrative features.',
        },
      ],
    },
  ],
  experience: [
    {
      id: 'unified-mentor-intern',
      company: 'Unified Mentor Private Limited',
      position: 'Frontend Development Intern',
      period: 'September 2026 – Present',
      location: 'Remote / India',
      current: true,
      highlights: [
        'Selected for a competitive three-month frontend development internship.',
        'Gaining hands-on frontend development experience building responsive, accessible UI modules.',
        'Applying practical learning in JavaScript, HTML5, CSS3, and modern web styling patterns.',
        'Improving programming foundations, debugging techniques, and algorithmic problem-solving skills.',
        'Collaborating on developing practical, user-centric web solutions with optimized performance.',
      ],
      skills: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Web Design', 'Git', 'Problem Solving'],
    },
  ],
  projects: [
    {
      id: 'ai-resume-trainer',
      title: 'AI Resume Trainer',
      category: 'AI/ML',
      tagline: 'Intelligent career preparation & ATS resume enhancement',
      description: 'A smart career readiness tool that examines resume bullet points against modern recruitment algorithms, offering keyword suggestions, readability improvements, and structural optimization based on AI methodologies.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Local Storage', 'Lucide Icons'],
      keyFeatures: [
        'ATS compatibility scoring and structure diagnostics',
        'Action-verb and impact-statement optimizer',
        'Target role keyword gap detector',
        'Instant client-side feedback without cloud overhead',
      ],
      githubUrl: 'https://github.com/Shiva24040/ai-resume-trainer',
      demoUrl: '#projects',
      featured: true,
      accentColor: '#00D9FF',
      status: 'Prototype',
      image: './images/project-resume-trainer.svg',
    },
    {
      id: 'rythu-sarvam',
      title: 'Rythu Sarvam – AI-Based Farming Platform',
      category: 'AI/ML',
      tagline: 'Empowering Indian agriculture with data-driven decision intelligence',
      description: 'An AI-powered agricultural advisory platform designed to assist farmers in Telangana and across India with crop planning, soil insights, weather alert systems, and market price trend forecasts.',
      technologies: ['JavaScript', 'HTML5/CSS3', 'Python ML Models', 'OpenWeather API', 'SVG Maps'],
      keyFeatures: [
        'Seasonal crop recommendation engine based on region and soil parameters',
        'Localized real-time weather alerts and hazard warnings',
        'Market price trend charts for regional agricultural produce',
        'Intuitive vernacular-first interface designed for rural mobile devices',
      ],
      githubUrl: 'https://github.com/Shiva24040/rythu-sarvam',
      demoUrl: '#projects',
      featured: true,
      accentColor: '#10B981',
      status: 'Prototype',
      image: './images/project-rythu-sarvam.svg',
    },
    {
      id: 'agrishield-ai',
      title: 'AgriShield AI – Crop Disease Identification',
      category: 'AI/ML',
      tagline: 'Computer vision diagnostics for plant health and bio-safe remediation',
      description: 'A machine learning and computer vision concept tool that identifies crop leaf diseases from image scans, providing early diagnosis and step-by-step bio-remedies to reduce crop loss.',
      technologies: ['Python', 'Computer Vision Concepts', 'CNN', 'JavaScript UI', 'Canvas'],
      keyFeatures: [
        'Visual diagnostic pipeline for early pest and fungal detection',
        'Botanical symptom catalog with high-fidelity visual references',
        'Eco-friendly, chemical-free treatment recommendations',
        'Lightweight model architecture optimized for low-bandwidth environments',
      ],
      githubUrl: 'https://github.com/Shiva24040/agrishield-ai',
      demoUrl: '#projects',
      featured: true,
      accentColor: '#8B5CF6',
      status: 'In Development',
      image: './images/project-agrishield.svg',
    },
    {
      id: 'portfolio-website',
      title: 'Personal Portfolio Website',
      category: 'Frontend',
      tagline: 'Ultra-fast futuristic AI glassmorphism developer portfolio',
      description: 'The website you are currently experiencing: engineered with React, Vite, TypeScript, and hardware-accelerated CSS animations. Completely lightweight with zero heavy WebGL overhead, designed for 60fps performance on integrated GPUs.',
      technologies: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS', 'Custom Glassmorphism', 'Lucide Icons'],
      keyFeatures: [
        'Advanced dark futuristic AI aesthetic with neon accents (#00D9FF & #8B5CF6)',
        'Strictly lightweight: No Three.js or heavy WebGL, 100% 60fps CSS animations',
        'Fully responsive across 320px to 4K displays with zero layout shift',
        'WCAG-accessible reduced motion support and dark/light mode toggle',
        'Interactive project filtering, certificate viewer, and functional contact flow',
      ],
      githubUrl: 'https://github.com/Shiva24040/portfolio-website',
      demoUrl: 'https://shiva24040.github.io/portfolio-website',
      featured: true,
      accentColor: '#00D9FF',
      status: 'Completed',
      image: './images/project-portfolio.svg',
    },
  ],
  certifications: [
    {
      id: 'cert-ai-agents',
      title: 'Unleashing the Power of AI Agents',
      issuer: 'IBM',
      year: '2026',
      issuedDate: 'Sep 2026',
      credentialId: 'ALM-COURSE_3825456',
      badgeType: 'ai',
      skillsGained: [
        'Agentic AI Development',
        'AI Agents Architecture',
        'Autonomous Decision Workflows',
        'LLM Tool Orchestration',
      ],
      credentialUrl: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/',
    },
    {
      id: 'cert-exploring-ai',
      title: 'Exploring Artificial Intelligence',
      issuer: 'IBM',
      year: '2026',
      issuedDate: 'Oct 2026',
      credentialId: 'ALM-COURSE_3825247',
      badgeType: 'ai',
      skillsGained: [
        'AI Fundamentals',
        'Machine Learning Foundations',
        'Neural Networks & Deep Learning',
        'Cognitive Computing',
      ],
      credentialUrl: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/',
    },
    {
      id: 'cert-genai',
      title: 'Academy Accreditation - Generative AI Fundamentals',
      issuer: 'Databricks',
      year: '2026',
      issuedDate: 'Oct 2026',
      credentialId: '196420037',
      badgeType: 'ai',
      skillsGained: [
        'LLM Foundations',
        'Prompt Engineering',
        'Attention & Transformer Concepts',
        'Responsible Generative AI',
      ],
      credentialUrl: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/',
    },
    {
      id: 'cert-copilot',
      title: 'Learning Microsoft 365 Copilot for Work (2024)',
      issuer: 'LinkedIn',
      year: '2026',
      issuedDate: 'Oct 2026',
      badgeType: 'ai',
      skillsGained: [
        'Microsoft Copilot',
        'Office 365 AI Integration',
        'Work Productivity Prompts',
        'Enterprise Automation',
      ],
      credentialUrl: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/',
    },
    {
      id: 'cert-kubernetes',
      title: 'Kubernetes for Absolute Beginners',
      issuer: 'KodeKloud',
      year: '2026',
      issuedDate: 'Oct 2026',
      credentialId: 'ba785e2e-ccae-4a0d-9081-f554738c4c07',
      badgeType: 'cloud',
      skillsGained: [
        'Container Orchestration',
        'Pods, ReplicaSets & Deployments',
        'Cluster Architecture',
        'YAML Declarative Manifests',
      ],
      credentialUrl: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/',
    },
    {
      id: 'cert-linux',
      title: 'Linux For Absolute Beginners',
      issuer: 'KodeKloud',
      year: '2026',
      issuedDate: 'Oct 2026',
      credentialId: '939ddb22-82b8-49c1-a0e8-b1a728879fbe',
      badgeType: 'dev',
      skillsGained: [
        'Bash Shell Commands',
        'Linux File System Architecture',
        'User Permissions & Security',
        'Package Management',
      ],
      credentialUrl: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/',
    },
    {
      id: 'cert-github',
      title: 'GitHub Basics',
      issuer: 'Simplilearn',
      year: '2026',
      issuedDate: 'Oct 2026',
      credentialId: '10924391',
      badgeType: 'dev',
      skillsGained: [
        'Git Repositories',
        'Branching & Merging',
        'Pull Requests & Code Review',
        'Version Control Best Practices',
      ],
      credentialUrl: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/',
    },
    {
      id: 'cert-teams',
      title: 'Get started with Microsoft Teams for Education',
      issuer: 'Microsoft',
      year: '2026',
      issuedDate: 'Oct 2026',
      badgeType: 'productivity',
      skillsGained: [
        'Collaborative Virtual Spaces',
        'Virtual Classrooms & Channels',
        'Team Coordination',
        'Resource Sharing & Workflows',
      ],
      credentialUrl: 'https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/',
    },
  ],
  education: [
    {
      id: 'trr-diploma',
      institution: 'T.R.R. College of Technology',
      degree: 'Diploma in Computer Science Engineering',
      period: 'August 2025 – Present',
      location: 'Telangana, India',
      current: true,
      details: [
        'Currently pursuing Diploma in Computer Science Engineering.',
        'Core coursework in C Programming, Data Structures, Web Technologies, Computer Networks, and Operating Systems.',
        'Active participant in technical workshops, emerging technology exploration, and collaborative coding projects.',
        'Focusing on the synergy between computer science fundamentals and modern AI/ML applications.',
      ],
    },
    {
      id: 'megacity-school',
      institution: 'Mega City High School, Hayathnagar',
      degree: 'Secondary School Certificate (SSC)',
      period: 'Completed (July 2018 - April 2025)',
      location: 'Hayathnagar, Telangana, India',
      current: false,
      details: [
        'Completed secondary education with strong foundations in Mathematics, Science, and English.',
        'Developed an early curiosity for computer systems, logic puzzles, and digital design.',
        'Participated actively in school science fairs and academic competitions.',
      ],
    },
  ],
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

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || 'ShivaNani@2026!';
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(defaultPassword, salt);
      
      const seed = {
        ...initialData,
        auth: {
          email: process.env.ADMIN_EMAIL || 'shivananigurrala22@gmail.com',
          passwordHash: hash,
          updatedAt: new Date().toISOString(),
        },
      };
      this.writeSync(seed);
      console.log('✅ Database initialized and seeded with owner credentials & portfolio content.');
    }
  }

  readSync() {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error reading database:', err);
      return initialData;
    }
  }

  writeSync(data) {
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  }

  getPublicPortfolio() {
    const data = this.readSync();
    // Exclude security auth block from public portfolio response
    const publicData = { ...data };
    delete publicData.auth;
    return publicData;
  }

  getAuth() {
    const data = this.readSync();
    return data.auth;
  }

  updateAuth(email, passwordHash) {
    const data = this.readSync();
    data.auth = {
      email,
      passwordHash,
      updatedAt: new Date().toISOString(),
    };
    this.writeSync(data);
    return true;
  }

  updateSection(sectionKey, sectionData) {
    const data = this.readSync();
    data[sectionKey] = sectionData;
    this.writeSync(data);
    return data[sectionKey];
  }
}

export const db = new Database();
