import { parseISO } from 'date-fns';

import { Typography } from '@mui/material';

import formatDate from '@/lib/format-date';

const DateTimePeriod = ({
  startDate,
  endDate,
  format = 'd MMMM yyyy',
  isSmall,
}: {
  startDate?: string;
  endDate?: string;
  format?: string;
  isSmall?: boolean;
}) => {
  return (
    <Typography color="text.secondary" variant={isSmall ? 'caption' : 'body1'}>
      {startDate && formatDate(parseISO(startDate), { format })}
      {startDate && endDate && ' - '}
      {endDate && formatDate(parseISO(endDate), { format })}
    </Typography>
  );
};

export default DateTimePeriod;
