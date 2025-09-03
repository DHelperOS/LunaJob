# Global Styles - Minimals.cc Documentation

## Overview
The Global Styles system in Minimals.cc provides a comprehensive CSS architecture with systematic design token management, responsive utilities, and consistent theming across all components.

## CSS Architecture

### Design System Foundation
The global styles implement a complete design system using CSS custom properties (variables) as the foundation for:

- **Color Management**: Comprehensive palette system with light/dark mode support
- **Typography**: Systematic font scaling and responsive text styles
- **Spacing**: Consistent spacing units and proportional scaling
- **Shadows**: Multi-layered shadow system for depth hierarchy
- **Layout**: Flexible grid and responsive design patterns

### File Organization
```
src/
├── styles/
│   ├── globals.css           # Global resets and base styles
│   ├── variables.css         # CSS custom properties
│   ├── typography.css        # Font definitions and text styles
│   ├── components.css        # Component-specific global styles
│   └── utilities.css         # Utility classes
```

## Core Global Styles

### 1. CSS Reset and Base Styles
```css
/* Global box-sizing */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Remove default margins and padding */
* {
  margin: 0;
  padding: 0;
}

/* Body base styles */
body {
  font-family: "DM Sans Variable", -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--palette-background-default);
  color: var(--palette-text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Image handling */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* Form elements */
input, button, textarea, select {
  font: inherit;
}

/* Remove list styles */
ol, ul {
  list-style: none;
}
```

### 2. Root Variables System
```css
:root, [data-color-scheme="light"] {
  /* Spacing System */
  --spacing: 8px;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Shape System */
  --shape-borderRadius: 8px;
  --shape-borderRadius-sm: 4px;
  --shape-borderRadius-lg: 12px;
  --shape-borderRadius-full: 9999px;
  
  /* Shadow System */
  --shadows-0: none;
  --shadows-1: 0px 2px 1px -1px rgba(0,0,0,0.2),
               0px 1px 1px 0px rgba(0,0,0,0.14),
               0px 1px 3px 0px rgba(0,0,0,0.12);
  /* ... additional shadow levels */
  
  /* Z-Index System */
  --zIndex-appBar: 1100;
  --zIndex-drawer: 1200;
  --zIndex-modal: 1300;
  --zIndex-snackbar: 1400;
  --zIndex-tooltip: 1500;
}
```

### 3. Color Palette System
```css
:root, [data-color-scheme="light"] {
  /* Primary Colors */
  --palette-primary-main: #FF9100;
  --palette-primary-light: #FFB94A;
  --palette-primary-dark: #E8760C;
  --palette-primary-contrastText: #FFFFFF;
  --palette-primary-mainChannel: 255 145 0;
  
  /* Secondary Colors */
  --palette-secondary-main: #8E33FF;
  --palette-secondary-light: #A95CFF;
  --palette-secondary-dark: #7B24E8;
  
  /* Text Colors */
  --palette-text-primary: rgba(33, 43, 54, 0.87);
  --palette-text-secondary: rgba(33, 43, 54, 0.6);
  --palette-text-disabled: rgba(33, 43, 54, 0.38);
  
  /* Background Colors */
  --palette-background-default: #FFFFFF;
  --palette-background-paper: #FFFFFF;
  --palette-background-neutral: #F4F6F8;
  
  /* Action Colors */
  --palette-action-hover: rgba(33, 43, 54, 0.04);
  --palette-action-focus: rgba(33, 43, 54, 0.12);
  --palette-action-selected: rgba(33, 43, 54, 0.08);
  --palette-action-disabled: rgba(33, 43, 54, 0.26);
}
```

