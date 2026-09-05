export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;
    
    console.log('Chatbot message:', message);
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        reply: 'OpenAI API key not configured. Please add it to environment variables.' 
      });
    }

    const systemPrompt = `You are CivilPro Assistant, an AI chatbot for CivilPro Services, a professional civil engineering company.

Your services and pricing:
- Steel Detailing: Starting from $500 (3-5 business days)
- Rebar Detailing: Starting from $400 (2-4 business days)
- Quantity Takeoff: Starting from $300 (1-3 business days)
- Cost Estimation: Starting from $600 (4-7 business days)
- BOQ Preparation: Starting from $450 (3-6 business days)
- Shop Drawings: Starting from $550 (4-6 business days)

Contact: info@civilpro.com, +1 (555) 123-4567

Be helpful, professional, and concise. Answer questions about services, pricing, timelines, and company information.`;

    const messages = [
      { role: 'system', content: systemPrompt },
    ];

    // Add conversation history
    if (history && history.length > 0) {
      history.forEach(msg => {
        messages.push({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.text,
        });
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    console.log('Sending to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI error:', errorData);
      throw new Error(errorData.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const botReply = data.choices[0].message.content;

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Chatbot error:', error);
    
    // Fallback response
    const fallbackReplies = [
      'I apologize for the technical issue. Let me help you with our services:\n\n🏗️ Steel Detailing - from $500\n🔩 Rebar Detailing - from $400\n📏 Quantity Takeoff - from $300\n💰 Cost Estimation - from $600\n📋 BOQ Preparation - from $450\n📐 Shop Drawings - from $550\n\nWhich service interests you?',
      'Sorry for the inconvenience. You can contact us directly:\n\n📧 info@civilpro.com\n📞 +1 (555) 123-4567\n\nOr visit our Services page for detailed information.',
    ];
    
    const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
    
    res.status(200).json({ reply: randomReply });
  }
}