# Minimal Template - Colors & Theme Configuration

## Customize Theme Colors

To customize global theme colors, update the following files:
- `src/theme/theme-config.ts`
- `src/theme/core/palette.ts`

## Example Color Configuration

```typescript
{
  "primary": {
    "lighter": "#C8FAD6",
    "light": "#5BE49B", 
    "main": "#00A76F",
    "dark": "#007867",
    "darker": "#004B50",
    "contrastText": "#FFFFFF"
  },
  // ...other colors
}
```

## Color Tools & References

### Eva Design Colors (Recommended)

Another great tool for generating harmonious palettes:
🔗 **Website**: [colors.eva.design](https://colors.eva.design/)

👉 **Recommended token mapping:**
- `100` → lighter
- `300` → light  
- `500` → main
- `700` → dark
- `900` → darker

### Material UI Colors

Use the official Material UI color tool:
🔗 **Website**: [mui.com/customization/color](https://mui.com/customization/color/)

## Reference Implementation

🔗 **Live Demo**: https://minimals.cc/components/foundation/colors

## Color System Architecture

### Primary Color Variants
The Minimal template uses a 5-tier color system for each primary color:
1. **lighter** - Backgrounds, subtle accents
2. **light** - Hover states, secondary actions
3. **main** - Primary actions, key elements
4. **dark** - Active states, emphasis
5. **darker** - High contrast, critical elements

### Best Practices

1. **Consistency**: Use the same color tokens across all components
2. **Accessibility**: Ensure proper contrast ratios (WCAG compliance)
3. **Semantic Meaning**: Assign colors based on function (success, error, warning, info)
4. **Theme Compatibility**: Test colors in both light and dark themes

### Implementation Tips

1. **Global Theme**: Define colors in theme configuration files
2. **Component Level**: Use theme colors instead of hardcoded values
3. **CSS Variables**: Leverage CSS custom properties for dynamic theming
4. **Testing**: Validate color combinations across different screens and devices

---
**Source**: https://docs.minimals.cc/colors
**Date**: 2025-09-02
**Project**: Luna Job (루나알바)