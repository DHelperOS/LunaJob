# 🏗️ Luna Job 데이터베이스 아키텍처 v2.0 (Supabase Auth 통합)
## 엔터프라이즈급 구인구직 플랫폼 데이터베이스 설계

---

## 📌 1. 아키텍처 개요

### 1.1 시스템 특성
```yaml
플랫폼: Luna Job (특수 업종 특화 구인구직 플랫폼)
대상 업종: 
  - 엔터테인먼트 (룸살롱, 텐프로, 가라오케)
  - 서비스업 (바, 카페, 마사지)
  - 나이트라이프 산업
  
기술 스택:
  Auth: Supabase Auth (JWT 기반)
  Primary DB: Supabase PostgreSQL 15
  Realtime: Supabase Realtime
  Storage: Supabase Storage
  Cache: Redis (선택적)
  Search: PostgreSQL Full-text Search + pg_trgm
  
예상 규모:
  - DAU: 50,000+
  - 월간 채용공고: 100,000+
  - 동시 접속: 5,000+
  - 데이터 증가율: 월 20GB
```

### 1.2 Supabase Auth 활용 전략
```yaml
Supabase Auth가 관리하는 영역:
  - 이메일/패스워드 인증
  - OAuth 소셜 로그인 (Google, Kakao, Naver)
  - JWT 토큰 발급 및 검증
  - 세션 관리
  - 비밀번호 재설정
  - 이메일 검증
  - MFA/2FA
  - Rate Limiting
  
애플리케이션에서 관리하는 영역:
  - 사용자 프로필 정보
  - 업종별 추가 정보
  - 권한 및 역할 관리
  - 신원 검증 상태
  - 신뢰 점수
```

---

## 📊 2. 데이터베이스 스키마 설계

### 2.1 핵심 도메인 (Core Domain)

#### 🔐 사용자 프로필 관리 (Supabase Auth 연동)

