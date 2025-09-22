import MainLayout from 'src/layouts/main/layout';
import { JobListView } from 'src/sections/job/view';

export default function Page() {
  return (
    <MainLayout>
      <JobListView />
    </MainLayout>
  );
}

