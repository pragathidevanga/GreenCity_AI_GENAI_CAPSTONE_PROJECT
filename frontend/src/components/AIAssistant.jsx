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
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <span className="badge">
            <Sparkles size={14} />
            <span>GREEN CITY AI ASSISTANT</span>
          </span>
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)' }}>
          Ask Green City AI
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
          Get simple answers about sustainable cities, environmental practices and practical locality improvements.
        </p>
      </div>

      {/* Suggested Questions Pills */}
      <div className="card" style={{ padding: '20px' }}>
        <div className="flex-row gap-2" style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
          <HelpCircle size={16} color="var(--primary-green)" />
          <span>Suggested Questions (Click to ask):</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="suggestion-pill"
            >
              “{q}”
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        <div className="chat-header">
          <div className="flex-row gap-3">
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#1c6b3c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800 }}>✨ Green City AI Assistant</h3>
              <p style={{ fontSize: '11px', color: '#a3d9b1' }}>Powered by Generative AI Knowledgebase</p>
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
            >
              {msg.text}
            </div>
          ))}

          {isLoading && (
            <div className="chat-bubble chat-bubble-ai flex-row gap-2">
              <Loader2 size={16} className="spin" color="var(--primary-green)" />
              <span>Green City AI is thinking...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-bar">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ width: '100%', display: 'flex', gap: '12px' }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a question about urban sustainability, waste, traffic, water..."
              className="form-input"
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="btn-primary"
            >
              <span>Send</span>
              <Send size={16} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AIAssistant;
