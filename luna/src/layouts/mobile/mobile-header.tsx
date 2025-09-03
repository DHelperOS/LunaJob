'use client';

import { AppBar, Toolbar, IconButton, Box, Typography, Badge } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  onMenuClick: () => void;
};

export function MobileHeader({ onMenuClick }: Props) {
  const router = useRouter();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          sx={{ mr: 1 }}
        >
          <Iconify icon="solar:list-bold" width={24} />
        </IconButton>

        {/* Logo/Title */}
        <Box 
          onClick={() => router.push('/')}
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #8E33FF 30%, #5119B7 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            루나알바
          </Typography>
        </Box>

        {/* Right Actions */}
        <IconButton 
          color="inherit"
          onClick={() => router.push('/search')}
          sx={{ ml: 1 }}
        >
          <Iconify icon="solar:magnifer-bold-duotone" width={24} />
        </IconButton>

        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <Iconify icon="solar:bell-bold" width={24} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}