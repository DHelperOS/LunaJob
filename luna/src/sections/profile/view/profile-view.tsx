'use client';

import { useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';

import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Avatar,
  Container,
  Typography,
  IconButton,
} from '@mui/material';

import { UserCard } from '@/components/cards';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

// Mock user data - 실제로는 Supabase에서 가져올 데이터
const mockUser = {
  id: '1',
  name: '김루나',
  email: 'luna@example.com',
  phone: '010-1234-5678',
  role: '구직자',
  avatarUrl: '/assets/images/avatar/avatar-1.jpg',
  coverUrl: '/assets/images/covers/cover-1.jpg',
  displayName: '김루나',
  userType: 'job_seeker',
  location: '서울 강남구',
  experience: '2년',
  skills: ['고객서비스', '커뮤니케이션', '팀워크'],
  introduction: '성실하고 책임감 있는 구직자입니다. 고객 서비스 경험이 풍부하며 새로운 환경에 빠르게 적응할 수 있습니다.',
  totalFollowers: 0,
  totalFollowing: 0,
  totalPosts: 0,
};

const appliedJobs = [
  {
    id: '1',
    title: '룸살롱 웨이터/웨이트리스',
    company: '강남 루나클럽',
    status: '지원완료',
    appliedDate: '2025-09-01',
  },
  {
    id: '2',
    title: '바텐더 모집',
    company: '홍대 스카이바',
    status: '서류심사중',
    appliedDate: '2025-09-02',
  },
];

export function ProfileView() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">로딩 중...</Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3} alignItems="center" sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4">프로필을 보려면 로그인이 필요합니다</Typography>
          <Typography variant="body1" color="text.secondary">
            루나알바의 모든 기능을 이용하려면 로그인해주세요
          </Typography>
          <Button
            variant="contained"
            size="large"
            component="a"
            href="/login"
            sx={{ mt: 2 }}
          >
            로그인하기
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" fontWeight={700}>
            내 프로필
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:pen-bold" />}
            href="/profile/edit"
          >
            프로필 편집
          </Button>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <UserCard
            user={mockUser}
            showStats={false}
            showSocials={false}
          />
          
          {/* Profile Info Card */}
          <Card sx={{ p: 3, mt: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h6">기본 정보</Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Iconify icon="solar:user-bold" width={20} />
                <Box>
                  <Typography variant="body2" color="text.secondary">이름</Typography>
                  <Typography variant="body1">{mockUser.name}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Iconify icon="solar:letter-bold" width={20} />
                <Box>
                  <Typography variant="body2" color="text.secondary">이메일</Typography>
                  <Typography variant="body1">{mockUser.email}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Iconify icon="solar:phone-bold" width={20} />
                <Box>
                  <Typography variant="body2" color="text.secondary">연락처</Typography>
                  <Typography variant="body1">{mockUser.phone}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Iconify icon="solar:map-point-bold" width={20} />
                <Box>
                  <Typography variant="body2" color="text.secondary">지역</Typography>
                  <Typography variant="body1">{mockUser.location}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Iconify icon="solar:case-bold" width={20} />
                <Box>
                  <Typography variant="body2" color="text.secondary">경력</Typography>
                  <Typography variant="body1">{mockUser.experience}</Typography>
                </Box>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Introduction */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                자기소개
              </Typography>
              <Typography variant="body1">
                {mockUser.introduction}
              </Typography>
            </Card>

            {/* Skills */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                보유 스킬
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {mockUser.skills.map((skill) => (
                  <Box
                    key={skill}
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: 'primary.lighter',
                      color: 'primary.darker',
                      typography: 'caption',
                      fontWeight: 600,
                    }}
                  >
                    {skill}
                  </Box>
                ))}
              </Box>
            </Card>

            {/* Applied Jobs */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                지원한 채용공고
              </Typography>
              <Stack spacing={2}>
                {appliedJobs.map((job) => (
                  <Box
                    key={job.id}
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">{job.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {job.company} • {job.appliedDate}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 0.75,
                        bgcolor: job.status === '지원완료' ? 'info.lighter' : 'warning.lighter',
                        color: job.status === '지원완료' ? 'info.darker' : 'warning.darker',
                        typography: 'caption',
                        fontWeight: 600,
                      }}
                    >
                      {job.status}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}