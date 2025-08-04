import React from 'react';
import { DropZone } from '@measured/puck';

interface CardComponentProps {
  title: string;
  content: string;
  imageUrl: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  padding: number;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  content,
  imageUrl,
  backgroundColor,
  textColor,
  borderRadius,
  padding,
}) => {
  return (
    <div
      className="overflow-hidden shadow-lg transition-transform hover:scale-105"
      style={{
        backgroundColor:
          backgroundColor === 'transparent' ? undefined : backgroundColor,
        borderRadius: `${borderRadius}px`,
        padding: `${padding}px`,
      }}
    >
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div
        className="p-4"
        style={{ color: textColor === 'inherit' ? undefined : textColor }}
      >
        <DropZone zone="card-content" />
      </div>
    </div>
  );
};

// Puck component configuration
export const Card = {
  fields: {
    title: { type: 'text' },
    content: { type: 'textarea' },
    imageUrl: { type: 'text', label: 'Image URL' },
    backgroundColor: {
      type: 'select',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'White', value: '#FFFFFF' },
        { label: 'Gray 50', value: '#F9FAFB' },
        { label: 'Gray 100', value: '#F3F4F6' },
        { label: 'Blue 50', value: '#EFF6FF' },
        { label: 'Green 50', value: '#F0FDF4' },
      ],
    },
    textColor: {
      type: 'select',
      options: [
        { label: 'Default', value: 'inherit' },
        { label: 'Dark', value: '#1F2937' },
        { label: 'Gray', value: '#6B7280' },
        { label: 'Blue', value: '#3B82F6' },
        { label: 'Green', value: '#10B981' },
      ],
    },
    borderRadius: {
      type: 'number',
      min: 0,
      max: 32,
      label: 'Border Radius (px)',
    },
    padding: {
      type: 'number',
      min: 0,
      max: 32,
      label: 'Padding (px)',
    },
  },
  defaultProps: {
    title: 'Card Title',
    content: 'Card content goes here...',
    imageUrl: '',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    borderRadius: 8,
    padding: 16,
  },
  render: CardComponent,
};
