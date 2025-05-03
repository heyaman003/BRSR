import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

type MessageType = 'user' | 'bot';

interface ChatMessageProps {
  type: MessageType;
  content: string; 
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content, isTyping = false }) => {
  return (
    <div
      className={cn(
        'chat-message',
        type === 'user' ? 'chat-message-user' : 'chat-message-bot'
      )}
    >
      <div className="flex items-start">
        {type === 'bot' && (
          <div className="mr-2 bg-eco-leaf rounded-full p-1.5 text-white flex-shrink-0">
            <Bot className="w-3 h-3" />
          </div>
        )}
        
        <div className="flex-1">
        {isTyping ? (
          <div className="flex space-x-2">
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:0.4s]" />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
        </div>
        
        {type === 'user' && (
          <div className="ml-2 bg-white rounded-full p-1.5 text-eco-leaf flex-shrink-0">
            <User className="w-3 h-3" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;