import { useState } from 'react';
import { Typography } from '@/components/ui/Typography';

interface MilestoneCardProps {
  milestone: {
    id: number;
    title: string;
    date: string;
    description?: string;
    category: string;
  };
  onEdit?: (milestone: any) => void;
  onDelete?: (id: number) => void;
}

export function MilestoneCard({ milestone, onEdit, onDelete }: MilestoneCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short',
      day: 'numeric'
    });
  };

  const getRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      career: 'bg-blue-100 text-blue-800',
      learning: 'bg-green-100 text-green-800',
      health: 'bg-purple-100 text-purple-800',
      life: 'bg-orange-100 text-orange-800',
      creative: 'bg-pink-100 text-pink-800',
      travel: 'bg-indigo-100 text-indigo-800',
      relationships: 'bg-yellow-100 text-yellow-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  return (
    <div className="bg-white rounded-sm border border-gray-200 p-6 hover:shadow-sm transition-shadow group relative">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Typography variant="h4" className="text-gray-900">
                {milestone.title}
              </Typography>
              <span className={`px-2 py-1 text-xs rounded-sm uppercase tracking-wider font-medium ${getCategoryColor(milestone.category)}`}>
                {milestone.category}
              </span>
            </div>
            {milestone.description && (
              <Typography variant="caption" className="text-gray-600 mb-3 block leading-relaxed">
                {milestone.description}
              </Typography>
            )}
            <Typography variant="caption" className="text-gray-500">
              {formatDate(milestone.date)} • {getRelativeDate(milestone.date)}
            </Typography>
          </div>
        </div>
        
        <div className="relative">
          <button 
            className="text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h.01M12 12h.01M18 12h.01" />
            </svg>
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-sm shadow-lg py-1 z-10 w-32">
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit(milestone);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    onDelete(milestone.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
