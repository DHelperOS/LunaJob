// 한국 주요 지역 좌표 데이터 (밤/성인 알바 밀집 지역 중심)
// GEOGRAPHY(POINT, 4326) 형식: [경도(lng), 위도(lat)]

export interface LocationGroup {
  group_id: number;
  name: string;
  keywords: string[];
  center_coordinates?: [number, number]; // [lng, lat]
  is_nightlife_zone?: boolean; // 밤알바 밀집 지역
}

export interface LocationWithCoordinates {
  id: number;
  city: string;
  district: string;
  neighborhood?: string;
  display_name: string;
  coordinates: [number, number]; // [lng, lat]
  is_popular: boolean;
  nightlife_density?: 'high' | 'medium' | 'low'; // 밤알바 밀집도
}

// 주요 지역 좌표 데이터
export const LOCATION_COORDINATES: LocationWithCoordinates[] = [
  // 서울 - 강남·서초
  { id: 1001, city: '서울', district: '강남구', neighborhood: '역삼동', display_name: '강남역', coordinates: [127.0276, 37.4980], is_popular: true, nightlife_density: 'high' },
  { id: 1002, city: '서울', district: '강남구', neighborhood: '논현동', display_name: '논현역', coordinates: [127.0212, 37.5110], is_popular: true, nightlife_density: 'high' },
  { id: 1003, city: '서울', district: '강남구', neighborhood: '신사동', display_name: '신사역', coordinates: [127.0203, 37.5163], is_popular: true, nightlife_density: 'medium' },
  { id: 1004, city: '서울', district: '강남구', neighborhood: '청담동', display_name: '청담역', coordinates: [127.0534, 37.5194], is_popular: true, nightlife_density: 'medium' },
  { id: 1005, city: '서울', district: '강남구', neighborhood: '삼성동', display_name: '삼성역', coordinates: [127.0630, 37.5124], is_popular: true, nightlife_density: 'medium' },
  { id: 1006, city: '서울', district: '강남구', neighborhood: '선릉동', display_name: '선릉역', coordinates: [127.0489, 37.5045], is_popular: true, nightlife_density: 'high' },
  { id: 1007, city: '서울', district: '서초구', neighborhood: '서초동', display_name: '서초역', coordinates: [127.0074, 37.4917], is_popular: true, nightlife_density: 'medium' },
  { id: 1008, city: '서울', district: '서초구', neighborhood: '방배동', display_name: '방배역', coordinates: [126.9977, 37.4813], is_popular: false, nightlife_density: 'low' },

  // 서울 - 용산·이태원·한남
  { id: 1101, city: '서울', district: '용산구', neighborhood: '이태원동', display_name: '이태원역', coordinates: [126.9945, 37.5347], is_popular: true, nightlife_density: 'high' },
  { id: 1102, city: '서울', district: '용산구', neighborhood: '한남동', display_name: '한남동', coordinates: [127.0093, 37.5340], is_popular: true, nightlife_density: 'medium' },
  { id: 1103, city: '서울', district: '용산구', neighborhood: '용산동', display_name: '용산역', coordinates: [126.9648, 37.5298], is_popular: false, nightlife_density: 'low' },

  // 서울 - 홍대·합정·마포·서대문
  { id: 1201, city: '서울', district: '마포구', neighborhood: '서교동', display_name: '홍대입구역', coordinates: [126.9232, 37.5569], is_popular: true, nightlife_density: 'high' },
  { id: 1202, city: '서울', district: '마포구', neighborhood: '합정동', display_name: '합정역', coordinates: [126.9144, 37.5496], is_popular: true, nightlife_density: 'medium' },
  { id: 1203, city: '서울', district: '마포구', neighborhood: '상수동', display_name: '상수역', coordinates: [126.9227, 37.5477], is_popular: true, nightlife_density: 'medium' },
  { id: 1204, city: '서울', district: '서대문구', neighborhood: '신촌동', display_name: '신촌역', coordinates: [126.9368, 37.5598], is_popular: true, nightlife_density: 'high' },
  { id: 1205, city: '서울', district: '서대문구', neighborhood: '이대동', display_name: '이대역', coordinates: [126.9463, 37.5569], is_popular: true, nightlife_density: 'medium' },

  // 서울 - 건대·성수·왕십리
  { id: 1301, city: '서울', district: '광진구', neighborhood: '화양동', display_name: '건대입구역', coordinates: [127.0706, 37.5404], is_popular: true, nightlife_density: 'high' },
  { id: 1302, city: '서울', district: '성동구', neighborhood: '성수동', display_name: '성수역', coordinates: [127.0558, 37.5445], is_popular: true, nightlife_density: 'medium' },
  { id: 1303, city: '서울', district: '성동구', neighborhood: '왕십리동', display_name: '왕십리역', coordinates: [127.0379, 37.5614], is_popular: true, nightlife_density: 'medium' },

  // 서울 - 종로·중구
  { id: 1401, city: '서울', district: '종로구', neighborhood: '종로1가', display_name: '종각역', coordinates: [126.9830, 37.5704], is_popular: true, nightlife_density: 'medium' },
  { id: 1402, city: '서울', district: '중구', neighborhood: '명동', display_name: '명동역', coordinates: [126.9866, 37.5609], is_popular: true, nightlife_density: 'medium' },
  { id: 1403, city: '서울', district: '중구', neighborhood: '을지로', display_name: '을지로입구역', coordinates: [126.9826, 37.5660], is_popular: true, nightlife_density: 'medium' },

  // 서울 - 잠실·송파·강동
  { id: 1501, city: '서울', district: '송파구', neighborhood: '잠실동', display_name: '잠실역', coordinates: [127.1001, 37.5132], is_popular: true, nightlife_density: 'medium' },
  { id: 1502, city: '서울', district: '송파구', neighborhood: '문정동', display_name: '문정역', coordinates: [127.1219, 37.4859], is_popular: false, nightlife_density: 'low' },
  { id: 1503, city: '서울', district: '강동구', neighborhood: '천호동', display_name: '천호역', coordinates: [127.1239, 37.5387], is_popular: false, nightlife_density: 'low' },

  // 서울 - 영등포·여의도·강서
  { id: 1601, city: '서울', district: '영등포구', neighborhood: '영등포동', display_name: '영등포역', coordinates: [126.9075, 37.5156], is_popular: true, nightlife_density: 'medium' },
  { id: 1602, city: '서울', district: '영등포구', neighborhood: '여의도동', display_name: '여의도역', coordinates: [126.9243, 37.5219], is_popular: false, nightlife_density: 'low' },

  // 서울 - 구로·관악·동작
  { id: 1701, city: '서울', district: '구로구', neighborhood: '구로동', display_name: '구로디지털단지역', coordinates: [126.9015, 37.4854], is_popular: true, nightlife_density: 'medium' },
  { id: 1702, city: '서울', district: '관악구', neighborhood: '신림동', display_name: '신림역', coordinates: [126.9294, 37.4843], is_popular: true, nightlife_density: 'medium' },
  { id: 1703, city: '서울', district: '동작구', neighborhood: '노량진동', display_name: '노량진역', coordinates: [126.9422, 37.5131], is_popular: false, nightlife_density: 'low' },

  // 서울 - 대학로·성북·동대문
  { id: 1801, city: '서울', district: '종로구', neighborhood: '혜화동', display_name: '혜화역', coordinates: [127.0016, 37.5821], is_popular: true, nightlife_density: 'medium' },
  { id: 1802, city: '서울', district: '동대문구', neighborhood: '동대문', display_name: '동대문역', coordinates: [127.0089, 37.5714], is_popular: true, nightlife_density: 'high' },

  // 서울 - 노원·중랑·강북
  { id: 1901, city: '서울', district: '노원구', neighborhood: '노원동', display_name: '노원역', coordinates: [127.0613, 37.6551], is_popular: false, nightlife_density: 'low' },
  { id: 1902, city: '서울', district: '강북구', neighborhood: '수유동', display_name: '수유역', coordinates: [127.0254, 37.6377], is_popular: false, nightlife_density: 'low' },

  // 인천
  { id: 2001, city: '인천', district: '연수구', neighborhood: '송도동', display_name: '송도', coordinates: [126.6396, 37.3923], is_popular: false, nightlife_density: 'low' },
  { id: 2002, city: '인천', district: '부평구', neighborhood: '부평동', display_name: '부평역', coordinates: [126.7246, 37.4896], is_popular: true, nightlife_density: 'medium' },
  { id: 2003, city: '인천', district: '서구', neighborhood: '청라동', display_name: '청라', coordinates: [126.6344, 37.5340], is_popular: false, nightlife_density: 'low' },

  // 경기
  { id: 3001, city: '경기', district: '수원시', neighborhood: '팔달구', display_name: '수원역', coordinates: [127.0007, 37.2657], is_popular: true, nightlife_density: 'medium' },
  { id: 3002, city: '경기', district: '성남시', neighborhood: '분당구', display_name: '분당', coordinates: [127.1264, 37.3825], is_popular: false, nightlife_density: 'low' },
  { id: 3003, city: '경기', district: '성남시', neighborhood: '판교동', display_name: '판교역', coordinates: [127.1119, 37.3949], is_popular: false, nightlife_density: 'low' },
  { id: 3004, city: '경기', district: '고양시', neighborhood: '일산동구', display_name: '일산', coordinates: [126.7684, 37.6819], is_popular: false, nightlife_density: 'low' },
  { id: 3005, city: '경기', district: '부천시', neighborhood: '부천역', display_name: '부천역', coordinates: [126.7827, 37.4837], is_popular: true, nightlife_density: 'medium' },
  { id: 3006, city: '경기', district: '안산시', neighborhood: '안산역', display_name: '안산역', coordinates: [126.8530, 37.3270], is_popular: true, nightlife_density: 'medium' },

  // 부산
  { id: 4001, city: '부산', district: '해운대구', neighborhood: '해운대', display_name: '해운대', coordinates: [129.1580, 35.1587], is_popular: true, nightlife_density: 'high' },
  { id: 4002, city: '부산', district: '부산진구', neighborhood: '서면', display_name: '서면역', coordinates: [129.0597, 35.1578], is_popular: true, nightlife_density: 'high' },
  { id: 4003, city: '부산', district: '중구', neighborhood: '남포동', display_name: '남포동', coordinates: [129.0301, 35.0979], is_popular: true, nightlife_density: 'medium' },
];

