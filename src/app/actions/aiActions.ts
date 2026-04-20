'use server';

/**
 * JC PATH LAB - SECURE AI ACTIONS
 * This logic runs only on the server, protecting the GEMINI_API_KEY.
 */

/**
 * JC PATH LAB - MULTIMODAL AI ACTIONS
 * Sovereignty over vision and text extraction.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function askVictoria(prompt: string, systemPrompt: string): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nConsulta: ${prompt}` }],
          },
        ],
      }),
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("[AI_ACTION] Error:", error);
    return null;
  }
}

/**
 * ANALYZE MEDICAL ORDER (VISION)
 * Extracts structured data from an image of a medical order.
 */
export async function analyzeMedicalOrder(base64Image: string): Promise<any | null> {
  if (!GEMINI_API_KEY) return null;

  const systemPrompt = `Actúa como un experto en recepción de laboratorio de anatomía patológica. 
  Analiza la imagen de la orden médica adjunta y extrae los campos en formato JSON puro:
  {
    "patientFirstName": "nombre",
    "patientLastName": "apellidos",
    "patientDni": "dni",
    "age": "edad (número)",
    "serviceType": "ej: biopsia, pap, inmunohistoquímica",
    "studyMotive": "motivo o sospecha diagnóstica",
    "clinic": "clínica de procedencia"
  }
  Si un campo no es visible, pon null. No incluyas texto extra, solo el JSON.`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: base64Image
                }
              }
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) return null;
    
    // Limpiar respuesta si Gemini incluye ```json ... ```
    const cleanJson = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("[VISION_ACTION] Error al procesar imagen:", error);
    return null;
  }
}
