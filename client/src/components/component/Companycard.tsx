import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import IconAnimation from './IconAnimation';

interface CompanyCardProps {
  id: number;
  name: string;
  className?: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ id, name, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(id, name)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: id * 0.1 }}
      className={cn(
        "card-container border p-6 flex flex-col items-center justify-center transition-all duration-500 bg-green-50 cursor-pointer rounded-md",
        isHovered ? "transform -trangreen-y-2" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full">
        <IconAnimation id={id} />
        
        <div className="mt-6 text-center">
          <div className="text-xs font-medium text-green-500 mb-1 opacity-80">
            Company
          </div>
          <h3 className="text-xl font-semibold tracking-tight mb-2">{name}</h3>
          
          <div className={cn(
            "w-12 h-0.5 mx-auto mt-3 mb-4 transition-all duration-300",
            isHovered ? "w-24 bg-green-800" : "bg-green-300"
          )}></div>
          
          <div className="flex justify-center space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-500",
                  isHovered ? "bg-green-800" : "bg-green-300",
                  isHovered && i === 2 ? "w-3" : ""
                )} 
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;