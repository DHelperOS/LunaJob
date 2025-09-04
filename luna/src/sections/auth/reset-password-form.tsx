'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Card,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
  Button,
  Divider,
} from '@mui/material';

const schema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
});

type FormData = z.infer<typeof schema>;

export function ResetPasswordForm() {
  const { resetPassword, isLoading, error } = useAuthStore();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: FormData) => {
    const res = await resetPassword(data.email);
    if (res.success) {
      setSuccessMsg('비밀번호 재설정 메일을 발송했어요. 메일함을 확인해주세요.');
    }
  };

  return (
    <Card sx={{ p: 4, width: '100%', maxWidth: 420, mx: 'auto' }}>
      <Stack spacing={3}>
        <Stack spacing={1} sx={{ mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            비밀번호 재설정
          </Typography>
          <Typography variant="body2" color="text.secondary">
            가입한 이메일 주소로 재설정 링크를 보내드립니다.
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error">{error}</Alert>
        )}
        {successMsg && (
          <Alert severity="success">{successMsg}</Alert>
        )}

        <Divider />

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
                />
              )}
            />

            <Button fullWidth size="large" type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? '요청 중...' : '재설정 메일 보내기'}
            </Button>
          </Stack>
        </form>

        <Box sx={{ textAlign: 'center' }}>
          <Link component={NextLink} href="/login" underline="hover" color="inherit">
            로그인으로 돌아가기
          </Link>
        </Box>
      </Stack>
    </Card>
  );
}

