import type { Theme, SxProps } from '@mui/material/styles';

import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  numSelected: number;
  filterName: string;
  placeholder?: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteRows?: () => void;
  actions?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export function TableToolbar({
  numSelected,
  filterName,
  placeholder = 'Search...',
  onFilterName,
  onDeleteRows,
  actions,
  sx,
}: Props) {
  const handleClearFilter = useCallback(() => {
    onFilterName({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  }, [onFilterName]);

  return (
    <Toolbar
      sx={[
        (theme) => ({
          height: 96,
          display: 'flex',
          justifyContent: 'space-between',
          p: theme.spacing(0, 1, 0, 3),
          ...(numSelected > 0 && {
            bgcolor: 'primary.lighter',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          endAdornment={
            filterName && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearFilter} edge="end">
                  <Iconify icon="eva:close-fill" sx={{ color: 'text.disabled' }} />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      )}

      {numSelected > 0 ? (
        <Stack direction="row" spacing={1}>
          {onDeleteRows && (
            <Tooltip title="Delete">
              <IconButton onClick={onDeleteRows}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          )}
          {actions}
        </Stack>
      ) : (
        actions && <Stack direction="row" spacing={1}>{actions}</Stack>
      )}
    </Toolbar>
  );
}

// ----------------------------------------------------------------------

type SimpleToolbarProps = {
  title?: string;
  searchValue: string;
  searchPlaceholder?: string;
  onSearchChange: (value: string) => void;
  actions?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export function SimpleTableToolbar({
  title,
  searchValue,
  searchPlaceholder = 'Search...',
  onSearchChange,
  actions,
  sx,
}: SimpleToolbarProps) {
  const handleClearSearch = useCallback(() => {
    onSearchChange('');
  }, [onSearchChange]);

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={[
        {
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {title && (
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      )}

      <Stack direction="row" spacing={1} flexShrink={0} sx={{ width: { xs: 1, md: 'auto' } }}>
        <TextField
          fullWidth
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: searchValue && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} edge="end">
                    <Iconify icon="eva:close-fill" sx={{ color: 'text.disabled' }} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {actions}
      </Stack>
    </Stack>
  );
}