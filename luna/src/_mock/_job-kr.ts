import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const JOB_DETAILS_TABS = [
  { label: '채용정보', value: 'content' },
  { label: '지원자', value: 'candidates' },
];

export const JOB_SKILL_OPTIONS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Next.js',
  'Python',
  'Java',
  'Spring',
  'AWS',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'GraphQL',
  'REST API',
  '커뮤니케이션',
  '문제해결',
  '리더십',
  '팀워크',
  '프로젝트 관리',
  'Git',
  'CI/CD',
  'Agile',
];

export const JOB_WORKING_SCHEDULE_OPTIONS = [
  '주 5일 근무',
  '주 4일 근무',
  '유연근무제',
  '재택근무 가능',
  '하이브리드',
];

export const JOB_EMPLOYMENT_TYPE_OPTIONS = [
  { label: '정규직', value: 'full-time' },
  { label: '계약직', value: 'contract' },
  { label: '파트타임', value: 'part-time' },
  { label: '인턴', value: 'intern' },
  { label: '프리랜서', value: 'freelance' },
];

export const JOB_EXPERIENCE_OPTIONS = [
  { label: '신입', value: 'entry' },
  { label: '1~3년', value: '1-3' },
  { label: '3~5년', value: '3-5' },
  { label: '5~10년', value: '5-10' },
  { label: '10년 이상', value: '10+' },
  { label: '경력무관', value: 'any' },
];

export const JOB_BENEFIT_OPTIONS = [
  { label: '4대보험', value: 'insurance' },
  { label: '퇴직금', value: 'retirement' },
  { label: '상여금', value: 'bonus' },
  { label: '스톡옵션', value: 'stock' },
  { label: '유연근무', value: 'flexible' },
  { label: '재택근무', value: 'remote' },
  { label: '교육지원', value: 'education' },
  { label: '건강검진', value: 'health' },
  { label: '경조사지원', value: 'family' },
  { label: '휴가지원', value: 'vacation' },
  { label: '간식제공', value: 'snacks' },
  { label: '차량지원', value: 'vehicle' },
  { label: '기숙사', value: 'dormitory' },
  { label: '육아휴직', value: 'parental' },
];

export const JOB_PUBLISH_OPTIONS = [
  { label: '게시중', value: 'published' },
  { label: '임시저장', value: 'draft' },
];

export const JOB_SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
  { label: '마감임박순', value: 'deadline' },
  { label: '연봉높은순', value: 'salary' },
];

export const JOB_LOCATIONS = [
  '서울',
  '경기',
  '인천',
  '부산',
  '대구',
  '대전',
  '광주',
  '울산',
  '세종',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
];

export const JOB_CATEGORIES = [
  { id: 'tech', label: '개발', icon: 'solar:programming-bold-duotone' },
  { id: 'design', label: '디자인', icon: 'solar:palette-bold-duotone' },
  { id: 'marketing', label: '마케팅', icon: 'solar:chart-bold-duotone' },
  { id: 'sales', label: '영업', icon: 'solar:shop-bold-duotone' },
  { id: 'service', label: '서비스', icon: 'solar:users-group-rounded-bold-duotone' },
  { id: 'production', label: '생산/제조', icon: 'solar:box-bold-duotone' },
  { id: 'office', label: '사무직', icon: 'solar:document-bold-duotone' },
  { id: 'medical', label: '의료', icon: 'solar:health-bold-duotone' },
  { id: 'education', label: '교육', icon: 'solar:book-bold-duotone' },
  { id: 'finance', label: '금융', icon: 'solar:wallet-bold-duotone' },
];

const KOREAN_COMPANIES = [
  '삼성전자',
  '네이버',
  '카카오',
  '쿠팡',
  'LG전자',
  'SK하이닉스',
  '현대자동차',
  '토스',
  '배달의민족',
  '당근마켓',
  '라인플러스',
  'NC소프트',
  '넥슨',
  '컬리',
  '무신사',
  '야놀자',
  '직방',
  '버킷플레이스',
  '뱅크샐러드',
  '리디',
];

const KOREAN_JOB_TITLES = [
  '프론트엔드 개발자',
  '백엔드 개발자',
  '풀스택 개발자',
  'DevOps 엔지니어',
  '데이터 엔지니어',
  'AI/ML 엔지니어',
  'iOS 개발자',
  'Android 개발자',
  'UI/UX 디자이너',
  '프로덕트 매니저',
  '프로젝트 매니저',
  '데이터 분석가',
  '마케팅 매니저',
  '콘텐츠 마케터',
  '그로스 해커',
  'QA 엔지니어',
  '시스템 관리자',
  '보안 엔지니어',
  '비즈니스 개발자',
  '고객 성공 매니저',
];

const KOREAN_NAMES = [
  '김민준',
  '이서연',
  '박지호',
  '최수진',
  '정예준',
  '강민서',
  '조서준',
  '윤지우',
  '장서윤',
  '임하준',
  '한지민',
  '오현우',
  '서예은',
  '신도윤',
  '권서연',
  '황민재',
  '안시우',
  '송하은',
  '홍준서',
  '유지안',
];

