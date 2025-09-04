import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CenteredUpdatePasswordView } from 'src/auth/view/supabase/centered-update-password-view';

export const metadata: Metadata = { title: `Update password | Supabase - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredUpdatePasswordView />;
}

