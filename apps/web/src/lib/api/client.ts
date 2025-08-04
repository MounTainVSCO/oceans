import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// API Configuration
const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Request interceptor to add auth token
const addAuthToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
};

// Response interceptor for error handling
const handleResponse = (response: AxiosResponse) => {
  return response;
};

const handleError = (error: any): Promise<never> => {
  if (error.response) {
    // Server responded with error status
    const apiError: ApiError = {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
      errors: error.response.data?.errors,
    };
    return Promise.reject(apiError);
  } else if (error.request) {
    // Network error
    const apiError: ApiError = {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
    return Promise.reject(apiError);
  } else {
    // Other error
    const apiError: ApiError = {
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
    return Promise.reject(apiError);
  }
};

// Create axios instance
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptors
  client.interceptors.request.use(addAuthToken, error => Promise.reject(error));

  // Response interceptors
  client.interceptors.response.use(handleResponse, handleError);

  return client;
};

// Export the API client instance
export const apiClient = createApiClient();

// Generic API methods for extensibility
export class ApiService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance = apiClient) {
    this.client = client;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

// Export a default API service instance
export const apiService = new ApiService();

// Utility function to create API service with custom config
export const createApiService = (config?: AxiosRequestConfig) => {
  const customClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  // Apply interceptors to custom client
  customClient.interceptors.request.use(addAuthToken, error =>
    Promise.reject(error)
  );
  customClient.interceptors.response.use(handleResponse, handleError);

  return new ApiService(customClient);
};
