/**
 * JC PATH LAB - Ollama Client Utility
 * Handles communication with the local Ollama instance for medical report assistance and chatbot responses.
 */

const OLLAMA_OPTIONS = {
  baseUrl: 'http://localhost:11435',
  model: 'qwen2.5',
  timeout: 15000,
  token: '41457466',
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
        system: systemPrompt || "Eres un asistente médico experto en Patología Clínica.",
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
