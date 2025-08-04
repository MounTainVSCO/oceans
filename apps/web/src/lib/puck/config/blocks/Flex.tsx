import React from 'react';
import { ComponentConfig } from '@measured/puck';

export type FlexProps = {
  direction?: 'row' | 'column';
  gap?: number;
  align?: string;
  justify?: string;
  items?: React.ReactNode[];
};

export const Flex: ComponentConfig<FlexProps> = {
  fields: {
    direction: {
      type: 'select',
      label: 'Direction',
      options: [
        { label: 'Row', value: 'row' },
        { label: 'Column', value: 'column' },
      ],
    },
    gap: { type: 'number', label: 'Gap', min: 0, max: 64 },
    align: { type: 'text', label: 'Align Items' },
    justify: { type: 'text', label: 'Justify Content' },
    items: { type: 'slot', label: 'Items' },
  },
  defaultProps: {
    direction: 'row',
    gap: 0,
    align: 'stretch',
    justify: 'flex-start',
    items: [],
  },
  render: ({ direction = 'row', gap = 0, align, justify, items }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        gap,
        alignItems: align,
        justifyContent: justify,
      }}
    >
      {items}
    </div>
  ),
};
