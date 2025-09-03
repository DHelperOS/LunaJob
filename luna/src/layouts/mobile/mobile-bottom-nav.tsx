'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Paper, BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const navItems = [
  { label: '홈', value: '/', icon: <Iconify icon="solar:home-bold" width={24} /> },
  { label: '채용공고', value: '/jobs', icon: <Iconify icon="solar:case-round-bold" width={24} /> },
  { label: '이력서', value: '/resume', icon: <Iconify icon="solar:document-text-bold" width={24} /> },
  { label: '대시보드', value: '/dashboard', icon: <Iconify icon="solar:widget-bold" width={24} /> },
  { label: '내정보', value: '/profile', icon: <Iconify icon="solar:user-bold" width={24} /> },
];

export function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(pathname);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        borderTop: 1,
        borderColor: 'divider',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          height: 64,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 0',
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.75rem',
            marginTop: '4px',
            '&.Mui-selected': {
              fontSize: '0.75rem',
            },
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={
              item.value === '/dashboard' ? (
                <Badge badgeContent={3} color="error" variant="dot">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )
            }
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}