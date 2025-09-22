import type { Metadata } from 'next';

import MainLayout from 'src/layouts/main/layout';
import { CompaniesListView } from 'src/sections/company/view/companies-list-view';

export const metadata: Metadata = {
  title: '기업 정보 | 루나잡',
  description: '인기 기업과 신규 기업을 확인하세요',
};

export default function CompaniesPage() {
  return (
    <MainLayout>
      <CompaniesListView />
    </MainLayout>
  );
}

