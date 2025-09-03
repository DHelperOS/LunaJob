import type { Metadata } from 'next';

import { JobListView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

import MainLayout from 'src/layouts/main/layout';
export const metadata: Metadata = { 
  title: '채용정보 | 루나알바 - 당신의 완벽한 일자리를 찾아드립니다',
  description: '최신 채용공고와 구인정보를 확인하세요',
};

export default function JobsPage() {
  return (
    <MainLayout>
      <JobListView />
    </MainLayout>
  );
}