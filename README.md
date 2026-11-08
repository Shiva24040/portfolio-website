# Shiva Nani Gurrala — Full-Stack AI Engineer Portfolio & Private Administration System
### Aspiring AI/ML Engineer | Frontend Development Intern | Generative AI Enthusiast

An ultra-modern, high-performance, dark futuristic AI-themed portfolio website engineered with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and a secure **Node.js/Express** backend with an ACID-compliant atomic JSON database and private administration system.

---

## 🌟 Key Highlights & System Architecture

### 1. Dual Architecture: Public vs. Private
- **Public Portfolio (`/`):**
  - Accessible to all visitors and recruiters worldwide.
  - Zero editing controls, edit icons, delete buttons, or management interfaces are ever rendered to public visitors.
  - 10 comprehensive sections: Hero with Shiva's real photo, About Me, Skills, Experience, 4 Featured Projects, 8 Industry Certifications, Education, Achievements, Resume Viewer, and Contact.
  - Strictly adheres to the **no-AI-chatbot** requirement (AI theme is conveyed via visual aesthetic only).
- **Private Admin Dashboard (`/admin`):**
  - Accessible exclusively to the authenticated owner via `/admin/login`.
  - Protected by server-side JWT authentication in HTTP-only, SameSite, Secure cookies.
  - 10 Dedicated administrative management tabs:
    1. **Overview:** System status, live counters, security telemetry.
    2. **Profile:** Personal titles, tagline, contact information, bio.
    3. **Photo & Media:** Upload, replace, and preview personal photograph (`public/images/shiva-photo.jpg`).
    4. **About:** Narrative, engineering philosophy, goals, interests.
    5. **Skills:** Category-based CRUD (Programming, Frontend, AI, Tools).
    6. **Projects:** Title, description, tags, GitHub URL, live demo URL, status.
    7. **Certifications:** All 8 official credentials with IDs and verification links.
    8. **Experience:** Internships, positions, responsibilities, dates.
    9. **Education:** Institutional history, degrees, coursework.
    10. **Achievements & Settings:** Awards, recognition, and owner password updates.

### 2. Exact Facial Identity & Photography
- Includes Shiva's exact personal photograph (`public/images/shiva-photo.jpg`) placed prominently in the Hero section with a rounded-2xl glassmorphism cyber border and neon glow.
- **Zero AI face generation, reconstruction, or alteration.** Original appearance is 100% preserved.
- Direct replacement capability from the Admin Dashboard via file upload.

### 3. Rigorous Backend & Server-Side Security
- **Owner-Only Access Control:** API endpoints under `/api/admin/*` are strictly guarded by `verifyOwnerToken` middleware. Direct API requests without valid credentials receive `401 Unauthorized` or `403 Forbidden`.
- **Password Security:** Salted and hashed using `bcryptjs` (salt rounds: 12). Passwords are never stored in plain text or exposed in frontend code.
- **Session Security:** Signed JSON Web Tokens (JWT) with 7-day expiration stored in `HttpOnly`, `SameSite=Lax`, and `Secure` (in production) cookies (`sn_auth_token`).
- **Brute-Force Protection:** Rate limiting (`express-rate-limit`) limits login attempts to 5 per 15-minute window per IP.
- **Atomic Database Operations:** ACID-compliant file-based JSON store (`server/database/db.js`) uses temporary staging files and atomic renames to prevent race conditions or corrupted writes.
- **Upload Validation:** `multer` middleware with MIME-type whitelist (JPEG, PNG, WebP, PDF) and 10MB file size limits.

---

## ⚡ Performance & Hardware Optimization
Engineered specifically for smooth development and 60 FPS rendering on modern laptops and integrated graphics (such as Intel UHD Graphics 620):
- **Zero Heavy 3D / WebGL:** No Three.js, Babylon.js, or complex WebGL pipelines.
- **Hardware-Accelerated CSS:** Uses GPU transforms (`translate3d`, `will-change`) for fluid animations without thermal throttling.
- **Micro-Bundle Size:** Production gzip bundle is only ~190 kB with full TypeScript type safety.
- **Reduced-Motion Support:** Full WCAG-compliant `@media (prefers-reduced-motion: reduce)` accessibility support.
- **Completely Free:** No paid templates, no paid APIs, no subscriptions.

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

---

## 📂 Project Architecture

