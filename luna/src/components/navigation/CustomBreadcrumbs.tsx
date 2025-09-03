import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: React.ReactNode;
};

type Props = {
  heading?: string;
  links?: BreadcrumbsLinkProps[];
  action?: React.ReactNode;
  sx?: object;
};

export function CustomBreadcrumbs({ heading, links = [], action, sx, ...other }: Props) {
  const lastLink = links[links.length - 1]?.name;

  return (
    <Box sx={{ ...sx }} {...other}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {heading && (
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}

          {!!links.length && (
            <Breadcrumbs separator="›" sx={{ mt: 1 }}>
              {links.map((link) =>
                link.href ? (
                  <Link
                    key={link.name || ''}
                    component={RouterLink}
                    href={link.href}
                    variant="body2"
                    color="text.primary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ) : (
                  <Typography
                    key={link.name}
                    variant="body2"
                    sx={{
                      maxWidth: 260,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      color: link.name === lastLink ? 'text.disabled' : 'text.primary',
                      textOverflow: 'ellipsis',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </Typography>
                )
              )}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Stack>
    </Box>
  );
}