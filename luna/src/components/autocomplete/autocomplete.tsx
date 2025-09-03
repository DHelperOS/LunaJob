'use client';

import { forwardRef } from 'react';
import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledAutocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: theme.shape.borderRadius,
  },
  '& .MuiAutocomplete-tag': {
    margin: 2,
  },
  '& .MuiAutocomplete-listbox': {
    padding: theme.spacing(0.5, 0),
    '& .MuiAutocomplete-option': {
      padding: theme.spacing(1, 2),
      '&[aria-selected="true"]': {
        backgroundColor: theme.palette.action.selected,
      },
    },
  },
})) as typeof MuiAutocomplete;

// ----------------------------------------------------------------------

interface CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  renderInput?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['renderInput'];
}

export const Autocomplete = forwardRef<
  HTMLDivElement,
  CustomAutocompleteProps<any, any, any, any>
>(({ label, placeholder, helperText, error, renderInput, ...other }, ref) => (
  <StyledAutocomplete
    ref={ref}
    renderInput={
      renderInput ||
      ((params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={error}
        />
      ))
    }
    {...other}
  />
)) as <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
    ref?: React.Ref<HTMLDivElement>;
  }
) => JSX.Element;

Autocomplete.displayName = 'Autocomplete';