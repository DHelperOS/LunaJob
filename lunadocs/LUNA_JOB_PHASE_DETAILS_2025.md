# 📋 Luna Job 단계별 상세 작업 계획서

## 🎯 Phase 1: 프로젝트 초기화 및 기반 구축 (Week 1-2)

### Day 1-2: 프로젝트 셋업 ✅
```bash
# 작업 순서
1. Next.js 15 프로젝트 생성
   npx create-next-app@latest luna --typescript --app --tailwind

2. 필수 패키지 설치
   npm install @mui/material @mui/material-nextjs @emotion/react @emotion/styled
   npm install @mui/x-data-grid @mui/x-date-pickers @mui/lab
   npm install zustand @tanstack/react-query axios
   npm install react-hook-form zod @hookform/resolvers
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

3. 개발 도구 설치
   npm install -D @types/node eslint prettier husky lint-staged
   npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Day 3-4: Minimal 템플릿 통합 🎨
```typescript
작업 목록:
├── /src/theme 폴더 구조 생성 ✅ (이미 완료)
│   ├── core/
│   │   ├── palette.ts       // 색상 시스템 (보라색 테마 설정 완료)
│   │   ├── typography.ts    // 타이포그래피 (Pretendard 폰트 설정 완료)
│   │   ├── shadows.ts       // 그림자 시스템
│   │   └── components.ts    // 컴포넌트 오버라이드
│   ├── theme-config.ts      // 테마 설정 ✅ (보라색 #8E33FF 메인 컬러)
│   └── index.ts             // 테마 export

├── /src/components 마이그레이션
│   ├── iconify/             // 아이콘 시스템 (Solar 아이콘 전용)
│   ├── label/               // 라벨 컴포넌트
│   ├── image/               // 이미지 컴포넌트
│   ├── custom-dialog/       // 다이얼로그
│   ├── custom-breadcrumbs/  // 브레드크럼
│   └── empty-content/       // 빈 콘텐츠
```

### Day 5: Supabase Auth 통합 데이터베이스 설정 🔐
```sql
-- 1. Supabase 프로젝트 생성 (supabase.com)
-- 2. 환경 변수 설정
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

-- 3. 확장 기능 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- 위치 기반 서비스

-- 4. ENUM 타입 생성 (Supabase Auth 통합 버전)
CREATE TYPE user_type AS ENUM (
  'job_seeker', 'employer', 'agency', 'admin', 'super_admin'
);
CREATE TYPE account_status AS ENUM (
  'pending', 'active', 'inactive', 'suspended', 'banned'
);
CREATE TYPE privacy_level AS ENUM (
  'public', 'normal', 'private', 'anonymous'
);
CREATE TYPE industry_category AS ENUM (
  'room_salon', 'ten_pro', 'karaoke', 'bar', 
  'massage', 'cafe', 'club', 'other'
);

