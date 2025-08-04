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
    <div className={`text-center ${className}`}>
      <div className="w-12 h-12 bg-gray-900 rounded-sm flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
};