// 지역 그룹 데이터 (area_groups_rows.json 기반 + 좌표 추가)
export const AREA_GROUPS_WITH_COORDINATES: Record<string, LocationGroup[]> = {
  서울: [
    {
      group_id: 1,
      name: '강남·서초',
      keywords: ['서울 강남구', '서울 서초구'],
      center_coordinates: [127.0336, 37.4979],
      is_nightlife_zone: true
    },
    {
      group_id: 2,
      name: '잠실·송파·강동',
      keywords: ['서울 송파구', '서울 강동구', '잠실'],
      center_coordinates: [127.1054, 37.5145],
      is_nightlife_zone: false
    },
    {
      group_id: 3,
      name: '종로·중구',
      keywords: ['서울 종로구', '서울 중구'],
      center_coordinates: [126.9896, 37.5729],
      is_nightlife_zone: true
    },
    {
      group_id: 4,
      name: '용산·이태원·한남',
      keywords: ['서울 용산구', '이태원', '한남동'],
      center_coordinates: [126.9900, 37.5311],
      is_nightlife_zone: true
    },
    {
      group_id: 5,
      name: '홍대·합정·마포·서대문',
      keywords: ['서울 마포구', '서울 서대문구', '홍대', '합정'],
      center_coordinates: [126.9296, 37.5533],
      is_nightlife_zone: true
    },
    {
      group_id: 6,
      name: '영등포·여의도·강서',
      keywords: ['서울 영등포구', '서울 강서구', '여의도'],
      center_coordinates: [126.8963, 37.5263],
      is_nightlife_zone: false
    },
    {
      group_id: 7,
      name: '구로·관악·동작',
      keywords: ['서울 구로구', '서울 관악구', '서울 동작구'],
      center_coordinates: [126.9397, 37.4954],
      is_nightlife_zone: false
    },
    {
      group_id: 8,
      name: '건대·성수·왕십리',
      keywords: ['서울 성동구', '서울 광진구', '성수', '건대', '왕십리'],
      center_coordinates: [127.0568, 37.5475],
      is_nightlife_zone: true
    },
    {
      group_id: 9,
      name: '대학로·성북·동대문',
      keywords: ['서울 성북구', '서울 동대문구'],
      center_coordinates: [127.0078, 37.5894],
      is_nightlife_zone: true
    },
    {
      group_id: 10,
      name: '노원·중랑·강북',
      keywords: ['서울 노원구', '서울 중랑구', '서울 강북구', '서울 도봉구'],
      center_coordinates: [127.0561, 37.6397],
      is_nightlife_zone: false
    },
  ],
  인천: [
    {
      group_id: 11,
      name: '송도·연수·남동',
      keywords: ['인천 연수구', '인천 남동구', '송도'],
      center_coordinates: [126.6783, 37.4041],
      is_nightlife_zone: false
    },
    {
      group_id: 12,
      name: '부평·계양',
      keywords: ['인천 부평구', '인천 계양구'],
      center_coordinates: [126.7219, 37.5074],
      is_nightlife_zone: true
    },
  ],
  경기: [
    {
      group_id: 15,
      name: '수원·화성·오산',
      keywords: ['경기 수원시', '경기 화성시', '경기 오산시', '경기 평택시', '경기 안성시'],
      center_coordinates: [127.0286, 37.2636],
      is_nightlife_zone: false
    },
    {
      group_id: 16,
      name: '성남·용인',
      keywords: ['경기 성남시', '경기 용인시'],
      center_coordinates: [127.1388, 37.4201],
      is_nightlife_zone: false
    },
  ],
};

