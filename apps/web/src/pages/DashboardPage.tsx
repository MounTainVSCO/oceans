import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import {
  useSites,
  useCreateSite,
  useUpdateSite,
  useDeleteSite,
} from '../hooks/useSites';
import { Button } from '../components/Button';
import { SiteCard } from '../components/sites/SiteCard';
import { SiteForm } from '../components/sites/SiteForm';
import { Plus, Globe, TrendingUp, User } from 'lucide-react';
import type {
  Site,
  CreateSiteRequest,
  UpdateSiteRequest,
} from '../lib/api/sites';

export const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const {
    data: sites = [],
    isLoading: sitesLoading,
    error: sitesError,
  } = useSites();
  const createSite = useCreateSite();
  const updateSite = useUpdateSite();
  const deleteSite = useDeleteSite();

  // Form state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | undefined>(undefined);

  const handleCreateSite = async (
    data: CreateSiteRequest | UpdateSiteRequest
  ) => {
    try {
      await createSite.mutateAsync(data as CreateSiteRequest);
      setIsCreateModalOpen(false);
    } catch (error) {
      // Error is handled by the form
      console.error('Failed to create site:', error);
    }
  };

  const handleUpdateSite = async (
    data: CreateSiteRequest | UpdateSiteRequest
  ) => {
    if (!editingSite) return;

    try {
      await updateSite.mutateAsync({
        siteId: editingSite.id,
        data: data as UpdateSiteRequest,
      });
      setEditingSite(undefined);
    } catch (error) {
      // Error is handled by the form
      console.error('Failed to update site:', error);
    }
  };

  const handleDeleteSite = async (siteId: string) => {
    try {
      await deleteSite.mutateAsync(siteId);
    } catch (error) {
      console.error('Failed to delete site:', error);
    }
  };

  const handleEditSite = (site: Site) => {
    setEditingSite(site);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Error
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access the dashboard.
          </p>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Sites</h1>
            <p className="text-gray-600 mt-1">
              Manage your portfolio websites and landing pages
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Site
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sites</p>
              <p className="text-2xl font-bold text-gray-900">{sites.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Public Sites</p>
              <p className="text-2xl font-bold text-gray-900">
                {sites.filter(site => site.isPublic).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Account</p>
              <p className="text-2xl font-bold text-gray-900">
                {user.isPro ? 'Pro' : 'Free'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="space-y-6">
        {sitesLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading your sites...</p>
          </div>
        ) : sitesError ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600">
                Failed to load sites. Please try again.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          </div>
        ) : sites.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No sites yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first site to get started with your online presence.
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Site
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map(site => (
              <SiteCard
                key={site.id}
                site={site}
                onEdit={handleEditSite}
                onDelete={handleDeleteSite}
                isDeleting={deleteSite.isPending}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Site Modal */}
      <SiteForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSite}
        isLoading={createSite.isPending}
      />

      {/* Edit Site Modal */}
      <SiteForm
        site={editingSite}
        isOpen={!!editingSite}
        onClose={() => setEditingSite(undefined)}
        onSubmit={handleUpdateSite}
        isLoading={updateSite.isPending}
      />
    </div>
  );
};
