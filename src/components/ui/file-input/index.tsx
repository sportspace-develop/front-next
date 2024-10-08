import * as React from 'react';

import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { X as CloseIcon } from '@phosphor-icons/react/dist/ssr/X';

import { IconButton, InputAdornment, TextField } from '@mui/material';

import Input from './input';
import type { FileInputProps } from './types';

function matchIsFile(value: unknown): value is File {
  // Secure SSR
  return typeof window !== 'undefined' && value instanceof File;
}

function getFileDetails(value: File | File[]) {
  const name = matchIsFile(value) ? value.name : value[0]?.name || '';
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
      multiple,
      disabled,
      ...restTextFieldProps
    } = props;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const isMultiple = multiple || !!inputProps?.multiple || false;

    const resetInputValue = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      const files = fileList ? Array.from(fileList) : [];

      if (multiple) {
        onChange?.(files);

        if (files.length === 0) {
          resetInputValue();
        }
      } else {
        onChange?.(files[0] || null);

        if (!files[0]) {
          resetInputValue();
        }
      }
    };

    const handleClearAll = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (disabled) {
        return;
      }

      if (multiple) {
        onChange?.([]);
      } else {
        onChange?.(null);
      }
    };

    const hasAtLeastOneFile = Array.isArray(value) ? value.length > 0 : matchIsFile(value);

    React.useLayoutEffect(() => {
      const inputElement = inputRef.current;

      if (inputElement && !hasAtLeastOneFile) {
        inputElement.value = '';
      }
    }, [hasAtLeastOneFile]);

    const getTheInputText = () => {
      if (value === null || (Array.isArray(value) && value.length === 0)) {
        return { placeholder: placeholder || '' };
      }

      if (value && hasAtLeastOneFile) {
        if (Array.isArray(value) && value.length > 1) {
          return { fileName: `${value.length} files` };
        }

        return getFileDetails(value);
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
          endAdornment: hasAtLeastOneFile && (
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
            multiple: isMultiple,
            ref: inputRef,
            placeholder,
            error: restTextFieldProps.error,
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
