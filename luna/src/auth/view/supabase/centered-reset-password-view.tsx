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
import { Form, Field, schemaUtils } from 'src/components/hook-form';

import { FormHead } from '../../components/form-head';
import { FormDivider } from '../../components/form-divider';
import { FormSocials } from '../../components/form-socials';
import { createClient } from 'src/lib/supabase/client';

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export const ResetPasswordSchema = z.object({
  email: schemaUtils.email(),
});

export function CenteredResetPasswordView() {
  const supabase = createClient();
  const methods = useForm({ resolver: zodResolver(ResetPasswordSchema), defaultValues: { email: '' } });
  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}${paths.auth.supabase.updatePassword}`,
    });
  });

  const signInWithProvider = async (provider: 'google' | 'apple' | 'kakao') => {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } });
  };

  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />

      <FormHead
        title="Forgot your password?"
        description={
          <>
            {`Return to `}
            <Link component={RouterLink} href={paths.auth.supabase.signIn} variant="subtitle2">
              Sign in
            </Link>
          </>
        }
        sx={{ textAlign: 'center' }}
      />

      <FormSocials
        sx={{ mb: 2 }}
        signInWithGoogle={() => signInWithProvider('google')}
        signInWithApple={() => signInWithProvider('apple')}
        signInWithKakao={() => signInWithProvider('kakao')}
      />

      <FormDivider />

      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
          <Field.Text name="email" label="Email address" slotProps={{ inputLabel: { shrink: true } }} />
          <Button fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
            Send reset link
          </Button>
        </Box>
      </Form>
    </>
  );
}

