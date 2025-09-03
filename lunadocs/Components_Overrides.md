# Components Overrides - Minimals.cc Documentation

## Overview
The Components Overrides system in Minimals.cc provides comprehensive customization of Material-UI components through theme overrides, CSS variables integration, and systematic styling patterns.

## Override Architecture

### File Structure
```
src/
├── theme/
│   ├── overrides/
│   │   ├── index.js          # Main overrides export
│   │   ├── Button.js         # Button component overrides
│   │   ├── Card.js          # Card component overrides
│   │   ├── TextField.js     # TextField component overrides
│   │   ├── AppBar.js        # AppBar component overrides
│   │   ├── Drawer.js        # Drawer component overrides
│   │   └── ...              # Other component overrides
│   └── components.js         # Components configuration
```

### Integration Pattern
```javascript
// src/theme/index.js
import { createTheme } from '@mui/material/styles';
import componentOverrides from './overrides';

const theme = createTheme({
  // ... other theme configuration
  components: componentOverrides,
});

export default theme;
```

## Core Override Patterns

### 1. CSS Variables Integration
```javascript
// Integration with design system variables
const buttonOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 'var(--shape-borderRadius)',
        fontSize: '0.875rem',
        fontWeight: 700,
        textTransform: 'none',
        padding: 'calc(var(--spacing) * 1.25) calc(var(--spacing) * 2)',
        transition: 'all var(--transition-duration) var(--transition-easing)',
        boxShadow: 'none',
        
        '&:hover': {
          boxShadow: 'var(--shadows-4)',
        },
        
        '&:focus': {
          boxShadow: '0 0 0 2px rgba(var(--palette-primary-mainChannel), 0.24)',
        },
      },
    },
  },
};
```

### 2. Variant-Specific Overrides
```javascript
// Different styles for different variants
const buttonVariantOverrides = {
  MuiButton: {
    styleOverrides: {
      containedPrimary: {
        backgroundColor: 'var(--palette-primary-main)',
        color: 'var(--palette-primary-contrastText)',
        
        '&:hover': {
          backgroundColor: 'var(--palette-primary-dark)',
        },
        
        '&:disabled': {
          backgroundColor: 'var(--palette-action-disabledBackground)',
          color: 'var(--palette-action-disabled)',
        },
      },
      
      outlinedPrimary: {
        borderColor: 'var(--palette-primary-main)',
        color: 'var(--palette-primary-main)',
        backgroundColor: 'transparent',
        
        '&:hover': {
          backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.04)',
          borderColor: 'var(--palette-primary-main)',
        },
      },
      
      textPrimary: {
        color: 'var(--palette-primary-main)',
        
        '&:hover': {
          backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.04)',
        },
      },
    },
  },
};
```

## Complete Component Overrides

### 1. Button Component
```javascript
// src/theme/overrides/Button.js
const Button = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      disableRipple: false,
    },
    
    styleOverrides: {
      root: {
        fontWeight: 700,
        borderRadius: 'var(--shape-borderRadius)',
        textTransform: 'none',
        fontSize: '0.875rem',
        lineHeight: 1.71,
        padding: '10px 16px',
        minHeight: 44, // Accessibility: minimum touch target
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        
        '&.Mui-disabled': {
          opacity: 0.6,
        },
      },
      
      sizeLarge: {
        padding: '12px 24px',
        fontSize: '0.9375rem',
        minHeight: 48,
      },
      
      sizeSmall: {
        padding: '6px 12px',
        fontSize: '0.8125rem',
        minHeight: 32,
      },
      
      containedPrimary: {
        backgroundColor: 'var(--palette-primary-main)',
        color: 'var(--palette-primary-contrastText)',
        boxShadow: 'var(--shadows-2)',
        
        '&:hover': {
          backgroundColor: 'var(--palette-primary-dark)',
          boxShadow: 'var(--shadows-4)',
        },
        
        '&:active': {
          backgroundColor: 'var(--palette-primary-dark)',
          boxShadow: 'var(--shadows-1)',
        },
      },
      
      containedSecondary: {
        backgroundColor: 'var(--palette-secondary-main)',
        color: 'var(--palette-secondary-contrastText)',
        
        '&:hover': {
          backgroundColor: 'var(--palette-secondary-dark)',
        },
      },
      
      outlinedPrimary: {
        border: '1px solid var(--palette-primary-main)',
        color: 'var(--palette-primary-main)',
        
        '&:hover': {
          backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.04)',
          border: '1px solid var(--palette-primary-main)',
        },
      },
      
      textPrimary: {
        color: 'var(--palette-primary-main)',
        
        '&:hover': {
          backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.04)',
        },
      },
    },
  },
  
  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
      grouped: {
        borderRadius: 'var(--shape-borderRadius)',
        '&:not(:last-of-type)': {
          borderRightColor: 'transparent',
        },
      },
    },
  },
};

export default Button;
```

