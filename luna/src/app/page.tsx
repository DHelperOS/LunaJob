'use client';

import { useState } from 'react';

import HeroSection from 'src/sections/home/hero-section';
import { CompanyShowcase } from 'src/sections/home/components/company-showcase';
import MainLayout from 'src/layouts/main/layout';

// ----------------------------------------------------------------------

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <MainLayout>
      <HeroSection 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <CompanyShowcase activeCategory={activeCategory} />
    </MainLayout>
  );
}