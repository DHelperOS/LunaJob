'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { JobCard } from 'src/components/cards/JobCard';
import { ProductCard } from 'src/components/cards/ProductCard';
import { UserCard } from 'src/components/cards/UserCard';
import { BlogCard } from 'src/components/cards/BlogCard';
import { CustomBreadcrumbs } from 'src/components/navigation/CustomBreadcrumbs';
import { TableToolbar } from 'src/components/search/TableToolbar';
import { OrderSummary } from 'src/components/data-display/OrderSummary';

import { _jobs } from 'src/_mock/_job-kr';

// ----------------------------------------------------------------------

// Mock data for demonstration
const mockJob = _jobs[0];

const mockProduct = {
  id: '1',
  name: '프리미엄 노트북 스탠드',
  coverUrl: '/assets/images/m-product/product-1.webp',
  price: 45000,
  priceSale: 59000,
  colors: ['#FF5630', '#00AB55', '#00B8D9'],
  available: 10,
  sizes: ['S', 'M', 'L'],
  newLabel: {
    enabled: true,
    content: 'NEW',
  },
  saleLabel: {
    enabled: true,
    content: '25% OFF',
  },
};

const mockUser = {
  id: '1',
  name: '김민준',
  role: '시니어 개발자',
  avatarUrl: '/assets/images/avatar/avatar-1.webp',
  coverUrl: '/assets/images/cover/cover-1.webp',
  totalFollowers: 1947,
  totalFollowing: 245,
  totalPosts: 87,
  verified: true,
  socials: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
};

const mockBlog = {
  id: '1',
  title: 'React 19의 새로운 기능들',
  description: 'React 19에서 추가된 혁신적인 기능들을 알아보고, 실제 프로젝트에 적용하는 방법을 소개합니다.',
  coverUrl: '/assets/images/cover/cover-2.webp',
  category: '개발',
  createdAt: new Date(),
  author: {
    name: '이서연',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
  },
  view: 3458,
  comment: 24,
  share: 18,
  favorite: 156,
};

const mockOrderData = {
  subtotal: 150000,
  discount: 15000,
  shipping: 3000,
  tax: 13800,
  total: 151800,
  items: [
    { name: '노트북 스탠드', quantity: 1, price: 45000 },
    { name: '무선 키보드', quantity: 1, price: 89000 },
    { name: 'USB 허브', quantity: 2, price: 16000 },
  ],
};

export function ShowcaseView() {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack spacing={5}>
        {/* Hero Section with Search */}
        <Box
          sx={{
            py: 8,
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Typography variant="h2" sx={{ color: 'white', mb: 3 }}>
            루나알바 컴포넌트 쇼케이스
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', mb: 5, opacity: 0.9 }}>
            추출된 UI 컴포넌트들을 활용한 데모 페이지
          </Typography>
          
          <Box sx={{ maxWidth: 600, mx: 'auto', px: 3 }}>
            <TextField
              fullWidth
              placeholder="원하는 직무를 검색해보세요..."
              sx={{
                bgcolor: 'white',
                borderRadius: 2,
                '& fieldset': { border: 'none' },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="solar:magnifer-bold-duotone" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" sx={{ borderRadius: 1 }}>
                      검색
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Navigation Breadcrumbs */}
        <CustomBreadcrumbs
          heading="컴포넌트 쇼케이스"
          links={[
            { name: '홈', href: '/' },
            { name: '쇼케이스', href: '/showcase' },
            { name: '컴포넌트 데모' },
          ]}
        />

        {/* Search Toolbar Demo */}
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>
            검색 툴바 컴포넌트
          </Typography>
          <TableToolbar
            numSelected={0}
            filterName=""
            onFilterName={(value) => console.log('Filter:', value)}
            onDeleteRows={() => console.log('Delete rows')}
            placeholder="사용자 검색..."
          />
        </Box>

        {/* Cards Section */}
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>
            카드 컴포넌트 컬렉션
          </Typography>
          
          <Grid container spacing={3}>
            {/* Job Card */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>JobCard</Typography>
              <JobCard
                job={mockJob}
                onView={() => console.log('View job')}
                onEdit={() => console.log('Edit job')}
                onDelete={() => console.log('Delete job')}
              />
            </Grid>

            {/* Product Card */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>ProductCard</Typography>
              <ProductCard
                product={mockProduct}
                onAddToCart={(product) => console.log('Add to cart:', product)}
              />
            </Grid>

            {/* User Card */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>UserCard</Typography>
              <UserCard
                user={mockUser}
                showStats={true}
                showSocials={true}
                onFollow={() => console.log('Follow user')}
              />
            </Grid>

            {/* Blog Card */}
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>BlogCard</Typography>
              <BlogCard
                post={mockBlog}
                onView={() => console.log('View blog')}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Order Summary */}
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>
            주문 요약 컴포넌트
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <OrderSummary
                data={mockOrderData}
                showDiscountField={true}
                onApplyDiscount={(code) => console.log('Discount code:', code)}
                onCheckout={() => console.log('Proceed to checkout')}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            p: 5,
            borderRadius: 2,
            bgcolor: 'background.neutral',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            통계 대시보드
          </Typography>
          <Grid container spacing={3}>
            {[
              { label: '전체 채용공고', value: '10,842', icon: 'solar:briefcase-bold-duotone', color: 'primary' },
              { label: '신규 지원자', value: '1,567', icon: 'solar:users-group-rounded-bold-duotone', color: 'info' },
              { label: '등록 기업', value: '3,421', icon: 'solar:buildings-bold-duotone', color: 'success' },
              { label: '오늘 매칭', value: '234', icon: 'solar:heart-bold-duotone', color: 'error' },
            ].map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      bgcolor: `${stat.color}.lighter`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon={stat.icon}
                      width={32}
                      sx={{ color: `${stat.color}.main` }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h4">{stat.value}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Job Categories */}
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>
            인기 직무 카테고리
          </Typography>
          <Grid container spacing={2}>
            {[
              { label: '개발', icon: 'solar:programming-bold-duotone', count: 2341 },
              { label: '디자인', icon: 'solar:palette-bold-duotone', count: 892 },
              { label: '마케팅', icon: 'solar:chart-bold-duotone', count: 1243 },
              { label: '영업', icon: 'solar:shop-bold-duotone', count: 567 },
              { label: '서비스', icon: 'solar:users-group-rounded-bold-duotone', count: 789 },
              { label: '생산/제조', icon: 'solar:box-bold-duotone', count: 456 },
            ].map((category) => (
              <Grid item xs={6} sm={4} md={2} key={category.label}>
                <Button
                  fullWidth
                  variant="soft"
                  sx={{
                    py: 3,
                    flexDirection: 'column',
                    borderRadius: 2,
                  }}
                >
                  <Iconify icon={category.icon} width={48} sx={{ mb: 1 }} />
                  <Typography variant="subtitle2">{category.label}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {category.count.toLocaleString()}개
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}