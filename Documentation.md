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
- **AI Portfolio Assistant:** Full-screen interactive modal powered by Cloudflare Workers AI (`@cf/meta/llama-3.2-3b-instruct`), protected with client/server prompt-injection shields, profanity/NSFW interceptors, and a 30-second persistent cooldown.
- **Data Centralization:** Single-source-of-truth knowledge base (`src/data/portfolioData.ts`) providing scalable synchronized data for both the website UI and the AI assistant.

---

## 2. Technology Stack & Key Dependencies

| Category | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Meta-Framework** | [Astro](https://astro.build/) | SSR page rendering, asset bundling, and component islands architecture |
| **UI Framework** | [React 19](https://react.dev/) | Dynamic UI components, modal overlays, and interactive canvas physics |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Modern utility-first CSS styling and responsive layout rules |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) | Micro-interactions, ScrollTrigger animations, and modal state transitions |
| **Smooth Scroll** | [@studio-freight/lenis](https://github.com/darkroomengineering/lenis) | Momentum-based smooth page scrolling |
| **AI Runtime** | [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) | Serverless Llama 3.2 3B LLM inference on the Cloudflare Edge |
| **Icons** | [Lucide React](https://lucide.dev/) | Minimalist UI vector icons |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com/) | Global edge distribution, asset CDN, and worker functions |

---

## 3. Directory Structure

```
Portfolio/
├── public/
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
│   │   ├── About.tsx            # Philosophy & bio section
│   │   ├── CardNav.tsx          # Sticky top navigation bar
│   │   ├── Certifications.tsx   # Verified badges showcase with GSAP ScrollTrigger
│   │   ├── ChatBot.tsx          # Full-screen immersive AI assistant overlay
│   │   ├── ConnectModal.tsx     # Contact & inquiry modal
│   │   ├── Designs.tsx          # UI/UX design previews
│   │   ├── Experience.tsx       # Timeline of professional work and OJT
│   │   ├── Footer.tsx           # Site footer & social links
│   │   ├── GithubHeatmap.tsx    # Live commit & study heatmap visualizations
│   │   ├── Hero.tsx             # Hero section with interactive portrait and role badges
│   │   ├── ParallaxTextSection.tsx # Infinite marquee typography banner
│   │   ├── Projects.tsx         # Featured work showcase cards
│   │   ├── ResumePreviewModal.tsx  # Interactive in-app PDF resume viewer
│   │   ├── ScrollReveal.tsx     # Viewport scroll entrance effects
│   │   ├── ScrollStack.tsx      # Smooth stack container
│   │   ├── ShapeGrid.tsx        # High-performance HTML5 Canvas grid animation
│   │   ├── Skills.tsx           # Technology stack marquee badges
│   │   ├── SocialsSidebar.tsx   # Floating left-side navigation & quick actions
│   │   └── TargetCursor.tsx     # Custom animated cursor
│   ├── data/
│   │   └── portfolioData.ts     # Single source of truth for all projects, skills, and certs
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
1. **`profile`**: Full name, 4th-Year BSIT education at National University, and the concise **Professional Summary**.
2. **`experiences`**: Current role at *Municipality of Silang, Cavite* (Birth records digitalization) and archive role at *Bulihan INHS* (Student archives).
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
5. **`certifications`**: All 12 verified certifications and badges from Cisco, IT Specialist (Certiport), IBM, Simplilearn, Google Cloud, and FreeCodeCamp.
6. **`contact`**: Emails, LinkedIn, GitHub, and Resume path.

### Dynamic Generation:
The helper `generateKnowledgeResponses()` transforms the raw structured objects into clean, ATS-formatted markdown sections dynamically utilized by both `api/chat.ts` and UI fallbacks.

---

## 5. AI Assistant & Edge API Integration (`ChatBot.tsx` & `api/chat.ts`)

### 1. Immersive Full-Screen UI/UX
- **Overlay:** High-blur frosted backdrop (`backdrop-blur-2xl bg-[#f8f8f8]/85`) that creates an immersive, clean conversational canvas.
- **Minimalist Prompt:** Features the signature headline `"what do you want to ask?"` in `font-clash-semibold` with an auto-focused borderless input line.
- **Controls:** Fast dismiss via `ESC` key, top-right close button, or background click.
- **Scrollbar-Free Clean Feed:** Custom CSS rules (`scrollbar-none [&::-webkit-scrollbar]:hidden`) ensure smooth vertical scrolling without distracting native scrollbars on both desktop and mobile.

### 2. Multi-Tier Security & Anti-Abuse System
To protect Cloudflare AI quota and maintain a professional context:
- **Zero Token Waste Guard (Client & Server):**
  - Detects profanities, curse words, Tagalog slurs, adult domains (`pornhub`, `xvideos`, `onlyfans`, etc.), NSFW keywords, and keyboard mashing before sending network requests.
  - Returns a respectful warning message and triggers cooldown without invoking the AI model.
- **Prompt Injection & System Extraction Shield:**
  - Blocks requests attempting to reveal system instructions, extract `.env` keys, alter bot personas (e.g. DAN mode), or execute unauthorized commands.
- **Persistent 30-Second Cooldown:**
  - Stored in browser `localStorage` (`zeus_chatbot_cooldown_expiry`) so page reloads or restarts cannot bypass the rate limit.

### 3. Edge Inference Parameters
- **Runtime:** `cloudflare:workers` with `@astrojs/cloudflare`.
- **Model:** `@cf/meta/llama-3.2-3b-instruct`.
- **Token Budget:** `max_tokens: 2048` (guaranteeing comprehensive project and certificate overviews without mid-sentence truncations).
- **Strict Formatting Rules:** Zero emojis, pure ATS-structured bullet points, bold labels, and `#C44900` accent links.

---

## 6. Design System & Theming

- **Accent Color:** `#C44900` (Signature **"Future Developer"** warm terracotta orange).
- **Light Base:** `#FAFAFA` / `#F8F8F8` with subtle zinc borders (`#334155/20`).
- **Dark Elements:** High-contrast `#000000` buttons, headers, and navigation chips.
- **Typography:**
  - Headings: `font-clash-semibold`, `font-clash-bold` (Clash Display).
  - Secondary Accents: `font-array-semibold` (Array).
  - Body: Modern geometric Sans-serif (`Inter`, `Geist Sans`).
  - Code & Badges: `font-mono` (`Geist Mono`, `Courier New`).

---

## 7. Build, Scripts & Deployment

### NPM Scripts:
- `npm run dev`: Starts the local Astro development server at `http://localhost:4321`.
- `npm run build`: Compiles SSR entrypoints, client assets, and static pages into `dist/`.
- `npm run preview`: Previews the production build locally.

### Cloudflare Deployment:
- Connected to Cloudflare Pages via GitHub repository tracking.
- `wrangler.jsonc` configures the binding `"binding": "AI"` for Cloudflare Workers AI.
- `public/robots.txt` ensures search engine crawlers index public routes while disallowing `/api/`.

---

## 8. Maintainer Guidelines for Future Updates

1. **Adding New Projects or Certifications:**
   - Add new entries directly into `src/data/portfolioData.ts`.
   - The AI Assistant and data endpoints will automatically update without any changes to backend APIs.
2. **Styling Rules:**
   - Always respect the `#C44900` accent color and ensure high contrast between text and card backgrounds.
   - Maintain the zero-emoji rule across AI outputs and official ATS components.