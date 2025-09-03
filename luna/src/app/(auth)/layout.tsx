import type { Metadata } from 'next';
import { Box, Container, Stack, Typography } from '@mui/material';
import { CONFIG } from '@/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `인증 - ${CONFIG.appName}`,
  description: '루나알바 로그인 및 회원가입',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, rgba(142, 51, 255, 0.1) 0%, rgba(255, 107, 179, 0.1) 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(/assets/background/overlay-1.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.05,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          py: 3,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9,
        }}
      >
        <Container>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(45deg, #8E33FF 30%, #FF6BB3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            루나알바
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 12,
        }}
      >
        <Stack spacing={3} sx={{ width: '100%' }}>
          {children}
        </Stack>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        <Container>
          © 2025 루나알바. All rights reserved.
        </Container>
      </Box>
    </Box>
  );
}