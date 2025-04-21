import React, { useState, useRef, useEffect } from 'react';
import { Send, Leaf, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatMessage from './ChatMessage';
import ChatIcon from './ChatIcon';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  isTyping?: boolean;
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
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  
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

  useEffect(() => {
    if (!isBotTyping) return;
  
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.type !== 'bot' || !lastMessage.isTyping) return;
  
    const fullResponse = lastMessage.content;
    let currentText = '';
    let charIndex = 0;
  
    const typeNextChar = () => {
      if (charIndex >= fullResponse.length) {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { ...lastMessage, content: fullResponse, isTyping: false }
        ]);
        setIsBotTyping(false);
        return;
      }
  
      currentText += fullResponse[charIndex];
      charIndex++;
  
      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...lastMessage, content: currentText, isTyping: true }
      ]);
  
      const baseDelay = 30;
      const variableDelay = Math.random() * 50;
      const delay = baseDelay + variableDelay;
  
      typingTimeoutRef.current = setTimeout(typeNextChar, delay);
    };
  
    typeNextChar();

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isBotTyping, messages]);
  

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    // Add temporary bot message with typing indicator
    const botTypingMessage: Message = {
      id: `typing-${Date.now()}`,
      type: 'bot',
      content: '',
      isTyping: true
    };
    
    setMessages(prev => [...prev, botTypingMessage]);
    setIsBotTyping(true);
    
    try {
      // Make API call to your backend for OpenAI response
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/chat/openai`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
        },
        credentials: "include",
        body: JSON.stringify({ question: inputValue }),
      });

      const data = await response.json();

      // Replace typing message with actual response
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: data.answer,
          isTyping: false
        }
      ]);
      setIsBotTyping(false);
      
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        {
          id: `error-${Date.now()}`,
          type: 'bot',
          content: 'Sorry, I could not process your request. Please try again later.',
          isTyping: false
        }
      ]);
      setIsBotTyping(false);
    }
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
                isTyping={message.isTyping}
              />
            ))}
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
                disabled={isBotTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isBotTyping}
                className={cn(
                  "p-1.5 rounded-full transition-all duration-200",
                  inputValue.trim() && !isBotTyping
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
                Powered by Kalolwala & Associates
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