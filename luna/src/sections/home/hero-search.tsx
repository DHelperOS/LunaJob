'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Iconify } from 'src/components/iconify';

export function HomeHeroSearch() {
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        color: 'common.white',
        backgroundImage: 'url(/assets/background/background-7.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${varAlpha(theme.vars.palette.common.blackChannel, 0.36)} 0%, ${varAlpha(theme.vars.palette.common.blackChannel, 0.48)} 40%, ${varAlpha(theme.vars.palette.common.blackChannel, 0.64)} 100%)`,
        },
      })}
    >
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: { xs: '100%', md: 1120 }, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 6, md: 8 } }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          오사카 교토부터 경주 캡슐 호텔까지,
          <br />
          여행할땐 여기어때
        </Typography>

        {/* Search Bar */}
        <Paper elevation={6} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ px: 2, pt: 1 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="inherit" indicatorColor="primary" sx={{ color: 'text.primary' }}>
              <Tab label="국내 숙소" />
              <Tab label="해외 숙소" />
              <Tab label="패키지 여행" />
            </Tabs>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="stretch" sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1, px: 1.5, borderRadius: 2, bgcolor: 'grey.100' }}>
              <Iconify icon="eva:search-fill" width={20} sx={{ color: 'text.disabled' }} />
              <InputBase fullWidth placeholder="여행지나 숙소를 검색해보세요." />
            </Stack>
            <Button variant="outlined" color="inherit" startIcon={<Iconify icon="solar:calendar-bold" />} sx={{ borderRadius: 2, px: 2, minHeight: 48 }}>
              09.04 목 - 09.05 금 (1박)
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<Iconify icon="solar:user-bold" />} sx={{ borderRadius: 2, px: 2, minHeight: 48 }}>
              인원 2
            </Button>
            <Button variant="contained" color="primary" sx={{ px: 4, borderRadius: 2, minHeight: 48 }}>
              검색
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}

