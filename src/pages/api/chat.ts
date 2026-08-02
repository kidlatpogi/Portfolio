import type { APIRoute } from 'astro';

export const prerender = false;

const DEFAULT_RESPONSES: Record<string, string[]> = {
  about: [
    "Zeus Angelo Bautista is a 4th-year BSIT student and IT Developer & AI Engineer passionate about building modern web, mobile, and AI-driven applications.",
    "Meet Zeus! He specializes in full-stack web and mobile development, combining frameworks like React, Astro, and Flutter with AI capabilities.",
    "Zeus is a developer based in the Philippines with experience digitalizing institutional records, building web tools, and creating intelligent software solutions."
  ],
  experience: [
    "Zeus completed an OJT at the Registrar Office digitalizing student records and worked as a Freelance Web Developer digitalizing birth records into searchable databases.",
    "Zeus's work experience includes full-stack development and database management, notably digitalizing official records for local government and university administration.",
    "From digitalizing student records during his OJT to building custom database systems as a freelance developer, Zeus brings practical software engineering experience."
  ],
  skills: [
    "Zeus works primarily with React, Astro, TypeScript, Tailwind CSS, Python, React Native, PHP, MySQL, Flutter, and FastAPI.",
    "Zeus's tech stack spans frontend (React, Astro, Tailwind CSS, TypeScript), backend & AI (Python, FastAPI, PHP, MySQL), and cross-platform mobile apps (Flutter, React Native).",
    "Key technologies in Zeus's toolkit include TypeScript, React, Astro, Python, FastAPI, Flutter, MySQL, and modern styling tools like Tailwind CSS."
  ],
  projects: [
    "Zeus has created projects like L.I.N.N.Y (AI Assistant), Gnosis (Study App), SafeLink Mobile (Family Safety), Bigkas (AI Speech Analysis), and MyPC E-Commerce.",
    "Zeus's portfolio includes web and mobile applications such as Bigkas (speech pronunciation), Gnosis (flashcards & study tracking), and SafeLink Mobile."
  ],
  contact: [
    "You can reach Zeus directly via email at bautistaangelozeus17@gmail.com or connect with him on LinkedIn and GitHub!",
    "Feel free to get in touch with Zeus at bautistaangelozeus17@gmail.com or dzeref4000@gmail.com."
  ]
};

const getEnvResponses = (prefix: string): string[] => {
  const responses: string[] = [];
  let index = 1;
  while (index <= 10) {
    const key = `${prefix}_${index}`;
    const val = (import.meta.env[key] as string) || (typeof process !== 'undefined' ? process.env[key] : undefined);
    if (val && val.trim()) {
      responses.push(val.trim());
    }
    index++;
  }
  return responses;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    let queryText = "";

    if (body.topic) {
      queryText = String(body.topic);
    } else if (body.messages && Array.isArray(body.messages) && body.messages.length > 0) {
      queryText = body.messages[body.messages.length - 1]?.text || "";
    }

    const lowerQuery = queryText.toLowerCase().trim();

    // Determine target category
    let category = "about";
    if (lowerQuery.includes("experience") || lowerQuery.includes("work") || lowerQuery.includes("job") || lowerQuery.includes("ojt")) {
      category = "experience";
    } else if (lowerQuery.includes("tech") || lowerQuery.includes("stack") || lowerQuery.includes("technologies") || lowerQuery.includes("skill")) {
      category = "skills";
    } else if (lowerQuery.includes("project") || lowerQuery.includes("app") || lowerQuery.includes("build")) {
      category = "projects";
    } else if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("reach") || lowerQuery.includes("social")) {
      category = "contact";
    } else {
      category = "about";
    }

    const prefixMap: Record<string, string> = {
      about: "TOPIC_ABOUT_ZEUS",
      experience: "TOPIC_WORK_EXPERIENCE",
      skills: "TOPIC_TECH_STACK",
      projects: "TOPIC_PROJECTS",
      contact: "TOPIC_CONTACT"
    };

    const envPrefix = prefixMap[category];
    let variations = getEnvResponses(envPrefix);

    if (variations.length === 0) {
      variations = DEFAULT_RESPONSES[category] || DEFAULT_RESPONSES.about;
    }

    // Pick a random variation from available options
    const randomIndex = Math.floor(Math.random() * variations.length);
    const selectedResponse = variations[randomIndex];

    return new Response(JSON.stringify({ response: selectedResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error("Chat API Error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
