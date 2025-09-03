# Global Configuration - Minimals.cc Documentation

## Overview
The Global Configuration system in Minimals.cc provides centralized theme management, configuration options, and customization capabilities through a comprehensive CSS variable architecture and configuration files.

## Configuration Architecture

### File Structure
```
src/
├── theme/
│   ├── index.js              # Main theme export
│   ├── palette.js            # Color palette configurations
│   ├── typography.js         # Typography settings
│   ├── shadows.js           # Shadow definitions
│   ├── breakpoints.js       # Responsive breakpoint settings
│   ├── spacing.js           # Spacing system configuration
│   └── components/          # Component-specific overrides
```

## Core Configuration Files

### 1. Theme Index Configuration
```javascript
// src/theme/index.js
import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import shadows from './shadows';
import customShadows from './customShadows';

const theme = createTheme({
  palette,
  typography,
  shadows,
  customShadows,
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
```

### 2. Palette Configuration
```javascript
// src/theme/palette.js
const palette = {
  primary: {
    main: '#FF9100',
    light: '#FFB94A', 
    dark: '#E8760C',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#8E33FF',
    light: '#A95CFF',
    dark: '#7B24E8',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#FF3030',
    light: '#FF6B6B',
    dark: '#E01E1E',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFAB00',
    light: '#FFD54F',
    dark: '#FF8F00',
    contrastText: '#000000',
  },
  info: {
    main: '#006C9C',
    light: '#42A5F5',
    dark: '#0277BD',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#00A76F',
    light: '#66BB6A',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },
  grey: {
    50: '#F9FAFB',
    100: '#F4F6F8',
    200: '#DFE3E8',
    300: '#C4CDD5',
    400: '#919EAB',
    500: '#637381',
    600: '#454F5B',
    700: '#212B36',
    800: '#161C24',
    900: '#161C24',
  },
  text: {
    primary: 'rgba(33, 43, 54, 0.87)',
    secondary: 'rgba(33, 43, 54, 0.6)',
    disabled: 'rgba(33, 43, 54, 0.38)',
  },
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    neutral: '#F4F6F8',
  },
  action: {
    hover: 'rgba(33, 43, 54, 0.04)',
    selected: 'rgba(33, 43, 54, 0.08)',
    disabled: 'rgba(33, 43, 54, 0.26)',
    disabledBackground: 'rgba(33, 43, 54, 0.12)',
    focus: 'rgba(33, 43, 54, 0.12)',
  },
};

export default palette;
```

### 3. Typography Configuration
```javascript
// src/theme/typography.js
const typography = {
  fontFamily: '"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  
  h1: {
    fontFamily: 'Barlow',
    fontSize: '2.5rem',
    fontWeight: 800,
    lineHeight: 1.25,
  },
  h2: {
    fontFamily: 'Barlow',
    fontSize: '2rem',
    fontWeight: 800,
    lineHeight: 1.3,
  },
  h3: {
    fontFamily: 'Barlow',
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1.4,
  },
  h4: {
    fontFamily: 'Barlow',
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: 'Barlow',
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: 'Barlow',
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: 1.71,
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.66,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 700,
    lineHeight: 2.66,
    textTransform: 'uppercase',
  },
};

export default typography;
```

## CSS Variable Configuration

### Root Configuration
```css
:root, [data-color-scheme="light"] {
  /* Color Scheme */
  --color-scheme: light;
  
  /* Spacing System */
  --spacing: 8px;
  --spacing-unit: 8;
  
  /* Shape System */
  --shape-borderRadius: 8px;
  --shape-borderRadius-sm: 4px;
  --shape-borderRadius-lg: 12px;
  --shape-borderRadius-xl: 16px;
  --shape-borderRadius-full: 9999px;
  
  /* Breakpoints */
  --breakpoint-xs: 0;
  --breakpoint-sm: 600;
  --breakpoint-md: 900;
  --breakpoint-lg: 1200;
  --breakpoint-xl: 1536;
  
  /* Layout */
  --layout-header-height: 64px;
  --layout-nav-width: 280px;
  --layout-nav-mini-width: 64px;
  --layout-content-padding: 24px;
  
  /* Animation */
  --transition-duration: 200ms;
  --transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Z-Index Scale */
  --zIndex-appBar: 1100;
  --zIndex-drawer: 1200;
  --zIndex-modal: 1300;
  --zIndex-snackbar: 1400;
  --zIndex-tooltip: 1500;
  --zIndex-backdrop: 1200;
  --zIndex-speedDial: 1050;
}
```

