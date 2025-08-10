import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
        <img className="w-14 h-14" src="images/logo.png"></img>
      <span className="text-3xl font-bold text-amber-800 tracking-tight" style={{ fontFamily: "'Amatic SC', cursive" }}>
        Milestones
      </span>
    </div>
  );
};