```
portfolio-website/
├── public/
│   ├── favicon.svg                  # Futuristic SN cyber monogram favicon
│   ├── robots.txt                   # Search crawler directives
│   ├── sitemap.xml                  # SEO XML sitemap
│   ├── images/
│   │   ├── shiva-photo.jpg          # Shiva's personal portrait
│   │   ├── project-resume-trainer.svg # AI Resume Trainer UI preview
│   │   ├── project-rythu-sarvam.svg   # Rythu Sarvam agricultural telemetry
│   │   ├── project-agrishield.svg     # AgriShield AI leaf scan mockup
│   │   └── project-portfolio.svg      # Portfolio architecture preview
│   └── resume/
│       └── Shiva_Nani_Gurrala_Resume.html # Formatted resume
├── server/
│   ├── database/
│   │   ├── db.js                    # Atomic JSON database manager
│   │   └── data.json                # Seeded persistent storage
│   ├── middleware/
│   │   └── auth.js                  # JWT cookie authentication middleware
│   ├── routes/
│   │   ├── auth.js                  # Login, logout, session check, change password
│   │   ├── portfolio.js             # Public portfolio data endpoint
│   │   └── admin.js                 # Protected section updates and file upload
│   └── server.js                    # Express 5 application entry point
├── src/
│   ├── admin/                       # Private Admin Dashboard
│   │   ├── AdminDashboard.tsx       # Tabbed dashboard layout & sidebar
│   │   ├── AdminLogin.tsx           # Glassmorphism secure sign-in UI
│   │   └── tabs/                    # 10 Management tab components
│   ├── components/
│   │   ├── ProtectedRoute.tsx       # Route guard for /admin
│   │   ├── BackgroundEffect.tsx     # Lightweight neural waves & cyber glow
│   │   ├── Badge.tsx                # Skill level badges
│   │   ├── Footer.tsx               # Brand, quick links, back to top
│   │   ├── GlassCard.tsx            # Frosted glassmorphism container
│   │   ├── Icons.tsx                # Standalone GitHub & LinkedIn SVGs
│   │   ├── Navbar.tsx               # Sticky header, scroll progress, mobile drawer
│   │   ├── ProjectModal.tsx         # Interactive project details dialog
│   │   ├── ResumeModal.tsx          # In-browser formatted resume viewer
│   │   └── Toast.tsx                # Non-intrusive notification feedback
│   ├── context/
│   │   ├── AuthContext.tsx          # Authentication state management
│   │   └── PortfolioContext.tsx     # Dynamic portfolio data state & live sync
│   ├── pages/
│   │   └── PublicPortfolio.tsx      # Public website (zero admin controls)
│   ├── sections/                    # Public section components
│   │   ├── Hero.tsx                 # Opening showcase with Shiva's photo
│   │   ├── About.tsx                # Verified bio, goals & philosophy
│   │   ├── Skills.tsx               # Interactive skill matrix
│   │   ├── Experience.tsx           # Unified Mentor internship timeline
│   │   ├── Projects.tsx             # 4 featured project showcases & filters
│   │   ├── Certifications.tsx       # All 8 verified credentials with IDs
│   │   ├── Education.tsx            # T.R.R. College & Mega City High School
│   │   └── Contact.tsx              # Validated direct dispatch form & contacts
│   ├── types/
│   │   └── portfolio.ts             # Strict TypeScript data models
│   ├── App.tsx                      # Client routes (/ and /admin/*)
│   └── main.tsx                     # React root DOM mount
├── uploads/                         # Dynamic media and documents upload storage
├── .env.example                     # Environment configuration template
├── tailwind.config.js               # Cyber colors, keyframes, glow utilities
└── package.json                     # Full-stack scripts & dependencies
```

---

## 💻 Local Setup & Execution Guide (Windows 11)

### 1. Prerequisites
- **Node.js LTS** (v18 or higher; tested on Node v26)
- **Visual Studio Code**
- **Git**

### 2. Install Dependencies
```powershell
cd "c:\Users\Admin\Documents\portfolio website"
npm install
```

### 3. Environment Configuration
Verify that `.env` exists in the root directory (copied from `.env.example` if needed):
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_EMAIL=shivananigurrala22@gmail.com
ADMIN_INITIAL_PASSWORD=ShivaNani@2026!
```

### 4. Run Development Environment (Full-Stack)
Run both the backend Express server (Port 5000) and the Vite frontend (Port 5173) concurrently:
```powershell
npm run dev
```
- **Public Portfolio:** [http://localhost:5173/](http://localhost:5173/)
- **Admin Dashboard:** [http://localhost:5173/admin](http://localhost:5173/admin)
- **Backend API:** [http://localhost:5000/api/portfolio](http://localhost:5000/api/portfolio)

### 5. Running Standalone Processes
- **Backend Server Only:**
  ```powershell
  npm run server
  ```
- **Frontend Vite Only:**
  ```powershell
  npm run client
  ```

### 6. Production Build & Execution
To build the optimized client bundle and serve everything from the Express server:
```powershell
npm run build
npm start
```
The entire application will be live on [http://localhost:5000](http://localhost:5000).

---

## 🔐 Admin Dashboard Access

1. Navigate to: `http://localhost:5173/admin` (or `/admin` on your production URL).
2. Enter your owner credentials:
   - **Email:** `shivananigurrala22@gmail.com`
   - **Password:** `ShivaNani@2026!`
3. You can change your password anytime under the **Settings** tab in the dashboard.

---

## 📜 Verified Certifications Included
All 8 official credentials are seeded and verifiable:
1. **Unleashing the Power of AI Agents** — IBM (Sep 2026, ID: `ALM-COURSE_3825456`)
2. **Exploring Artificial Intelligence** — IBM (Oct 2026, ID: `ALM-COURSE_3825247`)
3. **Academy Accreditation - Generative AI Fundamentals** — Databricks (Oct 2026, ID: `196420037`)
4. **Learning Microsoft 365 Copilot for Work (2024)** — LinkedIn (Oct 2026)
5. **Kubernetes for Absolute Beginners** — KodeKloud (Oct 2026, ID: `ba785e2e-ccae-4a0d-9081-f554738c4c07`)
6. **Linux For Absolute Beginners** — KodeKloud (Oct 2026, ID: `939ddb22-82b8-49c1-a0e8-b1a728879fbe`)
7. **GitHub Basics** — Simplilearn (Oct 2026, ID: `10924391`)
8. **Get started with Microsoft Teams for Education** — Microsoft (Oct 2026)

---

## 👤 Author & Contact
- **Name:** Shiva Nani Gurrala
- **Email:** [shivananigurrala22@gmail.com](mailto:shivananigurrala22@gmail.com)
- **LinkedIn:** [linkedin.com/in/shiva-nani-gurrala-619026392](https://www.linkedin.com/in/shiva-nani-gurrala-619026392/)
- **GitHub:** [github.com/Shiva24040](https://github.com/Shiva24040)
- **Location:** Telangana, India
