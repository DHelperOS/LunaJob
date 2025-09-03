'use client';

import { forwardRef } from 'react';
import MuiRadio, { RadioProps } from '@mui/material/Radio';
import MuiRadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledRadio = styled(MuiRadio)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

// ----------------------------------------------------------------------

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  (props, ref) => <StyledRadio ref={ref} {...props} />
);

Radio.displayName = 'Radio';

// ----------------------------------------------------------------------

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => <MuiRadioGroup ref={ref} {...props} />
);

RadioGroup.displayName = 'RadioGroup';

// ----------------------------------------------------------------------

export const RadioLabel = forwardRef<HTMLLabelElement, FormControlLabelProps>(
  (props, ref) => <FormControlLabel ref={ref} {...props} />
);

RadioLabel.displayName = 'RadioLabel';