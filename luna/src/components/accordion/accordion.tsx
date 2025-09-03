'use client';

import { forwardRef } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledAccordion = styled(MuiAccordion)(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 'auto',
  },
  '& .MuiAccordionSummary-root': {
    minHeight: 56,
    '&.Mui-expanded': {
      minHeight: 56,
    },
  },
  '& .MuiAccordionDetails-root': {
    padding: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => <StyledAccordion ref={ref} {...props} />
);

Accordion.displayName = 'Accordion';

// ----------------------------------------------------------------------

export const AccordionSummary = forwardRef<HTMLDivElement, AccordionSummaryProps>(
  ({ expandIcon = <ExpandMoreIcon />, ...other }, ref) => (
    <MuiAccordionSummary ref={ref} expandIcon={expandIcon} {...other} />
  )
);

AccordionSummary.displayName = 'AccordionSummary';

// ----------------------------------------------------------------------

export const AccordionDetails = forwardRef<HTMLDivElement, AccordionDetailsProps>(
  (props, ref) => <MuiAccordionDetails ref={ref} {...props} />
);

AccordionDetails.displayName = 'AccordionDetails';