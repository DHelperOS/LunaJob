'use client';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

export function SettingsNotificationsView() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>알림 설정</Typography>
      <Card sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          <FormControlLabel control={<Switch defaultChecked />} label="신규 채용공고 알림" />
          <FormControlLabel control={<Switch defaultChecked />} label="지원 상태 변경 알림" />
          <FormControlLabel control={<Switch />} label="프로모션/이벤트 알림" />
        </Stack>
      </Card>
    </Container>
  );
}

