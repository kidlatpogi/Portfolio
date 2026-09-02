<div align="center">

# Zeus Angelo Bautista — Engineering Portfolio
### Modern Editorial Web Application & Edge AI Assistant

A high-performance, design-centric personal portfolio built on modern web standards, featuring Server-Side Rendering on Cloudflare Edge, React 19 interactive component islands, GSAP horizontal pinned runways, and an integrated Cloudflare Workers AI portfolio assistant.

[![Astro](https://img.shields.io/badge/Astro-5.0-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Edge_SSR-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Cloudflare Workers AI](https://img.shields.io/badge/Workers_AI-Llama_3.1_8B-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/workers-ai/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## Table of Contents
- [Executive Summary](#executive-summary)
- [System Architecture](#system-architecture)
- [Key Features & Engineering Highlights](#key-features--engineering-highlights)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Local Development Setup](#local-development-setup)
- [Edge Deployment & Cloudflare Bindings](#edge-deployment--cloudflare-bindings)
- [Performance & Security Engineering](#performance--security-engineering)
- [License](#license)

---

## Executive Summary

This repository houses the production source code for the personal portfolio of **Zeus Angelo Bautista** (IT Developer & AI Engineer). The application is engineered with an emphasis on visual craftsmanship, extreme low-latency performance, and resilient serverless AI capabilities.

Rejecting standard static templates, this application merges an editorial typography hierarchy with high-framerate interactive graphics, a persistent Web Audio API mechanical keyboard sound synthesizer, and a zero-latency conversational AI edge route directly tied to a centralized portfolio knowledge base.

---

## System Architecture

The application adopts an **Islands Architecture** pattern powered by Astro SSR and Cloudflare Pages:

```
                                  +-------------------------------------------------+
                                  |            Cloudflare Edge Network              |
                                  |  (Global CDN + Serverless SSR Compute Layer)    |
                                  +-------------------------------------------------+
                                         /                                   \
                                        /                                     \
               +----------------------------------+          +----------------------------------+
               |     Static / SSR HTML Shell      |          |    Edge API Routes (/api/chat)   |
               | (Astro Layout, Metadata, Fonts)  |          | (Cloudflare Workers AI Inference)|
               +----------------------------------+          +----------------------------------+
                                        |                                     |
               +----------------------------------+          +----------------------------------+
               |     Hydrated React 19 Islands    |          |   Workers AI Llama 3.1 8B LLM    |
               | (client:load / client:visible)   |          |  Protected by Prompt Injection   |
               |                                  |          |  Guards & Rate-Limiting Defenses |
               | - ScrollStack Featured Runway    |          +----------------------------------+
               | - Fullscreen ChatBot Assistant   |
               | - Interactive Typing Test Suite  |
               | - Filterable Skills Bento Grid   |
               | - HTML5 Canvas ShapeGrid Shader  |
               +----------------------------------+
```

### Architectural Principles:
1. **Zero Unnecessary JavaScript**: Core layouts, static pages, and typography render server-side as pure HTML/CSS.
2. **Selective Hydration**: Heavy interactive modules (`ChatBot`, `TypingTest`, `Projects`, `Skills`) hydrate independently upon viewport intersection (`client:visible`) or user engagement (`client:idle`).
3. **Edge-Native Inference**: AI chatbot runs on the edge via Cloudflare Workers AI bindings without third-party API proxy latency or exposing secret keys client-side.

---

## Key Features & Engineering Highlights

### 1. Interactive Featured Work Runway (`Projects.tsx`)
- **Pinned ScrollStack Mechanics**: Utilizes GSAP ScrollTrigger and custom sticky rail calculations to stack cards smoothly as the user scrolls.
- **Multi-Asset Carousel Engine**: Supports multiple high-resolution screenshot slides and animated GIFs per project card with cyclical previous/next navigation controls and index indicators.
- **Failover Asset Pipeline**: Built-in `onError` fallback chains guarantee high-availability rendering of project previews.
- **Dynamic Platform Actions**: Context-aware CTAs automatically switch between live website links, web directory exploration, and direct Windows executable release downloads.

### 2. Edge-Native AI Assistant (`ChatBot.tsx` & `/api/chat.ts`)
- **Model Backbone**: Powered by `@cf/meta/llama-3.1-8b-instruct` running directly inside Cloudflare Workers AI edge environment.
- **Single Source of Truth Knowledge Base**: Synchronized directly with `ChatBot.txt` and `portfolioData.ts`.
- **Security & Prompt Defense**: Multi-stage server-side guardrails intercepting jailbreaks, unauthorized system prompt extraction, profanity, and out-of-scope roleplay requests.
- **User Experience**: Fullscreen immersive glassmorphic interface, dynamic thinking states, typewriter streaming effect, quick prompt suggestions, and automatic retry handling.

### 3. Interactive Mechanical Speed Typing Suite (`TypingTest.tsx`)
- **Acoustic Synthesis Engine**: Real-time Web Audio API sound generator synthesizing physical mechanical switch acoustic profiles (Thock, Clicky, Linear, Tactile) with sub-5ms latency.
- **Curated Quote Library**: 100 rotated software engineering axioms, computing history quotes, and philosophy passages (`typingSentences.ts`).
- **Telemetry & Metrics**: Real-time Words Per Minute (WPM), character accuracy percentage, visual error tagging, and dynamic virtual keyboard key-illumination.

### 4. Categorized Skills Arsenal (`Skills.tsx`)
- **25 Industry-Standard Technologies**: Filterable across *Frontend & Mobile*, *Backend & Databases*, and *Tools & DevOps*.
- **Vector Devicon CDN Integration**: High-definition, standardized SVGs with CSS filter transitions and responsive grid layouts.

### 5. High-Visibility Seasonal Canvas (`SeasonalEffects.tsx`)
- **Delta-Time Normalized Physics**: Snowflake particle simulation calculated using `performance.now()` delta times, eliminating acceleration artifacts during alt-tabbing or tab switching.
- **Automatic Lifecycle Management**: Automatically suspends `requestAnimationFrame` loops on `visibilitychange` (`document.hidden`) to conserve battery and GPU cycles.

---

## Technology Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Meta-Framework** | [Astro 5](https://astro.build/) | Islands architecture, static prerendering, and serverless edge SSR |
| **UI Framework** | [React 19](https://react.dev/) | Dynamic client-side components and modal engines |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Modern CSS engine and utility classes |
| **Animation** | [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/) | Pinned scroll timelines, smooth stacking, and micro-interactions |
| **Smooth Scrolling** | [Lenis](https://github.com/darkroomengineering/lenis) | Hardware-accelerated momentum scroll |
| **Edge AI Runtime** | [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) | Edge LLM inference using Llama 3.1 8B Instruct |
| **Audio Engine** | Web Audio API | Zero-dependency synthesized acoustic feedback |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com/) | Edge serverless hosting, CDN caching, and custom domain routing |

---

## Repository Structure

```
Portfolio/
├── public/
│   ├── Badges/                     # Verified industry achievement badges
│   ├── Certifications/             # Certificate previews and fallback documents
│   ├── Common/                     # Shared static image assets
│   ├── Projects/                   # Project visual fallbacks
│   ├── Zeus_Angelo_Bautista_Resume.pdf # Downloadable resume document
│   └── robots.txt                  # Search engine crawl directives
├── src/
│   ├── assets/                     # Custom typography (Clash Display, Array)
│   ├── components/
│   │   ├── About.tsx               # Kaizen philosophy, bio, and credentials
│   │   ├── CardNav.tsx             # Responsive sticky navigation bar
│   │   ├── Certifications.tsx      # Verified certifications and badge runway
│   │   ├── ChatBot.tsx             # Fullscreen AI assistant modal
│   │   ├── ConnectModal.tsx        # Direct contact and communication modal
│   │   ├── Designs.tsx             # UI/UX engineering runway
│   │   ├── Experience.tsx          # Professional career timeline
│   │   ├── Footer.tsx              # Minimalist footer component
│   │   ├── GithubHeatmap.tsx       # Live commit and study activity visualizer
│   │   ├── Hero.tsx                # Hero banner with dynamic role tags
│   │   ├── Projects.tsx            # Featured Work ScrollStack with multi-asset carousels
│   │   ├── ResumePreviewModal.tsx  # Interactive PDF preview modal
│   │   ├── ScrollReveal.tsx        # Scroll-triggered viewport entrance animations
│   │   ├── ScrollStack.tsx         # Layered card physics container
│   │   ├── SeasonalEffects.tsx     # High-visibility seasonal canvas effect
│   │   ├── ShapeGrid.tsx           # Interactive HTML5 Canvas geometric grid
│   │   ├── Skills.tsx              # Filterable 25-tech skills bento grid
│   │   ├── SocialsSidebar.tsx      # Floating quick-access navigation rail
│   │   ├── TargetCursor.tsx        # Custom hardware-accelerated animated cursor
│   │   └── TypingTest.tsx          # Speed typing suite with mechanical switch audio
│   ├── data/
│   │   ├── ChatBot.txt             # Primary AI assistant instruction knowledge base
│   │   ├── portfolioData.ts        # Centralized data store for projects, skills, and certs
│   │   └── typingSentences.ts      # 100 software engineering typing passages
│   ├── layouts/
│   │   └── Layout.astro            # Base document layout with SEO and meta headers
│   ├── pages/
│   │   ├── api/
│   │   │   └── chat.ts             # Cloudflare Workers AI edge endpoint with security filters
│   │   ├── 404.astro               # Custom error page
│   │   ├── index.astro             # Primary portfolio single-page application
│   │   └── projects.astro          # Comprehensive projects archive directory
│   ├── styles/
│   │   └── global.css              # Font definitions, theme variables, and keyframe animations
│   └── utils/
│       ├── keyboardAudio.ts        # Web Audio API mechanical sound synthesis
│       └── seasonal.ts             # Holiday and seasonal schedule boundary utilities
├── astro.config.mjs                # Astro configuration and Cloudflare adapter bindings
├── wrangler.jsonc                  # Cloudflare Pages / Workers AI configuration
├── package.json                    # Dependencies and automation scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

---

## Local Development Setup

### Prerequisites
- **Node.js**: `v18.17.0` or higher (Node.js 20+ recommended)
- **Package Manager**: `npm` (v9+) or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kidlatpogi/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional for local mock AI):
   Create a `.env` file in the project root:
   ```env
   # Cloudflare Workers AI credentials (optional in local dev mode)
   CF_ACCOUNT_ID=your_cloudflare_account_id
   CF_AI_API_TOKEN=your_cloudflare_ai_token
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

5. Validate production build:
   ```bash
   npm run build
   ```

6. Preview Cloudflare Pages locally:
   ```bash
   npm run preview
   ```

---

## Edge Deployment & Cloudflare Bindings

This application is optimized for deployment on **Cloudflare Pages** using the `@astrojs/cloudflare` adapter in SSR mode.

### Wrangler Configuration (`wrangler.jsonc`)
```jsonc
{
  "name": "portfolio",
  "compatibility_date": "2024-09-23",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "dist",
  "ai": {
    "binding": "AI"
  }
}
```

### Production Build Command
```bash
npm run build
```
Output directory: `dist/`

---

## Performance & Security Engineering

- **Lighthouse Performance Score**: Target 95-100 across Performance, Accessibility, Best Practices, and SEO.
- **Resource Hints & Asset Preloading**: Critical fonts (`Clash Display`, `Array`, `Geist Mono`) preloaded with `font-display: swap` to prevent Layout Shifts (CLS).
- **Prompt Injection Defense**: Multi-tier sanitization in `/api/chat.ts` preventing system instruction leakage and unauthorized role manipulation.
- **GPU-Accelerated Transitions**: All hover and scroll animations leverage CSS transforms and opacity to avoid costly layout reflows.

---

## License

Distributed under the **MIT License**. See `LICENSE` for further details.

---

<div align="center">
  <sub>Engineered by Zeus Angelo Bautista. Built with Astro, React 19, and Cloudflare Workers AI.</sub>
</div>
