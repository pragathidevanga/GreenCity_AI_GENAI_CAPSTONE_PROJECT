import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Loader2, HelpCircle } from 'lucide-react';

const suggestedQuestions = [
  'How can we save water?',
  'How can we reduce waste?',
  'How can we improve public transport?',
  'How can we increase EV adoption?'
];

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am Green City AI Assistant. I can help answer questions about urban sustainability, waste segregation, water conservation, solar efficiency, traffic management, and electric vehicles. How can I assist your locality today?'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsgObj]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      const data = await response.json();

      if (data.success && data.reply) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: data.reply
          }
        ]);
      } else {
        throw new Error(data.error || 'Failed to get reply');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'To improve sustainability, Green City AI recommends implementing rainwater harvesting, source waste segregation, smart LED lighting, and expanding EV charging networks. Feel free to ask a specific topic!'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#14532D] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>GREEN CITY AI ASSISTANT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#17321F]">
          Ask Green City AI
        </h1>
        <p className="text-base text-[#66756B] max-w-xl mx-auto">
          Get simple answers about sustainable cities, environmental practices and practical locality improvements.
        </p>
      </div>

      {/* Suggested Questions Pills */}
      <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 custom-shadow space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#66756B] uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#14532D]" />
          <span>Suggested Questions (Click to ask):</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3.5 py-2 rounded-xl bg-[#EAF6EC] text-[#14532D] text-xs font-bold hover:bg-emerald-200 transition-colors border border-emerald-200 text-left cursor-pointer"
            >
              “{q}”
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-emerald-900/10 custom-shadow flex flex-col h-[520px] overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-[#14532D] text-white p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-emerald-200">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5">
                <span>✨ Green City AI Assistant</span>
              </h3>
              <p className="text-xs text-emerald-200">Powered by Generative AI & Sustainability Knowledgebase</p>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Message List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F7FAF7]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-[#14532D] text-white'
                    : 'bg-emerald-100 text-[#14532D] border border-emerald-200'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-lg p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#14532D] text-white rounded-tr-none shadow-sm'
                    : 'bg-white text-[#17321F] rounded-tl-none border border-emerald-900/10 shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white p-4 rounded-2xl text-xs font-semibold text-[#66756B] flex items-center gap-2 border border-emerald-900/10 shadow-xs">
                <Loader2 className="w-4 h-4 animate-spin text-[#14532D]" />
                <span>Green City AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question about urban sustainability, waste, traffic, water..."
              className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#14532D] focus:ring-2 focus:ring-emerald-200 outline-hidden text-sm text-[#17321F]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-6 py-3.5 rounded-xl bg-[#14532D] text-white font-bold text-sm shadow-md hover:bg-[#1b683a] disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AIAssistant;
