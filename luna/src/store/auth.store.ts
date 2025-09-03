import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authService } from '@/services/auth.service';
import type {
  AuthUser,
  AuthState,
  SignUpData,
  SignInData,
  UserProfile,
} from '@/types/auth.types';

interface AuthStore extends AuthState {
  // Actions
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
  signInWithProvider: (provider: 'google' | 'kakao' | 'naver') => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  loadUser: () => Promise<void>;
  clearError: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,

        // Actions
        signUp: async (data: SignUpData) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.signUp(data);
            
            if (response.success) {
              // 회원가입 성공 후 자동 로그인
              await get().signIn({
                email: data.email,
                password: data.password,
              });
              
              return { success: true };
            } else {
              set({ error: response.error });
              return { success: false, error: response.error };
            }
          } catch (error: any) {
            const errorMessage = error.message || '회원가입 중 오류가 발생했습니다.';
            set({ error: errorMessage });
            return { success: false, error: errorMessage };
          } finally {
            set({ isLoading: false });
          }
        },

        signIn: async (data: SignInData) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.signIn(data);
            
            if (response.success && response.data?.user) {
              // 프로필 정보 가져오기
              const profile = await authService.getUserProfile(response.data.user.id);
              
              let jobSeekerProfile = null;
              let employerProfile = null;
              
              if (profile) {
                if (profile.user_type === 'job_seeker') {
                  jobSeekerProfile = await authService.getJobSeekerProfile(profile.id);
                } else if (profile.user_type === 'employer') {
                  employerProfile = await authService.getEmployerProfile(profile.id);
                }
              }
              
              const authUser: AuthUser = {
                id: response.data.user.id,
                email: response.data.user.email!,
                profile: profile || undefined,
                jobSeekerProfile: jobSeekerProfile || undefined,
                employerProfile: employerProfile || undefined,
              };
              
              set({
                user: authUser,
                isAuthenticated: true,
                error: null,
              });
              
              return { success: true };
            } else {
              set({ error: response.error });
              return { success: false, error: response.error };
            }
          } catch (error: any) {
            const errorMessage = error.message || '로그인 중 오류가 발생했습니다.';
            set({ error: errorMessage });
            return { success: false, error: errorMessage };
          } finally {
            set({ isLoading: false });
          }
        },

        signInWithProvider: async (provider) => {
          set({ isLoading: true, error: null });
          
          try {
            await authService.signInWithProvider(provider);
            // OAuth는 리다이렉트 방식이므로 여기서 처리 완료
          } catch (error: any) {
            set({ error: error.message || '소셜 로그인 중 오류가 발생했습니다.' });
          } finally {
            set({ isLoading: false });
          }
        },

        signOut: async () => {
          set({ isLoading: true });
          
          try {
            await authService.signOut();
            set({
              user: null,
              isAuthenticated: false,
              error: null,
            });
          } catch (error: any) {
            set({ error: error.message || '로그아웃 중 오류가 발생했습니다.' });
          } finally {
            set({ isLoading: false });
          }
        },

        resetPassword: async (email: string) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.resetPassword(email);
            
            if (response.success) {
              return { success: true };
            } else {
              set({ error: response.error });
              return { success: false, error: response.error };
            }
          } catch (error: any) {
            const errorMessage = error.message || '비밀번호 재설정 중 오류가 발생했습니다.';
            set({ error: errorMessage });
            return { success: false, error: errorMessage };
          } finally {
            set({ isLoading: false });
          }
        },

        updatePassword: async (newPassword: string) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.updatePassword(newPassword);
            
            if (response.success) {
              return { success: true };
            } else {
              set({ error: response.error });
              return { success: false, error: response.error };
            }
          } catch (error: any) {
            const errorMessage = error.message || '비밀번호 변경 중 오류가 발생했습니다.';
            set({ error: errorMessage });
            return { success: false, error: errorMessage };
          } finally {
            set({ isLoading: false });
          }
        },

        updateProfile: async (updates: Partial<UserProfile>) => {
          const user = get().user;
          
          if (!user) {
            return { success: false, error: '로그인이 필요합니다.' };
          }
          
          set({ isLoading: true, error: null });
          
          try {
            const response = await authService.updateProfile(user.id, updates);
            
            if (response.success) {
              // 프로필 업데이트 후 사용자 정보 다시 로드
              await get().loadUser();
              return { success: true };
            } else {
              set({ error: response.error });
              return { success: false, error: response.error };
            }
          } catch (error: any) {
            const errorMessage = error.message || '프로필 업데이트 중 오류가 발생했습니다.';
            set({ error: errorMessage });
            return { success: false, error: errorMessage };
          } finally {
            set({ isLoading: false });
          }
        },

        loadUser: async () => {
          set({ isLoading: true });
          
          try {
            const currentUser = await authService.getCurrentUser();
            
            if (currentUser) {
              let jobSeekerProfile = null;
              let employerProfile = null;
              
              if (currentUser.profile) {
                if (currentUser.profile.user_type === 'job_seeker') {
                  jobSeekerProfile = await authService.getJobSeekerProfile(currentUser.profile.id);
                } else if (currentUser.profile.user_type === 'employer') {
                  employerProfile = await authService.getEmployerProfile(currentUser.profile.id);
                }
              }
              
              const authUser: AuthUser = {
                id: currentUser.id,
                email: currentUser.email!,
                profile: currentUser.profile || undefined,
                jobSeekerProfile: jobSeekerProfile || undefined,
                employerProfile: employerProfile || undefined,
              };
              
              set({
                user: authUser,
                isAuthenticated: true,
                error: null,
              });
            } else {
              set({
                user: null,
                isAuthenticated: false,
              });
            }
          } catch (error: any) {
            console.error('Error loading user:', error);
            set({
              user: null,
              isAuthenticated: false,
              error: error.message,
            });
          } finally {
            set({ isLoading: false });
          }
        },

        clearError: () => {
          set({ error: null });
        },

        setLoading: (isLoading: boolean) => {
          set({ isLoading });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'AuthStore',
    }
  )
);