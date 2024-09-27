import * as React from 'react';

import { InputLabel } from '@mui/material';

type InputProps = React.ComponentProps<'input'> & {
  fileName?: string;
  placeholder?: string;
  fileExtension?: string;
  error?: boolean;
};

const Input = React.forwardRef(
  (
    { fileName, fileExtension, placeholder, error, ...restInputProps }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const colorText = React.useMemo(() => {
      if (fileName) {
        return 'var(--mui-palette-text-primary)';
      }

      if (error) {
        return 'var(--mui-palette-error-main)';
      }

      return 'currentColor';
    }, [error, fileName]);

    return (
      <InputLabel sx={{ position: 'relative', flexGrow: 1 }}>
        <span
          aria-placeholder={placeholder}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            color: colorText,
          }}
        >
          {fileName && (
            <div style={{ display: 'flex', width: '100%' }}>
              <div
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {fileName}
              </div>
              {fileExtension && (
                <span style={{ flexShrink: 0, display: 'block' }}>.{fileExtension}</span>
              )}
            </div>
          )}
          {!fileName && placeholder}
        </span>
        <input style={{ opacity: 0 }} {...restInputProps} ref={ref} />
      </InputLabel>
    );
  },
);
// as ElementType<InputBaseComponentProps, keyof IntrinsicElements> | undefined;

Input.displayName = 'Input';

export default Input;
