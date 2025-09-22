# 📍 Luna Job 지역 선택 시스템 - GEOGRAPHY 활용 가이드

## 1. 개요
Luna Job의 지역 선택 시스템은 PostGIS의 GEOGRAPHY 타입을 활용하여 좌표 기반 검색과 텍스트 기반 그룹화를 동시에 지원합니다.

## 2. 데이터 구조

### 2.1 DB 스키마 (Supabase)
```sql
CREATE TABLE job_locations (
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,           -- 시/도
  district TEXT NOT NULL,        -- 구/군
  neighborhood TEXT,             -- 동/읍/면
  display_name TEXT NOT NULL,    -- 표시명 (예: "강남역")
  location_geom GEOGRAPHY(POINT, 4326),  -- PostGIS 좌표
  is_popular BOOLEAN DEFAULT FALSE        -- 인기 지역 여부
);
```

### 2.2 TypeScript 인터페이스
```typescript
interface LocationWithCoordinates {
  id: number;
  city: string;
  district: string;
  neighborhood?: string;
  display_name: string;
  coordinates: [number, number]; // [경도, 위도]
  is_popular: boolean;
  nightlife_density?: 'high' | 'medium' | 'low'; // 밤알바 밀집도
}
```

## 3. GEOGRAPHY 활용 방법

### 3.1 근거리 검색
```sql
-- 특정 좌표에서 반경 3km 이내 지역 검색
SELECT * FROM job_locations
WHERE ST_DWithin(
  location_geom,
  ST_MakePoint(127.0276, 37.4980)::geography,  -- 강남역 좌표
  3000  -- 미터 단위
);
```

### 3.2 거리 계산
```sql
-- 사용자 위치에서 각 지역까지의 거리 계산
SELECT
  display_name,
  ST_Distance(location_geom, user_location) / 1000 as distance_km
FROM job_locations
ORDER BY distance_km ASC;
```

### 3.3 밤알바 밀집 지역 분석
```sql
-- 특정 지역 주변의 밤알바 밀집도 계산
WITH nightlife_zones AS (
  SELECT
    jl.display_name,
    jl.location_geom,
    COUNT(jp.id) as job_count,
    AVG(jp.salary_max) as avg_salary
  FROM job_locations jl
  LEFT JOIN job_posts jp ON jp.location_id = jl.id
  WHERE jp.category_id IN ('bar', 'club', 'karaoke', 'massage')
  GROUP BY jl.id
)
SELECT * FROM nightlife_zones
WHERE job_count > 10
ORDER BY job_count DESC;
```

## 4. 파일 구조

### 4.1 생성된 파일들
```
/luna/src/components/job-location-selector/
├── location-data-with-coordinates.ts  # 좌표 데이터 + 헬퍼 함수
├── location-data.ts                   # 기본 그룹 데이터
├── hierarchical-location-selector.tsx # 계층적 선택 컴포넌트
├── geo-location-selector.tsx         # 지도 기반 선택 컴포넌트 (예정)
└── nearby-jobs-map.tsx               # 근처 일자리 지도 (예정)
```

### 4.2 주요 함수들

#### calculateDistance()
두 좌표 간 거리 계산 (Haversine formula)
```typescript
calculateDistance([127.0276, 37.4980], [126.9232, 37.5569])
// 결과: 약 11.2km (강남역 ↔ 홍대입구)
```

#### getNightlifeHotspots()
밤알바 밀집 지역 필터링
```typescript
const hotspots = getNightlifeHotspots();
// 강남역, 이태원, 홍대, 서면 등 high/medium 밀집도 지역
```

#### generateLocationInsertSQL()
DB 시드 데이터 생성
```typescript
const sql = generateLocationInsertSQL();
// INSERT INTO job_locations ... 형식의 SQL 생성
```

## 5. 실제 활용 시나리오

### 5.1 "내 주변 밤알바" 기능
```typescript
// 1. 사용자 현재 위치 획득
const userLocation = await getUserLocation(); // GPS

// 2. API 호출
const nearbyJobs = await fetch('/api/jobs/nearby', {
  method: 'POST',
  body: JSON.stringify({
    lat: userLocation.lat,
    lng: userLocation.lng,
    radius: 3000, // 3km
    category: 'nightlife' // 밤알바 필터
  })
});
```

### 5.2 지역 그룹 + 근거리 복합 검색
```typescript
// 강남 지역 그룹 선택 + 반경 2km 확장
const searchParams = {
  groups: [1], // 강남·서초 그룹
  expand_radius: 2000, // 그룹 경계에서 2km 확장
  filters: {
    nightlife_density: ['high', 'medium']
  }
};
```

