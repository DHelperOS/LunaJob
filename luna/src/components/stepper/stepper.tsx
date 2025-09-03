'use client';

import { forwardRef } from 'react';
import MuiStepper, { StepperProps } from '@mui/material/Stepper';
import MuiStep, { StepProps } from '@mui/material/Step';
import MuiStepLabel, { StepLabelProps } from '@mui/material/StepLabel';
import MuiStepContent, { StepContentProps } from '@mui/material/StepContent';
import MuiStepButton, { StepButtonProps } from '@mui/material/StepButton';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledStepper = styled(MuiStepper)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    '& .MuiStepLabel-iconContainer': {
      '& .MuiSvgIcon-root': {
        fontSize: 24,
      },
    },
  },
}));

// ----------------------------------------------------------------------

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (props, ref) => <StyledStepper ref={ref} {...props} />
);

Stepper.displayName = 'Stepper';

// ----------------------------------------------------------------------

export const Step = forwardRef<HTMLDivElement, StepProps>(
  (props, ref) => <MuiStep ref={ref} {...props} />
);

Step.displayName = 'Step';

// ----------------------------------------------------------------------

export const StepLabel = forwardRef<HTMLDivElement, StepLabelProps>(
  (props, ref) => <MuiStepLabel ref={ref} {...props} />
);

StepLabel.displayName = 'StepLabel';

// ----------------------------------------------------------------------

export const StepContent = forwardRef<HTMLDivElement, StepContentProps>(
  (props, ref) => <MuiStepContent ref={ref} {...props} />
);

StepContent.displayName = 'StepContent';

// ----------------------------------------------------------------------

export const StepButton = forwardRef<HTMLButtonElement, StepButtonProps>(
  (props, ref) => <MuiStepButton ref={ref} {...props} />
);

StepButton.displayName = 'StepButton';