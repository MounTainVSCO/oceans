import React from 'react';

interface TimelineItemProps {
  title: string;
  date: string;
  description?: string;
  isActive?: boolean;
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  date,
  description,
  isActive = true,
  className = ''
}) => {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
        isActive ? 'bg-gray-900' : 'bg-gray-300'
      }`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h4 className={`font-medium text-sm leading-tight ${
            isActive ? 'text-gray-900' : 'text-gray-400'
          }`}>
            {title}
          </h4>
          <span className={`text-xs tracking-wider uppercase ${
            isActive ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {date}
          </span>
        </div>
        {description && (
          <p className={`text-xs leading-relaxed ${
            isActive ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
