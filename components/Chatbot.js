import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Hello! Welcome to CivilPro Services. How can I help you today?',
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Services related
    if (input.includes('service') || input.includes('what do you')) {
      return `We offer the following services:\n\n🏗️ Steel Detailing\n🔩 Rebar Detailing\n📏 Quantity Takeoff\n💰 Cost Estimation\n📋 BOQ Preparation\n📐 Shop Drawings\n\nWhich service are you interested in?`;
    }
    
    if (input.includes('steel') || input.includes('detailing')) {
      return `Our Steel Detailing services include:\n\n✅ Structural steel shop drawings\n✅ Connection design and detailing\n✅ Anchor bolt plans\n✅ Material lists and BOM\n✅ Erection drawings\n\nStarting from $500. Would you like a free quote?`;
    }
    
    if (input.includes('rebar')) {
      return `Our Rebar Detailing services include:\n\n✅ Bar bending schedules\n✅ Rebar placement drawings\n✅ Reinforcement details\n✅ Quantity calculations\n\nStarting from $400. Need more details?`;
    }
    
    if (input.includes('quantity') || input.includes('takeoff')) {
      return `Our Quantity Takeoff services include:\n\n✅ Material quantity calculations\n✅ Area and volume calculations\n✅ Component counting\n✅ Digital takeoff reports\n\nStarting from $300. Want to get started?`;
    }
    
    if (input.includes('cost') || input.includes('estimat') || input.includes('price') || input.includes('quote')) {
      return `For accurate cost estimation, please provide:\n\n📐 Project drawings\n📏 Project size/area\n🏗️ Type of structure\n⏰ Timeline\n\nYou can use our Instant Quote Calculator or contact us for a detailed estimate.`;
    }
    
    if (input.includes('boq')) {
      return `Our BOQ Preparation services include:\n\n✅ Tender BOQ preparation\n✅ Item descriptions\n✅ Unit rate analysis\n✅ Contract documentation\n\nStarting from $450. Would you like a sample?`;
    }
    
    if (input.includes('shop') || input.includes('drawing')) {
      return `Our Shop Drawing services include:\n\n✅ Fabrication drawings\n✅ Installation drawings\n✅ As-built drawings\n✅ Assembly details\n\nStarting from $550. Want to know more?`;
    }
    
    // Contact related
    if (input.includes('contact') || input.includes('phone') || input.includes('email') || input.includes('whatsapp')) {
      return `You can reach us through:\n\n📧 Email: info@civilpro.com\n📞 Phone: +1 (555) 123-4567\n💬 WhatsApp: +1 (555) 123-4567\n\nOr use our Contact Us page!`;
    }
    
    if (input.includes('address') || input.includes('location') || input.includes('where')) {
      return `Our office is located at:\n\n📍 123 Engineering St, City, State 12345\n\nWorking Hours:\nMon-Sat: 9:00 AM - 6:00 PM\nSunday: Closed`;
    }
    
    // Pricing related
    if (input.includes('price') || input.includes('cost') || input.includes('fee') || input.includes('charge')) {
      return `Our pricing:\n\n🏗️ Steel Detailing - from $500\n🔩 Rebar Detailing - from $400\n📏 Quantity Takeoff - from $300\n💰 Cost Estimation - from $600\n📋 BOQ Preparation - from $450\n📐 Shop Drawings - from $550\n\nPrices vary based on project complexity. Get a free quote!`;
    }
    
    // Time related
    if (input.includes('time') || input.includes('delivery') || input.includes('deadline') || input.includes('how long')) {
      return `Typical delivery times:\n\n⚡ Quantity Takeoff: 1-3 days\n⚡ Rebar Detailing: 2-4 days\n⚡ Steel Detailing: 3-5 days\n⚡ BOQ Preparation: 3-6 days\n⚡ Shop Drawings: 4-6 days\n⚡ Cost Estimation: 4-7 days\n\nRush services available!`;
    }
    
    // Greetings
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return `Hello! 😊 How can I help you today? You can ask me about our services, pricing, or delivery times.`;
    }
    
    if (input.includes('thank')) {
      return `You're welcome! 😊 Is there anything else I can help you with?`;
    }
    
    if (input.includes('bye')) {
      return `Goodbye! 👋 Feel free to come back if you have more questions. Have a great day!`;
    }
    
    // Reviews/Quality
    if (input.includes('review') || input.includes('quality') || input.includes('experience')) {
      return `We have a 4.9/5 rating from 200+ happy clients! ⭐⭐⭐⭐⭐\n\nCheck out our Reviews page to see what our clients say about us.`;
    }
    
    if (input.includes('project') || input.includes('work') || input.includes('portfolio')) {
      return `We've completed 500+ projects worldwide! 🌍\n\nCheck our Portfolio section to see recent projects and case studies.`;
    }
    
    // Default response
    return `I can help you with:\n\n✅ Our services\n✅ Pricing information\n✅ Delivery times\n✅ Contact details\n✅ Project information\n\nCould you please rephrase your question? Or contact us directly for immediate assistance.`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Bot typing response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString(),
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickQuestions = [
    'What services do you offer?',
    'How much does it cost?',
    'What is delivery time?',
    'How can I contact you?',
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setUnreadCount(0);
        }}
        className="fixed bottom-24 left-8 z-50 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </>
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
                <h3 className="font-semibold">CivilPro Assistant</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  Online - Typically replies instantly
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
                      handleSendMessage({ preventDefault: () => {} });
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
                placeholder="Type your message..."
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