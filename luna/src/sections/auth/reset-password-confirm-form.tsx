'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  Stack,
  TextField,
  Typography,
  Button,
  Alert,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Iconify } from '@/components/iconify';

const schema = z
  .object({
    password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
    confirmPassword: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다',
  });

type FormData = z.infer<typeof schema>;

export function ResetPasswordConfirmForm() {
  const router = useRouter();
  const { updatePassword, isLoading, error } = useAuthStore();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: FormData) => {
    const res = await updatePassword(data.password);
    if (res.success) {
      setSuccessMsg('비밀번호가 변경되었습니다. 이제 로그인할 수 있어요.');
      setTimeout(() => router.push('/login'), 1200);
    }
  };

  return (
    <Card sx={{ p: 4, width: '100%', maxWidth: 420, mx: 'auto' }}>
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          새 비밀번호 설정
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={show1 ? 'text' : 'password'}
                  label="새 비밀번호"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShow1((p) => !p)} edge="end">
                          <Iconify icon={show1 ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={show2 ? 'text' : 'password'}
                  label="새 비밀번호 확인"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShow2((p) => !p)} edge="end">
                          <Iconify icon={show2 ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button fullWidth size="large" type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? '변경 중...' : '비밀번호 변경'}
            </Button>
          </Stack>
        </form>

        <Link component={NextLink} href="/login" underline="hover" color="inherit" sx={{ textAlign: 'center' }}>
          로그인으로 돌아가기
        </Link>
      </Stack>
    </Card>
  );
}

