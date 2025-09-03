'use client';

import { forwardRef } from 'react';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none',
  },
}));

// ----------------------------------------------------------------------

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (props, ref) => <StyledDrawer ref={ref} {...props} />
);

Drawer.displayName = 'Drawer';