'use client';

import { useTabs } from 'minimal-shared/hooks';

import {
  Box,
  Tab,
  Tabs,
  Card,
  Stack,
  Button,
  Avatar,
  Container,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { JobDetailsContent } from '../job-details-content';

// ----------------------------------------------------------------------

export function JobDetailsView({ id }: { id: string }) {
  const tabs = useTabs('content');

  // Mock job data - 실제로는 Supabase에서 가져올 데이터
  const mockJobs = [
    {
      id: '1',
      title: '프라이빗 라운지 클라이언트 서비스',
      createdAt: new Date('2025-09-01'),
      expiredDate: new Date('2025-10-01'),
      company: {
        name: '강남 루나라운지',
        logo: '/assets/images/company/company-1.jpg',
        fullAddress: '서울특별시 강남구 테헤란로 123',
        phoneNumber: '02-1234-5678',
      },
      candidates: [],
      experience: '경력무관',
      employmentTypes: ['정규직'],
      salary: {
        price: 4000000,
        min: 3500000,
        max: 5000000,
        negotiable: false,
      },
      role: '서비스',
      location: '서울 강남구',
      category: 'room_salon',
      content: `
# 채용 상세 정보

## 업무 내용
- 고객 응대 및 서비스 제공
- 음료 주문 접수 및 서빙
- 테이블 정리 및 매장 관리
- 기타 매장 운영 업무

## 우대 사항
- 서비스업 경험자 우대
- 밝고 적극적인 성격
- 커뮤니케이션 능력 우수자

## 근무 조건
- 주 5일 근무 (월~금)
- 오후 7시 ~ 새벽 2시
- 4대보험 완비
- 성과급 별도 지급
      `,
      skills: ['고객서비스', '커뮤니케이션', '팀워크'],
      benefits: ['4대보험', '성과급', '식대지원', '교통비지원'],
      publish: 'published',
    },
    {
      id: '2',
      title: '전문 믹솔로지스트 모집',
      createdAt: new Date('2025-09-02'),
      expiredDate: new Date('2025-10-02'),
      company: {
        name: '홍대 스카이라운지',
        logo: '/assets/images/company/company-2.jpg',
        fullAddress: '서울특별시 마포구 홍익로 456',
        phoneNumber: '02-2345-6789',
      },
      candidates: [],
      experience: '1년 이상',
      employmentTypes: ['정규직', '파트타임'],
      salary: {
        price: 3500000,
        min: 2800000,
        max: 4200000,
        negotiable: true,
      },
      role: '전문 서비스',
      location: '서울 마포구',
      category: 'bar',
      content: `
# 전문 믹솔로지스트 채용 정보

## 업무 내용
- 칵테일 및 프리미엄 음료 제조
- 라운지 바 운영 및 관리
- 고객 상담 및 전문 서비스 제공
- 재고 관리 및 서비스 품질 유지

## 자격 요건
- 관련 분야 경력 1년 이상
- 전문 조주 기술 및 지식 보유
- 책임감 있는 서비스 마인드

## 근무 환경
- 트렌디한 홍대 중심가 라운지
- 세련되고 품격 있는 공간
- 전문성 발휘가 가능한 환경
      `,
      skills: ['믹솔로지', '바매니지먼트', '고객응대'],
      benefits: ['4대보험', '성과급', '교육지원'],
      publish: 'published',
    },
  ];

  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4">채용공고를 찾을 수 없습니다</Typography>
      </Container>
    );
  }

  const renderTabs = () => (
    <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
      <Tab value="content" label="채용 상세" />
      <Tab value="company" label="회사 정보" />
    </Tabs>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            component="a"
            href="/jobs"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            color="inherit"
          >
            채용공고로 돌아가기
          </Button>
        </Box>

        {renderTabs()}
        
        {tabs.value === 'content' && <JobDetailsContent job={job} />}
        {tabs.value === 'company' && (
          <Card sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  alt={job.company.name}
                  src={job.company.logo}
                  variant="rounded"
                  sx={{ width: 80, height: 80 }}
                />
                <Stack>
                  <Typography variant="h4">{job.company.name}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {job.company.fullAddress}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    연락처: {job.company.phoneNumber}
                  </Typography>
                </Stack>
              </Box>
              
              <Typography variant="h6">회사 소개</Typography>
              <Typography variant="body1">
                {job.category === 'room_salon' && '프라이빗 라운지로서 고품격 고객 맞춤 서비스를 제공합니다.'}
                {job.category === 'bar' && '트렌디한 라운지 레스토랑으로 세련된 분위기를 지향합니다.'}
                {job.category === 'massage' && '힐링과 웰니스를 제공하는 전문 테라피 센터입니다.'}
              </Typography>
            </Stack>
          </Card>
        )}
    </Container>
  );
}