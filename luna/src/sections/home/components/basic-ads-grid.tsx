'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { _jobs } from 'src/_mock/_job-kr';
import { JobImageCard } from 'src/components/cards/JobImageCard';

// ----------------------------------------------------------------------

export function BasicAdsGrid() {
  const covers = [
    '/assets/background/background-3.webp',
    '/assets/background/background-4.jpg',
    '/assets/background/background-5.webp',
    '/assets/background/background-6.webp',
    '/assets/background/background-7.webp',
  ];

  const items = _jobs.slice(9, 21).map((job, idx) => ({
    id: job.id,
    image: covers[idx % covers.length],
    company: job.company?.name ?? '',
    intro: (job.content || '').replace(/<[^>]+>/g, ''),
    salary: job.salary?.negotiable
      ? '급여 협의'
      : `${(job.salary.min || 0).toLocaleString()}만원 ~ ${(job.salary.max || 0).toLocaleString()}만원`,
    location: job.company?.fullAddress || job.locations?.[0] || '',
  }));

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 1120 }, mx: 'auto', px: { xs: 2, sm: 0 }, my: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        베이직 광고
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {items.map((item) => (
          <Grid key={item.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <JobImageCard
              image={item.image}
              companyName={item.company}
              intro={item.intro}
              salary={item.salary}
              location={item.location}
              href="/jobs"
              ratio="4/3"
              variant="basic"
              showChips={false}
              introLines={2}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
