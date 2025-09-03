# API 명세 문서
## 현대적 구인구직 포털 Supabase API

## 1. API 개요

### 1.1 기본 설정
```typescript
// 기본 URL
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// API 버전
const API_VERSION = 'v1';

// 콘텐츠 타입
const CONTENT_TYPE = 'application/json';
const MULTIPART_TYPE = 'multipart/form-data';

// 속도 제한
const RATE_LIMITS = {
  anonymous: '분당 10회 요청',
  authenticated: '분당 100회 요청',
  premium: '분당 1000회 요청'
};
```

### 1.2 인증 헤더
```typescript
interface AuthHeaders {
  'Authorization': `Bearer ${accessToken}`;
  'apikey': string;
  'X-Request-ID': string;
  'Content-Type': 'application/json';
}
```

## 2. Supabase 클라이언트 API

### 2.1 사용자 인증 API
```typescript
// services/auth/supabase-auth.ts
export class SupabaseAuthAPI {
  
  // 회원가입
  async register(userData: RegisterInput) {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          user_type: userData.userType,
          phone: userData.phone
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      throw new APIError({
        code: 'REGISTRATION_FAILED',
        message: error.message,
        status: 400
      });
    }

    // 프로필 테이블에 추가 정보 저장
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          name: userData.name,
          user_type: userData.userType,
          phone: userData.phone,
          created_at: new Date().toISOString()
        });

      if (profileError) throw profileError;
    }

    return {
      success: true,
      data: {
        id: data.user?.id,
        email: data.user?.email,
        userType: userData.userType
      },
      message: '회원가입이 완료되었습니다. 이메일을 확인해주세요.'
    };
  }

  // 로그인
  async login(credentials: LoginInput) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    if (error) {
      throw new APIError({
        code: 'LOGIN_FAILED',
        message: '이메일 또는 비밀번호가 올바르지 않습니다',
        status: 401
      });
    }

    // 마지막 로그인 시간 업데이트
    await supabase
      .from('profiles')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', data.user.id);

    return {
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          userType: data.user.user_metadata.user_type
        },
        session: data.session
      }
    };
  }

  // 소셜 로그인 (카카오)
  async signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'profile_nickname profile_image account_email'
      }
    });

    if (error) throw error;
    return data;
  }

  // 로그아웃
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return {
      success: true,
      message: '로그아웃되었습니다'
    };
  }

  // 비밀번호 재설정
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });

    if (error) throw error;

    return {
      success: true,
      message: '비밀번호 재설정 이메일이 전송되었습니다'
    };
  }

  // 비밀번호 변경
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;

    return {
      success: true,
      message: '비밀번호가 변경되었습니다'
    };
  }
}
```

