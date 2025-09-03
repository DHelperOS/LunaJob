'use client';

import { useState } from 'react';
import { Box, Stack, Container, useTheme, useMediaQuery } from '@mui/material';

import { MobileHeader } from './mobile-header';
import { MobileBottomNav } from './mobile-bottom-nav';
import { MobileDrawer } from './mobile-drawer';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function MobileLayout({ children }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Mobile Header */}
      <MobileHeader onMenuClick={handleDrawerToggle} />

      {/* Mobile Drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 7, sm: 8 }, // Header height
          pb: { xs: 8, sm: 0 }, // Bottom nav height on mobile
          width: '100%',
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 2, sm: 3 },
            maxWidth: { lg: 1200 },
            mx: 'auto',
          }}
        >
          {children}
        </Container>
      </Box>

      {/* Mobile Bottom Navigation - Only show on mobile */}
      {isMobile && <MobileBottomNav />}
    </Box>
  );
}