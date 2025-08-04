import React from 'react';
import { ComponentConfig } from '@measured/puck';

export type StatsProps = {
  stats: { label: string; value: string }[];
};

export const Stats: ComponentConfig<StatsProps> = {
  fields: {
    stats: {
      type: 'array',
      label: 'Stats',
      of: {
        type: 'object',
        fields: {
          label: { type: 'text', label: 'Label' },
          value: { type: 'text', label: 'Value' },
        },
      },
    },
  },
  defaultProps: {
    stats: [],
  },
  render: ({ stats }) => (
    <div className="flex flex-wrap gap-8 justify-center items-center w-full py-6">
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-gray-500 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  ),
};
