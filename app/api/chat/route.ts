import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { prompt, context, apiKey: clientApiKey } = await req.json();
    const activeApiKey = clientApiKey || apiKey;

    if (!activeApiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Add your key in the side panel or as GEMINI_API_KEY in .env.local to unlock real AI.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(activeApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const systemPrompt = `You are Aether, a tactical AI mission control dispatcher for a next-generation event venue.
You deliver high-speed, accurate intelligence based on live telemetry.

RULES:
1. Be extremely brief and tactical (1-3 sentences maximum).
2. Avoid conversational fluff.
3. DO NOT use markdown bolding (**text**).
4. Always prioritize live telemetry data.
5. Answer all questions directly.

Live Context:
${JSON.stringify(context, null, 2)}
    
User Question: ${prompt}`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error.message || error);
    return NextResponse.json({ error: error.message || 'Failed to fetch AI response' }, { status: 500 });
  }
}
