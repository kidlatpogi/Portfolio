# Portfolio Project Overview
**Developer:** Zeus Angelo Vargas Bautista
**Current Status:** 4th-year BSIT student 
**Objective:** A high-performance, animation-rich personal portfolio to secure OJT/internships and showcase software development, AI, and cross-platform projects.

## Core Technology Stack
- **Framework:** Astro (Static Site Generation)
- **UI Library:** React.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Forms:** EmailJS
- **Hosting/Deployment:** Cloudflare Pages
- **Asset Storage:** Cloudflare R2 (Object Storage for images/media)

## Design & Performance Guidelines
- **Speed First:** The site must load instantly. Utilize Astro's "Islands Architecture" (`client:visible`, `client:load`) strictly only where interactivity is required.
- **Animations:** Implement smooth, performant parallax effects and scroll-triggered transitions using Framer Motion's `useScroll` and `useTransform`. Avoid heavy, laggy JavaScript scroll-event listeners.
- **Downtime:** Zero backend dependencies. The architecture relies entirely on Cloudflare's Edge caching for 100% uptime.

## AI Assistant Rules
1. **No generic CSS:** Use Tailwind CSS for all styling. 
2. **Type Safety:** Enforce strict TypeScript interfaces for all component props.
3. **Astro Integration:** Write components in `.tsx` and embed them in `.astro` files with appropriate client directives.
4. **Motion:** Keep Framer Motion variants clean and reusable. Do not over-animate; prioritize fluid, professional transitions.
5. **Typography & Color Design System:** Adhere strictly to the brutalist minimalist styling:
    * **Hero/Giant Titles (H1):** Inter, Extra Bold (800), pure black (`#000000`).
    * **Section Titles (H2):** Inter, Semi-Bold (600), pure black (`#000000`).
    * **Sub-headings (H3):** Inter, Medium (500), Thundercloud Slate (`#C44900`).
    * **Body Text (p):** Inter, Regular (400), Thundercloud Slate (`#C44900`), line-height 1.6 to 1.8.
    * **Metadata, Tech Tags, Labels:** Roboto Mono, Medium (500), uppercase, small size (e.g., 12px-14px).
    * **Buttons & Navigation Links:** Roboto Mono, Semi-Bold (600).
    * **Background:** Off-white (e.g., `#F9F9F9`).
    * **Primary Accent:** Cardinal Red (`#C44900`) — hero highlight lines, profile name, accent text, selection highlights, and `--color-accent` token.
    * **Interactions:** NO box-shadows, text-glows, or outer glows for interactive states. Rely entirely on flat color swaps and crisp borders. (Profile photo glow is an explicit hero exception.)
    * **Buttons:** Solid Black (`#000000`) background, Off-White text, no borders. Hover/Active: No background color swap / remains flat black.
    * **Input Fields & Textareas:** Off-white background, faint gray border (`#E5E7EB`), black text. Focus: Strip browser outlines/glows, apply sharp solid 2px border of `#C44900`.
    * **Tech Stack Badges:** Transparent or Off-white background. Text and 1px solid border must be `#C44900`.
