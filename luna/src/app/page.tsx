'use client';

import { useState } from 'react';

import MainLayout from 'src/layouts/main/layout';
import { useAuthStore } from 'src/store/auth.store';

// Guest-only home
import HeroSection from 'src/sections/home/hero-section';
import { CompanyShowcase } from 'src/sections/home/components/company-showcase';

// Authenticated home
import { JobListView } from 'src/sections/job/view';
import { HomeAdvertisement } from 'src/sections/home/home-advertisement';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <MainLayout>
      {isAuthenticated ? (
        <>
          <HomeAdvertisement />
          <JobListView />
        </>
      ) : (
        <>
          <HeroSection
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <CompanyShowcase activeCategory={activeCategory} />
        </>
      )}
    </MainLayout>
  );
}
