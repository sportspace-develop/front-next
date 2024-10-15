import { ControllerFieldState } from 'react-hook-form';

import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

type TextFieldProps = Omit<MuiTextFieldProps, 'onChange' | 'select' | 'type' | 'defaultValue'>;

export type FileInputProps = TextFieldProps & {
  value?: { file?: File | null; url?: string };
  onChange?: (value: { file: File | null; url: string }) => void;
  multiple?: false | undefined;
  fieldState: ControllerFieldState;
};
