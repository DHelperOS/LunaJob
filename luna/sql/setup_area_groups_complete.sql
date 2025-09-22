-- Complete setup script for area_groups table
-- Execute this in Supabase SQL Editor

-- Enable PostGIS extension if not already enabled
CREATE EXTENSION IF NOT EXISTS postgis;

-- Step 1: Drop old location tables if they exist
DROP TABLE IF EXISTS job_locations CASCADE;
DROP TABLE IF EXISTS locations CASCADE;

-- Step 2: Create area_category enum type if not exists
DO $$ BEGIN
    CREATE TYPE area_category AS ENUM (
        'gangnam',      -- 강남권
        'gangbuk',      -- 강북권
        'gangseo',      -- 강서권
        'gangdong',     -- 강동권
        'gyeonggi',     -- 경기권
        'incheon',      -- 인천권
        'busan',        -- 부산권
        'daegu',        -- 대구권
        'gwangju',      -- 광주권
        'other'         -- 기타권
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Step 3: Create area_groups table
CREATE TABLE IF NOT EXISTS area_groups (
    id SERIAL PRIMARY KEY,
    group_id INTEGER UNIQUE NOT NULL,
    category_id INTEGER NOT NULL,
    category area_category NOT NULL,
    name VARCHAR(100) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    center_point GEOGRAPHY(POINT, 4326),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_area_groups_group_id ON area_groups(group_id);
CREATE INDEX IF NOT EXISTS idx_area_groups_category_id ON area_groups(category_id);
CREATE INDEX IF NOT EXISTS idx_area_groups_category ON area_groups(category);
CREATE INDEX IF NOT EXISTS idx_area_groups_center_point ON area_groups USING GIST(center_point);

-- Step 4: Insert all area group data with geographic center points
INSERT INTO area_groups (group_id, category_id, category, name, short_name, center_point)
VALUES
-- 강남권 (category_id: 1)
(1, 1, 'gangnam', '강남·서초', '강남', ST_GeogFromText('POINT(127.0495 37.5172)')),
(2, 1, 'gangnam', '강남역·역삼·삼성', '강남역', ST_GeogFromText('POINT(127.0276 37.4979)')),
(3, 1, 'gangnam', '신사·논현·압구정', '신사', ST_GeogFromText('POINT(127.0232 37.5164)')),
(4, 1, 'gangnam', '청담·삼성', '청담', ST_GeogFromText('POINT(127.0471 37.5194)')),
(5, 1, 'gangnam', '선릉·대치·도곡', '선릉', ST_GeogFromText('POINT(127.0507 37.5045)')),

-- 강북권 (category_id: 2)
(6, 2, 'gangbuk', '강북·성북·노원·도봉', '강북', ST_GeogFromText('POINT(127.0257 37.6397)')),
(7, 2, 'gangbuk', '수유·미아', '수유', ST_GeogFromText('POINT(127.0252 37.6377)')),
(8, 2, 'gangbuk', '동대문·성동', '동대문', ST_GeogFromText('POINT(127.0410 37.5746)')),
(9, 2, 'gangbuk', '종로·중구', '종로', ST_GeogFromText('POINT(126.9779 37.5735)')),
(10, 2, 'gangbuk', '을지로·명동·충무로', '명동', ST_GeogFromText('POINT(126.9825 37.5636)')),
(11, 2, 'gangbuk', '서대문·마포·은평', '서대문', ST_GeogFromText('POINT(126.9368 37.5791)')),
(12, 2, 'gangbuk', '연신내·불광', '연신내', ST_GeogFromText('POINT(126.9207 37.6197)')),

-- 강서권 (category_id: 3)
(13, 3, 'gangseo', '영등포·여의도', '영등포', ST_GeogFromText('POINT(126.9052 37.5172)')),
(14, 3, 'gangseo', '구로·금천·광명', '구로', ST_GeogFromText('POINT(126.8878 37.4954)')),
(15, 3, 'gangseo', '강서·양천·김포공항', '강서', ST_GeogFromText('POINT(126.8497 37.5509)')),
(16, 3, 'gangseo', '신촌·홍대·합정', '홍대', ST_GeogFromText('POINT(126.9239 37.5553)')),
(17, 3, 'gangseo', '마포·공덕·용산', '마포', ST_GeogFromText('POINT(126.9015 37.5662)')),
(18, 3, 'gangseo', '관악·동작·사당', '관악', ST_GeogFromText('POINT(126.9515 37.4785)')),
(19, 3, 'gangseo', '이태원·한남동', '이태원', ST_GeogFromText('POINT(126.9949 37.5347)')),

-- 강동권 (category_id: 4)
(20, 4, 'gangdong', '잠실·송파·강동', '잠실', ST_GeogFromText('POINT(127.0861 37.5133)')),
(21, 4, 'gangdong', '천호·강동·둔촌', '천호', ST_GeogFromText('POINT(127.1238 37.5387)')),
(22, 4, 'gangdong', '건대·광진·구의', '건대', ST_GeogFromText('POINT(127.0709 37.5405)')),
(23, 4, 'gangdong', '왕십리·성수', '왕십리', ST_GeogFromText('POINT(127.0369 37.5613)')),

-- 경기권 (category_id: 5)
(24, 5, 'gyeonggi', '수원·화성·오산', '수원', ST_GeogFromText('POINT(127.0286 37.2635)')),
(25, 5, 'gyeonggi', '성남·분당·판교', '분당', ST_GeogFromText('POINT(127.1263 37.3825)')),
(26, 5, 'gyeonggi', '용인·수지·기흥', '용인', ST_GeogFromText('POINT(127.1775 37.2410)')),
(27, 5, 'gyeonggi', '안양·과천·의왕·군포', '안양', ST_GeogFromText('POINT(126.9568 37.3943)')),
(28, 5, 'gyeonggi', '안산·시흥', '안산', ST_GeogFromText('POINT(126.8308 37.3218)')),
(29, 5, 'gyeonggi', '부천', '부천', ST_GeogFromText('POINT(126.7662 37.5034)')),
(30, 5, 'gyeonggi', '일산·파주', '일산', ST_GeogFromText('POINT(126.7685 37.6585)')),
(31, 5, 'gyeonggi', '김포·고양', '김포', ST_GeogFromText('POINT(126.7155 37.6153)')),
(32, 5, 'gyeonggi', '의정부·양주·동두천', '의정부', ST_GeogFromText('POINT(127.0338 37.7380)')),
(33, 5, 'gyeonggi', '구리·남양주·하남', '구리', ST_GeogFromText('POINT(127.1296 37.5943)')),
(34, 5, 'gyeonggi', '평택·안성', '평택', ST_GeogFromText('POINT(127.1123 36.9923)')),

-- 인천권 (category_id: 6)
(35, 6, 'incheon', '인천 중구·동구·미추홀구', '인천중구', ST_GeogFromText('POINT(126.6219 37.4737)')),
(36, 6, 'incheon', '인천 남동구·연수구', '남동구', ST_GeogFromText('POINT(126.6504 37.4470)')),
(37, 6, 'incheon', '인천 부평·계양', '부평', ST_GeogFromText('POINT(126.7219 37.5074)')),
(38, 6, 'incheon', '인천 서구·강화·옹진', '인천서구', ST_GeogFromText('POINT(126.6757 37.5455)')),

-- 부산권 (category_id: 7)
(39, 7, 'busan', '부산 중구·서구·동구', '부산중구', ST_GeogFromText('POINT(129.0324 35.1028)')),
(40, 7, 'busan', '부산 부산진·동래·연제', '부산진', ST_GeogFromText('POINT(129.0529 35.1630)')),
(41, 7, 'busan', '부산 해운대·수영·기장', '해운대', ST_GeogFromText('POINT(129.1637 35.1631)')),
(42, 7, 'busan', '부산 사상·북구·강서', '사상', ST_GeogFromText('POINT(128.9905 35.1527)')),
(43, 7, 'busan', '부산 남구·사하', '부산남구', ST_GeogFromText('POINT(129.0835 35.1365)')),
(44, 7, 'busan', '부산 금정·영도', '금정', ST_GeogFromText('POINT(129.0923 35.2429)')),

-- 대구권 (category_id: 8)
(45, 8, 'daegu', '대구 중구·남구', '대구중구', ST_GeogFromText('POINT(128.5950 35.8691)')),
(46, 8, 'daegu', '대구 동구·서구', '대구동구', ST_GeogFromText('POINT(128.6356 35.8866)')),
(47, 8, 'daegu', '대구 북구·칠곡', '대구북구', ST_GeogFromText('POINT(128.5828 35.8858)')),
(48, 8, 'daegu', '대구 수성·달서', '수성', ST_GeogFromText('POINT(128.6303 35.8583)')),
(49, 8, 'daegu', '대구 달성·경산', '달성', ST_GeogFromText('POINT(128.5886 35.7745)')),

-- 광주권 (category_id: 9)
(50, 9, 'gwangju', '광주 동구·서구', '광주동구', ST_GeogFromText('POINT(126.9230 35.1459)')),
(51, 9, 'gwangju', '광주 남구·북구', '광주남구', ST_GeogFromText('POINT(126.9175 35.1329)')),
(52, 9, 'gwangju', '광주 광산구', '광산', ST_GeogFromText('POINT(126.7934 35.1395)')),

-- 기타권 (category_id: 10)
(53, 10, 'other', '대전', '대전', ST_GeogFromText('POINT(127.3845 36.3504)')),
(54, 10, 'other', '울산', '울산', ST_GeogFromText('POINT(129.3114 35.5384)')),
(55, 10, 'other', '세종', '세종', ST_GeogFromText('POINT(127.2892 36.4801)')),
(56, 10, 'other', '춘천·강원', '춘천', ST_GeogFromText('POINT(127.7300 37.8813)')),
(57, 10, 'other', '청주·충북', '청주', ST_GeogFromText('POINT(127.4897 36.6424)')),
(58, 10, 'other', '천안·충남', '천안', ST_GeogFromText('POINT(127.1522 36.8151)'))
ON CONFLICT (group_id) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    category = EXCLUDED.category,
    name = EXCLUDED.name,
    short_name = EXCLUDED.short_name,
    center_point = EXCLUDED.center_point,
    updated_at = NOW();

-- Step 5: Enable Row Level Security
ALTER TABLE area_groups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read area groups
CREATE POLICY "Allow all users to read area groups" ON area_groups
    FOR SELECT
    TO public
    USING (true);

-- Step 6: Verify the setup
SELECT
    category,
    COUNT(*) as count,
    STRING_AGG(name, ', ' ORDER BY group_id) as groups
FROM area_groups
GROUP BY category
ORDER BY
    CASE category
        WHEN 'gangnam' THEN 1
        WHEN 'gangbuk' THEN 2
        WHEN 'gangseo' THEN 3
        WHEN 'gangdong' THEN 4
        WHEN 'gyeonggi' THEN 5
        WHEN 'incheon' THEN 6
        WHEN 'busan' THEN 7
        WHEN 'daegu' THEN 8
        WHEN 'gwangju' THEN 9
        WHEN 'other' THEN 10
    END;

-- Show total count
SELECT COUNT(*) as total_area_groups FROM area_groups;