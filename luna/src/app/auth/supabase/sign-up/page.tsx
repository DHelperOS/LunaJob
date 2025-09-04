import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CenteredSignUpView } from 'src/auth/view/supabase/centered-sign-up-view';

export const metadata: Metadata = { title: `Sign up | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredSignUpView />;
}

