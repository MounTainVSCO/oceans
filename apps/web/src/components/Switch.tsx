import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, className, ...props }, ref) => (
    <label className={cn('inline-flex items-center cursor-pointer', className)}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={e => onCheckedChange(e.target.checked)}
        ref={ref}
        {...props}
      />
      <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-primary transition-colors relative">
        <div
          className={cn(
            'absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform',
            checked ? 'translate-x-4' : ''
          )}
        />
      </div>
    </label>
  )
);
Switch.displayName = 'Switch';
