# Typography - Minimals.cc Documentation

## Overview
The typography system in Minimals.cc provides a comprehensive font configuration with responsive design and consistent theming across all text elements.

## Font Families

### Primary Fonts
- **Primary**: "DM Sans Variable", "Barlow"
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
- **Monospace**: 'DM Mono'

## Typography Configuration

### Font Styles
The system defines font styles for various text elements:

#### Headings (h1-h6)
- **H1**: 800 2.5rem/1.25 "Barlow"
- **H2-H6**: Various weights and sizes following a responsive scale
- Consistent line heights for optimal readability

#### Text Elements
- **Body Text**: 400 1rem/1.5 "DM Sans Variable"
- **Subtitles**: Multiple variations for different use cases
- **Captions**: Smaller text with appropriate line spacing
- **Button Text**: 700 0.875rem/1.7142857142857142 "DM Sans Variable"
- **Overline**: Uppercase styled text for labels

## CSS Variables

### Key Typography Variables
```css
--font-h1: 800 2.5rem/1.25 "Barlow"
--font-body1: 400 1rem/1.5 "DM Sans Variable"
--font-button: 700 0.875rem/1.7142857142857142 "DM Sans Variable"
```

## Responsive Design

### Breakpoint System
- Typography adjusts across different screen sizes
- Responsive font sizes maintain readability on all devices
- Line height variations optimize for different contexts

### Font Weight Options
- **400**: Regular text
- **500**: Medium emphasis
- **600**: Semi-bold
- **700**: Bold (buttons, emphasis)
- **800**: Extra bold (headings)

## Text Transformations
- **Uppercase**: For overline and label text
- **Inherit**: Maintains parent element styling
- **None**: Default text casing

## Customization

### Theme Integration
- Uses CSS variables for easy theming
- Supports light and dark color schemes
- Consistent typography across different components
- Easy override through CSS custom properties

### Implementation Example
```css
.custom-heading {
  font: var(--font-h1);
  color: var(--palette-text-primary);
}

.custom-body {
  font: var(--font-body1);
  color: var(--palette-text-secondary);
}
```

## Best Practices

1. **Consistency**: Use predefined font variables rather than custom definitions
2. **Responsiveness**: Leverage built-in responsive scaling
3. **Accessibility**: Maintain contrast ratios for all text elements
4. **Performance**: Utilize variable fonts for optimized loading
5. **Hierarchy**: Follow established heading hierarchy (H1-H6)

## Design System Benefits

- **Flexible**: Easy to customize while maintaining consistency
- **Scalable**: Responsive design works across all device sizes
- **Accessible**: Optimized line heights and font sizes for readability
- **Modern**: Uses variable fonts for better performance and flexibility
- **Themeable**: Supports multiple color schemes and customization options

The typography system is designed to provide a professional, readable, and flexible foundation for all text content while maintaining design consistency throughout the application.