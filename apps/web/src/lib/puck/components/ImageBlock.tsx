import React from 'react';

interface ImageBlockProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  borderRadius: string;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  src,
  alt,
  width,
  height,
  borderRadius,
}) => {
  return (
    <div className="flex justify-center">
      <img
        src={src || 'https://via.placeholder.com/400x300?text=Image'}
        alt={alt}
        className={`object-cover ${width} ${height} ${borderRadius}`}
        style={{
          borderRadius: borderRadius === 'none' ? undefined : borderRadius,
        }}
      />
    </div>
  );
};

// Puck component configuration
export const ImageBlockConfig = {
  fields: {
    src: { type: 'text', label: 'Image URL' },
    alt: { type: 'text', label: 'Alt Text' },
    width: {
      type: 'select',
      options: [
        { label: 'Full Width', value: 'w-full' },
        { label: 'Half Width', value: 'w-1/2' },
        { label: 'Third Width', value: 'w-1/3' },
        { label: 'Quarter Width', value: 'w-1/4' },
        { label: 'Auto', value: 'w-auto' },
      ],
    },
    height: {
      type: 'select',
      options: [
        { label: 'Auto', value: 'h-auto' },
        { label: 'Small', value: 'h-32' },
        { label: 'Medium', value: 'h-48' },
        { label: 'Large', value: 'h-64' },
        { label: 'Extra Large', value: 'h-96' },
      ],
    },
    borderRadius: {
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'rounded' },
        { label: 'Medium', value: 'rounded-lg' },
        { label: 'Large', value: 'rounded-xl' },
        { label: 'Full', value: 'rounded-full' },
      ],
    },
  },
  defaultProps: {
    src: 'https://via.placeholder.com/400x300?text=Image',
    alt: 'Image description',
    width: 'w-full',
    height: 'h-auto',
    borderRadius: 'rounded-lg',
  },
  render: ImageBlock,
};
