'use client';

import { useState } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  Paper,
  Collapse,
  Alert,
} from '@mui/material';

// 지역 특성별 그룹 (밤/성인 알바 밀집 지역)
const AREA_CHARACTERISTIC_GROUPS = {
  entertainment_district: {
    label: '유흥가/번화가',
    icon: '🌃',
    description: '밤 문화가 활성화된 번화가 지역',
    areas: [
      { name: '강남역', district: '강남구', jobDensity: 'high' },
      { name: '이태원', district: '용산구', jobDensity: 'high' },
      { name: '홍대', district: '마포구', jobDensity: 'high' },
      { name: '신논현', district: '강남구', jobDensity: 'high' },
      { name: '역삼', district: '강남구', jobDensity: 'medium' },
      { name: '선릉', district: '강남구', jobDensity: 'medium' },
      { name: '건대입구', district: '광진구', jobDensity: 'medium' },
      { name: '신촌', district: '서대문구', jobDensity: 'medium' },
    ],
  },
  office_district: {
    label: '오피스 밀집',
    icon: '🏢',
    description: '오피스텔, 사무실 밀집 지역',
    areas: [
      { name: '강남', district: '강남구', jobDensity: 'high' },
      { name: '서초', district: '서초구', jobDensity: 'high' },
      { name: '역삼동', district: '강남구', jobDensity: 'high' },
      { name: '논현동', district: '강남구', jobDensity: 'medium' },
      { name: '삼성동', district: '강남구', jobDensity: 'medium' },
      { name: '여의도', district: '영등포구', jobDensity: 'medium' },
      { name: '을지로', district: '중구', jobDensity: 'medium' },
    ],
  },
  university_area: {
    label: '대학가',
    icon: '🎓',
    description: '대학가 주변 상권',
    areas: [
      { name: '신촌', district: '서대문구', jobDensity: 'high' },
      { name: '홍대', district: '마포구', jobDensity: 'high' },
      { name: '건대', district: '광진구', jobDensity: 'medium' },
      { name: '회기', district: '동대문구', jobDensity: 'low' },
      { name: '성신여대', district: '성북구', jobDensity: 'low' },
      { name: '수유', district: '강북구', jobDensity: 'low' },
    ],
  },
  residential_dense: {
    label: '주거 밀집',
    icon: '🏘️',
    description: '아파트, 주택 밀집 지역',
    areas: [
      { name: '노원', district: '노원구', jobDensity: 'medium' },
      { name: '분당', district: '성남시', jobDensity: 'medium' },
      { name: '일산', district: '고양시', jobDensity: 'medium' },
      { name: '송파', district: '송파구', jobDensity: 'low' },
      { name: '강동', district: '강동구', jobDensity: 'low' },
      { name: '은평', district: '은평구', jobDensity: 'low' },
    ],
  },
  all_night_commerce: {
    label: '24시간 상권',
    icon: '🌙',
    description: '심야 영업이 활발한 지역',
    areas: [
      { name: '동대문', district: '동대문구', jobDensity: 'high' },
      { name: '남대문', district: '중구', jobDensity: 'medium' },
      { name: '종로', district: '종로구', jobDensity: 'medium' },
      { name: '명동', district: '중구', jobDensity: 'medium' },
      { name: '노량진', district: '동작구', jobDensity: 'medium' },
      { name: '영등포', district: '영등포구', jobDensity: 'medium' },
    ],
  },
  transport_hub: {
    label: '교통 요충지',
    icon: '🚇',
    description: '터미널, 대형역 주변',
    areas: [
      { name: '서울역', district: '용산구', jobDensity: 'medium' },
      { name: '용산역', district: '용산구', jobDensity: 'medium' },
      { name: '강남터미널', district: '서초구', jobDensity: 'high' },
      { name: '동서울터미널', district: '광진구', jobDensity: 'medium' },
      { name: '남부터미널', district: '서초구', jobDensity: 'low' },
      { name: '수서역', district: '강남구', jobDensity: 'low' },
    ],
  },
};

// 모든 지역 리스트 (추가 검색용)
const ALL_LOCATIONS = [
  // 서울 주요 지역
  { label: '강남역', group: '강남구' },
  { label: '신논현역', group: '강남구' },
  { label: '역삼역', group: '강남구' },
  { label: '선릉역', group: '강남구' },
  { label: '삼성역', group: '강남구' },
  { label: '청담동', group: '강남구' },
  { label: '논현동', group: '강남구' },
  { label: '서초역', group: '서초구' },
  { label: '방배역', group: '서초구' },
  { label: '이태원', group: '용산구' },
  { label: '홍대입구', group: '마포구' },
  { label: '합정', group: '마포구' },
  { label: '상수', group: '마포구' },
  { label: '건대입구', group: '광진구' },
  { label: '성수', group: '성동구' },
  { label: '신촌', group: '서대문구' },
  { label: '종로', group: '종로구' },
  { label: '명동', group: '중구' },
  { label: '을지로', group: '중구' },
  { label: '동대문', group: '동대문구' },
  { label: '왕십리', group: '동대문구' },
  { label: '신림', group: '관악구' },
  { label: '노원', group: '노원구' },
  { label: '잠실', group: '송파구' },
  { label: '송파', group: '송파구' },
  { label: '영등포', group: '영등포구' },
  { label: '여의도', group: '영등포구' },
];