### 2.2 채용공고 API
```typescript
// services/jobs/supabase-jobs.ts
export class SupabaseJobsAPI {
  
  // 채용공고 목록 조회
  async getJobPostings(filters: JobFilters) {
    let query = supabase
      .from('job_postings')
      .select(`
        id,
        title,
        job_category,
        job_type,
        min_salary,
        max_salary,
        salary_type,
        work_location,
        work_hours,
        experience_level,
        created_at,
        application_deadline,
        is_urgent,
        view_count,
        application_count,
        companies!inner(
          id,
          company_name,
          logo,
          is_verified,
          company_type
        )
      `)
      .eq('status', 'ACTIVE')
      .order('created_at', { ascending: false });

    // 필터 적용
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters.category) {
      query = query.eq('job_category', filters.category);
    }

    if (filters.location) {
      query = query.ilike('work_location', `%${filters.location}%`);
    }

    if (filters.salaryMin) {
      query = query.gte('min_salary', filters.salaryMin);
    }

    if (filters.salaryMax) {
      query = query.lte('max_salary', filters.salaryMax);
    }

    if (filters.jobType) {
      query = query.eq('job_type', filters.jobType);
    }

    if (filters.experienceLevel) {
      query = query.eq('experience_level', filters.experienceLevel);
    }

    // 페이지네이션
    const from = (filters.page - 1) * filters.limit;
    const to = from + filters.limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      success: true,
      data: {
        jobs: data,
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / filters.limit)
        }
      }
    };
  }

  // 채용공고 상세 조회
  async getJobById(id: string, userId?: string) {
    const { data, error } = await supabase
      .from('job_postings')
      .select(`
        *,
        companies(
          id,
          company_name,
          representative_name,
          company_type,
          industry,
          employee_count,
          established_date,
          website,
          logo,
          description,
          address,
          contact_email,
          contact_phone,
          is_verified
        ),
        applications!inner(count)
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw new APIError({
        code: 'JOB_NOT_FOUND',
        message: '채용공고를 찾을 수 없습니다',
        status: 404
      });
    }

    // 조회수 증가
    await supabase.rpc('increment_view_count', { job_id: id });

    // 사용자가 이미 지원했는지 확인
    let hasApplied = false;
    if (userId) {
      const { data: application } = await supabase
        .from('applications')
        .select('id')
        .eq('job_posting_id', id)
        .eq('user_id', userId)
        .single();

      hasApplied = !!application;
    }

    return {
      success: true,
      data: {
        ...data,
        hasApplied
      }
    };
  }

  // 채용공고 생성 (고용주 전용)
  async createJobPosting(jobData: JobPostingInput, userId: string) {
    // 사용자가 고용주인지 확인
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type, companies(id)')
      .eq('id', userId)
      .single();

    if (profile?.user_type !== 'EMPLOYER') {
      throw new APIError({
        code: 'UNAUTHORIZED',
        message: '고용주만 채용공고를 등록할 수 있습니다',
        status: 403
      });
    }

    const { data, error } = await supabase
      .from('job_postings')
      .insert({
        ...jobData,
        user_id: userId,
        company_id: profile.companies?.id,
        status: 'ACTIVE',
        created_at: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: '채용공고가 등록되었습니다'
    };
  }

  // 채용공고 수정
  async updateJobPosting(jobId: string, updateData: JobPostingUpdate, userId: string) {
    // 소유권 확인
    const { data: job } = await supabase
      .from('job_postings')
      .select('user_id')
      .eq('id', jobId)
      .single();

    if (job?.user_id !== userId) {
      throw new APIError({
        code: 'FORBIDDEN',
        message: '본인의 채용공고만 수정할 수 있습니다',
        status: 403
      });
    }

    const { data, error } = await supabase
      .from('job_postings')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', jobId)
      .select('*')
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
      message: '채용공고가 수정되었습니다'
    };
  }

  // 채용공고 삭제 (소프트 삭제)
  async deleteJobPosting(jobId: string, userId: string) {
    const { data: job } = await supabase
      .from('job_postings')
      .select('user_id')
      .eq('id', jobId)
      .single();

    if (job?.user_id !== userId) {
      throw new APIError({
        code: 'FORBIDDEN',
        message: '본인의 채용공고만 삭제할 수 있습니다',
        status: 403
      });
    }

    const { error } = await supabase
      .from('job_postings')
      .update({
        status: 'DELETED',
        deleted_at: new Date().toISOString()
      })
      .eq('id', jobId);

    if (error) throw error;

    return {
      success: true,
      message: '채용공고가 삭제되었습니다'
    };
  }

  // 즐겨찾기 토글
  async toggleBookmark(jobId: string, userId: string) {
    const { data: existing } = await supabase
      .from('favorite_jobs')
      .select('id')
      .eq('job_posting_id', jobId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      // 즐겨찾기 해제
      await supabase
        .from('favorite_jobs')
        .delete()
        .eq('id', existing.id);

      return {
        success: true,
        bookmarked: false,
        message: '즐겨찾기에서 제거되었습니다'
      };
    } else {
      // 즐겨찾기 추가
      await supabase
        .from('favorite_jobs')
        .insert({
          job_posting_id: jobId,
          user_id: userId,
          created_at: new Date().toISOString()
        });

      return {
        success: true,
        bookmarked: true,
        message: '즐겨찾기에 추가되었습니다'
      };
    }
  }
}
```

### 2.3 지원 관리 API
```typescript
// services/applications/supabase-applications.ts
export class SupabaseApplicationsAPI {
  
  // 지원하기
  async applyToJob(applicationData: ApplicationInput) {
    // 중복 지원 확인
    const { data: existing } = await supabase
      .from('applications')
      .select('id')
      .eq('job_posting_id', applicationData.jobId)
      .eq('user_id', applicationData.userId)
      .single();

    if (existing) {
      throw new APIError({
        code: 'ALREADY_APPLIED',
        message: '이미 지원한 채용공고입니다',
        status: 409
      });
    }

    // 지원서 생성
    const { data, error } = await supabase
      .from('applications')
      .insert({
        job_posting_id: applicationData.jobId,
        user_id: applicationData.userId,
        resume_id: applicationData.resumeId,
        cover_letter: applicationData.coverLetter,
        status: 'PENDING',
        applied_at: new Date().toISOString()
      })
      .select(`
        *,
        job_postings!inner(title, user_id),
        users!inner(name)
      `)
      .single();

    if (error) throw error;

    // 고용주에게 알림 전송
    await supabase
      .from('notifications')
      .insert({
        user_id: data.job_postings.user_id,
        type: 'NEW_APPLICATION',
        title: '새로운 지원서가 도착했습니다',
        content: `${data.users.name}님이 "${data.job_postings.title}" 포지션에 지원했습니다`,
        data: { applicationId: data.id, jobId: applicationData.jobId },
        created_at: new Date().toISOString()
      });

    return {
      success: true,
      data: {
        id: data.id,
        jobId: applicationData.jobId,
        status: 'PENDING',
        appliedAt: data.applied_at
      },
      message: '지원이 완료되었습니다'
    };
  }

