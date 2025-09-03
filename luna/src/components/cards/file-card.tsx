import type { CardProps } from '@mui/material/Card';

import { useState, useCallback } from 'react';
import { useBoolean, usePopover, useCopyToClipboard } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';
import { FileThumbnail } from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

export interface FileCardData {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  modifiedAt: Date | string;
  isFavorited: boolean;
  shared?: Array<{
    id: string;
    name: string;
    avatarUrl: string;
  }>;
}

type Props = CardProps & {
  file: FileCardData;
  selected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  onShare?: (file: FileCardData) => void;
  onDetails?: (file: FileCardData) => void;
  showActions?: boolean;
  showShared?: boolean;
};

export function FileCard({
  file,
  selected = false,
  onSelect,
  onDelete,
  onShare,
  onDetails,
  showActions = true,
  showShared = true,
  sx,
  ...other
}: Props) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();
  const favorite = useBoolean(file.isFavorited);
  const hovering = useBoolean();

  const { copy } = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    toast.success('Copied!');
    copy(file.url);
  }, [copy, file.url]);

  const handleDetails = useCallback(() => {
    if (onDetails) {
      onDetails(file);
    }
  }, [file, onDetails]);

  const handleShare = useCallback(() => {
    menuActions.onClose();
    if (onShare) {
      onShare(file);
    }
  }, [file, onShare, menuActions]);

  const handleDelete = useCallback(() => {
    confirmDialog.onFalse();
    if (onDelete) {
      onDelete();
    }
  }, [confirmDialog, onDelete]);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem
          onClick={() => {
            menuActions.onClose();
            handleCopy();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Copy Link
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

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
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={`Are you sure want to delete "${file.name}"?`}
      action={
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <Card
        sx={[
          {
            position: 'relative',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: selected ? 'primary.main' : 'divider',
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z12,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        onMouseEnter={hovering.onTrue}
        onMouseLeave={hovering.onFalse}
        {...other}
      >
        <CardActionArea onClick={handleDetails} sx={{ p: 2.5 }}>
          <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', mb: 2 }}>
            {hovering.value && onSelect && (
              <Checkbox
                checked={selected}
                onChange={onSelect}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  top: 8,
                  left: 8,
                  zIndex: 9,
                  position: 'absolute',
                }}
              />
            )}

            <FileThumbnail
              file={file.type}
              sx={{
                width: 64,
                height: 64,
              }}
            />
          </Box>

          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              mb: 0.5,
              textAlign: 'center',
            }}
          >
            {file.name}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              display: 'block',
            }}
          >
            {fData(file.size)}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              display: 'block',
            }}
          >
            {fDateTime(file.modifiedAt)}
          </Typography>
        </CardActionArea>

        {showShared && file.shared && file.shared.length > 0 && (
          <Box
            sx={{
              px: 2,
              pb: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {file.shared.slice(0, 3).map((person) => (
                <Avatar
                  key={person.id}
                  alt={person.name}
                  src={person.avatarUrl}
                  sx={{
                    width: 24,
                    height: 24,
                    ml: -0.5,
                    border: (theme) => `solid 2px ${theme.vars.palette.background.paper}`,
                  }}
                />
              ))}
              {file.shared.length > 3 && (
                <Typography variant="caption" sx={{ ml: 0.5, color: 'text.secondary' }}>
                  +{file.shared.length - 3}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {showActions && (
          <Box
            sx={{
              top: 8,
              right: 8,
              position: 'absolute',
              display: 'flex',
              gap: 0.5,
            }}
          >
            <IconButton
              size="small"
              color={favorite.value ? 'warning' : 'default'}
              onClick={(e) => {
                e.stopPropagation();
                favorite.onToggle();
              }}
            >
              <Iconify icon="eva:heart-fill" />
            </IconButton>

            <IconButton
              size="small"
              color={menuActions.open ? 'inherit' : 'default'}
              onClick={(e) => {
                e.stopPropagation();
                menuActions.onOpen(e);
              }}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Box>
        )}
      </Card>

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}