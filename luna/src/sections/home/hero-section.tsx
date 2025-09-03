'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { HeroBackground } from './components/hero-background';

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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid xs={12} md={7} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={4} alignItems="center" sx={{ width: '100%', mx: 'auto' }}>
              {/* Main Title */}
              <Stack spacing={2} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: 'primary.main',

                    lineHeight: 1.2,
                  }}
                >
                  당신의 완벽한 일자리를
                  <br />
                  찾아드립니다
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ fontWeight: 400, lineHeight: 1.6 }}
                >
                  전국 최고의 나이트라이프 업계 전문 구인구직 플랫폼
                  <br />
                  Luna Job에서 새로운 기회를 만나보세요
                </Typography>
              </Stack>

              {/* Search Box */}
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
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
                  
                  {/* Popular Categories */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      인기 카테고리
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {popularCategories.map((category) => (
                        <Chip
                          key={category.value}
                          label={category.label}
                          variant="outlined"
                          size="small"
                          onClick={() => handleCategoryClick(category.value)}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: 'primary.lighter',
                              borderColor: 'primary.main',
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
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
            </Stack>
          </Grid>

          {/* Right Side - Statistics or Image */}
          <Grid xs={12} md={5}>
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                textAlign: 'center',
              }}
            >
              <Stack spacing={3}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="primary.main">
                    10,000+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    등록된 채용공고
                  </Typography>
                </Paper>
                
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="secondary.main">
                    50,000+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    가입한 구직자
                  </Typography>
                </Paper>
                
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    5,000+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    파트너 기업
                  </Typography>
                </Paper>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      <HeroBackground />
    </Box>
  );
}