  // 내 지원 내역 조회
  async getMyApplications(userId: string, filters: ApplicationFilters) {
    let query = supabase
      .from('applications')
      .select(`
        id,
        status,
        applied_at,
        viewed_at,
        responded_at,
        job_postings!inner(
          id,
          title,
          work_location,
          min_salary,
          max_salary,
          companies!inner(
            company_name,
            logo,
            is_verified
          )
        )
      `)
      .eq('user_id', userId);

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    query = query.order('applied_at', { ascending: false });

    // 페이지네이션
    const from = (filters.page - 1) * filters.limit;
    const to = from + filters.limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      success: true,
      data: {
        applications: data,
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / filters.limit)
        }
      }
    };
  }

  // 특정 채용공고의 지원자 조회 (고용주 전용)
  async getApplicationsForJob(jobId: string, userId: string, filters: ApplicationFilters) {
    // 채용공고 소유권 확인
    const { data: job } = await supabase
      .from('job_postings')
      .select('user_id')
      .eq('id', jobId)
      .single();

    if (job?.user_id !== userId) {
      throw new APIError({
        code: 'FORBIDDEN',
        message: '본인의 채용공고 지원자만 조회할 수 있습니다',
        status: 403
      });
    }

    let query = supabase
      .from('applications')
      .select(`
        id,
        status,
        applied_at,
        cover_letter,
        users!inner(
          id,
          profiles!inner(
            name,
            phone,
            birth_date,
            address
          )
        ),
        resumes(
          id,
          title,
          introduction
        )
      `)
      .eq('job_posting_id', jobId);

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    query = query.order('applied_at', { ascending: false });

    const from = (filters.page - 1) * filters.limit;
    const to = from + filters.limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      success: true,
      data: {
        applications: data,
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / filters.limit)
        }
      }
    };
  }

  // 지원 상태 업데이트 (고용주 전용)
  async updateApplicationStatus(applicationId: string, status: ApplicationStatus, userId: string) {
    const { data: application } = await supabase
      .from('applications')
      .select(`
        user_id,
        job_postings!inner(user_id, title)
      `)
      .eq('id', applicationId)
      .single();

    // 권한 확인
    if (application?.job_postings.user_id !== userId) {
      throw new APIError({
        code: 'FORBIDDEN',
        message: '권한이 없습니다',
        status: 403
      });
    }

    // 상태 업데이트
    const { data, error } = await supabase
      .from('applications')
      .update({
        status,
        responded_at: new Date().toISOString()
      })
      .eq('id', applicationId)
      .select('*')
      .single();

    if (error) throw error;

    // 지원자에게 알림 전송
    const statusMessages = {
      'ACCEPTED': '축하합니다! 지원하신 채용공고에 합격하셨습니다',
      'REJECTED': '아쉽게도 이번 채용에서 선발되지 않으셨습니다',
      'VIEWING': '지원서가 검토 중입니다'
    };

    await supabase
      .from('notifications')
      .insert({
        user_id: application.user_id,
        type: 'APPLICATION_STATUS_CHANGED',
        title: '지원 상태가 변경되었습니다',
        content: statusMessages[status],
        data: { applicationId, status },
        created_at: new Date().toISOString()
      });

    return {
      success: true,
      data,
      message: '지원 상태가 업데이트되었습니다'
    };
  }

  // 지원 취소
  async withdrawApplication(applicationId: string, userId: string) {
    const { data: application } = await supabase
      .from('applications')
      .select('user_id, status')
      .eq('id', applicationId)
      .single();

    if (application?.user_id !== userId) {
      throw new APIError({
        code: 'FORBIDDEN',
        message: '본인의 지원서만 취소할 수 있습니다',
        status: 403
      });
    }

    if (application.status === 'ACCEPTED') {
      throw new APIError({
        code: 'CANNOT_WITHDRAW',
        message: '합격한 지원서는 취소할 수 없습니다',
        status: 400
      });
    }

    await supabase
      .from('applications')
      .update({
        status: 'CANCELLED',
        cancelled_at: new Date().toISOString()
      })
      .eq('id', applicationId);

    return {
      success: true,
      message: '지원이 취소되었습니다'
    };
  }
}
```

### 2.4 이력서 API
```typescript
// services/resumes/supabase-resumes.ts
export class SupabaseResumesAPI {
  
  // 이력서 생성
  async createResume(resumeData: ResumeInput, userId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .insert({
        ...resumeData,
        user_id: userId,
        created_at: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) throw error;

    return {
      success: true,
      data: {
        id: data.id,
        title: data.title,
        createdAt: data.created_at
      },
      message: '이력서가 생성되었습니다'
    };
  }

  // 이력서 목록 조회
  async getResumes(userId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select(`
        id,
        title,
        is_public,
        is_default,
        view_count,
        created_at,
        updated_at
      `)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data
    };
  }

  // 이력서 상세 조회
  async getResumeById(resumeId: string, userId?: string) {
    let query = supabase
      .from('resumes')
      .select(`
        *,
        experiences(*),
        educations(*),
        certifications(*)
      `)
      .eq('id', resumeId);

    // 공개 이력서가 아니면 본인만 조회 가능
    if (userId) {
      query = query.or(`user_id.eq.${userId},is_public.eq.true`);
    } else {
      query = query.eq('is_public', true);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      throw new APIError({
        code: 'RESUME_NOT_FOUND',
        message: '이력서를 찾을 수 없거나 접근 권한이 없습니다',
        status: 404
      });
    }

    // 조회수 증가 (본인 제외)
    if (userId && data.user_id !== userId) {
      await supabase.rpc('increment_resume_view_count', { resume_id: resumeId });
    }

    return {
      success: true,
      data
    };
  }

