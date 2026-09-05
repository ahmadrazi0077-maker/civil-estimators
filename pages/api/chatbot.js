export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    console.log('=== Gemini Chatbot ===');
    console.log('Message:', message);
    console.log('API Key exists:', !!apiKey);

    if (!apiKey) {
      return res.status(500).json({ 
        reply: 'Gemini API key not configured',
        usedAI: false,
      });
    }

    const systemPrompt = `You are CivilPro Assistant, an AI chatbot for CivilPro Services, a professional civil engineering company.

Services and Pricing:
- Steel Detailing: from $500 (3-5 days)
- Rebar Detailing: from $400 (2-4 days)
- Quantity Takeoff: from $300 (1-3 days)
- Cost Estimation: from $600 (4-7 days)
- BOQ Preparation: from $450 (3-6 days)
- Shop Drawings: from $550 (4-6 days)

Contact: info@civilpro.com, +1 (555) 123-4567
Hours: Mon-Sat 9AM-6PM

Company: 10+ Years, 500+ Projects, 200+ Clients, 4.9/5 Rating

Be professional, helpful, and concise. Answer questions about services, pricing, timelines, and company info.`;

    // Build conversation history
    let conversationContext = systemPrompt + '\n\n';
    
    if (history && history.length > 0) {
      const recentHistory = history.slice(-10);
      recentHistory.forEach(msg => {
        if (msg.type === 'user') {
          conversationContext += `User: ${msg.text}\n`;
        } else {
          conversationContext += `Assistant: ${msg.text}\n`;
        }
      });
    }
    
    conversationContext += `User: ${message}\nAssistant:`;

    // Gemini API call
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
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
                  text: conversationContext,
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

    console.log('Gemini Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini Error:', errorData);
      return res.status(500).json({ 
        reply: errorData.error?.message || 'Gemini API error',
        usedAI: false,
      });
    }

    const data = await response.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    console.log('Gemini Response:', botReply.substring(0, 100) + '...');

    res.status(200).json({ 
      reply: botReply,
      usedAI: true,
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      reply: error.message || 'API error',
      usedAI: false,
    });
  }
}