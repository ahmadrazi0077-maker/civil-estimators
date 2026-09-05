import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = req.body;

    const systemPrompt = `You are CivilPro Assistant, an AI chatbot for CivilPro Services, a professional civil engineering company.

Your role is to help customers with:
1. Steel Detailing services
2. Rebar Detailing services
3. Quantity Takeoff services
4. Cost Estimation services
5. BOQ Preparation services
6. Shop Drawings services

Our Services and Pricing:
- Steel Detailing: Starting from $500 (3-5 business days)
- Rebar Detailing: Starting from $400 (2-4 business days)
- Quantity Takeoff: Starting from $300 (1-3 business days)
- Cost Estimation: Starting from $600 (4-7 business days)
- BOQ Preparation: Starting from $450 (3-6 business days)
- Shop Drawings: Starting from $550 (4-6 business days)

Contact Information:
- Email: info@civilpro.com
- Phone: +1 (555) 123-4567
- WhatsApp: +1 (555) 123-4567
- Address: 123 Engineering St, City, State 12345
- Working Hours: Mon-Sat 9AM-6PM

Company Stats:
- 500+ Projects Completed
- 10+ Years Experience
- 200+ Happy Clients
- 4.9/5 Rating

Be professional, helpful, and concise. If you don't know something, suggest contacting our team directly.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: 'user', content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const botReply = completion.choices[0].message.content;

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      reply: 'Sorry, I encountered an error. Please try again or contact us directly at info@civilpro.com' 
    });
  }
}