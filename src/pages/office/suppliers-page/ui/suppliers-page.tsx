import React from 'react';
import { useGate, useStore } from 'effector-react';

import { AppBar, Box, Card, Container, Toolbar, Typography } from 'shared/ui/kit';

import * as model from '../model';
import { CreateGoodsForm } from 'features/goods/create';
import { DataGrid, createColumnHelper } from 'shared/components/data-grid';
import { ActionsMenu } from 'shared/components/actions-menu';
// import { AdminOneGoodsDeleteMenuItem } from 'features/admin/course/delete';
import { User } from 'entities/user';

const renderRowActions = (record: User) => {
  const items = [
    /*{
      component: <AdminOneGoodsDeleteMenuItem key="delete" id={record.id} />,
    },*/
  ]; /*.map((el) => el.component)*/

  return items.length > 0 ? (
    <ActionsMenu items={items} buttonSx={{ p: 1.5 }} closeOnSelect />
  ) : null;
};

const courseColumnHelper = createColumnHelper<User>();

const courseColumnsDef = [
  courseColumnHelper.accessor((row) => row.firstName, {
    id: 'firstName',
    header: 'First name',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.firstName}</Typography>
    ),
  }),
  courseColumnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    header: 'Last name',
    size: 200,
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.lastName}</Typography>
    ),
  }),
  courseColumnHelper.accessor((row) => row.email, {
    id: 'email',
    header: 'Email',
    size: 200,
    cell: ({ row: { original: record } }) => <Typography variant="h5">{record.email}</Typography>,
  }),
  courseColumnHelper.accessor((row) => row.phoneNumber, {
    id: 'phoneNumber',
    header: 'Phone number',
    cell: ({ row: { original: record } }) => (
      <Typography variant="h5">{record.phoneNumber}</Typography>
    ),
  }),
  courseColumnHelper.display({
    id: 'action-menu',
    header: 'Actions',
    cell: ({ row: { original: record } }) => <Box>{renderRowActions(record)}</Box>,
  }),
];

export const SuppliersPage = () => {
  const [params, setParams] = React.useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 2,
  });

  useGate(model.Gate);

  const suppliers = useStore(model.$suppliers);
  const loading = useStore(model.getUsersFx.pending);

  return (
    <>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography>Suppliers</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Card sx={{ p: 2 }}>
          <DataGrid<User>
            data={suppliers ?? []}
            columns={courseColumnsDef}
            params={{
              page: params.page,
              pageSize: params.pageSize,
              totalCount: suppliers?.length ?? 0,
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
