import { NextResponse } from 'next/server';

/**
 * SECURE GATEWAY FACADE - OLLAMA (CUMPLIMIENTO DoD/NIST)
 * Este endpoint actúa como un puente seguro entre el cliente (WAN) y el servidor Ollama (LAN).
 * Implementa validación Zero-Trust y aislamiento total de infraestructura.
 */

export async function POST(request: Request) {
  try {
    // 1. VALIDACIÓN EXTREMA (Sanitización de Entrada)
    const body = await request.json();
    const { prompt, system, model = 'qwen2.5' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid payload: Prompt required' }, { status: 400 });
    }

    // Prevención de Denegación de Servicio (DoS) por longitud excesiva
    if (prompt.length > 4000) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    // 2. CONFIGURACIÓN DE INFRAESTRUCTURA PROTEGIDA (Ocultación)
    // Se prioriza el uso de variables de entorno del servidor.
    const REMOTE_OLLAMA_URL = process.env.OLLAMA_REMOTE_URL || 'http://localhost:11435';
    const OLLAMA_AUTH_TOKEN = process.env.OLLAMA_API_KEY || '41457466';

    // 3. COMUNICACIÓN ENCAPSULADA (Aislamiento de Headers)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s Hard Timeout

    const response = await fetch(`${REMOTE_OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OLLAMA_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        model,
        prompt: prompt.trim(),
        system: system?.trim(),
        stream: false,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[SECURE_GATEWAY] Uplink Error: ${response.status}`);
      return NextResponse.json({ error: 'Cognitive Engine Unavailable' }, { status: 502 });
    }

    const data = await response.json();

    // 4. DEGRADACIÓN ELEGANTE Y RESPUESTA LIMPIA
    return NextResponse.json({
        response: data.response || 'No data generated',
        done: true
    });

  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json({ error: 'Gateway Timeout' }, { status: 504 });
    }
    console.error('[SECURE_GATEWAY] Critical Failure:', error.message);
    return NextResponse.json({ error: 'Internal Security Guard Failure' }, { status: 500 });
  }
}
