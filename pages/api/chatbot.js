import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed",
      usedAI: false,
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please enter a message.",
        usedAI: false,
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from .env.local");
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: message,
    });

    return res.status(200).json({
      reply: result.text,
      usedAI: true,
    });

  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error("Message:", error.message);
    console.error("Full Error:", error);
    console.error("==================================");

    return res.status(500).json({
      reply: "Gemini AI is currently unavailable.",
      usedAI: false,
      error: error.message,
    });
  }
}