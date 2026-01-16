'use client';

import { useState } from 'react';
import { Box, Stack, Paper } from '@mui/material';
import { m } from 'framer-motion';
import { Tabs, Tab } from 'src/components/tabs';

// ----------------------------------------------------------------------

export interface CategoryTabsProps {
  categories?: Array<{ label: string; value: string }>;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const defaultCategories = [
  { label: '전체', value: 'all' },
  { label: '프라이빗 라운지', value: 'room_salon' },
  { label: '레스토랑', value: 'bar' },
  { label: '테라피', value: 'massage' },
  { label: '뮤직 카페', value: 'karaoke' },
  { label: '카페', value: 'cafe' },
  { label: '엔터테인먼트 홀', value: 'club' },
  { label: '전문 서비스', value: 'others' },
];

export function CategoryTabs({
  categories = defaultCategories,
  defaultValue = 'all',
  onChange,
}: CategoryTabsProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultValue);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
    onChange?.(newValue);
  };

  return (
    <Box
      component={m.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 1,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: (theme) => `1px solid ${theme.vars.palette.divider}`,
        }}
      >
        <Tabs
          value={selectedCategory}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-flexContainer': {
              gap: 0.5,
            },
            '& .MuiTab-root': {
              minWidth: 'auto',
              px: 2,
              py: 1,
              borderRadius: 1.5,
              fontSize: 14,
              fontWeight: 500,
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
                bgcolor: 'primary.lighter',
                fontWeight: 600,
              },
              '&:hover': {
                bgcolor: 'action.hover',
              },
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.value}
              value={category.value}
              label={category.label}
            />
          ))}
        </Tabs>
      </Paper>
    </Box>
  );
}