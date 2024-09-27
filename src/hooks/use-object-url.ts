import { useEffect, useState } from 'react';

//TODO: добавить получение width и height, может переделать в промис
const useObjectURL = (initialObject: null | File | Blob | MediaSource) => {
  const [objectURL, setObjectURL] = useState<null | string>(null);

  useEffect(() => {
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
