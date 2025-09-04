import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CenteredSignInView } from 'src/auth/view/supabase/centered-sign-in-view';

export const metadata: Metadata = { title: `Sign in | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredSignInView />;
}

