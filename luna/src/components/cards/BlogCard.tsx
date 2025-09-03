import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface BlogCardData {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  category?: string;
  createdAt: Date | string;
  author: {
    name: string;
    avatarUrl: string;
  };
  view?: number;
  comment?: number;
  share?: number;
  favorite?: number;
}

type Props = {
  post: BlogCardData;
  detailsHref?: string;
  onView?: () => void;
};

export function BlogCard({ post, detailsHref, onView }: Props) {
  const {
    title,
    description,
    coverUrl,
    category,
    createdAt,
    author,
    view = 0,
    comment = 0,
    share = 0,
    favorite = 0,
  } = post;

  const renderAvatar = () => (
    <Box
      sx={{
        zIndex: 9,
        bottom: 24,
        position: 'absolute',
        left: { xs: 24, md: 32 },
      }}
    >
      <Avatar
        alt={author.name}
        src={author.avatarUrl}
        sx={{
          width: 48,
          height: 48,
          border: '2px solid',
          borderColor: 'background.paper',
        }}
      />
    </Box>
  );

  const renderCover = () => (
    <Box sx={{ position: 'relative' }}>
      <Image
        alt={title}
        src={coverUrl}
        ratio="16/9"
        overlay="gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)"
      />

      {category && (
        <Box
          sx={{
            top: 16,
            left: 16,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 'fontWeightSemiBold',
            }}
          >
            {category}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          bottom: 16,
          right: 16,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Iconify icon="solar:calendar-bold" width={16} />
        <Typography variant="caption">{fDate(createdAt)}</Typography>
      </Box>
    </Box>
  );

  const renderText = () => (
    <CardContent sx={{ pt: 6, pb: 3 }}>
      <Link
        color="inherit"
        variant="h6"
        component={detailsHref ? RouterLink : 'span'}
        href={detailsHref}
        onClick={onView}
        sx={{
          cursor: detailsHref || onView ? 'pointer' : 'default',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          mb: 1,
          '&:hover': {
            textDecoration: detailsHref || onView ? 'underline' : 'none',
          },
        }}
      >
        {title}
      </Link>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          mb: 2,
        }}
      >
        {description}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ typography: 'caption', color: 'text.disabled' }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Iconify icon="solar:eye-bold" width={16} />
          <Typography variant="caption">{fShortenNumber(view)}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Iconify icon="solar:chat-round-dots-bold" width={16} />
          <Typography variant="caption">{fShortenNumber(comment)}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Iconify icon="solar:share-bold" width={16} />
          <Typography variant="caption">{fShortenNumber(share)}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Iconify icon="solar:heart-bold" width={16} />
          <Typography variant="caption">{fShortenNumber(favorite)}</Typography>
        </Stack>
      </Stack>
    </CardContent>
  );

  const renderInfo = () => (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{
        px: 3,
        pb: 3,
        borderTop: '1px dashed',
        borderColor: 'divider',
        pt: 2,
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        by
      </Typography>
      <Typography variant="subtitle2">{author.name}</Typography>
    </Stack>
  );

  return (
    <Card sx={{ position: 'relative' }}>
      {renderCover()}
      {renderAvatar()}
      {renderText()}
      {renderInfo()}
    </Card>
  );
}