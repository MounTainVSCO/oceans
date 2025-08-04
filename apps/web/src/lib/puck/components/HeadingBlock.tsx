import React from 'react';

interface HeadingBlockProps {
  title: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign: 'left' | 'center' | 'right';
  color: string;
}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({
  title,
  level,
  textAlign,
  color,
}) => {
  const getHeadingSize = (level: number) => {
    switch (level) {
      case 1:
        return 'text-4xl md:text-5xl lg:text-6xl';
      case 2:
        return 'text-3xl md:text-4xl lg:text-5xl';
      case 3:
        return 'text-2xl md:text-3xl lg:text-4xl';
      case 4:
        return 'text-xl md:text-2xl lg:text-3xl';
      case 5:
        return 'text-lg md:text-xl lg:text-2xl';
      case 6:
        return 'text-base md:text-lg lg:text-xl';
      default:
        return 'text-2xl';
    }
  };

  const renderHeading = () => {
    const className = `font-bold ${getHeadingSize(level)}`;
    const style = {
      textAlign,
      color: color === 'inherit' ? undefined : color,
    };

    switch (level) {
      case 1:
        return (
          <h1 className={className} style={style}>
            {title}
          </h1>
        );
      case 2:
        return (
          <h2 className={className} style={style}>
            {title}
          </h2>
        );
      case 3:
        return (
          <h3 className={className} style={style}>
            {title}
          </h3>
        );
      case 4:
        return (
          <h4 className={className} style={style}>
            {title}
          </h4>
        );
      case 5:
        return (
          <h5 className={className} style={style}>
            {title}
          </h5>
        );
      case 6:
        return (
          <h6 className={className} style={style}>
            {title}
          </h6>
        );
      default:
        return (
          <h2 className={className} style={style}>
            {title}
          </h2>
        );
    }
  };

  return renderHeading();
};

// Puck component configuration
export const HeadingBlockConfig = {
  fields: {
    title: { type: 'text' },
    level: {
      type: 'select',
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
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    color: {
      type: 'select',
      options: [
        { label: 'Default', value: 'inherit' },
        { label: 'Primary', value: '#3B82F6' },
        { label: 'Secondary', value: '#6B7280' },
        { label: 'Success', value: '#10B981' },
        { label: 'Warning', value: '#F59E0B' },
        { label: 'Error', value: '#EF4444' },
        { label: 'Dark', value: '#1F2937' },
        { label: 'Light', value: '#F9FAFB' },
      ],
    },
  },
  defaultProps: {
    title: 'Heading',
    level: 2,
    textAlign: 'left',
    color: 'inherit',
  },
  render: HeadingBlock,
};
