export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    // Simple response without external API
    const reply = getResponse(message);
    
    res.status(200).json({ reply, usedAI: false });
  } catch (error) {
    res.status(200).json({ 
      reply: 'Sorry, something went wrong. Please try again.',
      usedAI: false 
    });
  }
}

function getResponse(input) {
  const text = (input || '').toLowerCase();
  
  if (text.includes('service')) {
    return `Our 6 Services:\n\n1. Steel Detailing - $500\n2. Rebar Detailing - $400\n3. Quantity Takeoff - $300\n4. Cost Estimation - $600\n5. BOQ Preparation - $450\n6. Shop Drawings - $550`;
  }
  
  if (text.includes('steel')) {
    return `🏗️ Steel Detailing:\n\n✅ Shop drawings\n✅ Connection design\n✅ Anchor bolts\n✅ Material lists\n\n💲 From $500\n⏰ 3-5 days`;
  }
  
  if (text.includes('price') || text.includes('cost')) {
    return `💲 Pricing:\n\nSteel: $500\nRebar: $400\nQuantity: $300\nCost: $600\nBOQ: $450\nShop: $550`;
  }
  
  if (text.includes('contact')) {
    return `📞 Contact:\n📧 info@civilpro.com\n📞 +1 (555) 123-4567`;
  }
  
  if (text.includes('hi') || text.includes('hello')) {
    return `Hello! 😊 Ask me about services, pricing, or contact info.`;
  }
  
  return `I can help with services, pricing, and contact info.`;
}