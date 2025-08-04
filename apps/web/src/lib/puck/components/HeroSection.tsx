import React from 'react';

interface HeroButton {
  label: string;
  href?: string;
}

export interface HeroSectionProps {
  quote?: string;
  title: string;
  description?: string;
  buttons?: HeroButton[];
  align?: 'left' | 'center';
  image?: {
    url?: string;
    mode?: 'inline' | 'bg' | 'custom';
  };
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
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
          image?.mode === 'bg' && image?.url ? `url(${image.url})` : undefined,
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
};

// Puck config will be updated in puck.config.tsx
