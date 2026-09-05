export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    // OpenAI API call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for CivilPro Services, a civil engineering company. You help with steel detailing, rebar detailing, quantity takeoff, cost estimation, BOQ preparation, and shop drawings. Be professional and helpful.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      reply: 'Sorry, I encountered an error. Please try again or contact us directly.' 
    });
  }
}