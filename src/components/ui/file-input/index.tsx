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

function getFileDetails(value: File) {
  const name = value.name;
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
      ...restTextFieldProps
    } = props;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const resetInputValue = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      const reader = new FileReader();

      reader.onloadend = () => {
        onChange?.({ file, url: reader.result as string });
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      if (!file) {
        resetInputValue();
      }
    };

    const handleClearAll = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      if (disabled) {
        return;
      }

      onChange?.({ file: null, url: '' });
    };

    const hasAtLeastOneFile = matchIsFile(value?.file);

    React.useLayoutEffect(() => {
      const inputElement = inputRef.current;

      if (inputElement && !hasAtLeastOneFile) {
        inputElement.value = '';
      }
    }, [hasAtLeastOneFile]);

    const getTheInputText = () => {
      if (value?.file === null) {
        if (value?.url) {
          const fileNameWithExtension = value.url.split('/').pop();

          if (!fileNameWithExtension) {
            return '';
          }
          const [fileName, fileExtension] = fileNameWithExtension.split('.');

          return { fileName, fileExtension };
        }

        return { placeholder: placeholder || '' };
      }

      if (value?.file && hasAtLeastOneFile) {
        return getFileDetails(value.file);
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
