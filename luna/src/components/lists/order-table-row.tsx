import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export interface OrderTableRowData {
  id: string;
  orderNumber: string;
  createdAt: Date | string;
  totalQuantity: number;
  subtotal: number;
  status: 'completed' | 'pending' | 'cancelled';
  customer: {
    name: string;
    email: string;
    avatarUrl: string;
  };
  items: Array<{
    id: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    coverUrl: string;
  }>;
}

type Props = {
  row: OrderTableRowData;
  selected: boolean;
  detailsHref?: string;
  onSelectRow?: () => void;
  onDeleteRow?: () => void;
  onViewDetails?: (orderId: string) => void;
  showCheckbox?: boolean;
  showExpandable?: boolean;
  customActions?: Array<{
    label: string;
    icon: string;
    onClick: (row: OrderTableRowData) => void;
    color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  }>;
};

export function OrderTableRow({ 
  row, 
  selected,
  detailsHref,
  onSelectRow, 
  onDeleteRow,
  onViewDetails,
  showCheckbox = true,
  showExpandable = true,
  customActions = []
}: Props) {
  const confirmDialog = useBoolean();
  const menuActions = usePopover();
  const collapseRow = useBoolean();

  const handleDelete = () => {
    confirmDialog.onFalse();
    if (onDeleteRow) {
      onDeleteRow();
    }
  };

  const handleViewDetails = () => {
    menuActions.onClose();
    if (onViewDetails) {
      onViewDetails(row.id);
    }
  };

  const getStatusColor = (status: OrderTableRowData['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const renderPrimaryRow = () => (
    <TableRow hover selected={selected}>
      {showCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onChange={onSelectRow}
            slotProps={{
              input: {
                id: `${row.id}-checkbox`,
                'aria-label': `Order ${row.orderNumber} checkbox`,
              },
            }}
          />
        </TableCell>
      )}

      <TableCell>
        {detailsHref ? (
          <Link component={RouterLink} href={detailsHref} color="inherit" underline="always">
            {row.orderNumber}
          </Link>
        ) : (
          <Box component="span">{row.orderNumber}</Box>
        )}
      </TableCell>

      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar alt={row.customer.name} src={row.customer.avatarUrl} />
          <ListItemText
            primary={row.customer.name}
            secondary={row.customer.email}
            slotProps={{
              primary: {
                sx: { typography: 'body2' },
              },
              secondary: {
                sx: { color: 'text.disabled' },
              },
            }}
          />
        </Box>
      </TableCell>

      <TableCell>
        <ListItemText
          primary={fDate(row.createdAt)}
          secondary={fTime(row.createdAt)}
          slotProps={{
            primary: {
              noWrap: true,
              sx: { typography: 'body2' },
            },
            secondary: {
              sx: { mt: 0.5, typography: 'caption' },
            },
          }}
        />
      </TableCell>

      <TableCell align="center"> {row.totalQuantity} </TableCell>

      <TableCell> {fCurrency(row.subtotal)} </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={getStatusColor(row.status) as any}
        >
          {row.status}
        </Label>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {showExpandable && row.items.length > 0 && (
          <IconButton
            color={collapseRow.value ? 'inherit' : 'default'}
            onClick={collapseRow.onToggle}
            sx={{ ...(collapseRow.value && { bgcolor: 'action.hover' }) }}
          >
            <Iconify 
              icon="eva:arrow-ios-downward-fill" 
              sx={{
                transform: collapseRow.value ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </IconButton>
        )}

        <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondaryRow = () => (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapseRow.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            {row.items.map((item) => (
              <Box
                key={item.id}
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  p: theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: `solid 2px ${theme.vars.palette.background.neutral}`,
                  },
                })}
              >
                <Avatar
                  src={item.coverUrl}
                  variant="rounded"
                  sx={{ width: 48, height: 48, mr: 2 }}
                />

                <ListItemText
                  primary={item.name}
                  secondary={item.sku}
                  slotProps={{
                    primary: { sx: { typography: 'body2' } },
                    secondary: { sx: { color: 'text.disabled' } },
                  }}
                />

                <div>x{item.quantity}</div>

                <Box sx={{ width: 110, textAlign: 'right' }}>{fCurrency(item.price)}</Box>
              </Box>
            ))}
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        {detailsHref && (
          <li>
            <MenuItem component={RouterLink} href={detailsHref} onClick={menuActions.onClose}>
              <Iconify icon="solar:eye-bold" />
              View
            </MenuItem>
          </li>
        )}

        {onViewDetails && (
          <MenuItem onClick={handleViewDetails}>
            <Iconify icon="solar:eye-bold" />
            View Details
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
      title="Delete Order"
      content={`Are you sure want to delete order "${row.orderNumber}"?`}
      action={
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      {renderPrimaryRow()}
      {showExpandable && renderSecondaryRow()}
      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}