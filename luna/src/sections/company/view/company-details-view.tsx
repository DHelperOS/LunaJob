'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import { _jobs } from 'src/_mock/_job-kr';
import { JobImageCard } from 'src/components/cards/JobImageCard';

type Props = { id: string };

export function CompanyDetailsView({ id }: Props) {
  const jobs = _jobs.filter((j) => j.company.name === id).slice(0, 6);
  const company = jobs[0]?.company || _jobs[0].company;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Avatar src={company.logo} alt={company.name} sx={{ width: 56, height: 56 }} />
        <Box>
          <Typography variant="h4">{company.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{company.fullAddress}</Typography>
        </Box>
      </Stack>

      <Typography variant="h5" sx={{ mb: 2 }}>채용공고</Typography>
      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {jobs.map((job, idx) => (
          <Grid key={job.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <JobImageCard
              image={['/assets/background/background-3.webp','/assets/background/background-4.jpg','/assets/background/background-5.webp','/assets/background/background-6.webp','/assets/background/background-7.webp'][idx % 5]}
              companyName={job.title}
              intro={(job.content || '').replace(/<[^>]+>/g, '')}
              salary={job.salary?.negotiable ? '급여 협의' : `${(job.salary.min || 0).toLocaleString()}만원 ~ ${(job.salary.max || 0).toLocaleString()}만원`}
              location={job.company.fullAddress || job.locations?.[0] || ''}
              href={`/jobs/${job.id}`}
              ratio="16/10"
              variant="basic"
              introLines={2}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

