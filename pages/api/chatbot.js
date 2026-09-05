import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        reply: getFallbackResponse(message),
        usedAI: false,
      });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build conversation
    const systemPrompt = `You are CivilPro Assistant for CivilPro Services, a civil engineering company.

Services:
- Steel Detailing: $500 (3-5 days)
- Rebar Detailing: $400 (2-4 days)
- Quantity Takeoff: $300 (1-3 days)
- Cost Estimation: $600 (4-7 days)
- BOQ Preparation: $450 (3-6 days)
- Shop Drawings: $550 (4-6 days)

Contact: info@civilpro.com, +1 (555) 123-4567`;

    let chatHistory = [];
    
    if (history && history.length > 0) {
      history.slice(-6).forEach(msg => {
        chatHistory.push({
          role: msg.type === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      });
    }

    // Create chat
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I will help with civil engineering services information.' }],
        },
        ...chatHistory,
      ],
    });

    // Send message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    if (text && text.trim()) {
      return res.status(200).json({
        reply: text,
        usedAI: true,
      });
    }

    // Fallback
    return res.status(200).json({
      reply: getFallbackResponse(message),
      usedAI: false,
    });
  } catch (error) {
    console.error('Gemini error:', error);
    return res.status(200).json({
      reply: getFallbackResponse(req.body?.message || ''),
      usedAI: false,
    });
  }
}

function getFallbackResponse(input) {
  const text = (input || '').toLowerCase();
  
  if (text.includes('steel')) {
    return `🏗️ Steel Detailing:\n\n✅ Shop drawings\n✅ Connection design\n✅ Anchor bolts\n✅ Material lists\n\n💲 From $500\n⏰ 3-5 days`;
  }
  
  if (text.includes('service')) {
    return `Our Services:\n1. Steel Detailing - $500\n2. Rebar Detailing - $400\n3. Quantity Takeoff - $300\n4. Cost Estimation - $600\n5. BOQ Preparation - $450\n6. Shop Drawings - $550`;
  }
  
  if (text.includes('price')) {
    return `Pricing from $300 to $600 depending on service.`;
  }
  
  if (text.includes('contact')) {
    return `📞 Contact:\n📧 info@civilpro.com\n📞 +1 (555) 123-4567`;
  }
  
  if (text.includes('hi') || text.includes('hello')) {
    return `Hello! 😊 Ask me about services, pricing, or contact.`;
  }
  
  return `I can help with services, pricing, and contact info.`;
}