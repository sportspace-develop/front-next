import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

type TextFieldProps = Omit<MuiTextFieldProps, 'onChange' | 'select' | 'type' | 'defaultValue'>;

export type FileInputProps = TextFieldProps & {
  value?: string;
  onChange: (value?: string) => void;
  onUnload: (file: File) => Promise<string | undefined>;
};
