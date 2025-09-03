import type { Metadata } from 'next';

import { ProfileView } from 'src/sections/profile/view';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main/layout';
export const metadata: Metadata = { 
  title: '내 프로필 | Luna Job - 당신의 완벽한 일자리를 찾아드립니다',
  description: '프로필 정보를 확인하고 수정하세요',
};

export default function ProfilePage() {
  return (
    <MainLayout>
      <ProfileView />
    </MainLayout>
  );
}