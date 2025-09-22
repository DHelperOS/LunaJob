import type { Metadata } from 'next';

import MainLayout from 'src/layouts/main/layout';
import { CommunityHomeView } from 'src/sections/community/community-home-view';

export const metadata: Metadata = { title: '커뮤니티 | 루나잡' };

export default function CommunityPage() {
  return (
    <MainLayout>
      <CommunityHomeView />
    </MainLayout>
  );
}

