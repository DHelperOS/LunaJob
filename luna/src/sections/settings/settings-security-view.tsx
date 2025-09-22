'use client';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export function SettingsSecurityView() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>보안 설정</Typography>
      <Card sx={{ p: 2, mb: 2 }}>
        <Stack spacing={2}>
          <TextField label="현재 비밀번호" type="password" fullWidth />
          <TextField label="새 비밀번호" type="password" fullWidth />
          <TextField label="새 비밀번호 확인" type="password" fullWidth />
          <Button variant="contained">비밀번호 변경</Button>
        </Stack>
      </Card>

      <Card sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          <FormControlLabel control={<Switch />} label="2단계 인증(2FA) 사용" />
          <Button variant="outlined">백업 코드 재발급</Button>
        </Stack>
      </Card>
    </Container>
  );
}

