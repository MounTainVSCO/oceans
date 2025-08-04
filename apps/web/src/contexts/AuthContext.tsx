import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../lib/api/auth';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
  refreshToken: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!auth.isAuthenticated) return;

    const checkTokenExpiry = () => {
      const tokens = authApi.getStoredTokens();
      if (!tokens) return;

      try {
        // Decode JWT to check expiration (without verification for client-side)
        const payload = JSON.parse(atob(tokens.accessToken.split('.')[1]));
        const expiryTime = payload.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        const timeUntilExpiry = expiryTime - currentTime;

        // If token expires in less than 5 minutes, refresh it
        if (timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0) {
          auth.refreshToken();
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
      }
    };

    // Check immediately
    checkTokenExpiry();

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60 * 1000);

    return () => clearInterval(interval);
  }, [auth.isAuthenticated, auth.refreshToken]);

  // Handle 401 errors globally
  useEffect(() => {
    // Listen for storage events (in case of logout in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' && !e.newValue) {
        // Token was removed, logout
        auth.logout();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [auth.isAuthenticated, auth.refreshToken, auth.logout]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
