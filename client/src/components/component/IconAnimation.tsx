import React, { useState, useEffect } from 'react';
import { Building, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconAnimationProps {
  id: number;
  className?: string;
}

const IconAnimation: React.FC<IconAnimationProps> = ({ id, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 * (id % 5)); // Staggered animation
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Alternate between two icons based on id
  const IconComponent = id % 2 === 0 ? Building : Briefcase;
  
  return (
    <div 
      className={cn(
        "transition-all duration-700 ease-out transform", 
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
        className
      )}
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative bg-white rounded-full p-3 shadow-sm">
          <IconComponent 
            className="animate-float text-slate-700 w-7 h-7" 
            strokeWidth={1.5} 
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default IconAnimation;
