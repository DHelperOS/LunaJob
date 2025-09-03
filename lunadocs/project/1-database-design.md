# 데이터베이스 설계 문서
## LadyAlba 클론 - 현대적 구인구직 포털 데이터베이스 스키마

### 1. 기술 스택
- **데이터베이스**: Supabase (PostgreSQL 15)
- **ORM**: Prisma
- **인증**: Supabase Auth
- **스토리지**: Supabase Storage
- **실시간**: Supabase Realtime
- **캐시**: Redis (선택적)
- **검색**: Supabase 풀텍스트 검색 + 향후 Elasticsearch

---

## 2. ERD (Entity Relationship Diagram)

### 2.1 핵심 엔티티

#### Users (사용자)
```prisma
model User {
  id                String    @id @default(cuid())
  email             String    @unique
  phone             String?   @unique
  // Supabase Auth에서 관리하므로 password 필드 제거
  userType          UserType  // EMPLOYER, JOB_SEEKER, ADMIN
  emailVerified     DateTime?  // Supabase Auth에서 관리
  phoneVerified     Boolean   @default(false)
  supabaseId        String?   @unique  // Supabase User ID 연결
  isActive          Boolean   @default(true)
  lastLoginAt       DateTime?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // Relations
  profile           Profile?
  company           Company?
  resumes           Resume[]
  jobPostings       JobPosting[]
  applications      Application[]
  favoriteJobs      FavoriteJob[]
  notifications     Notification[]
  messages          Message[]
  reviews           Review[]
  subscriptions     Subscription[]
  loginHistory      LoginHistory[]
}

enum UserType {
  EMPLOYER
  JOB_SEEKER
  ADMIN
}
```

#### Profile (프로필)
```prisma
model Profile {
  id                String    @id @default(cuid())
  userId            String    @unique
  name              String
  nickname          String?
  birthDate         DateTime?
  gender            Gender?
  profileImage      String?
  bio               String?   @db.Text
  address           String?
  addressDetail     String?
  latitude          Float?
  longitude         Float?
  preferredJobTypes String[]  // 선호 직종
  preferredRegions  String[]  // 선호 지역
  isPublic          Boolean   @default(true)
  viewCount         Int       @default(0)
  
  user              User      @relation(fields: [userId], references: [id])
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

enum Gender {
  MALE
  FEMALE
  OTHER
}
```

#### Company (회사)
```prisma
model Company {
  id                String    @id @default(cuid())
  userId            String    @unique
  businessNumber    String?   @unique
  companyName       String
  representativeName String
  companyType       CompanyType
  industry          String
  employeeCount     Int?
  establishedDate   DateTime?
  website           String?
  logo              String?
  description       String?   @db.Text
  address           String
  addressDetail     String?
  latitude          Float?
  longitude         Float?
  contactEmail      String?
  contactPhone      String?
  isVerified        Boolean   @default(false)
  verifiedAt        DateTime?
  
  user              User      @relation(fields: [userId], references: [id])
  jobPostings       JobPosting[]
  reviews           Review[]
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

enum CompanyType {
  INDIVIDUAL       // 개인사업자
  CORPORATION      // 법인
  ENTERTAINMENT    // 엔터테인먼트
  BAR             // 바/술집
  CAFE            // 카페
  MASSAGE         // 마사지
  OTHER
}
```

