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
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fallback responses
  const getFallbackResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('boq')) {
      return `📋 BOQ Preparation:\n\n✅ Tender BOQ preparation\n✅ Item descriptions\n✅ Unit rate analysis\n✅ Quantity verification\n✅ Contract documentation\n\n💲 From $450\n⏰ 3-6 business days`;
    }
    
    if (input.includes('steel')) {
      return `🏗️ Steel Detailing:\n\n✅ Structural steel shop drawings\n✅ Connection design\n✅ Anchor bolt plans\n✅ Material lists\n✅ Erection drawings\n\n💲 From $500\n⏰ 3-5 business days`;
    }
    
    if (input.includes('rebar')) {
      return `🔩 Rebar Detailing:\n\n✅ Bar bending schedules\n✅ Placement drawings\n✅ Reinforcement details\n\n💲 From $400\n⏰ 2-4 business days`;
    }
    
    if (input.includes('service')) {
      return `Our Services:\n\n1️⃣ Steel Detailing - $500\n2️⃣ Rebar Detailing - $400\n3️⃣ Quantity Takeoff - $300\n4️⃣ Cost Estimation - $600\n5️⃣ BOQ Preparation - $450\n6️⃣ Shop Drawings - $550`;
    }
    
    if (input.includes('contact')) {
      return `📞 Contact:\n\n📧 info@civilpro.com\n📞 +1 (555) 123-4567\n💬 WhatsApp: +1 (555) 123-4567`;
    }
    
    if (input.includes('hi') || input.includes('hello')) {
      return `Hello! 😊 Ask me about our services, pricing, or delivery times!`;
    }
    
    return `I can help with:\n✅ Services\n✅ Pricing\n✅ Delivery times\n✅ Contact info`;
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

    try {
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
          setMessages(prev => [...prev, {
            type: 'bot',
            text: data.reply,
            time: new Date().toLocaleTimeString(),
            usedAI: true,
          }]);
        } else {
          const fallbackReply = getFallbackResponse(userInput);
          setMessages(prev => [...prev, {
            type: 'bot',
            text: fallbackReply,
            time: new Date().toLocaleTimeString(),
            usedAI: false,
          }]);
        }
      } else {
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
      const fallbackReply = getFallbackResponse(userInput);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: fallbackReply,
        time: new Date().toLocaleTimeString(),
        usedAI: false,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    'What services do you offer?',
    'How much does steel detailing cost?',
    'What is the delivery time?',
    'How can I contact you?',
  ];

  return (
    <>
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

      {isOpen && (
        <div className="fixed bottom-24 left-8 z-50 w-96 max-w-[calc(100vw-4rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl mr-3">
                🤖
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">CivilPro Assistant</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                  AI Powered - Gemini
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-2 flex-shrink-0">
                    🤖
                  </div>
                )}
                <div className={`max-w-[75%] p-3 rounded-2xl ${
                  message.type === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                      {message.time}
                    </p>
                    {message.usedAI && <span className="text-xs text-green-500">AI ✨</span>}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-2">🤖</div>
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
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
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