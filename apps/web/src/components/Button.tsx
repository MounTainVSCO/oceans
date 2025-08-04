import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  className?: string;
  [key: string]: any;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'primary', size = 'md', className, ...props },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants: Record<string, string> = {
      primary:
        'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
      secondary:
        'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
      outline:
        'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-500',
    };

    const sizes: Record<string, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
