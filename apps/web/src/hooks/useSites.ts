import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesApi } from '../lib/api/sites';
import type { CreateSiteRequest, UpdateSiteRequest } from '../lib/api/sites';

// Query keys
export const siteKeys = {
  all: ['sites'] as const,
  lists: () => [...siteKeys.all, 'list'] as const,
  list: (filters: string) => [...siteKeys.lists(), { filters }] as const,
  details: () => [...siteKeys.all, 'detail'] as const,
  detail: (id: string) => [...siteKeys.details(), id] as const,
  public: (slug: string) => [...siteKeys.all, 'public', slug] as const,
};

// Hook for fetching all sites
export const useSites = () => {
  return useQuery({
    queryKey: siteKeys.lists(),
    queryFn: () => sitesApi.getSites(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching a specific site
export const useSite = (siteId: string) => {
  return useQuery({
    queryKey: siteKeys.detail(siteId),
    queryFn: () => sitesApi.getSiteById(siteId),
    enabled: !!siteId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching a public site by slug
export const usePublicSite = (slug: string) => {
  return useQuery({
    queryKey: siteKeys.public(slug),
    queryFn: () => sitesApi.getSiteBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for creating a site
export const useCreateSite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSiteRequest) => sitesApi.createSite(data),
    onSuccess: () => {
      // Invalidate and refetch sites list
      queryClient.invalidateQueries({ queryKey: siteKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Site creation failed:', error);
    },
  });
};

// Hook for updating a site
export const useUpdateSite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      siteId,
      data,
    }: {
      siteId: string;
      data: UpdateSiteRequest;
    }) => sitesApi.updateSite(siteId, data),
    onSuccess: updatedSite => {
      // Update the specific site in cache
      queryClient.setQueryData(siteKeys.detail(updatedSite.id), updatedSite);
      // Invalidate and refetch sites list
      queryClient.invalidateQueries({ queryKey: siteKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Site update failed:', error);
    },
  });
};

// Hook for deleting a site
export const useDeleteSite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (siteId: string) => sitesApi.deleteSite(siteId),
    onSuccess: (_, siteId) => {
      // Remove the site from cache
      queryClient.removeQueries({ queryKey: siteKeys.detail(siteId) });
      // Invalidate and refetch sites list
      queryClient.invalidateQueries({ queryKey: siteKeys.lists() });
    },
    onError: (error: any) => {
      console.error('Site deletion failed:', error);
    },
  });
};
