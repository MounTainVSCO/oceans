import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If authentication is not required and user is authenticated (e.g., login page)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Convenience components for common use cases
export const RequireAuth: React.FC<{ children: ReactNode }> = ({
  children,
}) => <ProtectedRoute requireAuth={true}>{children}</ProtectedRoute>;

export const RequireGuest: React.FC<{ children: ReactNode }> = ({
  children,
}) => <ProtectedRoute requireAuth={false}>{children}</ProtectedRoute>;

// Component for role-based access control
interface RoleBasedRouteProps {
  children: ReactNode;
  requiredRole?: 'user' | 'pro';
  fallback?: ReactNode;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  requiredRole,
  fallback,
}) => {
  const { user, isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requiredRole === 'pro' && !user?.isPro) {
    return fallback ? <>{fallback}</> : <Navigate to="/upgrade" replace />;
  }

  return <>{children}</>;
};
