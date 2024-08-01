import React from 'react';
import { useGate, useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { AppBar, Box, Card, Container, Toolbar, Typography } from 'shared/ui/kit';

import * as model from '../model';
import { OneGoods } from 'entities/goods/types';
import { DataGrid, createColumnHelper } from 'shared/components/data-grid';
import { ActionsMenu } from 'shared/components/actions-menu';
import { CancelOutlinedIcon, CheckCircleOutlinedIcon } from 'shared/ui/icons';
import { DeleteOneGoods } from 'features/goods/delete';
import { PATHS } from 'shared/config';

const renderRowActions = (record: OneGoods) => {
  const items = [
    {
      component: <DeleteOneGoods key="delete" goodsId={record.id} />,
    },
  ].map((el) => el.component);

  return items.length > 0 ? (
    <ActionsMenu items={items} buttonSx={{ p: 1.5 }} closeOnSelect />
  ) : null;
};

const courseColumnHelper = createColumnHelper<OneGoods>();

const courseColumnsDef = [
  courseColumnHelper.accessor((row) => row.name, {
    id: 'name',
    header: 'Name',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Link to={PATHS.office.oneGoods + `/${record.id}`} relative="path">
        <Typography variant="h5">{record.name}</Typography>
      </Link>
    ),
  }),
  courseColumnHelper.accessor((row) => row.article, {
    id: 'article',
    header: 'Article',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.article}</Typography>,
  }),
  courseColumnHelper.accessor((row) => row.brand, {
    id: 'brand',
    header: 'Brand',
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.brand}</Typography>,
  }),
  courseColumnHelper.accessor((row) => row.category, {
    id: 'category',
    header: 'Category',
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.category}</Typography>
    ),
  }),
  courseColumnHelper.accessor((row) => row.price, {
    id: 'price',
    header: 'Price',
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.price}</Typography>,
  }),
  courseColumnHelper.accessor((row) => row.sale, {
    id: 'sale',
    header: 'Sale',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.sale}</Typography>,
  }),
  courseColumnHelper.accessor(() => 'availability', {
    id: 'availability',
    header: 'Availability',
    cell: ({ row: { original: record } }) => (
      <Box>
        {record.availability ? (
          <CheckCircleOutlinedIcon color="success" />
        ) : (
          <CancelOutlinedIcon color="error" />
        )}
      </Box>
    ),
  }),
  courseColumnHelper.display({
    id: 'action-menu',
    header: 'Actions',
    cell: ({ row: { original: record } }) => <Box>{renderRowActions(record)}</Box>,
  }),
];

export const GoodsPage = () => {
  const [params, setParams] = React.useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 2,
  });

  useGate(model.Gate);

  const goods = useStore(model.$goods);
  const loading = useStore(model.getGoodsFx.pending);

  return (
    <>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography>All goods</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Card sx={{ p: 2 }}>
          <DataGrid<OneGoods>
            data={goods ?? []}
            columns={courseColumnsDef}
            params={{
              page: params.page,
              pageSize: params.pageSize,
              totalCount: goods?.length ?? 0,
              rowsPerPage: [2, 4, 50],
            }}
            paramsChanged={({ page, pageSize }) =>
              setParams({ page: page ?? params.page, pageSize: pageSize ?? params.pageSize })
            }
            loading={loading}
          />
        </Card>
      </Container>
    </>
  );
};