  // 이력서 파일 업로드
  async uploadResumeFile(file: File, userId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `resumes/${userId}/${Date.now()}.${fileExt}`;

    // 파일 크기 확인 (10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      throw new APIError({
        code: 'FILE_TOO_LARGE',
        message: '파일 크기는 10MB를 초과할 수 없습니다',
        status: 400
      });
    }

    // 허용된 파일 형식 확인
    const allowedTypes = ['pdf', 'doc', 'docx'];
    if (!allowedTypes.includes(fileExt?.toLowerCase() || '')) {
      throw new APIError({
        code: 'INVALID_FILE_TYPE',
        message: 'PDF, DOC, DOCX 파일만 업로드 가능합니다',
        status: 400
      });
    }

    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);

    return {
      success: true,
      data: {
        url: publicUrl,
        fileName: file.name,
        fileSize: file.size
      },
      message: '파일이 업로드되었습니다'
    };
  }
}
```

## 3. Supabase 실시간 API

### 3.1 실시간 구독 설정
```typescript
// services/realtime/subscriptions.ts
export class RealtimeSubscriptions {
  
  // 알림 실시간 구독
  subscribeToNotifications(userId: string, callback: (notification: any) => void) {
    const channel = supabase
      .channel(`notifications_${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, (payload) => {
        callback({
          type: 'NEW_NOTIFICATION',
          data: payload.new
        });
      })
      .subscribe();

    return channel;
  }

  // 지원 상태 변경 구독
  subscribeToApplicationUpdates(userId: string, callback: (update: any) => void) {
    return supabase
      .channel(`application_updates_${userId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'applications',
        filter: `user_id=eq.${userId}`
      }, (payload) => {
        callback({
          type: 'APPLICATION_STATUS_CHANGED',
          data: payload.new
        });
      })
      .subscribe();
  }

