# Shiva Nani Gurrala — Personal Portfolio Website
### Aspiring AI/ML Engineer | Frontend Development Intern | Generative AI Enthusiast

An ultra-modern, high-performance, dark futuristic AI-themed portfolio website engineered with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**. Features custom glassmorphism, responsive cyber layouts, lightweight hardware-accelerated animations, and zero heavy 3D overhead.

---

## ⚡ Performance & Hardware Optimization
Engineered specifically for smooth development and 60 FPS rendering on modern laptops and integrated graphics:
- **Zero Heavy 3D / WebGL:** No Three.js, Babylon.js, or complex WebGL pipelines.
- **Hardware-Accelerated CSS:** Uses GPU transforms (`translate3d`, `will-change`) for fluid animations without thermal throttling.
- **Micro-Bundle Size:** Production gzip bundle is only ~102 kB (HTML + CSS + JS combined).
- **Reduced-Motion Support:** Full WCAG-compliant `@media (prefers-reduced-motion: reduce)` accessibility support.
- **Completely Free:** No paid templates, no paid APIs, no subscriptions. Ready for free deployment on GitHub Pages or Vercel.

---

## 🎨 Visual Design System
- **Theme:** Premium Dark Futuristic AI Glassmorphism
- **Color Palette:**
  - Background Base: `#080B14`
  - Secondary Surface: `#101827`
  - Primary Accent: `#00D9FF` (Cyber Cyan)
  - Secondary Accent: `#8B5CF6` (Cyber Violet)
  - Text Primary: `#F8FAFC`
  - Text Muted: `#94A3B8`
- **Typography:** `Outfit` (Headings), `Inter` (Body), `JetBrains Mono` (Code & Telemetry)
- **Design Elements:** Frosted glass cards, glowing borders, neural grid background, and responsive cyber HUD pills.

> **Note on AI Philosophy:** This is a professional developer portfolio website, not an AI chatbot application. The AI theme is strictly expressed through visual design, typography, and project showcases.

---

## 📂 Project Architecture

```
portfolio-website/
├── public/
│   ├── favicon.svg                  # Futuristic SN cyber monogram favicon
│   ├── robots.txt                   # Search crawler directives
│   ├── sitemap.xml                  # SEO XML sitemap
│   ├── images/
│   │   ├── shiva-avatar.svg         # High-fidelity futuristic cyber profile
│   │   ├── project-resume-trainer.svg # AI Resume Trainer UI preview
│   │   ├── project-rythu-sarvam.svg   # Rythu Sarvam agricultural telemetry
│   │   ├── project-agrishield.svg     # AgriShield AI leaf scan mockup
│   │   └── project-portfolio.svg      # Portfolio architecture preview
│   └── resume/
│       └── Shiva_Nani_Gurrala_Resume.html # Printable / downloadable resume
├── src/
│   ├── assets/                      # Static assets
│   ├── components/
│   │   ├── BackgroundEffect.tsx     # Lightweight neural waves & cyber glow
│   │   ├── Badge.tsx                # Skill level badges (Completed, Familiar, Learning, Practicing)
│   │   ├── Footer.tsx               # Brand, quick links, back to top
│   │   ├── GlassCard.tsx            # Frosted glassmorphism container
│   │   ├── Icons.tsx                # Crisp standalone GitHub & LinkedIn SVGs
│   │   ├── Navbar.tsx               # Sticky header, scroll progress, mobile drawer
│   │   ├── ProjectModal.tsx         # Interactive project details dialog
│   │   ├── ResumeModal.tsx          # In-browser formatted resume viewer
│   │   ├── SectionHeading.tsx       # Standardized cyber section headings
│   │   └── Toast.tsx                # Non-intrusive notification feedback
│   ├── data/
│   │   └── portfolioData.ts         # Verified profile, skills, timeline, & projects
│   ├── hooks/
│   │   ├── useScrollProgress.ts     # Real-time top progress bar tracking
│   │   ├── useScrollSpy.ts          # Active navigation link highlighter
│   │   └── useTheme.ts              # Dark futuristic AI / Light mode toggle
│   ├── sections/
│   │   ├── Hero.tsx                 # Opening showcase, avatar, CTAs
│   │   ├── About.tsx                # Verified LinkedIn bio, goals & philosophy
│   │   ├── Skills.tsx               # Interactive skill matrix & category filters
│   │   ├── Experience.tsx           # Unified Mentor internship timeline
│   │   ├── Projects.tsx             # 4 featured project showcases & filters
│   │   ├── Certifications.tsx       # 5 verified certifications & links
│   │   ├── Education.tsx            # T.R.R. College & Mega City High School
│   │   └── Contact.tsx              # Validated direct dispatch form & contacts
│   ├── types/
│   │   └── portfolio.ts             # Strict TypeScript data models
│   ├── App.tsx                      # Root application layout
│   ├── index.css                    # Tailwind + custom glassmorphism utilities
│   └── main.tsx                     # React root DOM mount
├── index.html                       # SEO meta tags, Open Graph, fonts
├── tailwind.config.js               # Cyber colors, keyframes, glow utilities
├── postcss.config.js                # PostCSS autoprefixer & tailwind setup
├── tsconfig.json                    # TypeScript project references
└── package.json                     # Scripts & lightweight dependencies
```

---

## 🛠️ Technology Stack
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & Hardware-Accelerated Glassmorphism
- **Icons:** [Lucide React](https://lucide.dev/) & Custom SVG Monograms
- **Linter:** [Oxlint](https://oxc.rs/)

---

## 💻 Local Setup & Development (Windows 11)

### 1. Prerequisites
- **Node.js LTS** (v18 or higher; verified on Node v26 LTS)
- **Visual Studio Code**
- **Git**

### 2. Installation
Open PowerShell in the project directory:
```powershell
cd "c:\Users\Admin\Documents\portfolio website"
npm install
```

### 3. Run Development Server
```powershell
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the website live with Instant Hot Module Replacement (HMR).

### 4. Build for Production
```powershell
npm run build
```
This produces the optimized production bundle in the `dist/` directory in under 3 seconds.

### 5. Preview Production Build Locally
```powershell
npm run preview
```

---

## 🚀 Free Deployment Guide

### Option A: Deploy to Vercel (Recommended & 100% Free)
1. Install the Vercel CLI (or connect via GitHub):
   ```powershell
   npm install -g vercel
   ```
2. Run `vercel` in your project folder:
   ```powershell
   vercel
   ```
3. Follow the prompts. Your portfolio will be live on a free SSL domain (e.g. `https://shiva-nani-portfolio.vercel.app`).

### Option B: Deploy to GitHub Pages (100% Free)
1. In `vite.config.ts`, add the base repository path:
   ```ts
   export default defineConfig({
     base: '/portfolio-website/',
     plugins: [react()],
   })
   ```
2. Install `gh-pages`:
   ```powershell
   npm install -D gh-pages
   ```
3. Add deployment scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Run:
   ```powershell
   npm run deploy
   ```
5. Your website will be live at `https://Shiva24040.github.io/portfolio-website/`.

---

## 👤 Author & Contact
- **Name:** Shiva Nani Gurrala
- **Email:** [shivananigurrala22@gmail.com](mailto:shivananigurrala22@gmail.com)
- **LinkedIn:** [linkedin.com/in/shiva-nani-gurrala-619026392](https://www.linkedin.com/in/shiva-nani-gurrala-619026392/)
- **GitHub:** [github.com/Shiva24040](https://github.com/Shiva24040)
- **Location:** Telangana, India
