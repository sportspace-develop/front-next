'use client';

import localeRu from 'date-fns/locale/ru';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

export interface DatePickerProviderProps {
  children: React.ReactNode;
}

function DatePickerProvider({ children }: DatePickerProviderProps): React.JSX.Element {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeRu}>
      {children}
    </LocalizationProvider>
  );
}

export default DatePickerProvider;
