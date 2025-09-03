'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Avatar,
  Container,
  Typography,
  TextField,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { ResponsiveLayout } from '@/layouts/main';

// ----------------------------------------------------------------------

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  skills: string[];
  introduction: string;
  userType: 'job_seeker' | 'employer';
}

// Mock initial data
const mockUserData: ProfileFormData = {
  name: '김루나',
  email: 'luna@example.com',
  phone: '010-1234-5678',
  location: '서울 강남구',
  experience: '2년',
  skills: ['고객서비스', '커뮤니케이션', '팀워크'],
  introduction: '성실하고 책임감 있는 구직자입니다. 고객 서비스 경험이 풍부하며 새로운 환경에 빠르게 적응할 수 있습니다.',
  userType: 'job_seeker',
};

const locationOptions = [
  '서울 강남구',
  '서울 마포구',
  '서울 종로구',
  '부산 해운대구',
  '대구 중구',
  '기타',
];

const experienceOptions = [
  '신입',
  '1년 미만',
  '1-2년',
  '2-3년',
  '3-5년',
  '5-10년',
  '10년 이상',
];

const skillOptions = [
  '고객서비스',
  '커뮤니케이션',
  '팀워크',
  '칵테일제조',
  '바운영',
  '마사지',
  '노래방운영',
  '카페운영',
  '클럽운영',
];

export function ProfileEditView() {
  const [avatarUrl, setAvatarUrl] = useState('/assets/images/avatar/avatar-1.jpg');

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: mockUserData,
  });

  const watchedSkills = watch('skills');

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // 실제로는 Supabase를 통해 프로필 업데이트
      console.log('Profile update data:', data);
      
      // 성공 후 프로필 페이지로 리디렉션
      window.location.href = '/profile';
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const handleSkillAdd = (skill: string) => {
    if (!watchedSkills.includes(skill)) {
      setValue('skills', [...watchedSkills, skill]);
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setValue('skills', watchedSkills.filter(skill => skill !== skillToRemove));
  };

  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Stack spacing={3} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component="a"
              href="/profile"
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
              color="inherit"
            >
              프로필로 돌아가기
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h3" fontWeight={700}>
              프로필 편집
            </Typography>
          </Box>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Avatar Section */}
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  프로필 사진
                </Typography>
                
                <Avatar
                  src={avatarUrl}
                  alt="Profile"
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:camera-bold" />}
                  component="label"
                >
                  사진 변경
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setAvatarUrl(url);
                      }
                    }}
                  />
                </Button>
              </Card>
            </Grid>

            {/* Form Section */}
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  기본 정보
                </Typography>

                <Grid container spacing={3}>
                  {/* Name */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: '이름을 입력해주세요' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="이름"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      )}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: '이메일을 입력해주세요',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: '올바른 이메일 형식이 아닙니다',
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="이메일"
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: '연락처를 입력해주세요' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="연락처"
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                        />
                      )}
                    />
                  </Grid>

                  {/* User Type */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="userType"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>사용자 유형</InputLabel>
                          <Select {...field} label="사용자 유형">
                            <MenuItem value="job_seeker">구직자</MenuItem>
                            <MenuItem value="employer">채용담당자</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  {/* Location */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>지역</InputLabel>
                          <Select {...field} label="지역">
                            {locationOptions.map((location) => (
                              <MenuItem key={location} value={location}>
                                {location}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  {/* Experience */}
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="experience"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>경력</InputLabel>
                          <Select {...field} label="경력">
                            {experienceOptions.map((exp) => (
                              <MenuItem key={exp} value={exp}>
                                {exp}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  {/* Skills */}
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      보유 스킬
                    </Typography>
                    
                    {/* Selected Skills */}
                    <Box sx={{ mb: 2, minHeight: 40, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {watchedSkills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          onDelete={() => handleSkillRemove(skill)}
                          color="primary"
                          variant="filled"
                        />
                      ))}
                      {watchedSkills.length === 0 && (
                        <Typography variant="body2" color="text.secondary">
                          스킬을 선택해주세요
                        </Typography>
                      )}
                    </Box>

                    {/* Available Skills */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skillOptions
                        .filter(skill => !watchedSkills.includes(skill))
                        .map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            onClick={() => handleSkillAdd(skill)}
                            variant="outlined"
                            clickable
                          />
                        ))}
                    </Box>
                  </Grid>

                  {/* Introduction */}
                  <Grid item xs={12}>
                    <Controller
                      name="introduction"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          rows={4}
                          label="자기소개"
                          placeholder="본인을 소개해주세요"
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                {/* Submit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                  <Button
                    variant="outlined"
                    component="a"
                    href="/profile"
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    startIcon={<Iconify icon="eva:save-fill" />}
                  >
                    저장하기
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Container>
    </MainLayout>
  );
}