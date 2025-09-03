# CSS Variables (Custom Properties) - Minimals.cc Documentation

## Overview
The Minimals.cc design system utilizes an extensive CSS variables architecture for comprehensive theming, providing systematic control over all visual aspects through centralized custom properties.

## Architecture

### Root-Level Definitions
CSS variables are defined in `:root` and `[data-color-scheme]` selectors, providing global access throughout the application:

```css
:root, [data-color-scheme="light"] {
  /* Core system variables */
}

[data-color-scheme="dark"] {
  /* Dark mode overrides */
}
```

## Core Variable Categories

### 1. Spacing System
```css
--spacing: 8px;
```
- **Base unit**: 8px for consistent spacing
- **Multiplication**: Use with calc() for larger spaces
- **Implementation**: `margin: calc(var(--spacing) * 2);`

### 2. Shape & Border Radius
```css
--shape-borderRadius: 8px;
```
- **Consistent rounding**: Applied across all UI components
- **Customizable**: Easy global border radius adjustments
- **Usage**: `border-radius: var(--shape-borderRadius);`

### 3. Shadow System
```css
--shadows-0: none;
--shadows-1: 0px 2px 1px -1px rgba(0,0,0,0.2), ...;
/* ... up to --shadows-24 */

--customShadows-z1: [custom shadow definition];
/* ... up to --customShadows-z24 */
```

### 4. Z-Index Management
```css
--zIndex-appBar: 1100;
--zIndex-drawer: 1200;
--zIndex-modal: 1300;
--zIndex-snackbar: 1400;
--zIndex-tooltip: 1500;
```

### 5. Typography Variables
```css
--font-h1: 800 2.5rem/1.25 "Barlow";
--font-body1: 400 1rem/1.5 "DM Sans Variable";
--font-button: 700 0.875rem/1.7142857142857142 "DM Sans Variable";
--font-caption: 400 0.75rem/1.66 "DM Sans Variable";
```

## Color Palette System

### Primary & Secondary Colors
```css
--palette-primary-main: #FF9100;
--palette-primary-light: #FFB94A;
--palette-primary-dark: #E8760C;
--palette-primary-contrastText: #FFFFFF;

--palette-secondary-main: #8E33FF;
--palette-secondary-light: #A95CFF;
--palette-secondary-dark: #7B24E8;
```

### Semantic Colors
```css
--palette-error-main: #FF3030;
--palette-warning-main: #FFAB00;
--palette-info-main: #006C9C;
--palette-success-main: #00A76F;
```

### Text Colors
```css
--palette-text-primary: rgba(33, 43, 54, 0.87);
--palette-text-secondary: rgba(33, 43, 54, 0.6);
--palette-text-disabled: rgba(33, 43, 54, 0.38);
```

### Background Colors
```css
--palette-background-default: #FFFFFF;
--palette-background-paper: #FFFFFF;
--palette-background-neutral: #F4F6F8;
```

## Advanced Color Features

### Channel Values
For advanced color manipulation:
```css
--palette-primary-mainChannel: 255 145 0;
--palette-primary-lightChannel: 255 185 74;
--palette-primary-darkChannel: 232 118 12;
```

Usage with transparency:
```css
background-color: rgba(var(--palette-primary-mainChannel), 0.5);
```

### Hover & Focus States
```css
--palette-action-hover: rgba(33, 43, 54, 0.04);
--palette-action-focus: rgba(33, 43, 54, 0.12);
--palette-action-selected: rgba(33, 43, 54, 0.08);
--palette-action-disabled: rgba(33, 43, 54, 0.26);
```

## Dark Mode Support

### Color Scheme Toggle
```css
[data-color-scheme="dark"] {
  --palette-background-default: #141A21;
  --palette-text-primary: rgba(255, 255, 255, 0.87);
  --palette-text-secondary: rgba(255, 255, 255, 0.6);
  /* ... other dark mode overrides */
}
```

### Implementation Example
```html
<body data-color-scheme="dark">
  <!-- Dark mode automatically applied -->
</body>
```

## Usage Patterns

### Component Styling
```css
.card {
  background-color: var(--palette-background-paper);
  color: var(--palette-text-primary);
  border-radius: var(--shape-borderRadius);
  box-shadow: var(--shadows-1);
  padding: var(--spacing);
}
```

### Responsive Variables
```css
@media (min-width: 600px) {
  :root {
    --font-h1: 800 3rem/1.2 "Barlow";
  }
}
```

### Dynamic Theming
```css
.theme-blue {
  --palette-primary-main: #2196F3;
  --palette-primary-light: #64B5F6;
  --palette-primary-dark: #1976D2;
}
```

## Customization Strategies

### 1. Global Overrides
```css
:root {
  --palette-primary-main: #YOUR_COLOR;
  --shape-borderRadius: 16px;
  --spacing: 10px;
}
```

### 2. Component-Specific Variables
```css
.custom-button {
  --local-button-color: var(--palette-secondary-main);
  background-color: var(--local-button-color);
}
```

### 3. Conditional Theming
```css
[data-theme="corporate"] {
  --palette-primary-main: #003366;
  --palette-secondary-main: #FF6B00;
}
```

## Best Practices

### Performance
1. **Minimal Overrides**: Only override necessary variables
2. **Scope Appropriately**: Use specific selectors for component-level changes
3. **Avoid Inline Styles**: Use CSS classes with variables instead

### Maintainability
1. **Consistent Naming**: Follow the established naming convention
2. **Documentation**: Document custom variable purposes
3. **Fallback Values**: Provide fallbacks where appropriate

### Accessibility
1. **Contrast Ratios**: Ensure text colors meet WCAG guidelines
2. **Color Blind Friendly**: Test color combinations
3. **Reduced Motion**: Respect user preferences

## Implementation Example

### Complete Component Theming
```css
.custom-dashboard {
  /* Layout */
  padding: calc(var(--spacing) * 3);
  border-radius: var(--shape-borderRadius);
  
  /* Colors */
  background-color: var(--palette-background-paper);
  border: 1px solid var(--palette-divider);
  
  /* Typography */
  font: var(--font-body1);
  color: var(--palette-text-primary);
  
  /* Elevation */
  box-shadow: var(--shadows-2);
  
  /* Z-index */
  z-index: var(--zIndex-appBar);
}
```

## Technical Benefits

- **Systematic Design**: Centralized control over all visual aspects
- **Dynamic Theming**: Runtime theme switching capability
- **Performance**: CSS variables are faster than JavaScript-based theming
- **Maintainability**: Single source of truth for design tokens
- **Flexibility**: Easy customization without modifying core styles
- **Consistency**: Guaranteed visual consistency across components

The CSS variables system provides a robust foundation for scalable, maintainable, and highly customizable design systems.