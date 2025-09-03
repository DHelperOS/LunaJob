import type { Metadata } from 'next';
import { RegisterForm } from 'src/sections/auth/register-form';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: '회원가입 | 루나알바',
  description: '루나알바에 가입하고 새로운 기회를 찾아보세요',
};

export default function RegisterPage() {
  return <RegisterForm />;
}