import React from 'react';
import { User } from '@/lib/types';

interface UserCardProps {
  user: User;
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, index }) => {
  // Calculate delay for staggered animation
  const delay = `${index * 50}ms`;

  return (
    <div 
      className="glass bg-card rounded-xl p-6 animate-scale-in hover:shadow-md transition-all duration-300 relative overflow-hidden group"
      style={{ animationDelay: delay }}
    >
      {/* Background pattern - only visible on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
      {/* Decorative leaf corner - only visible on hover */}
      <div className="absolute -bottom-8 -right-8 w-16 h-16 rotate-45 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="flex-shrink-0 transform group-hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-medium shadow-md">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <span>{user.name.charAt(0)}</span>
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">{user.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;