const JOB_CONTENT_TEMPLATE = (title: string, company: string) => `
<h6>주요 업무</h6>
<ul>
  <li>${title} 포지션으로 ${company}의 핵심 서비스 개발</li>
  <li>사용자 경험을 개선하고 서비스 품질 향상</li>
  <li>팀원들과 협업하여 프로젝트 목표 달성</li>
  <li>최신 기술 스택을 활용한 효율적인 개발</li>
  <li>코드 리뷰 및 기술 문서 작성</li>
</ul>

<h6>자격 요건</h6>
<ul>
  <li>관련 분야 경력 또는 그에 준하는 실력</li>
  <li>팀워크와 커뮤니케이션 능력</li>
  <li>문제 해결 능력과 적극적인 자세</li>
  <li>새로운 기술에 대한 학습 의지</li>
</ul>

<h6>우대 사항</h6>
<ul>
  <li>관련 프로젝트 경험</li>
  <li>오픈소스 기여 경험</li>
  <li>기술 블로그 운영 또는 발표 경험</li>
  <li>영어 커뮤니케이션 가능</li>
</ul>

<h6>복지 및 혜택</h6>
<ul>
  <li>유연한 근무 시간 및 재택근무</li>
  <li>최신 장비 지원</li>
  <li>교육 및 컨퍼런스 참가 지원</li>
  <li>건강검진 및 단체보험</li>
  <li>스톡옵션 제공</li>
  <li>성과급 및 인센티브</li>
</ul>
`;

const CANDIDATES = Array.from({ length: 12 }, (_, index) => ({
  id: _mock.id(index),
  role: KOREAN_JOB_TITLES[index % KOREAN_JOB_TITLES.length],
  name: KOREAN_NAMES[index % KOREAN_NAMES.length],
  avatarUrl: _mock.image.avatar(index),
}));

export const _jobs = Array.from({ length: 20 }, (_, index) => {
  const company = KOREAN_COMPANIES[index % KOREAN_COMPANIES.length];
  const title = KOREAN_JOB_TITLES[index % KOREAN_JOB_TITLES.length];
  const location = JOB_LOCATIONS[index % JOB_LOCATIONS.length];
  
  const publish = index % 3 ? 'published' : 'draft';
  
  // Korean salary ranges (annual, in 만원)
  const salaryRanges = [
    { min: 3000, max: 4000 },
    { min: 4000, max: 5000 },
    { min: 5000, max: 6000 },
    { min: 6000, max: 8000 },
    { min: 8000, max: 10000 },
    { min: 10000, max: 15000 },
  ];
  
  const salaryRange = salaryRanges[index % salaryRanges.length];
  
  const salary = {
    type: 'Annual',
    min: salaryRange.min,
    max: salaryRange.max,
    negotiable: index % 3 === 0,
  };
  
  const benefits = JOB_BENEFIT_OPTIONS.slice(
    index % 5,
    (index % 5) + 5
  ).map((option) => option.label);
  
  const experience = JOB_EXPERIENCE_OPTIONS[index % JOB_EXPERIENCE_OPTIONS.length].label;
  
  const employmentTypes = [JOB_EMPLOYMENT_TYPE_OPTIONS[index % JOB_EMPLOYMENT_TYPE_OPTIONS.length].label];
  
  const companyData = {
    name: company,
    logo: _mock.image.company(index),
    phoneNumber: _mock.phoneNumber(index),
    fullAddress: `${location}시 강남구 테헤란로 ${(index + 1) * 10}`,
  };
  
  const skills = JOB_SKILL_OPTIONS.slice(
    index % 10,
    (index % 10) + 5
  );
  
  return {
    id: _mock.id(index),
    salary,
    publish,
    company: companyData,
    benefits,
    experience,
    employmentTypes,
    content: JOB_CONTENT_TEMPLATE(title, company),
    candidates: CANDIDATES,
    role: JOB_CATEGORIES[index % JOB_CATEGORIES.length].label,
    title: `[${company}] ${title}`,
    createdAt: _mock.time(index),
    expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    skills,
    totalViews: Math.floor(Math.random() * 10000) + 100,
    locations: [location],
    workingSchedule: [JOB_WORKING_SCHEDULE_OPTIONS[index % JOB_WORKING_SCHEDULE_OPTIONS.length]],
    category: JOB_CATEGORIES[index % JOB_CATEGORIES.length].id,
  };
});

// Statistics for homepage
export const JOB_STATISTICS = {
  totalJobs: 10842,
  newJobsToday: 156,
  totalCompanies: 3421,
  totalApplicants: 45678,
  categories: JOB_CATEGORIES.map((cat, index) => ({
    ...cat,
    count: Math.floor(Math.random() * 2000) + 500,
  })),
  topCompanies: KOREAN_COMPANIES.slice(0, 10),
  recentJobs: _jobs.slice(0, 5),
};