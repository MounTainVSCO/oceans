import React from 'react';
import { ComponentConfig } from '@measured/puck';

export type TemplateProps = {
  title: string;
  description: string;
  imageUrl: string;
};

export const Template: ComponentConfig<TemplateProps> = {
  fields: {
    title: { type: 'text', label: 'Title' },
    description: { type: 'textarea', label: 'Description' },
    imageUrl: { type: 'text', label: 'Image URL' },
  },
  defaultProps: {
    title: 'Template Title',
    description: 'Template description goes here...',
    imageUrl: '',
  },
  render: ({ title, description, imageUrl }) => (
    <div className="flex flex-col items-center border rounded-lg p-6 bg-gray-50">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="mb-4 rounded"
          style={{ maxWidth: 180 }}
        />
      )}
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-base mb-2 text-gray-600">{description}</p>
    </div>
  ),
};