-- 5. 사용자 프로필 테이블 (Supabase Auth 연동)
-- Supabase Auth가 처리: 이메일/패스워드, OAuth, 세션, JWT, 2FA
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  phone_number VARCHAR(20),
  phone_verified BOOLEAN DEFAULT FALSE,
  user_type user_type NOT NULL DEFAULT 'job_seeker',
  account_status account_status DEFAULT 'pending',
  
  -- 프로필 정보
  avatar_url TEXT,
  bio TEXT,
  date_of_birth DATE,
  gender VARCHAR(10),
  
  -- 신원 검증 (Auth 외 추가)
  identity_verified BOOLEAN DEFAULT FALSE,
  identity_verification_date TIMESTAMPTZ,
  
  -- 프라이버시
  privacy_level privacy_level DEFAULT 'normal',
  anonymous_mode BOOLEAN DEFAULT FALSE,
  
  -- 메타데이터
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Auth 트리거 (신규 사용자 자동 프로필 생성)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  default_username TEXT;
BEGIN
  default_username := split_part(NEW.email, '@', 1) || '_' || 
                     substring(NEW.id::text from 1 for 8);
  
  INSERT INTO public.user_profiles (
    auth_user_id,
    username,
    display_name,
    user_type
  ) VALUES (
    NEW.id,
    default_username,
    COALESCE(
      NEW.raw_user_meta_data->>'display_name',
      split_part(NEW.email, '@', 1)
    ),
    COALESCE(
      (NEW.raw_user_meta_data->>'user_type')::user_type,
      'job_seeker'::user_type
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. 프로필 테이블 (구직자/구인자 분리)
-- 구직자 프로필
CREATE TABLE job_seeker_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_profile_id UUID UNIQUE NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  years_of_experience INTEGER DEFAULT 0,
  preferred_industries industry_category[] DEFAULT '{}',
  preferred_locations TEXT[],
  desired_salary_min INTEGER,
  desired_salary_max INTEGER,
  skills TEXT[],
  profile_completion_rate INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 구인자 프로필  
CREATE TABLE employer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_profile_id UUID UNIQUE NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  company_name VARCHAR(200) NOT NULL,
  business_number VARCHAR(20) UNIQUE,
  business_verified BOOLEAN DEFAULT FALSE,
  industry_category industry_category NOT NULL,
  
  -- 신뢰도
  trust_score INTEGER DEFAULT 50,
  subscription_tier VARCHAR(20) DEFAULT 'free',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. RLS (Row Level Security) 정책 설정
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_profiles ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 데이터만 수정 가능
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = auth_user_id);

-- 프로필은 공개 설정에 따라 조회 가능
CREATE POLICY "Profiles viewable based on privacy"
  ON user_profiles FOR SELECT
  USING (
    privacy_level = 'public' OR 
    auth.uid() = auth_user_id
  );

-- 구인자 프로필은 검증된 경우만 공개
CREATE POLICY "Verified employers are public"
  ON employer_profiles FOR SELECT
  USING (
    business_verified = true OR
    user_profile_id IN (
      SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()
    )
  );

-- 9. 인덱스 생성 (성능 최적화)
CREATE INDEX idx_user_profiles_auth ON user_profiles(auth_user_id);
CREATE INDEX idx_user_profiles_username ON user_profiles(username);
CREATE INDEX idx_profiles_type_status ON user_profiles(user_type, account_status);
CREATE INDEX idx_seeker_profile ON job_seeker_profiles(user_profile_id);
CREATE INDEX idx_employer_verified ON employer_profiles(business_verified);

-- 전체 데이터베이스 아키텍처는 /lunadocs/LUNA_JOB_DATABASE_ARCHITECTURE_V2_SUPABASE.md 참조
```

### Day 6-7: 프로젝트 구조 확립 📁
```
/luna
├── src/
│   ├── app/                    // Next.js 15 App Router
│   │   ├── (auth)/             // 인증 관련 페이지
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── reset-password/
│   │   ├── (main)/             // 메인 레이아웃 페이지
│   │   │   ├── page.tsx        // 홈페이지
│   │   │   ├── jobs/           // 채용공고
│   │   │   ├── companies/      // 기업 정보
│   │   │   └── about/          // 서비스 소개
│   │   ├── (dashboard)/        // 대시보드 레이아웃
│   │   │   ├── employer/       // 구인자 대시보드
│   │   │   ├── jobseeker/      // 구직자 대시보드
│   │   │   └── admin/          // 관리자 대시보드
│   │   ├── api/                // API Routes
│   │   ├── layout.tsx          // 루트 레이아웃
│   │   └── global.css          // 전역 스타일
│   │
│   ├── components/             // 재사용 컴포넌트
│   │   ├── cards/              // 카드 컴포넌트
│   │   ├── forms/              // 폼 컴포넌트
│   │   ├── dialogs/            // 다이얼로그
│   │   ├── tables/             // 테이블
│   │   └── charts/             // 차트
│   │
│   ├── sections/               // 페이지별 섹션
│   │   ├── home/               // 홈 섹션
│   │   ├── job/                // 채용 섹션
│   │   ├── auth/               // 인증 섹션
│   │   └── dashboard/          // 대시보드 섹션
│   │
│   ├── layouts/                // 레이아웃
│   │   ├── main/               // 메인 레이아웃
│   │   ├── dashboard/          // 대시보드 레이아웃
│   │   └── auth/               // 인증 레이아웃
│   │
│   ├── hooks/                  // Custom Hooks
│   │   ├── useAuth.ts
│   │   ├── useJobs.ts
│   │   └── useRealtime.ts
│   │
│   ├── services/               // API 서비스
│   │   ├── supabase.ts
│   │   ├── auth.service.ts
│   │   └── job.service.ts
│   │
│   ├── store/                  // Zustand 스토어
│   │   ├── auth.store.ts
│   │   └── app.store.ts
│   │
│   ├── types/                  // TypeScript 타입
│   │   ├── user.ts
│   │   ├── job.ts
│   │   └── application.ts
│   │
│   └── utils/                  // 유틸리티
│       ├── format.ts
│       ├── validate.ts
│       └── constants.ts
```

### Day 8-10: 개발 환경 완성 🛠️
```javascript
// 1. ESLint 설정 (.eslintrc.json)
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}

