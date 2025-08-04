import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'gray' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  padding = 'lg',
  className = ''
}) => {
  const variantClass = {
    default: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900'
  };

  const paddingClass = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32'
  };

  return (
    <section className={`${variantClass[variant]} ${paddingClass[padding]} ${className}`}>
      {children}
    </section>
  );
};
