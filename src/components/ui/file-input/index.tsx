import * as React from 'react';

import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { X as CloseIcon } from '@phosphor-icons/react/dist/ssr/X';

import { IconButton, InputAdornment, TextField } from '@mui/material';

import Input from './input';
import type { FileInputProps } from './types';

function getFileDetails(file: File) {
  const name = file.name;
  const parts = name.split('.');
  const fileExtension = parts.pop();
  const filenameWithoutExtension = parts.join('.');

  return {
    fileName: filenameWithoutExtension,
    fileExtension,
  };
}

const FileInput = React.forwardRef(
  (props: FileInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      value,
      onChange,
      placeholder = 'Выбрать файл',
      inputProps,
      disabled,
      onUnload,
      ...restTextFieldProps
    } = props;
    const [currentFile, setCurrentFile] = React.useState<File | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;

      if (file) {
        const url = await onUnload(file);

        setCurrentFile(url ? file : null);
        onChange(url);
      }

      if (!file && inputRef.current) {
        inputRef.current.value = '';
        setCurrentFile(null);
      }
    };

    const handleClearAll = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (disabled) {
        return;
      }

      onChange('');
    };

    React.useLayoutEffect(() => {
      const inputElement = inputRef.current;

      if (inputElement && !value) {
        inputElement.value = '';
      }
    }, [value]);

    const getTheInputText = () => {
      if (currentFile === null) {
        if (value) {
          const fileNameWithExtension = value.split('/').pop();

          if (!fileNameWithExtension) {
            return '';
          }
          const [fileName, fileExtension] = fileNameWithExtension.split('.');

          return { fileName, fileExtension };
        }

        return { placeholder: placeholder || '' };
      }

      if (currentFile) {
        return getFileDetails(currentFile);
      }

      return '';
    };

    return (
      <TextField
        ref={ref}
        type="file"
        disabled={disabled}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            cursor: 'default',
            paddingRight: '2px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PaperclipIcon />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear"
                title="Отчистить"
                disabled={disabled}
                onClick={handleClearAll}
              >
                <CloseIcon size={20} />
              </IconButton>
            </InputAdornment>
          ),
          inputProps: {
            ...getTheInputText(),
            ref: inputRef,
            placeholder,
            ...inputProps,
          },
          inputComponent: Input,
        }}
        {...restTextFieldProps}
      />
    );
  },
);

FileInput.displayName = 'FileInput';

export default FileInput;

export { FileInputProps };
