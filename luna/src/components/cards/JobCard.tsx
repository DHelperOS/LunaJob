import type { CardProps } from '@mui/material/Card';

import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export interface JobCardData {
  id: string;
  title: string;
  createdAt: Date | string;
  company: {
    name: string;
    logo: string;
  };
  candidates?: any[];
  experience: string;
  employmentTypes: string[];
  salary: {
    price?: number;
    min?: number;
    max?: number;
    negotiable: boolean;
  };
  role: string;
}

type Props = CardProps & {
  job: JobCardData;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  editHref?: string;
  detailsHref?: string;
};

export function JobCard({ 
  job, 
  onView,
  onEdit, 
  onDelete, 
  editHref, 
  detailsHref, 
  sx, 
  ...other 
}: Props) {
  const menuActions = usePopover();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        {(detailsHref || onView) && (
          <li>
            <MenuItem 
              component={detailsHref ? RouterLink : 'div'} 
              href={detailsHref} 
              onClick={() => {
                menuActions.onClose();
                onView?.();
              }}
            >
              <Iconify icon="solar:eye-bold" />
              View
            </MenuItem>
          </li>
        )}

        {(editHref || onEdit) && (
          <li>
            <MenuItem 
              component={editHref ? RouterLink : 'div'} 
              href={editHref} 
              onClick={() => {
                menuActions.onClose();
                onEdit?.();
              }}
            >
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>
          </li>
        )}

        {onDelete && (
          <MenuItem
            onClick={() => {
              menuActions.onClose();
              onDelete();
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

  const showMenu = onView || onEdit || onDelete || detailsHref || editHref;

  return (
    <>
      <Card sx={sx} {...other}>
        {showMenu && (
          <IconButton onClick={menuActions.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        )}

        <Box sx={{ p: 3, pb: 2 }}>
          <Avatar
            alt={job.company.name}
            src={job.company.logo}
            variant="rounded"
            sx={{ width: 48, height: 48, mb: 2 }}
          />

          <ListItemText
            sx={{ mb: 1 }}
            primary={
              detailsHref ? (
                <Link component={RouterLink} href={detailsHref} color="inherit">
                  {job.title}
                </Link>
              ) : (
                job.title
              )
            }
            secondary={`Posted date: ${fDate(job.createdAt)}`}
            slotProps={{
              primary: { sx: { typography: 'subtitle1' } },
              secondary: {
                sx: { mt: 1, typography: 'caption', color: 'text.disabled' },
              },
            }}
          />

          {job.candidates && (
            <Box
              sx={{
                gap: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                typography: 'caption',
              }}
            >
              <Iconify width={16} icon="solar:users-group-rounded-bold" />
              {job.candidates.length} candidates
            </Box>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          sx={{
            p: 3,
            rowGap: 1.5,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {[
            {
              label: job.experience,
              icon: <Iconify width={16} icon="carbon:skill-level-basic" sx={{ flexShrink: 0 }} />,
            },
            {
              label: job.employmentTypes.join(', '),
              icon: <Iconify width={16} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
            },
            {
              label: job.salary.negotiable 
                ? 'Negotiable' 
                : job.salary.price 
                  ? fCurrency(job.salary.price)
                  : `${fCurrency(job.salary.min || 0)} - ${fCurrency(job.salary.max || 0)}`,
              icon: <Iconify width={16} icon="solar:wad-of-money-bold" sx={{ flexShrink: 0 }} />,
            },
            {
              label: job.role,
              icon: <Iconify width={16} icon="solar:user-rounded-bold" sx={{ flexShrink: 0 }} />,
            },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                gap: 0.5,
                minWidth: 0,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              {item.icon}
              <Typography variant="caption" noWrap>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>

      {showMenu && renderMenuActions()}
    </>
  );
}