// 2. Prettier 설정 (.prettierrc)
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}

// 3. Git Hooks 설정 (Husky)
npx husky-init && npm install
npx husky add .husky/pre-commit "npm run lint-staged"

// 4. VS Code 설정 (.vscode/settings.json)
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## 🔐 Phase 2: 인증 시스템 구현 (Week 3-4)

### Week 3: 인증 기반 구축

#### Day 1-2: Supabase Auth 설정
```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}
```

#### Day 3-4: 회원가입 구현
```typescript
// src/sections/auth/RegisterForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
  confirmPassword: z.string(),
  userType: z.enum(['EMPLOYER', 'JOB_SEEKER']),
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  phone: z.string().regex(/^01[0-9]-[0-9]{4}-[0-9]{4}$/, '올바른 전화번호를 입력하세요'),
  agree: z.boolean().refine(val => val === true, '약관에 동의해야 합니다')
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    // 1. Supabase Auth 회원가입
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          user_type: data.userType
        }
      }
    });

    // 2. Profile 생성
    if (authData?.user) {
      await supabase.from('profiles').insert({
        id: authData.user.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        user_type: data.userType
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 폼 필드들 */}
    </form>
  );
}
```

#### Day 5: 소셜 로그인 구현
```typescript
// src/sections/auth/SocialLogin.tsx
export function SocialLogin() {
  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'naver') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: provider === 'google' ? 'email profile' : undefined
      }
    });
  };

  return (
    <Stack spacing={2}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Iconify icon="solar:user-bold-duotone" />}
        onClick={() => handleSocialLogin('google')}
      >
        Google로 계속하기
      </Button>
      
      <Button
        fullWidth
        variant="outlined"
        sx={{ 
          borderColor: '#FEE500',
          color: '#000000',
          bgcolor: '#FEE500',
          '&:hover': { bgcolor: '#FDD835' }
        }}
        startIcon={<img src="/kakao-icon.svg" width={20} />}
        onClick={() => handleSocialLogin('kakao')}
      >
        카카오로 계속하기
      </Button>
      
      <Button
        fullWidth
        variant="outlined"
        sx={{ 
          borderColor: '#03C75A',
          color: 'white',
          bgcolor: '#03C75A',
          '&:hover': { bgcolor: '#02B550' }
        }}
        startIcon={<img src="/naver-icon.svg" width={20} />}
        onClick={() => handleSocialLogin('naver')}
      >
        네이버로 계속하기
      </Button>
    </Stack>
  );
}
```

### Week 4: 인증 고급 기능

#### Day 1-2: Auth Guard 구현
```typescript
// src/auth/guard/AuthGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LoadingScreen } from 'src/components/loading-screen';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsAuthenticated(true);
    setIsLoading(false);
  };

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}

// src/auth/guard/RoleGuard.tsx
export function RoleGuard({ 
  children, 
  roles 
}: { 
  children: React.ReactNode;
  roles: UserType[];
}) {
  const { user } = useAuthStore();
  
  if (!roles.includes(user?.user_type)) {
    return <EmptyContent title="권한이 없습니다" />;
  }

  return <>{children}</>;
}
```

#### Day 3-4: 비밀번호 재설정
```typescript
// src/sections/auth/ResetPasswordForm.tsx
export function ResetPasswordForm() {
  const [step, setStep] = useState<'request' | 'reset'>('request');

  const handleRequestReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (!error) {
      enqueueSnackbar('비밀번호 재설정 링크를 이메일로 발송했습니다.');
    }
  };

  const handleResetPassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (!error) {
      enqueueSnackbar('비밀번호가 변경되었습니다.');
      router.push('/login');
    }
  };

  return (
    <>
      {step === 'request' ? (
        <EmailRequestForm onSubmit={handleRequestReset} />
      ) : (
        <NewPasswordForm onSubmit={handleResetPassword} />
      )}
    </>
  );
}
```

#### Day 5: 세션 관리
```typescript
// src/hooks/useSession.ts
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기 세션 체크
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 세션 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        
        // 토큰 갱신
        if (session) {
          const expiresAt = session.expires_at;
          const now = Math.floor(Date.now() / 1000);
          const timeUntilExpiry = expiresAt - now;
          
          // 만료 5분 전 자동 갱신
          if (timeUntilExpiry < 300) {
            supabase.auth.refreshSession();
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading };
}
```

