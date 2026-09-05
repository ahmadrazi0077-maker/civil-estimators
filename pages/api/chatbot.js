export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    console.log('=== Chatbot Request ===');
    console.log('Message:', message);
    console.log('API Key exists:', !!apiKey);
    console.log('API Key prefix:', apiKey ? apiKey.substring(0, 15) + '...' : 'none');

    if (!apiKey) {
      console.log('No API key found');
      return res.status(500).json({ 
        reply: 'API key not configured',
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

Contact:
- Email: info@civilpro.com
- Phone: +1 (555) 123-4567
- WhatsApp: +1 (555) 123-4567
- Address: 123 Engineering St, City, State 12345
- Hours: Mon-Sat 9AM-6PM

Company Stats:
- 10+ Years Experience
- 500+ Projects Completed
- 200+ Happy Clients
- 4.9/5 Rating

Be professional, helpful, and concise. Answer questions about services, pricing, timelines, and company info. If user asks something unrelated, politely redirect to civil engineering topics.`;

    const messages = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history (last 10 messages)
    if (history && history.length > 0) {
      const recentHistory = history.slice(-10);
      recentHistory.forEach(msg => {
        messages.push({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.text,
        });
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    console.log('Calling OpenAI API...');
    console.log('Messages count:', messages.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI Error:', errorData);
      return res.status(500).json({ 
        reply: errorData.error?.message || 'OpenAI API error',
        usedAI: false,
      });
    }

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    
    console.log('OpenAI Response:', botReply.substring(0, 50) + '...');
    console.log('Tokens used:', data.usage?.total_tokens);

    res.status(200).json({ 
      reply: botReply,
      usedAI: true,
      tokens: data.usage?.total_tokens,
    });
  } catch (error) {
    console.error('Chatbot API Error:', error);
    res.status(500).json({ 
      reply: error.message || 'API error',
      usedAI: false,
    });
  }
}