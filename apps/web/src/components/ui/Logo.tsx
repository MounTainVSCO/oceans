import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-8 h-8 bg-gray-900 rounded-sm mr-3 flex items-center justify-center">
        <div className="w-3 h-3 border border-white rounded-sm" />
      </div>
      <span className="text-lg font-semibold text-gray-900 tracking-tight">
        milestones
      </span>
    </div>
  );
};
