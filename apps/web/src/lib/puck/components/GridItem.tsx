import React from 'react';
import { DropZone } from '@measured/puck';

interface GridItemProps {
  columnSpan: number;
  rowSpan: number;
  backgroundColor: string;
  padding: number;
}

export const GridItem: React.FC<GridItemProps> = ({
  columnSpan,
  rowSpan,
  backgroundColor,
  padding,
}) => {
  const getColumnSpan = (span: number) => {
    // Responsive column spans
    return {
      base: `span-${Math.min(span, 1)}`,
      md: `span-${Math.min(span, 2)}`,
      lg: `span-${span}`,
    };
  };

  return (
    <div
      className="min-h-[100px] rounded-lg border-2 border-dashed border-gray-300"
      style={{
        gridColumn: `span ${columnSpan}`,
        gridRow: `span ${rowSpan}`,
        padding: `${padding}px`,
        backgroundColor:
          backgroundColor === 'transparent' ? undefined : backgroundColor,
      }}
    >
      <DropZone zone="grid-item-content" />
    </div>
  );
};

// Puck component configuration
export const GridItemConfig = {
  fields: {
    columnSpan: {
      type: 'number',
      min: 1,
      max: 12,
      label: 'Column Span',
    },
    rowSpan: {
      type: 'number',
      min: 1,
      max: 6,
      label: 'Row Span',
    },
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
    padding: {
      type: 'number',
      min: 0,
      max: 32,
      label: 'Padding (px)',
    },
  },
  defaultProps: {
    columnSpan: 6,
    rowSpan: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  render: GridItem,
};
