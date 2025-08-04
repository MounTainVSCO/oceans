import React from 'react';
import { DropZone } from '@measured/puck';

interface GridComponentProps {
  columns: number;
  gap: number;
  padding: number;
  backgroundColor: string;
  layout: 'horizontal' | 'vertical';
  verticalPadding: number;
}

export const GridComponent: React.FC<GridComponentProps> = ({
  columns,
  gap,
  padding,
  backgroundColor,
  layout,
  verticalPadding,
}) => {
  const getGridTemplateColumns = (cols: number) => {
    return `repeat(${cols}, minmax(0, 1fr))`;
  };

  const getResponsiveColumns = (cols: number) => {
    // Mobile: 1 column, Tablet: 2 columns, Desktop: full columns
    return {
      gridTemplateColumns: {
        base: 'repeat(1, minmax(0, 1fr))',
        md: `repeat(${Math.min(cols, 2)}, minmax(0, 1fr))`,
        lg: getGridTemplateColumns(cols),
      },
    };
  };

  const getLayoutStyles = () => {
    if (layout === 'vertical') {
      return {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: `${gap}px`,
      };
    }

    return {
      display: 'grid',
      gridTemplateColumns:
        getResponsiveColumns(columns).gridTemplateColumns.base,
      gap: `${gap}px`,
    };
  };

  return (
    <div
      className="w-full"
      style={{
        padding: `${padding}px`,
        backgroundColor:
          backgroundColor === 'transparent' ? undefined : backgroundColor,
      }}
    >
      <div
        className="min-h-[200px]"
        style={{
          ...getLayoutStyles(),
          paddingTop: `${verticalPadding}px`,
          paddingBottom: `${verticalPadding}px`,
        }}
      >
        <DropZone zone="grid-items" />
      </div>
    </div>
  );
};

// Puck component configuration
export const Grid = {
  fields: {
    columns: {
      type: 'number',
      min: 1,
      max: 12,
      label: 'Number of Columns',
    },
    gap: {
      type: 'number',
      min: 8,
      max: 64,
      label: 'Gap (px)',
    },
    padding: {
      type: 'number',
      min: 0,
      max: 64,
      label: 'Horizontal Padding (px)',
    },
    verticalPadding: {
      type: 'number',
      min: 0,
      max: 64,
      label: 'Vertical Padding (px)',
    },
    layout: {
      type: 'select',
      options: [
        { label: 'Grid Layout', value: 'horizontal' },
        { label: 'Vertical Stack', value: 'vertical' },
      ],
      label: 'Layout Type',
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
        { label: 'Yellow 50', value: '#FFFBEB' },
        { label: 'Purple 50', value: '#FAF5FF' },
      ],
    },
  },
  defaultProps: {
    columns: 3,
    gap: 16,
    padding: 16,
    verticalPadding: 16,
    layout: 'horizontal',
    backgroundColor: 'transparent',
  },
  render: GridComponent,
};