---

## 💼 Phase 3: 핵심 기능 개발 (Week 5-8)

### Week 5-6: 홈페이지 및 기본 UI

#### Day 1-3: 홈페이지 구현
```typescript
// src/app/(main)/page.tsx
import { HeroSection } from 'src/sections/home/HeroSection';
import { FeaturedJobs } from 'src/sections/home/FeaturedJobs';
import { JobCategories } from 'src/sections/home/JobCategories';
import { CompanyShowcase } from 'src/sections/home/CompanyShowcase';
import { StatsSection } from 'src/sections/home/StatsSection';

export default async function HomePage() {
  // 서버 컴포넌트에서 데이터 페칭
  const featuredJobs = await getF FeaturedJobs();
  const topCompanies = await getTopCompanies();
  const stats = await getStats();

  return (
    <>
      <HeroSection />
      <FeaturedJobs jobs={featuredJobs} />
      <JobCategories />
      <CompanyShowcase companies={topCompanies} />
      <StatsSection stats={stats} />
    </>
  );
}

// src/sections/home/HeroSection.tsx
export function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'hidden'
      }}
    >
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h1" 
              sx={{ 
                color: 'white',
                fontWeight: 800,
                mb: 3
              }}
            >
              당신의 꿈을
              <br />
              현실로 만드세요
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white',
                opacity: 0.9,
                mb: 4
              }}
            >
              10,000개 이상의 기업에서 당신을 기다립니다
            </Typography>

            <SearchBox />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/illustrations/hero-illustration.svg"
              sx={{
                width: '100%',
                maxWidth: 500,
                height: 'auto'
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* 배경 애니메이션 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `url('/assets/patterns/pattern-1.svg')`,
          animation: 'float 20s ease-in-out infinite'
        }}
      />
    </Box>
  );
}
```

#### Day 4-5: 검색 시스템
```typescript
// src/components/search/JobSearchBox.tsx
export function JobSearchBox() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // 자동완성 기능
  const { data: autoComplete } = useQuery({
    queryKey: ['autocomplete', keyword],
    queryFn: async () => {
      if (keyword.length < 2) return [];
      
      const { data } = await supabase
        .from('job_postings')
        .select('title')
        .ilike('title', `%${keyword}%`)
        .limit(5);
      
      return data;
    },
    enabled: keyword.length >= 2,
    debounce: 300
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.append('q', keyword);
    if (location) params.append('location', location);
    
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        boxShadow: theme => theme.customShadows.z24
      }}
    >
      <Autocomplete
        freeSolo
        options={autoComplete || []}
        onInputChange={(e, value) => setKeyword(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="직무, 회사명으로 검색"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:magnifer-bold-duotone" />
                </InputAdornment>
              )
            }}
          />
        )}
        sx={{ flex: 1 }}
      />

      <LocationSelect
        value={location}
        onChange={setLocation}
        sx={{ minWidth: 200 }}
      />

      <Button
        variant="contained"
        size="large"
        onClick={handleSearch}
        sx={{ height: 56 }}
      >
        검색
      </Button>
    </Paper>
  );
}
```

### Week 7-8: 채용공고 시스템

#### Day 1-3: 채용공고 목록
```typescript
// src/app/(main)/jobs/page.tsx
export default function JobsPage() {
  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={3}>
        {/* 필터 사이드바 */}
        <Grid item xs={12} md={3}>
          <JobFilters />
        </Grid>

        {/* 채용공고 목록 */}
        <Grid item xs={12} md={9}>
          <JobListSection />
        </Grid>
      </Grid>
    </Container>
  );
}

// src/sections/job/JobListSection.tsx
export function JobListSection() {
  const [filters, setFilters] = useState<JobFilters>({
    keyword: '',
    location: '',
    employmentType: [],
    experienceLevel: [],
    salaryRange: [0, 10000000],
    sort: 'latest'
  });

  const { data: jobs, isLoading } = useJobs(filters);

  if (isLoading) return <JobListSkeleton />;
  if (!jobs?.length) return <EmptyContent title="검색 결과가 없습니다" />;

  return (
    <Stack spacing={3}>
      {/* 검색 결과 헤더 */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          총 {jobs.length}개의 채용공고
        </Typography>
        
        <SortSelect value={filters.sort} onChange={(sort) => setFilters({...filters, sort})} />
      </Stack>

      {/* 채용공고 카드 목록 */}
      <Stack spacing={2}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Stack>

      {/* 페이지네이션 */}
      <Pagination count={10} />
    </Stack>
  );
}
```

