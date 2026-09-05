export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    console.log('=== Chatbot Debug ===');
    console.log('1. Message:', message);
    console.log('2. API Key exists:', !!apiKey);
    console.log('3. API Key length:', apiKey?.length);

    if (!apiKey) {
      console.log('❌ No API key found');
      return res.status(500).json({ 
        reply: 'Gemini API key not found. Please check .env.local',
        usedAI: false,
      });
    }

    console.log('4. API Key prefix:', apiKey.substring(0, 10) + '...');

    // Use gemini-1.5-flash (free tier)
    const model = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    console.log('5. URL:', url.replace(apiKey, 'HIDDEN'));

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are CivilPro Assistant. Answer: ${message}`,
            },
          ],
        },
      ],
    };

    console.log('6. Sending request to Gemini...');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('7. Response status:', response.status);

    const responseText = await response.text();
    console.log('8. Response body:', responseText.substring(0, 200));

    if (!response.ok) {
      console.error('❌ Gemini API error:', responseText);
      return res.status(500).json({ 
        reply: 'API Error: ' + response.status,
        usedAI: false,
      });
    }

    const data = JSON.parse(responseText);
    console.log('9. Parsed response');

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    
    console.log('✅ Success! Reply:', botReply.substring(0, 50));

    res.status(200).json({ 
      reply: botReply,
      usedAI: true,
    });
  } catch (error) {
    console.error('❌ Chatbot Error:', error.message);
    res.status(500).json({ 
      reply: 'Error: ' + error.message,
      usedAI: false,
    });
  }
}