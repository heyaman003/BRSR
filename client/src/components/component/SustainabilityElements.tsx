import React from 'react';

interface ElementProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Leaf: React.FC<ElementProps> = ({ className = '', style = {} }) => {
  return (
    <div 
      className={`leaf ${className}`} 
      style={style}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M21 3C21 3 15.9775 3.54825 12.5 7.5C10.0343 10.298 10.3757 12.3674 10 14C9.6243 15.6326 8.33333 18 5 18C5 18 8.5 20.5 12.5 18C17.273 15 21 9 21 3Z" 
          fill="rgba(104, 211, 145, 0.7)" 
          stroke="rgba(104, 211, 145, 0.9)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M11 15.5C11 15.5 9.5 13.5 8 12" 
          stroke="rgba(104, 211, 145, 0.9)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Flower: React.FC<ElementProps> = ({ className = '', style = {} }) => {
  return (
    <div 
      className={`${className}`} 
      style={style}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
          fill="rgba(255, 195, 170, 0.5)" 
        />
        <path 
          d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
          fill="rgba(255, 150, 141, 0.8)" 
        />
        <path 
          d="M12 9C12 7.5 13 5 14.5 3.5C16 2 19 2 19 2C19 2 19 5 17.5 6.5C16 8 13.5 9 12 9Z" 
          fill="rgba(104, 211, 145, 0.8)" 
        />
        <path 
          d="M15 12C16.5 12 19 13 20.5 14.5C22 16 22 19 22 19C22 19 19 19 17.5 17.5C16 16 15 13.5 15 12Z" 
          fill="rgba(104, 211, 145, 0.8)" 
        />
        <path 
          d="M12 15C12 16.5 11 19 9.5 20.5C8 22 5 22 5 22C5 22 5 19 6.5 17.5C8 16 10.5 15 12 15Z" 
          fill="rgba(104, 211, 145, 0.8)" 
        />
        <path 
          d="M9 12C7.5 12 5 11 3.5 9.5C2 8 2 5 2 5C2 5 5 5 6.5 6.5C8 8 9 10.5 9 12Z" 
          fill="rgba(104, 211, 145, 0.8)" 
        />
      </svg>
    </div>
  );
};

export const Cloud: React.FC<ElementProps> = ({ className = '', style = {} }) => {
  return (
    <div 
      className={`${className}`} 
      style={style}
    >
      <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M93.3333 31.6667C93.3333 23.9269 87.0731 17.6667 79.3333 17.6667C78.2588 17.6667 77.2144 17.7871 76.2132 18.0156C72.9853 9.16452 64.5746 3 54.5833 3C42.2003 3 32.17 12.2814 31.0046 24.3052C30.1168 23.9998 29.1579 23.8333 28.1667 23.8333C20.427 23.8333 14.1667 30.0936 14.1667 37.8333C14.1667 45.1007 19.7085 51.0411 26.7857 51.7882C26.7857 51.7882 26.7857 51.7942 26.7917 51.7942H86.2083C86.2083 51.7942 86.2143 51.7882 86.2143 51.7882C90.2893 51.1729 93.3333 46.9159 93.3333 41.8333C93.3333 41.8333 93.3333 33.7231 93.3333 31.6667Z" 
          fill="rgba(255, 255, 255, 0.9)" 
        />
      </svg>
    </div>
  );
};