import React from 'react';
import { ComponentConfig } from '@measured/puck';

export type TextProps = {
  content: string;
  textAlign: 'left' | 'center' | 'right';
  fontSize: string;
  color: string;
};

export const Text: ComponentConfig<TextProps> = {
  fields: {
    content: { type: 'textarea', label: 'Content' },
    textAlign: {
      type: 'select',
      label: 'Text Align',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    fontSize: {
      type: 'select',
      label: 'Font Size',
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
    color: { type: 'text', label: 'Color' },
  },
  defaultProps: {
    content: 'Enter your text here...',
    textAlign: 'left',
    fontSize: 'text-base',
    color: '#1F2937',
  },
  render: ({ content, textAlign, fontSize, color }) => (
    <p className={`${fontSize} mb-4`} style={{ textAlign, color }}>
      {content}
    </p>
  ),
};
