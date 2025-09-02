# Migrated Components from next-ts to Luna

## Summary
Successfully migrated reusable UI components from `/dev/next-ts` project to the Luna component library.

## Components Migrated

### Core UI Components
- **carousel** - Image carousel with multiple variants (fade, autoplay, parallax, etc.)
- **chart** - ApexCharts wrapper with various chart types
- **custom-dialog** - Custom dialog/modal components
- **custom-breadcrumbs** - Breadcrumb navigation component
- **empty-content** - Empty state display component
- **filters-result** - Filter results display component
- **table** - Enhanced data table components

### Form & Input Components
- **custom-date-range-picker** - Date range picker component
- **custom-data-grid** - Advanced data grid component
- **country-select** - Country selection dropdown
- **phone-input** - International phone number input
- **editor** - Rich text editor with TipTap

### Utility Components
- **color-utils** - Color manipulation utilities
- **markdown** - Markdown renderer and utilities
- **organizational-chart** - Org chart visualization

### Navigation Components
- **mega-menu** - Mega menu navigation component
- **nav-basic** - Basic navigation components

## Dependencies Added
The following dependencies were added to Luna's package.json:

### Chart Libraries
- apexcharts (^5.3.2)
- react-apexcharts (^1.7.0)

### Carousel
- embla-carousel (^8.6.0) and related plugins
- embla-carousel-react (^8.6.0)

### Editor
- @tiptap/core (^3.0.9) and related extensions
- lowlight (^3.3.0)

### Other Components
- react-organizational-chart (^2.2.1)
- react-phone-number-input (^3.4.12)
- react-markdown (^10.1.0)
- react-dropzone (^14.3.8)

### Calendar (for date components)
- @fullcalendar/core (^6.1.18) and related plugins

### Internationalization
- i18next (^25.3.2) and related plugins
- react-i18next (^15.6.1)

### Authentication
- mui-one-time-password-input (^5.0.0)

## Usage
All components are now available through the main components index:

```typescript
import { 
  EmptyContent,
  CustomBreadcrumbs,
  Carousel,
  // ... other components
} from 'src/components';
```

## Notes
- Components maintain the same API and props structure as in next-ts
- All necessary dependencies have been installed
- Global configuration has been set up in `src/global-config.ts`
- Components are ready to use in Luna project

## Next Steps
1. Run `npm install` to ensure all dependencies are installed ✅
2. Test components in your Luna application
3. Customize styling and theming as needed for Luna's design system
4. Update any project-specific configurations or paths