### 2. Card Component
```javascript
// src/theme/overrides/Card.js
const Card = {
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: 'var(--palette-background-paper)',
        borderRadius: 'var(--shape-borderRadius-lg)',
        border: '1px solid var(--palette-divider)',
        boxShadow: 'var(--shadows-1)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        
        '&:hover': {
          boxShadow: 'var(--shadows-8)',
        },
      },
    },
  },
  
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 'calc(var(--spacing) * 3)',
        
        '&:last-child': {
          paddingBottom: 'calc(var(--spacing) * 3)',
        },
      },
    },
  },
  
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: '0 calc(var(--spacing) * 3) calc(var(--spacing) * 3)',
        justifyContent: 'flex-end',
        gap: 'var(--spacing)',
      },
    },
  },
  
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 'calc(var(--spacing) * 3) calc(var(--spacing) * 3) 0',
      },
      title: {
        fontSize: '1.125rem',
        fontWeight: 600,
        color: 'var(--palette-text-primary)',
      },
      subheader: {
        fontSize: '0.875rem',
        color: 'var(--palette-text-secondary)',
        marginTop: '4px',
      },
    },
  },
};

export default Card;
```

### 3. TextField Component
```javascript
// src/theme/overrides/TextField.js
const TextField = {
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'medium',
    },
  },
  
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        backgroundColor: 'var(--palette-background-paper)',
        borderRadius: 'var(--shape-borderRadius)',
        
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--palette-divider)',
          transition: 'border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
        
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--palette-text-primary)',
        },
        
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--palette-primary-main)',
          borderWidth: 2,
        },
        
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--palette-error-main)',
        },
        
        '&.Mui-disabled': {
          backgroundColor: 'var(--palette-action-hover)',
          
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--palette-action-disabled)',
          },
        },
      },
      
      input: {
        padding: '12px 14px',
        fontSize: '0.875rem',
        color: 'var(--palette-text-primary)',
        
        '&::placeholder': {
          color: 'var(--palette-text-secondary)',
          opacity: 1,
        },
      },
      
      sizeSmall: {
        '& .MuiOutlinedInput-input': {
          padding: '8px 12px',
          fontSize: '0.8125rem',
        },
      },
    },
  },
  
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: 'var(--palette-text-secondary)',
        fontSize: '0.875rem',
        
        '&.Mui-focused': {
          color: 'var(--palette-primary-main)',
        },
        
        '&.Mui-error': {
          color: 'var(--palette-error-main)',
        },
      },
      
      shrink: {
        fontSize: '0.75rem',
        transform: 'translate(14px, -9px) scale(1)',
      },
    },
  },
  
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        fontSize: '0.75rem',
        marginTop: 6,
        color: 'var(--palette-text-secondary)',
        
        '&.Mui-error': {
          color: 'var(--palette-error-main)',
        },
      },
    },
  },
};

export default TextField;
```

### 4. AppBar Component
```javascript
// src/theme/overrides/AppBar.js
const AppBar = {
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
      color: 'transparent',
    },
    
    styleOverrides: {
      root: {
        backgroundColor: 'var(--palette-background-paper)',
        borderBottom: '1px solid var(--palette-divider)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        height: 'var(--layout-header-height)',
        
        '& .MuiToolbar-root': {
          minHeight: 'var(--layout-header-height)',
          padding: '0 calc(var(--spacing) * 3)',
        },
      },
      
      colorPrimary: {
        backgroundColor: 'var(--palette-primary-main)',
        color: 'var(--palette-primary-contrastText)',
        
        '& .MuiIconButton-root': {
          color: 'inherit',
        },
      },
    },
  },
  
  MuiToolbar: {
    styleOverrides: {
      root: {
        minHeight: 'var(--layout-header-height)',
        '@media (min-width: 600px)': {
          minHeight: 'var(--layout-header-height)',
        },
      },
    },
  },
};

export default AppBar;
```

### 5. Navigation Drawer
```javascript
// src/theme/overrides/Drawer.js
const Drawer = {
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: 'var(--palette-background-paper)',
        borderRight: '1px solid var(--palette-divider)',
        width: 'var(--layout-nav-width)',
        
        '&.MuiDrawer-paperAnchorLeft': {
          borderRight: '1px solid var(--palette-divider)',
        },
        
        '&.MuiDrawer-paperAnchorRight': {
          borderLeft: '1px solid var(--palette-divider)',
        },
      },
    },
  },
  
  MuiList: {
    styleOverrides: {
      root: {
        padding: 'calc(var(--spacing) * 2)',
      },
    },
  },
  
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: 'var(--shape-borderRadius)',
        marginBottom: 'var(--spacing)',
        
        '&.Mui-selected': {
          backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.12)',
          color: 'var(--palette-primary-main)',
          
          '&:hover': {
            backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.16)',
          },
          
          '& .MuiListItemIcon-root': {
            color: 'var(--palette-primary-main)',
          },
        },
        
        '&:hover': {
          backgroundColor: 'var(--palette-action-hover)',
        },
      },
    },
  },
  
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 'var(--shape-borderRadius)',
        padding: 'calc(var(--spacing) * 1.5)',
        minHeight: 44, // Accessibility: minimum touch target
        
        '&:hover': {
          backgroundColor: 'var(--palette-action-hover)',
        },
        
        '&.Mui-selected': {
          backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.12)',
          
          '&:hover': {
            backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.16)',
          },
        },
      },
    },
  },
};

export default Drawer;
```

