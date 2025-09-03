import type { CardProps } from '@mui/material/Card';
import type { IJobItem } from 'src/types/job';

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

type Props = CardProps & {
  job: IJobItem;
  editHref: string;
  detailsHref: string;
  onDelete: () => void;
};

export function JobItem({ job, editHref, detailsHref, onDelete, sx, ...other }: Props) {
  const menuActions = usePopover();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <li>
          <MenuItem component={RouterLink} href={detailsHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
        </li>

        <li>
          <MenuItem component={RouterLink} href={editHref} onClick={() => menuActions.onClose()}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </li>

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
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Card sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', ...sx }} {...other}>
        {/* Card Header with Menu */}
        <Box sx={{ 
          p: 2.5, 
          pb: 0,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <Avatar
            alt={job.company.name}
            src={job.company.logo}
            variant="rounded"
            sx={{ 
              width: 56, 
              height: 56,
              bgcolor: 'background.neutral',
              border: '1px solid',
              borderColor: 'divider'
            }}
          />
          
          <IconButton 
            onClick={menuActions.onOpen} 
            sx={{ 
              ml: 'auto',
              flexShrink: 0
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>

        {/* Company and Title */}
        <Box sx={{ p: 2.5, pt: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Link 
            component={RouterLink} 
            href={detailsHref} 
            color="inherit" 
            variant="h6" 
            sx={{ 
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {job.title}
          </Link>

          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              mb: 1.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {job.company.name}
          </Typography>

          {/* Location and Experience */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            alignItems: 'center', 
            gap: 2,
            mb: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
              <Iconify icon="solar:map-point-bold" width={16} sx={{ color: 'text.secondary', flexShrink: 0 }} />
              <Typography variant="caption" sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {job.locations.join(', ')}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
              <Iconify icon="carbon:skill-level-basic" width={16} sx={{ color: 'text.secondary', flexShrink: 0 }} />
              <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                {`${job.experience} exp`}
              </Typography>
            </Box>
          </Box>

          {/* Employment Types */}
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 'auto' }}>
            {job.employmentTypes.map((type) => (
              <Typography 
                key={type} 
                variant="caption" 
                sx={{ 
                  px: 0.75,
                  py: 0.25,
                  bgcolor: 'background.neutral',
                  borderRadius: 0.5,
                  color: 'text.secondary'
                }}
              >
                {type}
              </Typography>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* Footer with Date and Salary */}
        <Box sx={{ 
          p: 2.5,
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {fDate(job.createdAt)}
          </Typography>

          <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
            {typeof job.salary === 'object' 
              ? `${fCurrency(job.salary.min)}~${fCurrency(job.salary.max)}만원`
              : typeof job.salary === 'number' 
              ? fCurrency(job.salary) 
              : job.salary}
          </Typography>
        </Box>
      </Card>

      {renderMenuActions()}
    </>
  );
}