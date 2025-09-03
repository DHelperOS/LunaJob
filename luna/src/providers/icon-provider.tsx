'use client';

import { useEffect } from 'react';
import { registerIcons } from '@/components/iconify';

export function IconProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerIcons();
  }, []);

  return <>{children}</>;
}