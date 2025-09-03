'use client';

import { forwardRef } from 'react';
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar';
import MuiAvatarGroup, { AvatarGroupProps } from '@mui/material/AvatarGroup';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(16),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&.MuiAvatar-colorDefault': {
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.background.paper,
  },
  '& .MuiAvatar-img': {
    objectFit: 'cover',
  },
}));

const StyledAvatarGroup = styled(MuiAvatarGroup)(({ theme }) => ({
  '& .MuiAvatar-root': {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.background.paper}`,
    '&:first-of-type': {
      fontSize: theme.typography.pxToRem(12),
      color: theme.palette.primary.darker,
      backgroundColor: theme.palette.primary.lighter,
    },
  },
}));

// ----------------------------------------------------------------------

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => <StyledAvatar ref={ref} {...props} />
);

Avatar.displayName = 'Avatar';

// ----------------------------------------------------------------------

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (props, ref) => <StyledAvatarGroup ref={ref} {...props} />
);

AvatarGroup.displayName = 'AvatarGroup';