import type { Database } from './database.types';

export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
export type JobSeekerProfile = Database['public']['Tables']['job_seeker_profiles']['Row'];
export type EmployerProfile = Database['public']['Tables']['employer_profiles']['Row'];

export type UserType = Database['public']['Enums']['user_type'];
export type AccountStatus = Database['public']['Enums']['account_status'];
export type PrivacyLevel = Database['public']['Enums']['privacy_level'];
export type IndustryCategory = Database['public']['Enums']['industry_category'];

export interface SignUpData {
  email: string;
  password: string;
  userType: UserType;
  displayName: string;
  phoneNumber?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile?: UserProfile;
  jobSeekerProfile?: JobSeekerProfile;
  employerProfile?: EmployerProfile;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
}