import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, systemPrompt, knowledgeBase } = await req.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
        'HTTP-Referer': 'https://informes-srjunco.vercel.app',
        'X-Title': 'Victoria AI - Junco'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
        messages: [
          { role: 'system', content: `${systemPrompt}\nBase de conocimientos: ${knowledgeBase}` },
          { role: 'user', content: message }
        ],
        temperature: 0.5,
        max_tokens: 400
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en API Chat:', error);
    return NextResponse.json({ error: 'Falla en la red de la colmena' }, { status: 500 });
  }
}
