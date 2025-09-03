# UI/UX 디자인 문서
## Minimal 템플릿을 활용한 현대적 구인구직 포털

## 1. 디자인 시스템 개요

### 1.1 디자인 원칙
- **모던 & 클린**: 구식 디자인을 현대적 Material Design으로 교체
- **모바일 우선**: 모든 기기에 최적화된 반응형 디자인
- **접근성**: WCAG 2.1 AA 규정 준수
- **성능**: 지연 로딩 및 코드 분할을 통한 빠른 로딩
- **사용자 중심**: 간소화된 워크플로우와 직관적 내비게이션

### 1.2 Minimal 템플릿 연동
```typescript
// Minimal v7.4.0 컴포넌트 사용
import { 
  Page, 
  Container, 
  Card, 
  Stack,
  Typography,
  Button,
  TextField,
  DataGrid,
  Dashboard 
} from '@minimal-kit/next-ts';
```


## 2. 페이지별 UI 매핑

### 2.1 메인 페이지 (index.php → /)
**기존 디자인 문제점:**
- 텍스트가 넘쳐나는 어수선한 레이아웃
- 구식 배너 광고
- 모바일 반응형 미흡
- 명확하지 않은 CTA

**새로운 디자인:**
```typescript
// app/page.tsx
import { Hero, JobSearch, FeaturedJobs, Categories, Stats } from '@/sections/home';

const HomePage = () => (
  <>
    {/* 검색 기능이 포함된 히어로 섹션 */}
    <Hero 
      title="당신의 커리어를 시작하세요"
      subtitle="전국 최고의 일자리를 한 곳에서"
      searchComponent={<JobSearch />}
    />
    
    {/* 추천 채용공고 캐러셀 */}
    <FeaturedJobs 
      variant="carousel"
      itemsPerView={4}
      autoplay
    />
    
    {/* 직종 카테고리 그리드 */}
    <Categories 
      layout="grid"
      columns={{ xs: 2, sm: 3, md: 4, lg: 6 }}
    />
    
    {/* 통계 대시보드 */}
    <Stats 
      items={[
        { label: '등록된 구인', value: '15,234' },
        { label: '활성 구직자', value: '8,456' },
        { label: '매칭 성공', value: '3,789' },
        { label: '파트너 기업', value: '1,234' }
      ]}
    />
  </>
);
```

### 2.2 채용공고 목록 (guin_list.php → /jobs)
**기존 디자인 문제점:**
- 테이블 기반 레이아웃
- 필터링 UI 부재
- 검색 경험 미흡
- 정보 밀도 과다

**새로운 디자인:**
```typescript
// app/jobs/page.tsx
import { 
  JobListingGrid,
  JobFilters,
  SearchBar,
  SortDropdown,
  Pagination
} from '@/components/job';

const JobsPage = () => (
  <Container maxWidth="xl">
    <Stack direction="row" spacing={3}>
      {/* 좌측 사이드바 필터 */}
      <Box sx={{ width: 280, flexShrink: 0 }}>
        <JobFilters 
          categories={jobCategories}
          locations={regions}
          salaryRange
          workType
          experience
        />
      </Box>
      
      {/* 메인 콘텐츠 */}
      <Box flex={1}>
        {/* 검색 및 정렬 바 */}
        <Stack direction="row" spacing={2} mb={3}>
          <SearchBar fullWidth placeholder="직종, 회사, 키워드 검색" />
          <SortDropdown 
            options={['최신순', '급여순', '인기순', '마감임박']}
          />
        </Stack>
        
        {/* 채용공고 카드 그리드 */}
        <JobListingGrid 
          view="card" // 또는 'list'
          columns={{ xs: 1, sm: 2, lg: 3 }}
          gap={2}
        />
        
        {/* 페이지네이션 */}
        <Pagination 
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Stack>
  </Container>
);
```

