'use client';

import { forwardRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import MuiAlertTitle, { AlertTitleProps } from '@mui/material/AlertTitle';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledAlert = styled(MuiAlert)(({ theme, severity }) => ({
  borderRadius: theme.shape.borderRadius,
  '& .MuiAlert-icon': {
    fontSize: 24,
  },
  ...(severity === 'info' && {
    backgroundColor: theme.palette.info.lighter,
    color: theme.palette.info.darker,
    '& .MuiAlert-icon': {
      color: theme.palette.info.main,
    },
  }),
  ...(severity === 'success' && {
    backgroundColor: theme.palette.success.lighter,
    color: theme.palette.success.darker,
    '& .MuiAlert-icon': {
      color: theme.palette.success.main,
    },
  }),
  ...(severity === 'warning' && {
    backgroundColor: theme.palette.warning.lighter,
    color: theme.palette.warning.darker,
    '& .MuiAlert-icon': {
      color: theme.palette.warning.main,
    },
  }),
  ...(severity === 'error' && {
    backgroundColor: theme.palette.error.lighter,
    color: theme.palette.error.darker,
    '& .MuiAlert-icon': {
      color: theme.palette.error.main,
    },
  }),
}));

// ----------------------------------------------------------------------

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => <StyledAlert ref={ref} {...props} />
);

Alert.displayName = 'Alert';

// ----------------------------------------------------------------------

export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  (props, ref) => <MuiAlertTitle ref={ref} {...props} />
);

AlertTitle.displayName = 'AlertTitle';