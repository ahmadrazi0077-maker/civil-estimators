export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log('=== Gemini Debug ===');
    console.log('Message:', message);
    console.log('Key exists:', !!apiKey);
    
    // Try Gemini API
    if (apiKey) {
      try {
        console.log('Calling Gemini...');
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are CivilPro Assistant. User said: "${message}". Provide a helpful response about civil engineering services.`
                }]
              }]
            }),
          }
        );
        
        console.log('Gemini status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Gemini data:', JSON.stringify(data).substring(0, 200));
          
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply && reply.trim()) {
            console.log('✅ AI Response:', reply.substring(0, 100));
            return res.status(200).json({ reply, usedAI: true });
          }
        } else {
          const errorText = await response.text();
          console.error('❌ Gemini error:', errorText.substring(0, 200));
        }
      } catch (aiError) {
        console.error('❌ Gemini exception:', aiError.message);
      }
    } else {
      console.log('❌ No API key found');
    }
    
    // Fallback
    console.log('Using fallback response');
    return res.status(200).json({
      reply: getFallbackResponse(message),
      usedAI: false,
    });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(200).json({
      reply: getFallbackResponse(req.body?.message || ''),
      usedAI: false,
    });
  }
}

function getFallbackResponse(userInput) {
  const input = (userInput || '').toLowerCase().trim();
  
  // Number inputs
  if (input === '1' || input.includes('steel')) {
    return `🏗️ Steel Detailing Service:\n\n✅ Structural steel shop drawings\n✅ Connection design and detailing\n✅ Anchor bolt plans\n✅ Material lists (BOM)\n✅ Erection drawings\n✅ 3D modeling\n\n💲 Starting from $500\n⏰ Delivery: 3-5 business days\n\nWant to get a free quote?`;
  }
  
  if (input === '2' || input.includes('rebar')) {
    return `🔩 Rebar Detailing Service:\n\n✅ Bar bending schedules\n✅ Rebar placement drawings\n✅ Reinforcement details\n✅ Quantity calculations\n✅ Development length\n\n💲 Starting from $400\n⏰ Delivery: 2-4 business days`;
  }
  
  if (input === '3' || input.includes('quantity') || input.includes('takeoff')) {
    return `📏 Quantity Takeoff Service:\n\n✅ Material quantity calculations\n✅ Area and volume calculations\n✅ Component counting\n✅ Waste factor analysis\n✅ Digital reports\n\n💲 Starting from $300\n⏰ Delivery: 1-3 business days`;
  }
  
  if (input === '4' || input.includes('cost') || input.includes('estimat')) {
    return `💰 Cost Estimation Service:\n\n✅ Material cost estimation\n✅ Labor cost calculation\n✅ Equipment analysis\n✅ Budget planning\n\n💲 Starting from $600\n⏰ Delivery: 4-7 business days`;
  }
  
  if (input === '5' || input.includes('boq')) {
    return `📋 BOQ Preparation Service:\n\n✅ Tender BOQ preparation\n✅ Item descriptions\n✅ Unit rate analysis\n✅ Quantity verification\n✅ Contract documentation\n\n💲 Starting from $450\n⏰ Delivery: 3-6 business days`;
  }
  
  if (input === '6' || input.includes('shop') || input.includes('drawing')) {
    return `📐 Shop Drawings Service:\n\n✅ Fabrication drawings\n✅ Installation drawings\n✅ As-built drawings\n✅ Assembly details\n\n💲 Starting from $550\n⏰ Delivery: 4-6 business days`;
  }
  
  if (input.includes('service') || input.includes('offer')) {
    return `Our 6 Services:\n\n1️⃣ Steel Detailing - $500\n2️⃣ Rebar Detailing - $400\n3️⃣ Quantity Takeoff - $300\n4️⃣ Cost Estimation - $600\n5️⃣ BOQ Preparation - $450\n6️⃣ Shop Drawings - $550\n\nType a number (1-6) for service details!`;
  }
  
  if (input.includes('price') || input.includes('how much')) {
    return `💲 Pricing:\n\n1. Steel Detailing: from $500\n2. Rebar Detailing: from $400\n3. Quantity Takeoff: from $300\n4. Cost Estimation: from $600\n5. BOQ Preparation: from $450\n6. Shop Drawings: from $550`;
  }
  
  if (input.includes('time') || input.includes('delivery') || input.includes('when')) {
    return `⏰ Delivery Times:\n\nQuantity Takeoff: 1-3 days\nRebar Detailing: 2-4 days\nSteel Detailing: 3-5 days\nBOQ: 3-6 days\nShop Drawings: 4-6 days\nCost Estimation: 4-7 days`;
  }
  
  if (input.includes('contact') || input.includes('email') || input.includes('phone')) {
    return `📞 Contact Us:\n\n📧 info@civilpro.com\n📞 +1 (555) 123-4567\n💬 WhatsApp: +1 (555) 123-4567\n\nMon-Sat: 9AM-6PM`;
  }
  
  if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
    return `Hello! 😊 I can help with:\n\n✅ Service details\n✅ Pricing\n✅ Delivery times\n✅ Contact info\n\nType a number (1-6) for service details!`;
  }
  
  if (input.includes('yes') || input.includes('quote')) {
    return `Great! 🎉 For a free quote:\n\n📞 Call: +1 (555) 123-4567\n📧 Email: info@civilpro.com\n\nOr visit our Contact page!`;
  }
  
  if (input.includes('thank')) {
    return `You're welcome! 😊 Anything else?`;
  }
  
  return `I can help with:\n\n✅ Services (type 1-6)\n✅ Pricing\n✅ Delivery times\n✅ Contact info\n\nType "services" to see all services!`;
}