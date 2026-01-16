'use client';

import { useRouter } from 'next/navigation';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  Stack,
  IconButton,
  Badge,
  Button,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useAuthStore } from 'src/store/auth.store';
import { NavSectionVertical } from 'src/components/nav-section';
import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
};

const navData = [
  {
    subheader: '채용정보',
    items: [
      {
        title: '인기 채용',
        path: '/jobs/trending',
        icon: <Iconify icon="solar:fire-bold" width={20} />,
        info: <Label variant="filled" color="error">HOT</Label>,
      },
      {
        title: '지역별',
        path: '/jobs/location',
        icon: <Iconify icon="solar:map-point-bold" width={20} />,
      },
      {
        title: '직종별',
        path: '/jobs/category',
        icon: <Iconify icon="solar:widget-2-bold" width={20} />,
      },
      {
        title: '프리미엄 채용',
        path: '/jobs/high-pay',
        icon: <Iconify icon="solar:dollar-bold" width={20} />,
        info: <Label variant="filled" color="info">NEW</Label>,
      },
    ],
  },
  {
    subheader: '기업정보',
    items: [
      {
        title: '우수 기업',
        path: '/companies/premium',
        icon: <Iconify icon="solar:star-bold" width={20} />,
      },
      {
        title: '신규 기업',
        path: '/companies/new',
        icon: <Iconify icon="solar:buildings-2-bold" width={20} />,
      },
    ],
  },
];

export function MobileDrawer({ open, onClose }: Props) {
  const router = useRouter();
  const { signOut } = useAuthStore();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ width: 280 }} role="presentation">
        {/* Header */}
        <Box
          sx={{
            p: 2,
            background: 'linear-gradient(135deg, #8E33FF 0%, #5119B7 100%)',
            color: 'white',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <Iconify icon="solar:close-circle-bold" width={24} />
          </IconButton>

          <Stack spacing={2} sx={{ pt: 3 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'white',
                color: 'primary.main',
              }}
            >
              U
            </Avatar>
            <Box>
              <Typography variant="h6">사용자님</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                user@example.com
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Navigation */}
        <Box sx={{ pt: 2 }}>
          <NavSectionVertical 
            data={navData}
            sx={{ px: 2 }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Logout */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="soft"
            color="error"
            startIcon={<Iconify icon="solar:login-bold" width={20} />}
            onClick={async () => {
              await signOut();
              onClose();
              router.push('/');
            }}
          >
            로그아웃
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
