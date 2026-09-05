import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Please enter a message.",
        usedAI: false,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are the AI assistant for a professional civil engineering company.

Company services:
- Steel Detailing
- Rebar Detailing
- Quantity Takeoff
- Cost Estimation
- BOQ Preparation
- Shop Drawings

Your job is to help visitors understand these services,
answer general civil engineering questions,
explain the company's services,
and guide users toward requesting a quote.

Be professional, friendly and concise.

Important:
- Do not invent company information.
- Do not provide dangerous or unsafe structural engineering instructions.
- For final structural decisions, calculations, or construction execution,
  recommend verification by a qualified professional.

User message:
${message}
              `,
            },
          ],
        },
      ],
    });

    const reply = response.text;

    return res.status(200).json({
      reply,
      usedAI: true,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    return res.status(500).json({
      reply:
        "Sorry, I couldn't connect to the AI assistant right now. Please try again.",
      usedAI: false,
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
}