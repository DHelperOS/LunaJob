'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { AnimateLogoRotate } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

import { FormHead } from '../../components/form-head';
import { FormDivider } from '../../components/form-divider';
import { FormSocials } from '../../components/form-socials';

export type UpdatePasswordSchemaType = z.infer<typeof UpdatePasswordSchema>;

export const UpdatePasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters!' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters!' }),
}).refine((vals) => vals.password === vals.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

export function JwtUpdatePasswordView() {
  const show1 = useBoolean();
  const show2 = useBoolean();

  const methods = useForm({ resolver: zodResolver(UpdatePasswordSchema), defaultValues: { password: '', confirmPassword: '' } });
  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // TODO: Hook up to backend when available
    await new Promise((r) => setTimeout(r, 500));
    console.info('Update password', data);
  });

  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />
      <FormHead title="Set a new password" sx={{ textAlign: 'center' }} />

      <FormSocials sx={{ mb: 2 }} signInWithGoogle={() => {}} signInWithApple={() => {}} signInWithKakao={() => {}} />
      <FormDivider />

      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
          <Field.Text
            name="password"
            label="New password"
            placeholder="6+ characters"
            type={show1.value ? 'text' : 'password'}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={show1.onToggle} edge="end">
                      <Iconify icon={show1.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Field.Text
            name="confirmPassword"
            label="Confirm password"
            placeholder="Repeat new password"
            type={show2.value ? 'text' : 'password'}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={show2.onToggle} edge="end">
                      <Iconify icon={show2.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
            Update password
          </Button>
        </Box>
      </Form>
    </>
  );
}

