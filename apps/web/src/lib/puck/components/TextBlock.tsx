import React from 'react';

interface TextBlockProps {
  content: string;
  textAlign: 'left' | 'center' | 'right';
  fontSize: string;
  color: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  content,
  textAlign,
  fontSize,
  color,
}) => {
  return (
    <p
      className={`${fontSize} leading-relaxed`}
      style={{
        textAlign,
        color: color === 'inherit' ? undefined : color,
      }}
    >
      {content}
    </p>
  );
};

// Puck component configuration
export const TextBlockConfig = {
  fields: {
    content: { type: 'textarea' },
    textAlign: {
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    fontSize: {
      type: 'select',
      options: [
        { label: 'Small', value: 'text-sm' },
        { label: 'Base', value: 'text-base' },
        { label: 'Large', value: 'text-lg' },
        { label: 'XL', value: 'text-xl' },
        { label: '2XL', value: 'text-2xl' },
        { label: '3XL', value: 'text-3xl' },
        { label: '4XL', value: 'text-4xl' },
      ],
    },
    color: {
      type: 'select',
      options: [
        { label: 'Default', value: 'inherit' },
        { label: 'Primary', value: '#3B82F6' },
        { label: 'Secondary', value: '#6B7280' },
        { label: 'Success', value: '#10B981' },
        { label: 'Warning', value: '#F59E0B' },
        { label: 'Error', value: '#EF4444' },
        { label: 'Dark', value: '#1F2937' },
        { label: 'Light', value: '#F9FAFB' },
      ],
    },
  },
  defaultProps: {
    content: 'Enter your text here...',
    textAlign: 'left',
    fontSize: 'text-base',
    color: 'inherit',
  },
  render: TextBlock,
};