### 2.3 채용공고 상세 (guin_detail.php → /jobs/[id])
**새로운 컴포넌트 구조:**
```typescript
// app/jobs/[id]/page.tsx
const JobDetailPage = () => (
  <Container>
    <Grid container spacing={3}>
      {/* 메인 콘텐츠 */}
      <Grid item xs={12} md={8}>
        <Card>
          {/* 회사 헤더 */}
          <CompanyHeader 
            logo="/company-logo.png"
            name="회사명"
            verified
            rating={4.5}
          />
          
          {/* 채용공고 제목 및 메타 정보 */}
          <JobMeta 
            title="포지션명"
            location="서울 강남구"
            salary="3,000-4,000만원"
            type="정규직"
            posted="3일 전"
            views={1234}
          />
          
          {/* 채용공고 설명 */}
          <JobDescription 
            description={jobData.description}
            requirements={jobData.requirements}
            benefits={jobData.benefits}
          />
          
          {/* 스킬 태그 */}
          <SkillTags tags={['React', 'TypeScript', 'Node.js']} />
        </Card>
      </Grid>
      
      {/* 사이드바 */}
      <Grid item xs={12} md={4}>
        {/* 지원 카드 */}
        <Card sx={{ position: 'sticky', top: 80 }}>
          <ApplyCard 
            deadline="2025-01-15"
            applicants={45}
            onApply={handleApply}
          />
        </Card>
        
        {/* 유사 채용공고 */}
        <SimilarJobs jobs={similarJobs} />
      </Grid>
    </Grid>
  </Container>
);
```

### 2.4 이력서 작성 (document.php → /resume)
**모던 이력서 빌더:**
```typescript
// app/resume/page.tsx
const ResumeBuilder = () => (
  <Container>
    {/* 진행 단계 표시기 */}
    <Stepper activeStep={activeStep}>
      <Step label="기본정보" />
      <Step label="경력사항" />
      <Step label="학력사항" />
      <Step label="스킬" />
      <Step label="자기소개" />
      <Step label="미리보기" />
    </Stepper>
    
    {/* 폼 섹션 */}
    <Card sx={{ mt: 3 }}>
      {activeStep === 0 && <BasicInfoForm />}
      {activeStep === 1 && <ExperienceForm />}
      {activeStep === 2 && <EducationForm />}
      {activeStep === 3 && <SkillsForm />}
      {activeStep === 4 && <AboutForm />}
      {activeStep === 5 && <ResumePreview />}
    </Card>
    
    {/* 내비게이션 */}
    <Stack direction="row" justifyContent="space-between" mt={3}>
      <Button onClick={handleBack} disabled={activeStep === 0}>
        이전
      </Button>
      <Button 
        variant="contained" 
        onClick={activeStep === 5 ? handleSubmit : handleNext}
      >
        {activeStep === 5 ? '저장' : '다음'}
      </Button>
    </Stack>
  </Container>
);
```

### 2.5 사용자 대시보드 (happy_member.php → /dashboard)
**Minimal 대시보드 컴포넌트:**
```typescript
// app/dashboard/page.tsx
const UserDashboard = () => (
  <DashboardLayout>
    {/* 통계 개요 */}
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="지원 현황"
          total={24}
          icon={<Iconify icon="eva:briefcase-fill" />}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="열람된 이력서"
          total={156}
          icon={<Iconify icon="eva:eye-fill" />}
          color="info"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="스크랩된 공고"
          total={42}
          icon={<Iconify icon="eva:bookmark-fill" />}
          color="warning"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <AnalyticsWidgetSummary
          title="메시지"
          total={8}
          icon={<Iconify icon="eva:message-circle-fill" />}
          color="error"
        />
      </Grid>
    </Grid>
    
    {/* 최근 지원 내역 */}
    <Card sx={{ mt: 3 }}>
      <CardHeader title="최근 지원 현황" />
      <ApplicationsTable 
        data={recentApplications}
        columns={['회사', '포지션', '지원일', '상태', '액션']}
      />
    </Card>
    
    {/* 활동 타임라인 */}
    <TimelineCard 
      title="활동 내역"
      list={activities}
    />
  </DashboardLayout>
);
```

## 3. 컴포넌트 라이브러리 매핑

