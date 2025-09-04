import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CenteredResetPasswordView } from 'src/auth/view/supabase/centered-reset-password-view';

export const metadata: Metadata = { title: `Reset password | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredResetPasswordView />;
}

