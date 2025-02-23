import * as React from 'react';

type Item = { id: number; title: string };

type Params = {
  page: number;
  limit: number;
};

type UseQueryHook = (params: Params) => {
  data?: { data: Item[]; pagination?: { nextPage?: number } };
  isFetching: boolean;
};

const useDataSelector = (useQueryHook: UseQueryHook, initialItem?: Item) => {
  const [page, setPage] = React.useState(1);
  const { data, isFetching } = useQueryHook({ page, limit: 6 });
  const [items, setItems] = React.useState<Item[]>([]);

  React.useEffect(() => {
    if (data?.data) {
      setItems((prevItems) => {
        const filteredNewItems = data.data.filter(
          (newItem) => !prevItems.some((item) => item.id === newItem.id),
        );

        return [...prevItems, ...filteredNewItems];
      });
    }
  }, [data?.data]);

  const loadNextPage = () => {
    if (!isFetching && data?.pagination?.nextPage) {
      setPage((prev) => prev + 1);
    }
  };

  React.useEffect(() => {
    if (initialItem) {
      setItems((prevItems) => {
        if (prevItems.some((item) => item.id === initialItem.id)) {
          return prevItems;
        }

        return [...prevItems, initialItem];
      });
    }
  }, [initialItem]);

  return {
    items,
    loadNextPage,
    isLoading: isFetching,
  };
};

export default useDataSelector;
