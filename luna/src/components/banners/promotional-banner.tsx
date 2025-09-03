'use client';

import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { m } from 'framer-motion';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export interface PromotionalBannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function PromotionalBanner({
  title = "회원가입만 해도 받는 프리미엄 혜택",
  subtitle = "루나 알바 멤버십을 무료로 체험해 보세요.",
  buttonText = "무료 회원가입",
  onButtonClick,
}: PromotionalBannerProps) {
  return (
    <Paper
      component={m.div}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        p: 3,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        background: (theme) =>
          `linear-gradient(135deg, ${theme.vars.palette.primary.main}15 0%, ${theme.vars.palette.warning.main}15 100%)`,
        border: (theme) => `1px solid ${theme.vars.palette.primary.main}20`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: (theme) =>
            `radial-gradient(circle, ${theme.vars.palette.primary.main}20, transparent)`,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: (theme) =>
            `radial-gradient(circle, ${theme.vars.palette.warning.main}15, transparent)`,
        },
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
        <Box sx={{ position: 'relative', zIndex: 2, flexGrow: 1 }}>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Label variant="filled" color="warning" sx={{ fontSize: 12 }}>
                Premium
              </Label>
              <Typography variant="h6" fontWeight={700}>
                {title}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Stack>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={onButtonClick}
          startIcon={<Iconify icon="solar:crown-star-bold" />}
          sx={{
            position: 'relative',
            zIndex: 2,
            px: 3,
            py: 1.5,
            borderRadius: 2,
            background: (theme) =>
              `linear-gradient(45deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.primary.dark})`,
            '&:hover': {
              background: (theme) =>
                `linear-gradient(45deg, ${theme.vars.palette.primary.dark}, ${theme.vars.palette.primary.main})`,
            },
          }}
        >
          {buttonText}
        </Button>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            opacity: 0.1,
            transform: 'rotate(15deg)',
          }}
        >
          <Iconify icon="solar:star-bold" width={32} />
        </Box>
      </Stack>
    </Paper>
  );
}