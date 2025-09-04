import type { Metadata } from 'next';
import { ResetPasswordConfirmForm } from '@/sections/auth/reset-password-confirm-form';

export const metadata: Metadata = {
  title: '비밀번호 변경 | 루나알바',
};

export default function Page() {
  return <ResetPasswordConfirmForm />;
}