#### Day 4-5: 채용공고 상세
```typescript
// src/app/(main)/jobs/[id]/page.tsx
export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJobDetail(params.id);
  
  if (!job) notFound();

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={3}>
        {/* 메인 콘텐츠 */}
        <Grid item xs={12} md={8}>
          <JobDetailContent job={job} />
        </Grid>

        {/* 사이드바 */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <ApplyCard job={job} />
            <CompanyCard company={job.company} />
            <SimilarJobs jobId={job.id} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

// src/sections/job/JobDetailContent.tsx
export function JobDetailContent({ job }: { job: JobDetail }) {
  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        {/* 헤더 */}
        <Stack spacing={3}>
          <Stack direction="row" spacing={3} alignItems="start">
            <Avatar
              src={job.company.logo}
              sx={{ width: 80, height: 80 }}
            />
            
            <Box flex={1}>
              <Typography variant="h4" gutterBottom>
                {job.title}
              </Typography>
              
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip label={job.company.name} />
                <Chip label={job.location} icon={<LocationIcon />} />
                <Chip label={job.employmentType} color="primary" />
              </Stack>
            </Box>

            <BookmarkButton jobId={job.id} />
          </Stack>

          <Divider />

          {/* 주요 정보 */}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary">
                급여
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {formatSalary(job.salaryMin, job.salaryMax)}
              </Typography>
            </Grid>
            
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary">
                경력
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {job.experienceLevel}
              </Typography>
            </Grid>
            
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary">
                마감일
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {formatDate(job.deadline)}
              </Typography>
            </Grid>
            
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" color="text.secondary">
                지원자
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {job.applicationCount}명
              </Typography>
            </Grid>
          </Grid>

          <Divider />

          {/* 상세 설명 */}
          <Box>
            <Typography variant="h6" gutterBottom>
              주요 업무
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              {job.responsibilities.map((item, index) => (
                <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              자격 요건
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              {job.requirements.map((item, index) => (
                <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              우대 사항
            </Typography>
            <Box component="ul" sx={{ pl: 3 }}>
              {job.preferences.map((item, index) => (
                <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              복지 및 혜택
            </Typography>
            <Grid container spacing={1}>
              {job.benefits.map((benefit, index) => (
                <Grid item key={index}>
                  <Chip
                    label={benefit}
                    icon={<CheckIcon />}
                    variant="outlined"
                    color="success"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
```

---

## 🚀 Phase 4: 고급 기능 구현 (Week 9-12)

### Week 9-10: 대시보드 시스템

#### 구직자 대시보드
```typescript
// src/app/(dashboard)/jobseeker/dashboard/page.tsx
export default function JobSeekerDashboard() {
  const { user } = useAuthStore();
  
  return (
    <Container>
      <Grid container spacing={3}>
        {/* 통계 카드 */}
        <Grid item xs={12}>
          <StatsCards />
        </Grid>

        {/* 지원 현황 */}
        <Grid item xs={12} md={8}>
          <ApplicationStatus />
        </Grid>

        {/* 프로필 완성도 */}
        <Grid item xs={12} md={4}>
          <ProfileCompletion />
        </Grid>

        {/* 추천 채용공고 */}
        <Grid item xs={12}>
          <RecommendedJobs />
        </Grid>

        {/* 최근 본 채용공고 */}
        <Grid item xs={12} md={6}>
          <RecentlyViewed />
        </Grid>

        {/* 저장한 채용공고 */}
        <Grid item xs={12} md={6}>
          <SavedJobs />
        </Grid>
      </Grid>
    </Container>
  );
}

// 통계 카드 컴포넌트
function StatsCards() {
  const stats = [
    { 
      label: '총 지원', 
      value: 23, 
      icon: 'solar:document-text-bold-duotone',
      color: 'primary' 
    },
    { 
      label: '서류 합격', 
      value: 5, 
      icon: 'solar:check-circle-bold-duotone',
      color: 'success' 
    },
    { 
      label: '면접 예정', 
      value: 2, 
      icon: 'solar:calendar-bold-duotone',
      color: 'info' 
    },
    { 
      label: '최종 합격', 
      value: 1, 
      icon: 'solar:cup-star-bold-duotone',
      color: 'warning' 
    }
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.label}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor: `${stat.color}.lighter`,
                    color: `${stat.color}.main`
                  }}
                >
                  <Iconify icon={stat.icon} />
                </Avatar>
                
                <Box>
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
```

