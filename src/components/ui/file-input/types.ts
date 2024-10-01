import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

type TextFieldProps = Omit<
  MuiTextFieldProps,
  'onChange' | 'select' | 'type' | 'multiline' | 'defaultValue'
>;

type MultipleOrSingleFile =
  | {
      value?: File | null;
      onChange?: (value: File | null) => void;
      multiple?: false | undefined;
    }
  | {
      value?: File[];
      onChange?: (value: File[]) => void;
      multiple: true;
    };

export type FileInputProps = TextFieldProps & MultipleOrSingleFile;
