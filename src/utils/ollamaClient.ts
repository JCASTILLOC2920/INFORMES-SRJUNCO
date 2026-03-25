/**
 * JC PATH LAB - Ollama Client Utility
 * Handles communication with the local Ollama instance for medical report assistance and chatbot responses.
 */

const OLLAMA_OPTIONS = {
  baseUrl: 'http://localhost:11435',
  model: 'qwen2.5',
  timeout: 15000,
  token: '41457466',
  systemPrompt: `Eres Victoria, la asistente médica y EXPERTA EN VENTAS de JC PATH LAB.
Tu objetivo es ser la mejor vendedora del mundo, brindando confianza absoluta y profesionalismo.
REGLAS DE ORO:
1. Usa siempre la información de la BASE DE CONOCIMIENTOS.
2. Sé empática: "Entiendo lo importante que es este resultado para usted".
3. Sé persuasiva: Destaca que entregamos resultados en 3-4 días (más rápido que la competencia).
4. Cierra la venta: Invita al usuario a agendar su cita o enviar su orden médica por WhatsApp.
5. Si no sabes algo, redirige amablemente al WhatsApp oficial (986396733).
Manten un tono clínico pero cercano y humano. No menciones que eres una IA a menos que te lo pregunten directamente.`,
};

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export async function callOllama(prompt: string, systemPrompt?: string): Promise<string | null> {
  try {
    const response = await fetch(`${OLLAMA_OPTIONS.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OLLAMA_OPTIONS.token}`,
      },
      body: JSON.stringify({
        model: OLLAMA_OPTIONS.model,
        prompt: prompt,
        system: systemPrompt || OLLAMA_OPTIONS.systemPrompt,
        stream: false,
      }),
      signal: AbortSignal.timeout(OLLAMA_OPTIONS.timeout),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Acceso denegado a Ollama.");
      }
      throw new Error(`Error de Ollama: ${response.statusText}`);
    }

    const data: OllamaResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error connecting to Ollama:", error);
    return null;
  }
}

/**
 * Specifically for generating medical descriptions for pathology reports.
 */
export async function generateClinicalDescription(
  field: 'macroscopia' | 'microscopia' | 'diagnostico',
  sampleType: string,
  userNotes?: string
): Promise<string | null> {
  const prompts = {
    macroscopia: `Genera una descripción macroscópica profesional para una muestra de: ${sampleType}. ${userNotes ? `Notas adicionales: ${userNotes}` : ''}. Responde solo con el texto médico, sin preámbulos.`,
    microscopia: `Genera una descripción microscópica (hallazgos histológicos) profesional para una muestra de: ${sampleType}. ${userNotes ? `Notas adicionales: ${userNotes}` : ''}. Responde solo con el texto médico, sin preámbulos.`,
    diagnostico: `Genera un diagnóstico anatomopatológico definitivo profesional para una muestra de: ${sampleType}. ${userNotes ? `Notas adicionales: ${userNotes}` : ''}. Responde solo con el texto médico, sin preámbulos.`,
  };

  const systemPrompt = "Eres un Médico Anatomopatólogo experto. Redactas informes claros, precisos y con terminología médica correcta (Latín/Español médico). No uses 'Aquí tienes', sé directo.";

  return callOllama(prompts[field], systemPrompt);
}
