import React from 'react';
import { ComponentConfig } from '@measured/puck';

export type ButtonProps = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

export const Button: ComponentConfig<ButtonProps> = {
  fields: {
    label: { type: 'text', label: 'Label' },
    href: { type: 'text', label: 'Link' },
    variant: {
      type: 'select',
      label: 'Variant',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
    },
  },
  defaultProps: {
    label: 'Button',
    href: '#',
    variant: 'primary',
  },
  render: ({ label, href, variant = 'primary' }) => (
    <a
      href={href}
      className={
        variant === 'primary'
          ? 'inline-block px-5 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition'
          : 'inline-block px-5 py-2 rounded bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition'
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  ),
};
