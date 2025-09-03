import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export interface BreadcrumbItem {
  name: string;
  href?: string;
  icon?: string;
}

type Props = BreadcrumbsProps & {
  links: BreadcrumbItem[];
  action?: React.ReactNode;
  showIcon?: boolean;
  activeLast?: boolean;
};

export const CustomBreadcrumbs = forwardRef<HTMLDivElement, Props>(
  ({ links, action, showIcon = true, activeLast = false, sx, ...other }, ref) => {
    const lastLink = links[links.length - 1].name;

    return (
      <Box ref={ref} sx={sx}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Breadcrumbs
              separator={<Iconify icon="eva:arrow-ios-forward-fill" width={16} />}
              {...other}
            >
              {links.map((link) => {
                const { name, href, icon } = link;

                const isActive = name === lastLink;

                const linkContent = (
                  <Box
                    component="span"
                    sx={{
                      gap: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      color: isActive ? 'text.primary' : 'inherit',
                      fontSize: isActive ? 'subtitle1' : 'body2',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {showIcon && icon && <Iconify icon={icon} width={16} />}
                    {name}
                  </Box>
                );

                if (href && (!isActive || activeLast)) {
                  return (
                    <Link
                      key={name}
                      component={RouterLink}
                      href={href}
                      color="inherit"
                      sx={{ textDecoration: 'none' }}
                    >
                      {linkContent}
                    </Link>
                  );
                }

                return (
                  <Typography
                    key={name}
                    variant="body2"
                    sx={{
                      maxWidth: 260,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      color: 'text.disabled',
                      textOverflow: 'ellipsis',
                      ...(isActive && {
                        color: 'text.primary',
                        fontWeight: 600,
                      }),
                    }}
                  >
                    {linkContent}
                  </Typography>
                );
              })}
            </Breadcrumbs>
          </Box>

          {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
        </Box>
      </Box>
    );
  }
);

CustomBreadcrumbs.displayName = 'CustomBreadcrumbs';