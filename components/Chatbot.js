import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Hello! Welcome to CivilPro Services. I\'m your AI assistant. How can I help you today?',
      time: new Date().toLocaleTimeString(),
      usedAI: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Keyword-based fallback responses
  const getFallbackResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('yes') || input.includes('quote')) {
      return `Great! 🎉 To get your free quote:\n\n1️⃣ Visit our Contact page\n2️⃣ Share project details\n3️⃣ Get response within 24 hours\n\nOr call us: +1 (555) 123-4567`;
    }
    
    if (input.includes('boq')) {
      return `📋 BOQ Preparation:\n\n✅ Tender BOQ preparation\n✅ Item descriptions\n✅ Unit rate analysis\n✅ Quantity verification\n✅ Contract documentation\n\n💲 From $450\n⏰ 3-6 business days\n\nWould you like a free quote?`;
    }
    
    if (input.includes('steel')) {
      return `🏗️ Steel Detailing:\n\n✅ Structural steel shop drawings\n✅ Connection design\n✅ Anchor bolt plans\n✅ Material lists (BOM)\n✅ Erection drawings\n✅ 3D modeling\n\n💲 From $500\n⏰ 3-5 business days`;
    }
    
    if (input.includes('rebar')) {
      return `🔩 Rebar Detailing:\n\n✅ Bar bending schedules\n✅ Rebar placement drawings\n✅ Reinforcement details\n✅ Quantity calculations\n\n💲 From $400\n⏰ 2-4 business days`;
    }
    
    if (input.includes('quantity') || input.includes('takeoff')) {
      return `📏 Quantity Takeoff:\n\n✅ Material quantity calculations\n✅ Area and volume calculations\n✅ Component counting\n✅ Digital reports\n\n💲 From $300\n⏰ 1-3 business days`;
    }
    
    if (input.includes('cost') || input.includes('estimat')) {
      return `💰 Cost Estimation:\n\n✅ Material cost estimation\n✅ Labor cost calculation\n✅ Equipment analysis\n✅ Budget planning\n\n💲 From $600\n⏰ 4-7 business days`;
    }
    
    if (input.includes('shop') || input.includes('drawing')) {
      return `📐 Shop Drawings:\n\n✅ Fabrication drawings\n✅ Installation drawings\n✅ As-built drawings\n✅ Assembly details\n\n💲 From $550\n⏰ 4-6 business days`;
    }
    
    if (input.includes('service') || input.includes('offer')) {
      return `Our 6 Services:\n\n1️⃣ 🏗️ Steel Detailing - $500\n2️⃣ 🔩 Rebar Detailing - $400\n3️⃣ 📏 Quantity Takeoff - $300\n4️⃣ 💰 Cost Estimation - $600\n5️⃣ 📋 BOQ Preparation - $450\n6️⃣ 📐 Shop Drawings - $550\n\nType service name for details!`;
    }
    
    if (input.includes('price') || input.includes('how much')) {
      return `💲 Pricing:\n\nSteel Detailing: from $500\nRebar Detailing: from $400\nQuantity Takeoff: from $300\nCost Estimation: from $600\nBOQ Preparation: from $450\nShop Drawings: from $550`;
    }
    
    if (input.includes('time') || input.includes('delivery')) {
      return `⏰ Delivery Times:\n\n⚡ Quantity Takeoff: 1-3 days\n⚡ Rebar: 2-4 days\n⚡ Steel: 3-5 days\n⚡ BOQ: 3-6 days\n⚡ Shop Drawings: 4-6 days\n⚡ Cost: 4-7 days`;
    }
    
    if (input.includes('contact') || input.includes('email') || input.includes('phone')) {
      return `📞 Contact:\n\n📧 info@civilpro.com\n📞 +1 (555) 123-4567\n💬 WhatsApp: +1 (555) 123-4567\n\nMon-Sat: 9AM-6PM`;
    }
    
    if (input.includes('hi') || input.includes('hello')) {
      return `Hello! 😊 Ask me about:\n\n✅ Services\n✅ Pricing\n✅ Delivery times\n✅ Contact info`;
    }
    
    if (input.includes('thank')) {
      return `You're welcome! 😊 Anything else?`;
    }
    
    return `I can help with:\n\n✅ Our services\n✅ Pricing\n✅ Delivery times\n✅ Contact details\n\nTry asking: "What services do you offer?"`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString(),
    };
    
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    const userInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    if (useAI) {
      try {
        // Try OpenAI API
        const history = currentMessages
          .filter(msg => msg.type === 'user' || msg.type === 'bot')
          .slice(-10)
          .map(msg => ({
            type: msg.type,
            text: msg.text,
          }));

        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userInput,
            history: history,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.usedAI) {
            // AI response
            setMessages(prev => [...prev, {
              type: 'bot',
              text: data.reply,
              time: new Date().toLocaleTimeString(),
              usedAI: true,
            }]);
          } else {
            // API returned error, use fallback
            const fallbackReply = getFallbackResponse(userInput);
            setMessages(prev => [...prev, {
              type: 'bot',
              text: fallbackReply,
              time: new Date().toLocaleTimeString(),
              usedAI: false,
            }]);
          }
        } else {
          // API call failed, use fallback
          const fallbackReply = getFallbackResponse(userInput);
          setMessages(prev => [...prev, {
            type: 'bot',
            text: fallbackReply,
            time: new Date().toLocaleTimeString(),
            usedAI: false,
          }]);
        }
      } catch (error) {
        console.error('Chatbot error:', error);
        // Network error, use fallback
        const fallbackReply = getFallbackResponse(userInput);
        setMessages(prev => [...prev, {
          type: 'bot',
          text: fallbackReply,
          time: new Date().toLocaleTimeString(),
          usedAI: false,
        }]);
      }
    } else {
      // Use keyword-based only
      const fallbackReply = getFallbackResponse(userInput);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: fallbackReply,
          time: new Date().toLocaleTimeString(),
          usedAI: false,
        }]);
      }, 800);
    }

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
      {/* Toggle Button */}
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

      {/* Chat Window */}
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
                  {useAI ? 'AI Powered - Online' : 'Online - Smart Responses'}
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
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                      {message.time}
                    </p>
                    {message.usedAI && (
                      <span className="text-xs text-green-500">AI ✨</span>
                    )}
                  </div>
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