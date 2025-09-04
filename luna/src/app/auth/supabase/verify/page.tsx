import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CenteredVerifyView } from 'src/auth/view/supabase/centered-verify-view';

export const metadata: Metadata = { title: `Verify | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredVerifyView />;
}

