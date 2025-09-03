import type { Metadata } from 'next';

import { JobDetailsView } from 'src/sections/job/view';
import MainLayout from 'src/layouts/main/layout';

// ----------------------------------------------------------------------

export const metadata: Metadata = { 
  title: '채용공고 상세 | 루나알바 - 당신의 완벽한 일자리를 찾아드립니다',
  description: '채용공고 상세정보와 지원 방법을 확인하세요',
};

type Props = {
  params: { id: string };
};

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <MainLayout>
      <JobDetailsView id={id} />
    </MainLayout>
  );
}