// PostGIS 쿼리를 위한 SQL 생성 함수
export function generateLocationInsertSQL(): string {
  return LOCATION_COORDINATES.map(loc =>
    `INSERT INTO job_locations (id, city, district, neighborhood, display_name, location_geom, is_popular)
     VALUES (${loc.id}, '${loc.city}', '${loc.district}', ${loc.neighborhood ? `'${loc.neighborhood}'` : 'NULL'},
             '${loc.display_name}', ST_MakePoint(${loc.coordinates[0]}, ${loc.coordinates[1]})::geography,
             ${loc.is_popular});`
  ).join('\n');
}

// 근거리 검색을 위한 헬퍼 함수
export function calculateDistance(point1: [number, number], point2: [number, number]): number {
  const R = 6371; // 지구 반경 (km)
  const dLat = toRad(point2[1] - point1[1]);
  const dLon = toRad(point2[0] - point1[0]);
  const lat1 = toRad(point1[1]);
  const lat2 = toRad(point2[1]);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(value: number): number {
  return value * Math.PI / 180;
}

// 밤알바 밀집 지역 필터링
export function getNightlifeHotspots(): LocationWithCoordinates[] {
  return LOCATION_COORDINATES.filter(loc =>
    loc.nightlife_density === 'high' || loc.nightlife_density === 'medium'
  );
}

// 인기 지역 필터링
export function getPopularLocations(): LocationWithCoordinates[] {
  return LOCATION_COORDINATES.filter(loc => loc.is_popular);
}