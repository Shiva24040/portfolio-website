import type { SkillGroup, Project, Certification, EducationItem, ExperienceItem } from '../types/portfolio';

export const personalInfo = {
  name: "Shiva Nani Gurrala",
  shortName: "Shiva Nani",
  title: "Aspiring AI/ML Engineer | Frontend Development Intern",
  subTitle: "Generative AI Enthusiast & Problem Solver",
  tagline: "Exploring Artificial Intelligence. Building Intelligent Solutions. Creating Digital Experiences.",
  location: "Telangana, India",
  email: "shivananigurrala22@gmail.com",
  linkedin: "https://www.linkedin.com/in/shiva-nani-gurrala-619026392/",
  github: "https://github.com/Shiva24040",
  bio: `I am an aspiring AI/ML Engineer with a strong interest in Artificial Intelligence, Machine Learning, and Generative AI. I am focused on developing the technical knowledge and problem-solving skills required to build intelligent, practical, and scalable solutions.

My learning journey includes programming fundamentals, AI and machine learning concepts, Generative AI, and modern technologies such as GitHub, Linux, and Kubernetes.

I enjoy exploring emerging technologies and understanding how they can be applied to solve real-world problems.`,
  goals: [
    {
      title: "Core AI/ML Mastery",
      description: "Deepening practical capabilities in machine learning models, computer vision, and neural network foundations."
    },
    {
      title: "Generative AI Innovation",
      description: "Developing intelligent workflow accelerators and real-world tools that harness large foundation models."
    },
    {
      title: "Frontend & Systems Integration",
      description: "Bridging the gap between cutting-edge AI backend services and accessible, lightning-fast user interfaces."
    }
  ],
  stats: [
    { label: "Focused Domains", value: "AI, ML & Frontend" },
    { label: "Active Projects", value: "4+ Prototypes" },
    { label: "Certifications", value: "5 Verified" },
    { label: "Internship", value: "Unified Mentor" }
  ]
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Programming",
    description: "Core algorithmic problem-solving and back-end logic languages.",
    skills: [
      {
        name: "C Programming",
        level: "Completed",
        iconName: "Code2",
        description: "Foundational programming, memory management, and data structures."
      },
      {
        name: "JavaScript",
        level: "Familiar",
        iconName: "FileCode2",
        description: "ES6+, DOM manipulation, asynchronous programming, and web APIs."
      },
      {
        name: "PHP",
        level: "Familiar",
        iconName: "Server",
        description: "Server-side scripting, form processing, and backend logic fundamentals."
      }
    ]
  },
  {
    category: "Frontend",
    description: "Modern, responsive, user-first web interface technologies.",
    skills: [
      {
        name: "HTML",
        level: "Completed",
        iconName: "Layout",
        description: "Semantic markup, modern HTML5 accessibility, and document structure."
      },
      {
        name: "CSS",
        level: "Completed",
        iconName: "Palette",
        description: "Responsive layouts, Flexbox, Grid, transitions, and modern glassmorphism."
      },
      {
        name: "JavaScript",
        level: "Familiar",
        iconName: "Sparkles",
        description: "Interactive UI logic, state management, and modern client-side scripting."
      },
      {
        name: "React",
        level: "Learning",
        iconName: "Atom",
        description: "Component architecture, hooks, state workflows, and SPA lifecycle."
      }
    ]
  },
  {
    category: "Artificial Intelligence",
    description: "Exploring machine intelligence, neural networks, and generative paradigms.",
    skills: [
      {
        name: "Artificial Intelligence",
        level: "Learning",
        iconName: "BrainCircuit",
        description: "Conceptual frameworks, search algorithms, heuristic decision systems."
      },
      {
        name: "Machine Learning",
        level: "Learning",
        iconName: "Cpu",
        description: "Supervised and unsupervised models, data preprocessing, and evaluation metrics."
      },
      {
        name: "Generative AI",
        level: "Learning",
        iconName: "Bot",
        description: "Prompt engineering principles, LLM workflows, and multimodal applications."
      },
      {
        name: "Microsoft Copilot",
        level: "Practicing",
        iconName: "Wand2",
        description: "Leveraging Copilot ecosystem for productivity, coding acceleration, and research."
      }
    ]
  },
  {
    category: "Tools and Technologies",
    description: "Modern developer tooling, containerization, and enterprise operating systems.",
    skills: [
      {
        name: "GitHub",
        level: "Completed",
        iconName: "GitBranch",
        description: "Version control workflows, repositories, branching strategies, and collaboration."
      },
      {
        name: "Linux",
        level: "Familiar",
        iconName: "Terminal",
        description: "Command-line navigation, file permissions, bash scripting, and shell tools."
      },
      {
        name: "Kubernetes",
        level: "Learning",
        iconName: "Boxes",
        description: "Container orchestration basics, pod concepts, and deployment architecture."
      },
      {
        name: "Microsoft 365",
        level: "Completed",
        iconName: "FolderGit2",
        description: "Cloud office suite, collaborative tools, workflows, and administrative features."
      }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "unified-mentor-intern",
    company: "Unified Mentor Private Limited",
    position: "Frontend Development Intern",
    period: "September 2026 – Present",
    location: "Remote / India",
    current: true,
    highlights: [
      "Selected for a competitive three-month frontend development internship.",
      "Gaining hands-on frontend development experience building responsive, accessible UI modules.",
      "Applying practical learning in JavaScript, HTML5, CSS3, and modern web styling patterns.",
      "Improving programming foundations, debugging techniques, and algorithmic problem-solving skills.",
      "Collaborating on developing practical, user-centric web solutions with optimized performance."
    ],
    skills: ["JavaScript", "HTML5", "CSS3", "Responsive Web Design", "Git", "Problem Solving"]
  }
];

