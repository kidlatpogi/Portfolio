# Portfolio Technical Documentation
**Author:** Zeus Angelo Bautista  
**Role:** IT Developer & AI Engineer  
**Repository:** [github.com/kidlatpogi/Portfolio](https://github.com/kidlatpogi/Portfolio)  
**Version:** 1.1.0  
**Last Updated:** August 2026

---

## 1. Executive Summary & Architecture

This repository contains the official portfolio website of **Zeus Angelo Bautista**. Built with high-performance modern web standards, it leverages **Astro (SSR mode via `@astrojs/cloudflare`)**, **React 19**, **Tailwind CSS**, and **Cloudflare Workers AI**.

### Core Architecture Highlights:
- **Framework:** Astro 5/6 with Server-Side Rendering (SSR) adapter for Cloudflare Pages/Workers.
- **Frontend Islands:** React 19 interactive components hydrated using Astro client directives (`client:load`, `client:visible`, `client:only="react"`).
- **Design System:** High-contrast editorial layout utilizing custom typography (`Clash Display`, `Array`, `Geist Mono`), custom canvas background simulations (`ShapeGrid`), and the signature **"Future Developer" accent color (`#C44900`)**.
- **Interactive Showcase Runways:** Pinned horizontal scrolling powered by GSAP ScrollTrigger for rich multi-card showcases (`Projects`, `Designs`, `Certifications`), paired with fluid natural scrolling for narrative sections (`About`, `Skills`, `Experience`) and section dividers (`ParallaxTextSection`, `GithubHeatmap`).
- **AI Portfolio Assistant:** Full-screen interactive modal powered by Cloudflare Workers AI (`@cf/meta/llama-3.2-3b-instruct`), protected with client/server prompt-injection shields, client-side permissionless telemetry defense, profanity/NSFW interceptors, thinking indicator, and typewriter streaming effect.
- **Interactive Typing Test:** Fullscreen speed-typing modal featuring 100 rotated software engineering quotes, real-time WPM/accuracy tracking, interactive virtual keyboard lighting, and Web Audio API synthesized mechanical keyboard switch sounds (Thock, Clicky, Linear, Tactile).
- **Data Centralization:** Single-source-of-truth knowledge base (`src/data/portfolioData.ts`) providing scalable synchronized data for both the website UI and the AI assistant.

---

## 2. Technology Stack & Key Dependencies

| Category | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Meta-Framework** | [Astro](https://astro.build/) | SSR page rendering, asset bundling, and component islands architecture |
| **UI Framework** | [React 19](https://react.dev/) | Dynamic UI components, modal overlays, and interactive canvas physics |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Modern utility-first CSS styling and responsive layout rules |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) | Micro-interactions, ScrollTrigger horizontal pinned runways, and modal transitions |
| **Audio Engine** | Web Audio API | Zero-latency synthetic mechanical switch sound generator |
| **Smooth Scroll** | [@studio-freight/lenis](https://github.com/darkroomengineering/lenis) | Momentum-based smooth page scrolling |
| **AI Runtime** | [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) | Serverless Llama 3.2 3B LLM inference on the Cloudflare Edge |
| **Icons** | [Lucide React](https://lucide.dev/) | Minimalist UI vector icons |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com/) | Global edge distribution, asset CDN, and serverless functions |

---

## 3. Directory Structure

```
Portfolio/
├── public/
│   ├── Badges/                  # Local badge artwork
│   ├── Certifications/          # Local certificate assets and fallbacks
│   ├── Common/                  # Profile pictures and shared images
│   ├── Projects/                # Project preview screenshots
│   ├── Zeus_Angelo_Bautista_Resume.pdf  # Official resume
│   └── robots.txt               # Industry-standard crawler rules
├── src/
│   ├── assets/
│   │   ├── fonts/               # Custom font definitions (Clash Display, Array)
│   │   └── background.svg       # Geometric background textures
│   ├── components/
│   │   ├── About.tsx            # Kaizen in IT philosophy, BSIT-MWA bio, and bento cards
│   │   ├── CardNav.tsx          # Sticky top navigation bar
│   │   ├── Certifications.tsx   # Verified certs horizontal scroll & 100vh Badges showcase
│   │   ├── ChatBot.tsx          # Full-screen immersive AI assistant & bottom-left triggers
│   │   ├── ConnectModal.tsx     # Contact & inquiry modal
│   │   ├── Designs.tsx          # UI/UX design horizontal pinned runway
│   │   ├── Experience.tsx       # Standard ATS-formatted timeline of municipal & school work
│   │   ├── Footer.tsx           # Minimalist single-screen footer with GETINTOUCH watermark
│   │   ├── GithubHeatmap.tsx    # Live commit & study heatmap (divider section)
│   │   ├── Hero.tsx             # Hero section with interactive portrait and role badges
│   │   ├── ParallaxTextSection.tsx # Infinite marquee typography divider
│   │   ├── Projects.tsx         # Pinned horizontal featured work showcase cards
│   │   ├── ResumePreviewModal.tsx  # Interactive in-app PDF resume viewer
│   │   ├── ScrollReveal.tsx     # Viewport scroll entrance effects
│   │   ├── ScrollStack.tsx      # Smooth stack container
│   │   ├── ShapeGrid.tsx        # High-performance HTML5 Canvas grid animation
│   │   ├── Skills.tsx           # Filterable technology matrix bento grid
│   │   ├── SocialsSidebar.tsx   # Floating right-side quick navigation
│   │   ├── TargetCursor.tsx     # Custom animated cursor
│   │   └── TypingTest.tsx       # Interactive Speed Typing Test overlay
│   ├── data/
│   │   ├── portfolioData.ts     # Single source of truth for all projects, skills, and certs
│   │   └── typingSentences.ts   # 100 curated quotes and engineering sentences
│   ├── utils/
│   │   ├── keyboardAudio.ts     # Web Audio API mechanical switch acoustics generator
│   │   └── telemetry.ts         # Permissionless client environment inspection
│   ├── layouts/
│   │   └── Layout.astro         # Base HTML shell with SEO meta and font loader
│   ├── pages/
│   │   ├── api/
│   │   │   └── chat.ts          # Edge API route handling Cloudflare AI inference & guards
│   │   ├── 404.astro            # Custom 404 error page
│   │   ├── index.astro          # Main single-page portfolio view
│   │   └── projects.astro       # Full project archive directory
│   └── styles/
│       └── global.css           # Tailwind base styles, font-face rules, and keyframes
├── wrangler.jsonc               # Cloudflare Pages/Workers binding configuration
├── astro.config.mjs             # Astro build & Cloudflare adapter configuration
├── package.json                 # Dependencies and npm scripts
└── Documentation.md             # Complete system documentation
```

---

## 4. Single Source of Truth Data Architecture (`src/data/portfolioData.ts`)

To prevent discrepancies between the website's static cards and the AI assistant's answers, all data is centrally defined in `src/data/portfolioData.ts`.

### Data Models:
1. **`profile`**:
   - Full name: **Zeus Angelo Bautista**
   - Role: **IT Developer & AI Engineer**
   - Education: **Bachelor of Science in Information Technology Major in Mobile and Web Applications (BSIT-MWA, 4th Year)**
   - Institution: **National University Dasmariñas**
   - Location: **Silang, Cavite, Philippines**
   - Philosophy: **Kaizen in IT** (Continuous compounding self-improvement, pattern mastery, and code modernization).
2. **`experiences`**:
   - *IT Helper (Freelance)* at *Municipality of Silang, Cavite* (Civil registry & population birth records digitalization).
   - *Registrar Assistant (OJT)* at *Bulihan Integrated National High School* (Student records and cloud archival).
3. **`techStack`**: Categorized frontend, backend, database, AI/vision, and developer tools.
4. **`projects`**: All 8 projects with descriptions, years, tech stacks, bullet points, live URLs, and GitHub links:
   - *TalkTics / Bigkas Capstone* (2025)
   - *L.I.N.N.Y* (2024/2025)
   - *SafeLink Mobile* (2024/2025)
   - *Calendar Widget* (2024)
   - *MyPC E-Commerce Shop* (2024)
   - *Gnosis* (2024)
   - *Web Tools* (2024)
   - *Room Reservation System* (2024)
5. **`certifications`**: All 12 verified certifications and badges from Cisco Networking Academy, IT Specialist (Certiport), IBM SkillsBuild, Simplilearn SkillUp, Google Cloud Skills Boost, and FreeCodeCamp.
6. **`contact`**: Emails, LinkedIn, GitHub, and Resume path.

---

## 5. Section Design & User Experience Highlights

### 1. About (`About.tsx`)
- **ScrollReveal Narrative:** Immersive word-by-word reveal formatted with clean left-aligned typography, inline profile thumbnail, CPU pulse icon, and pattern recognition sparkles.
- **Bento Overview:**
  - **Philosophy (Kaizen in IT):** Continuous self-improvement applied to software engineering, codebase refinement, and architecture modernization.
  - **Background:** Pursuing a Bachelor of Science in Information Technology Major in Mobile and Web Applications (BSIT-MWA) at National University Dasmariñas.
  - **Key Accomplishments:** Highlights `12+` Verified Badges & Certifications and `8+` Featured Projects Built.

### 2. Skills (`Skills.tsx`)
- **Filterable Category Tabs:** Real-time filter pills (`All`, `Frontend`, `Backend & DB`, `Tools & DevOps`).
- **Interactive Cards:** Hover elevation with smooth logo scaling and bottom accent highlight banner displaying relevant projects.

### 3. Experience (`Experience.tsx`)
- **Standard ATS Format:** Clean resume-ready layout with distinct role title, organization, dates, location, and action-oriented bullet points.
- **Vertical Timeline Indicator:** Sleek accent gradient trace and glowing marker nodes.

### 4. Natural Section Dividers (`ParallaxTextSection.tsx` & `GithubHeatmap.tsx`)
- **Parallax Text Marquee:** Slim horizontal typography divider bridging Hero and About.
- **Contributions Heatmap:** Natural-height GitHub commit activity visualization bridging Designs and Certifications.

### 5. Pinned Showcases (`Projects.tsx`, `Designs.tsx`, `Certifications.tsx`)
- **Projects:** Pinned horizontal scroll stack displaying featured software applications.
- **Designs:** Horizontal scrolling runway with modal preview.
- **Certifications & Badges:** GSAP pinned dual-row certificate scroll alongside a dedicated 100vh Badges showcase.

---

## 6. AI Assistant & Edge API Integration (`ChatBot.tsx` & `api/chat.ts`)

### 1. Immersive Full-Screen UI/UX
- **Overlay:** High-blur frosted backdrop (`backdrop-blur-2xl bg-[#f8f8f8]/85`) creating a distraction-free conversational canvas.
- **Minimalist Prompt:** Features `"what do you want to ask?"` in `font-clash-semibold` with an auto-focused borderless input line.
- **Simulated Thinking & Typewriter Output:**
  - Includes a brief thinking state (`Thinking...`) followed by smooth typewriter text streaming.
- **Scrollbar-Free Clean Feed:** Custom CSS rules (`scrollbar-none [&::-webkit-scrollbar]:hidden`) ensure smooth vertical scrolling without distracting native scrollbars.

### 2. Multi-Tier Security & Anti-Abuse System
- **Zero Token Waste Guard (Client & Server):** Detects profanities, curse words, adult domains, NSFW keywords, and keyboard mashing before sending requests.
- **Prompt Injection Shield & Client Telemetry Defense:** Blocks attempts to leak system instructions, API keys, or switch personas. When triggered, the assistant utilizes permissionless browser inspection (`deviceMemory`, `hardwareConcurrency`, `screen resolution`, `timezone`, `user agent`, `network info`) to return an informative deterrent response directly without consuming Worker AI inference tokens.
- **Persistent 30-Second Cooldown:** Stored in `localStorage` (`zeus_chatbot_cooldown_expiry`).

---

## 7. Interactive Speed Typing Test (`TypingTest.tsx` & `keyboardAudio.ts`)

- **Rotation Pool:** Random selection from 100 curated software engineering and computing quotes (`src/data/typingSentences.ts`).
- **Live Performance Telemetry:** Real-time calculation of Gross WPM, Accuracy (%), and Elapsed Time (s).
- **Visual Feedback:** Character-level accuracy coloring (black for correct, soft red background for errors) with an active `#C44900` vertical cursor bar.
- **Virtual Keyboard Visualizer:** Highlighting on active keydown for QWERTY rows and spacebar.
- **Synthetic Mechanical Switch Audio Engine (`keyboardAudio.ts`):**
  - Powered by native browser Web Audio API (zero audio file downloads).
  - Selectable sound profiles:
    1. **Thock:** Deep, creamy low-pass acoustic resonance.
    2. **Clicky:** Sharp dual-peak metallic click.
    3. **Linear:** Smooth, dampened soft clack.
    4. **Tactile:** Medium frequency tactile bump.
    5. **Mute:** Silent mode.

---

## 8. Floating Action Stack (Bottom-Left)

Both quick-action triggers are positioned at `fixed bottom-6 left-6 z-50`:
1. **Top Button:** `Typing Test` (Keyboard Icon $\rightarrow$ reveals label on hover).
2. **Bottom Button:** `Ask AI` (Bot Icon $\rightarrow$ reveals label on hover).
Both buttons smoothly expand on hover and collapse to compact round icons when unhovered.

---

## 9. Build, Scripts & Deployment

### NPM Scripts:
- `npm run dev`: Starts the local Astro development server at `http://localhost:4321`.
- `npm run build`: Compiles SSR entrypoints, client assets, and static pages into `dist/`.
- `npm run preview`: Previews the production build locally.
