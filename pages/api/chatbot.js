import { GoogleGenAI } from "@google/genai";

// Website information system prompt
const SYSTEM_PROMPT = `You are Precon Detailing Assistant, an AI chatbot for Precon Detailing (https://precondetailing.com).

COMPANY OVERVIEW:
Precon Detailing is a professional steel & rebar detailing and estimation company serving clients worldwide.

OUR SERVICES & PRICING:
1. 🏗️ Steel Detailing - Starting from $199
   - Structural steel shop drawings
   - Connection design and detailing
   - Anchor bolt plans
   - Material lists and BOM
   - Erection drawings
   - 3D modeling
   - Delivery: 3-5 business days

2. 🔩 Rebar Detailing - Starting from $149
   - Bar bending schedules
   - Rebar placement drawings
   - Reinforcement details
   - Quantity calculations
   - Delivery: 2-4 business days

3. 📏 Quantity Takeoff - Starting from $99
   - Material quantity calculations
   - Area and volume calculations
   - Component counting
   - Digital takeoff reports
   - Delivery: 1-3 business days

4. 💰 Cost Estimation - Starting from $199
   - Material cost estimation
   - Labor cost calculation
   - Equipment cost analysis
   - Budget planning
   - Delivery: 4-7 business days

5. 📋 BOQ Preparation - Starting from $149
   - Tender BOQ preparation
   - Item descriptions and specifications
   - Unit rate analysis
   - Contract documentation
   - Delivery: 3-6 business days

6. 📐 Shop Drawings - Starting from $179
   - Fabrication drawings
   - Installation drawings
   - As-built drawings
   - Assembly details
   - Delivery: 4-6 business days

CONTACT INFORMATION:
- 📧 Email: info@precondetailing.com
- 📞 Phone: +92 317 7194108
- 💬 WhatsApp: +92 317 7194108
- 📍 Address: Pakistan — Serving Clients Worldwide
- 🕐 Working Hours: Mon-Sat 9AM-6PM, Sunday Closed

COMPANY FACTS:
- 6 Core Services: Steel Detailing, Rebar Detailing, Quantity Takeoff, Cost Estimation, BOQ Preparation, Shop Drawings
- Free Quote Within 24 Hours
- Confidential Project Handling — NDA on Request
- Serving Clients Worldwide (USA, UK, Canada, Australia, UAE & more)

WEBSITE PAGES:
- Home: /
- Services: /services
- Blog: /blog
- Reviews: /reviews
- About: /about
- Contact: /contact
- Quote Calculator: /quote
- PDF Viewer: /viewers/pdf-viewer
- DWG Viewer: /viewers/dwg-viewer
- IFC Viewer: /viewers/ifc-viewer

RESPONSE GUIDELINES:
- Be professional, helpful, and concise
- Answer in the language user asks
- Provide accurate pricing and timeline info
- Suggest visiting specific pages when relevant
- Offer free quotes for interested clients
- For technical queries, recommend contacting our team`;

// Fast, stable models — tried in order. (gemini-3.7-flash was returning
// 503 "high demand" errors and the SDK's retries stretched replies to 60s+.)
const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
const AI_TIMEOUT_MS = 12000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`AI timeout after ${ms}ms`)), ms)
    ),
  ]);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed", usedAI: false });
  }

  const message = (req.body?.message || "").trim();
  if (!message) {
    return res.status(400).json({ reply: "Please enter a message.", usedAI: false });
  }

  // 1) Instant path: short, simple questions that match a known topic are
  //    answered immediately from the built-in knowledge — no AI wait at all.
  const wordCount = message.split(/\s+/).length;
  if (wordCount <= 9) {
    const instant = matchTopic(message);
    if (instant) {
      return res.status(200).json({ reply: instant, usedAI: false });
    }
  }

  // 2) AI path: fast model, hard timeout, no SDK retries; if the primary
  //    model is overloaded, fall through to the lighter model at once.
  if (process.env.GEMINI_API_KEY) {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    let lastError = null;

    for (const model of MODELS) {
      try {
        const result = await withTimeout(
          ai.models.generateContent({
            model,
            contents: [{ role: "user", parts: [{ text: message }] }],
            config: {
              systemInstruction: SYSTEM_PROMPT,
              maxOutputTokens: 600,
              temperature: 0.4,
              httpOptions: { timeout: AI_TIMEOUT_MS, maxRetries: 0 },
            },
          }),
          AI_TIMEOUT_MS
        );
        if (result.text) {
          return res.status(200).json({ reply: result.text, usedAI: true });
        }
      } catch (error) {
        lastError = error;
        console.error(`Chatbot AI failed on ${model}:`, error.message);
      }
    }
    console.error("Chatbot: all AI models failed, using fallback.", lastError?.message);
  }

  // 3) Fallback: built-in answers (never leaves the visitor waiting).
  const reply = matchTopic(message) || DEFAULT_REPLY;
  return res.status(200).json({ reply, usedAI: false });
}

