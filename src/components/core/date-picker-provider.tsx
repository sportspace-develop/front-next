'use client';

import { ru } from 'date-fns/locale';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

export interface DatePickerProviderProps {
  children: React.ReactNode;
}

function DatePickerProvider({ children }: DatePickerProviderProps): React.JSX.Element {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      {children}
    </LocalizationProvider>
  );
}

export default DatePickerProvider;
