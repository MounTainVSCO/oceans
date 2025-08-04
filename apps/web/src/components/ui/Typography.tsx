import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'overline';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  className = '',
  as
}) => {
  const variantStyles = {
    h1: 'text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-none',
    h2: 'text-3xl md:text-4xl font-bold text-gray-900 tracking-tight',
    h3: 'text-xl md:text-2xl font-semibold text-gray-900 tracking-tight',
    h4: 'text-lg font-semibold text-gray-900',
    body: 'text-base text-gray-600 leading-relaxed',
    caption: 'text-sm text-gray-600',
    overline: 'text-xs text-gray-500 uppercase tracking-wider font-medium'
  };

  const defaultElement = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    caption: 'p',
    overline: 'span'
  };

  const Component = (as || defaultElement[variant]) as any;

  return (
    <Component className={`${variantStyles[variant]} ${className}`}>
      {children}
    </Component>
  );
};
