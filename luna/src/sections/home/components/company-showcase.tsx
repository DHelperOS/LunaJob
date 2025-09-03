'use client';

import { Box, Grid, Typography, Button, Stack, Container } from '@mui/material';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { JobCard } from 'src/components/cards/JobCard';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const featuredJobs = [
  {
    id: '1',
    title: '프리미엄 룸살롱 매니저',
    createdAt: new Date('2025-09-01'),
    company: {
      name: '강남 엘리트',
      logo: '/assets/images/company/company-1.png',
    },
    experience: '경력 1~3년',
    employmentTypes: ['정규직'],
    salary: {
      min: 5000000,
      max: 8000000,
      negotiable: false,
    },
    role: '매니저',
  },
  {
    id: '2',
    title: '바텐더 (신입/경력)',
    createdAt: new Date('2025-09-02'),
    company: {
      name: '홍대 클럽',
      logo: '/assets/images/company/company-2.png',
    },
    experience: '경력무관',
    employmentTypes: ['파트타임'],
    salary: {
      min: 3000000,
      max: 4500000,
      negotiable: false,
    },
    role: '바텐더',
  },
  {
    id: '3',
    title: '노래방 도우미',
    createdAt: new Date('2025-09-03'),
    company: {
      name: '강남 노래방',
      logo: '/assets/images/company/company-3.png',
    },
    experience: '신입',
    employmentTypes: ['아르바이트'],
    salary: {
      min: 2500000,
      max: 3500000,
      negotiable: true,
    },
    role: '서비스',
  },
  {
    id: '4',
    title: '마사지샵 관리직',
    createdAt: new Date('2025-08-30'),
    company: {
      name: '프리미엄 스파',
      logo: '/assets/images/company/company-4.png',
    },
    experience: '경력 3~5년',
    employmentTypes: ['정규직'],
    salary: {
      min: 6000000,
      max: 9000000,
      negotiable: false,
    },
    role: '관리직',
  },
];

// ----------------------------------------------------------------------

export function CompanyShowcase() {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={5}>
        {/* Section Header */}
        <Box
          component={m.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          sx={{ textAlign: 'center' }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: (theme) =>
                `linear-gradient(45deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            인기 추천 일자리
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            엄선된 프리미엄 업체에서 최고의 기회를 만나보세요
          </Typography>
        </Box>

        {/* Job Cards Grid */}
        <Grid container spacing={3}>
          {featuredJobs.map((job, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={job.id}>
              <m.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <JobCard
                  job={job}
                  onView={() => router.push(`/jobs/${job.id}`)}
                  sx={{
                    height: 1,
                    transition: (theme) =>
                      theme.transitions.create(['box-shadow', 'transform'], {
                        duration: theme.transitions.duration.short,
                      }),
                    '&:hover': {
                      boxShadow: (theme) => theme.customShadows.z24,
                      transform: 'translateY(-4px)',
                    },
                  }}
                />
              </m.div>
            </Grid>
          ))}
        </Grid>

        {/* View More Button */}
        <Box
          component={m.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          sx={{ textAlign: 'center' }}
        >
          <Button
            variant="outlined"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-bold" />}
            onClick={() => router.push('/jobs')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'primary.lighter',
              },
            }}
          >
            더 많은 채용공고 보기
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}