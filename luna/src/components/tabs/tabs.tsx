'use client';

import { forwardRef } from 'react';
import MuiTabs, { TabsProps } from '@mui/material/Tabs';
import MuiTab, { TabProps } from '@mui/material/Tab';
import MuiTabPanel from '@mui/lab/TabPanel';
import MuiTabContext, { TabContextProps } from '@mui/lab/TabContext';
import MuiTabList from '@mui/lab/TabList';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  minHeight: 48,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledTab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
}));

// ----------------------------------------------------------------------

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (props, ref) => <StyledTabs ref={ref} {...props} />
);

Tabs.displayName = 'Tabs';

// ----------------------------------------------------------------------

export const Tab = forwardRef<HTMLDivElement, TabProps>(
  (props, ref) => <StyledTab ref={ref} {...props} />
);

Tab.displayName = 'Tab';

// ----------------------------------------------------------------------

export const TabPanel = MuiTabPanel;
export const TabContext = MuiTabContext;
export const TabList = MuiTabList;