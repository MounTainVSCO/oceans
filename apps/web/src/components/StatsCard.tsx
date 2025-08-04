import { Typography } from '@/components/ui/Typography';

interface StatsCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export function StatsCard({ label, value, description, icon }: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <Typography variant="overline" className="text-gray-500">
          {label}
        </Typography>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
      
      <Typography variant="h3" className="mb-1">
        {value}
      </Typography>
      
      {description && (
        <Typography variant="caption" className="text-gray-500">
          {description}
        </Typography>
      )}
    </div>
  );
}
