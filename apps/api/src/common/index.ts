// TODO: add common functions and types

export const common = {
  getPreviewUrl: (siteId: string, pageSlug: string) => {
    return `http://localhost:3001/sites/${siteId}/pages/${pageSlug}/preview`;
  },
};