### 5.3 대중교통 접근성 체크
```sql
-- 지하철역 500m 이내 공고만 필터링
SELECT jp.* FROM job_posts jp
JOIN job_locations jl ON jp.location_id = jl.id
WHERE EXISTS (
  SELECT 1 FROM subway_stations ss
  WHERE ST_DWithin(jl.location_geom, ss.location_geom, 500)
);
```

## 6. 성능 최적화

### 6.1 인덱스 설정
```sql
-- 지리적 검색 최적화
CREATE INDEX idx_location_geom ON job_locations USING GIST(location_geom);

-- 텍스트 검색 최적화
CREATE INDEX idx_location_names ON job_locations(city, district);

-- 복합 인덱스
CREATE INDEX idx_popular_locations ON job_locations(is_popular)
WHERE is_popular = true;
```

### 6.2 캐싱 전략
```typescript
// Redis 캐싱 예시
const CACHE_KEY = `nearby_jobs:${lat}:${lng}:${radius}`;
const CACHE_TTL = 300; // 5분

// 인기 지역은 더 긴 캐시
const POPULAR_CACHE_TTL = 3600; // 1시간
```

## 7. UI/UX 고려사항

### 7.1 Progressive Enhancement
1. **기본**: 텍스트 기반 계층적 선택
2. **향상**: GPS 기반 "내 주변" 버튼
3. **고급**: 인터랙티브 지도 선택

### 7.2 퍼포먼스
- 초기 로드: 인기 지역 10개만 표시
- Lazy Loading: 스크롤 시 추가 지역 로드
- Debounce: 검색 입력 300ms 디바운스

## 8. 보안 고려사항

### 8.1 위치 정보 보호
```typescript
// 정확한 좌표 대신 구역 단위로 그룹화
function obfuscateLocation(lat: number, lng: number): [number, number] {
  // 소수점 3자리까지만 반환 (약 100m 정확도)
  return [
    Math.round(lng * 1000) / 1000,
    Math.round(lat * 1000) / 1000
  ];
}
```

### 8.2 Rate Limiting
```typescript
// API 레이트 제한
const LOCATION_API_LIMITS = {
  nearby_search: '100/hour',
  geocoding: '1000/day',
  reverse_geocoding: '500/day'
};
```

## 9. 테스트 시나리오

### 9.1 단위 테스트
```typescript
describe('LocationSelector', () => {
  test('거리 계산 정확도', () => {
    const distance = calculateDistance(
      [127.0276, 37.4980], // 강남역
      [127.1054, 37.5145]  // 잠실역
    );
    expect(distance).toBeCloseTo(8.5, 1); // 약 8.5km
  });

  test('밤알바 밀집 지역 필터링', () => {
    const hotspots = getNightlifeHotspots();
    expect(hotspots).toContainEqual(
      expect.objectContaining({ display_name: '강남역' })
    );
  });
});
```

### 9.2 통합 테스트
```typescript
test('근거리 검색 API', async () => {
  const response = await request(app)
    .post('/api/locations/nearby')
    .send({
      coordinates: [127.0276, 37.4980],
      radius: 3000
    });

  expect(response.body.locations).toContain(
    expect.objectContaining({ display_name: '논현역' })
  );
});
```

## 10. 향후 개선 사항

### 10.1 단기 (1-2주)
- [ ] 지도 컴포넌트 통합 (Mapbox/Kakao Map)
- [ ] 실시간 GPS 추적 옵션
- [ ] 자주 선택한 지역 저장

### 10.2 중기 (1-2개월)
- [ ] 교통 정보 API 연동 (도보/대중교통 시간)
- [ ] 히트맵 시각화 (밤알바 밀집도)
- [ ] 지역별 평균 시급 정보

### 10.3 장기 (3-6개월)
- [ ] AI 기반 최적 지역 추천
- [ ] 출퇴근 시뮬레이션
- [ ] 지역 커뮤니티 연동

## 11. 참고 자료

### PostGIS 함수
- `ST_MakePoint(lng, lat)`: 좌표로 포인트 생성
- `ST_Distance(geom1, geom2)`: 두 지점 간 거리
- `ST_DWithin(geom, point, distance)`: 반경 내 검색
- `ST_Contains(polygon, point)`: 폴리곤 내 포함 여부
- `ST_Buffer(geom, radius)`: 버퍼 영역 생성

### 좌표계
- SRID 4326: WGS84 (GPS 표준)
- 한국: 경도 124-132°E, 위도 33-39°N
- 서울: 경도 126.7-127.2°E, 위도 37.4-37.7°N

### API 엔드포인트
```
GET  /api/locations/groups        # 지역 그룹 목록
GET  /api/locations/popular       # 인기 지역
POST /api/locations/nearby        # 근처 지역 검색
POST /api/locations/geocode       # 주소 → 좌표 변환
POST /api/locations/reverse       # 좌표 → 주소 변환
```

---

*문서 작성일: 2024.01.22*
*작성자: Luna Job Development Team*
*버전: 1.0.0*