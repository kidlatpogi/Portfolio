export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  isFeatured: boolean;
  category?: string;
  overview: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  isCurrent: boolean;
  responsibilities: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  badgePlatform?: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    fullName: "Zeus Angelo Bautista",
    role: "IT Developer & AI Engineer",
    education: "Bachelor of Science in Information Technology (BSIT, 4th Year)",
    institution: "National University (NU)",
    location: "Silang, Cavite, Philippines",
    // Only Professional Summary for About
    professionalSummary: "Zeus Angelo Bautista is a results-driven IT Developer and AI Engineer with a strong aptitude for pattern recognition, rapid technology adoption, and full-stack software architecture. He specializes in designing responsive web applications, cross-platform mobile solutions, and intelligent AI-integrated systems that solve practical, real-world problems."
  },

  // Current Experience (and historical archive)
  experiences: [
    {
      role: "IT Helper (Freelance)",
      company: "Municipality of Silang, Cavite",
      period: "December 2024 – January 2025",
      location: "Bulihan, Silang, Cavite",
      isCurrent: true,
      responsibilities: [
        "Digitalized historical population and civil registry birth records, converting physical handwritten entries into a structured, searchable electronic database.",
        "Implemented data validation protocols to ensure record accuracy and integrity during database ingestion.",
        "Reduced document search and retrieval times for municipal administrative personnel."
      ]
    },
    {
      role: "Registrar Assistant (OJT)",
      company: "Bulihan Integrated National High School",
      period: "April 2023",
      location: "Bulihan, Silang, Cavite",
      isCurrent: false,
      responsibilities: [
        "Digitalized student cumulative records and academic archives into structured digital files.",
        "Uploaded and organized digitized records on the Registrar Office cloud storage infrastructure for instant multi-user administrative access."
      ]
    }
  ] as ExperienceItem[],

  // Current Tech Stack & Categorized Skills
  techStack: {
    frontend: ["JavaScript (ES6+)", "TypeScript", "React.js", "Astro", "Tailwind CSS", "HTML5", "CSS3", "Electron"],
    backend: ["Python", "FastAPI", "Node.js", "PHP", "RESTful APIs"],
    databasesAndCloud: ["MySQL", "Supabase", "Firebase", "Cloudflare D1 / KV / R2", "Cloudflare Pages"],
    aiAndVision: ["MediaPipe (Facial & Posture Tracking)", "Librosa (Audio Analysis)", "Google Cloud Vertex AI", "Cloudflare Workers AI"],
    tools: ["Git", "GitHub", "Docker", "Linux", "VS Code", "Figma", "Adobe Photoshop"]
  },

  // Projects
  projects: [
    {
      id: "talktics",
      title: "TalkTics / Bigkas Capstone",
      year: "2025",
      isFeatured: true,
      overview: "An AI-powered public speaking simulator and speech analysis platform.",
      techStack: ["React JS", "Python", "MediaPipe", "Librosa", "Supabase"],
      features: [
        "Librosa audio frequency and pitch metrics to analyze vocal delivery.",
        "MediaPipe real-time computer vision for facial orientation and posture tracking.",
        "Automated scoring metrics and actionable feedback to elevate presentation delivery."
      ],
      liveUrl: "https://bigkas.site/",
      githubUrl: "https://github.com/kidlatpogi/bigkas-capstone"
    },
    {
      id: "linny",
      title: "L.I.N.N.Y",
      year: "2024/2025",
      isFeatured: true,
      overview: "Loyal Intelligent Neural Network for You — a personal voice-controlled AI assistant inspired by J.A.R.V.I.S.",
      techStack: ["Python", "SpeechRecognition", "PyTTSx3", "Kasa Smart API"],
      features: [
        "Real-time conversational voice interaction and natural language command parsing.",
        "Automated scheduling, calendar management, and live weather briefings.",
        "Direct IoT smart home automation integrated with Tapo and Kasa hardware devices."
      ],
      githubUrl: "https://github.com/kidlatpogi/L.I.N.N.Y"
    },
    {
      id: "safelink",
      title: "SafeLink Mobile",
      year: "2024/2025",
      isFeatured: true,
      overview: "A cross-platform family safety and disaster response mobile application.",
      techStack: ["React Native", "Expo", "Firebase", "OpenStreetMap"],
      features: [
        "Real-time broadcast alerts and push notifications during civic emergencies.",
        "Offline-accessible map locating designated evacuation centers and emergency zones.",
        "Private family circle location tracking and rapid check-in statuses."
      ],
      githubUrl: "https://github.com/kidlatpogi/SafeLink"
    },
    {
      id: "calendar-widget",
      title: "Calendar Widget",
      year: "2024",
      isFeatured: true,
      overview: "A lightweight, minimal Windows desktop calendar widget.",
      techStack: ["Electron", "JavaScript", "HTML5", "CSS3"],
      features: [
        "Direct synchronization with Google Calendar without reliance on external backend servers.",
        "Native Windows desktop integration with low memory and CPU footprint."
      ],
      liveUrl: "https://github.com/kidlatpogi/Calendar-Widget/releases/latest",
      githubUrl: "https://github.com/kidlatpogi/Calendar-Widget"
    },
    {
      id: "mypc",
      title: "MyPC E-Commerce Shop",
      year: "2024",
      isFeatured: true,
      overview: "Full-stack e-commerce platform developed for Information Assurance and Security.",
      techStack: ["PHP", "MySQL", "Apache", "Tailwind CSS"],
      features: [
        "Online computer component catalog browsing, category filtering, and hardware compatibility checks.",
        "Secure user authentication, cart management, and transaction simulation."
      ],
      liveUrl: "https://mypcinfosec.vercel.app",
      githubUrl: "https://github.com/kidlatpogi/InfoSec-MyPC.git"
    },
    {
      id: "gnosis",
      title: "Gnosis",
      year: "2024",
      isFeatured: false,
      overview: "Comprehensive web application for study habit optimization and collaborative learning.",
      techStack: ["React JS", "Firebase Firestore & Auth"],
      features: [
        "Interactive study modes including flashcards, multiple-choice quizzes, and typed answers.",
        "GitHub-style contribution heatmaps to visualize study consistency over time.",
        "Deck sharing and collaborative leaderboards among study groups."
      ],
      liveUrl: "https://gnosis-study.vercel.app/",
      githubUrl: "https://github.com/kidlatpogi/Gnosis.git"
    },
    {
      id: "webtools",
      title: "Web Tools",
      year: "2024",
      isFeatured: false,
      overview: "Curated developer resource catalog providing quick access to essential web engineering tools.",
      techStack: ["React JS", "Tailwind CSS"],
      features: [
        "Categorized index of UI libraries, deployment services, APIs, and productivity utilities."
      ],
      liveUrl: "https://wtoolz.vercel.app/",
      githubUrl: "https://github.com/kidlatpogi/Web-tools.git"
    },
    {
      id: "room-reservation",
      title: "Room Reservation System",
      year: "2024",
      isFeatured: false,
      overview: "Web-based booking and management portal for academic classrooms and laboratory facilities.",
      techStack: ["JavaScript", "SQL", "HTML/CSS"],
      features: [
        "Role-based access control for faculty, students, and system administrators.",
        "Conflict detection algorithms to prevent double-bookings in real time."
      ],
      githubUrl: "https://github.com/kidlatpogi/Room-Reservation-System"
    }
  ] as ProjectItem[],

  // Verified Certifications & Badges
  certifications: [
    {
      title: "HTML Essentials",
      issuer: "Cisco Networking Academy",
      badgePlatform: "Credly",
      description: "Web markup standards, HTML5 semantics, and document accessibility."
    },
    {
      title: "CSS Essentials",
      issuer: "Cisco Networking Academy",
      badgePlatform: "Credly",
      description: "CSS styling, responsive flexbox/grid layout systems, and CSS3 design principles."
    },
    {
      title: "JavaScript Essentials 1",
      issuer: "Cisco Networking Academy",
      badgePlatform: "Credly",
      description: "Core algorithms, control flow, DOM manipulation, and modern ES6+ syntax."
    },
    {
      title: "JavaScript Essentials 2",
      issuer: "Cisco Networking Academy",
      badgePlatform: "Credly",
      description: "Advanced OOP concepts, asynchronous JavaScript, promises, and error handling."
    },
    {
      title: "HTML and CSS",
      issuer: "IT Specialist (Certiport)",
      badgePlatform: "Credly",
      description: "Professional industry certification in modern front-end web engineering."
    },
    {
      title: "Databases",
      issuer: "IT Specialist (Certiport)",
      badgePlatform: "Credly",
      description: "Relational database design, SQL querying, indexing, and normalization."
    },
    {
      title: "Web Development Fundamentals",
      issuer: "IBM SkillsBuild",
      badgePlatform: "Credly",
      description: "Client-server architecture, protocols, and fundamental web development practices."
    },
    {
      title: "Git Training",
      issuer: "Simplilearn SkillUp",
      badgePlatform: "Simplilearn",
      description: "Branching strategies, distributed version control, and collaborative repository workflows."
    },
    {
      title: "Introduction to Cloud Computing",
      issuer: "Simplilearn SkillUp",
      badgePlatform: "Simplilearn",
      description: "Cloud service models (IaaS, PaaS, SaaS), virtualization, and cloud security architecture."
    },
    {
      title: "DevOps 101",
      issuer: "Simplilearn SkillUp",
      badgePlatform: "Simplilearn",
      description: "CI/CD pipelines, containerization with Docker, and automated deployment lifecycles."
    },
    {
      title: "Prompt Design in Vertex AI",
      issuer: "Google Cloud Skills Boost",
      badgePlatform: "Google Cloud",
      description: "Generative AI prompt engineering, temperature tuning, and Vertex AI foundation models."
    },
    {
      title: "Responsive Web Design",
      issuer: "FreeCodeCamp",
      badgePlatform: "FreeCodeCamp",
      description: "300-hour developer certification covering responsive CSS architectures and UI design."
    }
  ] as CertificationItem[],

  // Contact Info
  contact: {
    primaryEmail: "bautistaangelozeus17@gmail.com",
    secondaryEmail: "dzeref4000@gmail.com",
    linkedIn: "https://www.linkedin.com/in/zeus-angelo-bautista/",
    github: "https://github.com/kidlatpogi",
    resumePath: "/Zeus_Angelo_Bautista_Resume.pdf"
  }
};

