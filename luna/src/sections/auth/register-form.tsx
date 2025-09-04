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
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useAuthStore } from 'src/store/auth.store';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UserType } from 'src/types/auth.types';

// ----------------------------------------------------------------------

const registerSchema = z.object({
  userType: z.enum(['job_seeker', 'employer'] as const, {
    required_error: '회원 유형을 선택해주세요',
  }),
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '비밀번호는 대소문자와 숫자를 포함해야 합니다'
    ),
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  displayName: z.string().min(2, '이름을 입력해주세요'),
  phoneNumber: z
    .string()
    .regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 휴대폰 번호를 입력해주세요')
    .optional()
    .or(z.literal('')),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: '이용약관에 동의해주세요',
  }),
  agreePrivacy: z.boolean().refine((val) => val === true, {
    message: '개인정보처리방침에 동의해주세요',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

// ----------------------------------------------------------------------

export function RegisterForm() {
  const router = useRouter();
  const { signUp, error, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: 'job_seeker',
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      phoneNumber: '',
      agreeTerms: false,
      agreePrivacy: false,
    },
  });

  const userType = watch('userType');

  const handleSocialSignUp = async (provider: 'google' | 'kakao' | 'apple') => {
    try {
      setIsLoading(true);
      
      // 소셜 로그인은 실제로는 로그인 페이지로 이동하여 처리
      // 소셜 인증은 회원가입과 로그인이 통합되어 있음
      router.push(`/login?provider=${provider}`);
    } catch (error) {
      console.error(`${provider} sign up error:`, error);
      useAuthStore.setState({
        error: `${provider} 회원가입 중 오류가 발생했습니다.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    const result = await signUp({
      email: data.email,
      password: data.password,
      userType: data.userType as UserType,
      displayName: data.displayName,
      phoneNumber: data.phoneNumber || undefined,
    });
    
    if (result.success) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <Card
      sx={{
        p: 4,
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            회원가입
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              이미 계정이 있으신가요?
            </Typography>
            <Link
              component={NextLink}
              href="/login"
              variant="subtitle2"
              sx={{ fontWeight: 600 }}
            >
              로그인
            </Link>
          </Stack>
        </Stack>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" onClose={() => useAuthStore.setState({ error: null })}>
            {error}
          </Alert>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* User Type Selection */}
            <Controller
              name="userType"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.userType}>
                  <FormLabel sx={{ mb: 1, fontWeight: 600 }}>회원 유형</FormLabel>
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="job_seeker"
                      control={<Radio />}
                      label={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Iconify icon="solar:user-bold-duotone" width={20} />
                          <Typography>구직자</Typography>
                        </Stack>
                      }
                    />
                    <FormControlLabel
                      value="employer"
                      control={<Radio />}
                      label={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Iconify icon="solar:buildings-bold-duotone" width={20} />
                          <Typography>구인자/업체</Typography>
                        </Stack>
                      }
                    />
                  </RadioGroup>
                  {errors.userType && (
                    <FormHelperText>{errors.userType.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Divider />

            {/* Display Name */}
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={userType === 'employer' ? '업체명' : '이름'}
                  placeholder={userType === 'employer' ? '업체명을 입력해주세요' : '이름을 입력해주세요'}
                  error={!!errors.displayName}
                  helperText={errors.displayName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify 
                          icon={userType === 'employer' ? 'solar:buildings-bold-duotone' : 'solar:user-bold-duotone'} 
                          width={20} 
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Email */}
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

            {/* Phone Number */}
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="휴대폰 번호 (선택)"
                  placeholder="010-1234-5678"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:phone-bold-duotone" width={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            {/* Password */}
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
                  helperText={errors.password?.message || '대소문자, 숫자를 포함한 8자 이상'}
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

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="비밀번호 확인"
                  type={showConfirmPassword ? 'text' : 'password'}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:lock-password-bold-duotone" width={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          <Iconify
                            icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                            width={20}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Divider />

            {/* Terms and Conditions */}
            <Stack spacing={1}>
              <Controller
                name="agreeTerms"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={
                      <Typography variant="body2">
                        <Link
                          component={NextLink}
                          href="/terms"
                          target="_blank"
                          underline="hover"
                        >
                          이용약관
                        </Link>
                        에 동의합니다 (필수)
                      </Typography>
                    }
                  />
                )}
              />
              {errors.agreeTerms && (
                <FormHelperText error>{errors.agreeTerms.message}</FormHelperText>
              )}

              <Controller
                name="agreePrivacy"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label={
                      <Typography variant="body2">
                        <Link
                          component={NextLink}
                          href="/privacy"
                          target="_blank"
                          underline="hover"
                        >
                          개인정보처리방침
                        </Link>
                        에 동의합니다 (필수)
                      </Typography>
                    }
                  />
                )}
              />
              {errors.agreePrivacy && (
                <FormHelperText error>{errors.agreePrivacy.message}</FormHelperText>
              )}
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
              {isLoading ? '가입 중...' : '회원가입'}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                또는
              </Typography>
            </Divider>

            {/* Social Login */}
            <Stack spacing={2}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                color="inherit"
                startIcon={<Iconify icon="socials:google" />}
                onClick={() => handleSocialSignUp('google')}
                disabled={isLoading}
                sx={{
                  fontFamily: 'Pretendard',
                }}
              >
                Google로 시작하기
              </Button>

              <Button
                fullWidth
                size="large"
                variant="outlined"
                color="inherit"
                startIcon={
                  <Box
                    component="img"
                    src="/assets/icons/ic-kakao.svg"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                onClick={() => handleSocialSignUp('kakao')}
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
                카카오로 시작하기
              </Button>

              <Button
                fullWidth
                size="large"
                variant="outlined"
                color="inherit"
                startIcon={
                  <Box
                    component="img"
                    src="/assets/icons/ic-apple.svg"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                onClick={() => handleSocialSignUp('apple')}
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
                Apple로 시작하기
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}
