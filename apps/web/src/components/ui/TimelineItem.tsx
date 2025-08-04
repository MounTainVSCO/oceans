import React from 'react';
import { ImagePlaceholder } from './ImagePlaceholder';

interface TimelineItemProps {
  title: string;
  date: string;
  description?: string;
  category?: string;
  image?: boolean;
  imageUrl?: string;
  isActive?: boolean;
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  date,
  description,
  category,
  image = false,
  imageUrl,
  isActive = true,
  className = ''
}) => {
  return (
    <div className={`group relative ${className}`}>
      {/* Timeline connector line */}
      <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200 group-last:hidden" />
      
      <div className="flex gap-6">
        {/* Timeline marker */}
        <div className="relative flex-shrink-0">
          <div className={`w-3 h-3 rounded-full border-2 bg-white transition-colors ${
            isActive 
              ? 'border-gray-900 shadow-sm' 
              : 'border-gray-300'
          }`} />
        </div>
        
        {/* Content */}
        <div className="flex-1 pb-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h3 className={`font-semibold text-base leading-tight mb-1 ${
                  isActive ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {title}
                </h3>
                {category && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                    {category}
                  </span>
                )}
              </div>
              <time className={`text-sm font-mono tracking-tight ${
                isActive ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {date}
              </time>
            </div>
            
            {/* Image */}
            {image && (
              <div className="mb-4">
                {imageUrl ? (
                  <img 
                    src={imageUrl}
                    alt={title}
                    className="w-full h-40 object-cover rounded-md border border-gray-200"
                  />
                ) : (
                  <ImagePlaceholder 
                    height={160}
                    className="rounded-md"
                    label="Memory"
                  />
                )}
              </div>
            )}
            
            {/* Description */}
            {description && (
              <p className={`text-sm leading-relaxed ${
                isActive ? 'text-gray-700' : 'text-gray-500'
              }`}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
