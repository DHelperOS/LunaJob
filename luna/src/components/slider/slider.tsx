'use client';

import { forwardRef } from 'react';
import MuiSlider, { SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledSlider = styled(MuiSlider)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}33`,
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.3,
  },
}));

// ----------------------------------------------------------------------

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  (props, ref) => <StyledSlider ref={ref} {...props} />
);

Slider.displayName = 'Slider';