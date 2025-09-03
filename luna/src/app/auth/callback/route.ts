import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  console.log('🔍 OAuth callback started');
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  
  console.log('📊 Callback params:', { hasCode: !!code, next, origin });

  if (code) {
    let response = NextResponse.redirect(`${origin}${next}`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    console.log('🔄 Exchanging code for session...');
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    console.log('📊 Exchange result:', { 
      hasError: !!error, 
      hasUser: !!data?.user,
      hasSession: !!data?.session,
      errorMessage: error?.message 
    });

    if (!error && data.user) {
      // 사용자 프로필 확인 및 생성
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .single();

      if (!profile) {
        // 프로필이 없으면 생성
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            auth_user_id: data.user.id,
            email: data.user.email,
            display_name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
            user_type: 'job_seeker', // 기본값
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      // 성공적으로 로그인했으면 응답 객체 반환 (쿠키가 설정됨)
      return response;
    }
  }

  // 에러가 발생하면 에러 페이지로 리디렉션
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}