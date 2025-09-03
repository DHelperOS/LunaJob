'use client';

import { forwardRef } from 'react';
import MuiRating, { RatingProps } from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledRating = styled(MuiRating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.warning.main,
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.warning.dark,
  },
}));

// ----------------------------------------------------------------------

export const Rating = forwardRef<HTMLSpanElement, RatingProps>(
  (props, ref) => <StyledRating ref={ref} {...props} />
);

Rating.displayName = 'Rating';