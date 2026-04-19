import { callGemini } from '@/utils/geminiClient';

/**
 * SECURE GATEWAY - GEMINI CLOUD (24/7 AVAILABILITY)
 * Este endpoint utiliza la API de Google Gemini para garantizar inteligencia médica
 * persistente sin dependencia de servidores locales.
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, system, model = 'gemini-1.5-flash' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const responseText = await callGemini(prompt, system);

    if (!responseText) {
      return NextResponse.json({ error: 'Cloud Engine Unavailable' }, { status: 502 });
    }

    return NextResponse.json({
        response: responseText,
        done: true
    });

  } catch (error: any) {
    console.error('[SECURE_GATEWAY] Gemini failure:', error.message);
    return NextResponse.json({ error: 'Internal Security Guard Failure' }, { status: 500 });
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
