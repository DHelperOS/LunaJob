import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fShortenNumber } from 'src/utils/format-number';

import { AvatarShape } from 'src/assets/illustrations';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export interface UserCardData {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  coverUrl: string;
  totalFollowers: number;
  totalFollowing: number;
  totalPosts: number;
}

export interface SocialLink {
  label: string;
  value: string;
  icon?: string;
}

type Props = CardProps & {
  user: UserCardData;
  socialLinks?: SocialLink[];
  showStats?: boolean;
  showSocials?: boolean;
};

export function UserCard({ 
  user, 
  socialLinks = [], 
  showStats = true, 
  showSocials = true,
  sx, 
  ...other 
}: Props) {
  const defaultSocials = [
    { label: 'Twitter', value: 'twitter', icon: 'socials:twitter' },
    { label: 'Facebook', value: 'facebook', icon: 'socials:facebook' },
    { label: 'Instagram', value: 'instagram', icon: 'socials:instagram' },
    { label: 'LinkedIn', value: 'linkedin', icon: 'socials:linkedin' },
  ];

  const socials = socialLinks.length > 0 ? socialLinks : defaultSocials;

  return (
    <Card sx={[{ textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: 'auto',
            bottom: -26,
            position: 'absolute',
          }}
        />

        <Avatar
          alt={user.name}
          src={user.avatarUrl}
          sx={{
            left: 0,
            right: 0,
            width: 64,
            height: 64,
            zIndex: 11,
            mx: 'auto',
            bottom: -32,
            position: 'absolute',
          }}
        />

        <Image
          src={user.coverUrl}
          alt={user.name}
          ratio="16/9"
          slotProps={{
            overlay: {
              sx: (theme) => ({
                bgcolor: varAlpha(theme.vars.palette.common.blackChannel, 0.48),
              }),
            },
          }}
        />
      </Box>

      <ListItemText
        sx={{ mt: 7, mb: 1 }}
        primary={user.name}
        secondary={user.role}
        slotProps={{
          primary: { sx: { typography: 'subtitle1' } },
          secondary: { sx: { mt: 0.5 } },
        }}
      />

      {showSocials && (
        <Box
          sx={{
            mb: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {socials.map((social) => (
            <IconButton key={social.label}>
              <Iconify icon={social.icon || `socials:${social.value}`} />
            </IconButton>
          ))}
        </Box>
      )}

      {showStats && (
        <>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box
            sx={{
              py: 3,
              display: 'grid',
              typography: 'subtitle1',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            {[
              { label: 'Follower', value: user.totalFollowers },
              { label: 'Following', value: user.totalFollowing },
              { label: 'Total post', value: user.totalPosts },
            ].map((stat) => (
              <Box key={stat.label} sx={{ gap: 0.5, display: 'flex', flexDirection: 'column' }}>
                <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
                  {stat.label}
                </Box>
                {fShortenNumber(stat.value)}
              </Box>
            ))}
          </Box>
        </>
      )}
    </Card>
  );
}