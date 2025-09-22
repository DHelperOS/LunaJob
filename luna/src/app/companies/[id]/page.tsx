import type { Metadata } from 'next';

import MainLayout from 'src/layouts/main/layout';
import { CompanyDetailsView } from 'src/sections/company/view/company-details-view';

export const metadata: Metadata = { title: '기업 상세 | 루나잡' };

type Props = { params: { id: string } };

export default function CompanyDetailsPage({ params }: Props) {
  return (
    <MainLayout>
      <CompanyDetailsView id={decodeURIComponent(params.id)} />
    </MainLayout>
  );
}