  // 새로운 채용공고 구독 (키워드 기반)
  subscribeToNewJobs(keywords: string[], callback: (job: any) => void) {
    return supabase
      .channel('new_jobs')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'job_postings'
      }, (payload) => {
        const job = payload.new;
        const matchesKeywords = keywords.some(keyword => 
          job.title.toLowerCase().includes(keyword.toLowerCase()) ||
          job.description.toLowerCase().includes(keyword.toLowerCase())
        );

        if (matchesKeywords) {
          callback({
            type: 'NEW_JOB_MATCH',
            data: job
          });
        }
      })
      .subscribe();
  }

  // 실시간 채팅
  subscribeToMessages(conversationId: string, callback: (message: any) => void) {
    return supabase
      .channel(`conversation_${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        callback({
          type: 'NEW_MESSAGE',
          data: payload.new
        });
      })
      .subscribe();
  }

  // 구독 해제
  unsubscribe(channel: RealtimeChannel) {
    return supabase.removeChannel(channel);
  }

  // 모든 채널 해제
  unsubscribeAll() {
    const channels = supabase.getChannels();
    channels.forEach(channel => {
      supabase.removeChannel(channel);
    });
  }
}
```

### 3.2 실시간 메시징 API
```typescript
// services/messaging/supabase-messaging.ts
export class SupabaseMessagingAPI {
  
  // 메시지 전송
  async sendMessage(messageData: MessageInput) {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: messageData.conversationId,
        sender_id: messageData.senderId,
        receiver_id: messageData.receiverId,
        content: messageData.content,
        created_at: new Date().toISOString()
      })
      .select(`
        *,
        sender:users!sender_id(name, profiles(avatar_url))
      `)
      .single();

    if (error) throw error;

    // 읽지 않은 메시지 수 업데이트
    await supabase.rpc('update_unread_count', {
      conversation_id: messageData.conversationId,
      user_id: messageData.receiverId
    });

    return {
      success: true,
      data
    };
  }

  // 대화 생성 또는 조회
  async getOrCreateConversation(user1Id: string, user2Id: string) {
    // 기존 대화 찾기
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .or(`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`)
      .single();

    if (existing) {
      return {
        success: true,
        data: existing
      };
    }

    // 새 대화 생성
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user1_id: user1Id,
        user2_id: user2Id,
        created_at: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) throw error;

    return {
      success: true,
      data
    };
  }

  // 대화 목록 조회
  async getConversations(userId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        id,
        created_at,
        updated_at,
        user1:users!user1_id(name, profiles(avatar_url)),
        user2:users!user2_id(name, profiles(avatar_url)),
        last_message:messages(content, created_at)
      `)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data: data.map(conv => ({
        ...conv,
        otherUser: conv.user1_id === userId ? conv.user2 : conv.user1
      }))
    };
  }

  // 메시지 읽음 처리
  async markMessagesAsRead(conversationId: string, userId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('receiver_id', userId)
      .eq('is_read', false);

    if (error) throw error;

    return {
      success: true,
      message: '메시지를 읽음으로 표시했습니다'
    };
  }
}
```

## 4. Supabase RPC 함수

### 4.1 커스텀 PostgreSQL 함수
```sql
-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_view_count(job_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE job_postings 
  SET view_count = view_count + 1,
      updated_at = NOW()
  WHERE id = job_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 이력서 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_resume_view_count(resume_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE resumes 
  SET view_count = view_count + 1,
      updated_at = NOW()
  WHERE id = resume_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 읽지 않은 메시지 수 업데이트
CREATE OR REPLACE FUNCTION update_unread_count(conversation_id UUID, user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE conversations 
  SET unread_count = (
    SELECT COUNT(*) 
    FROM messages 
    WHERE conversation_id = conversation_id 
    AND receiver_id = user_id 
    AND is_read = false
  ),
  updated_at = NOW()
  WHERE id = conversation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 거리 기반 채용공고 검색
CREATE OR REPLACE FUNCTION jobs_within_radius(lat FLOAT, lng FLOAT, radius_km FLOAT)
RETURNS TABLE(job_id UUID, distance_km FLOAT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    jp.id as job_id,
    (6371 * acos(cos(radians(lat)) * cos(radians(jp.latitude)) * cos(radians(jp.longitude) - radians(lng)) + sin(radians(lat)) * sin(radians(jp.latitude)))) as distance_km
  FROM job_postings jp
  WHERE jp.latitude IS NOT NULL 
    AND jp.longitude IS NOT NULL
    AND jp.status = 'ACTIVE'
    AND (6371 * acos(cos(radians(lat)) * cos(radians(jp.latitude)) * cos(radians(jp.longitude) - radians(lng)) + sin(radians(lat)) * sin(radians(jp.latitude)))) <= radius_km
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 추천 채용공고 (사용자 기반)
CREATE OR REPLACE FUNCTION get_recommended_jobs(user_id UUID, limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  job_id UUID,
  match_score FLOAT,
  title TEXT,
  company_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH user_preferences AS (
    SELECT 
      preferred_job_types,
      preferred_regions,
      address
    FROM profiles 
    WHERE id = user_id
  ),
  user_skills AS (
    SELECT skill_name
    FROM user_skills us
    WHERE us.user_id = user_id
  )
  SELECT 
    jp.id as job_id,
    -- 매칭 점수 계산 (스킬, 위치, 직종 기반)
    (
      CASE WHEN jp.job_category = ANY(up.preferred_job_types) THEN 0.4 ELSE 0 END +
      CASE WHEN jp.work_location ILIKE '%' || up.preferred_regions[1] || '%' THEN 0.3 ELSE 0 END +
      (SELECT COUNT(*) * 0.1 FROM user_skills us WHERE jp.requirements ILIKE '%' || us.skill_name || '%')
    ) as match_score,
    jp.title,
    c.company_name
  FROM job_postings jp
  JOIN companies c ON jp.company_id = c.id
  CROSS JOIN user_preferences up
  WHERE jp.status = 'ACTIVE'
    AND jp.application_deadline > NOW()
  ORDER BY match_score DESC, jp.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 5. 오류 처리

### 5.1 Supabase 오류 코드
```typescript
export enum SupabaseErrorCodes {
  // 인증 오류 (1xxx)
  INVALID_CREDENTIALS = 1001,
  EMAIL_NOT_VERIFIED = 1002,
  ACCOUNT_SUSPENDED = 1003,
  SESSION_EXPIRED = 1004,
  
  // 검증 오류 (2xxx)
  INVALID_EMAIL = 2001,
  WEAK_PASSWORD = 2002,
  MISSING_REQUIRED_FIELD = 2003,
  INVALID_FILE_FORMAT = 2004,
  FILE_TOO_LARGE = 2005,
  
  // 비즈니스 로직 오류 (3xxx)
  JOB_EXPIRED = 3001,
  ALREADY_APPLIED = 3002,
  RESUME_INCOMPLETE = 3003,
  INSUFFICIENT_CREDITS = 3004,
  QUOTA_EXCEEDED = 3005,
  
  // Supabase 서비스 오류 (4xxx)
  RLS_VIOLATION = 4001,
  STORAGE_ERROR = 4002,
  REALTIME_ERROR = 4003,
  FUNCTION_ERROR = 4004
}

// 오류 처리 클래스
export class APIError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }

  toJSON() {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        details: this.details
      }
    };
  }
}

// Supabase 오류 변환
export function handleSupabaseError(error: any): never {
  if (error.code === 'PGRST301') {
    throw new APIError(
      'RLS_VIOLATION',
      '접근 권한이 없습니다',
      403
    );
  }

  if (error.code === '23505') {
    throw new APIError(
      'DUPLICATE_ENTRY',
      '이미 존재하는 데이터입니다',
      409
    );
  }

  if (error.code === '23503') {
    throw new APIError(
      'FOREIGN_KEY_VIOLATION',
      '참조된 데이터가 존재하지 않습니다',
      400
    );
  }

  throw new APIError(
    'UNKNOWN_ERROR',
    error.message || '알 수 없는 오류가 발생했습니다',
    500,
    error
  );
}
```

## 6. 검색 및 필터링 API

### 6.1 전문 검색 (PostgreSQL Full Text Search)
```typescript
// services/search/supabase-search.ts
export class SupabaseSearchAPI {
  
  async searchJobs(searchQuery: SearchInput) {
    let query = supabase
      .from('job_postings')
      .select(`
        *,
        companies!inner(*),
        ts_rank(search_vector, plainto_tsquery('korean', $1)) as rank
      `)
      .textSearch('search_vector', searchQuery.query, { 
        type: 'websearch',
        config: 'korean'
      })
      .eq('status', 'ACTIVE');

    // 추가 필터 적용
    if (searchQuery.filters.category) {
      query = query.eq('job_category', searchQuery.filters.category);
    }

    if (searchQuery.filters.location) {
      query = query.ilike('work_location', `%${searchQuery.filters.location}%`);
    }

    if (searchQuery.filters.salary) {
      query = query.gte('min_salary', searchQuery.filters.salary.min);
      query = query.lte('max_salary', searchQuery.filters.salary.max);
    }

    // 관련도순 정렬
    query = query.order('rank', { ascending: false });
    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      success: true,
      data: {
        jobs: data,
        total: count,
        query: searchQuery.query
      }
    };
  }

  // 자동완성 검색
  async getSearchSuggestions(query: string) {
    const { data, error } = await supabase
      .rpc('get_search_suggestions', {
        search_term: query,
        limit_count: 10
      });

    if (error) throw error;

    return {
      success: true,
      data: {
        suggestions: data
      }
    };
  }

  // 인기 검색어
  async getPopularSearchTerms() {
    const { data, error } = await supabase
      .from('search_logs')
      .select('search_term, count(*)')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .group('search_term')
      .order('count', { ascending: false })
      .limit(10);

    if (error) throw error;

    return {
      success: true,
      data
    };
  }
}
```

## 7. 파일 관리 API

### 7.1 Supabase Storage API
```typescript
// services/storage/supabase-storage.ts
export class SupabaseStorageAPI {
  
  // 프로필 사진 업로드
  async uploadAvatar(file: File, userId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `avatars/${userId}.${fileExt}`;

    // 기존 파일 삭제
    await supabase.storage
      .from('avatars')
      .remove([fileName]);

    // 새 파일 업로드
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    // 프로필 업데이트
    await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId);

    return {
      success: true,
      data: { url: publicUrl }
    };
  }

  // 회사 로고 업로드
  async uploadCompanyLogo(file: File, companyId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `company-logos/${companyId}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('company-assets')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('company-assets')
      .getPublicUrl(fileName);

    // 회사 정보 업데이트
    await supabase
      .from('companies')
      .update({ logo: publicUrl })
      .eq('id', companyId);

    return {
      success: true,
      data: { url: publicUrl }
    };
  }

  // 이력서 파일 관리
  async getResumeFiles(userId: string) {
    const { data, error } = await supabase.storage
      .from('resumes')
      .list(userId, {
        limit: 100,
        sortBy: { column: 'updated_at', order: 'desc' }
      });

    if (error) throw error;

    return {
      success: true,
      data: data.map(file => ({
        name: file.name,
        size: file.metadata?.size,
        lastModified: file.updated_at,
        url: supabase.storage.from('resumes').getPublicUrl(`${userId}/${file.name}`).data.publicUrl
      }))
    };
  }

  // 파일 삭제
  async deleteFile(bucket: string, filePath: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;

    return {
      success: true,
      message: '파일이 삭제되었습니다'
    };
  }
}
```

## 8. 통계 및 분석 API

### 8.1 대시보드 통계
```typescript
// services/analytics/supabase-analytics.ts
export class SupabaseAnalyticsAPI {
  
  // 사용자 대시보드 통계
  async getUserDashboardStats(userId: string) {
    const [
      applications,
      resumeViews,
      favoriteJobs,
      unreadMessages
    ] = await Promise.all([
      // 지원 현황
      supabase
        .from('applications')
        .select('status')
        .eq('user_id', userId),
      
      // 이력서 조회수
      supabase
        .from('resumes')
        .select('view_count')
        .eq('user_id', userId),
      
      // 즐겨찾기
      supabase
        .from('favorite_jobs')
        .select('id')
        .eq('user_id', userId),
      
      // 읽지 않은 메시지
      supabase
        .from('messages')
        .select('id')
        .eq('receiver_id', userId)
        .eq('is_read', false)
    ]);

    const stats = {
      applications: {
        total: applications.data?.length || 0,
        pending: applications.data?.filter(a => a.status === 'PENDING').length || 0,
        accepted: applications.data?.filter(a => a.status === 'ACCEPTED').length || 0,
        rejected: applications.data?.filter(a => a.status === 'REJECTED').length || 0
      },
      resumeViews: resumeViews.data?.reduce((sum, r) => sum + r.view_count, 0) || 0,
      favoriteJobs: favoriteJobs.data?.length || 0,
      unreadMessages: unreadMessages.data?.length || 0
    };

    return {
      success: true,
      data: stats
    };
  }

  // 고용주 대시보드 통계
  async getEmployerDashboardStats(userId: string) {
    const { data: company } = await supabase
      .from('companies')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!company) {
      throw new APIError('COMPANY_NOT_FOUND', '회사 정보를 찾을 수 없습니다', 404);
    }

    const [
      jobPostings,
      applications,
      views
    ] = await Promise.all([
      // 채용공고 현황
      supabase
        .from('job_postings')
        .select('status')
        .eq('company_id', company.id),
      
      // 지원자 현황
      supabase
        .from('applications')
        .select('status, job_postings!inner(company_id)')
        .eq('job_postings.company_id', company.id),
      
      // 조회수
      supabase
        .from('job_postings')
        .select('view_count')
        .eq('company_id', company.id)
    ]);

    const stats = {
      jobPostings: {
        total: jobPostings.data?.length || 0,
        active: jobPostings.data?.filter(j => j.status === 'ACTIVE').length || 0,
        draft: jobPostings.data?.filter(j => j.status === 'DRAFT').length || 0,
        expired: jobPostings.data?.filter(j => j.status === 'EXPIRED').length || 0
      },
      applications: {
        total: applications.data?.length || 0,
        pending: applications.data?.filter(a => a.status === 'PENDING').length || 0,
        accepted: applications.data?.filter(a => a.status === 'ACCEPTED').length || 0,
        rejected: applications.data?.filter(a => a.status === 'REJECTED').length || 0
      },
      totalViews: views.data?.reduce((sum, v) => sum + v.view_count, 0) || 0
    };

    return {
      success: true,
      data: stats
    };
  }
}
```

## 9. 속도 제한 및 보안

### 9.1 Supabase 속도 제한
```typescript
// lib/rate-limiting/supabase-rate-limit.ts
export class SupabaseRateLimit {
  
  async checkRateLimit(userId: string, action: string) {
    const { data, error } = await supabase
      .rpc('check_rate_limit', {
        user_id: userId,
        action_type: action,
        window_minutes: 1,
        max_requests: this.getLimitForAction(action)
      });

    if (error) throw error;

    if (!data.allowed) {
      throw new APIError(
        'RATE_LIMIT_EXCEEDED',
        `${action} 요청 한도를 초과했습니다. ${data.reset_time}에 재시도하세요`,
        429
      );
    }

    return data;
  }

  private getLimitForAction(action: string): number {
    const limits = {
      'job_search': 100,
      'application_submit': 10,
      'message_send': 60,
      'profile_update': 20,
      'file_upload': 5
    };

    return limits[action] || 30;
  }
}
```

### 9.2 보안 헤더 설정
```typescript
// middleware/security.ts
export function addSecurityHeaders(headers: Headers) {
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'origin-when-cross-origin');
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.supabase.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co wss://*.supabase.co;"
  );
  
  return headers;
}
```

## 10. 성능 모니터링 API

### 10.1 성능 메트릭 수집
```typescript
// services/monitoring/supabase-metrics.ts
export class SupabaseMetricsAPI {
  
