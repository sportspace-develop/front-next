import React from 'react';

import { CircularProgress, MenuItem, TextField } from '@mui/material';

interface DefaultItem {
  id: string | number;
  title: string;
}

interface LazySelectProps<T extends DefaultItem = DefaultItem> {
  data: T[];
  label: string;
  helperText?: string;
  error?: boolean;
  value?: string | number | null;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  getOptionLabel?: (item: T) => string;
  getOptionValue?: (item: T) => string | number;
  loadNextPage: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const LazySelect = <T extends DefaultItem = DefaultItem>({
  label,
  helperText,
  error,
  value,
  onChange,
  getOptionLabel = (item) => item.title,
  getOptionValue = (item) => item.id ?? null,
  loadNextPage,
  isLoading,
  data,
  disabled,
}: LazySelectProps<T>) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.scrollHeight - target.scrollTop - 20 < target.clientHeight) {
      loadNextPage();
    }
  };

  return (
    <TextField
      select
      disabled={disabled}
      error={error}
      helperText={helperText}
      label={label}
      value={value ?? ''}
      onChange={onChange}
      fullWidth
      variant="outlined"
      SelectProps={{
        MenuProps: {
          PaperProps: {
            ref: containerRef,
            onScroll: handleScroll,
            style: { maxHeight: 230, overflowY: 'auto' },
          },
        },
      }}
    >
      {data.map((item) => (
        <MenuItem key={getOptionValue(item)} value={getOptionValue(item)}>
          {getOptionLabel(item)}
        </MenuItem>
      ))}
      {isLoading && (
        <MenuItem disabled>
          <CircularProgress size={20} />
        </MenuItem>
      )}
    </TextField>
  );
};

export default LazySelect;
