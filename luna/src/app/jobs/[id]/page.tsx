import type { Metadata } from 'next';

import MainLayout from 'src/layouts/main/layout';
import { JobDetailsView } from 'src/sections/job/view';

export const metadata: Metadata = { title: '채용 상세 | 루나잡' };

type Props = { params: { id: string } };

export default function JobDetailsPage({ params }: Props) {
  return (
    <MainLayout>
      <JobDetailsView id={params.id} />
    </MainLayout>
  );
}

