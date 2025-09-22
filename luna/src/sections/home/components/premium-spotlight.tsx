'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'minimal-shared/utils';

import { _jobs } from 'src/_mock/_job-kr';
import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

export function PremiumSpotlight() {
  const jobs = _jobs.slice(0, 3);
  const covers = [
    '/assets/background/background-7.webp',
    '/assets/background/background-6.webp',
    '/assets/background/background-5.webp',
  ];

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 1200 }, mx: 'auto', px: { xs: 2, sm: 0 } }}>
      <Typography variant="h3" sx={{ mb: 2.5 }}>
        프리미엄 스포트라이트
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <SpotlightCard job={jobs[0]} cover={covers[0]} ratio="16/6" dense={false} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={{ xs: 2, sm: 3 }}>
            <SpotlightCard job={jobs[1]} cover={covers[1]} ratio="16/9" dense />
            <SpotlightCard job={jobs[2]} cover={covers[2]} ratio="16/9" dense />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

function SpotlightCard({ job, cover, ratio, dense }: { job: (typeof _jobs)[number]; cover: string; ratio: string; dense?: boolean }) {
  if (!job) return null;

  const intro = (job.content || '').replace(/<[^>]+>/g, '');
  const salary = job.salary?.negotiable
    ? '급여 협의'
    : `${(job.salary.min || 0).toLocaleString()}만원 ~ ${(job.salary.max || 0).toLocaleString()}만원`;

  return (
    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
      <Image
        src={cover}
        alt={job.title}
        ratio={ratio}
        slotProps={{
          overlay: {
            sx: (theme) => ({
              background: `linear-gradient(180deg, ${varAlpha(theme.vars.palette.common.blackChannel, 0)} 0%, ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)} 40%, ${varAlpha(theme.vars.palette.common.blackChannel, 0.72)} 100%)`,
            }),
          },
        }}
        sx={{ width: 1, display: 'block' }}
      />

      <Stack spacing={dense ? 0.5 : 1} direction="row" alignItems="center" sx={{ position: 'absolute', left: 16, bottom: dense ? 10 : 16, zIndex: 2, color: 'common.white' }}>
        <Avatar src={job.company.logo} alt={job.company.name} sx={{ width: dense ? 28 : 36, height: dense ? 28 : 36, boxShadow: '0 0 0 2px rgba(255,255,255,0.3)' }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: dense ? 'clamp(16px,2.6vw,19px)' : 'clamp(20px,2.4vw,24px)' }} noWrap>
            {job.company.name}
          </Typography>
          <Typography sx={{ opacity: 0.92, fontSize: dense ? 'caption' : 'body2', display: '-webkit-box', overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', WebkitLineClamp: dense ? 2 : 3 }}>
            {intro}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ position: 'absolute', right: 12, top: 12, zIndex: 2, color: 'common.white', display: 'flex', gap: 1 }}>
        <InfoChip label={salary} strong />
        <InfoChip label={job.company.fullAddress || job.locations?.[0] || ''} strong />
      </Box>
    </Box>
  );
}

function InfoChip({ label, strong }: { label: string; strong?: boolean }) {
  return (
    <Box
      sx={(theme) => ({
        px: 1.25,
        py: 0.5,
        borderRadius: 999,
        bgcolor: varAlpha(theme.vars.palette.common.blackChannel, strong ? 0.44 : 0.32),
        border: `1px solid ${varAlpha(theme.vars.palette.common.whiteChannel, strong ? 0.24 : 0.16)}`,
        backdropFilter: 'blur(8px)',
        boxShadow: `0 8px 24px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
        fontSize: 12,
        lineHeight: 1,
      })}
    >
      {label}
    </Box>
  );
}
