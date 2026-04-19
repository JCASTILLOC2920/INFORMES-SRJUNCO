/**
 * JC PATH LAB - Gemini Cloud Client
 * Adaptador para la API de Google Gemini (Gratuita y 24/7)
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''; // Se configura en Vercel
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function callGemini(prompt: string, systemPrompt?: string): Promise<string | null> {
  if (!GEMINI_API_KEY) {
    console.error("[GEMINI_CLIENT] Error: GEMINI_API_KEY no configurada.");
    return null;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt ? `${systemPrompt}\n\n` : ''}${prompt}` }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini Uplink Failure: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;

  } catch (error: any) {
    console.error("[GEMINI_CLIENT] Critical Error:", error.message);
    return null;
  }
}
