'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import {
  Box,
  Card,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Alert,
  Divider,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Iconify } from '@/components/iconify';
import { useAuthStore } from '@/store/auth.store';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// ----------------------------------------------------------------------

const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ----------------------------------------------------------------------

export function LoginForm() {
  const router = useRouter();
  const { signIn, signInWithProvider, error, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn(data);
    
    if (result.success) {
      router.push('/');
      router.refresh();
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'naver') => {
    await signInWithProvider(provider);
  };

  return (
    <Card
      sx={{
        p: 4,
        width: '100%',
        maxWidth: 420,
        mx: 'auto',
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            로그인
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              아직 계정이 없으신가요?
            </Typography>
            <Link
              component={NextLink}
              href="/register"
              variant="subtitle2"
              sx={{ fontWeight: 600 }}
            >
              회원가입
            </Link>
          </Stack>
        </Stack>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" onClose={() => useAuthStore.setState({ error: null })}>
            {error}
          </Alert>
        )}

        {/* Social Login */}
        <Stack spacing={2}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="socials:google" width={20} height={20} sx={{ flexShrink: 0 }} />}
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            sx={{
              fontFamily: 'Pretendard',
            }}
          >
            Google로 로그인
          </Button>

          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="socials:kakao" width={20} height={20} sx={{ flexShrink: 0 }} />}
            onClick={() => handleSocialLogin('kakao')}
            disabled={isLoading}
            sx={{
              bgcolor: '#FEE500',
              borderColor: '#FEE500',
              color: '#000000',
              fontFamily: 'Pretendard',
              '&:hover': {
                bgcolor: '#FEE500',
                borderColor: '#FEE500',
                opacity: 0.9,
              },
            }}
          >
            카카오로 로그인
          </Button>

          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="socials:apple" width={20} height={20} sx={{ color: '#fff', flexShrink: 0 }} />}
            onClick={() => handleSocialLogin('apple')}
            disabled={isLoading}
            sx={{
              bgcolor: '#000000',
              borderColor: '#000000',
              color: '#FFFFFF',
              fontFamily: 'Pretendard',
              '&:hover': {
                bgcolor: '#000000',
                borderColor: '#000000',
                opacity: 0.9,
              },
            }}
          >
            Apple로 로그인
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            또는
          </Typography>
        </Divider>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="이메일"
                  placeholder="example@luna-job.com"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:mail-bold-duotone" width={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="비밀번호"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:lock-password-bold-duotone" width={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Iconify
                            icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                            width={20}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    로그인 상태 유지
                  </Typography>
                }
              />
              <Link
                component={NextLink}
                href="/reset-password"
                variant="body2"
                color="primary"
                underline="hover"
                sx={{ fontWeight: 500 }}
              >
                비밀번호 찾기
              </Link>
            </Stack>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}
