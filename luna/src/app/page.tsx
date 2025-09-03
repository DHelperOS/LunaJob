import type { Metadata } from 'next';

import HeroSection from 'src/sections/home/hero-section';
import MainLayout from 'src/layouts/main/layout';

// ----------------------------------------------------------------------

export const metadata: Metadata = { 
  title: 'Luna Job - 당신의 완벽한 일자리를 찾아드립니다',
  description: '최고의 채용정보와 맞춤형 일자리 추천 서비스',
};

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
    </MainLayout>
  );
}