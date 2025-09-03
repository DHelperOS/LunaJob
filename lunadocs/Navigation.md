# Navigation - Minimals.cc Documentation

## Overview
The Minimals.cc navigation system features a responsive sidebar design with configurable styling, hierarchical menu support, and adaptive behavior across different screen sizes.

## Navigation Architecture

### Core Navigation Variables
```css
--nav-width: 280px;
--nav-item-gap: 4px;
--nav-item-radius: 8px;
--nav-item-root-height: 44px;
--nav-item-sub-height: 36px;
--nav-icon-size: 24px;
```

### Navigation Structure
- **Fixed Sidebar**: 280px width on desktop
- **Responsive Design**: Hidden on mobile, visible at 900px+ breakpoint
- **Hierarchical**: Supports root and sub-navigation items
- **Icon Support**: 24px configurable icon size

## Responsive Behavior

### Mobile (< 900px)
```css
.navigation {
  display: none; /* Hidden by default */
  transform: translateX(-100%); /* Off-screen */
}
```

### Desktop (≥ 900px)
```css
@media (min-width: 900px) {
  .navigation {
    display: block;
    transform: translateX(0);
    position: fixed;
    width: var(--nav-width);
    height: 100vh;
  }
}
```

### Toggle Functionality
```css
.navigation.open {
  display: block;
  transform: translateX(0);
}
```

## Navigation Items

### Root Navigation Items
```css
.nav-item-root {
  height: var(--nav-item-root-height); /* 44px */
  padding: 0 calc(var(--spacing) * 2);
  border-radius: var(--nav-item-radius);
  display: flex;
  align-items: center;
  gap: var(--nav-item-gap);
  
  /* Interactive states */
  color: var(--nav-item-color);
  background-color: transparent;
  transition: all 0.2s ease;
}

.nav-item-root:hover {
  background-color: var(--nav-item-hover-bg);
  color: var(--nav-item-hover-color);
}

.nav-item-root.active {
  background-color: var(--nav-item-active-bg);
  color: var(--nav-item-root-active-color);
}
```

### Sub Navigation Items
```css
.nav-item-sub {
  height: var(--nav-item-sub-height); /* 36px */
  padding-left: calc(var(--spacing) * 6);
  padding-right: calc(var(--spacing) * 2);
  border-radius: var(--nav-item-radius);
  
  /* Sub-item specific styling */
  font-size: 0.875rem;
  color: var(--nav-item-sub-color);
}

.nav-item-sub:hover {
  background-color: var(--nav-item-sub-hover-bg);
  color: var(--nav-item-sub-hover-color);
}

.nav-item-sub.active {
  background-color: var(--nav-item-sub-active-bg);
  color: var(--nav-item-sub-active-color);
}
```

## Icon Integration

### Icon Sizing
```css
.nav-icon {
  width: var(--nav-icon-size); /* 24px */
  height: var(--nav-icon-size);
  flex-shrink: 0;
  
  /* Icon alignment */
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Icon with Text
```css
.nav-item-content {
  display: flex;
  align-items: center;
  gap: var(--nav-item-gap);
  width: 100%;
}

.nav-item-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## Color Scheme Support

### Light Mode Navigation
```css
:root, [data-color-scheme="light"] {
  --nav-item-color: rgba(33, 43, 54, 0.87);
  --nav-item-hover-bg: rgba(33, 43, 54, 0.04);
  --nav-item-hover-color: rgba(33, 43, 54, 1);
  --nav-item-active-bg: rgba(255, 145, 0, 0.12);
  --nav-item-root-active-color: #FF9100;
  
  --nav-item-sub-color: rgba(33, 43, 54, 0.6);
  --nav-item-sub-hover-bg: rgba(33, 43, 54, 0.04);
  --nav-item-sub-active-bg: rgba(255, 145, 0, 0.08);
}
```

### Dark Mode Navigation
```css
[data-color-scheme="dark"] {
  --nav-item-color: rgba(255, 255, 255, 0.87);
  --nav-item-hover-bg: rgba(255, 255, 255, 0.08);
  --nav-item-hover-color: rgba(255, 255, 255, 1);
  --nav-item-active-bg: rgba(255, 145, 0, 0.24);
  --nav-item-root-active-color: #FFB94A;
  
  --nav-item-sub-color: rgba(255, 255, 255, 0.6);
  --nav-item-sub-hover-bg: rgba(255, 255, 255, 0.08);
  --nav-item-sub-active-bg: rgba(255, 145, 0, 0.16);
}
```

## Navigation Examples

