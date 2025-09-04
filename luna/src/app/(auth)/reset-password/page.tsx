import type { Metadata } from 'next';
import { ResetPasswordForm } from '@/sections/auth/reset-password-form';

export const metadata: Metadata = {
  title: '비밀번호 재설정 | 루나알바',
};

export default function Page() {
  return <ResetPasswordForm />;
}

