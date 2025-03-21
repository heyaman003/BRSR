import React from 'react';
import { MessageCircle, Leaf, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatIconProps {
  isOpen: boolean;
  toggleChat: () => void;
  className?: string;
}

const ChatIcon: React.FC<ChatIconProps> = ({ isOpen, toggleChat, className }) => {
  return (
    <button
      onClick={toggleChat}
      className={cn(
        'chat-button',
        isOpen ? 'bg-white text-eco-leaf border border-eco-leaf' : 'bg-eco-leaf text-white',
        isOpen && 'rotate-90',
        className
      )}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <span className="sr-only">{isOpen ? 'Close chat' : 'Open chat'}</span>
      {isOpen ? (
        <X className="w-6 h-6 transition-transform duration-300" />
      ) : (
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <Leaf className="w-3 h-3 absolute -top-1 -right-1 text-white" />
        </div>
      )}
    </button>
  );
};

export default ChatIcon;