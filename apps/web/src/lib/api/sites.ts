import { apiService } from './client';

// Site types
export interface Site {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateSiteRequest {
  name: string;
  slug: string;
  domain?: string;
  isPublic?: boolean;
}

export interface UpdateSiteRequest {
  name?: string;
  slug?: string;
  domain?: string;
  isPublic?: boolean;
}

// Sites API service
export class SitesApiService {
  private baseUrl = '/sites';

  // Get all sites for the current user
  async getSites(): Promise<Site[]> {
    return apiService.get<Site[]>(this.baseUrl);
  }

  // Get a specific site by ID
  async getSiteById(siteId: string): Promise<Site> {
    return apiService.get<Site>(`${this.baseUrl}/${siteId}`);
  }

  // Get a public site by slug
  async getSiteBySlug(slug: string): Promise<Site> {
    return apiService.get<Site>(`${this.baseUrl}/public/${slug}`);
  }

  // Create a new site
  async createSite(data: CreateSiteRequest): Promise<Site> {
    return apiService.post<Site>(this.baseUrl, data);
  }

  // Update a site
  async updateSite(siteId: string, data: UpdateSiteRequest): Promise<Site> {
    return apiService.put<Site>(`${this.baseUrl}/${siteId}`, data);
  }

  // Delete a site
  async deleteSite(siteId: string): Promise<void> {
    return apiService.delete<void>(`${this.baseUrl}/${siteId}`);
  }
}

// Export singleton instance
export const sitesApi = new SitesApiService();
