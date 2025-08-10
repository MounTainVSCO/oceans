// API client for publishing services
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://api.oceans.life' 
  : 'http://localhost:3001';

interface SubdomainCheckResponse {
  available: boolean;
  reason?: string;
}

interface CreateSiteRequest {
  subdomain: string;
  title: string;
  description?: string;
  layout: string;
  timelineId?: string;
}

interface Site {
  id: string;
  subdomain: string;
  title: string;
  description?: string;
  layout: string;
  buildStatus: string;
  isActive: boolean;
  url: string;
  createdAt: string;
  updatedAt: string;
}

class PublishingAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async checkSubdomainAvailability(subdomain: string): Promise<SubdomainCheckResponse> {
    const response = await fetch(`${API_BASE}/publishing/check-subdomain`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ subdomain }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async createSite(data: CreateSiteRequest): Promise<Site> {
    const response = await fetch(`${API_BASE}/publishing/sites`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getUserSites(): Promise<Site[]> {
    const response = await fetch(`${API_BASE}/publishing/sites`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async updateSite(siteId: string, data: Partial<CreateSiteRequest>): Promise<Site> {
    const response = await fetch(`${API_BASE}/publishing/sites/${siteId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async deleteSite(siteId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/publishing/sites/${siteId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
  }

  async deploymentStatus(siteId: string): Promise<Site> {
    const response = await fetch(`${API_BASE}/publishing/sites/${siteId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const publishingAPI = new PublishingAPI();
export type { SubdomainCheckResponse, CreateSiteRequest, Site };
