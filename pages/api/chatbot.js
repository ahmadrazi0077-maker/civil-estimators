export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6K6SdTP_Wph8sG2wLVTF6Xu7048KPP63E6RTh7-e2hj4g';

    console.log('Message:', message);
    console.log('API Key exists:', !!apiKey);

    // Gemini API call
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are CivilPro Assistant for a civil engineering company. Services: Steel Detailing $500, Rebar Detailing $400, Quantity Takeoff $300, Cost Estimation $600, BOQ Preparation $450, Shop Drawings $550. Contact: info@civilpro.com, +1 (555) 123-4567.\n\nUser: ${message}\n\nProvide a helpful, concise response.`
            }]
          }]
        }),
      }
    );

    console.log('Gemini status:', response.status);

    if (response.ok) {
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (reply) {
        return res.status(200).json({ reply, usedAI: true });
      }
    }

    // Fallback
    return res.status(200).json({
      reply: getFallback(message),
      usedAI: false,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(200).json({
      reply: getFallback(req.body?.message || ''),
      usedAI: false,
    });
  }
}

function getFallback(input) {
  const text = (input || '').toLowerCase();
  
  if (text.includes('service')) {
    return `Our 6 Services:\n\n1. Steel Detailing - $500\n2. Rebar Detailing - $400\n3. Quantity Takeoff - $300\n4. Cost Estimation - $600\n5. BOQ Preparation - $450\n6. Shop Drawings - $550`;
  }
  
  if (text.includes('price') || text.includes('cost')) {
    return `Pricing:\nSteel: $500\nRebar: $400\nQuantity: $300\nCost Estimation: $600\nBOQ: $450\nShop Drawings: $550`;
  }
  
  if (text.includes('contact')) {
    return `Contact: info@civilpro.com\nPhone: +1 (555) 123-4567`;
  }
  
  if (text.includes('hi') || text.includes('hello')) {
    return `Hello! Ask me about services, pricing, or delivery times.`;
  }
  
  return `I can help with services, pricing, and contact info.`;
}