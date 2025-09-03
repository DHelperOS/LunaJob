'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';

import { JobCard } from '@/components/cards';
import { TableToolbar } from '@/components/search';
import { EmptyContent } from '@/components/empty-content';
import { ResponsiveLayout } from '@/layouts/main';

// ----------------------------------------------------------------------

// Mock data - 실제로는 Supabase에서 가져올 데이터
const mockJobs = [
  {
    id: '1',
    title: '룸살롱 웨이터/웨이트리스',
    createdAt: new Date('2025-09-01'),
    company: {
      name: '강남 루나클럽',
      logo: '/assets/images/company/company-1.jpg',
    },
    candidates: [],
    experience: '경력무관',
    employmentTypes: ['정규직'],
    salary: {
      min: 3500000,
      max: 5000000,
      negotiable: false,
    },
    role: '서비스',
    location: '서울 강남구',
    category: 'room_salon',
  },
  {
    id: '2',
    title: '바텐더 모집',
    createdAt: new Date('2025-09-02'),
    company: {
      name: '홍대 스카이바',
      logo: '/assets/images/company/company-2.jpg',
    },
    candidates: [],
    experience: '1년 이상',
    employmentTypes: ['정규직', '파트타임'],
    salary: {
      min: 2800000,
      max: 4200000,
      negotiable: true,
    },
    role: '바텐더',
    location: '서울 마포구',
    category: 'bar',
  },
  {
    id: '3',
    title: '마사지 테라피스트',
    createdAt: new Date('2025-09-03'),
    company: {
      name: '강남 힐링스파',
      logo: '/assets/images/company/company-3.jpg',
    },
    candidates: [],
    experience: '2년 이상',
    employmentTypes: ['정규직'],
    salary: {
      min: 3000000,
      max: 4500000,
      negotiable: false,
    },
    role: '테라피스트',
    location: '서울 강남구',
    category: 'massage',
  },
];

const categories = [
  { label: '전체', value: 'all' },
  { label: '룸살롱', value: 'room_salon' },
  { label: '바', value: 'bar' },
  { label: '마사지', value: 'massage' },
  { label: '노래방', value: 'karaoke' },
  { label: '카페', value: 'cafe' },
  { label: '클럽', value: 'club' },
];

const locations = [
  { label: '전체 지역', value: 'all' },
  { label: '서울 강남구', value: 'gangnam' },
  { label: '서울 마포구', value: 'mapo' },
  { label: '서울 종로구', value: 'jongno' },
  { label: '부산 해운대구', value: 'haeundae' },
];

export default function JobListView() {
  const [filterName, setFilterName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);

  const itemsPerPage = 12;
  
  // 필터링된 데이터
  const filteredJobs = mockJobs.filter((job) => {
    const matchesName = job.title.toLowerCase().includes(filterName.toLowerCase()) ||
                       job.company.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
                           job.location.includes(locations.find(l => l.value === selectedLocation)?.label.split(' ')[1] || '');
    
    return matchesName && matchesCategory && matchesLocation;
  });

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilterName('');
    setSelectedCategory('all');
    setSelectedLocation('all');
  };

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Page Header */}
        <Stack spacing={3} sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700}>
            채용공고
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {filteredJobs.length}개의 채용공고가 있습니다
          </Typography>
        </Stack>

        {/* Search and Filters */}
        <Stack spacing={3} sx={{ mb: 4 }}>
          <TableToolbar
            numSelected={0}
            filterName={filterName}
            placeholder="직종, 업체명으로 검색..."
            onFilterName={handleFilterName}
            actions={
              <Stack direction="row" spacing={2}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>카테고리</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="카테고리"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>지역</InputLabel>
                  <Select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    label="지역"
                  >
                    {locations.map((location) => (
                      <MenuItem key={location.value} value={location.value}>
                        {location.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <InputLabel>정렬</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="정렬"
                  >
                    <MenuItem value="latest">최신순</MenuItem>
                    <MenuItem value="salary">급여순</MenuItem>
                    <MenuItem value="company">업체명순</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            }
          />

          {/* Active Filters */}
          {(selectedCategory !== 'all' || selectedLocation !== 'all' || filterName) && (
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Typography variant="body2" color="text.secondary">
                활성 필터:
              </Typography>
              
              {selectedCategory !== 'all' && (
                <Chip
                  label={categories.find(c => c.value === selectedCategory)?.label}
                  onDelete={() => setSelectedCategory('all')}
                  size="small"
                  color="primary"
                />
              )}
              
              {selectedLocation !== 'all' && (
                <Chip
                  label={locations.find(l => l.value === selectedLocation)?.label}
                  onDelete={() => setSelectedLocation('all')}
                  size="small"
                  color="primary"
                />
              )}
              
              {filterName && (
                <Chip
                  label={`"${filterName}"`}
                  onDelete={() => setFilterName('')}
                  size="small"
                  color="primary"
                />
              )}

              <Chip
                label="모든 필터 지우기"
                onClick={handleClearFilters}
                size="small"
                variant="outlined"
                color="default"
              />
            </Stack>
          )}
        </Stack>

        {/* Job Cards Grid */}
        {paginatedJobs.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {paginatedJobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
                  <JobCard
                    job={job}
                    onView={() => {
                      // 채용공고 상세 페이지로 이동
                      window.location.href = `/jobs/${job.id}`;
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, newPage) => setPage(newPage)}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        ) : (
          <EmptyContent
            filled
            title="검색 결과가 없습니다"
            description="다른 검색어나 필터를 시도해보세요"
            sx={{ py: 10 }}
          />
        )}
      </Container>
    </MainLayout>
  );
}