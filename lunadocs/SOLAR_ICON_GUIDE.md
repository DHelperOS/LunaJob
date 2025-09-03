# 🌟 Solar 아이콘 가이드 - Luna Job 프로젝트

## 📋 Solar 아이콘 사용 규칙

### 기본 원칙
- **모든 아이콘은 Solar 아이콘 세트 사용**
- **일관된 스타일**: `bold-duotone` 변형 우선 사용
- **폴백 순서**: bold-duotone → bold → outline → linear

### 아이콘 네이밍 패턴
```typescript
// 기본 패턴
'solar:{icon-name}-bold-duotone'

// 예시
'solar:home-bold-duotone'
'solar:user-bold-duotone'
'solar:settings-bold-duotone'
```

---

## 🎨 카테고리별 Solar 아이콘 매핑

### 🏠 네비게이션
```typescript
const navigationIcons = {
  home: 'solar:home-bold-duotone',
  dashboard: 'solar:widget-bold-duotone',
  jobs: 'solar:briefcase-bold-duotone',
  companies: 'solar:buildings-bold-duotone',
  resume: 'solar:document-text-bold-duotone',
  profile: 'solar:user-circle-bold-duotone',
  settings: 'solar:settings-bold-duotone',
  logout: 'solar:logout-bold-duotone',
  menu: 'solar:menu-dots-bold-duotone',
  close: 'solar:close-circle-bold-duotone'
};
```

### 💼 채용/구직
```typescript
const jobIcons = {
  // 채용 관련
  jobPost: 'solar:briefcase-bold-duotone',
  salary: 'solar:wallet-bold-duotone',
  location: 'solar:map-point-bold-duotone',
  remote: 'solar:home-wifi-bold-duotone',
  fullTime: 'solar:clock-circle-bold-duotone',
  partTime: 'solar:clock-square-bold-duotone',
  contract: 'solar:document-bold-duotone',
  
  // 지원 관련
  apply: 'solar:paper-clip-bold-duotone',
  bookmark: 'solar:bookmark-bold-duotone',
  bookmarkFilled: 'solar:bookmark-bold',
  share: 'solar:share-bold-duotone',
  
  // 상태
  pending: 'solar:hourglass-bold-duotone',
  accepted: 'solar:check-circle-bold-duotone',
  rejected: 'solar:close-circle-bold-duotone',
  interview: 'solar:users-group-rounded-bold-duotone'
};
```

### 👤 사용자/프로필
```typescript
const userIcons = {
  user: 'solar:user-bold-duotone',
  userGroup: 'solar:users-group-rounded-bold-duotone',
  employer: 'solar:user-id-bold-duotone',
  jobSeeker: 'solar:user-check-bold-duotone',
  admin: 'solar:shield-user-bold-duotone',
  
  // 프로필 항목
  email: 'solar:letter-bold-duotone',
  phone: 'solar:phone-bold-duotone',
  address: 'solar:map-bold-duotone',
  birthday: 'solar:calendar-bold-duotone',
  education: 'solar:square-academic-cap-bold-duotone',
  experience: 'solar:case-round-bold-duotone'
};
```

### 📊 대시보드/통계
```typescript
const dashboardIcons = {
  stats: 'solar:chart-bold-duotone',
  chart: 'solar:graph-bold-duotone',
  growth: 'solar:graph-up-bold-duotone',
  decline: 'solar:graph-down-bold-duotone',
  analytics: 'solar:presentation-graph-bold-duotone',
  
  // 위젯
  widget: 'solar:widget-bold-duotone',
  card: 'solar:card-bold-duotone',
  list: 'solar:list-bold-duotone',
  grid: 'solar:widget-3-bold-duotone'
};
```

### 🔔 알림/커뮤니케이션
```typescript
const communicationIcons = {
  notification: 'solar:bell-bold-duotone',
  notificationActive: 'solar:bell-bing-bold-duotone',
  message: 'solar:chat-round-bold-duotone',
  inbox: 'solar:inbox-bold-duotone',
  send: 'solar:paper-plane-bold-duotone',
  
  // 소셜
  facebook: 'solar:facebook-bold-duotone',
  instagram: 'solar:instagram-bold-duotone',
  linkedin: 'solar:linkedin-bold-duotone',
  twitter: 'solar:twitter-bold-duotone'
};
```

### ⚙️ 액션/컨트롤
```typescript
const actionIcons = {
  // CRUD
  add: 'solar:add-circle-bold-duotone',
  edit: 'solar:pen-bold-duotone',
  delete: 'solar:trash-bin-trash-bold-duotone',
  save: 'solar:diskette-bold-duotone',
  
  // 네비게이션
  back: 'solar:arrow-left-bold-duotone',
  forward: 'solar:arrow-right-bold-duotone',
  up: 'solar:arrow-up-bold-duotone',
  down: 'solar:arrow-down-bold-duotone',
  
  // 검색/필터
  search: 'solar:magnifer-bold-duotone',
  filter: 'solar:filter-bold-duotone',
  sort: 'solar:sort-bold-duotone',
  refresh: 'solar:refresh-bold-duotone',
  
  // 기타
  more: 'solar:menu-dots-bold-duotone',
  settings: 'solar:settings-bold-duotone',
  info: 'solar:info-circle-bold-duotone',
  help: 'solar:question-circle-bold-duotone',
  download: 'solar:download-bold-duotone',
  upload: 'solar:upload-bold-duotone',
  copy: 'solar:copy-bold-duotone',
  print: 'solar:printer-bold-duotone'
};
```