### Dark Mode Configuration
```css
[data-color-scheme="dark"] {
  --color-scheme: dark;
  
  /* Background adjustments for dark mode */
  --palette-background-default: #141A21;
  --palette-background-paper: #1C252E;
  --palette-background-neutral: #28323D;
  
  /* Text adjustments for dark mode */
  --palette-text-primary: rgba(255, 255, 255, 0.87);
  --palette-text-secondary: rgba(255, 255, 255, 0.6);
  --palette-text-disabled: rgba(255, 255, 255, 0.38);
  
  /* Action adjustments for dark mode */
  --palette-action-hover: rgba(255, 255, 255, 0.08);
  --palette-action-selected: rgba(255, 255, 255, 0.16);
  --palette-action-focus: rgba(255, 255, 255, 0.12);
  
  /* Divider adjustments */
  --palette-divider: rgba(255, 255, 255, 0.12);
  
  /* Shadow adjustments for dark backgrounds */
  --shadows-1: 0px 2px 1px -1px rgba(0,0,0,0.3),
               0px 1px 1px 0px rgba(0,0,0,0.24),
               0px 1px 3px 0px rgba(0,0,0,0.20);
}
```

## Component Override Configuration

### Button Configuration
```javascript
// src/theme/components/button.js
const buttonOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 700,
        borderRadius: 'var(--shape-borderRadius)',
        padding: '10px 16px',
        fontSize: '0.875rem',
        lineHeight: 1.71,
        transition: 'all var(--transition-duration) var(--transition-easing)',
      },
      containedPrimary: {
        backgroundColor: 'var(--palette-primary-main)',
        color: 'var(--palette-primary-contrastText)',
        '&:hover': {
          backgroundColor: 'var(--palette-primary-dark)',
        },
      },
      outlinedPrimary: {
        borderColor: 'var(--palette-primary-main)',
        color: 'var(--palette-primary-main)',
        '&:hover': {
          borderColor: 'var(--palette-primary-dark)',
          backgroundColor: 'rgba(var(--palette-primary-mainChannel), 0.04)',
        },
      },
    },
  },
};

export default buttonOverrides;
```

### Card Configuration
```javascript
// src/theme/components/card.js
const cardOverrides = {
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: 'var(--palette-background-paper)',
        borderRadius: 'var(--shape-borderRadius-lg)',
        boxShadow: 'var(--shadows-1)',
        border: '1px solid var(--palette-divider)',
        transition: 'box-shadow var(--transition-duration) var(--transition-easing)',
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
};

export default cardOverrides;
```

## Configuration Management

### Environment-Based Configuration
```javascript
// src/config/index.js
const config = {
  // App Configuration
  app: {
    name: process.env.REACT_APP_NAME || 'Minimals',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    description: process.env.REACT_APP_DESCRIPTION || 'Minimal Dashboard',
  },
  
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
  },
  
  // Feature Flags
  features: {
    darkMode: process.env.REACT_APP_DARK_MODE !== 'false',
    analytics: process.env.REACT_APP_ANALYTICS === 'true',
    notifications: process.env.REACT_APP_NOTIFICATIONS !== 'false',
  },
  
  // Theme Configuration
  theme: {
    defaultMode: process.env.REACT_APP_DEFAULT_THEME || 'light',
    primaryColor: process.env.REACT_APP_PRIMARY_COLOR || '#FF9100',
    fontFamily: process.env.REACT_APP_FONT_FAMILY || 'DM Sans Variable',
  },
  
  // Layout Configuration
  layout: {
    navWidth: parseInt(process.env.REACT_APP_NAV_WIDTH) || 280,
    headerHeight: parseInt(process.env.REACT_APP_HEADER_HEIGHT) || 64,
    contentPadding: parseInt(process.env.REACT_APP_CONTENT_PADDING) || 24,
  },
};

export default config;
```