  async logAPICall(endpoint: string, duration: number, userId?: string) {
    await supabase
      .from('api_logs')
      .insert({
        endpoint,
        duration_ms: duration,
        user_id: userId,
        timestamp: new Date().toISOString()
      });
  }

  async logError(error: Error, context: any) {
    await supabase
      .from('error_logs')
      .insert({
        error_message: error.message,
        error_stack: error.stack,
        context: JSON.stringify(context),
        timestamp: new Date().toISOString()
      });
  }

  async getPerformanceMetrics(timeRange: string) {
    const { data, error } = await supabase
      .rpc('get_performance_metrics', {
        time_range: timeRange
      });

    if (error) throw error;

    return {
      success: true,
      data: {
        avgResponseTime: data.avg_response_time,
        totalRequests: data.total_requests,
        errorRate: data.error_rate,
        slowQueries: data.slow_queries
      }
    };
  }
}
```

## 11. 웹훅 API

### 11.1 Supabase 웹훅 설정
```typescript
// services/webhooks/supabase-webhooks.ts
export class SupabaseWebhooksAPI {
  
  // 웹훅 등록
  async registerWebhook(webhookData: WebhookInput) {
    const { data, error } = await supabase
      .from('webhooks')
      .insert({
        url: webhookData.url,
        events: webhookData.events,
        secret: webhookData.secret,
        is_active: true,
        created_at: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) throw error;

    return {
      success: true,
      data
    };
  }

  // 웹훅 트리거
  async triggerWebhook(event: WebhookEvent) {
    const { data: webhooks } = await supabase
      .from('webhooks')
      .select('*')
      .contains('events', [event.type])
      .eq('is_active', true);

    if (!webhooks?.length) return;

    // 각 웹훅으로 이벤트 전송
    const promises = webhooks.map(webhook => 
      this.sendWebhookEvent(webhook, event)
    );

    await Promise.allSettled(promises);
  }

  private async sendWebhookEvent(webhook: any, event: WebhookEvent) {
    const payload = {
      id: crypto.randomUUID(),
      type: event.type,
      timestamp: new Date().toISOString(),
      data: event.data
    };

    const signature = await this.generateSignature(
      JSON.stringify(payload),
      webhook.secret
    );

    try {
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
          'X-Webhook-Id': payload.id
        },
        body: JSON.stringify(payload)
      });

