import type { Metadata } from 'next';
import { LoginForm } from '@/sections/auth/login-form';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: '로그인 | Luna Job',
  description: 'Luna Job에 로그인하세요',
};

export default function LoginPage() {
  return <LoginForm />;
}