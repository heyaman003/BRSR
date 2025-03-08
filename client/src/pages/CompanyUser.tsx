import React, { useEffect, useState } from 'react';
import CompanyHeader from '@/components/component/CompanyHeader';
import UserList from '@/components/component/UserList';
import { companyData } from '@/lib/mock-data';
import { Leaf, Flower, Cloud } from '@/components/component/SustainabilityElements';

const CompanyUser = () => {
  const [mounted, setMounted] = useState(false);
  
  // Generate random leaves for animation
  const [leaves, setLeaves] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    // Animate fade in for the entire page
    document.documentElement.style.opacity = '0';
    setTimeout(() => {
      document.documentElement.style.opacity = '1';
      setMounted(true);
    }, 50);
    
    // Create leaves for animation
    const leafElements = [];
    for (let i = 0; i < 15; i++) {
      const delay = Math.random() * 20;
      const duration = 15 + Math.random() * 30;
      const size = 15 + Math.random() * 15;
      const left = Math.random() * 100;
      
      leafElements.push(
        <Leaf 
          key={i}
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            width: `${size}px`,
            height: `${size}px`
          }}
        />
      );
    }
    setLeaves(leafElements);
    
    return () => {
      document.documentElement.style.opacity = '1';
    };
  }, []);

  return (
    <div className="bg-green-100 min-h-screen bg-gradient-to-b from-background to-accent/50 pb-16 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {mounted && leaves}
        <Cloud className="absolute top-[10%] right-[10%] opacity-50 animate-float" />
        <Cloud className="absolute top-[25%] left-[5%] opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <Flower className="absolute bottom-[10%] left-[7%] opacity-70 animate-pulse-grow" />
        <Flower className="absolute bottom-[20%] right-[8%] opacity-60 animate-pulse-grow" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Content */}
      <div className="container max-w-5xl mx-auto relative z-10">
        <CompanyHeader company={companyData} />
        <UserList users={companyData.users} />
      </div>
    </div>
  );
};

export default CompanyUser;