// Generates the ATS response dynamically from single-source-of-truth data
export function generateKnowledgeResponses() {
  const { profile, experiences, techStack, projects, certifications, contact } = PORTFOLIO_DATA;

  // 1. About Zeus (ONLY Professional Summary)
  const aboutText = `### ZEUS ANGELO BAUTISTA — PROFESSIONAL SUMMARY

**Role**: ${profile.role}
**Education**: ${profile.education}
**Institution**: ${profile.institution}
**Location**: ${profile.location}

**Professional Summary**:
${profile.professionalSummary}`;

  // 2. Experience (ONLY Current Experience)
  const currentExp = experiences.find(e => e.isCurrent) || experiences[0];
  const experienceText = `### CURRENT PROFESSIONAL EXPERIENCE

#### ${currentExp.role}
- **Organization**: ${currentExp.company}
- **Period**: ${currentExp.period}
- **Location**: ${currentExp.location}
- **Key Responsibilities & Accomplishments**:
${currentExp.responsibilities.map(r => `  - ${r}`).join('\n')}`;

  // 3. Tech Stack (Current Tech Stack)
  const techStackText = `### CURRENT TECH STACK & SKILLS

#### Frontend Development
- ${techStack.frontend.join(', ')}

#### Backend & API Engineering
- ${techStack.backend.join(', ')}

#### Databases & Cloud Infrastructure
- ${techStack.databasesAndCloud.join(', ')}

#### AI & Computer Vision
- ${techStack.aiAndVision.join(', ')}

#### Tools & Methodologies
- ${techStack.tools.join(', ')}`;

  // 4. Projects (Scalable Full Project Directory)
  const projectsText = `### COMPLETE PROJECTS DIRECTORY

${projects.map((p, idx) => `#### ${idx + 1}. ${p.title} (${p.year}${p.isFeatured ? ' — Featured' : ''})
- **Tech Stack**: ${p.techStack.join(', ')}
- **Overview**: ${p.overview}
- **Key Features**:
${p.features.map(f => `  - ${f}`).join('\n')}
- **Links**: ${p.liveUrl ? `[Live Demo](${p.liveUrl}) | ` : ''}[GitHub Repository](${p.githubUrl})`).join('\n\n')}`;

  // 5. Certifications (Scalable Full Certifications Directory)
  const certsText = `### VERIFIED CERTIFICATIONS & CREDENTIALS

${certifications.map((c, idx) => `- **${c.title}** (${c.issuer}${c.badgePlatform ? ` — ${c.badgePlatform}` : ''}): ${c.description}`).join('\n')}`;

  // 6. Contact
  const contactText = `### CONTACT & PROFILES

- **Email**: [${contact.primaryEmail}](mailto:${contact.primaryEmail}) / [${contact.secondaryEmail}](mailto:${contact.secondaryEmail})
- **LinkedIn**: [linkedin.com/in/zeus-angelo-bautista](${contact.linkedIn})
- **GitHub**: [github.com/kidlatpogi](${contact.github})
- **Resume**: Downloadable official resume available via [Resume Document](${contact.resumePath})`;

  return {
    about: aboutText,
    experience: experienceText,
    skills: techStackText,
    projects: projectsText,
    certifications: certsText,
    contact: contactText
  };
}