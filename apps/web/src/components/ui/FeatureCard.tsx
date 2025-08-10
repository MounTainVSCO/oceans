import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={`group rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-sm ring-1 ring-[#5b4636]/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out ${className}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5e6d3] text-[#b86a50] ring-1 ring-[#5b4636]/10">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#4b3a2d]">
        {title}
      </h3>
      <p className="mt-1.5 leading-relaxed text-[#6b5748]">
        {description}
      </p>
    </div>
  );
};
