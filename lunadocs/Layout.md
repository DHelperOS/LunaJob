# Layout - Minimals.cc Documentation

## Overview
The Minimals.cc layout system provides a flexible, responsive grid-based architecture with comprehensive breakpoint management and adaptive design patterns.

## Layout Architecture

### Core Layout Variables
```css
--nav-width: 280px;
--header-height: 64px;
--spacing: 8px;
--shape-borderRadius: 8px;
```

### Grid System Configuration
- **Default Columns**: 12-column grid system
- **Responsive**: Adapts to different screen sizes
- **Flexible**: Uses CSS Grid and Flexbox for optimal layout control

## Grid Configuration

### Basic Grid Properties
```css
--Grid-columnSpacing: [variable spacing];
--Grid-rowSpacing: [variable spacing];
```

### Column Calculations
The system uses complex CSS `calc()` functions for responsive column width calculations:
- Percentage-based width calculations
- Dynamic spacing adjustments
- Responsive column configurations

### Breakpoint System
```css
/* Mobile First Approach */
/* xs: 0px */
/* sm: 600px */
/* md: 900px */
/* lg: 1200px */
```

## Responsive Design Patterns

### Media Query Implementation
```css
@media (min-width: 600px) {
  /* Tablet adjustments */
}

@media (min-width: 900px) {
  /* Desktop adjustments */
}

@media (min-width: 1200px) {
  /* Large desktop adjustments */
}
```

### Adaptive Properties
- **Padding**: Responsive padding based on screen size
- **Margins**: Dynamic margin calculations
- **Display**: Conditional display properties
- **Flexbox**: Flexible container adjustments

## Layout Components

### 1. Navigation Sidebar
```css
.navigation {
  width: var(--nav-width); /* 280px */
  position: fixed;
  height: 100vh;
  
  /* Responsive behavior */
  display: none; /* Hidden on mobile */
}

@media (min-width: 900px) {
  .navigation {
    display: block; /* Visible on desktop */
  }
}
```

### 2. Header Component
```css
.header {
  height: var(--header-height); /* 64px */
  position: sticky;
  top: 0;
  z-index: var(--zIndex-appBar);
  
  /* Responsive padding */
  padding-left: calc(var(--spacing) * 2);
  padding-right: calc(var(--spacing) * 2);
}
```

### 3. Main Content Area
```css
.content {
  /* Dynamic padding based on navigation */
  padding-left: 0;
  
  /* Responsive content padding */
  padding: calc(var(--spacing) * 2);
}

@media (min-width: 900px) {
  .content {
    padding-left: var(--nav-width);
  }
}
```

### 4. Grid Container
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: calc(var(--spacing) * 2);
  
  /* Responsive grid adjustments */
  grid-template-columns: repeat(var(--grid-columns, 12), 1fr);
}
```

## Flexbox Layout Patterns

### Container Properties
```css
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: var(--spacing);
}

/* Responsive flex direction */
@media (min-width: 600px) {
  .flex-container {
    flex-direction: row;
  }
}
```

### Item Properties
```css
.flex-item {
  flex: 1 1 auto;
  min-width: 0; /* Prevent flex items from overflowing */
}

/* Responsive flex basis */
@media (min-width: 600px) {
  .flex-item {
    flex-basis: 50%;
  }
}
```

## Layout Utilities

### Spacing Utilities
```css
.p-1 { padding: var(--spacing); }
.p-2 { padding: calc(var(--spacing) * 2); }
.p-3 { padding: calc(var(--spacing) * 3); }

.m-1 { margin: var(--spacing); }
.m-2 { margin: calc(var(--spacing) * 2); }
.m-3 { margin: calc(var(--spacing) * 3); }
```

### Display Utilities
```css
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
.d-grid { display: grid; }

/* Responsive display */
.d-sm-block { display: none; }
@media (min-width: 600px) {
  .d-sm-block { display: block; }
}
```

## Responsive Layout Examples

### 1. Dashboard Layout
```css
.dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content";
  grid-template-rows: var(--header-height) 1fr;
  grid-template-columns: var(--nav-width) 1fr;
  height: 100vh;
}

@media (max-width: 899px) {
  .dashboard {
    grid-template-areas:
      "header"
      "content";
    grid-template-columns: 1fr;
  }
}
```

### 2. Card Grid Layout
```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 2);
}

@media (min-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 3. Responsive Container
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 calc(var(--spacing) * 2);
}

@media (min-width: 600px) {
  .container {
    padding: 0 calc(var(--spacing) * 3);
  }
}

@media (min-width: 900px) {
  .container {
    padding: 0 calc(var(--spacing) * 4);
  }
}
```

## Advanced Layout Techniques

### 1. Sticky Positioning
```css
.sticky-header {
  position: sticky;
  top: 0;
  z-index: var(--zIndex-appBar);
  background-color: var(--palette-background-paper);
}
```

### 2. Overflow Management
```css
.scrollable-content {
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
  overflow-x: hidden;
}
```

### 3. Aspect Ratio Containers
```css
.aspect-ratio-16-9 {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.aspect-ratio-1-1 {
  aspect-ratio: 1 / 1;
  overflow: hidden;
}
```

## Performance Considerations

### 1. Layout Optimization
```css
/* Use transform instead of changing layout properties */
.optimized-animation {
  transform: translateX(var(--nav-width));
  transition: transform 0.3s ease;
}
```

### 2. Container Queries (Modern Browsers)
```css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

## Best Practices

### 1. Mobile-First Design
- Start with mobile styles
- Use min-width media queries for larger screens
- Progressive enhancement approach

### 2. Consistent Spacing
- Use the spacing system (`var(--spacing)`)
- Maintain consistent margins and padding
- Use calc() for proportional spacing

### 3. Flexible Grids
- Use CSS Grid for 2D layouts
- Use Flexbox for 1D layouts
- Combine both for complex layouts

### 4. Accessibility
- Maintain logical reading order
- Ensure touch targets are adequately sized (44px minimum)
- Test with keyboard navigation

### 5. Performance
- Minimize layout thrashing
- Use CSS containment where appropriate
- Optimize for Core Web Vitals

## Layout System Benefits

- **Responsive**: Adapts seamlessly to all device sizes
- **Flexible**: Grid and Flexbox provide maximum layout control
- **Consistent**: Systematic spacing and sizing
- **Maintainable**: CSS variables enable easy customization
- **Performance**: Optimized for smooth animations and interactions
- **Accessible**: Designed with accessibility principles in mind

The layout system provides a robust foundation for creating responsive, accessible, and maintainable user interfaces while ensuring consistent spacing and visual hierarchy across all components.