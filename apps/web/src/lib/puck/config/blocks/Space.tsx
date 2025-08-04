import React from 'react';
import { ComponentConfig } from '@measured/puck';

export type SpaceProps = {
  height?: number;
};

export const Space: ComponentConfig<SpaceProps> = {
  fields: {
    height: { type: 'number', label: 'Height (px)', min: 0, max: 256 },
  },
  defaultProps: {
    height: 32,
  },
  render: ({ height = 32 }) => <div style={{ height }} />,
};