### 3.1 폼 컴포넌트
| 기존 요소 | Minimal 컴포넌트 | 사용법 |
|------------|------------------|-------|
| `<input type="text">` | `<TextField>` | 모든 텍스트 입력 |
| `<select>` | `<Select>` 또는 `<Autocomplete>` | 드롭다운 |
| `<textarea>` | `<TextField multiline>` | 긴 텍스트 |
| 커스텀 체크박스 | `<Checkbox>` 커스텀 스타일링 | 선택 |
| 라디오 그룹 | `<RadioGroup>` | 단일 선택 |
| 파일 업로드 | Minimal의 `<Upload>` | 파일 처리 |

### 3.2 데이터 표시 컴포넌트
| 기존 요소 | Minimal 컴포넌트 | 사용법 |
|------------|------------------|-------|
| HTML 테이블 | `<DataGrid>` | 채용공고 목록, 지원 내역 |
| 목록 아이템 | `<List>`와 `<ListItem>` | 내비게이션, 간단한 목록 |
| 기본 카드 | 그림자가 있는 `<Card>` | 콘텐츠 컨테이너 |
| 탭 | MUI의 `<Tabs>` | 섹션 내비게이션 |
| 아코디언 | `<Accordion>` | FAQ, 접을 수 있는 콘텐츠 |

### 3.3 내비게이션 컴포넌트
```typescript
// components/layout/Header.tsx
import { AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import { Searchbar, NotificationsPopover, AccountPopover } from '@minimal-kit/next-ts';

const Header = () => (
  <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }}>
    <Toolbar>
      {/* 로고 */}
      <Logo sx={{ mr: 2 }} />
      
      {/* 내비게이션 메뉴 */}
      <NavSection data={navConfig} />
      
      {/* 검색 */}
      <Searchbar />
      
      {/* 우측 액션 */}
      <Stack direction="row" spacing={1}>
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </Toolbar>
  </AppBar>
);
```

## 4. 모바일 우선 반응형 디자인

### 4.1 브레이크포인트 전략
```typescript
const breakpoints = {
  xs: 0,     // 모바일
  sm: 600,   // 태블릿
  md: 900,   // 작은 데스크톱
  lg: 1200,  // 데스크톱
  xl: 1536   // 큰 데스크톱
};
```

### 4.2 모바일 내비게이션
```typescript
// 모바일 드로어 내비게이션
const MobileNav = () => (
  <Drawer
    variant="temporary"
    open={open}
    onClose={onClose}
    sx={{ 
      '& .MuiDrawer-paper': { 
        width: 280,
        backgroundImage: 'none' 
      } 
    }}
  >
    <NavSection data={navConfig} />
  </Drawer>
);
```

### 4.3 터치 최적화 컴포넌트
- 최소 터치 타겟: 44x44px
- 스와이프 가능한 이미지 갤러리
- 채용공고 목록의 당겨서 새로고침
- 모바일용 하단 내비게이션
- 주요 액션을 위한 플로팅 액션 버튼

## 5. 상호작용 패턴

### 5.1 로딩 상태
```typescript
// 콘텐츠용 스켈레톤 로더
<Skeleton variant="rectangular" height={200} />
<Skeleton variant="text" />
<Skeleton variant="circular" width={40} height={40} />

// 진행 표시기
<LinearProgress />
<CircularProgress />
```

### 5.2 빈 상태
```typescript
const EmptyState = () => (
  <Box textAlign="center" py={8}>
    <SvgIcon component={EmptyIllustration} sx={{ height: 240 }} />
    <Typography variant="h5" gutterBottom>
      검색 결과가 없습니다
    </Typography>
    <Typography color="text.secondary">
      다른 검색어를 시도해보세요
    </Typography>
    <Button variant="contained" sx={{ mt: 3 }}>
      필터 초기화
    </Button>
  </Box>
);
```

### 5.3 오류 처리
```typescript
// 폴백 UI가 있는 오류 경계
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <Card sx={{ p: 3, textAlign: 'center' }}>
    <Typography variant="h6" gutterBottom>
      문제가 발생했습니다
    </Typography>
    <Typography color="text.secondary" paragraph>
      {error.message}
    </Typography>
    <Button onClick={resetErrorBoundary}>
      다시 시도
    </Button>
  </Card>
);
```

