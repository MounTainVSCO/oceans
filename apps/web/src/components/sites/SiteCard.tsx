import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import {
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Calendar,
  Globe,
} from 'lucide-react';
import type { Site } from '@/lib/api/sites';

interface SiteCardProps {
  site: Site;
  onEdit: (site: Site) => void;
  onDelete: (siteId: string) => void;
  isDeleting?: boolean;
}

export function SiteCard({
  site,
  onEdit,
  onDelete,
  isDeleting,
}: SiteCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(site.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="relative group hover:shadow-lg transition-shadow">
      {/* Site Status Badge */}
      <div className="absolute top-4 right-4">
        <Badge variant={site.isPublic ? 'default' : 'secondary'}>
          {site.isPublic ? (
            <>
              <Eye className="w-3 h-3 mr-1" />
              Public
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3 mr-1" />
              Private
            </>
          )}
        </Badge>
      </div>

      {/* Site Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {site.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Globe className="w-4 h-4 mr-1" />
            <span className="font-mono">
              {site.domain || `oceans.app/${site.slug}`}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Created {formatDate(site.createdAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={`/editor/${site.id}`}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Link>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <a
              href={`http://localhost:3001/sites/public/${site.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View
            </a>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-white/95 rounded-lg flex items-center justify-center z-10">
          <div className="text-center p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Delete Site?</h4>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone. The site and all its pages will be
              permanently deleted.
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={cancelDelete}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
