import type { Theme, SxProps } from '@mui/material/styles';
import type { CardProps } from '@mui/material/Card';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export interface OrderSummaryData {
  subtotal: number;
  discount?: number;
  shipping?: number | null;
  tax?: number;
  total: number;
}

type Props = CardProps & {
  data: OrderSummaryData;
  onEdit?: () => void;
  onApplyDiscount?: (code: string) => void;
  showDiscountField?: boolean;
  showEditButton?: boolean;
  title?: string;
  taxLabel?: string;
  shippingFreeLabel?: string;
  vatNote?: string;
};

export function OrderSummary({ 
  data,
  onEdit,
  onApplyDiscount,
  showDiscountField = false,
  showEditButton = true,
  title = 'Order summary',
  taxLabel = 'Tax',
  shippingFreeLabel = 'Free',
  vatNote = '(VAT included if applicable)',
  sx,
  ...other 
}: Props) {
  const [discountCode, setDiscountCode] = useState('');
  
  const { subtotal, discount, shipping, tax, total } = data;

  const displayShipping = shipping === null ? shippingFreeLabel : shipping === 0 ? shippingFreeLabel : fCurrency(shipping);

  const rowStyles: SxProps<Theme> = {
    display: 'flex',
  };

  const handleApplyDiscount = () => {
    if (onApplyDiscount && discountCode.trim()) {
      onApplyDiscount(discountCode.trim());
      setDiscountCode('');
    }
  };

  return (
    <Card sx={[{ mb: 3 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <CardHeader
        title={title}
        action={
          showEditButton && onEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon="solar:pen-bold" />}>
              Edit
            </Button>
          )
        }
      />
      
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={rowStyles}>
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            Subtotal
          </Typography>
          <Typography component="span" variant="subtitle2">
            {fCurrency(subtotal)}
          </Typography>
        </Box>

        <Box sx={rowStyles}>
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            Discount
          </Typography>
          <Typography component="span" variant="subtitle2">
            {discount ? fCurrency(-discount) : '-'}
          </Typography>
        </Box>

        <Box sx={rowStyles}>
          <Typography
            component="span"
            variant="body2"
            sx={{ flexGrow: 1, color: 'text.secondary' }}
          >
            Shipping
          </Typography>
          <Typography component="span" variant="subtitle2">
            {displayShipping}
          </Typography>
        </Box>

        {tax !== undefined && (
          <Box sx={rowStyles}>
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              {taxLabel}
            </Typography>
            <Typography component="span" variant="subtitle2">
              {tax > 0 ? fCurrency(tax) : '-'}
            </Typography>
          </Box>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={rowStyles}>
          <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
            Total
          </Typography>

          <Box sx={{ textAlign: 'right' }}>
            <Typography
              component="span"
              variant="subtitle1"
              sx={{ display: 'block', color: 'error.main' }}
            >
              {fCurrency(total)}
            </Typography>
            {vatNote && (
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                {vatNote}
              </Typography>
            )}
          </Box>
        </Box>

        {showDiscountField && onApplyDiscount && (
          <TextField
            fullWidth
            placeholder="Discount codes / Gifts"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button 
                      color="primary" 
                      onClick={handleApplyDiscount}
                      disabled={!discountCode.trim()}
                      sx={{ mr: -0.5 }}
                    >
                      Apply
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </Stack>
    </Card>
  );
}