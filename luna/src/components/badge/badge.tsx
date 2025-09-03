'use client';

import { forwardRef } from 'react';
import MuiBadge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledBadge = styled(MuiBadge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    minWidth: 20,
    height: 20,
    padding: '0 6px',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    borderRadius: 10,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  '& .MuiBadge-dot': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.background.paper}`,
  },
  '&.MuiBadge-colorPrimary .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '&.MuiBadge-colorSecondary .MuiBadge-badge': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

// ----------------------------------------------------------------------

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => <StyledBadge ref={ref} {...props} />
);

Badge.displayName = 'Badge';