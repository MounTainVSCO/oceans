import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../lib/api/auth';
import type {
  AuthResponse,
  RegisterRequest,
  LoginRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
} from '../lib/api/auth';

// Query keys for consistent caching
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Hook for user profile query
export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authApi.getProfile(),
    enabled: authApi.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401 (unauthorized)
      if (error?.status === 401) return false;
      return failureCount < 3;
    },
  });
};

// Hook for stored user data
export const useStoredUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => {
      const user = authApi.getStoredUser();
      if (!user) throw new Error('No stored user found');
      return user;
    },
    enabled: authApi.isAuthenticated(),
    staleTime: Infinity, // Never stale, only updated on login/logout
  });
};

// Hook for user registration
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data: AuthResponse) => {
      // Save tokens and user data
      authApi.saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      authApi.saveUser(data.user);

      // Update cache
      queryClient.setQueryData(authKeys.user(), data.user);
      queryClient.setQueryData(authKeys.profile(), data.user);

      // Invalidate and refetch profile
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
    onError: (error: any) => {
      console.error('Registration failed:', error);
    },
  });
};

// Hook for user login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data: AuthResponse) => {
      // Save tokens and user data
      authApi.saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      authApi.saveUser(data.user);

      // Update cache
      queryClient.setQueryData(authKeys.user(), data.user);
      queryClient.setQueryData(authKeys.profile(), data.user);

      // Invalidate and refetch profile
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });
};

// Hook for profile update
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authApi.updateProfile(data),
    onSuccess: (data: AuthResponse) => {
      // Update tokens if they changed
      authApi.saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      authApi.saveUser(data.user);

      // Update cache
      queryClient.setQueryData(authKeys.user(), data.user);
      queryClient.setQueryData(authKeys.profile(), data.user);

      // Invalidate and refetch profile
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
    onError: (error: any) => {
      console.error('Profile update failed:', error);
    },
  });
};

// Hook for password change
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
    onError: (error: any) => {
      console.error('Password change failed:', error);
    },
  });
};

// Hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      authApi.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.removeQueries({ queryKey: authKeys.all });

      // Reset query client cache for auth
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.setQueryData(authKeys.profile(), null);
    },
  });
};

// Hook for token refresh
export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const tokens = authApi.getStoredTokens();
      if (!tokens) throw new Error('No refresh token available');
      return authApi.refreshToken({ refreshToken: tokens.refreshToken });
    },
    onSuccess: (data: AuthResponse) => {
      // Update tokens
      authApi.saveTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      authApi.saveUser(data.user);

      // Update cache
      queryClient.setQueryData(authKeys.user(), data.user);
      queryClient.setQueryData(authKeys.profile(), data.user);
    },
    onError: (error: any) => {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout the user
      authApi.logout();
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
};

// Hook for authentication state
export const useAuth = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useStoredUser();
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfile();
  const refreshToken = useRefreshToken();
  const logout = useLogout();

  const isAuthenticated = !!user && !userError;
  const isLoading = isUserLoading || isProfileLoading;
  const error = userError || profileError;

  return {
    user: profile || user, // Prefer fresh profile data over stored user
    isAuthenticated,
    isLoading,
    error,
    refreshToken: refreshToken.mutate,
    logout: logout.mutate,
  };
};
