import type { Metadata } from 'next';

import { ProfileEditView } from 'src/sections/profile/view';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main/layout';
export const metadata: Metadata = { 
  title: '프로필 편집 | 루나알바 - 당신의 완벽한 일자리를 찾아드립니다',
  description: '프로필 정보를 편집하고 업데이트하세요',
};

export default function ProfileEditPage() {
  return (
    <MainLayout>
      <ProfileEditView />
    </MainLayout>
  );
}