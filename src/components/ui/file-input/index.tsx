import * as React from 'react';

import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { X as CloseIcon } from '@phosphor-icons/react/dist/ssr/X';

import { IconButton, InputAdornment, TextField } from '@mui/material';

import { useUploadFileMutation } from '@/lib/store/features/file-api';

import Input from './input';
import type { FileInputProps } from './types';

function matchIsFile(value: FileInputProps['value']) {
  // Secure SSR
  return (typeof window !== 'undefined' && value?.file instanceof File) || value?.url;
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
      fieldState,
      ...restTextFieldProps
    } = props;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [uploadFile] = useUploadFileMutation();

    const resetInputValue = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;

      if (file) {
        const formData = new FormData();

        formData.append('file', file);

        const { url } = await uploadFile(formData).unwrap();

        onChange?.({ file, url });
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

    const hasAtLeastOneFile = matchIsFile(value);

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

    const error = fieldState.invalid;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const helperText = (fieldState.error as any)?.file?.message;

    return (
      <TextField
        ref={ref}
        type="file"
        disabled={disabled}
        onChange={handleChange}
        error={error}
        helperText={helperText}
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
            error,
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