```sql
-- ============================================
-- ENUMS & TYPES
-- ============================================

-- 사용자 타입
CREATE TYPE user_type AS ENUM (
    'job_seeker',     -- 구직자
    'employer',       -- 구인자
    'agency',         -- 에이전시
    'admin',          -- 관리자
    'super_admin'     -- 슈퍼 관리자
);

-- 계정 상태
CREATE TYPE account_status AS ENUM (
    'pending',        -- 가입 대기
    'active',         -- 활성
    'inactive',       -- 비활성
    'suspended',      -- 정지
    'banned'          -- 영구 정지
);

-- 프라이버시 레벨
CREATE TYPE privacy_level AS ENUM (
    'public',         -- 공개
    'normal',         -- 일반
    'private',        -- 비공개
    'anonymous'       -- 익명
);

-- 업종 카테고리
CREATE TYPE industry_category AS ENUM (
    'room_salon',     -- 룸살롱
    'ten_pro',        -- 텐프로
    'karaoke',        -- 가라오케
    'bar',            -- 바
    'massage',        -- 마사지
    'cafe',           -- 카페
    'club',           -- 클럽
    'other'           -- 기타
);

-- ============================================
-- USER PROFILES (Supabase Auth 통합)
-- ============================================

-- 사용자 프로필 테이블
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- 기본 정보
    username VARCHAR(50) UNIQUE,
    display_name VARCHAR(100),
    phone_number VARCHAR(20),
    phone_verified BOOLEAN DEFAULT FALSE,
    
    -- 사용자 유형
    user_type user_type NOT NULL DEFAULT 'job_seeker',
    account_status account_status DEFAULT 'pending',
    
    -- 프로필 정보
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    gender VARCHAR(10),
    
    -- 위치 정보
    city VARCHAR(50),
    district VARCHAR(50),
    address_detail TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- 신원 검증
    identity_verified BOOLEAN DEFAULT FALSE,
    identity_verification_date TIMESTAMPTZ,
    identity_verification_method VARCHAR(50),
    
    -- 프라이버시 설정
    privacy_level privacy_level DEFAULT 'normal',
    anonymous_mode BOOLEAN DEFAULT FALSE,
    profile_visibility JSONB DEFAULT '{"photo": true, "phone": false, "age": true}'::jsonb,
    
    -- 활동 추적
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_ip INET,
    total_login_count INTEGER DEFAULT 0,
    
    -- 메타데이터
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    CONSTRAINT valid_phone CHECK (phone_number ~ '^\+?[0-9]{10,15}$')
);

-- 구직자 프로필
CREATE TABLE job_seeker_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID UNIQUE NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- 경력 정보
    years_of_experience INTEGER DEFAULT 0,
    preferred_industries industry_category[] DEFAULT '{}',
    preferred_locations TEXT[],
    
    -- 근무 조건
    desired_salary_min INTEGER,
    desired_salary_max INTEGER,
    available_start_date DATE,
    employment_type VARCHAR(50), -- full_time, part_time, contract
    
    -- 스킬 및 자격
    skills TEXT[],
    certifications JSONB DEFAULT '[]'::jsonb,
    languages JSONB DEFAULT '[]'::jsonb,
    
    -- 추가 정보
    has_vehicle BOOLEAN DEFAULT FALSE,
    military_service_status VARCHAR(20), -- 병역 상태
    
    -- 프로필 완성도
    profile_completion_rate INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 구인자/업체 프로필
CREATE TABLE employer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID UNIQUE NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- 업체 정보
    company_name VARCHAR(200) NOT NULL,
    business_number VARCHAR(20) UNIQUE,
    business_verified BOOLEAN DEFAULT FALSE,
    industry_category industry_category NOT NULL,
    
    -- 업체 상세
    company_size VARCHAR(20), -- 1-10, 11-50, 51-100, 100+
    established_year INTEGER,
    company_description TEXT,
    company_website VARCHAR(255),
    
    -- 위치 정보 (업체)
    company_address TEXT,
    company_latitude DECIMAL(10, 8),
    company_longitude DECIMAL(11, 8),
    
    -- 연락처
    company_phone VARCHAR(20),
    company_email VARCHAR(255),
    business_hours JSONB,
    
    -- 인증 및 등급
    verification_status VARCHAR(20) DEFAULT 'pending',
    verification_date TIMESTAMPTZ,
    trust_score INTEGER DEFAULT 50,
    
    -- 구독 정보
    subscription_tier VARCHAR(20) DEFAULT 'free', -- free, basic, premium, enterprise
    subscription_expires_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AUTHENTICATION HELPERS (Supabase Auth 보완)
-- ============================================

-- 로그인 기록
CREATE TABLE login_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    login_at TIMESTAMPTZ DEFAULT NOW(),
    login_ip INET,
    user_agent TEXT,
    device_info JSONB,
    location_info JSONB,
    
    login_method VARCHAR(50), -- password, google, kakao, naver
    success BOOLEAN DEFAULT TRUE,
    failure_reason VARCHAR(255),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 디바이스 관리
CREATE TABLE user_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    device_id VARCHAR(255) UNIQUE NOT NULL,
    device_name VARCHAR(100),
    device_type VARCHAR(50), -- mobile, tablet, desktop
    device_os VARCHAR(50),
    
    push_token TEXT,
    is_trusted BOOLEAN DEFAULT FALSE,
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- JOBS & APPLICATIONS
-- ============================================

-- 채용공고
CREATE TABLE job_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_profile_id UUID NOT NULL REFERENCES employer_profiles(id) ON DELETE CASCADE,
    
    -- 기본 정보
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    benefits TEXT,
    
    -- 업종 및 위치
    industry_category industry_category NOT NULL,
    work_location TEXT,
    work_latitude DECIMAL(10, 8),
    work_longitude DECIMAL(11, 8),
    
    -- 급여 정보
    salary_type VARCHAR(20), -- hourly, daily, monthly
    salary_min INTEGER,
    salary_max INTEGER,
    salary_negotiable BOOLEAN DEFAULT FALSE,
    tip_available BOOLEAN DEFAULT FALSE,
    
    -- 근무 조건
    employment_type VARCHAR(50),
    working_hours JSONB,
    work_days_per_week INTEGER,
    
    -- 모집 정보
    positions_available INTEGER DEFAULT 1,
    positions_filled INTEGER DEFAULT 0,
    application_deadline DATE,
    start_date DATE,
    
    -- 요구사항
    experience_required INTEGER DEFAULT 0,
    age_min INTEGER,
    age_max INTEGER,
    gender_preference VARCHAR(10),
    
    -- 상태 관리
    post_status VARCHAR(20) DEFAULT 'draft', -- draft, active, paused, closed, expired
    visibility privacy_level DEFAULT 'public',
    featured BOOLEAN DEFAULT FALSE,
    featured_until TIMESTAMPTZ,
    
    -- 통계
    view_count INTEGER DEFAULT 0,
    application_count INTEGER DEFAULT 0,
    bookmark_count INTEGER DEFAULT 0,
    
    -- 메타데이터
    tags TEXT[],
    metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    expired_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

-- 지원 내역
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_post_id UUID NOT NULL REFERENCES job_posts(id) ON DELETE CASCADE,
    job_seeker_profile_id UUID NOT NULL REFERENCES job_seeker_profiles(id) ON DELETE CASCADE,
    
    -- 지원 정보
    cover_letter TEXT,
    expected_salary INTEGER,
    available_start_date DATE,
    
    -- 상태 관리
    application_status VARCHAR(20) DEFAULT 'pending',
    -- pending, reviewing, interview_scheduled, accepted, rejected, withdrawn
    
    -- 처리 정보
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES user_profiles(id),
    review_notes TEXT,
    
    -- 면접 정보
    interview_scheduled_at TIMESTAMPTZ,
    interview_location TEXT,
    interview_notes TEXT,
    
    -- 익명 지원
    is_anonymous BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(job_post_id, job_seeker_profile_id)
);

-- ============================================
-- MESSAGING & COMMUNICATION
-- ============================================

-- 채팅방
CREATE TABLE chat_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_type VARCHAR(20) DEFAULT 'direct', -- direct, group, support
    
    -- 참여자 (2명 이상)
    participant_ids UUID[] NOT NULL,
    
    -- 방 정보
    room_name VARCHAR(100),
    room_avatar TEXT,
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    last_message_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 채팅 메시지
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES user_profiles(id),
    
    -- 메시지 내용
    message_type VARCHAR(20) DEFAULT 'text', -- text, image, file, system
    message_content TEXT,
    attachments JSONB DEFAULT '[]'::jsonb,
    
    -- 상태
    is_edited BOOLEAN DEFAULT FALSE,
    edited_at TIMESTAMPTZ,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    
    -- 읽음 확인
    read_by UUID[] DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 알림
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- 알림 정보
    notification_type VARCHAR(50) NOT NULL,
    title VARCHAR(200),
    message TEXT,
    
    -- 관련 정보
    related_entity_type VARCHAR(50),
    related_entity_id UUID,
    action_url TEXT,
    
    -- 상태
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    
    -- 푸시 알림
    push_sent BOOLEAN DEFAULT FALSE,
    push_sent_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRUST & VERIFICATION SYSTEM
-- ============================================

-- 신뢰 점수
CREATE TABLE trust_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID UNIQUE NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- 점수 구성 요소
    base_score INTEGER DEFAULT 50,
    verification_score INTEGER DEFAULT 0,
    activity_score INTEGER DEFAULT 0,
    reputation_score INTEGER DEFAULT 0,
    penalty_score INTEGER DEFAULT 0,
    
    -- 계산된 총점 (0-100)
    total_score INTEGER GENERATED ALWAYS AS (
        GREATEST(0, LEAST(100, 
            base_score + verification_score + activity_score + reputation_score - penalty_score
        ))
    ) STORED,
    
    -- 등급
    trust_level VARCHAR(20) GENERATED ALWAYS AS (
        CASE 
            WHEN (base_score + verification_score + activity_score + reputation_score - penalty_score) >= 90 THEN 'platinum'
            WHEN (base_score + verification_score + activity_score + reputation_score - penalty_score) >= 75 THEN 'gold'
            WHEN (base_score + verification_score + activity_score + reputation_score - penalty_score) >= 60 THEN 'silver'
            WHEN (base_score + verification_score + activity_score + reputation_score - penalty_score) >= 40 THEN 'bronze'
            ELSE 'basic'
        END
    ) STORED,
    
    -- 업데이트 기록
    last_calculated_at TIMESTAMPTZ DEFAULT NOW(),
    calculation_history JSONB DEFAULT '[]'::jsonb,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 신원 검증
CREATE TABLE identity_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- 검증 정보
    verification_type VARCHAR(50) NOT NULL, -- phone, email, id_card, business
    verification_status VARCHAR(20) DEFAULT 'pending', -- pending, verified, failed
    
    -- 검증 데이터
    verification_data JSONB,
    verification_hash TEXT, -- 암호화된 민감 정보
    
    -- 검증 결과
    verified_at TIMESTAMPTZ,
    verified_by VARCHAR(100), -- system, admin, third_party
    verification_notes TEXT,
    
    -- 만료
    expires_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REVIEWS & RATINGS
-- ============================================

-- 리뷰
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reviewer_id UUID NOT NULL REFERENCES user_profiles(id),
    reviewed_entity_type VARCHAR(50) NOT NULL, -- employer, job_seeker, job_post
    reviewed_entity_id UUID NOT NULL,
    
    -- 평점
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    -- 리뷰 내용
    review_title VARCHAR(200),
    review_content TEXT,
    
    -- 카테고리별 평점
    rating_details JSONB DEFAULT '{}'::jsonb,
    -- 예: {"work_environment": 5, "salary": 4, "management": 3}
    
    -- 상태
    is_verified BOOLEAN DEFAULT FALSE,
    is_anonymous BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active', -- active, hidden, removed
    
    -- 도움됨 카운트
    helpful_count INTEGER DEFAULT 0,
    unhelpful_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(reviewer_id, reviewed_entity_type, reviewed_entity_id)
);

-- ============================================
-- PAYMENTS & SUBSCRIPTIONS
-- ============================================

-- 구독 플랜
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_name VARCHAR(50) UNIQUE NOT NULL,
    plan_type VARCHAR(20) NOT NULL, -- job_seeker, employer
    
    -- 가격 정보
    price_monthly INTEGER NOT NULL,
    price_yearly INTEGER,
    currency VARCHAR(3) DEFAULT 'KRW',
    
    -- 기능 제한
    features JSONB NOT NULL,
    limitations JSONB NOT NULL,
    
    -- 상태
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 구독 내역
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    subscription_plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    
    -- 구독 기간
    started_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    
    -- 상태
    status VARCHAR(20) DEFAULT 'active', -- active, cancelled, expired
    auto_renew BOOLEAN DEFAULT TRUE,
    
    -- 결제 정보
    payment_method VARCHAR(50),
    last_payment_at TIMESTAMPTZ,
    next_payment_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 결제 내역
CREATE TABLE payment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID NOT NULL REFERENCES user_profiles(id),
    
    -- 결제 정보
    amount INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'KRW',
    payment_method VARCHAR(50),
    
    -- 결제 상태
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed, refunded
    
    -- 관련 정보
    payment_type VARCHAR(50), -- subscription, job_post, feature
    related_entity_id UUID,
    
    -- 외부 결제 정보
    external_payment_id VARCHAR(255),
    payment_gateway VARCHAR(50),
    
    -- 메타데이터
    metadata JSONB DEFAULT '{}'::jsonb,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REPORTING & MODERATION
-- ============================================

-- 신고
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES user_profiles(id),
    
    -- 신고 대상
    reported_entity_type VARCHAR(50) NOT NULL,
    reported_entity_id UUID NOT NULL,
    
    -- 신고 내용
    report_category VARCHAR(50) NOT NULL,
    report_reason TEXT NOT NULL,
    evidence_urls TEXT[],
    
    -- 처리 상태
    status VARCHAR(20) DEFAULT 'pending', -- pending, reviewing, resolved, dismissed
    
    -- 처리 정보
    reviewed_by UUID REFERENCES user_profiles(id),
    reviewed_at TIMESTAMPTZ,
    resolution TEXT,
    action_taken VARCHAR(50),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 차단 목록
CREATE TABLE user_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    blocked_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    block_reason VARCHAR(255),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(blocker_id, blocked_id)
);

-- ============================================
-- ANALYTICS & TRACKING
-- ============================================

-- 페이지 조회 기록
CREATE TABLE page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID REFERENCES user_profiles(id),
    session_id VARCHAR(255),
    
    -- 페이지 정보
    page_type VARCHAR(50),
    page_url TEXT,
    entity_type VARCHAR(50),
    entity_id UUID,
    
    -- 접속 정보
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    
    -- 체류 시간
    duration_seconds INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- 월별 파티션 생성
CREATE TABLE page_views_2024_01 PARTITION OF page_views
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- 검색 기록
CREATE TABLE search_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_profile_id UUID REFERENCES user_profiles(id),
    
    -- 검색 정보
    search_query TEXT,
    search_filters JSONB,
    search_type VARCHAR(50), -- job, company, candidate
    
    -- 결과
    result_count INTEGER,
    clicked_results UUID[],
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES & PERFORMANCE
-- ============================================

-- 사용자 프로필 인덱스
CREATE INDEX idx_user_profiles_auth_user ON user_profiles(auth_user_id);
CREATE INDEX idx_user_profiles_username ON user_profiles(username);
CREATE INDEX idx_user_profiles_phone ON user_profiles(phone_number);
CREATE INDEX idx_user_profiles_type_status ON user_profiles(user_type, account_status);
CREATE INDEX idx_user_profiles_location ON user_profiles USING GIST(
    ll_to_earth(latitude, longitude)
) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- 채용공고 인덱스
CREATE INDEX idx_job_posts_employer ON job_posts(employer_profile_id);
CREATE INDEX idx_job_posts_status ON job_posts(post_status);
CREATE INDEX idx_job_posts_industry ON job_posts(industry_category);
CREATE INDEX idx_job_posts_salary ON job_posts(salary_min, salary_max);
CREATE INDEX idx_job_posts_location ON job_posts USING GIST(
    ll_to_earth(work_latitude, work_longitude)
) WHERE work_latitude IS NOT NULL;
CREATE INDEX idx_job_posts_search ON job_posts USING GIN(
    to_tsvector('korean', title || ' ' || description)
);

-- 지원 내역 인덱스
CREATE INDEX idx_applications_job ON job_applications(job_post_id);
CREATE INDEX idx_applications_seeker ON job_applications(job_seeker_profile_id);
CREATE INDEX idx_applications_status ON job_applications(application_status);

-- 채팅 인덱스
CREATE INDEX idx_chat_messages_room ON chat_messages(chat_room_id);
CREATE INDEX idx_chat_messages_sender ON chat_messages(sender_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at DESC);

-- 알림 인덱스
CREATE INDEX idx_notifications_user ON notifications(user_profile_id);
CREATE INDEX idx_notifications_unread ON notifications(user_profile_id, is_read) 
    WHERE is_read = FALSE;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- RLS 활성화
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 사용자 프로필 정책
CREATE POLICY "Users can view their own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = auth_user_id);

CREATE POLICY "Public profiles are viewable by all"
    ON user_profiles FOR SELECT
    USING (privacy_level = 'public');

-- 채용공고 정책
CREATE POLICY "Anyone can view active job posts"
    ON job_posts FOR SELECT
    USING (post_status = 'active' AND visibility = 'public');

CREATE POLICY "Employers can manage their own job posts"
    ON job_posts FOR ALL
    USING (
        employer_profile_id IN (
            SELECT id FROM employer_profiles 
            WHERE user_profile_id IN (
                SELECT id FROM user_profiles 
                WHERE auth_user_id = auth.uid()
            )
        )
    );

-- 지원 내역 정책
CREATE POLICY "Job seekers can view their own applications"
    ON job_applications FOR SELECT
    USING (
        job_seeker_profile_id IN (
            SELECT id FROM job_seeker_profiles 
            WHERE user_profile_id IN (
                SELECT id FROM user_profiles 
                WHERE auth_user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Employers can view applications to their jobs"
    ON job_applications FOR SELECT
    USING (
        job_post_id IN (
            SELECT id FROM job_posts 
            WHERE employer_profile_id IN (
                SELECT id FROM employer_profiles 
                WHERE user_profile_id IN (
                    SELECT id FROM user_profiles 
                    WHERE auth_user_id = auth.uid()
                )
            )
        )
    );

-- 채팅 메시지 정책
CREATE POLICY "Users can view messages in their chat rooms"
    ON chat_messages FOR SELECT
    USING (
        sender_id IN (
            SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()
        )
        OR 
        chat_room_id IN (
            SELECT id FROM chat_rooms 
            WHERE auth.uid()::uuid = ANY(participant_ids)
        )
    );

-- 알림 정책
CREATE POLICY "Users can view their own notifications"
    ON notifications FOR SELECT
    USING (
        user_profile_id IN (
            SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()
        )
    );

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Supabase Auth 연동 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
    default_username TEXT;
BEGIN
    -- 기본 username 생성 (email의 @ 앞부분 사용)
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
            NEW.raw_user_meta_data->>'full_name',
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

-- Auth 사용자 생성 시 프로필 자동 생성
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 업데이트 시각 자동 갱신
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 각 테이블에 업데이트 트리거 적용
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_job_posts_updated_at
    BEFORE UPDATE ON job_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 프로필 완성도 계산
CREATE OR REPLACE FUNCTION calculate_profile_completion()
RETURNS TRIGGER AS $$
DECLARE
    completion_rate INTEGER := 0;
    field_count INTEGER := 0;
    filled_count INTEGER := 0;
BEGIN
    -- 필수 필드 체크
    field_count := 8;
    
    IF NEW.years_of_experience IS NOT NULL THEN filled_count := filled_count + 1; END IF;
    IF NEW.preferred_industries IS NOT NULL AND array_length(NEW.preferred_industries, 1) > 0 
        THEN filled_count := filled_count + 1; END IF;
    IF NEW.preferred_locations IS NOT NULL AND array_length(NEW.preferred_locations, 1) > 0 
        THEN filled_count := filled_count + 1; END IF;
    IF NEW.desired_salary_min IS NOT NULL THEN filled_count := filled_count + 1; END IF;
    IF NEW.desired_salary_max IS NOT NULL THEN filled_count := filled_count + 1; END IF;
    IF NEW.skills IS NOT NULL AND array_length(NEW.skills, 1) > 0 
        THEN filled_count := filled_count + 1; END IF;
    IF NEW.available_start_date IS NOT NULL THEN filled_count := filled_count + 1; END IF;
    IF NEW.employment_type IS NOT NULL THEN filled_count := filled_count + 1; END IF;
    
    completion_rate := (filled_count * 100) / field_count;
    NEW.profile_completion_rate := completion_rate;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_seeker_profile_completion
    BEFORE INSERT OR UPDATE ON job_seeker_profiles
    FOR EACH ROW EXECUTE FUNCTION calculate_profile_completion();

-- 신뢰 점수 업데이트
CREATE OR REPLACE FUNCTION update_trust_score()
RETURNS TRIGGER AS $$
BEGIN
    -- 신원 검증 점수
    IF EXISTS (
        SELECT 1 FROM identity_verifications 
        WHERE user_profile_id = NEW.user_profile_id 
        AND verification_status = 'verified'
    ) THEN
        NEW.verification_score := 20;
    END IF;
    
    -- 활동 점수 (로그인, 프로필 완성도 등)
    NEW.activity_score := (
        SELECT LEAST(30, 
            (SELECT COUNT(*) FROM login_history 
             WHERE user_profile_id = NEW.user_profile_id 
             AND login_at > NOW() - INTERVAL '30 days')
        )
    );
    
    -- 평판 점수 (리뷰 평균)
    NEW.reputation_score := (
        SELECT COALESCE(AVG(rating) * 10, 0)::INTEGER
        FROM reviews 
        WHERE reviewed_entity_id = NEW.user_profile_id
        AND status = 'active'
    );
    
    NEW.last_calculated_at := NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_trust_score
    BEFORE INSERT OR UPDATE ON trust_scores
    FOR EACH ROW EXECUTE FUNCTION update_trust_score();

-- ============================================
-- MATERIALIZED VIEWS
-- ============================================

-- 인기 채용공고
CREATE MATERIALIZED VIEW popular_job_posts AS
SELECT 
    jp.*,
    ep.company_name,
    ep.trust_score,
    COALESCE(r.avg_rating, 0) as company_rating,
    COALESCE(r.review_count, 0) as company_review_count
FROM job_posts jp
JOIN employer_profiles ep ON jp.employer_profile_id = ep.id
LEFT JOIN (
    SELECT 
        reviewed_entity_id,
        AVG(rating) as avg_rating,
        COUNT(*) as review_count
    FROM reviews
    WHERE reviewed_entity_type = 'employer'
    AND status = 'active'
    GROUP BY reviewed_entity_id
) r ON r.reviewed_entity_id = ep.id
WHERE jp.post_status = 'active'
AND jp.expired_at > NOW()
ORDER BY 
    jp.featured DESC,
    jp.view_count DESC,
    jp.created_at DESC
LIMIT 100;

-- 매시간 갱신
CREATE INDEX idx_popular_job_posts_id ON popular_job_posts(id);
REFRESH MATERIALIZED VIEW CONCURRENTLY popular_job_posts;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- 거리 계산 함수 (두 지점 간 거리)
CREATE OR REPLACE FUNCTION calculate_distance(
    lat1 DECIMAL, lon1 DECIMAL,
    lat2 DECIMAL, lon2 DECIMAL
) RETURNS DECIMAL AS $$
BEGIN
    RETURN earth_distance(
        ll_to_earth(lat1, lon1),
        ll_to_earth(lat2, lon2)
    ) / 1000; -- km 단위
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 익명화 함수
CREATE OR REPLACE FUNCTION anonymize_profile(profile_id UUID)
RETURNS TABLE (
    display_name TEXT,
    bio TEXT,
    city VARCHAR(50),
    age_group VARCHAR(20)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        '익명 사용자' as display_name,
        regexp_replace(p.bio, '[가-힣a-zA-Z]{2,}', '***', 'g') as bio,
        p.city,
        CASE 
            WHEN EXTRACT(YEAR FROM AGE(p.date_of_birth)) < 25 THEN '20대 초반'
            WHEN EXTRACT(YEAR FROM AGE(p.date_of_birth)) < 30 THEN '20대 후반'
            WHEN EXTRACT(YEAR FROM AGE(p.date_of_birth)) < 35 THEN '30대 초반'
            WHEN EXTRACT(YEAR FROM AGE(p.date_of_birth)) < 40 THEN '30대 후반'
            ELSE '40대 이상'
        END as age_group
    FROM user_profiles p
    WHERE p.id = profile_id
    AND p.anonymous_mode = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- MAINTENANCE & MONITORING
-- ============================================

-- 통계 테이블
CREATE TABLE system_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stat_date DATE DEFAULT CURRENT_DATE,
    
    -- 사용자 통계
    total_users INTEGER,
    active_users_daily INTEGER,
    active_users_weekly INTEGER,
    active_users_monthly INTEGER,
    new_users_daily INTEGER,
    
    -- 채용 통계
    total_job_posts INTEGER,
    active_job_posts INTEGER,
    new_job_posts_daily INTEGER,
    total_applications INTEGER,
    new_applications_daily INTEGER,
    
    -- 활동 통계
    total_messages INTEGER,
    total_page_views INTEGER,
    avg_session_duration INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 일일 통계 수집
CREATE OR REPLACE FUNCTION collect_daily_stats()
RETURNS VOID AS $$
BEGIN
    INSERT INTO system_stats (
        total_users,
        active_users_daily,
        new_users_daily,
        total_job_posts,
        active_job_posts,
        new_job_posts_daily,
        total_applications,
        new_applications_daily
    )
    SELECT 
        (SELECT COUNT(*) FROM user_profiles WHERE deleted_at IS NULL),
        (SELECT COUNT(DISTINCT user_profile_id) FROM login_history 
         WHERE login_at > NOW() - INTERVAL '1 day'),
        (SELECT COUNT(*) FROM user_profiles 
         WHERE created_at > NOW() - INTERVAL '1 day'),
        (SELECT COUNT(*) FROM job_posts),
        (SELECT COUNT(*) FROM job_posts WHERE post_status = 'active'),
        (SELECT COUNT(*) FROM job_posts 
         WHERE created_at > NOW() - INTERVAL '1 day'),
        (SELECT COUNT(*) FROM job_applications),
        (SELECT COUNT(*) FROM job_applications 
         WHERE created_at > NOW() - INTERVAL '1 day');
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INITIAL DATA
-- ============================================

-- 기본 구독 플랜
INSERT INTO subscription_plans (plan_name, plan_type, price_monthly, price_yearly, features, limitations) VALUES
('무료', 'job_seeker', 0, 0, 
 '{"view_jobs": true, "apply_limit": 10, "message": false}'::jsonb,
 '{"daily_applications": 10, "profile_views": 50}'::jsonb),
('베이직', 'job_seeker', 9900, 99000,
 '{"view_jobs": true, "apply_limit": 50, "message": true, "priority_support": false}'::jsonb,
 '{"daily_applications": 50, "profile_views": 200}'::jsonb),
('프리미엄', 'job_seeker', 19900, 199000,
 '{"view_jobs": true, "apply_limit": -1, "message": true, "priority_support": true}'::jsonb,
 '{"daily_applications": -1, "profile_views": -1}'::jsonb),
('무료', 'employer', 0, 0,
 '{"post_jobs": 1, "view_applications": true, "message": false}'::jsonb,
 '{"monthly_posts": 1, "active_posts": 1}'::jsonb),
('베이직', 'employer', 29900, 299000,
 '{"post_jobs": 10, "view_applications": true, "message": true, "featured": false}'::jsonb,
 '{"monthly_posts": 10, "active_posts": 5}'::jsonb),
('프리미엄', 'employer', 99900, 999000,
 '{"post_jobs": -1, "view_applications": true, "message": true, "featured": true}'::jsonb,
 '{"monthly_posts": -1, "active_posts": -1}'::jsonb);

-- ============================================
-- 완료
-- ============================================

-- 이 스키마는 Supabase Auth와 완벽하게 통합되어 있으며,
-- 세션 관리, 패스워드 인증, JWT 토큰 등은 모두 Supabase Auth가 처리합니다.
-- 애플리케이션은 사용자 프로필과 비즈니스 로직에만 집중할 수 있습니다.