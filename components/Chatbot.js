import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Hello! Welcome to CivilPro Services. I\'m your AI assistant. How can I help you today?',
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getAIResponse = async (userMessage, history) => {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: history,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('AI response error:', error);
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (userInput) => {
  const input = userInput.toLowerCase();
  
  // BOQ specific
  if (input.includes('boq')) {
    return `Our BOQ Preparation service includes:\n\n✅ Tender BOQ preparation\n✅ Item descriptions and specifications\n✅ Unit rate analysis\n✅ Quantity verification\n✅ Contract documentation\n\n💲 Starting from $450\n⏰ Delivery: 3-6 business days\n\nWould you like a free quote?`;
  }
  
  // Steel Detailing
  if (input.includes('steel')) {
    return `Our Steel Detailing service includes:\n\n✅ Structural steel shop drawings\n✅ Connection design\n✅ Anchor bolt plans\n✅ Material lists (BOM)\n✅ Erection drawings\n\n💲 Starting from $500\n⏰ Delivery: 3-5 business days\n\nWant to know more?`;
  }
  
  // Rebar
  if (input.includes('rebar')) {
    return `Our Rebar Detailing service includes:\n\n✅ Bar bending schedules\n✅ Rebar placement drawings\n✅ Reinforcement details\n✅ Quantity calculations\n\n💲 Starting from $400\n⏰ Delivery: 2-4 business days`;
  }
  
  // Quantity Takeoff
  if (input.includes('quantity') || input.includes('takeoff')) {
    return `Our Quantity Takeoff service includes:\n\n✅ Material quantity calculations\n✅ Area and volume calculations\n✅ Component counting\n✅ Digital reports\n\n💲 Starting from $300\n⏰ Delivery: 1-3 business days`;
  }
  
  // Cost Estimation
  if (input.includes('cost') || input.includes('estimat')) {
    return `Our Cost Estimation service includes:\n\n✅ Material cost estimation\n✅ Labor cost calculation\n✅ Equipment analysis\n✅ Budget planning\n\n💲 Starting from $600\n⏰ Delivery: 4-7 business days`;
  }
  
  // Shop Drawings
  if (input.includes('shop') || input.includes('drawing')) {
    return `Our Shop Drawings service includes:\n\n✅ Fabrication drawings\n✅ Installation drawings\n✅ As-built drawings\n✅ Assembly details\n\n💲 Starting from $550\n⏰ Delivery: 4-6 business days`;
  }
  
  // Services general
  if (input.includes('service')) {
    return `We offer 6 professional services:\n\n1️⃣ Steel Detailing - from $500\n2️⃣ Rebar Detailing - from $400\n3️⃣ Quantity Takeoff - from $300\n4️⃣ Cost Estimation - from $600\n5️⃣ BOQ Preparation - from $450\n6️⃣ Shop Drawings - from $550\n\nWhich one would you like to know more about?`;
  }
  
  // Pricing
  if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
    return `Our pricing starts from:\n\n💰 $300 - Quantity Takeoff\n💰 $400 - Rebar Detailing\n💰 $450 - BOQ Preparation\n💰 $500 - Steel Detailing\n💰 $550 - Shop Drawings\n💰 $600 - Cost Estimation\n\nPrices vary based on project complexity. Get a free quote!`;
  }
  
  // Delivery time
  if (input.includes('time') || input.includes('delivery') || input.includes('deadline') || input.includes('how long')) {
    return `Delivery times:\n\n⚡ Quantity Takeoff: 1-3 days\n⚡ Rebar Detailing: 2-4 days\n⚡ Steel Detailing: 3-5 days\n⚡ BOQ Preparation: 3-6 days\n⚡ Shop Drawings: 4-6 days\n⚡ Cost Estimation: 4-7 days`;
  }
  
  // Contact
  if (input.includes('contact') || input.includes('email') || input.includes('phone') || input.includes('whatsapp')) {
    return `Contact us:\n\n📧 Email: info@civilpro.com\n📞 Phone: +1 (555) 123-4567\n💬 WhatsApp: +1 (555) 123-4567\n\nOr use the Contact Us page!`;
  }
  
  // Location
  if (input.includes('where') || input.includes('address') || input.includes('location')) {
    return `Our office:\n\n📍 123 Engineering St, City, State 12345\n\nWorking Hours:\nMon-Sat: 9:00 AM - 6:00 PM\nSunday: Closed`;
  }
  
  // Greetings
  if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
    return `Hello! 😊 How can I help you today?\n\nYou can ask about:\n✅ Our services\n✅ Pricing\n✅ Delivery times\n✅ Contact information`;
  }
  
  if (input.includes('thank')) {
    return `You're welcome! 😊 Is there anything else I can help you with?`;
  }
  
  if (input.includes('bye')) {
    return `Goodbye! 👋 Feel free to come back if you have more questions!`;
  }
  
  // Reviews
  if (input.includes('review') || input.includes('rating') || input.includes('quality')) {
    return `We have a ⭐ 4.9/5 rating from 200+ happy clients!\n\nVisit our Reviews page to see what clients say about us.`;
  }
  
  // Projects
  if (input.includes('project') || input.includes('portfolio') || input.includes('work')) {
    return `We've completed 500+ projects worldwide! 🌍\n\nCheck our Portfolio section for recent projects.`;
  }
  
  // Default
  return `I can help you with:\n\n✅ Our services\n✅ Pricing information\n✅ Delivery times\n✅ Contact details\n\nPlease ask about any of these topics!`;
};

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString(),
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    const history = updatedMessages
      .filter(msg => msg.type === 'user' || msg.type === 'bot')
      .slice(-10) // Last 10 messages for context
      .map(msg => ({
        type: msg.type,
        text: msg.text,
      }));

    const botResponse = await getAIResponse(inputMessage, history);

    setMessages(prev => [...prev, {
      type: 'bot',
      text: botResponse,
      time: new Date().toLocaleTimeString(),
    }]);
    setIsTyping(false);
  };

  const quickQuestions = [
    'What services do you offer?',
    'How much does steel detailing cost?',
    'What is the delivery time?',
    'How can I contact you?',
    'Do you provide free quotes?',
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 left-8 z-50 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-8 z-50 w-96 max-w-[calc(100vw-4rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl mr-3">
                🤖
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">CivilPro AI Assistant</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  {isOnline ? 'Online - AI Powered' : 'Connecting...'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-2 flex-shrink-0">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-2">
                  🤖
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 bg-white border-t">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(question);
                      const event = { preventDefault: () => {} };
                      handleSendMessage(event);
                    }}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}