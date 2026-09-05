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

    // Build conversation context
    const systemPrompt = `You are CivilPro Assistant, an AI chatbot for CivilPro Services, a professional civil engineering company.

OUR SERVICES:
1. Steel Detailing - from $500 (3-5 days)
2. Rebar Detailing - from $400 (2-4 days)
3. Quantity Takeoff - from $300 (1-3 days)
4. Cost Estimation - from $600 (4-7 days)
5. BOQ Preparation - from $450 (3-6 days)
6. Shop Drawings - from $550 (4-6 days)

CONTACT:
- Email: info@civilpro.com
- Phone: +1 (555) 123-4567
- WhatsApp: +1 (555) 123-4567
- Address: 123 Engineering St, City, State 12345
- Hours: Mon-Sat 9AM-6PM

COMPANY:
- 10+ Years Experience
- 500+ Projects Completed
- 200+ Happy Clients
- 4.9/5 Rating

Be professional, helpful, and concise. Answer questions about our services, pricing, timelines, and company information.`;

    // Build full conversation
    let fullPrompt = systemPrompt;
    
    if (history && history.length > 0) {
      const recentHistory = history.slice(-6);
      recentHistory.forEach(msg => {
        if (msg.type === 'user') {
          fullPrompt += `\n\nUser: ${msg.text}`;
        } else {
          fullPrompt += `\nAssistant: ${msg.text}`;
        }
      });
    }
    
    fullPrompt += `\n\nUser: ${message}\nAssistant:`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topK: 40,
            topP: 0.8,
          },
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (reply && reply.trim()) {
        return res.status(200).json({
          reply: reply,
          usedAI: true,
        });
      }
    }

    // Fallback if AI fails
    return res.status(200).json({
      reply: getFallbackResponse(message),
      usedAI: false,
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(200).json({
      reply: getFallbackResponse(req.body?.message || ''),
      usedAI: false,
    });
  }
}

function getFallbackResponse(userInput) {
  const input = (userInput || '').toLowerCase();
  
  if (input.includes('steel')) {
    return `🏗️ Steel Detailing:\n\n✅ Structural steel shop drawings\n✅ Connection design\n✅ Anchor bolt plans\n✅ Material lists\n✅ Erection drawings\n\n💲 From $500\n⏰ 3-5 business days`;
  }
  
  if (input.includes('rebar')) {
    return `🔩 Rebar Detailing:\n\n✅ Bar bending schedules\n✅ Placement drawings\n✅ Reinforcement details\n\n💲 From $400\n⏰ 2-4 business days`;
  }
  
  if (input.includes('quantity') || input.includes('takeoff')) {
    return `📏 Quantity Takeoff:\n\n✅ Material quantities\n✅ Area calculations\n✅ Digital reports\n\n💲 From $300\n⏰ 1-3 business days`;
  }
  
  if (input.includes('cost') || input.includes('estimat')) {
    return `💰 Cost Estimation:\n\n✅ Material costs\n✅ Labor costs\n✅ Budget planning\n\n💲 From $600\n⏰ 4-7 business days`;
  }
  
  if (input.includes('boq')) {
    return `📋 BOQ Preparation:\n\n✅ Tender BOQ\n✅ Rate analysis\n✅ Documentation\n\n💲 From $450\n⏰ 3-6 business days`;
  }
  
  if (input.includes('shop') || input.includes('drawing')) {
    return `📐 Shop Drawings:\n\n✅ Fabrication drawings\n✅ Installation drawings\n\n💲 From $550\n⏰ 4-6 business days`;
  }
  
  if (input.includes('service')) {
    return `Our 6 Services:\n\n1️⃣ Steel Detailing - $500\n2️⃣ Rebar Detailing - $400\n3️⃣ Quantity Takeoff - $300\n4️⃣ Cost Estimation - $600\n5️⃣ BOQ Preparation - $450\n6️⃣ Shop Drawings - $550`;
  }
  
  if (input.includes('price') || input.includes('how much')) {
    return `💲 Pricing:\n\nSteel: $500\nRebar: $400\nQuantity: $300\nCost: $600\nBOQ: $450\nShop Drawings: $550`;
  }
  
  if (input.includes('time') || input.includes('delivery')) {
    return `⏰ Delivery:\n\nQuantity: 1-3 days\nRebar: 2-4 days\nSteel: 3-5 days\nBOQ: 3-6 days\nShop: 4-6 days\nCost: 4-7 days`;
  }
  
  if (input.includes('contact') || input.includes('email') || input.includes('phone')) {
    return `📞 Contact:\n\n📧 info@civilpro.com\n📞 +1 (555) 123-4567\n💬 WhatsApp: +1 (555) 123-4567`;
  }
  
  if (input.includes('hi') || input.includes('hello')) {
    return `Hello! 😊 Ask me about our services, pricing, or delivery times!`;
  }
  
  if (input.includes('thank')) {
    return `You're welcome! 😊`;
  }
  
  return `I can help with:\n✅ Services\n✅ Pricing\n✅ Delivery times\n✅ Contact info`;
}