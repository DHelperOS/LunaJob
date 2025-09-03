import { createClient } from '@/lib/supabase/client';
import type { 
  SignUpData, 
  SignInData, 
  UserProfile, 
  JobSeekerProfile,
  EmployerProfile,
  AuthResponse 
} from '@/types/auth.types';

export class AuthService {
  private supabase = createClient();

  /**
   * 회원가입
   */
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      // 1. Supabase Auth로 사용자 생성
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            display_name: data.displayName,
            user_type: data.userType,
          },
        },
      });

      if (authError) throw authError;

      // 2. 프로필 업데이트 (트리거로 자동 생성된 프로필)
      if (authData.user) {
        const { error: profileError } = await this.supabase
          .from('user_profiles')
          .update({
            display_name: data.displayName,
            phone_number: data.phoneNumber,
            user_type: data.userType,
            account_status: 'pending',
          })
          .eq('auth_user_id', authData.user.id);

        if (profileError) throw profileError;

        // 3. 구직자/구인자 프로필 생성
        if (data.userType === 'job_seeker') {
          await this.createJobSeekerProfile(authData.user.id);
        } else if (data.userType === 'employer') {
          await this.createEmployerProfile(authData.user.id, data.displayName);
        }
      }

      return {
        success: true,
        data: authData,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '회원가입 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 로그인
   */
  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await this.supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      // 로그인 기록 업데이트
      if (authData.user) {
        await this.updateLoginHistory(authData.user.id);
      }

      return {
        success: true,
        data: authData,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '로그인 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 소셜 로그인
   */
  async signInWithProvider(provider: 'google' | 'kakao' | 'naver'): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '소셜 로그인 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 로그아웃
   */
  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await this.supabase.auth.signOut();
      
      if (error) throw error;

      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '로그아웃 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 비밀번호 재설정 메일 발송
   */
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password/confirm`,
      });

      if (error) throw error;

      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '비밀번호 재설정 메일 발송 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 비밀번호 업데이트
   */
  async updatePassword(newPassword: string): Promise<AuthResponse> {
    try {
      const { error } = await this.supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '비밀번호 변경 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 현재 사용자 가져오기
   */
  async getCurrentUser() {
    try {
      console.log('🔍 AuthService.getCurrentUser() called');
      const { data: { user }, error } = await this.supabase.auth.getUser();
      
      console.log('👤 User from getUser():', user ? 'Found user' : 'No user');
      console.log('📊 User details:', { 
        hasUser: !!user, 
        userId: user?.id,
        email: user?.email 
      });
      
      if (error) {
        console.error('❌ getUser error:', error);
        return null;
      }
      
      if (!user) {
        console.log('❌ No user found');
        return null;
      }

      // 프로필 정보 가져오기
      console.log('🔍 Fetching user profile for user:', user.id);
      const { data: profile } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();

      console.log('📊 Profile result:', profile ? 'Found profile' : 'No profile');

      return {
        ...user,
        profile,
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * 사용자 프로필 가져오기
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('auth_user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * 구직자 프로필 가져오기
   */
  async getJobSeekerProfile(userProfileId: string): Promise<JobSeekerProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from('job_seeker_profiles')
        .select('*')
        .eq('user_profile_id', userProfileId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching job seeker profile:', error);
      return null;
    }
  }

  /**
   * 구인자 프로필 가져오기
   */
  async getEmployerProfile(userProfileId: string): Promise<EmployerProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from('employer_profiles')
        .select('*')
        .eq('user_profile_id', userProfileId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching employer profile:', error);
      return null;
    }
  }

  /**
   * 프로필 업데이트
   */
  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<AuthResponse> {
    try {
      const { error } = await this.supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('auth_user_id', userId);

      if (error) throw error;

      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '프로필 업데이트 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * 구직자 프로필 생성
   */
  private async createJobSeekerProfile(userId: string) {
    try {
      // 먼저 user_profile을 가져옴
      const { data: profile } = await this.supabase
        .from('user_profiles')
        .select('id')
        .eq('auth_user_id', userId)
        .single();

      if (profile) {
        const { error } = await this.supabase
          .from('job_seeker_profiles')
          .insert({
            user_profile_id: profile.id,
          });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error creating job seeker profile:', error);
    }
  }

  /**
   * 구인자 프로필 생성
   */
  private async createEmployerProfile(userId: string, companyName: string) {
    try {
      // 먼저 user_profile을 가져옴
      const { data: profile } = await this.supabase
        .from('user_profiles')
        .select('id')
        .eq('auth_user_id', userId)
        .single();

      if (profile) {
        const { error } = await this.supabase
          .from('employer_profiles')
          .insert({
            user_profile_id: profile.id,
            company_name: companyName,
            industry_category: 'other', // 기본값
          });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error creating employer profile:', error);
    }
  }

  /**
   * 로그인 기록 업데이트
   */
  private async updateLoginHistory(userId: string) {
    try {
      const { data: profile } = await this.supabase
        .from('user_profiles')
        .select('id')
        .eq('auth_user_id', userId)
        .single();

      if (profile) {
        // 프로필 업데이트
        await this.supabase
          .from('user_profiles')
          .update({
            last_active_at: new Date().toISOString(),
            total_login_count: profile.total_login_count + 1,
          })
          .eq('id', profile.id);

        // 로그인 기록 추가 (login_history 테이블이 있다면)
      }
    } catch (error) {
      console.error('Error updating login history:', error);
    }
  }

  /**
   * 세션 확인
   */
  async checkSession() {
    try {
      console.log('🔍 AuthService.checkSession() called');
      const { data: { session }, error } = await this.supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Session check error:', error);
        throw error;
      }
      
      console.log('✅ Session result:', session ? 'Found session' : 'No session');
      console.log('📊 Session details:', { 
        hasUser: !!session?.user, 
        userId: session?.user?.id,
        accessToken: session?.access_token ? 'present' : 'missing'
      });
      
      return session;
    } catch (error) {
      console.error('Error checking session:', error);
      return null;
    }
  }
}

// 싱글톤 인스턴스
export const authService = new AuthService();