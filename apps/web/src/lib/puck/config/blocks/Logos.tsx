import React from 'react';
import { ComponentConfig } from '@measured/puck';

export type LogosProps = {
  logos: { src: string; alt?: string }[];
  columns?: number;
};

export const Logos: ComponentConfig<LogosProps> = {
  fields: {
    logos: {
      type: 'array',
      label: 'Logos',
      of: {
        type: 'object',
        fields: {
          src: { type: 'text', label: 'Image URL' },
          alt: { type: 'text', label: 'Alt Text' },
        },
      },
    },
    columns: { type: 'number', label: 'Columns', min: 1, max: 8 },
  },
  defaultProps: {
    logos: [],
    columns: 4,
  },
  render: ({ logos, columns = 4 }) => (
    <div
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 24,
        alignItems: 'center',
      }}
    >
      {logos.map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt={logo.alt || 'Logo'}
          className="max-h-12 object-contain mx-auto"
          style={{ maxWidth: 120 }}
        />
      ))}
    </div>
  ),
};
