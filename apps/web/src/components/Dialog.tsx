import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => onOpenChange(false)}
    >
      <div className="relative" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('bg-white rounded-lg shadow-lg p-6 w-full', className)}>
      {children}
    </div>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-bold text-gray-900">{children}</h2>;
}
