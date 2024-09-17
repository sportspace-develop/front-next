/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {Box, Unstable_Grid2 as Grid, Skeleton, Stack, Typography} from '@mui/material';

import {ListState, ListStateTypes} from './types';

type TProps = {
  content?: Record<string, any>[];
  state?: ListStateTypes;
  headText: string;
  uniqueProps?: string[];
  itemComponent: React.ComponentType<any>;
  headActionComponent?: React.ReactNode;
};

const SkeletonList = React.memo(() =>
  Array(3)
    .fill(1)
    .map((index) => <Skeleton key={index} height="40px" animation="wave" />),
);

const ListError = React.memo(() => {
  return (
    <Stack
      display="flex"
      spacing={3}
      sx={{
        flexDirection: {md: 'row'},
        alignItems: 'center',
        justifyContent: {lg: 'space-around', xs: 'center'},
      }}
    >
      <Box
        alt="Ошибка"
        component="img"
        src="/assets/empty-list.svg"
        sx={{
          height: 'auto',
          maxWidth: '100%',
          width: {xs: 300, lg: 400},
          mx: {md: 4},
        }}
      />
      <Typography textAlign="center" variant="h5">
        Ошибка! Мы не смогли найти то, что вы ищете
      </Typography>
      {/* Попробуйте поискать по-другому */}
    </Stack>
  );
});

const ListNoData = React.memo(() => {
  return (
    <Stack
      display="flex"
      spacing={3}
      sx={{
        flexDirection: {md: 'row'},
        alignItems: 'center',
        justifyContent: {lg: 'space-around', xs: 'center'},
      }}
    >
      <Box
        alt="Не найдено"
        component="img"
        src="/assets/empty-list.svg"
        sx={{
          height: 'auto',
          maxWidth: '100%',
          width: {xs: 300, lg: 400},
          mx: {md: 4},
        }}
      />
      <Typography textAlign="center" variant="h5">
        Пока список пуст
      </Typography>
    </Stack>
  );
});

const joinItemProps = (props: string[], item: any) => {
  const values = props.map((name) => item[name] ?? '');

  return values.join('');
};

const List = React.memo<TProps>(
  ({
    state = ListState.SUCCESS,
    content = [],
    uniqueProps = ['id'],
    headText,
    itemComponent: ItemComponent,
    headActionComponent,
  }) => {
    const hasContent = content?.length > 0;

    const renderContent = () =>
      content?.map((item) => {
        const key = joinItemProps(uniqueProps, item);

        return <ItemComponent item={item} key={key} />;
      });

    const renderList = () => {
      if (state === ListState.ERROR) {
        return <ListError />;
      }

      if (!hasContent && state === ListState.SUCCESS) {
        return <ListNoData />;
      }

      if (hasContent) {
        return (
          <Grid container spacing={3}>
            {renderContent()}
          </Grid>
        );
      }

      return null;
    };

    return (
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Typography variant="h4" sx={{flex: '1 1 auto'}}>
            {headText}
          </Typography>
          {state === ListState.SUCCESS && headActionComponent}
        </Stack>
        {renderList()}
        {state === ListState.PENDING && <SkeletonList />}
      </Stack>
    );
  },
);

export default List;

/* eslint-enable @typescript-eslint/no-explicit-any */
