import { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Welcome to CivilPro Services!\n\nI\'m your AI assistant. I can help you with:\n\n✅ Service information\n✅ Pricing details\n✅ Project timelines\n✅ Technical queries\n\nHow may I assist you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      usedAI: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const quickReplies = [
    { icon: '🛠️', text: 'Our Services', query: 'What services do you offer?' },
    { icon: '💰', text: 'Pricing', query: 'How much does it cost?' },
    { icon: '⏰', text: 'Delivery Time', query: 'What is the delivery time?' },
    { icon: '📞', text: 'Contact', query: 'How can I contact you?' },
  ];

  const emojis = ['😊', '👍', '🏗️', '💰', '📐', '🔩', '📏', '📋', '✅', '🎉'];

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount(1);
    }
  }, [messages.length, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

 const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!inputMessage.trim()) return;

  const userMessage = {
    type: 'user',
    text: inputMessage,
    time: new Date().toLocaleTimeString(),
  };
  
  setMessages(prev => [...prev, userMessage]);
  const userInput = inputMessage;
  setInputMessage('');
  setIsTyping(true);

  try {
    // Direct API call with full URL
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput }),
    });

    if (!response.ok) {
      throw new Error('API error');
    }

    const data = await response.json();
    
    setMessages(prev => [...prev, {
      type: 'bot',
      text: data.reply,
      time: new Date().toLocaleTimeString(),
      usedAI: data.usedAI || false,
    }]);
  } catch (error) {
    // Local fallback if API fails
    const fallbackReply = getLocalResponse(userInput);
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

// Local fallback function (component ke andar)
function getLocalResponse(input) {
  const text = input.toLowerCase();
  
  if (text.includes('service')) {
    return `Our Services:\n\n1. Steel Detailing - $500\n2. Rebar Detailing - $400\n3. Quantity Takeoff - $300\n4. Cost Estimation - $600\n5. BOQ Preparation - $450\n6. Shop Drawings - $550`;
  }
  if (text.includes('steel')) {
    return `Steel Detailing: from $500, 3-5 days delivery`;
  }
  if (text.includes('price')) {
    return `Prices from $300 to $600 depending on service`;
  }
  if (text.includes('contact')) {
    return `Contact: info@civilpro.com, +1 (555) 123-4567`;
  }
  return `I can help with services, pricing, and contact info.`;
}
    
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    const userInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    setShowEmojiPicker(false);

    try {
      const history = currentMessages
        .filter(msg => msg.type === 'user' || msg.type === 'bot')
        .slice(-8)
        .map(msg => ({ type: msg.type, text: msg.text }));

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput, history }),
      });

      const data = await response.json();

      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          usedAI: data.usedAI,
        }]);
        setIsTyping(false);
      }, 600);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'I apologize, but I\'m experiencing technical difficulties. Please try again or contact us at info@civilpro.com',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        usedAI: false,
      }]);
      setIsTyping(false);
    }
  };

  const handleQuickReply = (query) => {
    setInputMessage(query);
    const event = { preventDefault: () => {} };
    handleSendMessage(event);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages(prev => [...prev, {
        type: 'user',
        text: `📎 File attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  };

  return (
    <>
      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat with AI Assistant"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full animate-ping opacity-20 group-hover:opacity-30"></span>
        <span className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-2xl shadow-blue-600/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-700/60">
          {isOpen ? (
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <>
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
            
            <div className="relative p-5">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                    🤖
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold">CivilPro AI Assistant</h3>
                  <p className="text-sm text-blue-200 flex items-center mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                    Online • Typically replies instantly
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {/* Stats Bar */}
              <div className="mt-4 flex items-center gap-4 text-xs text-blue-200">
                <span className="flex items-center">⭐ 4.9/5 Rating</span>
                <span className="flex items-center">⚡ Fast Response</span>
                <span className="flex items-center">🔒 Secure</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[400px] overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-messageIn`}
                style={{ animationDelay: '0.1s' }}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-sm mr-2 flex-shrink-0 shadow-md">
                    🤖
                  </div>
                )}
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`p-4 rounded-2xl shadow-sm ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    <div className={`flex items-center justify-between mt-2 ${message.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                      <span className="text-xs">{message.time}</span>
                      {message.type === 'user' ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : message.usedAI ? (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">AI ✨</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-messageIn">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-sm mr-2">
                  🤖
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                  <div className="flex space-x-1.5">
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
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Quick Questions</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply.query)}
                    className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-blue-50 rounded-xl text-sm text-gray-700 hover:text-blue-700 transition-all border border-gray-100 hover:border-blue-200"
                  >
                    <span>{reply.icon}</span>
                    <span className="font-medium">{reply.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="px-4 py-2 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(inputMessage + emoji);
                      inputRef.current?.focus();
                    }}
                    className="text-2xl hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                title="Attach file"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                title="Add emoji"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
              
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-2">
              Powered by Gemini AI • CivilPro Services
            </p>
          </form>
        </div>
      )}
    </>
  );
}