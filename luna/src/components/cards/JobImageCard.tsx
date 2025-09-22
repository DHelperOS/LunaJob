'use client';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'minimal-shared/utils';

import { Iconify } from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

export type JobImageCardProps = {
  image: string;
  companyName: string;
  intro: string;
  salary?: string;
  location?: string;
  href?: string;
  ratio?: '16/9' | '4/3' | '1/1' | string;
  variant?: 'premium' | 'pro' | 'basic';
  showChips?: boolean;
  introLines?: 1 | 2 | 3;
};

export function JobImageCard({ image, companyName, intro, salary, location, href, ratio = '16/9', variant = 'pro', showChips = true, introLines = 2 }: JobImageCardProps) {
  const overlayStrength = variant === 'premium' ? 0.72 : variant === 'pro' ? 0.56 : 0.42;
  const titleTypo = variant === 'premium' ? 'h6' : 'subtitle1';
  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <Box sx={{ position: 'relative' }}>
        <Image
          src={image}
          alt={companyName}
          ratio={ratio}
          slotProps={{
            overlay: {
              sx: (theme) => ({
                background: `linear-gradient(180deg, ${varAlpha(theme.vars.palette.common.blackChannel, 0.0)} 0%, ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)} 40%, ${varAlpha(theme.vars.palette.common.blackChannel, overlayStrength)} 100%)`,
              }),
            },
          }}
          sx={{ width: 1, display: 'block' }}
        />

        {/* Top-right info chips */}
        {showChips && (
          <Stack direction="column" spacing={1} sx={{ position: 'absolute', top: 12, right: 12, alignItems: 'flex-end' }}>
            {salary && (
              <InfoChip icon="solar:wad-of-money-bold" label={salary} />
            )}
            {location && (
              <InfoChip icon="solar:map-point-bold" label={location} />
            )}
          </Stack>
        )}

        {/* Bottom-left company name + intro */}
        <Box sx={{ position: 'absolute', left: 16, bottom: 16, right: 16, color: 'common.white' }}>
          {href ? (
            <Link component={RouterLink} href={href} color="inherit" underline="hover" sx={{ typography: titleTypo }}>
              {companyName}
            </Link>
          ) : (
            <Typography variant={titleTypo as any}>{companyName}</Typography>
          )}
          {!!intro && (
            <Typography
              sx={{
                opacity: 0.9,
                mt: 0.5,
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: introLines,
                WebkitBoxOrient: 'vertical',
                typography: { xs: 'caption', sm: 'body2' },
              }}
            >
              {intro}
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function InfoChip({ icon, label }: { icon: string; label: string }) {
  return (
    <Box
      sx={(theme) => ({
        gap: 0.75,
        px: 1,
        py: 0.5,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1.5,
        color: 'common.white',
        bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.56),
        backdropFilter: 'blur(6px)',
      })}
    >
      <Iconify icon={icon} width={16} />
      <Typography variant="caption" sx={{ lineHeight: 1 }}>
        {label}
      </Typography>
    </Box>
  );
}
