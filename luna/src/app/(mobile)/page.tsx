'use client';

import { Box, Stack, Typography, Chip, Grid, Card, IconButton, InputBase, Paper, Avatar } from '@mui/material';
import { Search as SearchIcon, LocationOn as LocationIcon, Work as WorkIcon } from '@mui/icons-material';
import { MobileLayout } from '@/layouts/mobile';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

// Mock data for demo
const popularCategories = [
  { id: 1, name: '매장관리', count: 234, icon: '🏪' },
  { id: 2, name: '서빙', count: 189, icon: '🍽️' },
  { id: 3, name: '사무직', count: 156, icon: '💼' },
  { id: 4, name: '배달', count: 145, icon: '🛵' },
  { id: 5, name: '카페', count: 132, icon: '☕' },
  { id: 6, name: '편의점', count: 128, icon: '🏪' },
];

const featuredJobs = [
  {
    id: 1,
    company: '스타벅스',
    position: '바리스타',
    location: '강남구',
    salary: '시급 12,000원',
    logo: '☕',
    isNew: true,
    isUrgent: false,
  },
  {
    id: 2,
    company: 'CU편의점',
    position: '야간 알바',
    location: '서초구',
    salary: '시급 13,500원',
    logo: '🏪',
    isNew: false,
    isUrgent: true,
  },
  {
    id: 3,
    company: '올리브영',
    position: '매장 직원',
    location: '송파구',
    salary: '시급 11,000원',
    logo: '💄',
    isNew: true,
    isUrgent: false,
  },
];

const popularSearches = ['카페알바', '주말알바', '단기알바', '재택근무', '프리미엄 채용'];

export default function MobileHomePage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/jobs?q=${searchValue}`);
    }
  };

  return (
    <MobileLayout>
      <Stack spacing={3} sx={{ pb: 2 }}>
        {/* Hero Section with Search */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #8E33FF 0%, #5119B7 100%)',
            borderRadius: 2,
            p: 3,
            color: 'white',
            mx: -2,
            mt: -2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            원하는 일자리를
            <br />
            빠르게 찾아보세요
          </Typography>
          
          {/* Search Bar */}
          <Paper
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            sx={{
              p: '4px 4px',
              display: 'flex',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <IconButton sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="직종, 지역, 회사명 검색"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <IconButton sx={{ p: '10px' }}>
              <LocationIcon />
            </IconButton>
          </Paper>

          {/* Popular Searches */}
          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
            {popularSearches.map((term) => (
              <Chip
                key={term}
                label={term}
                size="small"
                onClick={() => router.push(`/jobs?q=${term}`)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h5" color="primary.main" fontWeight="bold">
                1,234
              </Typography>
              <Typography variant="caption" color="text.secondary">
                오늘의 채용
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h5" color="success.main" fontWeight="bold">
                567
              </Typography>
              <Typography variant="caption" color="text.secondary">
                신규 기업
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h5" color="warning.main" fontWeight="bold">
                89%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                채용 성공률
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Popular Categories */}
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              인기 직종
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push('/jobs/category')}
            >
              전체보기
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {popularCategories.map((category) => (
              <Grid item xs={4} key={category.id}>
                <Card
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => router.push(`/jobs?category=${category.name}`)}
                >
                  <Typography variant="h4" mb={1}>
                    {category.icon}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {category.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {category.count}건
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Jobs */}
        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              추천 채용공고
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push('/jobs')}
            >
              더보기
            </Typography>
          </Stack>

          <Stack spacing={2}>
            {featuredJobs.map((job) => (
              <Card
                key={job.id}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={() => router.push(`/jobs/${job.id}`)}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.lighter' }}>
                    {job.logo}
                  </Avatar>
                  <Box flex={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {job.position}
                      </Typography>
                      {job.isNew && (
                        <Chip label="NEW" size="small" color="success" />
                      )}
                      {job.isUrgent && (
                        <Chip label="급구" size="small" color="error" />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {job.company}
                    </Typography>
                    <Stack direction="row" spacing={2} mt={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        <LocationIcon sx={{ fontSize: 12, mr: 0.5 }} />
                        {job.location}
                      </Typography>
                      <Typography variant="caption" color="primary.main" fontWeight="bold">
                        {job.salary}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Bottom CTA */}
        <Card
          sx={{
            p: 3,
            background: 'linear-gradient(135deg, #8E33FF15 0%, #5119B715 100%)',
            borderColor: 'primary.main',
            borderWidth: 1,
            borderStyle: 'solid',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <WorkIcon color="primary" sx={{ fontSize: 40 }} />
            <Box flex={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                기업 회원이신가요?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                인재를 찾아보세요
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="primary"
              fontWeight="bold"
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push('/company/register')}
            >
              시작하기 →
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </MobileLayout>
  );
}