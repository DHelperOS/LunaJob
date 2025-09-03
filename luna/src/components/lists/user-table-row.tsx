import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export interface UserTableRowData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  role: string;
  status: 'active' | 'pending' | 'banned';
  avatarUrl: string;
}

type Props = {
  row: UserTableRowData;
  selected: boolean;
  editHref?: string;
  onSelectRow?: () => void;
  onDeleteRow?: () => void;
  onEditRow?: (id: string) => void;
  showActions?: boolean;
  showCheckbox?: boolean;
  customActions?: Array<{
    label: string;
    icon: string;
    onClick: (row: UserTableRowData) => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  }>;
};

export function UserTableRow({ 
  row, 
  selected,
  editHref,
  onSelectRow, 
  onDeleteRow,
  onEditRow,
  showActions = true,
  showCheckbox = true,
  customActions = []
}: Props) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();

  const handleEdit = () => {
    menuActions.onClose();
    if (onEditRow) {
      onEditRow(row.id);
    }
  };

  const handleDelete = () => {
    confirmDialog.onFalse();
    if (onDeleteRow) {
      onDeleteRow();
    }
  };

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        {editHref && (
          <li>
            <MenuItem component={RouterLink} href={editHref} onClick={menuActions.onClose}>
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>
          </li>
        )}

        {onEditRow && (
          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        )}

        {customActions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick(row);
              menuActions.onClose();
            }}
            sx={action.color === 'error' ? { color: 'error.main' } : undefined}
          >
            <Iconify icon={action.icon} />
            {action.label}
          </MenuItem>
        ))}

        {onDeleteRow && (
          <MenuItem
            onClick={() => {
              confirmDialog.onTrue();
              menuActions.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        )}
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={`Are you sure want to delete "${row.name}"?`}
      action={
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      }
    />
  );

  const getStatusColor = (status: UserTableRowData['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'banned':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={selected}
              onChange={onSelectRow}
              slotProps={{
                input: {
                  id: `${row.id}-checkbox`,
                  'aria-label': `${row.name} checkbox`,
                },
              }}
            />
          </TableCell>
        )}

        <TableCell>
          <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar alt={row.name} src={row.avatarUrl} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              {editHref ? (
                <Link
                  component={RouterLink}
                  href={editHref}
                  color="inherit"
                  sx={{ cursor: 'pointer' }}
                >
                  {row.name}
                </Link>
              ) : (
                <Box component="span">{row.name}</Box>
              )}
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row.email}
              </Box>
            </Stack>
          </Box>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.phoneNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.company}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.role}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={getStatusColor(row.status) as any}
          >
            {row.status}
          </Label>
        </TableCell>

        {showActions && (
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {onEditRow && (
                <Tooltip title="Quick edit" placement="top" arrow>
                  <IconButton
                    onClick={() => onEditRow(row.id)}
                  >
                    <Iconify icon="solar:pen-bold" />
                  </IconButton>
                </Tooltip>
              )}

              <IconButton
                color={menuActions.open ? 'inherit' : 'default'}
                onClick={menuActions.onOpen}
              >
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </Box>
          </TableCell>
        )}
      </TableRow>

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}