#### JobPosting (채용공고)
```prisma
model JobPosting {
  id                String    @id @default(cuid())
  companyId         String
  userId            String
  title             String
  jobCategory       JobCategory
  jobType           JobType
  employmentType    EmploymentType
  minSalary         Int?
  maxSalary         Int?
  salaryType        SalaryType
  salaryNegotiable  Boolean   @default(false)
  description       String    @db.Text
  requirements      String?   @db.Text
  benefits          String[]
  workLocation      String
  workLocationDetail String?
  latitude          Float?
  longitude         Float?
  workHours         String?
  workDays          String[]
  experienceLevel   ExperienceLevel
  educationLevel    EducationLevel?
  ageMin            Int?
  ageMax            Int?
  gender            Gender?
  applicationDeadline DateTime?
  startDate         DateTime?
  isUrgent          Boolean   @default(false)
  isPromoted        Boolean   @default(false)
  promotedUntil     DateTime?
  status            JobStatus @default(ACTIVE)
  viewCount         Int       @default(0)
  applicationCount  Int       @default(0)
  
  company           Company   @relation(fields: [companyId], references: [id])
  user              User      @relation(fields: [userId], references: [id])
  applications      Application[]
  favorites         FavoriteJob[]
  tags              JobTag[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  publishedAt       DateTime?
  expiredAt         DateTime?
  
  @@index([jobCategory, status])
  @@index([workLocation, status])
}

enum JobCategory {
  ROOM_SALON      // 룸
  TEN_PRO         // 텐프로
  BAR             // 바
  MASSAGE         // 마사지
  KARAOKE         // 노래방
  CAFE            // 카페
  ENTERTAINMENT   // 엔터테인먼트
  OTHER
}

enum JobType {
  FULL_TIME       // 정규직
  PART_TIME       // 파트타임
  TEMPORARY       // 임시직
  INTERNSHIP      // 인턴
  FREELANCE       // 프리랜서
}

enum EmploymentType {
  PERMANENT       // 정규직
  CONTRACT        // 계약직
  DAILY           // 일용직
  HOURLY          // 시급직
}

enum SalaryType {
  HOURLY          // 시급
  DAILY           // 일급
  MONTHLY         // 월급
  YEARLY          // 연봉
  NEGOTIABLE      // 협의
}

enum ExperienceLevel {
  NONE            // 무관
  ENTRY           // 신입
  JUNIOR          // 1-3년
  MIDDLE          // 3-5년
  SENIOR          // 5년 이상
}

enum EducationLevel {
  NONE            // 무관
  HIGH_SCHOOL     // 고졸
  COLLEGE         // 전문대졸
  UNIVERSITY      // 대졸
  MASTER          // 석사
  DOCTOR          // 박사
}

enum JobStatus {
  DRAFT           // 초안
  ACTIVE          // 활성
  PAUSED          // 일시중지
  CLOSED          // 마감
  EXPIRED         // 만료
}
```

#### Resume (이력서)
```prisma
model Resume {
  id                String    @id @default(cuid())
  userId            String
  title             String
  name              String
  birthDate         DateTime
  gender            Gender
  phone             String
  email             String
  address           String
  addressDetail     String?
  photo             String?
  introduction      String?   @db.Text
  
  // 경력사항
  experiences       Experience[]
  
  // 학력사항
  educations        Education[]
  
  // 자격증
  certifications    Certification[]
  
  // 희망 조건
  desiredJobTypes   String[]
  desiredLocations  String[]
  desiredSalary     Int?
  desiredSalaryType SalaryType?
  availableStartDate DateTime?
  
  isPublic          Boolean   @default(false)
  isDefault         Boolean   @default(false)
  viewCount         Int       @default(0)
  
  user              User      @relation(fields: [userId], references: [id])
  applications      Application[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

#### Application (지원)
```prisma
model Application {
  id                String    @id @default(cuid())
  jobPostingId      String
  userId            String
  resumeId          String?
  coverLetter       String?   @db.Text
  status            ApplicationStatus @default(PENDING)
  appliedAt         DateTime  @default(now())
  viewedAt          DateTime?
  respondedAt       DateTime?
  interviewDate     DateTime?
  notes             String?   @db.Text
  
  jobPosting        JobPosting @relation(fields: [jobPostingId], references: [id])
  user              User      @relation(fields: [userId], references: [id])
  resume            Resume?   @relation(fields: [resumeId], references: [id])
  
  @@unique([jobPostingId, userId])
  @@index([status])
}

