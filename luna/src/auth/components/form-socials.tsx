import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type FormSocialsProps = BoxProps & {
  signInWithGoogle?: () => void;
  signInWithApple?: () => void;
  signInWithKakao?: () => void;
};

export function FormSocials({ sx, signInWithGoogle, signInWithApple, signInWithKakao, ...other }: FormSocialsProps) {
  return (
    <Box
      sx={[
        {
          gap: 1.5,
          display: 'flex',
          justifyContent: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <IconButton color="inherit" onClick={signInWithGoogle} aria-label="Continue with Google">
        <Iconify width={22} icon="socials:google" />
      </IconButton>
      <IconButton color="inherit" onClick={signInWithApple} aria-label="Continue with Apple">
        <Iconify width={22} icon="socials:apple" />
      </IconButton>
      <IconButton color="inherit" onClick={signInWithKakao} aria-label="Continue with Kakao">
        <Iconify width={22} icon="socials:kakao" />
      </IconButton>
    </Box>
  );
}