const DEFAULT_REPLY = `I can help with Precon Detailing information:\n\n✅ Our 6 services\n✅ Pricing (from $99)\n✅ Delivery times (1-7 days)\n✅ Contact details\n\nWhat would you like to know?`;

// Returns a canned answer when the message clearly matches a known topic,
// or null when it doesn't (so the AI can handle open-ended questions).
function matchTopic(input) {
  const text = (input || '').toLowerCase();

  if (text.includes('steel')) {
    return `🏗️ Steel Detailing - from $199\n\n✅ Shop drawings\n✅ Connection design\n✅ Anchor bolt plans\n✅ Material lists\n\n⏰ 3-5 business days`;
  }

  if (text.includes('rebar')) {
    return `🔩 Rebar Detailing - from $149\n\n✅ Bar bending schedules\n✅ Placement drawings\n✅ Reinforcement details\n\n⏰ 2-4 business days`;
  }

  if (text.includes('quantity') || text.includes('takeoff')) {
    return `📏 Quantity Takeoff - from $99\n\n✅ Material quantities\n✅ Area calculations\n✅ Digital reports\n\n⏰ 1-3 business days`;
  }

  if (text.includes('boq')) {
    return `📋 BOQ Preparation - from $149\n\n✅ Tender BOQ\n✅ Rate analysis\n✅ Documentation\n\n⏰ 3-6 business days`;
  }

  if (text.includes('shop') || text.includes('drawing')) {
    return `📐 Shop Drawings - from $179\n\n✅ Fabrication drawings\n✅ Installation drawings\n\n⏰ 4-6 business days`;
  }

  if (text.includes('cost') || text.includes('estimat') || text.includes('price') || text.includes('how much')) {
    return `💰 Cost Estimation - from $199\n\n✅ Material costs\n✅ Labor costs\n✅ Budget planning\n\n⏰ 4-7 business days\n\n💲 All starting prices:\nSteel Detailing: from $199\nRebar Detailing: from $149\nQuantity Takeoff: from $99\nBOQ Preparation: from $149\nShop Drawings: from $179`;
  }

  if (text.includes('service') || text.includes('offer')) {
    return `Our 6 Services:\n\n1. Steel Detailing - $199\n2. Rebar Detailing - $149\n3. Quantity Takeoff - $99\n4. Cost Estimation - $199\n5. BOQ Preparation - $149\n6. Shop Drawings - $179`;
  }

  if (text.includes('time') || text.includes('delivery') || text.includes('long') || text.includes('when')) {
    return `⏰ Delivery Times:\n\nQuantity Takeoff: 1-3 days\nRebar: 2-4 days\nSteel: 3-5 days\nBOQ: 3-6 days\nShop Drawings: 4-6 days\nCost Estimation: 4-7 days`;
  }

  if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('reach') || text.includes('whatsapp')) {
    return `📞 Contact Us:\n\n📧 info@precondetailing.com\n📞 +92 317 7194108\n💬 WhatsApp: +92 317 7194108\n\nMon-Sat: 9AM-6PM`;
  }

  if (text.includes('where') || text.includes('address') || text.includes('location')) {
    return `📍 Our Office:\n\nPakistan — Serving Clients Worldwide\n\nServing clients globally! 🌍`;
  }

  if (text.includes('review') || text.includes('rating') || text.includes('quality')) {
    return `⭐ You can read real client reviews on our Reviews page.\n\nWorked with us already? We'd love your honest feedback there too!`;
  }

  if (text.includes('project') || text.includes('portfolio') || text.includes('work')) {
    return `🏗️ You can browse example projects in the Projects section of our website.\n\nEach one shows the service, location and scope of work.`;
  }

  if (/\b(hi|hello|hey|salam|assalam|hola)\b/.test(text)) {
    return `Hello! 😊 Welcome to Precon Detailing!\n\nI can help with:\n✅ Services\n✅ Pricing\n✅ Delivery times\n✅ Contact info`;
  }

  if (text.includes('thank')) {
    return `You're welcome! 😊 Anything else I can help with?`;
  }

  return null;
}
