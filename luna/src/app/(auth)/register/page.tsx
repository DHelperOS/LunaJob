import type { Metadata } from 'next';
import { RegisterForm } from '@/sections/auth/register-form';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: '회원가입 | Luna Job',
  description: 'Luna Job에 가입하고 새로운 기회를 찾아보세요',
};

export default function RegisterPage() {
  return <RegisterForm />;
}