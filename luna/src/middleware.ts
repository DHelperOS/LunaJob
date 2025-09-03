import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile/edit',
  '/settings',
  '/messages',
  '/applications',
  '/jobs/create',
  '/jobs/edit',
];

// Auth routes that should redirect to home if already authenticated
const authRoutes = ['/login', '/register'];

// Admin routes that require admin role
const adminRoutes = ['/admin'];

// Employer routes that require employer role
const employerRoutes = ['/employer', '/jobs/create', '/jobs/edit'];

// Job seeker routes
const jobSeekerRoutes = ['/jobseeker', '/applications'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  let response = NextResponse.next({
    request,
  });

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isEmployerRoute = employerRoutes.some(route => pathname.startsWith(route));
  const isJobSeekerRoute = jobSeekerRoutes.some(route => pathname.startsWith(route));

  // If user is not authenticated and trying to access protected route
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // If user is authenticated and trying to access auth routes
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Role-based access control
  if (user) {
    // Get user profile to check role
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('user_type')
      .eq('auth_user_id', user.id)
      .single();

    if (profile) {
      // Admin routes check
      if (isAdminRoute && profile.user_type !== 'admin' && profile.user_type !== 'super_admin') {
        return NextResponse.redirect(new URL('/403', request.url));
      }

      // Employer routes check
      if (isEmployerRoute && profile.user_type !== 'employer' && profile.user_type !== 'admin' && profile.user_type !== 'super_admin') {
        return NextResponse.redirect(new URL('/403', request.url));
      }

      // Job seeker routes check
      if (isJobSeekerRoute && profile.user_type !== 'job_seeker' && profile.user_type !== 'admin' && profile.user_type !== 'super_admin') {
        return NextResponse.redirect(new URL('/403', request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};