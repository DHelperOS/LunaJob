import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export interface KanbanCardData {
  id: string;
  name: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: Array<{
    id: string;
    name: string;
    avatarUrl: string;
  }>;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    preview?: string;
  }>;
  comments?: Array<{
    id: string;
    message: string;
    createdAt: Date | string;
    author: {
      id: string;
      name: string;
      avatarUrl: string;
    };
  }>;
  dueDate?: Date | string;
  labels?: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

type Props = CardProps & {
  task: KanbanCardData;
  onClick?: () => void;
  isDragging?: boolean;
  showImage?: boolean;
  showLabels?: boolean;
  showStats?: boolean;
};

export function KanbanCard({ 
  task, 
  onClick,
  isDragging = false,
  showImage = true,
  showLabels = true,
  showStats = true,
  sx, 
  ...other 
}: Props) {
  const hasAttachments = task.attachments && task.attachments.length > 0;
  const hasComments = task.comments && task.comments.length > 0;
  const hasAssignee = task.assignee && task.assignee.length > 0;
  const previewImage = hasAttachments ? task.attachments.find(att => att.preview)?.preview : null;

  const getPriorityColor = (priority: KanbanCardData['priority']) => {
    switch (priority) {
      case 'high':
        return 'error.main';
      case 'medium':
        return 'warning.main';
      case 'low':
        return 'success.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Card
      sx={[
        {
          cursor: 'pointer',
          borderRadius: 2,
          boxShadow: (theme) => theme.customShadows.z1,
          opacity: isDragging ? 0.5 : 1,
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z8,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      onClick={onClick}
      {...other}
    >
      {/* Preview Image */}
      {showImage && previewImage && (
        <Box
          component="img"
          src={previewImage}
          alt={task.name}
          sx={{
            width: 1,
            height: 160,
            objectFit: 'cover',
            borderRadius: '8px 8px 0 0',
          }}
        />
      )}

      <Box sx={{ p: 2 }}>
        {/* Priority Indicator */}
        <Box
          sx={{
            mb: 1,
            width: 4,
            height: 16,
            borderRadius: 0.5,
            bgcolor: getPriorityColor(task.priority),
          }}
        />

        {/* Labels */}
        {showLabels && task.labels && task.labels.length > 0 && (
          <Box sx={{ mb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {task.labels.map((label) => (
              <Chip
                key={label.id}
                size="small"
                label={label.name}
                sx={{
                  height: 20,
                  fontSize: 11,
                  bgcolor: label.color,
                  color: 'white',
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            ))}
          </Box>
        )}

        {/* Task Name */}
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            lineHeight: 1.4,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {task.name}
        </Typography>

        {/* Stats and Assignee */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Stats */}
          {showStats && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {hasComments && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <Iconify
                    width={14}
                    icon="solar:chat-round-dots-bold"
                    sx={{ color: 'text.secondary' }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {task.comments?.length}
                  </Typography>
                </Box>
              )}

              {hasAttachments && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <Iconify
                    width={14}
                    icon="solar:paperclip-bold"
                    sx={{ color: 'text.secondary' }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {task.attachments?.length}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Assignee */}
          {hasAssignee && (
            <AvatarGroup
              max={3}
              sx={{
                '& .MuiAvatar-root': {
                  width: 24,
                  height: 24,
                  fontSize: 10,
                },
              }}
            >
              {task.assignee?.map((person) => (
                <Avatar
                  key={person.id}
                  alt={person.name}
                  src={person.avatarUrl}
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                />
              ))}
            </AvatarGroup>
          )}
        </Box>
      </Box>
    </Card>
  );
}