### 4. Dark Mode Overrides
```css
[data-color-scheme="dark"] {
  /* Background Colors */
  --palette-background-default: #141A21;
  --palette-background-paper: #1C252E;
  --palette-background-neutral: #28323D;
  
  /* Text Colors */
  --palette-text-primary: rgba(255, 255, 255, 0.87);
  --palette-text-secondary: rgba(255, 255, 255, 0.6);
  --palette-text-disabled: rgba(255, 255, 255, 0.38);
  
  /* Action Colors */
  --palette-action-hover: rgba(255, 255, 255, 0.08);
  --palette-action-focus: rgba(255, 255, 255, 0.12);
  --palette-action-selected: rgba(255, 255, 255, 0.16);
  
  /* Adjusted shadows for dark backgrounds */
  --shadows-1: 0px 2px 1px -1px rgba(0,0,0,0.3),
               0px 1px 1px 0px rgba(0,0,0,0.24),
               0px 1px 3px 0px rgba(0,0,0,0.20);
}
```

## Typography System

### Font Loading and Definitions
```css
/* Variable font loading */
@font-face {
  font-family: 'DM Sans Variable';
  src: url('/fonts/dm-sans-variable.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}

/* Typography scale */
:root {
  --font-h1: 800 2.5rem/1.25 "Barlow";
  --font-h2: 800 2rem/1.3 "Barlow";
  --font-h3: 700 1.5rem/1.4 "Barlow";
  --font-h4: 700 1.25rem/1.4 "Barlow";
  --font-h5: 600 1.125rem/1.4 "Barlow";
  --font-h6: 600 1rem/1.4 "Barlow";
  
  --font-body1: 400 1rem/1.5 "DM Sans Variable";
  --font-body2: 400 0.875rem/1.43 "DM Sans Variable";
  --font-caption: 400 0.75rem/1.66 "DM Sans Variable";
  --font-button: 700 0.875rem/1.71 "DM Sans Variable";
  --font-overline: 400 0.75rem/2.66 "DM Sans Variable";
}

/* Responsive typography */
@media (min-width: 600px) {
  :root {
    --font-h1: 800 3rem/1.2 "Barlow";
    --font-h2: 800 2.25rem/1.25 "Barlow";
  }
}
```

### Text Utility Classes
```css
.text-primary { color: var(--palette-text-primary); }
.text-secondary { color: var(--palette-text-secondary); }
.text-disabled { color: var(--palette-text-disabled); }

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

.text-uppercase { text-transform: uppercase; }
.text-lowercase { text-transform: lowercase; }
.text-capitalize { text-transform: capitalize; }

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## Layout and Spacing Utilities

### Container System
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: calc(var(--spacing) * 2);
  padding-right: calc(var(--spacing) * 2);
}

@media (min-width: 600px) {
  .container {
    padding-left: calc(var(--spacing) * 3);
    padding-right: calc(var(--spacing) * 3);
  }
}
```

### Spacing Utilities
```css
/* Margin utilities */
.m-0 { margin: 0; }
.m-1 { margin: var(--spacing); }
.m-2 { margin: calc(var(--spacing) * 2); }
.m-3 { margin: calc(var(--spacing) * 3); }
.m-4 { margin: calc(var(--spacing) * 4); }

/* Padding utilities */
.p-0 { padding: 0; }
.p-1 { padding: var(--spacing); }
.p-2 { padding: calc(var(--spacing) * 2); }
.p-3 { padding: calc(var(--spacing) * 3); }
.p-4 { padding: calc(var(--spacing) * 4); }

/* Directional spacing */
.mt-1 { margin-top: var(--spacing); }
.mr-1 { margin-right: var(--spacing); }
.mb-1 { margin-bottom: var(--spacing); }
.ml-1 { margin-left: var(--spacing); }

.pt-1 { padding-top: var(--spacing); }
.pr-1 { padding-right: var(--spacing); }
.pb-1 { padding-bottom: var(--spacing); }
.pl-1 { padding-left: var(--spacing); }
```

### Display Utilities
```css
.d-none { display: none; }
.d-block { display: block; }
.d-inline { display: inline; }
.d-inline-block { display: inline-block; }
.d-flex { display: flex; }
.d-grid { display: grid; }

/* Responsive display */
@media (min-width: 600px) {
  .d-sm-none { display: none; }
  .d-sm-block { display: block; }
  .d-sm-flex { display: flex; }
}

@media (min-width: 900px) {
  .d-md-none { display: none; }
  .d-md-block { display: block; }
  .d-md-flex { display: flex; }
}
```

## Flexbox Utilities

