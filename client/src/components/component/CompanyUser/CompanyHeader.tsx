import React from 'react';
import { Company } from '@/lib/types';

interface CompanyHeaderProps {
  company: Company;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company }) => {
  return (
    <header className="w-full mb-12">
      <div className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-4">
        <div className="relative">
          {/* Animated background circles */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-200 to-emerald-200 opacity-70 blur-md animate-pulse-grow"></div>
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 opacity-50 blur-lg animate-pulse-grow" style={{ animationDelay: '1s' }}></div>
          
          {/* Logo container */}
          <div className="relative w-20 h-20 mb-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="w-12 h-12 object-contain" 
              />
            ) : (
              <span className="text-3xl font-bold text-white capitalize">
                {company.name.charAt(0)}
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-2 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <h1 className="text-4xl font-bold tracking-tight text-emerald-800 dark:text-emerald-300 capitalize">{company.name}</h1>
        </div>
      </div>
    </header>
  );
};

export default CompanyHeader;