/**
 * JC PATH LAB - Ollama Client Adapter (NIVEL MILITAR)
 * Este módulo actúa como un Adaptador Inteligente que conmuta entre 
 * comunicación directa LAN (localhost) y comunicación segura WAN vía Proxy.
 */

const IS_LOCAL = typeof window !== 'undefined' && 
                 (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const CONFIG = {
  localBaseUrl: 'http://localhost:11435',
  proxyEndpoint: '/api/assistant',
  model: 'qwen2.5',
  timeout: 25000, // Margen ampliado para latencia WAN
};

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

/**
 * Función Principal de Llamada (Aislada y Segura)
 */
export async function callOllama(prompt: string, systemPrompt?: string): Promise<string | null> {
  try {
    // 1. VALIDACIÓN PREVENTIVA (Client-Side Gatekeeper)
    if (!prompt.trim()) return null;

    // 2. DETERMINACIÓN DE RUTA (Adapter Pattern)
    // En producción, usamos el proxy para proteger infraestructura.
    const url = IS_LOCAL ? `${CONFIG.localBaseUrl}/api/generate` : CONFIG.proxyEndpoint;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Nota: El token ya no se envía desde el cliente en producción.
        // El Gateway del servidor lo inyecta de forma segura.
        ...(IS_LOCAL && { 'Authorization': `Bearer 41457466` }), 
      },
      body: JSON.stringify({
        model: CONFIG.model,
        prompt: prompt.trim(),
        system: systemPrompt,
        stream: false,
      }),
      signal: AbortSignal.timeout(CONFIG.timeout),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Uplink Failure: ${response.status}`);
    }

    const data = await response.json();
    return data.response;

  } catch (error: any) {
    console.error("[OLLAMA_ADAPTER] Tactical Error:", error.message);
    // Ruta de degradación elegante: fallar devolviendo null en lugar de romper el hilo principal.
    return null;
  }
}

/**
 * Generador de Descripciones Clínicas (Fachada de Aplicación)
 */
export async function generateClinicalDescription(
  field: 'macroscopia' | 'microscopia' | 'diagnostico',
  sampleType: string,
  userNotes?: string
): Promise<string | null> {
  
  // Sanitización estricta de contexto
  const safeSample = sampleType?.replace(/[<>]/g, '').trim() || 'Muestra no especificada';

  const prompts = {
    macroscopia: `Genera una descripción macroscópica profesional para una muestra de: ${safeSample}. ${userNotes ? `Notas adicionales: ${userNotes}` : ''}. Responde solo con el texto médico, sin preámbulos.`,
    microscopia: `Genera una descripción microscópica profesional para una muestra de: ${safeSample}. ${userNotes ? `Notas adicionales: ${userNotes}` : ''}. Responde solo con el texto médico, sin preámbulos.`,
    diagnostico: `Genera un diagnóstico definitivo profesional para una muestra de: ${safeSample}. ${userNotes ? `Notas adicionales: ${userNotes}` : ''}. Responde solo con el texto médico, sin preámbulos.`,
  };

  const systemPrompt = "Eres un Médico Anatomopatólogo experto de JC PATH LAB. Redactas informes claros, precisos y formales. No uses introducciones, ve al grano.";

  return callOllama(prompts[field], systemPrompt);
}
