
import React from 'react';
import { Sparkles, Zap, Stars } from 'lucide-react';

const SpaceLogo = ({ size = 'md', animated = true }: { size?: 'sm' | 'md' | 'lg', animated?: boolean }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg ${animated ? 'animate-pulse' : ''}`}>
        <Sparkles className={`${iconSizes[size]} text-white`} />
      </div>
      
      {animated && (
        <>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 -right-2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
        </>
      )}
    </div>
  );
};

export default SpaceLogo;
