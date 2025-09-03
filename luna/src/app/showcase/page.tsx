import type { Metadata } from 'next';

import { DashboardLayout } from 'src/layouts/dashboard';
import { ShowcaseView } from 'src/sections/showcase/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: '루나알바 - Component Showcase',
  description: '추출된 컴포넌트로 구성된 쇼케이스 페이지',
};

export default function ShowcasePage() {
  return (
    <DashboardLayout>
      <ShowcaseView />
    </DashboardLayout>
  );
}