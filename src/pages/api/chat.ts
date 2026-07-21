import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages array" }), { status: 400 });
    }

    // Server-side check for bad words/spam from private env binding
    const lastMessage = messages[messages.length - 1]?.text || "";
    const badWordsString = (env as any).CHAT_BAD_WORDS || import.meta.env.CHAT_BAD_WORDS || process.env.CHAT_BAD_WORDS || "";
    const badWords = badWordsString ? badWordsString.split(',').map((w: string) => w.trim().toLowerCase()) : [];

    const containsInappropriateLanguage = (text: string): boolean => {
      const lowerText = text.toLowerCase().trim();
      if (!lowerText) return false;

      // 1. Direct word match
      const hasBadWord = badWords.some((word: string) => {
        const cleanWord = word.trim().toLowerCase();
        if (!cleanWord) return false;
        return lowerText.includes(cleanWord);
      });
      if (hasBadWord) return true;

      // 2. Keyboard mash check
      const words = lowerText.split(/\s+/);
      const hasMash = words.some((w: string) => {
        if (w.length > 7 && !/[aeiouy]/i.test(w) && /^[a-z0-9]+$/i.test(w)) return true;
        return false;
      });
      if (hasMash) return true;

      return false;
    };

    if (containsInappropriateLanguage(lastMessage)) {
      return new Response(JSON.stringify({ error: "Inappropriate language blocked", isBlocked: true }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get the Cloudflare AI binding from cloudflare:workers env
    const ai = (env as any).AI;

    if (!ai) {
      console.error("Cloudflare AI binding not found in cloudflare:workers env");
      return new Response(
        JSON.stringify({ error: "AI binding not found on server. Make sure wrangler.jsonc has the AI binding." }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Retrieve system prompt from environment secrets to keep it private from public git repo
    const systemPrompt = (env as any).CHAT_SYSTEM_PROMPT || `You are Zeus's portfolio AI assistant. Answer questions about Zeus's experience, skills, and projects in a very precise, direct, and concise manner. Keep responses strictly under 1-2 sentences maximum. Do not write long paragraphs or use filler words. If asked about contact or socials, provide the links. Here are the facts about Zeus:
- Full Name: Zeus Angelo Bautista
- Role: IT Developer & AI Engineer
- Education: 4th-year BSIT student
- Skills: React, Astro, TypeScript, Tailwind CSS, Python, React Native, PHP, MySQL, Flutter, FastAPI.
- Contact: bautistaangelozeus17@gmail.com / dzeref4000@gmail.com.
- LinkedIn: https://www.linkedin.com/in/zeus-angelo-bautista/
- GitHub: https://github.com/kidlatpogi`;

    // Map messages history to system role format
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }))
    ];

    // Call Cloudflare Llama 3.2 AI model
    const aiResponse = await ai.run('@cf/meta/llama-3.2-3b-instruct', {
      messages: formattedMessages
    });

    return new Response(JSON.stringify({ response: aiResponse.response }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err: any) {
    console.error("Chat API Error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
