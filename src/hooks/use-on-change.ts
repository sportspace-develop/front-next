import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOnChange = (onChange: () => void, deps: any[]) => {
  const mountedRef = React.useRef(false);
  const onChangeRef = React.useRef(onChange);

  onChangeRef.current = onChange;

  React.useEffect(() => {
    if (mountedRef.current) {
      onChangeRef.current();
    }

    mountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useOnChange;
