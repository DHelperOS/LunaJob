'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _jobs } from 'src/_mock/_job-kr';
import { JobImageCard } from 'src/components/cards/JobImageCard';

export function CompaniesListView() {
  const companies = _jobs.slice(0, 12).map((j, idx) => ({
    id: j.company.name + idx,
    name: j.company.name,
    intro: (j.content || '').replace(/<[^>]+>/g, ''),
    image: j.company.logo,
    cover: ['/assets/background/background-3.webp','/assets/background/background-4.jpg','/assets/background/background-5.webp','/assets/background/background-6.webp','/assets/background/background-7.webp'][idx % 5],
    salary: j.salary?.negotiable ? '급여 협의' : `${(j.salary.min || 0).toLocaleString()}만원 ~ ${(j.salary.max || 0).toLocaleString()}만원`,
    location: j.company.fullAddress || j.locations?.[0] || ''
  }));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ mb: 2 }}>인기 기업</Typography>
      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {companies.map((c, idx) => (
          <Grid key={c.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <JobImageCard
              image={c.cover}
              companyName={c.name}
              intro={c.intro}
              salary={c.salary}
              location={c.location}
              href={`/companies/${encodeURIComponent(c.name)}`}
              ratio="16/10"
              variant="pro"
              introLines={2}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

