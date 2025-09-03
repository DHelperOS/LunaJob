'use client';

import { forwardRef } from 'react';
import MuiPagination, { PaginationProps } from '@mui/material/Pagination';
import MuiPaginationItem, { PaginationItemProps } from '@mui/material/PaginationItem';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledPagination = styled(MuiPagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: theme.shape.borderRadius,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

// ----------------------------------------------------------------------

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => <StyledPagination ref={ref} {...props} />
);

Pagination.displayName = 'Pagination';

// ----------------------------------------------------------------------

export const PaginationItem = forwardRef<HTMLDivElement, PaginationItemProps>(
  (props, ref) => <MuiPaginationItem ref={ref} {...props} />
);

PaginationItem.displayName = 'PaginationItem';