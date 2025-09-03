'use client';

import { forwardRef } from 'react';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
  '&.MuiCheckbox-indeterminate': {
    color: theme.palette.primary.main,
  },
}));

// ----------------------------------------------------------------------

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => <StyledCheckbox ref={ref} {...props} />
);

Checkbox.displayName = 'Checkbox';

// ----------------------------------------------------------------------

export const CheckboxGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  (props, ref) => <FormGroup ref={ref} {...props} />
);

CheckboxGroup.displayName = 'CheckboxGroup';

// ----------------------------------------------------------------------

export const CheckboxLabel = forwardRef<HTMLLabelElement, FormControlLabelProps>(
  (props, ref) => <FormControlLabel ref={ref} {...props} />
);

CheckboxLabel.displayName = 'CheckboxLabel';