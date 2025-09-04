'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { AnimateLogoRotate } from 'src/components/animate';
import { Form, Field, schemaUtils } from 'src/components/hook-form';

import { FormHead } from '../../components/form-head';
import { FormSocials } from '../../components/form-socials';
import { FormDivider } from '../../components/form-divider';
import { SignUpTerms } from '../../components/sign-up-terms';
import { createClient } from 'src/lib/supabase/client';

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignUpSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required!' }),
  lastName: z.string().min(1, { message: 'Last name is required!' }),
  email: schemaUtils.email(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters!' }),
  role: z.enum(['seeker', 'employer'], { message: 'Please select a role' }),
});

export function CenteredSignUpView() {
  const supabase = createClient();
  const showPassword = useBoolean();

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'seeker',
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // Use metadata to store role; you can mirror to your DB via triggers or webhooks
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { firstName: data.firstName, lastName: data.lastName, role: data.role },
        emailRedirectTo: `${window.location.origin}${paths.auth.supabase.verify}`,
      },
    });
    if (error) throw error;
  });

  const signInWithProvider = async (provider: 'google' | 'apple' | 'kakao') => {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } });
  };

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Field.RadioGroup
        name="role"
        label="Choose your role"
        options={[
          { label: '구직자', value: 'seeker' },
          { label: '구인자', value: 'employer' },
        ]}
        row
      />

      <Box sx={{ display: 'flex', gap: { xs: 3, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Field.Text name="firstName" label="First name" slotProps={{ inputLabel: { shrink: true } }} />
        <Field.Text name="lastName" label="Last name" slotProps={{ inputLabel: { shrink: true } }} />
      </Box>

      <Field.Text name="email" label="Email address" slotProps={{ inputLabel: { shrink: true } }} />

      <Field.Text
        name="password"
        label="Password"
        placeholder="6+ characters"
        type={showPassword.value ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={showPassword.onToggle} edge="end">
                  <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
        Create account
      </Button>
    </Box>
  );

  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />

      <FormHead
        title="Get started absolutely free"
        description={
          <>
            {`Already have an account? `}
            <Link component={RouterLink} href={paths.auth.supabase.signIn} variant="subtitle2">
              Get started
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
        {renderForm()}
      </Form>

      <SignUpTerms />
    </>
  );
}

