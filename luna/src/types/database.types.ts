export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          auth_user_id: string
          username: string | null
          display_name: string | null
          phone_number: string | null
          phone_verified: boolean
          user_type: 'job_seeker' | 'employer' | 'agency' | 'admin' | 'super_admin'
          account_status: 'pending' | 'active' | 'inactive' | 'suspended' | 'banned'
          avatar_url: string | null
          bio: string | null
          date_of_birth: string | null
          gender: string | null
          city: string | null
          district: string | null
          address_detail: string | null
          latitude: number | null
          longitude: number | null
          identity_verified: boolean
          identity_verification_date: string | null
          identity_verification_method: string | null
          privacy_level: 'public' | 'normal' | 'private' | 'anonymous'
          anonymous_mode: boolean
          profile_visibility: Json | null
          last_active_at: string
          last_login_ip: string | null
          total_login_count: number
          metadata: Json
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          auth_user_id: string
          username?: string | null
          display_name?: string | null
          phone_number?: string | null
          phone_verified?: boolean
          user_type?: 'job_seeker' | 'employer' | 'agency' | 'admin' | 'super_admin'
          account_status?: 'pending' | 'active' | 'inactive' | 'suspended' | 'banned'
          avatar_url?: string | null
          bio?: string | null
          date_of_birth?: string | null
          gender?: string | null
          city?: string | null
          district?: string | null
          address_detail?: string | null
          latitude?: number | null
          longitude?: number | null
          identity_verified?: boolean
          identity_verification_date?: string | null
          identity_verification_method?: string | null
          privacy_level?: 'public' | 'normal' | 'private' | 'anonymous'
          anonymous_mode?: boolean
          profile_visibility?: Json | null
          last_active_at?: string
          last_login_ip?: string | null
          total_login_count?: number
          metadata?: Json
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          auth_user_id?: string
          username?: string | null
          display_name?: string | null
          phone_number?: string | null
          phone_verified?: boolean
          user_type?: 'job_seeker' | 'employer' | 'agency' | 'admin' | 'super_admin'
          account_status?: 'pending' | 'active' | 'inactive' | 'suspended' | 'banned'
          avatar_url?: string | null
          bio?: string | null
          date_of_birth?: string | null
          gender?: string | null
          city?: string | null
          district?: string | null
          address_detail?: string | null
          latitude?: number | null
          longitude?: number | null
          identity_verified?: boolean
          identity_verification_date?: string | null
          identity_verification_method?: string | null
          privacy_level?: 'public' | 'normal' | 'private' | 'anonymous'
          anonymous_mode?: boolean
          profile_visibility?: Json | null
          last_active_at?: string
          last_login_ip?: string | null
          total_login_count?: number
          metadata?: Json
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      job_seeker_profiles: {
        Row: {
          id: string
          user_profile_id: string
          years_of_experience: number
          preferred_industries: string[]
          preferred_locations: string[]
          desired_salary_min: number | null
          desired_salary_max: number | null
          available_start_date: string | null
          employment_type: string | null
          skills: string[]
          certifications: Json
          languages: Json
          has_vehicle: boolean
          military_service_status: string | null
          profile_completion_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_profile_id: string
          years_of_experience?: number
          preferred_industries?: string[]
          preferred_locations?: string[]
          desired_salary_min?: number | null
          desired_salary_max?: number | null
          available_start_date?: string | null
          employment_type?: string | null
          skills?: string[]
          certifications?: Json
          languages?: Json
          has_vehicle?: boolean
          military_service_status?: string | null
          profile_completion_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_profile_id?: string
          years_of_experience?: number
          preferred_industries?: string[]
          preferred_locations?: string[]
          desired_salary_min?: number | null
          desired_salary_max?: number | null
          available_start_date?: string | null
          employment_type?: string | null
          skills?: string[]
          certifications?: Json
          languages?: Json
          has_vehicle?: boolean
          military_service_status?: string | null
          profile_completion_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
      employer_profiles: {
        Row: {
          id: string
          user_profile_id: string
          company_name: string
          business_number: string | null
          business_verified: boolean
          industry_category: string
          company_size: string | null
          established_year: number | null
          company_description: string | null
          company_website: string | null
          company_address: string | null
          company_latitude: number | null
          company_longitude: number | null
          company_phone: string | null
          company_email: string | null
          business_hours: Json | null
          verification_status: string
          verification_date: string | null
          trust_score: number
          subscription_tier: string
          subscription_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_profile_id: string
          company_name: string
          business_number?: string | null
          business_verified?: boolean
          industry_category: string
          company_size?: string | null
          established_year?: number | null
          company_description?: string | null
          company_website?: string | null
          company_address?: string | null
          company_latitude?: number | null
          company_longitude?: number | null
          company_phone?: string | null
          company_email?: string | null
          business_hours?: Json | null
          verification_status?: string
          verification_date?: string | null
          trust_score?: number
          subscription_tier?: string
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_profile_id?: string
          company_name?: string
          business_number?: string | null
          business_verified?: boolean
          industry_category?: string
          company_size?: string | null
          established_year?: number | null
          company_description?: string | null
          company_website?: string | null
          company_address?: string | null
          company_latitude?: number | null
          company_longitude?: number | null
          company_phone?: string | null
          company_email?: string | null
          business_hours?: Json | null
          verification_status?: string
          verification_date?: string | null
          trust_score?: number
          subscription_tier?: string
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: 'job_seeker' | 'employer' | 'agency' | 'admin' | 'super_admin'
      account_status: 'pending' | 'active' | 'inactive' | 'suspended' | 'banned'
      privacy_level: 'public' | 'normal' | 'private' | 'anonymous'
      industry_category: 'room_salon' | 'ten_pro' | 'karaoke' | 'bar' | 'massage' | 'cafe' | 'club' | 'other'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}