## 6. 접근성 기능

### 6.1 ARIA 구현
```typescript
// 적절한 ARIA 레이블
<IconButton aria-label="검색 열기">
  <SearchIcon />
</IconButton>

// 폼 접근성
<TextField
  id="email"
  label="이메일"
  helperText="유효한 이메일 주소를 입력하세요"
  error={!!errors.email}
  aria-describedby="email-helper-text"
/>
```

### 6.2 키보드 내비게이션
- 탭 순서 관리
- 포커스 표시기
- 키보드 단축키 (/, Ctrl+K로 검색)
- 모달용 Escape 키 처리

### 6.3 스크린 리더 지원
- 시맨틱 HTML 구조
- 제목 계층 구조
- 이미지 대체 텍스트
- 동적 콘텐츠용 라이브 영역

## 7. 성능 최적화

### 7.1 이미지 최적화
```typescript
// Next.js Image 컴포넌트
import Image from 'next/image';

<Image
  src="/company-logo.png"
  alt="회사 로고"
  width={100}
  height={100}
  loading="lazy"
  placeholder="blur"
/>
```

### 7.2 코드 분할
```typescript
// 무거운 컴포넌트용 동적 임포트
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { 
    loading: () => <Skeleton />,
    ssr: false 
  }
);
```

### 7.3 가상 스크롤링
```typescript
// 긴 목록용
import { VariableSizeList } from 'react-window';

<VariableSizeList
  height={600}
  itemCount={items.length}
  itemSize={getItemSize}
  width="100%"
>
  {Row}
</VariableSizeList>
```

## 8. 애니메이션 및 전환

### 8.1 Framer Motion 통합
```typescript
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

<MotionCard
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  whileHover={{ scale: 1.02 }}
>
  {content}
</MotionCard>
```

### 8.2 페이지 전환
```typescript
// 부드러운 페이지 전환
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 20 }
};
```

## 9. 다크 모드 지원

### 9.1 테마 토글
```typescript
const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme();
  
  return (
    <IconButton onClick={toggleMode}>
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
```

### 9.2 다크 팔레트
```typescript
const darkPalette = {
  mode: 'dark',
  background: {
    default: '#161C24',
    paper: '#212B36',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#919EAB',
  }
};
```

## 10. 디자인 토큰

### 10.1 간격 시스템
```typescript
const spacing = {
  xs: 4,   // 4px
  sm: 8,   // 8px
  md: 16,  // 16px
  lg: 24,  // 24px
  xl: 32,  // 32px
  xxl: 48  // 48px
};
```

### 10.2 색상 시스템
```typescript
const colors = {
  // 상태 색상
  success: '#00AB55',
  warning: '#FFB800',
  error: '#FF5630',
  info: '#00B8D9',
  
  // 중성 색상
  grey: {
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
  }
};
```

## 11. 마이크로 인터랙션

### 11.1 호버 효과
- 호버 시 카드 그림자 증가
- 버튼 색상 전환
- 링크 밑줄 애니메이션
- 아이콘 회전

### 11.2 피드백 애니메이션
- 성공 체크마크
- 로딩 스피너
- 진행률 바
- 토스트 알림

### 11.3 제스처 지원
- 스와이프로 삭제
- 당겨서 새로고침
- 핀치로 확대
- 길게 눌러 컨텍스트 메뉴

## 12. 결론

이 UI/UX 디자인은 레거시 구인구직 포털을 다음과 같이 현대화합니다:
- 깔끔하고 현대적인 Material Design
- 모바일 우선 반응형 레이아웃
- 접근성 우선 접근법
- 성능 최적화
- 일관된 디자인 시스템
- 직관적인 사용자 플로우
- 향상된 사용자 경험

Minimal 템플릿은 개발 속도를 가속화하면서 디자인 일관성을 유지하는 견고한 기반을 제공합니다.