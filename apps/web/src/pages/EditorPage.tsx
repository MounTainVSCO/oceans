import React from 'react';
import { useParams } from 'react-router-dom';
import { Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import { conf } from '../lib/puck/config';
import { usePage, useUpdatePage } from '../hooks/usePage';
import { createPage } from '../lib/api/pages';
import { Button } from '../components/Button';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

// Default Puck data structure for new pages
const getDefaultPageData = (pageTitle: string) => ({
  root: {
    title: pageTitle,
    zones: {
      content: [
        {
          type: 'Heading',
          props: {
            title: `Welcome to ${pageTitle}`,
            level: 1,
            textAlign: 'center',
            color: '#1F2937',
          },
        },
        {
          type: 'Text',
          props: {
            text: 'This is your new page. Start building by dragging components from the left panel.',
            textAlign: 'center',
            color: '#6B7280',
          },
        },
      ],
    },
  },
});

export const EditorPage: React.FC = () => {
  const { siteId, slug } = useParams<{ siteId?: string; slug?: string }>();
  // Default slug to 'home' if not present
  const pageSlug = slug || 'home';
  // siteId is required for API calls; fallback to empty string if not present
  const pageSiteId = siteId || '';

  const {
    data: page,
    isLoading,
    error,
    refetch,
  } = usePage(pageSiteId, pageSlug);
  const updatePage = useUpdatePage(pageSiteId, pageSlug);

  // Local state for tracking changes
  const [localData, setLocalData] = React.useState<any>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);

  // Initialize local data when page loads
  React.useEffect(() => {
    if (page?.data) {
      setLocalData(page.data);
      setHasUnsavedChanges(false);
    }
  }, [page?.data]);

  // Warn user before leaving with unsaved changes
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Auto-create page if it doesn't exist
  React.useEffect(() => {
    if (!isLoading && !page && !error && pageSiteId && pageSlug) {
      const createDefaultPage = async () => {
        try {
          const pageTitle = `${pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1)} Page`;
          await createPage(pageSiteId, pageTitle, pageSlug);
          // After creating the page, update it with default data
          const defaultData = getDefaultPageData(pageTitle);
          await updatePage.mutateAsync(defaultData);
          refetch();
        } catch (err) {
          console.error('Failed to create page:', err);
        }
      };
      createDefaultPage();
    }
  }, [page, isLoading, error, pageSiteId, pageSlug, refetch, updatePage]);

  // Handle data changes from Puck
  const handleDataChange = (data: any) => {
    setLocalData(data);
    setHasUnsavedChanges(true);
  };

  // Handle publishing
  const handleSave = async () => {
    if (!localData) return;

    try {
      await updatePage.mutateAsync(localData);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to publish:', error);
    }
  };

  // Handle preview
  const handlePreview = () => {
    const previewUrl = `http://localhost:3001/sites/${pageSiteId}/pages/${pageSlug}/preview`;
    window.open(previewUrl, '_blank');
  };

  // TODO: this is not working well, Handle preview with unsaved changes
  const handlePreviewUnsaved = async () => {
    if (!localData) return;

    try {
      // Create preview via POST request
      const response = await fetch(
        `http://localhost:3001/sites/${pageSiteId}/pages/${pageSlug}/preview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: localData }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create preview');
      }

      const { previewId } = await response.json();

      // Open preview with previewId
      const previewUrl = `http://localhost:3001/sites/${pageSiteId}/pages/${pageSlug}/preview?previewId=${previewId}`;
      window.open(previewUrl, '_blank');
    } catch (error) {
      console.error('Failed to create preview:', error);
      // Fallback to regular preview
      handlePreview();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!page) return <div>Creating page...</div>;
  if (!page.data) return <div>Page data missing</div>;

  return (
    <div className="h-screen flex flex-col">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Editing: {page.title}
            </h1>
            <span className="text-sm text-gray-500">
              {pageSiteId} / {pageSlug}
            </span>
            {hasUnsavedChanges && (
              <span className="text-sm text-orange-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                Unsaved changes
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Add Page
            </button>
            {hasUnsavedChanges ? (
              <button
                onClick={handlePreviewUnsaved}
                className="text-sm text-orange-600 hover:text-orange-700"
                title="Preview with unsaved changes"
              >
                Preview Changes
              </button>
            ) : (
              <button
                onClick={handlePreview}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Preview
              </button>
            )}
            <Button
              onClick={handleSave}
              disabled={!hasUnsavedChanges || updatePage.isPending}
              className="ml-2"
            >
              {updatePage.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : updatePage.isSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Puck Editor */}
      <div className="flex-1">
        <Puck
          config={conf}
          data={localData || page.data}
          onChange={handleDataChange}
        />
      </div>
    </div>
  );
};
