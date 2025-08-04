import React from 'react';
import { ImagePlaceholder } from './ImagePlaceholder';

interface GridItemProps {
  title: string;
  date: string;
  description?: string;
  category?: string;
  image?: boolean;
  imageUrl?: string;
  isActive?: boolean;
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
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
    <div className={`group ${className}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
        {/* Image */}
        {image && (
          <div className="mb-3">
            {imageUrl ? (
              <img 
                src={imageUrl}
                alt={title}
                className="w-full h-30 object-cover rounded-md border border-gray-200"
              />
            ) : (
              <ImagePlaceholder 
                height={120}
                className="rounded-md"
                label="Memory"
              />
            )}
          </div>
        )}
        
        {/* Header */}
        <div className="mb-2">
          <h3 className={`font-semibold text-sm leading-tight mb-1 ${
            isActive ? 'text-gray-900' : 'text-gray-500'
          }`}>
            {title}
          </h3>
          <div className="flex items-center justify-between gap-2">
            {category && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                {category}
              </span>
            )}
            <time className={`text-xs font-mono tracking-tight ${
              isActive ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {date}
            </time>
          </div>
        </div>
        
        {/* Description */}
        {description && (
          <p className={`text-xs leading-relaxed line-clamp-2 ${
            isActive ? 'text-gray-700' : 'text-gray-500'
          }`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};