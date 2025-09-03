import type { Metadata } from 'next';
import { LoginForm } from '@/sections/auth/login-form';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: '로그인 | 루나알바',
  description: '루나알바에 로그인하세요',
};

export default function LoginPage() {
  return <LoginForm />;
}