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
    title: '프라이빗 라운지 매니저',
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
    category: 'room_salon',
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
    category: 'bar',
  },
  {
    id: '3',
    title: '매장 운영 매니저',
    createdAt: new Date('2025-09-03'),
    company: {
      name: '강남 루나베리',
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
    category: 'karaoke',
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
    category: 'massage',
  },
  {
    id: '5',
    title: 'VIP 라운지 서비스',
    createdAt: new Date('2025-09-01'),
    company: {
      name: '강남 프리미엄',
      logo: '/assets/images/company/company-5.png',
    },
    experience: '신입/경력',
    employmentTypes: ['아르바이트', '파트타임'],
    salary: {
      min: 3500000,
      max: 5000000,
      negotiable: true,
    },
    role: '서빙',
    category: 'room_salon',
  },
  {
    id: '6',
    title: '클럽 DJ',
    createdAt: new Date('2025-09-02'),
    company: {
      name: '이태원 나이트',
      logo: '/assets/images/company/company-6.png',
    },
    experience: '경력 2~4년',
    employmentTypes: ['계약직'],
    salary: {
      min: 4000000,
      max: 6000000,
      negotiable: false,
    },
    role: 'DJ',
    category: 'club',
  },
  {
    id: '7',
    title: '카페 바리스타',
    createdAt: new Date('2025-09-03'),
    company: {
      name: '홍대 카페',
      logo: '/assets/images/company/company-7.png',
    },
    experience: '경력무관',
    employmentTypes: ['아르바이트'],
    salary: {
      min: 2200000,
      max: 3000000,
      negotiable: false,
    },
    role: '바리스타',
    category: 'cafe',
  },
  {
    id: '8',
    title: '호스피스 매니저',
    createdAt: new Date('2025-08-29'),
    company: {
      name: '압구정 라운지',
      logo: '/assets/images/company/company-8.png',
    },
    experience: '경력 3~5년',
    employmentTypes: ['정규직'],
    salary: {
      min: 7000000,
      max: 10000000,
      negotiable: true,
    },
    role: '매니저',
    category: 'bar',
  },
  {
    id: '9',
    title: '라운지 매니지먼트',
    createdAt: new Date('2025-09-01'),
    company: {
      name: '강남 VIP',
      logo: '/assets/images/company/company-9.png',
    },
    experience: '신입',
    employmentTypes: ['아르바이트'],
    salary: {
      min: 3000000,
      max: 4000000,
      negotiable: false,
    },
    role: '서비스',
    category: 'room_salon',
  },
  {
    id: '10',
    title: '마사지 테라피스트',
    createdAt: new Date('2025-08-31'),
    company: {
      name: '명동 스파',
      logo: '/assets/images/company/company-10.png',
    },
    experience: '경력 1~2년',
    employmentTypes: ['정규직'],
    salary: {
      min: 3500000,
      max: 5500000,
      negotiable: false,
    },
    role: '테라피스트',
    category: 'massage',
  },
  {
    id: '11',
    title: '바 매니저',
    createdAt: new Date('2025-09-02'),
    company: {
      name: '신사동 펜트하우스',
      logo: '/assets/images/company/company-11.png',
    },
    experience: '경력 2~4년',
    employmentTypes: ['정규직'],
    salary: {
      min: 5500000,
      max: 7500000,
      negotiable: false,
    },
    role: '매니저',
    category: 'bar',
  },
  {
    id: '12',
    title: '뮤직 스튜디어 스태프',
    createdAt: new Date('2025-09-03'),
    company: {
      name: '역삼 뮤직홀',
      logo: '/assets/images/company/company-12.png',
    },
    experience: '경력무관',
    employmentTypes: ['아르바이트'],
    salary: {
      min: 2300000,
      max: 3200000,
      negotiable: false,
    },
    role: '서비스',
    category: 'karaoke',
  },
  {
    id: '13',
    title: '클럽 보안요원',
    createdAt: new Date('2025-08-30'),
    company: {
      name: '오토바이 클럽',
      logo: '/assets/images/company/company-13.png',
    },
    experience: '경력 1~3년',
    employmentTypes: ['계약직'],
    salary: {
      min: 4500000,
      max: 6000000,
      negotiable: false,
    },
    role: '보안',
    category: 'club',
  },
  {
    id: '14',
    title: '카페 매니저',
    createdAt: new Date('2025-09-01'),
    company: {
      name: '청담 커피',
      logo: '/assets/images/company/company-14.png',
    },
    experience: '경력 2~4년',
    employmentTypes: ['정규직'],
    salary: {
      min: 3800000,
      max: 5200000,
      negotiable: true,
    },
    role: '매니저',
    category: 'cafe',
  },
  {
    id: '15',
    title: '럭셔리 라운지 직원',
    createdAt: new Date('2025-09-02'),
    company: {
      name: '한남동 라운지',
      logo: '/assets/images/company/company-15.png',
    },
    experience: '경력무관',
    employmentTypes: ['파트타임'],
    salary: {
      min: 3200000,
      max: 4500000,
      negotiable: false,
    },
    role: '서비스',
    category: 'bar',
  },
  {
    id: '16',
    title: '스파 리셉션',
    createdAt: new Date('2025-08-31'),
    company: {
      name: '신논현 스파',
      logo: '/assets/images/company/company-16.png',
    },
    experience: '신입/경력',
    employmentTypes: ['정규직'],
    salary: {
      min: 3000000,
      max: 4200000,
      negotiable: false,
    },
    role: '리셉션',
    category: 'massage',
  },
  {
    id: '17',
    title: '프리미엄 바 직원',
    createdAt: new Date('2025-09-01'),
    company: {
      name: '청담 프리미엄 바',
      logo: '/assets/images/company/company-17.png',
    },
    experience: '경력 1~2년',
    employmentTypes: ['파트타임'],
    salary: {
      min: 3800000,
      max: 5500000,
      negotiable: true,
    },
    role: '바텐더',
    category: 'bar',
  },
  {
    id: '18',
    title: '프리미엄 라운지 서비스',
    createdAt: new Date('2025-09-02'),
    company: {
      name: '강남 메가라운지',
      logo: '/assets/images/company/company-18.png',
    },
    experience: '경력무관',
    employmentTypes: ['아르바이트'],
    salary: {
      min: 2800000,
      max: 3800000,
      negotiable: false,
    },
    role: '서비스',
    category: 'club',
  },
  {
    id: '19',
    title: '노래방 매니저',
    createdAt: new Date('2025-08-30'),
    company: {
      name: '수원 프리미엄 노래방',
      logo: '/assets/images/company/company-19.png',
    },
    experience: '경력 2~5년',
    employmentTypes: ['정규직'],
    salary: {
      min: 4200000,
      max: 6500000,
      negotiable: false,
    },
    role: '매니저',
    category: 'karaoke',
  },
  {
    id: '20',
    title: '고급 마사지샵 직원',
    createdAt: new Date('2025-09-03'),
    company: {
      name: '역삼동 힐링 스파',
      logo: '/assets/images/company/company-20.png',
    },
    experience: '경력 1~3년',
    employmentTypes: ['정규직', '파트타임'],
    salary: {
      min: 3500000,
      max: 5800000,
      negotiable: true,
    },
    role: '테라피스트',
    category: 'massage',
  },
];

// ----------------------------------------------------------------------

export function CompanyShowcase({ activeCategory = 'all' }: { activeCategory?: string }) {
  const router = useRouter();
  
  const filteredJobs = activeCategory === 'all' 
    ? featuredJobs 
    : featuredJobs.filter(job => job.category === activeCategory);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {filteredJobs.map((job, index) => (
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
      <Box sx={{ textAlign: 'center', mt: 4 }}>
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
    </Container>
  );
}