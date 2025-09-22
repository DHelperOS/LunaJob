'use client';

import { useEffect, useState } from 'react';

import MainLayout from 'src/layouts/main/layout';
import { useAuthStore } from 'src/store/auth.store';

// Guest-only home
import HeroSection from 'src/sections/home/hero-section';
import { CompanyShowcase } from 'src/sections/home/components/company-showcase';

// Authenticated home
import { JobListView } from 'src/sections/job/view';
import { HomeHeroSearch } from 'src/sections/home/hero-search';
import { ProAdsGrid } from 'src/sections/home/components/pro-ads-grid';
import { BasicAdsGrid } from 'src/sections/home/components/basic-ads-grid';
import { PopularGrid } from 'src/sections/home/popular-grid';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { isAuthenticated, loadUser } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    loadUser().catch(() => {});
  }, [loadUser]);

  return (
    <MainLayout>
      {isAuthenticated ? (
        <>
          <HomeHeroSearch />
          <PopularGrid />
          <ProAdsGrid />
          <BasicAdsGrid />
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
