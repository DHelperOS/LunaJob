import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fShortenNumber } from 'src/utils/format-number';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export interface UserCardData {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  coverUrl?: string;
  totalFollowers?: number;
  totalFollowing?: number;
  totalPosts?: number;
  verified?: boolean;
  socials?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

type Props = {
  user: UserCardData;
  showStats?: boolean;
  showSocials?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
};

export function UserCard({ 
  user, 
  showStats = true, 
  showSocials = true,
  onFollow,
  onMessage,
}: Props) {
  const {
    name,
    role,
    avatarUrl,
    coverUrl,
    totalFollowers = 0,
    totalFollowing = 0,
    totalPosts = 0,
    verified = false,
    socials = {},
  } = user;

  const renderCover = () => (
    <Box sx={{ position: 'relative' }}>
      <Image
        alt="cover"
        src={coverUrl || '/assets/images/cover/cover-1.webp'}
        ratio="16/9"
        sx={{
          borderRadius: 'inherit',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <Avatar
        alt={name}
        src={avatarUrl}
        sx={{
          width: 64,
          height: 64,
          border: '2px solid',
          borderColor: 'background.paper',
          position: 'absolute',
          bottom: -32,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </Box>
  );

  const renderInfo = () => (
    <Stack spacing={1} sx={{ p: 3, pt: 5, textAlign: 'center' }}>
      <ListItemText
        primary={
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
            <Typography variant="subtitle1">{name}</Typography>
            {verified && (
              <Iconify
                icon="solar:verified-check-bold"
                width={16}
                sx={{ color: 'primary.main' }}
              />
            )}
          </Stack>
        }
        secondary={role}
        slotProps={{
          primary: { sx: { typography: 'subtitle1' } },
          secondary: { sx: { typography: 'body2', color: 'text.secondary' } },
        }}
      />
    </Stack>
  );

  const renderStats = () => showStats && (
    <>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box
        sx={{
          p: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          textAlign: 'center',
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h6">{fShortenNumber(totalFollowers)}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            팔로워
          </Typography>
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="h6">{fShortenNumber(totalFollowing)}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            팔로잉
          </Typography>
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="h6">{fShortenNumber(totalPosts)}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            게시물
          </Typography>
        </Stack>
      </Box>
    </>
  );

  const renderSocials = () => showSocials && Object.keys(socials).length > 0 && (
    <>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack direction="row" justifyContent="center" spacing={1} sx={{ p: 2 }}>
        {socials.facebook && (
          <IconButton size="small" href={socials.facebook} target="_blank">
            <Iconify icon="eva:facebook-fill" />
          </IconButton>
        )}
        {socials.instagram && (
          <IconButton size="small" href={socials.instagram} target="_blank">
            <Iconify icon="ant-design:instagram-filled" />
          </IconButton>
        )}
        {socials.linkedin && (
          <IconButton size="small" href={socials.linkedin} target="_blank">
            <Iconify icon="eva:linkedin-fill" />
          </IconButton>
        )}
        {socials.twitter && (
          <IconButton size="small" href={socials.twitter} target="_blank">
            <Iconify icon="eva:twitter-fill" />
          </IconButton>
        )}
      </Stack>
    </>
  );

  const renderActions = () => (onFollow || onMessage) && (
    <>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        {onFollow && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="solar:user-plus-bold" />}
            onClick={onFollow}
          >
            팔로우
          </Button>
        )}
        {onMessage && (
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="solar:chat-round-bold" />}
            onClick={onMessage}
          >
            메시지
          </Button>
        )}
      </Stack>
    </>
  );

  return (
    <Card sx={{ textAlign: 'center' }}>
      {renderCover()}
      {renderInfo()}
      {renderStats()}
      {renderSocials()}
      {renderActions()}
    </Card>
  );
}