'use client';

import { forwardRef } from 'react';
import MuiSwitch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledSwitch = styled(MuiSwitch)(({ theme }) => ({
  width: 46,
  height: 28,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.5,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 24,
    height: 24,
  },
  '& .MuiSwitch-track': {
    borderRadius: 14,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

// ----------------------------------------------------------------------

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (props, ref) => <StyledSwitch ref={ref} {...props} />
);

Switch.displayName = 'Switch';

// ----------------------------------------------------------------------

export const SwitchLabel = forwardRef<HTMLLabelElement, FormControlLabelProps>(
  (props, ref) => <FormControlLabel ref={ref} {...props} />
);

SwitchLabel.displayName = 'SwitchLabel';