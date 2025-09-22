'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useMemo, useState } from 'react';
import { _jobs, JOB_CATEGORIES } from 'src/_mock/_job-kr';
import { JobImageCard } from 'src/components/cards/JobImageCard';

const TAGS = [{ id: 'all', label: '전체' }, ...JOB_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))];

export function PopularGrid() {
  const [tag, setTag] = useState('all');

  const items = useMemo(() => {
    const list = _jobs.slice(0, 12);
    if (tag === 'all') return list;
    return list.filter((j) => j.category === tag);
  }, [tag]);

  const covers = [
    '/assets/background/background-3.webp',
    '/assets/background/background-4.jpg',
    '/assets/background/background-5.webp',
    '/assets/background/background-6.webp',
    '/assets/background/background-7.webp',
  ];

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 1120 }, mx: 'auto', px: { xs: 2, sm: 0 }, py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        인기 추천 포지션
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
        {TAGS.map((t) => (
          <Button key={t.id} size="small" variant={tag === t.id ? 'contained' : 'outlined'} onClick={() => setTag(t.id)} sx={{ borderRadius: 999 }}>
            {t.label}
          </Button>
        ))}
      </Stack>

      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {items.map((job, idx) => (
          <Grid key={job.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <JobImageCard
              image={covers[idx % covers.length]}
              companyName={job.company.name}
              intro={(job.content || '').replace(/<[^>]+>/g, '')}
              salary={job.salary?.negotiable ? '급여 협의' : `${(job.salary.min || 0).toLocaleString()}만원 ~ ${(job.salary.max || 0).toLocaleString()}만원`}
              location={job.company.fullAddress || job.locations?.[0] || ''}
              href="/jobs"
              ratio="4/3"
              variant="basic"
              introLines={2}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