### 1. Basic Navigation Structure
```html
<nav class="navigation">
  <div class="nav-item-root active">
    <div class="nav-icon">🏠</div>
    <span class="nav-item-text">Dashboard</span>
  </div>
  
  <div class="nav-item-root">
    <div class="nav-icon">👥</div>
    <span class="nav-item-text">Users</span>
  </div>
  
  <div class="nav-item-sub">
    <span class="nav-item-text">User List</span>
  </div>
  
  <div class="nav-item-sub active">
    <span class="nav-item-text">User Profile</span>
  </div>
</nav>
```

### 2. Collapsible Navigation Groups
```css
.nav-group {
  margin-bottom: calc(var(--spacing) * 2);
}

.nav-group-title {
  padding: 0 calc(var(--spacing) * 2);
  margin-bottom: var(--spacing);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--palette-text-secondary);
  letter-spacing: 0.5px;
}

.nav-group-items {
  display: flex;
  flex-direction: column;
  gap: var(--nav-item-gap);
}
```

### 3. Navigation with Badges
```css
.nav-item-badge {
  background-color: var(--palette-error-main);
  color: var(--palette-error-contrastText);
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Advanced Navigation Features

### 1. Collapsible Sidebar
```css
.navigation-collapsed {
  width: 64px; /* Icon-only width */
}

.navigation-collapsed .nav-item-text {
  display: none;
}

.navigation-collapsed .nav-item-root {
  justify-content: center;
  padding: 0;
}
```

### 2. Navigation Animations
```css
.navigation {
  transition: width 0.3s ease, transform 0.3s ease;
}

.nav-item-root,
.nav-item-sub {
  transition: all 0.2s ease;
}

/* Hover animations */
.nav-item-root:hover {
  transform: translateX(2px);
}
```

### 3. Breadcrumb Integration
```css
.navigation-breadcrumb {
  padding: calc(var(--spacing) * 2);
  border-bottom: 1px solid var(--palette-divider);
  font-size: 0.875rem;
  color: var(--palette-text-secondary);
}
```

## Mobile Navigation

### 1. Overlay Navigation
```css
@media (max-width: 899px) {
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--palette-background-paper);
    z-index: var(--zIndex-drawer);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .navigation.open {
    transform: translateX(0);
  }
}
```

### 2. Mobile Navigation Backdrop
```css
.navigation-backdrop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--zIndex-drawer);
}

@media (max-width: 899px) {
  .navigation-backdrop.open {
    display: block;
  }
}
```

## Accessibility Features

### 1. Keyboard Navigation
```css
.nav-item-root:focus,
.nav-item-sub:focus {
  outline: 2px solid var(--palette-primary-main);
  outline-offset: 2px;
}
```

### 2. Screen Reader Support
```html
<nav class="navigation" aria-label="Main navigation">
  <div class="nav-item-root" role="button" tabindex="0" aria-current="page">
    <div class="nav-icon" aria-hidden="true">🏠</div>
    <span class="nav-item-text">Dashboard</span>
  </div>
</nav>
```

### 3. Skip Links
```css
.skip-nav {
  position: absolute;
  top: -40px;
  left: 8px;
  background-color: var(--palette-background-paper);
  color: var(--palette-text-primary);
  padding: 8px;
  border-radius: var(--shape-borderRadius);
  z-index: 1000;
}

.skip-nav:focus {
  top: 8px;
}
```

## Best Practices

### 1. Navigation Hierarchy
- Use root items for main sections
- Use sub-items for related pages
- Maintain logical grouping and order

### 2. Visual Feedback
- Provide clear hover states
- Highlight active/current page
- Use consistent spacing and alignment

### 3. Performance
- Use CSS transforms for animations
- Minimize DOM manipulation
- Implement lazy loading for large navigation trees

### 4. Accessibility
- Ensure keyboard navigation support
- Provide appropriate ARIA labels
- Maintain sufficient color contrast
- Test with screen readers

### 5. Mobile Experience
- Implement touch-friendly target sizes
- Provide clear open/close indicators
- Consider gesture support for modern devices

## Navigation System Benefits

- **Responsive**: Adapts seamlessly to all device sizes
- **Flexible**: Supports various navigation patterns
- **Themeable**: Full light/dark mode support
- **Accessible**: Built with accessibility best practices
- **Performant**: Optimized animations and transitions
- **Customizable**: Extensive CSS variable configuration
- **Hierarchical**: Clear information architecture support

The navigation system provides a comprehensive solution for application navigation with excellent user experience across all devices and accessibility requirements.