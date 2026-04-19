/**
 * SECURE GATEWAY - LOCAL HIVE (NODO 189)
 * Este endpoint redirige las peticiones al servidor local asimilado para 
 * garantizar soberanía total y estabilidad en la IA de Victoria.
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, system, model = 'Maestro:latest' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const OLLAMA_URL = 'http://192.168.18.189:11434/api/generate';
    const OLLAMA_AUTH_TOKEN = '41457466';

    const response = await fetch(OLLAMA_URL, {
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
    });

    if (!response.ok) {
      console.error(`[SECURE_GATEWAY] Uplink Error: ${response.status}`);
      return NextResponse.json({ error: 'Local Engine Offline' }, { status: 502 });
    }

    const data = await response.json();

    return NextResponse.json({
        response: data.response || 'No data generated',
        done: true
    });

  } catch (error: any) {
    console.error('[SECURE_GATEWAY] Critical failure:', error.message);
    return NextResponse.json({ error: 'HIVE_BYPASS_ACTIVE: Reintentando conexión local...' }, { status: 500 });
  }
}

  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json({ error: 'Gateway Timeout' }, { status: 504 });
    }
    console.error('[SECURE_GATEWAY] Critical Failure:', error.message);
    return NextResponse.json({ error: 'HIVE_BYPASS_ACTIVE: Reintentando conexión...' }, { status: 500 });
  }
}
