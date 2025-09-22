'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { JobThumbsYCarousel } from '../widgets/job-thumbs-y-carousel';

// ----------------------------------------------------------------------

export function DashboardMainView() {
  return (
    <DashboardContent maxWidth="xl">
      <Stack spacing={3} sx={{ mt: 2 }}>
        <Box>
          <Typography variant="h4">추천 포지션</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            관심사 기반으로 큐레이션된 채용 카드 캐러셀
          </Typography>
        </Box>

        <JobThumbsYCarousel />
      </Stack>
    </DashboardContent>
  );
}

