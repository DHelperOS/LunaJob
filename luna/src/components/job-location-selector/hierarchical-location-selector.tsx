'use client';

import { useState, useMemo } from 'react';
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
  Tabs,
  Tab,
} from '@mui/material';
import { AREA_GROUPS, AREA_CATEGORIES, NIGHT_JOB_RECOMMENDED_AREAS } from './location-data';

interface HierarchicalLocationSelectorProps {
  value?: string[];
  onChange?: (locations: string[]) => void;
  multiple?: boolean;
}

export default function HierarchicalLocationSelector({
  value = [],
  onChange,
  multiple = true,
}: HierarchicalLocationSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('서울');
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(value);
  const [searchQuery, setSearchQuery] = useState('');

  // 카테고리 변경 핸들러
  const handleCategoryChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  // 그룹 선택 핸들러
  const handleGroupToggle = (groupId: number) => {
    const group = AREA_GROUPS[selectedCategory as keyof typeof AREA_GROUPS]?.find(
      (g) => g.group_id === groupId
    );

    if (!group) return;

    let newKeywords: string[];
    const groupKeywords = group.keywords;
    const hasAllKeywords = groupKeywords.every((kw) => selectedKeywords.includes(kw));

    if (hasAllKeywords) {
      // 그룹의 모든 키워드 제거
      newKeywords = selectedKeywords.filter((kw) => !groupKeywords.includes(kw));
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      // 그룹의 모든 키워드 추가
      if (multiple) {
        newKeywords = [...new Set([...selectedKeywords, ...groupKeywords])];
        setSelectedGroups([...selectedGroups, groupId]);
      } else {
        newKeywords = groupKeywords;
        setSelectedGroups([groupId]);
      }
    }

    setSelectedKeywords(newKeywords);
    onChange?.(newKeywords);
  };

  // 개별 키워드 선택 핸들러
  const handleKeywordToggle = (keyword: string) => {
    let newKeywords: string[];
    if (selectedKeywords.includes(keyword)) {
      newKeywords = selectedKeywords.filter((kw) => kw !== keyword);
    } else {
      if (multiple) {
        newKeywords = [...selectedKeywords, keyword];
      } else {
        newKeywords = [keyword];
      }
    }
    setSelectedKeywords(newKeywords);
    onChange?.(newKeywords);
    updateSelectedGroups(newKeywords);
  };

  // 선택된 키워드 기반으로 그룹 선택 상태 업데이트
  const updateSelectedGroups = (keywords: string[]) => {
    const groups: number[] = [];
    Object.values(AREA_GROUPS).forEach((categoryGroups) => {
      categoryGroups.forEach((group) => {
        if (group.keywords.every((kw) => keywords.includes(kw))) {
          groups.push(group.group_id);
        }
      });
    });
    setSelectedGroups(groups);
  };

  // 검색 필터링
  const filteredGroups = useMemo(() => {
    const groups = AREA_GROUPS[selectedCategory as keyof typeof AREA_GROUPS] || [];
    if (!searchQuery) return groups;

    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [selectedCategory, searchQuery]);

  // 추천 지역 선택
  const handleRecommendedArea = (type: string) => {
    const recommended = NIGHT_JOB_RECOMMENDED_AREAS[type as keyof typeof NIGHT_JOB_RECOMMENDED_AREAS];
    if (!recommended) return;

    const keywords: string[] = [];
    recommended.areas.forEach((groupId) => {
      Object.values(AREA_GROUPS).forEach((categoryGroups) => {
        const group = categoryGroups.find((g) => g.group_id === groupId);
        if (group) {
          keywords.push(...group.keywords);
        }
      });
    });

    if (multiple) {
      const newKeywords = [...new Set([...selectedKeywords, ...keywords])];
      setSelectedKeywords(newKeywords);
      onChange?.(newKeywords);
    } else {
      setSelectedKeywords(keywords);
      onChange?.(keywords);
    }
    updateSelectedGroups(keywords);
  };

  // 그룹 선택 상태 확인
  const isGroupSelected = (groupId: number) => {
    const group = AREA_GROUPS[selectedCategory as keyof typeof AREA_GROUPS]?.find(
      (g) => g.group_id === groupId
    );
    if (!group) return false;
    return group.keywords.every((kw) => selectedKeywords.includes(kw));
  };

  // 그룹 부분 선택 상태 확인
  const isGroupPartiallySelected = (groupId: number) => {
    const group = AREA_GROUPS[selectedCategory as keyof typeof AREA_GROUPS]?.find(
      (g) => g.group_id === groupId
    );
    if (!group) return false;
    const hasAny = group.keywords.some((kw) => selectedKeywords.includes(kw));
    const hasAll = group.keywords.every((kw) => selectedKeywords.includes(kw));
    return hasAny && !hasAll;
  };

  return (
    <Box>
      {/* 밤알바 추천 지역 */}
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          💡 야간 구인구직 밀집 지역 (빠른 선택)
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.entries(NIGHT_JOB_RECOMMENDED_AREAS).map(([key, area]) => (
            <Chip
              key={key}
              label={`${area.icon} ${area.label}`}
              onClick={() => handleRecommendedArea(key)}
              color="primary"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </Paper>

      {/* 지역 카테고리 탭 */}
      <Tabs
        value={selectedCategory}
        onChange={handleCategoryChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        {Object.values(AREA_CATEGORIES).map((category) => (
          <Tab key={category} label={category} value={category} />
        ))}
      </Tabs>

      {/* 검색 */}
      <TextField
        placeholder="지역명 검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* 지역 그룹 선택 */}
      <Box sx={{ minHeight: 200 }}>
        <Stack spacing={2}>
          {filteredGroups.map((group) => (
            <Paper
              key={group.group_id}
              elevation={0}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: isGroupSelected(group.group_id)
                  ? 'primary.main'
                  : isGroupPartiallySelected(group.group_id)
                  ? 'primary.light'
                  : 'divider',
                bgcolor: isGroupSelected(group.group_id)
                  ? 'primary.lighter'
                  : 'background.paper',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover',
                },
              }}
              onClick={() => handleGroupToggle(group.group_id)}
            >
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                {group.name}
                {isGroupSelected(group.group_id) && (
                  <Chip label="전체 선택됨" size="small" color="primary" sx={{ ml: 1 }} />
                )}
                {isGroupPartiallySelected(group.group_id) && (
                  <Chip label="일부 선택됨" size="small" color="default" sx={{ ml: 1 }} />
                )}
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {group.keywords.map((keyword) => (
                  <Chip
                    key={keyword}
                    label={keyword}
                    size="small"
                    color={selectedKeywords.includes(keyword) ? 'primary' : 'default'}
                    variant={selectedKeywords.includes(keyword) ? 'filled' : 'outlined'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleKeywordToggle(keyword);
                    }}
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* 선택된 지역 표시 */}
      {selectedKeywords.length > 0 && (
        <Paper elevation={0} sx={{ mt: 3, p: 2, bgcolor: 'primary.lighter' }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            선택된 지역 ({selectedKeywords.length}개)
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {selectedKeywords.map((keyword) => (
              <Chip
                key={keyword}
                label={keyword}
                onDelete={() => handleKeywordToggle(keyword)}
                color="primary"
                size="small"
                sx={{ mb: 0.5 }}
              />
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}