import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export interface OrderSummaryData {
  subtotal: number;
  discount?: number;
  shipping?: number;
  tax?: number;
  total: number;
  items?: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

type Props = {
  data: OrderSummaryData;
  showDiscountField?: boolean;
  onApplyDiscount?: (code: string) => void;
  onCheckout?: () => void;
};

export function OrderSummary({
  data,
  showDiscountField = false,
  onApplyDiscount,
  onCheckout,
}: Props) {
  const { subtotal, discount = 0, shipping = 0, tax = 0, total, items = [] } = data;

  return (
    <Card>
      <CardHeader title="주문 요약" />

      <CardContent>
        <Stack spacing={2}>
          {/* Items List */}
          {items.length > 0 && (
            <>
              <Stack spacing={1}>
                {items.map((item, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    sx={{ typography: 'body2' }}
                  >
                    <Box sx={{ color: 'text.secondary' }}>
                      {item.name} x {item.quantity}
                    </Box>
                    <Box>{fCurrency(item.price * item.quantity)}</Box>
                  </Stack>
                ))}
              </Stack>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </>
          )}

          {/* Price Breakdown */}
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                소계
              </Typography>
              <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
            </Stack>

            {discount > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  할인
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                  -{fCurrency(discount)}
                </Typography>
              </Stack>
            )}

            {shipping > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  배송비
                </Typography>
                <Typography variant="subtitle2">{fCurrency(shipping)}</Typography>
              </Stack>
            )}

            {tax > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  세금
                </Typography>
                <Typography variant="subtitle2">{fCurrency(tax)}</Typography>
              </Stack>
            )}
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* Total */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">총 금액</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(total)}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (VAT 포함)
              </Typography>
            </Box>
          </Stack>

          {/* Discount Code */}
          {showDiscountField && onApplyDiscount && (
            <>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <TextField
                fullWidth
                placeholder="할인 코드 입력"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={() => {
                          const input = document.querySelector<HTMLInputElement>(
                            'input[placeholder="할인 코드 입력"]'
                          );
                          if (input?.value) {
                            onApplyDiscount(input.value);
                          }
                        }}
                      >
                        적용
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          {/* Checkout Button */}
          {onCheckout && (
            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<Iconify icon="solar:cart-check-bold" />}
              onClick={onCheckout}
            >
              결제하기
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}