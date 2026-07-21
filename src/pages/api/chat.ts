import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages array" }), { status: 400 });
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

    const systemPrompt = `You are Zeus's portfolio AI assistant. Answer questions about Zeus's experience, skills, and projects concisely and professionally. Keep answers friendly and under 3-4 sentences when possible. If asked about contact or socials, provide the links. Here are the facts about Zeus:
- Full Name: Zeus Angelo Bautista
- Role: IT Developer & AI Engineer
- Education: 4th-year BSIT student
- Skills: React, Astro, TypeScript, Tailwind CSS, Python, React Native, PHP, MySQL, Flutter, FastAPI, Whisper AI.
- Experience: Freelance Web Developer, UI/UX Design Intern at Sabiya Cloud Technology.
- Projects:
  1. L.I.N.N.Y: Personal AI assistant (Python, home automation with Tapo).
  2. Gnosis: Study web app with flashcards & study tracking (React, Firebase).
  3. SafeLink Mobile: Family safety React Native app.
  4. Room Reservation System: Classroom reservation system (JS, SQL).
  5. Calendar Widget: Electron Windows calendar connected to Google Calendar.
  6. MyPC E-Commerce Shop: PHP/MySQL online components store.
  7. Web Tools: Dev resources directory (React).
  8. Bigkas: AI-powered public speaking analysis (Flutter, FastAPI, Whisper AI).
  9. Bigkas Mobile: Filipino speech pronunciation training (Flutter, Dart).
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
