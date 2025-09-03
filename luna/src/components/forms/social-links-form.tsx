import type { CardProps } from '@mui/material/Card';

import { useForm } from 'react-hook-form';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export interface SocialLinksData {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

interface SocialPlatform {
  key: string;
  label: string;
  icon: string;
  placeholder?: string;
}

type Props = CardProps & {
  socialLinks: SocialLinksData;
  onSubmit?: (data: SocialLinksData) => void | Promise<void>;
  submitLabel?: string;
  platforms?: SocialPlatform[];
  showCard?: boolean;
};

const DEFAULT_PLATFORMS: SocialPlatform[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    icon: 'socials:facebook',
    placeholder: 'https://facebook.com/username',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: 'socials:instagram',
    placeholder: 'https://instagram.com/username',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: 'socials:linkedin',
    placeholder: 'https://linkedin.com/in/username',
  },
  {
    key: 'twitter',
    label: 'Twitter',
    icon: 'socials:twitter',
    placeholder: 'https://twitter.com/username',
  },
];

export function SocialLinksForm({ 
  socialLinks,
  onSubmit,
  submitLabel = 'Save changes',
  platforms = DEFAULT_PLATFORMS,
  showCard = true,
  sx,
  ...other 
}: Props) {
  const defaultValues: SocialLinksData = platforms.reduce((acc, platform) => {
    acc[platform.key] = '';
    return acc;
  }, {} as SocialLinksData);

  const methods = useForm({
    defaultValues,
    values: socialLinks,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success('Social links updated!');
      }
    } catch (error) {
      console.error('Error updating social links:', error);
      toast.error('Failed to update social links');
    }
  });

  const renderForm = () => (
    <Form methods={methods} onSubmit={handleFormSubmit}>
      <div
        style={{
          padding: showCard ? 0 : undefined,
          gap: 24,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {platforms.map((platform) => (
          <Field.Text
            key={platform.key}
            name={platform.key}
            label={platform.label}
            placeholder={platform.placeholder}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify width={24} icon={platform.icon as any} />
                  </InputAdornment>
                ),
              },
            }}
          />
        ))}

        <Button 
          type="submit" 
          variant="contained" 
          loading={isSubmitting} 
          sx={{ alignSelf: 'flex-end' }}
        >
          {submitLabel}
        </Button>
      </div>
    </Form>
  );

  if (!showCard) {
    return renderForm();
  }

  return (
    <Card
      sx={[
        {
          p: 3,
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {renderForm()}
    </Card>
  );
}