### Runtime Configuration
```javascript
// src/utils/configManager.js
class ConfigManager {
  constructor() {
    this.config = new Map();
    this.loadDefaultConfig();
  }
  
  loadDefaultConfig() {
    // Load configuration from various sources
    this.loadFromLocalStorage();
    this.loadFromEnvironment();
    this.loadFromAPI();
  }
  
  get(key, defaultValue = null) {
    return this.config.get(key) || defaultValue;
  }
  
  set(key, value) {
    this.config.set(key, value);
    this.saveToLocalStorage();
    this.notifyConfigChange(key, value);
  }
  
  loadFromLocalStorage() {
    const savedConfig = localStorage.getItem('app-config');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      Object.entries(parsedConfig).forEach(([key, value]) => {
        this.config.set(key, value);
      });
    }
  }
  
  saveToLocalStorage() {
    const configObject = Object.fromEntries(this.config);
    localStorage.setItem('app-config', JSON.stringify(configObject));
  }
  
  notifyConfigChange(key, value) {
    // Emit configuration change events
    window.dispatchEvent(new CustomEvent('configChange', {
      detail: { key, value }
    }));
  }
}

export const configManager = new ConfigManager();
```

## Theme Customization

### Custom Theme Creation
```javascript
// src/theme/custom/corporate.js
const corporateTheme = {
  palette: {
    primary: {
      main: '#003366',
      light: '#4A90E2',
      dark: '#001122',
    },
    secondary: {
      main: '#FF6B00',
      light: '#FF9500',
      dark: '#CC5500',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
      neutral: '#E9ECEF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 4,
  },
};

export default corporateTheme;
```

### Dynamic Theme Switching
```javascript
// src/hooks/useTheme.js
import { useState, useEffect, createContext, useContext } from 'react';
import { configManager } from '../utils/configManager';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [customization, setCustomization] = useState({});
  
  useEffect(() => {
    // Load theme from configuration
    const savedTheme = configManager.get('theme', 'light');
    const savedCustomization = configManager.get('themeCustomization', {});
    
    setCurrentTheme(savedTheme);
    setCustomization(savedCustomization);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
  }, []);
  
  const switchTheme = (theme) => {
    setCurrentTheme(theme);
    configManager.set('theme', theme);
    document.documentElement.setAttribute('data-color-scheme', theme);
  };
  
  const updateCustomization = (updates) => {
    const newCustomization = { ...customization, ...updates };
    setCustomization(newCustomization);
    configManager.set('themeCustomization', newCustomization);
    
    // Apply custom CSS variables
    Object.entries(updates).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--custom-${key}`, value);
    });
  };
  
  return (
    <ThemeContext.Provider value={{
      currentTheme,
      customization,
      switchTheme,
      updateCustomization,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## Configuration Validation

### Schema Validation
```javascript
// src/utils/configValidation.js
import Joi from 'joi';

const configSchema = Joi.object({
  theme: Joi.object({
    mode: Joi.string().valid('light', 'dark').default('light'),
    primaryColor: Joi.string().pattern(/^#[0-9A-F]{6}$/i).default('#FF9100'),
    fontFamily: Joi.string().default('DM Sans Variable'),
  }),
  layout: Joi.object({
    navWidth: Joi.number().min(200).max(400).default(280),
    headerHeight: Joi.number().min(48).max(80).default(64),
    contentPadding: Joi.number().min(16).max(48).default(24),
  }),
  features: Joi.object({
    darkMode: Joi.boolean().default(true),
    notifications: Joi.boolean().default(true),
    analytics: Joi.boolean().default(false),
  }),
});

export const validateConfig = (config) => {
  const { error, value } = configSchema.validate(config, {
    allowUnknown: true,
    stripUnknown: false,
  });
  
  if (error) {
    console.error('Configuration validation error:', error.details);
    return { isValid: false, error: error.details };
  }
  
  return { isValid: true, config: value };
};
```

## Best Practices

### 1. Configuration Organization
- Group related configurations together
- Use consistent naming conventions
- Provide clear documentation for each option
- Implement proper validation

### 2. Performance Considerations
- Lazy load configuration when possible
- Cache frequently accessed values
- Minimize runtime configuration changes
- Use CSS variables for theme properties

### 3. Accessibility
- Respect user preferences (prefers-color-scheme)
- Ensure sufficient contrast ratios
- Maintain keyboard navigation support
- Test with assistive technologies

### 4. Maintainability
- Version configuration schemas
- Implement migration strategies
- Document breaking changes
- Provide upgrade paths

## Configuration Benefits

- **Centralized Management**: Single source of truth for all settings
- **Runtime Flexibility**: Dynamic theme and configuration changes
- **Environment Support**: Different configurations for different environments
- **User Customization**: Allow users to personalize their experience
- **Performance Optimization**: Efficient configuration loading and caching
- **Type Safety**: Schema validation and TypeScript support
- **Scalability**: Easy to extend with new configuration options

The Global Configuration system provides a comprehensive foundation for managing all aspects of the application's appearance and behavior while maintaining flexibility, performance, and user experience.