#### 구인자 대시보드
```typescript
// src/app/(dashboard)/employer/dashboard/page.tsx
export default function EmployerDashboard() {
  return (
    <Container>
      <Grid container spacing={3}>
        {/* 채용 통계 */}
        <Grid item xs={12}>
          <RecruitmentStats />
        </Grid>

        {/* 활성 채용공고 */}
        <Grid item xs={12} md={8}>
          <ActiveJobPostings />
        </Grid>

        {/* 오늘의 할 일 */}
        <Grid item xs={12} md={4}>
          <TodoList />
        </Grid>

        {/* 지원자 통계 차트 */}
        <Grid item xs={12} md={6}>
          <ApplicantChart />
        </Grid>

        {/* 최근 지원자 */}
        <Grid item xs={12} md={6}>
          <RecentApplicants />
        </Grid>
      </Grid>
    </Container>
  );
}
```

### Week 11-12: 실시간 기능 및 알림

#### 실시간 채팅
```typescript
// src/components/chat/ChatWindow.tsx
export function ChatWindow({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    // 기존 메시지 로드
    loadMessages();

    // 실시간 구독
    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: newMessage,
      created_at: new Date().toISOString()
    });

    setNewMessage('');
  };

  return (
    <Paper sx={{ height: 500, display: 'flex', flexDirection: 'column' }}>
      {/* 메시지 목록 */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.sender_id === user.id}
          />
        ))}
      </Box>

      {/* 입력 영역 */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="메시지를 입력하세요..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          
          <IconButton onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Paper>
  );
}
```

#### 알림 시스템
```typescript
// src/components/notifications/NotificationCenter.tsx
export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    // 알림 구독
    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        const notification = payload.new as Notification;
        
        // 알림 추가
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);

        // 브라우저 알림
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/logo.png'
          });
        }

        // 토스트 알림
        toast(notification.message, {
          type: notification.type as any
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationIcon />
          </Badge>
        </IconButton>
      </PopoverTrigger>

      <PopoverContent>
        <List sx={{ width: 360, maxHeight: 400, overflow: 'auto' }}>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={() => markAsRead(notification.id)}
            />
          ))}
        </List>
      </PopoverContent>
    </Popover>
  );
}
```

---

## 🔧 Phase 5: 최적화 및 배포 (Week 13-16)

### Week 13-14: 성능 최적화

#### 이미지 최적화
```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['your-supabase-url.supabase.co'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  }
};

// 이미지 컴포넌트 사용
import Image from 'next/image';

<Image
  src={job.company.logo}
  alt={job.company.name}
  width={80}
  height={80}
  loading="lazy"
  placeholder="blur"
  blurDataURL={generateBlurDataURL()}
/>
```

#### 번들 최적화
```javascript
// 동적 임포트
const DashboardChart = dynamic(
  () => import('src/components/charts/DashboardChart'),
  { 
    loading: () => <ChartSkeleton />,
    ssr: false 
  }
);

// 코드 스플리팅
const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('./pages/Dashboard'))
  },
  {
    path: '/jobs',
    component: lazy(() => import('./pages/Jobs'))
  }
];
```

### Week 15-16: 테스팅 및 배포

#### 테스트 작성
```typescript
// __tests__/auth.test.ts
describe('Authentication', () => {
  it('should login with valid credentials', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeDefined();
  });

  it('should handle login errors', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login('invalid@example.com', 'wrong');
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBeDefined();
  });
});
```

#### 배포 설정
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📌 체크리스트

### 개발 완료 체크리스트
- [ ] 모든 페이지 반응형 디자인 완료
- [ ] 다크 모드 전체 페이지 적용
- [ ] 키보드 네비게이션 테스트
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 디바이스 테스트
- [ ] 성능 최적화 완료
- [ ] SEO 최적화 완료
- [ ] 보안 취약점 스캔
- [ ] 접근성 테스트 (WCAG 2.1 AA)
- [ ] 문서화 완료

### 배포 체크리스트
- [ ] 환경 변수 설정
- [ ] Supabase RLS 정책 확인
- [ ] DNS 설정
- [ ] SSL 인증서 설정
- [ ] 모니터링 도구 설정
- [ ] 백업 정책 수립
- [ ] 롤백 계획 수립
- [ ] 부하 테스트 완료
- [ ] 사용자 가이드 작성
- [ ] 런칭 공지 준비

---

**작성일**: 2025년 1월 3일  
**버전**: 1.0.0  
**다음 업데이트**: Phase 1 완료 후 상세 내용 추가 예정