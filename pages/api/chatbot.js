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

    // Website information system prompt
    const systemPrompt = `You are CivilPro Assistant, an AI chatbot for CivilPro Services (https://civil-estimators.vercel.app).

COMPANY OVERVIEW:
CivilPro Services is a professional civil engineering company offering online services worldwide.

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
- 📧 Email: info@civilpro.com
- 📞 Phone: +1 (555) 123-4567
- 💬 WhatsApp: +1 (555) 123-4567
- 📍 Address: 123 Engineering St, City, State 12345
- 🕐 Working Hours: Mon-Sat 9AM-6PM, Sunday Closed

COMPANY STATS:
- 500+ Projects Completed
- 10+ Years Experience
- 200+ Happy Clients
- 4.9/5 Client Rating
- 25+ Team Members
- 50+ Countries Served

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

    const result = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm CivilPro Assistant and I'll help with information about CivilPro Services, our engineering services, pricing, timelines, and contact details." }],
        },
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
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

    // Fallback response
    const fallbackReply = getFallbackResponse(req.body?.message || '');
    
    return res.status(500).json({
      reply: fallbackReply,
      usedAI: false,
      error: error.message,
    });
  }
}

function getFallbackResponse(input) {
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
  
  if (text.includes('cost') || text.includes('estimat')) {
    return `💰 Cost Estimation - from $199\n\n✅ Material costs\n✅ Labor costs\n✅ Budget planning\n\n⏰ 4-7 business days`;
  }
  
  if (text.includes('boq')) {
    return `📋 BOQ Preparation - from $149\n\n✅ Tender BOQ\n✅ Rate analysis\n✅ Documentation\n\n⏰ 3-6 business days`;
  }
  
  if (text.includes('shop') || text.includes('drawing')) {
    return `📐 Shop Drawings - from $179\n\n✅ Fabrication drawings\n✅ Installation drawings\n\n⏰ 4-6 business days`;
  }
  
  if (text.includes('service') || text.includes('offer')) {
    return `Our 6 Services:\n\n1. Steel Detailing - $199\n2. Rebar Detailing - $149\n3. Quantity Takeoff - $99\n4. Cost Estimation - $199\n5. BOQ Preparation - $149\n6. Shop Drawings - $179`;
  }
  
  if (text.includes('price') || text.includes('how much') || text.includes('cost')) {
    return `💲 Our Pricing:\n\nSteel Detailing: from $199\nRebar Detailing: from $149\nQuantity Takeoff: from $99\nCost Estimation: from $199\nBOQ Preparation: from $149\nShop Drawings: from $179`;
  }
  
  if (text.includes('time') || text.includes('delivery') || text.includes('when')) {
    return `⏰ Delivery Times:\n\nQuantity Takeoff: 1-3 days\nRebar: 2-4 days\nSteel: 3-5 days\nBOQ: 3-6 days\nShop Drawings: 4-6 days\nCost Estimation: 4-7 days`;
  }
  
  if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('reach')) {
    return `📞 Contact Us:\n\n📧 info@civilpro.com\n📞 +1 (555) 123-4567\n💬 WhatsApp: +1 (555) 123-4567\n\nMon-Sat: 9AM-6PM`;
  }
  
  if (text.includes('where') || text.includes('address') || text.includes('location')) {
    return `📍 Our Office:\n\n123 Engineering St, City, State 12345\n\nServing clients globally! 🌍`;
  }
  
  if (text.includes('review') || text.includes('rating') || text.includes('quality')) {
    return `⭐ We have 4.9/5 rating from 200+ happy clients!\n\nVisit our Reviews page for testimonials.`;
  }
  
  if (text.includes('project') || text.includes('portfolio') || text.includes('work')) {
    return `🏗️ We've completed 500+ projects worldwide!\n\nCheck our Portfolio section.`;
  }
  
  if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
    return `Hello! 😊 Welcome to CivilPro Services!\n\nI can help with:\n✅ Services\n✅ Pricing\n✅ Delivery times\n✅ Contact info`;
  }
  
  if (text.includes('thank')) {
    return `You're welcome! 😊 Anything else I can help with?`;
  }
  
  return `I can help with CivilPro Services information:\n\n✅ Our 6 services\n✅ Pricing (from $99)\n✅ Delivery times (1-7 days)\n✅ Contact details\n\nWhat would you like to know?`;
}