## Advanced Override Patterns

### 1. Responsive Overrides
```javascript
const responsiveOverrides = {
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: 'calc(var(--spacing) * 2)',
        paddingRight: 'calc(var(--spacing) * 2)',
        
        '@media (min-width: 600px)': {
          paddingLeft: 'calc(var(--spacing) * 3)',
          paddingRight: 'calc(var(--spacing) * 3)',
        },
        
        '@media (min-width: 1200px)': {
          paddingLeft: 'calc(var(--spacing) * 4)',
          paddingRight: 'calc(var(--spacing) * 4)',
        },
      },
    },
  },
};
```

### 2. Dark Mode Specific Overrides
```javascript
const darkModeOverrides = {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: 'var(--palette-background-paper)',
        
        '[data-color-scheme="dark"] &': {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        },
      },
    },
  },
};
```

### 3. Animation Overrides
```javascript
const animationOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        
        '&:hover': {
          transform: 'translateY(-1px)',
        },
        
        '&:active': {
          transform: 'translateY(0)',
        },
        
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          
          '&:hover, &:active': {
            transform: 'none',
          },
        },
      },
    },
  },
};
```

### 4. Custom Component Variants
```javascript
const customVariants = {
  MuiButton: {
    variants: [
      {
        props: { variant: 'gradient' },
        style: {
          background: 'linear-gradient(135deg, var(--palette-primary-main) 0%, var(--palette-secondary-main) 100%)',
          color: 'white',
          border: 'none',
          
          '&:hover': {
            background: 'linear-gradient(135deg, var(--palette-primary-dark) 0%, var(--palette-secondary-dark) 100%)',
          },
        },
      },
      {
        props: { variant: 'soft' },
        style: {
          backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.08)',
          color: 'var(--palette-primary-main)',
          border: 'none',
          
          '&:hover': {
            backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.12)',
          },
        },
      },
    ],
  },
};
```

## Consolidating All Overrides

### Main Override Export
```javascript
// src/theme/overrides/index.js
import Button from './Button';
import Card from './Card';
import TextField from './TextField';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Chip from './Chip';
import Dialog from './Dialog';
import Menu from './Menu';
import Table from './Table';
import Tabs from './Tabs';

const componentOverrides = {
  ...Button,
  ...Card,
  ...TextField,
  ...AppBar,
  ...Drawer,
  ...Chip,
  ...Dialog,
  ...Menu,
  ...Table,
  ...Tabs,
};

export default componentOverrides;
```

## Best Practices

### 1. Consistency
- Use CSS variables consistently across all overrides
- Follow the same naming conventions
- Maintain consistent spacing and sizing patterns

### 2. Accessibility
- Ensure minimum touch target sizes (44px)
- Maintain sufficient color contrast ratios
- Provide focus indicators for keyboard navigation
- Support reduced motion preferences

### 3. Performance
- Avoid complex selectors where possible
- Use efficient CSS properties
- Minimize style recalculations
- Implement CSS containment where appropriate

### 4. Maintainability
- Document complex override patterns
- Keep overrides modular and organized
- Use meaningful variable names
- Test overrides across all variants and states

### 5. Responsiveness
- Implement mobile-first responsive design
- Use appropriate breakpoints
- Test on various screen sizes
- Consider touch vs. mouse interactions

## Testing Overrides

### Visual Testing
```javascript
// src/tests/overrides.test.js
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Button from '@mui/material/Button';

test('Button override applies correct styles', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Test Button
      </Button>
    </ThemeProvider>
  );
  
  const button = container.querySelector('button');
  const styles = getComputedStyle(button);
  
  expect(styles.borderRadius).toBe('8px');
  expect(styles.textTransform).toBe('none');
  expect(styles.fontWeight).toBe('700');
});
```

## Override Benefits

- **Consistent Design**: Unified visual language across all components
- **Flexible Customization**: Easy theme modifications without code changes
- **Accessibility**: Built-in accessibility enhancements
- **Performance**: Optimized CSS delivery and rendering
- **Maintainability**: Centralized styling management
- **Dark Mode**: Complete light/dark theme support
- **Responsive**: Mobile-first responsive design patterns

The Components Overrides system provides comprehensive control over Material-UI component appearance and behavior while maintaining design consistency, accessibility, and performance optimization.