import React from 'react';
import { useGate, useStore } from 'effector-react';

import { AppBar, Box, Card, Container, Toolbar, Typography } from 'shared/ui/kit';

import * as model from '../model';
import { CreateGoodsForm } from 'features/goods/create';
import { OneGoods } from 'entities/goods/types';
import { DataGrid, createColumnHelper } from 'shared/components/data-grid';
import { ActionsMenu } from 'shared/components/actions-menu';
// import { AdminOneGoodsDeleteMenuItem } from 'features/admin/course/delete';
import { CancelOutlinedIcon, CheckCircleOutlinedIcon } from 'shared/ui/icons';

const renderRowActions = (record: OneGoods) => {
  const items: string | any[] | undefined = [
    /*{
      component: <AdminOneGoodsDeleteMenuItem key="delete" id={record.id} />,
    },*/
  ]; /*.map((el) => el.component)*/

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
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.name}</Typography>,
  }),
  courseColumnHelper.accessor((row) => row.sale, {
    id: 'sale',
    header: 'Sale',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.sale}</Typography>,
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

export const MyOrdersPage = () => {
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
          <Typography>My orders</Typography>
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