enum ApplicationStatus {
  PENDING         // 대기중
  VIEWED          // 열람됨
  ACCEPTED        // 합격
  REJECTED        // 불합격
  CANCELLED       // 취소됨
}
```

---

## 3. 커뮤니티 관련 테이블

#### BoardCategory (게시판 카테고리)
```prisma
model BoardCategory {
  id                String    @id @default(cuid())
  name              String
  slug              String    @unique
  description       String?
  icon              String?
  orderIndex        Int       @default(0)
  isActive          Boolean   @default(true)
  requireAuth       Boolean   @default(false)
  
  posts             Post[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

#### Post (게시글)
```prisma
model Post {
  id                String    @id @default(cuid())
  categoryId        String
  userId            String
  title             String
  content           String    @db.Text
  thumbnail         String?
  viewCount         Int       @default(0)
  likeCount         Int       @default(0)
  commentCount      Int       @default(0)
  isPinned          Boolean   @default(false)
  isNotice          Boolean   @default(false)
  isPublished       Boolean   @default(true)
  publishedAt       DateTime?
  
  category          BoardCategory @relation(fields: [categoryId], references: [id])
  author            User      @relation(fields: [userId], references: [id])
  comments          Comment[]
  likes             PostLike[]
  attachments       Attachment[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  @@index([categoryId, isPublished])
}
```

#### Comment (댓글)
```prisma
model Comment {
  id                String    @id @default(cuid())
  postId            String
  userId            String
  parentId          String?
  content           String    @db.Text
  isDeleted         Boolean   @default(false)
  
  post              Post      @relation(fields: [postId], references: [id])
  author            User      @relation(fields: [userId], references: [id])
  parent            Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies           Comment[] @relation("CommentReplies")
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

---

## 4. 결제 및 구독 관련

#### Subscription (구독)
```prisma
model Subscription {
  id                String    @id @default(cuid())
  userId            String
  planId            String
  status            SubscriptionStatus
  currentPeriodStart DateTime
  currentPeriodEnd  DateTime
  cancelledAt       DateTime?
  
  user              User      @relation(fields: [userId], references: [id])
  plan              SubscriptionPlan @relation(fields: [planId], references: [id])
  payments          Payment[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
  EXPIRED
  PAST_DUE
}
```

#### SubscriptionPlan (구독 플랜)
```prisma
model SubscriptionPlan {
  id                String    @id @default(cuid())
  name              String
  description       String?
  price             Int
  duration          Int       // days
  features          Json      // JSON array of features
  maxJobPostings    Int?
  maxResumes        Int?
  isHighlighted     Boolean   @default(false)
  isActive          Boolean   @default(true)
  
  subscriptions     Subscription[]
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

#### Payment (결제)
```prisma
model Payment {
  id                String    @id @default(cuid())
  userId            String
  subscriptionId    String?
  amount            Int
  currency          String    @default("KRW")
  method            PaymentMethod
  status            PaymentStatus
  transactionId     String?   @unique
  metadata          Json?
  
  user              User      @relation(fields: [userId], references: [id])
  subscription      Subscription? @relation(fields: [subscriptionId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

enum PaymentMethod {
  CARD
  BANK_TRANSFER
  VIRTUAL_ACCOUNT
  PHONE
  KAKAO_PAY
  NAVER_PAY
  TOSS
}

enum PaymentStatus {
  PENDING
  PROCESSING
  SUCCESS
  FAILED
  CANCELLED
  REFUNDED
}
```

---

## 5. 알림 및 메시징

#### Notification (알림)
```prisma
model Notification {
  id                String    @id @default(cuid())
  userId            String
  type              NotificationType
  title             String
  content           String
  data              Json?     // 추가 데이터
  isRead            Boolean   @default(false)
  readAt            DateTime?
  
  user              User      @relation(fields: [userId], references: [id])
  
  createdAt         DateTime  @default(now())
}

enum NotificationType {
  APPLICATION       // 지원 알림
  MESSAGE           // 메시지
  JOB_EXPIRED       // 공고 만료
  SUBSCRIPTION      // 구독 관련
  SYSTEM            // 시스템 알림
}
```

#### Message (메시지)
```prisma
model Message {
  id                String    @id @default(cuid())
  senderId          String
  receiverId        String
  conversationId    String
  content           String    @db.Text
  isRead            Boolean   @default(false)
  readAt            DateTime?
  
  sender            User      @relation("SentMessages", fields: [senderId], references: [id])
  receiver          User      @relation("ReceivedMessages", fields: [receiverId], references: [id])
  conversation      Conversation @relation(fields: [conversationId], references: [id])
  attachments       MessageAttachment[]
  
  createdAt         DateTime  @default(now())
  
  @@index([conversationId])
}
```

---

## 6. 보조 테이블

#### Region (지역)
```prisma
model Region {
  id                String    @id @default(cuid())
  name              String
  parentId          String?
  level             Int       // 1: 시/도, 2: 구/군, 3: 동/읍/면
  orderIndex        Int       @default(0)
  isActive          Boolean   @default(true)
  
  parent            Region?   @relation("RegionHierarchy", fields: [parentId], references: [id])
  children          Region[]  @relation("RegionHierarchy")
}
```

#### JobTag (직업 태그)
```prisma
model JobTag {
  id                String    @id @default(cuid())
  name              String    @unique
  slug              String    @unique
  useCount          Int       @default(0)
  
  jobPostings       JobPosting[]
}
```

#### Review (리뷰)
```prisma
model Review {
  id                String    @id @default(cuid())
  companyId         String
  userId            String
  rating            Int       // 1-5
  title             String?
  content           String    @db.Text
  isAnonymous       Boolean   @default(false)
  isVerified        Boolean   @default(false)
  
  company           Company   @relation(fields: [companyId], references: [id])
  user              User      @relation(fields: [userId], references: [id])
  
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

---

## 7. 인덱스 및 최적화

### 주요 인덱스
```sql
-- 검색 성능 최적화
CREATE INDEX idx_job_posting_search ON job_postings(job_category, status, created_at DESC);
CREATE INDEX idx_job_posting_location ON job_postings USING GIST(location);
CREATE INDEX idx_job_posting_salary ON job_postings(min_salary, max_salary);

-- 사용자 검색
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_phone ON users(phone) WHERE phone IS NOT NULL;

-- 이력서 검색
CREATE INDEX idx_resume_public ON resumes(is_public, updated_at DESC);

-- 메시지 검색
CREATE INDEX idx_message_conversation ON messages(conversation_id, created_at DESC);
```

### 전문 검색 인덱스 (PostgreSQL)
```sql
-- Full Text Search
ALTER TABLE job_postings ADD COLUMN search_vector tsvector;

UPDATE job_postings SET search_vector = 
  to_tsvector('korean', coalesce(title, '') || ' ' || coalesce(description, ''));

CREATE INDEX idx_job_posting_fts ON job_postings USING GIN(search_vector);
```

---

## 8. 데이터 마이그레이션 전략

### 단계별 마이그레이션
1. **Phase 1**: 사용자 데이터 마이그레이션
   - 기존 회원 정보 변환
   - 비밀번호 재암호화 (bcrypt)
   - 이메일/전화번호 검증

2. **Phase 2**: 채용공고 데이터
   - 카테고리 매핑
   - 지역 정보 정규화
   - 급여 정보 표준화

3. **Phase 3**: 커뮤니티 데이터
   - 게시글 변환
   - 댓글 계층 구조 재구성
   - 첨부파일 마이그레이션

4. **Phase 4**: 통계 데이터
   - 조회수, 지원수 복원
   - 활동 로그 재구성

---

## 9. 백업 및 복구 전략

### 백업 정책
- **일일 백업**: 전체 데이터베이스 백업
- **시간별 백업**: 트랜잭션 로그
- **실시간 복제**: 읽기 전용 복제본 유지

### 복구 목표
- **RPO (Recovery Point Objective)**: 1시간
- **RTO (Recovery Time Objective)**: 2시간

---

## 10. 성능 최적화 고려사항

### 캐싱 전략
- Redis를 사용한 쿼리 결과 캐싱
- 인기 채용공고 캐싱
- 사용자 세션 캐싱

### 파티셔닝
- job_postings 테이블: 월별 파티셔닝
- messages 테이블: 연도별 파티셔닝
- notifications 테이블: 3개월 후 아카이빙

### 읽기/쓰기 분리
- Master: 쓰기 작업
- Slave: 읽기 작업 (검색, 목록 조회)