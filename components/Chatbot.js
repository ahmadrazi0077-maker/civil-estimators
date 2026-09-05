import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Welcome to CivilPro Services!\n\nI can help you with our engineering services, pricing, and project information.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      usedAI: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format AI response - remove markdown, keep clean text
  const formatAIResponse = (text) => {
    if (!text) return '';
    
    return text
      // Remove markdown bold/italic
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      // Remove markdown headers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove markdown links
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove markdown code blocks
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      // Clean up excessive newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
    const userInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      
      // Format AI response
      const formattedReply = data.usedAI 
        ? formatAIResponse(data.reply)
        : data.reply;

      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: formattedReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          usedAI: data.usedAI,
        }]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        usedAI: false,
      }]);
      setIsTyping(false);
    }
  };

  const quickReplies = [
    { icon: '🛠️', text: 'Services', query: 'What services do you offer?' },
    { icon: '💰', text: 'Pricing', query: 'How much does steel detailing cost?' },
    { icon: '⏰', text: 'Timeline', query: 'What is the delivery time?' },
    { icon: '📞', text: 'Contact', query: 'How can I contact you?' },
  ];

  return (
    <>
      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <span className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20"></span>
        <span className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-xl transition-all duration-300 group-hover:scale-110">
          {isOpen ? (
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <div className="flex items-center">
              <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center text-xl mr-3">
                🤖
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">CivilPro Assistant</h3>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  AI Online
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[420px] overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-2 flex-shrink-0 mt-1">
                    🤖
                  </div>
                )}
                <div className={`max-w-[85%] ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-left">
                      {message.text}
                    </p>
                    <div className={`flex items-center gap-2 mt-1 ${message.type === 'user' ? 'justify-end' : ''}`}>
                      <span className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                        {message.time}
                      </span>
                      {message.usedAI && (
                        <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">AI</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-2">🤖</div>
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-3 py-2 bg-white border-t">
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(reply.query);
                      handleSendMessage({ preventDefault: () => {} });
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-xs text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    <span>{reply.icon}</span>
                    <span className="font-medium">{reply.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about services, pricing..."
                className="flex-1 px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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