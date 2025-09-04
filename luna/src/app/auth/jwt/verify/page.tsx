import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { JwtVerifyView } from 'src/auth/view/jwt';

export const metadata: Metadata = { title: `Verify email | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <JwtVerifyView />;
}

