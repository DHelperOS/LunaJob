'use client';

import { forwardRef } from 'react';
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline';
import MuiTimelineItem, { TimelineItemProps } from '@mui/lab/TimelineItem';
import MuiTimelineSeparator, { TimelineSeparatorProps } from '@mui/lab/TimelineSeparator';
import MuiTimelineConnector, { TimelineConnectorProps } from '@mui/lab/TimelineConnector';
import MuiTimelineContent, { TimelineContentProps } from '@mui/lab/TimelineContent';
import MuiTimelineDot, { TimelineDotProps } from '@mui/lab/TimelineDot';
import MuiTimelineOppositeContent, { TimelineOppositeContentProps } from '@mui/lab/TimelineOppositeContent';

// ----------------------------------------------------------------------

export const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  (props, ref) => <MuiTimeline ref={ref} {...props} />
);

Timeline.displayName = 'Timeline';

// ----------------------------------------------------------------------

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  (props, ref) => <MuiTimelineItem ref={ref} {...props} />
);

TimelineItem.displayName = 'TimelineItem';

// ----------------------------------------------------------------------

export const TimelineSeparator = forwardRef<HTMLDivElement, TimelineSeparatorProps>(
  (props, ref) => <MuiTimelineSeparator ref={ref} {...props} />
);

TimelineSeparator.displayName = 'TimelineSeparator';

// ----------------------------------------------------------------------

export const TimelineConnector = forwardRef<HTMLSpanElement, TimelineConnectorProps>(
  (props, ref) => <MuiTimelineConnector ref={ref} {...props} />
);

TimelineConnector.displayName = 'TimelineConnector';

// ----------------------------------------------------------------------

export const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>(
  (props, ref) => <MuiTimelineContent ref={ref} {...props} />
);

TimelineContent.displayName = 'TimelineContent';

// ----------------------------------------------------------------------

export const TimelineDot = forwardRef<HTMLSpanElement, TimelineDotProps>(
  (props, ref) => <MuiTimelineDot ref={ref} {...props} />
);

TimelineDot.displayName = 'TimelineDot';

// ----------------------------------------------------------------------

export const TimelineOppositeContent = forwardRef<HTMLDivElement, TimelineOppositeContentProps>(
  (props, ref) => <MuiTimelineOppositeContent ref={ref} {...props} />
);

TimelineOppositeContent.displayName = 'TimelineOppositeContent';