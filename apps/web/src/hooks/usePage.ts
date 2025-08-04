import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPage, updatePage } from '../lib/api/pages';

export function usePage(siteId: string, slug: string) {
  return useQuery({
    queryKey: ['page', siteId, slug],
    queryFn: () => getPage(siteId, slug),
  });
}

export function useUpdatePage(siteId: string, slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updatePage(siteId, slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page', siteId, slug] });
    },
  });
}
