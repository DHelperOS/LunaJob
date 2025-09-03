import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  numSelected: number;
  filterName: string;
  onFilterName: (value: string) => void;
  onDeleteRows?: () => void;
  placeholder?: string;
};

export function TableToolbar({
  numSelected,
  filterName,
  onFilterName,
  onDeleteRows,
  placeholder = 'Search...',
}: Props) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={(e) => onFilterName(e.target.value)}
          placeholder={placeholder}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="solar:magnifer-bold-duotone"
                sx={{ color: 'text.disabled' }}
              />
            </InputAdornment>
          }
          sx={{ width: 240 }}
        />
      )}

      {numSelected > 0 ? (
        onDeleteRows && (
          <Tooltip title="Delete">
            <IconButton onClick={onDeleteRows}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="solar:filter-bold" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}