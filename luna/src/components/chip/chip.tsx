'use client';

import { forwardRef } from 'react';
import MuiChip, { ChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledChip = styled(MuiChip)(({ theme }) => ({
  fontWeight: 500,
  '& .MuiChip-deleteIcon': {
    color: 'inherit',
    opacity: 0.48,
    '&:hover': {
      opacity: 1,
      color: 'inherit',
    },
  },
}));

// ----------------------------------------------------------------------

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (props, ref) => <StyledChip ref={ref} {...props} />
);

Chip.displayName = 'Chip';