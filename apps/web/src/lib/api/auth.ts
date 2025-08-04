import { apiService } from './client';

// Authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  isPro: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Authentication API service
export class AuthApiService {
  private baseUrl = '/auth';

  // Register new user
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      `${this.baseUrl}/register`,
      data
    );
    console.log('response', response);
    return response;
  }

  // Login user
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      `${this.baseUrl}/login`,
      data
    );
    return response;
  }

  // Refresh access token
  async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      `${this.baseUrl}/refresh`,
      data
    );
    return response;
  }

  // Get user profile
  async getProfile(): Promise<User> {
    const response = await apiService.get<User>(`${this.baseUrl}/profile`);
    return response;
  }

  // Update user profile
  async updateProfile(data: UpdateProfileRequest): Promise<AuthResponse> {
    const response = await apiService.put<AuthResponse>(
      `${this.baseUrl}/profile`,
      data
    );
    return response;
  }

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await apiService.put<void>(`${this.baseUrl}/change-password`, data);
  }

  // Logout (client-side only)
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  // Save tokens to localStorage
  saveTokens(tokens: AuthTokens): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  // Save user to localStorage
  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get stored tokens
  getStoredTokens(): AuthTokens | null {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
    return null;
  }

  // Get stored user
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}

// Export singleton instance
export const authApi = new AuthApiService();