export const projectsData: Project[] = [
  {
    id: "ai-resume-trainer",
    title: "AI Resume Trainer",
    category: "AI/ML",
    tagline: "Intelligent career preparation & ATS resume enhancement",
    description: "A smart career readiness tool that examines resume bullet points against modern recruitment algorithms, offering keyword suggestions, readability improvements, and structural optimization based on AI methodologies.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Local Storage", "Lucide Icons"],
    keyFeatures: [
      "ATS compatibility scoring and structure diagnostics",
      "Action-verb and impact-statement optimizer",
      "Target role keyword gap detector",
      "Instant client-side feedback without cloud overhead"
    ],
    githubUrl: "https://github.com/Shiva24040/ai-resume-trainer",
    demoUrl: "#projects",
    featured: true,
    accentColor: "#00D9FF",
    status: "Prototype",
    image: "/images/project-resume-trainer.svg"
  },
  {
    id: "rythu-sarvam",
    title: "Rythu Sarvam – AI-Based Farming Platform",
    category: "AI/ML",
    tagline: "Empowering Indian agriculture with data-driven decision intelligence",
    description: "An AI-powered agricultural advisory platform designed to assist farmers in Telangana and across India with crop planning, soil insights, weather alert systems, and market price trend forecasts.",
    technologies: ["JavaScript", "HTML5/CSS3", "Python ML Models", "OpenWeather API", "SVG Maps"],
    keyFeatures: [
      "Seasonal crop recommendation engine based on region and soil parameters",
      "Localized real-time weather alerts and hazard warnings",
      "Market price trend charts for regional agricultural produce",
      "Intuitive vernacular-first interface designed for rural mobile devices"
    ],
    githubUrl: "https://github.com/Shiva24040/rythu-sarvam",
    demoUrl: "#projects",
    featured: true,
    accentColor: "#10B981",
    status: "Prototype",
    image: "/images/project-rythu-sarvam.svg"
  },
  {
    id: "agrishield-ai",
    title: "AgriShield AI – Crop Disease Identification",
    category: "AI/ML",
    tagline: "Computer vision diagnostics for plant health and bio-safe remediation",
    description: "A machine learning and computer vision concept tool that identifies crop leaf diseases from image scans, providing early diagnosis and step-by-step bio-remedies to reduce crop loss.",
    technologies: ["Python", "Computer Vision Concepts", "CNN", "JavaScript UI", "Canvas"],
    keyFeatures: [
      "Visual diagnostic pipeline for early pest and fungal detection",
      "Botanical symptom catalog with high-fidelity visual references",
      "Eco-friendly, chemical-free treatment recommendations",
      "Lightweight model architecture optimized for low-bandwidth environments"
    ],
    githubUrl: "https://github.com/Shiva24040/agrishield-ai",
    demoUrl: "#projects",
    featured: true,
    accentColor: "#8B5CF6",
    status: "In Development",
    image: "/images/project-agrishield.svg"
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    category: "Frontend",
    tagline: "Ultra-fast futuristic AI glassmorphism developer portfolio",
    description: "The website you are currently experiencing: engineered with React, Vite, TypeScript, and hardware-accelerated CSS animations. Completely lightweight with zero heavy WebGL overhead, designed for 60fps performance on integrated GPUs.",
    technologies: ["React 19", "Vite", "TypeScript", "Tailwind CSS", "Custom Glassmorphism", "Lucide Icons"],
    keyFeatures: [
      "Advanced dark futuristic AI aesthetic with neon accents (#00D9FF & #8B5CF6)",
      "Strictly lightweight: No Three.js or heavy WebGL, 100% 60fps CSS animations",
      "Fully responsive across 320px to 4K displays with zero layout shift",
      "WCAG-accessible reduced motion support and dark/light mode toggle",
      "Interactive project filtering, certificate viewer, and functional contact flow"
    ],
    githubUrl: "https://github.com/Shiva24040/portfolio-website",
    demoUrl: "https://shiva24040.github.io/portfolio-website",
    featured: true,
    accentColor: "#00D9FF",
    status: "Completed",
    image: "/images/project-portfolio.svg"
  }
];

