export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    console.log('=== Chatbot Debug ===');
    console.log('Message:', message);
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
    console.log('API Key length:', process.env.OPENAI_API_KEY?.length);
    console.log('API Key prefix:', process.env.OPENAI_API_KEY?.substring(0, 10));

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        reply: 'API key not configured. Please check environment variables.' 
      });
    }

    // Test OpenAI API with simple fetch
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
            content: 'You are a helpful assistant for CivilPro Services, a civil engineering company.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    console.log('OpenAI Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI Error Details:', errorData);
      
      return res.status(500).json({
        reply: `OpenAI Error: ${errorData.error?.message || 'Unknown error'}`
      });
    }

    const data = await response.json();
    console.log('OpenAI Response:', data.choices[0].message.content);

    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Chatbot Error:', error);
    res.status(500).json({ 
      reply: `Error: ${error.message}` 
    });
  }
}