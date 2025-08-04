import React from 'react';
import { ComponentConfig } from '@measured/puck';

export type HeroProps = {
  quote?: string;
  title: string;
  description?: string;
  buttons?: { label: string; href?: string }[];
  align?: 'left' | 'center';
  image?: { url?: string; mode?: 'inline' | 'bg' | 'custom' };
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
};

export const Hero: ComponentConfig<HeroProps> = {
  fields: {
    quote: { type: 'text', label: 'Quote' },
    title: { type: 'text', label: 'Title' },
    description: { type: 'textarea', label: 'Description' },
    buttons: {
      type: 'array',
      label: 'Buttons',
      of: {
        type: 'object',
        fields: {
          label: { type: 'text', label: 'Label' },
          href: { type: 'text', label: 'Link' },
        },
      },
    },
    align: {
      type: 'select',
      label: 'Align',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
    image: {
      type: 'object',
      label: 'Image',
      fields: {
        url: { type: 'text', label: 'URL' },
        mode: {
          type: 'select',
          label: 'Mode',
          options: [
            { label: 'Inline', value: 'inline' },
            { label: 'Background', value: 'bg' },
            { label: 'Custom', value: 'custom' },
          ],
        },
      },
    },
    paddingTop: { type: 'number', label: 'Padding Top', min: 0, max: 128 },
    paddingBottom: {
      type: 'number',
      label: 'Padding Bottom',
      min: 0,
      max: 128,
    },
    paddingLeft: { type: 'number', label: 'Padding Left', min: 0, max: 128 },
    paddingRight: { type: 'number', label: 'Padding Right', min: 0, max: 128 },
  },
  defaultProps: {
    quote: '',
    title: 'Welcome to My Portfolio',
    description: 'A showcase of my work and skills',
    buttons: [
      { label: 'Learn more', href: '#' },
      { label: 'Button', href: '#' },
    ],
    align: 'left',
    image: { url: '', mode: 'inline' },
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 24,
    paddingRight: 24,
  },
  render: ({
    quote,
    title,
    description,
    buttons = [],
    align = 'left',
    image = {},
    paddingTop = 48,
    paddingBottom = 48,
    paddingLeft = 24,
    paddingRight = 24,
  }) => {
    const alignment =
      align === 'center' ? 'items-center text-center' : 'items-start text-left';
    const hasImage = image?.url && image?.mode !== 'bg';

    return (
      <section
        className={`relative w-full flex flex-col md:flex-row ${image?.mode === 'bg' ? 'overflow-hidden' : ''}`}
        style={{
          paddingTop,
          paddingBottom,
          paddingLeft,
          paddingRight,
          backgroundImage:
            image?.mode === 'bg' && image?.url
              ? `url(${image.url})`
              : undefined,
          backgroundSize: image?.mode === 'bg' ? 'cover' : undefined,
          backgroundPosition: image?.mode === 'bg' ? 'center' : undefined,
        }}
      >
        <div className={`flex-1 flex flex-col gap-4 ${alignment} z-10`}>
          {quote && (
            <div className="text-blue-600 font-semibold text-sm mb-2 opacity-80">
              {quote}
            </div>
          )}
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto md:mx-0">
              {description}
            </p>
          )}
          {buttons && buttons.length > 0 && (
            <div
              className={`flex gap-3 mt-4 ${align === 'center' ? 'justify-center' : ''}`}
            >
              {buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.href || '#'}
                  className="px-5 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>
        {hasImage && (
          <div
            className={`flex-1 flex justify-${align} items-center mt-8 md:mt-0 md:ml-8`}
          >
            <img
              src={image.url}
              alt="Hero"
              className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl shadow-lg ${image.mode === 'inline' ? '' : ''}`}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        {/* Optional overlay for background image mode */}
        {image?.mode === 'bg' && (
          <div className="absolute inset-0 bg-white/70 dark:bg-black/40 pointer-events-none" />
        )}
      </section>
    );
  },
};
