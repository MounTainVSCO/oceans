import React from 'react';

interface ImagePlaceholderProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  label?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = '100%',
  height = 200,
  className = '',
  label = 'Image'
}) => {
  return (
    <div
      className={`bg-gray-100 border border-gray-200 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center">
        <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded-sm flex items-center justify-center">
          <div className="w-4 h-4 border border-gray-400 rounded-sm" />
        </div>
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
};
