import React, { useState, useRef, useEffect } from 'react';
import { Send, Leaf, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';
import ChatIcon from './ChatIcon';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
}

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your eco-friendly assistant. How can I help you today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I'm here to help with eco-friendly solutions.",
        "Sustainability is at the core of what we do.",
        "Let me find a green alternative for you.",
        "Small changes can make a big environmental impact.",
        "How else can I assist with your sustainability goals?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: randomResponse
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="chat-container">
      {isOpen && (
        <div className={cn(
          "chat-box leaf-pattern",
          isOpen ? "animate-scale-in" : "animate-scale-out"
        )}>
          <div className="chat-header text-white">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Eco Assistant</h3>
                <p className="text-xs text-white/70">Powered by sustainable AI</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                type={message.type}
                content={message.content}
              />
            ))}
            
            {isTyping && (
              <ChatMessage type="bot" content="" isTyping={true} />
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="chat-input-container">
            <div className="chat-input">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={cn(
                  "p-1.5 rounded-full transition-all duration-200",
                  inputValue.trim() 
                    ? "bg-eco-leaf text-white" 
                    : "bg-gray-200 text-gray-500"
                )}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 flex justify-center">
              <span className="text-xs flex items-center text-gray-400">
                <Sparkles className="w-3 h-3 mr-1 text-eco-leaf" />
                Powered by sustainable energy
              </span>
            </div>
          </form>
        </div>
      )}
      
      <ChatIcon isOpen={isOpen} toggleChat={toggleChat} />
    </div>
  );
};

export default ChatBox;