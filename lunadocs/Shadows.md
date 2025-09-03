# Shadows - Minimals.cc Documentation

## Overview
The shadow system in Minimals.cc provides a comprehensive set of elevation shadows with multi-layered effects, supporting both light and dark color schemes for consistent depth and hierarchy.

## Shadow Configuration

### File Structure
- **Core Shadows**: `src/theme/core/shadows`
- **Custom Shadows**: `src/theme/core/customShadows`
- **Implementation**: CSS variables with multiple shadow levels (0-24)

### Shadow Levels
The system provides 25 levels of shadows (0-24) with increasing depth and complexity:

#### Standard Shadows
```css
--shadows-0: none
--shadows-1: 0px 2px 1px -1px rgba(0,0,0,0.2),
             0px 1px 1px 0px rgba(0,0,0,0.14),
             0px 1px 3px 0px rgba(0,0,0,0.12)
--shadows-2: [More complex multi-layer shadow]
/* ... continues up to --shadows-24 */
```

#### Custom Shadows
```css
--customShadows-z1: [Custom shadow variation]
--customShadows-z2: [Custom shadow variation]
/* ... continues up to --customShadows-z24 */
```

## Shadow Characteristics

### Multi-Layer Approach
Each shadow uses multiple layers for realistic depth:
1. **Primary Shadow**: Main shadow with higher opacity
2. **Ambient Shadow**: Softer, larger shadow for depth
3. **Contact Shadow**: Subtle shadow for surface contact

### RGBA Values
- Uses rgba values for subtle, layered shadow effects
- Opacity values carefully calibrated for visual hierarchy
- Black-based shadows with varying transparency levels

### Example Shadow Breakdown
```css
--shadows-1: 
  0px 2px 1px -1px rgba(0,0,0,0.2),  /* Contact shadow */
  0px 1px 1px 0px rgba(0,0,0,0.14),  /* Penumbra */
  0px 1px 3px 0px rgba(0,0,0,0.12);  /* Ambient shadow */
```

## Color Scheme Support

### Light Mode
- Standard black-based shadows with appropriate opacity
- Optimized for light backgrounds
- Clear contrast and depth perception

### Dark Mode
- Adapted shadow values for dark themes
- Maintains visual hierarchy in dark environments
- Adjusted opacity values for dark backgrounds

### Implementation
```css
:root, [data-color-scheme="light"] {
  --shadows-1: 0px 2px 1px -1px rgba(0,0,0,0.2), ...;
}

[data-color-scheme="dark"] {
  --shadows-1: 0px 2px 1px -1px rgba(0,0,0,0.3), ...;
}
```

## Usage Guidelines

### Shadow Hierarchy
- **Level 0**: No shadow (flat elements)
- **Levels 1-4**: Subtle elevation (cards, buttons)
- **Levels 5-12**: Medium elevation (dialogs, menus)
- **Levels 13-24**: High elevation (tooltips, modals)

### Component Applications
```css
/* Button */
.button {
  box-shadow: var(--shadows-2);
}

/* Card */
.card {
  box-shadow: var(--shadows-1);
}

/* Modal */
.modal {
  box-shadow: var(--shadows-24);
}

/* Floating Action Button */
.fab {
  box-shadow: var(--customShadows-z8);
}
```

## Customization

### Override Shadows
```css
:root {
  --shadows-1: 0px 1px 3px rgba(0,0,0,0.1);
  --customShadows-z1: 0px 4px 8px rgba(0,0,0,0.15);
}
```

### Custom Shadow Creation
```css
.custom-element {
  box-shadow: 
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -1px rgba(0, 0, 0, 0.06);
}
```

## Best Practices

### Performance
1. Use predefined shadow variables instead of custom values
2. Avoid excessive shadow complexity
3. Consider performance impact of multiple shadows

### Design Consistency
1. Follow the established shadow hierarchy
2. Use appropriate shadow levels for component elevation
3. Maintain consistent shadow direction and intensity

### Accessibility
1. Ensure shadows don't interfere with text readability
2. Maintain sufficient contrast in both light and dark modes
3. Use shadows to enhance, not replace, other visual hierarchy cues

## Advanced Usage

### Animated Shadows
```css
.interactive-card {
  box-shadow: var(--shadows-2);
  transition: box-shadow 0.3s ease;
}

.interactive-card:hover {
  box-shadow: var(--shadows-8);
}
```

### Conditional Shadows
```css
.conditional-shadow {
  box-shadow: var(--shadows-1);
}

@media (prefers-reduced-motion: reduce) {
  .conditional-shadow {
    box-shadow: none;
  }
}
```

## Technical Benefits

- **Consistency**: Unified shadow system across all components
- **Flexibility**: Easy modification through CSS variables
- **Performance**: Optimized shadow definitions
- **Accessibility**: Support for multiple color schemes
- **Scalability**: 25 levels provide granular control over elevation hierarchy

The shadow system provides a sophisticated, flexible approach to adding depth and visual hierarchy while maintaining design consistency and performance optimization.