### Flex Container Utilities
```css
.d-flex { display: flex; }
.flex-row { flex-direction: row; }
.flex-column { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

.align-start { align-items: flex-start; }
.align-center { align-items: center; }
.align-end { align-items: flex-end; }
.align-stretch { align-items: stretch; }
```

### Flex Item Utilities
```css
.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-none { flex: none; }

.align-self-start { align-self: flex-start; }
.align-self-center { align-self: center; }
.align-self-end { align-self: flex-end; }
.align-self-stretch { align-self: stretch; }
```

## Component Base Styles

### Form Elements
```css
input, textarea, select {
  background-color: var(--palette-background-paper);
  border: 1px solid var(--palette-divider);
  border-radius: var(--shape-borderRadius);
  padding: calc(var(--spacing) * 1.5);
  font: var(--font-body1);
  color: var(--palette-text-primary);
  transition: border-color 0.2s ease;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--palette-primary-main);
  box-shadow: 0 0 0 2px rgba(var(--palette-primary-mainChannel), 0.2);
}

input::placeholder, textarea::placeholder {
  color: var(--palette-text-secondary);
}
```

### Button Base Styles
```css
button {
  background-color: transparent;
  border: none;
  border-radius: var(--shape-borderRadius);
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
  font: var(--font-button);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Link Styles
```css
a {
  color: var(--palette-primary-main);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--palette-primary-dark);
  text-decoration: underline;
}

a:focus {
  outline: 2px solid var(--palette-primary-main);
  outline-offset: 2px;
  border-radius: 2px;
}
```

## Accessibility Enhancements

### Focus Management
```css
.focus-visible {
  outline: 2px solid var(--palette-primary-main);
  outline-offset: 2px;
}

/* Remove focus outline for mouse users */
.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}

/* Skip link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 8px;
  background-color: var(--palette-background-paper);
  color: var(--palette-text-primary);
  padding: var(--spacing);
  border-radius: var(--shape-borderRadius);
  z-index: 1000;
}

.skip-link:focus {
  top: 8px;
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Performance Optimizations

### Critical CSS Inlining
```css
/* Critical above-the-fold styles */
.critical-header {
  background-color: var(--palette-background-paper);
  border-bottom: 1px solid var(--palette-divider);
  height: var(--header-height);
}

.critical-nav {
  width: var(--nav-width);
  background-color: var(--palette-background-paper);
}
```

### CSS Containment
```css
.component-container {
  contain: layout style paint;
}

.isolated-component {
  contain: strict;
}
```

## Print Styles

### Print-Specific Styles
```css
@media print {
  * {
    background: transparent !important;
    color: black !important;
    box-shadow: none !important;
  }
  
  .no-print {
    display: none !important;
  }
  
  .print-only {
    display: block !important;
  }
  
  a, a:visited {
    text-decoration: underline;
  }
  
  a[href]:after {
    content: " (" attr(href) ")";
  }
  
  abbr[title]:after {
    content: " (" attr(title) ")";
  }
}
```

## Best Practices

### 1. CSS Organization
- Group related styles together
- Use consistent naming conventions
- Comment complex calculations
- Maintain separation of concerns

### 2. Performance
- Minimize CSS bundle size
- Use CSS containment where appropriate
- Optimize for Core Web Vitals
- Implement critical CSS strategies

### 3. Accessibility
- Ensure sufficient color contrast
- Provide focus indicators
- Support reduced motion preferences
- Test with assistive technologies

### 4. Maintainability
- Use CSS custom properties consistently
- Document complex styling decisions
- Keep utility classes atomic
- Regular auditing and cleanup

## Global Styles Benefits

- **Systematic Design**: Consistent visual language across all components
- **Performance**: Optimized CSS delivery and rendering
- **Accessibility**: Built-in accessibility enhancements
- **Maintainability**: Centralized styling management
- **Flexibility**: Easy customization through CSS variables
- **Responsive**: Mobile-first responsive design patterns
- **Dark Mode**: Complete light/dark theme support

The Global Styles system provides a robust foundation for scalable, maintainable, and accessible web applications while ensuring consistent user experience across all components and pages.