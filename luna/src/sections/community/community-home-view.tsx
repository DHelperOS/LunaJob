'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const MOCK_POSTS = Array.from({ length: 9 }, (_, i) => ({
  id: `p-${i + 1}`,
  title: `커뮤니티 게시글 ${i + 1}`,
  excerpt: '현업 팁과 채용 정보가 공유되는 커뮤니티 포스트입니다.',
  author: `작성자 ${i + 1}`,
  views: 100 + i * 7,
}));

export function CommunityHomeView() {
  const [tab, setTab] = useState<'hot' | 'latest'>('hot');

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">커뮤니티</Typography>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="인기" value="hot" />
          <Tab label="최신" value="latest" />
        </Tabs>
      </Stack>

      <Grid container spacing={{ xs: 2, sm: 2.5 }}>
        {MOCK_POSTS.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1" noWrap sx={{ mb: 0.5 }}>
                {p.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }} noWrap>
                {p.excerpt}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.disabled' }}>
                <Typography variant="caption">{p.author}</Typography>
                <Typography variant="caption">조회수 {p.views.toLocaleString()}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