interface NightJobLocationSelectorProps {
  value?: string[];
  onChange?: (locations: string[]) => void;
  multiple?: boolean;
}

export default function NightJobLocationSelector({
  value = [],
  onChange,
  multiple = true,
}: NightJobLocationSelectorProps) {
  const [selectedAreaType, setSelectedAreaType] = useState<string | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(value);
  const [showAllLocations, setShowAllLocations] = useState(false);

  const handleAreaTypeChange = (_: React.MouseEvent<HTMLElement>, newAreaType: string | null) => {
    setSelectedAreaType(newAreaType);
    setShowAllLocations(false);
  };

  const handleLocationToggle = (location: string) => {
    let newLocations: string[];
    if (multiple) {
      if (selectedLocations.includes(location)) {
        newLocations = selectedLocations.filter((l) => l !== location);
      } else {
        newLocations = [...selectedLocations, location];
      }
    } else {
      newLocations = [location];
    }
    setSelectedLocations(newLocations);
    onChange?.(newLocations);
  };

  const handleAdditionalLocation = (_: any, newValue: any) => {
    if (!newValue) return;

    const location = typeof newValue === 'string' ? newValue : newValue.label;
    if (multiple) {
      const newLocations = [...selectedLocations, location];
      setSelectedLocations(newLocations);
      onChange?.(newLocations);
    } else {
      setSelectedLocations([location]);
      onChange?.([location]);
    }
  };

  const recommendedAreas = selectedAreaType
    ? AREA_CHARACTERISTIC_GROUPS[selectedAreaType as keyof typeof AREA_CHARACTERISTIC_GROUPS]?.areas || []
    : [];

  return (
    <Box>
      {/* Step 1: 지역 특성 선택 */}
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        1. 선호하는 지역 특성을 선택하세요
      </Typography>
      <ToggleButtonGroup
        value={selectedAreaType}
        exclusive
        onChange={handleAreaTypeChange}
        aria-label="area type"
        sx={{ flexWrap: 'wrap', gap: 1 }}
      >
        {Object.entries(AREA_CHARACTERISTIC_GROUPS).map(([key, group]) => (
          <ToggleButton
            key={key}
            value={key}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              border: '1px solid',
              borderColor: 'divider',
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">{group.icon}</Typography>
              <Typography variant="body2">{group.label}</Typography>
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Step 2: 추천 지역 */}
      <Collapse in={!!selectedAreaType}>
        <Paper elevation={0} sx={{ mt: 3, p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            2. 추천 근무 지역
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {recommendedAreas.map((area) => (
              <Chip
                key={area.name}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body2">{area.name}</Typography>
                    {area.jobDensity === 'high' && (
                      <Typography variant="caption" sx={{ color: 'error.main' }}>
                        HOT
                      </Typography>
                    )}
                  </Box>
                }
                onClick={() => handleLocationToggle(area.name)}
                color={selectedLocations.includes(area.name) ? 'primary' : 'default'}
                variant={selectedLocations.includes(area.name) ? 'filled' : 'outlined'}
                sx={{
                  mb: 1,
                  '&:hover': {
                    backgroundColor: selectedLocations.includes(area.name)
                      ? 'primary.dark'
                      : 'action.hover',
                  },
                }}
              />
            ))}
          </Stack>

          {/* 선택된 지역 특성에 대한 설명 */}
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="caption">
              💡 {selectedAreaType && AREA_CHARACTERISTIC_GROUPS[selectedAreaType as keyof typeof AREA_CHARACTERISTIC_GROUPS]?.description}
            </Typography>
          </Alert>
        </Paper>
      </Collapse>

      {/* Step 3: 추가 지역 검색 */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          3. 다른 지역 추가 (선택사항)
        </Typography>
        <Autocomplete
          options={ALL_LOCATIONS}
          groupBy={(option) => option.group}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="지역명을 입력하세요 (예: 강남, 홍대)"
              variant="outlined"
              size="small"
            />
          )}
          onChange={handleAdditionalLocation}
          sx={{ maxWidth: 400 }}
        />
      </Box>

      {/* 선택된 지역 표시 */}
      {selectedLocations.length > 0 && (
        <Paper elevation={0} sx={{ mt: 3, p: 2, bgcolor: 'primary.lighter' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            선택된 지역 ({selectedLocations.length}개)
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {selectedLocations.map((location) => (
              <Chip
                key={location}
                label={location}
                onDelete={() => handleLocationToggle(location)}
                color="primary"
                size="small"
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}