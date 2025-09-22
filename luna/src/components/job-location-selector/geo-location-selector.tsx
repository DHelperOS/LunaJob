'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Slider,
  Stack,
  Chip,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  MyLocation as MyLocationIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  NightsStay as NightIcon,
} from '@mui/icons-material';
import {
  LOCATION_COORDINATES,
  AREA_GROUPS_WITH_COORDINATES,
  calculateDistance,
  getNightlifeHotspots,
  getPopularLocations,
  type LocationWithCoordinates,
} from './location-data-with-coordinates';

interface GeoLocationSelectorProps {
  value?: number[]; // location IDs
  onChange?: (locationIds: number[], locations: LocationWithCoordinates[]) => void;
  multiple?: boolean;
  defaultRadius?: number; // km
  enableNightlifeFilter?: boolean;
  enablePopularFilter?: boolean;
}

export default function GeoLocationSelector({
  value = [],
  onChange,
  multiple = true,
  defaultRadius = 3,
  enableNightlifeFilter = true,
  enablePopularFilter = true,
}: GeoLocationSelectorProps) {
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>(value);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchRadius, setSearchRadius] = useState(defaultRadius);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filterNightlife, setFilterNightlife] = useState(false);
  const [filterPopular, setFilterPopular] = useState(false);
  const [centerLocation, setCenterLocation] = useState<[number, number] | null>(null);

  // 사용자 위치 가져오기
  const getUserLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('브라우저가 위치 서비스를 지원하지 않습니다.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
        setUserLocation(coords);
        setCenterLocation(coords);
        setIsLoadingLocation(false);
      },
      (error) => {
        let errorMsg = '위치를 가져올 수 없습니다.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = '위치 권한이 거부되었습니다.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = '위치 정보를 사용할 수 없습니다.';
            break;
          case error.TIMEOUT:
            errorMsg = '위치 요청 시간이 초과되었습니다.';
            break;
        }
        setLocationError(errorMsg);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  // 필터링된 지역 목록
  const filteredLocations = useMemo(() => {
    let locations = [...LOCATION_COORDINATES];

    // 밤알바 필터
    if (filterNightlife) {
      locations = locations.filter(
        (loc) => loc.nightlife_density === 'high' || loc.nightlife_density === 'medium'
      );
    }

    // 인기 지역 필터
    if (filterPopular) {
      locations = locations.filter((loc) => loc.is_popular);
    }

    // 거리 기반 필터 (중심점이 있는 경우)
    if (centerLocation) {
      locations = locations
        .map((loc) => ({
          ...loc,
          distance: calculateDistance(centerLocation, loc.coordinates),
        }))
        .filter((loc) => loc.distance! <= searchRadius)
        .sort((a, b) => a.distance! - b.distance!);
    }

    return locations;
  }, [centerLocation, searchRadius, filterNightlife, filterPopular]);

  // 지역 선택 핸들러
  const handleLocationToggle = (location: LocationWithCoordinates) => {
    let newIds: number[];
    if (selectedLocationIds.includes(location.id)) {
      newIds = selectedLocationIds.filter((id) => id !== location.id);
    } else {
      if (multiple) {
        newIds = [...selectedLocationIds, location.id];
      } else {
        newIds = [location.id];
      }
    }

    setSelectedLocationIds(newIds);
    const selectedLocations = LOCATION_COORDINATES.filter((loc) => newIds.includes(loc.id));
    onChange?.(newIds, selectedLocations);
  };

  // 빠른 선택: 특정 지점 중심
  const setQuickCenter = (coords: [number, number], name: string) => {
    setCenterLocation(coords);
    // 선택적으로 해당 지역도 자동 선택
    const location = LOCATION_COORDINATES.find((loc) => loc.display_name === name);
    if (location && !selectedLocationIds.includes(location.id)) {
      handleLocationToggle(location);
    }
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    const allIds = filteredLocations.map((loc) => loc.id);
    setSelectedLocationIds(allIds);
    onChange?.(allIds, filteredLocations);
  };

  const handleClearAll = () => {
    setSelectedLocationIds([]);
    onChange?.([], []);
  };

  return (
    <Box>
      {/* 컨트롤 패널 */}
      <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
        <Stack spacing={2}>
          {/* 내 위치 & 빠른 선택 */}
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Button
              variant="contained"
              startIcon={isLoadingLocation ? <CircularProgress size={20} /> : <MyLocationIcon />}
              onClick={getUserLocation}
              disabled={isLoadingLocation}
              size="small"
            >
              내 위치 사용
            </Button>

            <Typography variant="body2" sx={{ mx: 1 }}>
              또는
            </Typography>

            {/* 주요 지역 빠른 선택 */}
            <Chip
              label="강남역"
              onClick={() => setQuickCenter([127.0276, 37.4980], '강남역')}
              color={centerLocation?.[0] === 127.0276 ? 'primary' : 'default'}
              size="small"
            />
            <Chip
              label="홍대"
              onClick={() => setQuickCenter([126.9232, 37.5569], '홍대입구역')}
              color={centerLocation?.[0] === 126.9232 ? 'primary' : 'default'}
              size="small"
            />
            <Chip
              label="이태원"
              onClick={() => setQuickCenter([126.9945, 37.5347], '이태원역')}
              color={centerLocation?.[0] === 126.9945 ? 'primary' : 'default'}
              size="small"
            />
            <Chip
              label="건대"
              onClick={() => setQuickCenter([127.0706, 37.5404], '건대입구역')}
              color={centerLocation?.[0] === 127.0706 ? 'primary' : 'default'}
              size="small"
            />
          </Stack>

          {/* 반경 설정 */}
          {centerLocation && (
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                검색 반경: {searchRadius}km
              </Typography>
              <Slider
                value={searchRadius}
                onChange={(_, value) => setSearchRadius(value as number)}
                min={1}
                max={10}
                step={0.5}
                marks={[
                  { value: 1, label: '1km' },
                  { value: 3, label: '3km' },
                  { value: 5, label: '5km' },
                  { value: 10, label: '10km' },
                ]}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}km`}
              />
            </Box>
          )}

          {/* 필터 옵션 */}
          <Stack direction="row" spacing={1}>
            {enableNightlifeFilter && (
              <Chip
                label="밤알바 밀집지역"
                icon={<NightIcon />}
                onClick={() => setFilterNightlife(!filterNightlife)}
                color={filterNightlife ? 'primary' : 'default'}
                variant={filterNightlife ? 'filled' : 'outlined'}
              />
            )}
            {enablePopularFilter && (
              <Chip
                label="인기 지역"
                icon={<LocationIcon />}
                onClick={() => setFilterPopular(!filterPopular)}
                color={filterPopular ? 'primary' : 'default'}
                variant={filterPopular ? 'filled' : 'outlined'}
              />
            )}
          </Stack>
        </Stack>

        {/* 에러 메시지 */}
        {locationError && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {locationError}
          </Alert>
        )}

        {/* 현재 중심점 정보 */}
        {centerLocation && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="caption">
              🎯 중심점: {userLocation && centerLocation === userLocation ? '내 위치' : '선택한 지역'}
              에서 {searchRadius}km 이내 {filteredLocations.length}개 지역
            </Typography>
          </Alert>
        )}
      </Paper>

      {/* 검색 결과 */}
      <Paper elevation={0} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {centerLocation ? '주변 지역' : '전체 지역'} ({filteredLocations.length}개)
          </Typography>
          <Stack direction="row" spacing={1}>
            {multiple && (
              <>
                <Button size="small" onClick={handleSelectAll}>
                  전체 선택
                </Button>
                <Button size="small" onClick={handleClearAll}>
                  전체 해제
                </Button>
              </>
            )}
          </Stack>
        </Stack>

        {/* 지역 목록 */}
        <Stack spacing={1} sx={{ maxHeight: 400, overflow: 'auto' }}>
          {filteredLocations.map((location) => {
            const isSelected = selectedLocationIds.includes(location.id);
            const distance = centerLocation
              ? calculateDistance(centerLocation, location.coordinates)
              : null;

            return (
              <Paper
                key={location.id}
                elevation={0}
                onClick={() => handleLocationToggle(location)}
                sx={{
                  p: 1.5,
                  border: '1px solid',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  bgcolor: isSelected ? 'primary.lighter' : 'background.paper',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" fontWeight={isSelected ? 600 : 400}>
                      {location.display_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {location.city} {location.district} {location.neighborhood}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* 거리 표시 */}
                    {distance !== null && (
                      <Chip label={`${distance.toFixed(1)}km`} size="small" variant="outlined" />
                    )}

                    {/* 밤알바 밀집도 */}
                    {location.nightlife_density && (
                      <Tooltip title="밤알바 밀집도">
                        <Chip
                          size="small"
                          icon={<NightIcon />}
                          label={
                            location.nightlife_density === 'high'
                              ? 'HOT'
                              : location.nightlife_density === 'medium'
                              ? '보통'
                              : '적음'
                          }
                          color={
                            location.nightlife_density === 'high'
                              ? 'error'
                              : location.nightlife_density === 'medium'
                              ? 'warning'
                              : 'default'
                          }
                          variant="outlined"
                        />
                      </Tooltip>
                    )}

                    {/* 인기 지역 뱃지 */}
                    {location.is_popular && (
                      <Tooltip title="인기 지역">
                        <LocationIcon color="primary" fontSize="small" />
                      </Tooltip>
                    )}
                  </Stack>
                </Stack>
              </Paper>
            );
          })}

          {filteredLocations.length === 0 && (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
              조건에 맞는 지역이 없습니다.
              {centerLocation && ' 검색 반경을 늘려보세요.'}
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* 선택된 지역 요약 */}
      {selectedLocationIds.length > 0 && (
        <Paper elevation={0} sx={{ p: 2, mt: 2, bgcolor: 'primary.lighter' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            선택된 지역 ({selectedLocationIds.length}개)
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {selectedLocationIds.map((id) => {
              const location = LOCATION_COORDINATES.find((loc) => loc.id === id);
              if (!location) return null;
              return (
                <Chip
                  key={id}
                  label={location.display_name}
                  onDelete={() => handleLocationToggle(location)}
                  color="primary"
                  size="small"
                  sx={{ mb: 0.5 }}
                />
              );
            })}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}