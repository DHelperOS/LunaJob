'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Paper,
  Chip,
} from '@mui/material';
import { m } from 'framer-motion';
import { Iconify } from 'src/components/iconify';
import { HeroBackground } from './components/hero-background';
import { PromotionalBanner } from 'src/components/banners/promotional-banner';
import { CategoryTabs } from 'src/components/filters/category-tabs';

// ----------------------------------------------------------------------

const popularCategories = [
  { label: '룸살롱', value: 'room_salon' },
  { label: '바', value: 'bar' },
  { label: '마사지', value: 'massage' },
  { label: '노래방', value: 'karaoke' },
  { label: '카페', value: 'cafe' },
  { label: '클럽', value: 'club' },
];

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (location) params.set('location', location);
    
    router.push(`/jobs?${params.toString()}`);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/jobs?category=${category}`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(/assets/background/overlay-1.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.05,
          pointerEvents: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', width: { xs: '90%', md: '800px' }, mx: 'auto', px: 2 }}>
        <Stack spacing={4} alignItems="center" sx={{ width: '100%', maxWidth: '100%' }}>
          {/* Main Title */}
          <Stack spacing={2} sx={{ textAlign: 'center' }}>
            <Box
              component="h1"
              sx={(theme) => ({
                my: 0,
                mx: 'auto',
                maxWidth: 680,
                display: 'flex',
                flexWrap: 'wrap',
                typography: 'h2',
                justifyContent: 'center',
                fontFamily: theme.typography.fontSecondaryFamily,
                [theme.breakpoints.up('lg')]: {
                  fontSize: theme.typography.pxToRem(72),
                  lineHeight: '90px',
                },
              })}
            >
              <Box component="span" sx={{ width: 1, opacity: 0.24 }}>
                당신의 완벽한 일자리를
              </Box>
              찾아드립니다&nbsp;
              <Box
                component={m.span}
                animate={{ backgroundPosition: '200% center' }}
                transition={{
                  duration: 20,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                sx={(theme) => ({
                  ...theme.mixins.textGradient(
                    `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%`
                  ),
                  backgroundSize: '400%',
                  ml: { xs: 0.75, md: 1, xl: 1.5 },
                })}
              >
루나 알바
              </Box>
            </Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 400, lineHeight: 1.6 }}
            >
              전국 최고의 나이트라이프 업계 전문 구인구직 플랫폼
              <br />
              루나 알바에서 새로운 기회를 만나보세요
            </Typography>
          </Stack>

          {/* Search Box */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.paper',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <TextField
                  fullWidth
                  placeholder="직종, 업체명으로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ flex: 2 }}
                />
                
                <TextField
                  fullWidth
                  placeholder="지역 선택"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:map-point-bold" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ flex: 1 }}
                />
                
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleSearch}
                  sx={{
                    px: 4,
                  }}
                >
                  검색
                </Button>
              </Stack>
            </Stack>
          </Paper>

{/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Iconify icon="solar:user-bold" />}
              onClick={() => router.push('/register?type=job_seeker')}
              color="primary"
              sx={{
                px: 4,
                py: 1.5,
              }}
            >
              구직자로 시작하기
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:buildings-bold" />}
              onClick={() => router.push('/register?type=employer')}
              sx={{
                px: 4,
                py: 1.5,
              }}
            >
              기업회원으로 시작하기
            </Button>
          </Stack>

          {/* Popular Jobs Section */}
          <Stack spacing={3} sx={{ textAlign: 'center', mt: 12 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
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
            
            {/* Category Filter */}
            <CategoryTabs
              onChange={(category) => {
                if (category !== 'all') {
                  router.push(`/jobs?category=${category}`);
                } else {
                  router.push('/jobs');
                }
              }}
            />
          </Stack>

        </Stack>
      </Box>
      
      <HeroBackground />
</Box>
  );
}