import React from 'react';

interface CalendarItemProps {
  title: string;
  date: string;
  description?: string;
  category?: string;
  image?: boolean;
  imageUrl?: string;
  isActive?: boolean;
  className?: string;
}

export const CalendarItem: React.FC<CalendarItemProps> = ({
  title,
  date,
  description,
  category,
  image = false,
  imageUrl,
  isActive = true,
  className = ''
}) => {
  // Extract day from date for calendar display
  const day = date.split(' ')[1] || date.split('/')[1] || date.slice(-2);
  
  return (
    <div className={`group flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors ${className}`}>
      {/* Calendar date box */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center shadow-sm">
          <span className="text-xs font-medium text-gray-500 uppercase leading-none">
            {date.split(' ')[0] || 'Dec'}
          </span>
          <span className="text-lg font-bold text-gray-900 leading-none">
            {day}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className={`font-semibold text-sm leading-tight ${
            isActive ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {title}
          </h3>
          {category && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md flex-shrink-0">
              {category}
            </span>
          )}
        </div>
        
        {description && (
          <p className={`text-xs leading-relaxed ${
            isActive ? 'text-gray-700' : 'text-gray-500'
          }`}>
            {description}
          </p>
        )}
        
        {image && (
          <div className="mt-3">
            {imageUrl ? (
              <img 
                src={imageUrl}
                alt={title}
                className="w-16 h-12 object-cover rounded border border-gray-200"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
                <div className="w-3 h-3 border border-gray-400 rounded-sm" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};