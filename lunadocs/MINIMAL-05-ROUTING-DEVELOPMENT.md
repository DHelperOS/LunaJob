# Minimal Template - Routing & Development Guide

This article focuses on routing for **Vite.js**, **Create React App (CRA)** and **Next.js**, excluding specific Next.js configuration details.

Refer to the [Next.js routing docs](https://nextjs.org/docs/app/building-your-application/routing) for more.

## Overview

For **Vite.js** and **CRA** routing is based on [`react-router`](https://reactrouter.com/start/framework/installation). This guide explains how to:
- Add a new navigation item
- Define new routes
- Configure the index (default) page

## Add a New Navigation Item

**Applies to**: Vite.js, CRA and Next.js
**Purpose**: Add a new item in the dashboard layout navigation

### Example Configuration (Starter Version)

```typescript
// src/layouts/nav-config-dashboard.tsx

export const navData = [
  {
    subheader: 'Overview',
    items: [
      {
        title: 'One',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
        info: <Label>v{CONFIG.appVersion}</Label>,
      },
      { title: 'Two', path: paths.dashboard.two, icon: ICONS.ecommerce },
      { title: 'Three', path: paths.dashboard.three, icon: ICONS.analytics },
      { title: 'New page', path: '/dashboard/new-page', icon: ICONS.analytics },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Group',
        path: paths.dashboard.group.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: paths.dashboard.group.root },
          { title: 'Five', path: paths.dashboard.group.five },
          { title: 'Six', path: paths.dashboard.group.six },
        ],
      },
    ],
  },
];
```

## Add a New Route (Vite.js | CRA)

How to register a new route in the **Vite.js** | **CRA** version:

```typescript
// src/routes/sections/dashboard.tsx

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));
const NewPage = lazy(() => import('src/pages/dashboard/new-page'));

const dashboardLayout = () => (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? dashboardLayout() : <AuthGuard>{dashboardLayout()}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      { path: 'new-page', element: <NewPage /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
];
```

## Add a New Route (Next.js)

- Create a new file at `src/app/dashboard/new-page/page.tsx`
- **Docs**: [Next.js App Router routing](https://nextjs.org/docs/app/building-your-application/routing/pages)

## Set the Index Page

Set default page when visit website. Check out the full and starter versions to see the difference:

```javascript
// src/routes/sections/index.js

export const routesSection = [
  {
    // Redirect to default path (skip homepage)
    path: '/',
    element: <Navigate to={CONFIG.auth.redirectPath} replace />,
  },
  {
    // Show homepage as index
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [{ element: <HomePage />, index: true }],
  },
];
```

## Navigation Usage Example

Linking to routes using a custom component:

```typescript
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';

<Link component={RouterLink} href="/new" underline="none" variant="subtitle2">
  Go to About us
</Link>
```

## Role-Based Navigation

- **Navigation with roles**: https://minimals.cc/components/extra/navigation-bar
- **Permission-based demo**: https://minimals.cc/dashboard/permission

```javascript
// config-navigation.js

const navData = [
  {
    subheader: 'Marketing',
    items: [
      {
        title: 'Landing',
        path: '/landing',
        icon: <Iconify icon="carbon:bat" width={1} />,
        roles: ['admin'],
        caption: 'Display only admin role',
      },
      {
        title: 'Services',
        path: '/services',
        icon: <Iconify icon="carbon:cyclist" width={1} />,
        roles: ['admin', 'user'],
      },
    ],
  },
];
```

## Best Practices

1. **Lazy Loading**: Use React.lazy() for route components to improve initial load time
2. **Authentication Guards**: Wrap protected routes with AuthGuard components
3. **Layout Consistency**: Use consistent layout components across similar pages
4. **Path Management**: Centralize path definitions in a paths configuration file
5. **Role-Based Access**: Implement role-based navigation for different user types

---
**Source**: https://docs.minimals.cc/routing
**Date**: 2025-09-02
**Project**: Luna Job (루나알바)