export const certificationsData: Certification[] = [
  {
    id: "cert-linux",
    title: "Linux for Absolute Beginners",
    issuer: "Udemy / Open Source Training",
    year: "2024",
    badgeType: "dev",
    skillsGained: [
      "Bash Shell Commands",
      "File System Architecture",
      "User Permissions & Security",
      "Package Management"
    ],
    credentialUrl: "https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/"
  },
  {
    id: "cert-genai",
    title: "Generative AI Fundamentals",
    issuer: "Cloud / AI Learning Platform",
    year: "2024",
    badgeType: "ai",
    skillsGained: [
      "LLM Foundations",
      "Prompt Engineering",
      "Attention & Transformer Concepts",
      "Responsible AI Principles"
    ],
    credentialUrl: "https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/"
  },
  {
    id: "cert-github",
    title: "GitHub Basics",
    issuer: "GitHub / Education Partner",
    year: "2024",
    badgeType: "dev",
    skillsGained: [
      "Git Repositories",
      "Branching & Merging",
      "Pull Requests & Code Review",
      "Issue Tracking"
    ],
    credentialUrl: "https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/"
  },
  {
    id: "cert-teams",
    title: "Microsoft Teams for Education",
    issuer: "Microsoft",
    year: "2024",
    badgeType: "productivity",
    skillsGained: [
      "Collaborative Workspaces",
      "Virtual Classrooms",
      "Task Coordination",
      "Resource Sharing"
    ],
    credentialUrl: "https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/"
  },
  {
    id: "cert-copilot",
    title: "Learning Microsoft 365 Copilot for Work (2024)",
    issuer: "LinkedIn Learning / Microsoft",
    year: "2024",
    badgeType: "ai",
    skillsGained: [
      "Copilot Integration in M365",
      "Contextual Prompts for Productivity",
      "Data Synthesis & Document Automation",
      "Enterprise AI Workflows"
    ],
    credentialUrl: "https://www.linkedin.com/in/shiva-nani-gurrala-619026392/details/certifications/"
  }
];

export const educationData: EducationItem[] = [
  {
    id: "trr-diploma",
    institution: "T.R.R. College of Technology",
    degree: "Diploma in Computer Science Engineering",
    period: "August 2025 – Present",
    location: "Telangana, India",
    current: true,
    details: [
      "Currently pursuing Diploma in Computer Science Engineering.",
      "Core coursework in C Programming, Data Structures, Web Technologies, Computer Networks, and Operating Systems.",
      "Active participant in technical workshops, emerging technology exploration, and collaborative coding projects.",
      "Focusing on the synergy between computer science fundamentals and modern AI/ML applications."
    ]
  },
  {
    id: "megacity-school",
    institution: "Mega City High School, Hayathnagar",
    degree: "Secondary School Certificate (SSC)",
    period: "Completed",
    location: "Hayathnagar, Telangana, India",
    current: false,
    details: [
      "Completed secondary education with strong foundations in Mathematics, Science, and English.",
      "Developed an early curiosity for computer systems, logic puzzles, and digital design.",
      "Participated actively in school science fairs and academic competitions."
    ]
  }
];
