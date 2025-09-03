'use client';

import { forwardRef } from 'react';
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledTooltip = styled(MuiTooltip)(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
  },
  '& .MuiTooltip-arrow': {
    color: theme.palette.grey[800],
  },
}));

// ----------------------------------------------------------------------

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => <StyledTooltip ref={ref} {...props} />
);

Tooltip.displayName = 'Tooltip';