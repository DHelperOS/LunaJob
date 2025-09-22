'use client';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function SettingsProfileView() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>프로필 설정</Typography>
      <Card sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField label="표시 이름" fullWidth />
          <TextField label="휴대폰 번호" fullWidth />
          <TextField label="간단 소개" fullWidth multiline rows={4} />
          <Button variant="contained">저장</Button>
        </Stack>
      </Card>
    </Container>
  );
}

