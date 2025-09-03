'use client';

import { forwardRef } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';
import MuiButtonGroup, { ButtonGroupProps } from '@mui/material/ButtonGroup';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
}));

const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
}));

// ----------------------------------------------------------------------

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <StyledButton ref={ref} {...props} />
);

Button.displayName = 'Button';

// ----------------------------------------------------------------------

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => <StyledIconButton ref={ref} {...props} />
);

IconButton.displayName = 'IconButton';

// ----------------------------------------------------------------------

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (props, ref) => <MuiButtonGroup ref={ref} {...props} />
);

ButtonGroup.displayName = 'ButtonGroup';

// ----------------------------------------------------------------------

export const LoadButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (props, ref) => <StyledLoadingButton ref={ref} {...props} />
);

LoadButton.displayName = 'LoadButton';