      // 웹훅 전송 로그
      await supabase
        .from('webhook_logs')
        .insert({
          webhook_id: webhook.id,
          event_type: event.type,
          status_code: response.status,
          response_time: Date.now() - performance.now(),
          created_at: new Date().toISOString()
        });

    } catch (error) {
      // 실패 로그
      await supabase
        .from('webhook_logs')
        .insert({
          webhook_id: webhook.id,
          event_type: event.type,
          status_code: 0,
          error_message: error.message,
          created_at: new Date().toISOString()
        });
    }
  }

  private async generateSignature(payload: string, secret: string) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(payload)
    );

    return 'sha256=' + Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
```

## 12. 테스트 및 개발

### 12.1 테스트 환경 설정
```typescript
// lib/testing/supabase-test.ts
export class SupabaseTestUtils {
  
  // 테스트 데이터 생성
  async createTestData() {
    // 테스트 사용자 생성
    const { data: testUser } = await supabase.auth.admin.createUser({
      email: 'test@example.com',
      password: 'testpassword123',
      email_confirm: true,
      user_metadata: {
        name: '테스트 사용자',
        user_type: 'JOB_SEEKER'
      }
    });

    // 테스트 회사 생성
    const { data: testCompany } = await supabase
      .from('companies')
      .insert({
        user_id: testUser.user.id,
        company_name: '테스트 회사',
        representative_name: '대표자',
        company_type: 'CORPORATION',
        industry: 'IT',
        address: '서울시 강남구'
      })
      .select('*')
      .single();

    // 테스트 채용공고 생성
    const { data: testJob } = await supabase
      .from('job_postings')
      .insert({
        company_id: testCompany.id,
        user_id: testUser.user.id,
        title: '테스트 포지션',
        job_category: 'IT',
        job_type: 'FULL_TIME',
        employment_type: 'PERMANENT',
        min_salary: 3000000,
        max_salary: 5000000,
        salary_type: 'MONTHLY',
        description: '테스트용 채용공고입니다',
        work_location: '서울시 강남구',
        experience_level: 'MIDDLE',
        application_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ACTIVE'
      })
      .select('*')
      .single();

    return {
      testUser,
      testCompany,
      testJob
    };
  }

