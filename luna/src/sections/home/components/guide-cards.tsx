'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useRouter } from 'next/navigation';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type GuideItem = {
  title: string;
  description: string;
  icon: string;
  href: string;
  color?: string;
};

const ITEMS: GuideItem[] = [
  { title: '지역', description: '내 주변 채용 한눈에', icon: 'solar:map-point-bold', href: '/jobs?tab=location', color: '#4CAF50' },
  { title: '업종', description: '관심 업종만 모아보기', icon: 'solar:case-round-bold', href: '/jobs?tab=category', color: '#2196F3' },
  { title: '키워드', description: '원하는 키워드로 탐색', icon: 'solar:search-outline', href: '/jobs?tab=keyword', color: '#9C27B0' },
  { title: '커뮤니티', description: '정보 공유하고 소통하기', icon: 'solar:chat-round-bold', href: '/community', color: '#FF9800' },
];

export function GuideCards() {
  const router = useRouter();

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: 1120 }, mx: 'auto', px: { xs: 2, sm: 0 }, my: 3 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>
        빠른 안내
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {ITEMS.map((item) => (
          <Grid key={item.title} size={{ xs: 6, md: 3 }}>
            <Card
              onClick={() => router.push(item.href)}
              sx={{
                p: 2.25,
                height: 1,
                cursor: 'pointer',
                borderRadius: 2,
                transition: (theme) => theme.transitions.create(['transform', 'box-shadow']),
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 6 },
              }}
            >
              <Stack spacing={1} alignItems="flex-start">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'common.white',
                    bgcolor: item.color,
                  }}
                >
                  <Iconify icon={item.icon} width={22} />
                </Box>

                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
