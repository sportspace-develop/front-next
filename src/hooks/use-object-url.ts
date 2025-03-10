import * as React from 'react';

const useObjectURL = (initialObject: null | File | Blob | MediaSource) => {
  const [objectURL, setObjectURL] = React.useState<null | string>(null);

  React.useEffect(() => {
    if (!initialObject) {
      return;
    }

    const newObjectURL = URL.createObjectURL(initialObject);

    setObjectURL(newObjectURL);

    return () => {
      URL.revokeObjectURL(newObjectURL);
      setObjectURL(null);
    };
  }, [initialObject]);

  return objectURL;
};

export default useObjectURL;