### ✅ 상태/피드백
```typescript
const statusIcons = {
  // 성공/실패
  success: 'solar:check-circle-bold-duotone',
  error: 'solar:close-circle-bold-duotone',
  warning: 'solar:danger-triangle-bold-duotone',
  info: 'solar:info-circle-bold-duotone',
  
  // 진행 상태
  loading: 'solar:spinner-bold-duotone',
  progress: 'solar:round-graph-bold-duotone',
  complete: 'solar:check-square-bold-duotone',
  incomplete: 'solar:square-bold-duotone',
  
  // 보안
  lock: 'solar:lock-bold-duotone',
  unlock: 'solar:lock-unlocked-bold-duotone',
  shield: 'solar:shield-check-bold-duotone',
  key: 'solar:key-bold-duotone',
  verified: 'solar:verified-check-bold-duotone'
};
```

### 📁 파일/문서
```typescript
const fileIcons = {
  file: 'solar:file-bold-duotone',
  folder: 'solar:folder-bold-duotone',
  document: 'solar:document-text-bold-duotone',
  pdf: 'solar:file-pdf-bold-duotone',
  image: 'solar:gallery-bold-duotone',
  video: 'solar:video-library-bold-duotone',
  audio: 'solar:music-note-bold-duotone',
  zip: 'solar:archive-bold-duotone',
  code: 'solar:code-bold-duotone',
  cloud: 'solar:cloud-bold-duotone'
};
```

### 🎯 카테고리/태그
```typescript
const categoryIcons = {
  // 직무 카테고리
  development: 'solar:programming-bold-duotone',
  design: 'solar:palette-bold-duotone',
  marketing: 'solar:chart-bold-duotone',
  sales: 'solar:shop-bold-duotone',
  service: 'solar:users-group-rounded-bold-duotone',
  manufacturing: 'solar:box-bold-duotone',
  education: 'solar:square-academic-cap-bold-duotone',
  medical: 'solar:medical-kit-bold-duotone',
  finance: 'solar:card-bold-duotone',
  legal: 'solar:scale-bold-duotone'
};
```

---

## 💡 사용 예시

### 컴포넌트에서 사용
```typescript
import { Iconify } from 'src/components/iconify';

// 기본 사용
<Iconify icon="solar:home-bold-duotone" />

// 크기 조정
<Iconify icon="solar:briefcase-bold-duotone" width={32} />

// 색상 적용
<Iconify 
  icon="solar:heart-bold-duotone" 
  sx={{ color: 'primary.main' }} 
/>

// 버튼과 함께
<Button startIcon={<Iconify icon="solar:add-circle-bold-duotone" />}>
  새 채용공고
</Button>

// 아바타에서
<Avatar sx={{ bgcolor: 'primary.lighter' }}>
  <Iconify icon="solar:user-bold-duotone" />
</Avatar>
```

### 조건부 아이콘
```typescript
// 북마크 토글
const bookmarkIcon = isBookmarked 
  ? 'solar:bookmark-bold' 
  : 'solar:bookmark-bold-duotone';

// 다크모드 토글
const themeIcon = isDarkMode 
  ? 'solar:moon-bold-duotone' 
  : 'solar:sun-bold-duotone';

// 메뉴 토글
const menuIcon = isOpen 
  ? 'solar:close-circle-bold-duotone' 
  : 'solar:menu-dots-bold-duotone';
```

### 동적 아이콘 매핑
```typescript
const getJobTypeIcon = (type: string) => {
  const iconMap = {
    FULL_TIME: 'solar:clock-circle-bold-duotone',
    PART_TIME: 'solar:clock-square-bold-duotone',
    CONTRACT: 'solar:document-bold-duotone',
    FREELANCE: 'solar:laptop-bold-duotone',
    INTERNSHIP: 'solar:graduation-cap-bold-duotone'
  };
  
  return iconMap[type] || 'solar:briefcase-bold-duotone';
};
```

---

## 🚫 사용하지 말아야 할 아이콘

다음 아이콘 세트는 사용하지 않습니다:
- ❌ Material Icons (`@mui/icons-material`)
- ❌ Font Awesome
- ❌ Heroicons
- ❌ Feather Icons
- ❌ 기타 아이콘 라이브러리

**오직 Solar 아이콘만 사용합니다!**

---

## 📚 참고 자료

- Solar 아이콘 브라우저: https://icon-sets.iconify.design/solar/
- Iconify 문서: https://iconify.design/docs/
- 아이콘 검색: `solar:` 프리픽스로 검색

---

**작성일**: 2025년 1월 3일  
**버전**: 1.0.0  
**규칙**: 모든 Luna Job 프로젝트 아이콘은 반드시 Solar 아이콘 사용