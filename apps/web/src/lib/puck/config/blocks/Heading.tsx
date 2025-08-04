import React from 'react';
import { ComponentConfig } from '@measured/puck';

export type HeadingProps = {
  title: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign: 'left' | 'center' | 'right';
  color: string;
};

export const Heading: ComponentConfig<HeadingProps> = {
  fields: {
    title: { type: 'text', label: 'Title' },
    level: {
      type: 'select',
      label: 'Level',
      options: [
        { label: 'H1', value: 1 },
        { label: 'H2', value: 2 },
        { label: 'H3', value: 3 },
        { label: 'H4', value: 4 },
        { label: 'H5', value: 5 },
        { label: 'H6', value: 6 },
      ],
    },
    textAlign: {
      type: 'select',
      label: 'Text Align',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    color: {
      type: 'text',
      label: 'Color',
    },
  },
  defaultProps: {
    title: 'Heading',
    level: 2,
    textAlign: 'left',
    color: '#1F2937',
  },
  render: ({ title, level, textAlign, color }) => {
    const tag = `h${level}`;
    return React.createElement(
      tag,
      {
        className: 'font-bold mb-4',
        style: { textAlign, color },
      },
      title
    );
  },
};