  // 테스트 데이터 정리
  async cleanupTestData() {
    // 테스트 데이터 삭제 (cascade로 연관 데이터도 함께 삭제)
    await supabase
      .from('users')
      .delete()
      .ilike('email', '%test%');
  }

  // 데이터베이스 상태 확인
  async checkDatabaseHealth() {
    const { data, error } = await supabase
      .rpc('db_health_check');

    if (error) throw error;

    return {
      success: true,
      data: {
        status: 'healthy',
        connections: data.active_connections,
        uptime: data.uptime,
        version: data.version
      }
    };
  }
}
```

## 13. 에러 응답 형식

### 13.1 표준 응답 형식
```typescript
// 성공 응답
interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 오류 응답
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    field?: string;
  };
}

// 예시 응답들
const exampleResponses = {
  // 로그인 성공
  loginSuccess: {
    success: true,
    data: {
      user: {
        id: "usr_abc123",
        email: "user@example.com",
        userType: "JOB_SEEKER"
      },
      session: {
        access_token: "eyJhbGciOiJIUzI1NiIs...",
        refresh_token: "eyJhbGciOiJIUzI1NiIs...",
        expires_in: 3600
      }
    }
  },
  
  // 로그인 실패
  loginError: {
    success: false,
    error: {
      code: "INVALID_CREDENTIALS",
      message: "이메일 또는 비밀번호가 올바르지 않습니다"
    }
  },
  
  // 채용공고 목록
  jobListSuccess: {
    success: true,
    data: {
      jobs: [
        {
          id: "job_123",
          title: "시니어 프론트엔드 개발자",
          company: {
            id: "comp_456",
            company_name: "테크 코퍼레이션",
            logo: "https://...",
            is_verified: true
          },
          work_location: "서울 강남구",
          min_salary: 4000000,
          max_salary: 6000000,
          salary_type: "MONTHLY",
          job_type: "FULL_TIME",
          experience_level: "MIDDLE",
          created_at: "2024-01-15T10:00:00Z",
          application_deadline: "2024-02-15T23:59:59Z",
          is_urgent: false,
          view_count: 234,
          application_count: 12
        }
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 156,
        totalPages: 8
      }
    }
  }
};
```

## 14. Supabase 사용량 최적화

### 14.1 쿼리 최적화 전략
```typescript
// 효율적인 Supabase 쿼리 패턴
export class QueryOptimization {
  
  // 필요한 컬럼만 선택
  async getJobListOptimized() {
    return await supabase
      .from('job_postings')
      .select(`
        id,
        title,
        work_location,
        min_salary,
        max_salary,
        created_at,
        companies(company_name, logo)
      `) // 모든 컬럼(*)을 피하고 필요한 것만 선택
      .eq('status', 'ACTIVE')
      .limit(20);
  }

  // 인덱스를 활용한 검색
  async searchWithIndex(searchTerm: string) {
    return await supabase
      .from('job_postings')
      .select('*')
      .textSearch('search_vector', searchTerm, {
        type: 'websearch',
        config: 'korean'
      });
  }

  // 관계형 데이터 효율적 조회
  async getJobWithRelations(jobId: string) {
    return await supabase
      .from('job_postings')
      .select(`
        *,
        companies!inner(*),
        applications(
          count
        )
      `)
      .eq('id', jobId)
      .single();
  }
}
```

## 15. 결론

이 API 명세는 다음을 제공합니다:
- **Supabase 통합**: 완전한 Supabase 생태계 활용
- **타입 안전성**: TypeScript와 Supabase 타입 생성기 연동
- **실시간 기능**: Supabase Realtime을 통한 실시간 업데이트
- **포괄적인 오류 처리**: 명확한 오류 메시지와 코드
- **보안**: RLS와 적절한 권한 관리
- **성능**: 최적화된 쿼리와 캐싱 전략
- **확장성**: Supabase의 자동 확장 기능 활용

Supabase의 모든 기능을 활용하여 개발 속도를 높이면서도 엔터프라이즈급 보안과 성능을 보장하는 API 아키텍처입니다.