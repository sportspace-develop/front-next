import { parseISO } from 'date-fns';

import { Typography } from '@mui/material';
// eslint-disable-next-line no-restricted-imports
import { Variant } from '@mui/material/styles/createTypography';

import formatDate from '@/lib/format-date';

const DateTimePeriod = ({
  startDate,
  endDate,
  format = 'd MMMM yyyy',
  variant = 'body1',
}: {
  startDate?: string;
  endDate?: string;
  format?: string;
  variant?: Variant;
}) => {
  return (
    <Typography color="text.secondary" variant={variant}>
      {startDate && formatDate(parseISO(startDate), { format })}
      {startDate && endDate && ' - '}
      {endDate && formatDate(parseISO(endDate), { format })}
    </Typography>
  );
};

export default DateTimePeriod;
