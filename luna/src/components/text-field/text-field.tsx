'use client';

import { forwardRef } from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));

// ----------------------------------------------------------------------

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => <StyledTextField ref={ref} {...props} />
);

TextField.displayName = 'TextField';