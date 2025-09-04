'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { AnimateLogoRotate } from 'src/components/animate';
import { Form, Field } from 'src/components/hook-form';

import { FormHead } from '../../components/form-head';
import { FormDivider } from '../../components/form-divider';
import { FormSocials } from '../../components/form-socials';

export type VerifySchemaType = z.infer<typeof VerifySchema>;

export const VerifySchema = z.object({ code: z.string().min(6, { message: 'Enter the 6-digit code' }) });

export function CenteredVerifyView() {
  const methods = useForm({ resolver: zodResolver(VerifySchema), defaultValues: { code: '' } });
  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // If you implement OTP/email code capture, handle it here
    await new Promise((r) => setTimeout(r, 300));
    console.info('Verify email code', data);
  });

  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />

      <FormHead
        title="Check your email"
        description={
          <>
            {`We sent a link/code to your email.`}
            {' '}
            <Link component={RouterLink} href={paths.auth.supabase.signIn} variant="subtitle2">
              Back to sign in
            </Link>
          </>
        }
        sx={{ textAlign: 'center' }}
      />

      <FormSocials sx={{ mb: 2 }} />
      <FormDivider />

      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
          <Field.Text name="code" label="Verification code" slotProps={{ inputLabel: { shrink: true } }} />
          <Button fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
            Verify
          </Button>
        </Box>
      </Form>
    </>
  );
}

