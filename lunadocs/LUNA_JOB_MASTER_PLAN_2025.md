# 🚀 Luna Job 구인구직 플랫폼 마스터 플랜 2025

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [핵심 설계 원칙](#핵심-설계-원칙)
3. [기술 스택 상세](#기술-스택-상세)
4. [UI/UX 설계 방향](#uiux-설계-방향)
5. [단계별 개발 계획](#단계별-개발-계획)
6. [상세 구현 가이드](#상세-구현-가이드)

---

## 📌 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: Luna Job (루나잡)
- **목표**: 최신 트렌드를 반영한 현대적인 구인구직 플랫폼 구축
- **기반**: LadyAlba 클론 + 2025 UI/UX 트렌드 적용
- **예상 개발 기간**: 16주 (4개월)

### 핵심 목표
1. **사용자 중심 경험**: 구직자와 구인자 모두를 위한 직관적인 인터페이스
2. **모바일 퍼스트**: 모든 기능이 모바일에서 완벽하게 작동
3. **실시간 소통**: Supabase Realtime을 활용한 즉각적인 알림과 업데이트
4. **성능 최적화**: Next.js 15의 최신 기능을 활용한 빠른 로딩과 반응

---

## 🎯 핵심 설계 원칙

### 1. 디자인 시스템
- **Minimal Template v7.4.0** 기반 컴포넌트 활용
- **MUI v7** 디자인 토큰 시스템
- **일관된 디자인 언어**: 색상, 타이포그래피, 그림자 체계
- **아이콘 시스템**: Solar 아이콘 독점 사용 (solar:*-bold-duotone)

### 2. 2025 UI/UX 트렌드 적용
- ✅ **마이크로 인터랙션**: 버튼, 프로그레스 바, 호버 효과
- ✅ **다크 모드**: 시스템 테마 자동 감지 및 수동 전환
- ✅ **카드 기반 레이아웃**: 정보의 모듈화와 시각적 구분
- ✅ **실시간 피드백**: 로딩 상태, 에러 처리, 성공 알림
- ❌ **AI 매칭**: 불필요한 AI 기능 배제

### 3. 접근성과 포용성
- WCAG 2.1 AA 준수
- 키보드 네비게이션 완벽 지원
- 스크린 리더 호환성
- 다국어 지원 준비 (i18n)

---

## 💻 기술 스택 상세

### Frontend
```typescript
{
  "framework": "Next.js 15.4.0",
  "language": "TypeScript 5.9",
  "ui": {
    "library": "MUI v7",
    "template": "Minimal v7.4.0",
    "styling": "emotion + styled-components"
  },
  "state": {
    "global": "Zustand",
    "server": "TanStack Query v5"
  },
  "forms": "React Hook Form + Zod"
}
```

### Backend & Infrastructure
```typescript
{
  "platform": "Supabase",
  "database": {
    "primary": "PostgreSQL 15 (Partitioned)",
    "cache": "Redis Cluster",
    "search": "Elasticsearch 8.x",
    "timeseries": "TimescaleDB"
  },
  "auth": "Supabase Auth + 2FA",
  "storage": "Supabase Storage + CDN",
  "realtime": "Supabase Realtime",
  "scale": {
    "dau": "50,000+",
    "concurrent": "5,000+",
    "dataGrowth": "20GB/month"
  }
}
```

### 데이터베이스 아키텍처 (v2.0 - Supabase Auth 통합)
```yaml
기술 스택:
  인증: Supabase Auth (JWT, OAuth, 세션 관리)
  DB: Supabase PostgreSQL 15
  실시간: Supabase Realtime
  스토리지: Supabase Storage
  
핵심 도메인:
  사용자: user_profiles (auth.users 연동)
  프로필: job_seeker_profiles, employer_profiles
  채용: job_posts, job_applications
  메시징: chat_rooms, chat_messages
  신뢰: trust_scores, identity_verifications
  결제: subscription_plans, user_subscriptions, payment_history
  리뷰: reviews, ratings
  신고: reports, user_blocks
  분석: page_views, search_history, system_stats

Supabase Auth가 처리:
  - 이메일/패스워드 인증
  - OAuth 소셜 로그인 (Google, Kakao, Naver)
  - 세션 관리 및 JWT 토큰
  - 비밀번호 재설정 및 이메일 검증
  - MFA/2FA 설정
  - Rate Limiting

애플리케이션에서 관리:
  - 사용자 프로필 정보
  - 업종별 추가 정보
  - 권한 및 역할 관리
  - 신원 검증 상태
  - 신뢰 점수
  
보안 기능:
  - Row Level Security (RLS) 전체 테이블 적용
  - 민감 정보 암호화 (pgcrypto)
  - 익명 모드 지원
  - Supabase Auth 2FA 활용
  
성능 최적화:
  - 파티셔닝: page_views, messages (월별)
  - 인덱싱: GIN (검색), GIST (지리), B-tree (조회)
  - Materialized Views: popular_job_posts
  - 트리거: 프로필 자동 생성, 신뢰 점수 계산

상세 문서: /lunadocs/LUNA_JOB_DATABASE_ARCHITECTURE_V2_SUPABASE.md
```
---

## 🎨 UI/UX 설계 방향

### 색상 시스템 (실제 프로젝트 설정)
```typescript
const theme = {
  primary: {
    lighter: '#EFD6FF',
    light: '#C684FF',
    main: '#8E33FF',    // Luna Job 메인 보라색
    dark: '#5119B7',
    darker: '#27097A',
    contrastText: '#FFFFFF',
  },
  secondary: {
    lighter: '#FFE7F3',
    light: '#FFB1DD',
    main: '#FF6BB3',    // 보조 핑크
    dark: '#D84A92',
    darker: '#A02670',
    contrastText: '#FFFFFF',
  },
  // 시맨틱 컬러
  success: '#22C55E',
  warning: '#FFAB00',
  error: '#FF5630',
  info: '#00B8D9'
}
```

### 타이포그래피 (실제 프로젝트 설정)
```css
/* Pretendard 한글 최적화 폰트 - 이미 설정 완료 */
--font-primary: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif';
--font-secondary: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif';

/* 반응형 폰트 크기 */
--h1: clamp(2rem, 5vw, 3rem);
--h2: clamp(1.5rem, 4vw, 2.5rem);
--body: clamp(0.875rem, 2vw, 1rem);
```

### 레이아웃 구조
```
┌─────────────────────────────────────┐
│          Header (64px)              │
├────────┬────────────────────────────┤
│  Nav   │                            │
│ (280px)│      Main Content          │
│        │                            │
│  PC    │   - Hero Section           │
│  Only  │   - Featured Jobs          │
│        │   - Categories             │
│        │   - Recent Jobs            │
└────────┴────────────────────────────┘

모바일: Bottom Navigation + Drawer Menu
```

---

## 📅 단계별 개발 계획

### Phase 1: 기초 설정 및 인프라 (1-2주)

#### Week 1: 프로젝트 초기화
```bash
작업 목록:
1. Next.js 15 프로젝트 생성
2. TypeScript 설정 및 경로 별칭 구성
3. MUI + Minimal 템플릿 통합
4. Supabase 프로젝트 생성 및 연결
5. Git 저장소 및 브랜치 전략 수립
```

#### Week 2: 개발 환경 구축
```bash
작업 목록:
1. ESLint + Prettier 설정
2. Husky + lint-staged 설정
3. 환경 변수 관리 체계 구축
4. Docker 개발 환경 (선택사항)
5. CI/CD 파이프라인 기초 설정
```

### Phase 2: 데이터베이스 및 인증 (3-4주)

#### Week 3: 데이터베이스 설계
```sql
-- 핵심 테이블 생성
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  user_type ENUM('EMPLOYER', 'JOB_SEEKER', 'ADMIN'),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url TEXT,
  bio TEXT
);

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  description TEXT,
  verified BOOLEAN DEFAULT false
);

CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  location VARCHAR(255),
  employment_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'ACTIVE'
);
```

#### Week 4: 인증 시스템
```typescript
// Supabase Auth 구현
const authService = {
  // 이메일/비밀번호 로그인
  signInWithEmail: async (email, password) => {},
  
  // 소셜 로그인 (Google, Kakao, Naver)
  signInWithOAuth: async (provider) => {},
  
  // 회원가입 with 프로필 생성
  signUp: async (userData) => {},
  
  // 비밀번호 재설정
  resetPassword: async (email) => {}
};
```

### Phase 3: 핵심 기능 개발 (5-8주)

#### Week 5-6: 홈페이지 및 네비게이션
```typescript
// 컴포넌트 구조
/src
  /sections
    /home
      - HeroSection.tsx      // 메인 히어로 배너
      - FeaturedJobs.tsx     // 추천 채용공고
      - JobCategories.tsx    // 직무 카테고리
      - CompanyShowcase.tsx  // 인기 기업
      - RecentJobs.tsx       // 최신 채용공고
  
  /layouts
    /main
      - Header.tsx           // 메인 헤더
      - Footer.tsx           // 푸터
    /dashboard
      - DashboardLayout.tsx  // 대시보드 레이아웃
      - Sidebar.tsx          // 사이드바 네비게이션
```

#### Week 7-8: 채용공고 시스템
```typescript
// 채용공고 CRUD
interface JobPostingService {
  // 목록 조회 (필터링, 페이지네이션)
  getJobPostings(filters: JobFilters): Promise<JobListing[]>;
  
  // 상세 조회
  getJobDetail(id: string): Promise<JobDetail>;
  
  // 생성 (기업 전용)
  createJobPosting(data: JobPostingInput): Promise<JobPosting>;
  
  // 수정/삭제
  updateJobPosting(id: string, data: Partial<JobPostingInput>): Promise<void>;
  deleteJobPosting(id: string): Promise<void>;
  
  // 지원하기
  applyToJob(jobId: string, applicationData: ApplicationInput): Promise<void>;
}
```

### Phase 4: 고급 기능 구현 (9-12주)

#### Week 9-10: 이력서 관리 시스템
```typescript
// 이력서 컴포넌트
components/
  /resume
    - ResumeBuilder.tsx       // 이력서 작성기
    - ResumePreview.tsx       // 미리보기
    - ResumeTemplates.tsx     // 템플릿 선택
    - SkillsSection.tsx       // 기술 스택
    - ExperienceSection.tsx   // 경력 사항
    - EducationSection.tsx    // 학력 사항
    - PortfolioSection.tsx    // 포트폴리오
```

#### Week 11-12: 실시간 기능
```typescript
// Supabase Realtime 구현
const realtimeService = {
  // 새 채용공고 알림
  subscribeToNewJobs: (callback) => {
    return supabase
      .channel('job-posts')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'job_postings'
      }, callback)
      .subscribe();
  },
  
  // 채팅 시스템
  subscribeToMessages: (conversationId, callback) => {
    return supabase
      .channel(`conversation:${conversationId}`)
      .on('broadcast', { event: 'message' }, callback)
      .subscribe();
  },
  
  // 지원 상태 업데이트
  subscribeToApplicationStatus: (userId, callback) => {
    return supabase
      .channel(`user:${userId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'applications',
        filter: `applicant_id=eq.${userId}`
      }, callback)
      .subscribe();
  }
};
```

### Phase 5: 최적화 및 배포 (13-16주)

#### Week 13-14: 성능 최적화
```typescript
// 최적화 체크리스트
const optimizations = {
  // 이미지 최적화
  images: {
    nextImage: true,
    webp: true,
    lazyLoading: true,
    responsive: true
  },
  
  // 코드 스플리팅
  bundling: {
    dynamicImports: true,
    routeBasedSplitting: true,
    vendorChunking: true
  },
  
  // 캐싱 전략
  caching: {
    staticAssets: 'CDN',
    apiResponses: 'Redis',
    clientState: 'TanStack Query'
  },
  
  // SEO 최적화
  seo: {
    metaTags: true,
    openGraph: true,
    structuredData: true,
    sitemap: true
  }
};
```

#### Week 15-16: 테스팅 및 배포
```bash
# 테스팅 전략
1. Unit Tests (Jest + Testing Library)
2. Integration Tests (Cypress)
3. E2E Tests (Playwright)
4. Performance Tests (Lighthouse)
5. Accessibility Tests (axe-core)

# 배포 체크리스트
✅ 환경 변수 설정
✅ 데이터베이스 마이그레이션
✅ Supabase RLS 정책 설정
✅ CDN 설정 (Cloudflare)
✅ 모니터링 설정 (Sentry)
✅ Analytics 설정 (Google Analytics)
✅ 도메인 연결 및 SSL
```

---

## 🔧 상세 구현 가이드

### 1. 컴포넌트 개발 패턴

#### Minimal 템플릿 컴포넌트 우선 사용
```typescript
// ❌ 잘못된 예: MUI 직접 사용
import { Dialog } from '@mui/material';

// ✅ 올바른 예: Minimal 컴포넌트 사용
import { CustomDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
```

#### 컴포넌트 구조
```typescript
// src/sections/job/JobCard.tsx
import { Card, CardContent, Stack, Typography, Chip } from '@mui/material';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

interface JobCardProps {
  job: JobPosting;
  onView?: () => void;
  onApply?: () => void;
}

export function JobCard({ job, onView, onApply }: JobCardProps) {
  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.customShadows.z24
        }
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* 회사 정보 */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={job.company.logo} />
            <div>
              <Typography variant="subtitle2">
                {job.company.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {job.location}
              </Typography>
            </div>
          </Stack>

          {/* 채용 제목 */}
          <Typography variant="h6" component="h3">
            {job.title}
          </Typography>

          {/* 태그 */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Label color="primary">{job.employmentType}</Label>
            <Label color="info">{job.experienceLevel}</Label>
            {job.isRemote && <Label color="success">재택근무</Label>}
          </Stack>

          {/* 급여 정보 */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Iconify icon="solar:wallet-bold" />
            <Typography variant="body2">
              {job.salaryMin && job.salaryMax 
                ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}만원`
                : '협의'}
            </Typography>
          </Stack>

          {/* 액션 버튼 */}
          <Stack direction="row" spacing={1}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={onView}
            >
              상세보기
            </Button>
            <Button 
              variant="contained" 
              size="small"
              onClick={onApply}
            >
              지원하기
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
```

### 2. 상태 관리 패턴

#### Zustand Store 구조
```typescript
// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        set({ 
          user: data.user, 
          isAuthenticated: true 
        });
      },
      
      logout: () => {
        supabase.auth.signOut();
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      updateProfile: async (data) => {
        const { user } = get();
        if (!user) return;
        
        const { error } = await supabase
          .from('profiles')
          .update(data)
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        set({ 
          user: { ...user, profile: { ...user.profile, ...data } } 
        });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

### 3. API 서비스 패턴

#### TanStack Query 활용
```typescript
// src/hooks/useJobs.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 채용공고 목록 조회
export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      let query = supabase
        .from('job_postings')
        .select(`
          *,
          company:companies(*),
          _count:applications(count)
        `)
        .eq('status', 'ACTIVE');

      // 필터 적용
      if (filters?.location) {
        query = query.eq('location', filters.location);
      }
      if (filters?.employmentType) {
        query = query.eq('employment_type', filters.employmentType);
      }
      if (filters?.salaryMin) {
        query = query.gte('salary_max', filters.salaryMin);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
}

// 채용공고 지원
export function useApplyToJob() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ jobId, coverLetter, resumeId }) => {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          cover_letter: coverLetter,
          resume_id: resumeId,
          status: 'PENDING'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });
}
```

### 4. 실시간 기능 구현

#### 실시간 알림 시스템
```typescript
// src/hooks/useRealtimeNotifications.ts
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

export function useRealtimeNotifications(userId: string) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // 새 채용공고 구독
    const jobChannel = supabase
      .channel('new-jobs')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'job_postings'
      }, (payload) => {
        enqueueSnackbar(`새로운 채용공고: ${payload.new.title}`, {
          variant: 'info',
          action: (
            <Button size="small" color="inherit">
              보기
            </Button>
          )
        });
      })
      .subscribe();

    // 지원 상태 변경 구독
    const applicationChannel = supabase
      .channel(`user-${userId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'applications',
        filter: `applicant_id=eq.${userId}`
      }, (payload) => {
        const statusMessages = {
          ACCEPTED: '축하합니다! 서류 전형에 합격하셨습니다.',
          REJECTED: '아쉽게도 이번 기회는 다음으로 미뤄졌습니다.',
          INTERVIEW: '면접 일정이 확정되었습니다.'
        };

        enqueueSnackbar(
          statusMessages[payload.new.status] || '지원 상태가 업데이트되었습니다.',
          { variant: payload.new.status === 'ACCEPTED' ? 'success' : 'info' }
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(jobChannel);
      supabase.removeChannel(applicationChannel);
    };
  }, [userId, enqueueSnackbar]);
}
```

### 5. 모바일 반응형 구현

#### 반응형 네비게이션
```typescript
// src/layouts/main/MobileNav.tsx
import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Drawer } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export function MobileNav() {
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* 하단 네비게이션 */}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: theme => theme.zIndex.appBar,
          borderTop: theme => `1px solid ${theme.palette.divider}`,
          display: { xs: 'flex', md: 'none' }
        }}
      >
        <BottomNavigationAction 
          label="홈" 
          icon={<Iconify icon="solar:home-bold-duotone" />} 
        />
        <BottomNavigationAction 
          label="채용" 
          icon={<Iconify icon="solar:briefcase-bold-duotone" />} 
        />
        <BottomNavigationAction 
          label="이력서" 
          icon={<Iconify icon="solar:document-bold-duotone" />} 
        />
        <BottomNavigationAction 
          label="메뉴" 
          icon={<Iconify icon="solar:menu-dots-bold-duotone" />}
          onClick={() => setDrawerOpen(true)} 
        />
      </BottomNavigation>

      {/* 사이드 드로어 */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        {/* 메뉴 내용 */}
      </Drawer>
    </>
  );
}
```

### 6. 다크 모드 구현

#### 테마 전환 시스템
```typescript
// src/theme/ThemeProvider.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createTheme } from './createTheme';

const ThemeContext = createContext({
  mode: 'light',
  toggleMode: () => {}
});

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    // 시스템 설정 감지
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-mode');
      if (saved) return saved;
      
      return window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const theme = createTheme(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
```

---

## 📊 품질 관리 체크리스트

### 성능 지표
- [ ] Lighthouse 점수 90+ (모든 카테고리)
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1
- [ ] 이미지 최적화 (WebP, 지연 로딩)

### 접근성
- [ ] WCAG 2.1 AA 준수
- [ ] 키보드 네비게이션 완벽 지원
- [ ] 스크린 리더 호환성 테스트
- [ ] 색상 대비 4.5:1 이상
- [ ] 포커스 인디케이터 명확

### 보안
- [ ] Supabase RLS 정책 설정
- [ ] XSS 방어 (입력 검증)
- [ ] CSRF 토큰 구현
- [ ] 민감 정보 암호화
- [ ] Rate Limiting 설정

### 테스팅
- [ ] Unit Test Coverage > 80%
- [ ] E2E 핵심 시나리오 테스트
- [ ] Cross-browser 테스트
- [ ] Mobile 디바이스 테스트
- [ ] 부하 테스트 (1000+ 동시 사용자)

---

## 🚀 배포 및 운영

### 배포 환경
```yaml
# Production
- Domain: lunajob.com
- Hosting: Vercel
- Database: Supabase (Production)
- CDN: Cloudflare
- Monitoring: Sentry + Vercel Analytics

# Staging
- Domain: staging.lunajob.com
- Hosting: Vercel (Preview)
- Database: Supabase (Staging)
```

### 모니터링 설정
```typescript
// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});
```

---

## 📝 유지보수 가이드

### 정기 업데이트
- 매주: 의존성 패키지 업데이트 확인
- 매월: 보안 취약점 스캔
- 분기별: 성능 리뷰 및 최적화
- 반기별: UI/UX 개선 사항 수집 및 반영

### 문서화
- 모든 주요 기능에 대한 기술 문서 작성
- API 엔드포인트 문서 (Swagger/OpenAPI)
- 컴포넌트 스토리북 유지
- 온보딩 가이드 업데이트

---

## 🎯 성공 지표 (KPI)

### 기술적 지표
- 페이지 로드 시간 < 2초
- 에러율 < 0.1%
- 가동 시간 > 99.9%
- 모바일 사용자 비율 > 60%

### 비즈니스 지표
- 월간 활성 사용자 (MAU) 10,000+
- 채용공고 등록 수 1,000+/월
- 지원 전환율 > 5%
- 사용자 만족도 > 4.5/5.0

---

## 📌 중요 참고사항

1. **Minimal 템플릿 우선**: 항상 Minimal 컴포넌트를 먼저 확인하고 사용
2. **모바일 퍼스트**: 모든 기능은 모바일에서 먼저 테스트
3. **실시간 업데이트**: Supabase Realtime을 적극 활용
4. **성능 최적화**: 번들 크기와 로딩 속도 지속적 모니터링
5. **사용자 피드백**: 정기적인 사용자 피드백 수집 및 반영

---

**작성일**: 2025년 1월 3일  
**작성자**: Luna Job Development Team  
**버전**: 1.0.0

---

## 다음 단계

이 마스터 플랜을 기반으로:
1. 즉시 Phase 1 작업 시작
2. 주간 스프린트 계획 수립
3. 데일리 스탠드업 미팅 진행
4. 2주 단위 데모 및 리뷰

모든 개발 과정은 이 문서를 기준으로 진행되며, 필요시 업데이트하여 최신 상태를 유지합니다.