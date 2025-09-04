import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { JwtUpdatePasswordView } from 'src/auth/view/jwt';

export const metadata: Metadata = { title: `Update password | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <JwtUpdatePasswordView />;
}

