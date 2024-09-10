import * as React from 'react';

import styles from './styles.module.css';

type InputProps = React.ComponentProps<'input'> & {
  error: boolean;
  fileName?: string;
  placeholder?: string;
  fileExtension?: string;
};

const Input = React.forwardRef(
  (
    {fileName, fileExtension, placeholder, error, ...restInputProps}: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const errorClassName = error ? styles.error : '';

    return (
      <label className={styles.label}>
        <input style={{opacity: 0}} {...restInputProps} ref={ref} />
        <span aria-placeholder={placeholder} className={styles.labelText}>
          {fileName && (
            <div className={`${styles.fileName} ${errorClassName}`}>
              <div className={styles.fileText}>{fileName}</div>
              {fileExtension && <span className={styles.fileExtension}>.{fileExtension}</span>}
            </div>
          )}
          {!fileName && placeholder && (
            <span className={`${styles.placeholder} ${errorClassName}`}>{placeholder}</span>
          )}
        </span>
      </label>
    );
  },
);
// as ElementType<InputBaseComponentProps, keyof IntrinsicElements> | undefined;

Input.displayName = 'Input';

export default Input;
