'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

interface UseAuthOptions {
  requiredRole?: 'job_seeker' | 'employer' | 'admin' | 'super_admin';
  redirectTo?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, loadUser } = useAuthStore();

  useEffect(() => {
    // Load user on mount
    if (!user && !isLoading) {
      loadUser();
    }
  }, []);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !isAuthenticated && options.redirectTo) {
      router.push(options.redirectTo);
    }

    // Check role requirements
    if (!isLoading && isAuthenticated && user?.profile && options.requiredRole) {
      const userRole = user.profile.user_type;
      
      // Admin and super_admin can access all routes
      if (userRole === 'admin' || userRole === 'super_admin') {
        return;
      }

      // Check if user has required role
      if (userRole !== options.requiredRole) {
        router.push('/403');
      }
    }
  }, [isLoading, isAuthenticated, user, options.requiredRole, options.redirectTo, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isJobSeeker: user?.profile?.user_type === 'job_seeker',
    isEmployer: user?.profile?.user_type === 'employer',
    isAdmin: user?.profile?.user_type === 'admin' || user?.profile?.user_type === 'super_admin',
  };
}

// Hook for requiring authentication
export function useRequireAuth(options: UseAuthOptions = {}) {
  const auth = useAuth({
    ...options,
    redirectTo: options.redirectTo || '/login',
  });

  return auth;
}

// Hook for guest only pages (login, register)
export function useGuestOnly(redirectTo = '/') {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  return {
    isLoading,
  };
}