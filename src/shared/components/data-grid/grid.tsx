import {
  ColumnDef,
  ColumnOrderState,
  createColumnHelper,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowSelectionState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import React from 'react';

import { Loading } from 'shared/components/loading';
import { Paginator } from 'shared/components/paginator';
import {
  Box,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableRowProps,
} from 'shared/ui/kit';

import { NoDataCard } from '../no-data-cards';

import { ColumnHeader } from './column-header';
import { createStickyColumnStyle } from './helpers/sticky-columns';
import { Cell, Extended, SortParams } from './types';

type DataGridParams = {
  page: number;
  pageSize: number;
  totalCount: number;
  rowsPerPage?: number[];
  next?: boolean;
  sortParams?: SortParams;
  visibleColumns?: string[];
  hideRowDividers?: boolean;
};

const getVisibleColumns = (allColumns: string[], visibleColumns: string[]) =>
  allColumns.reduce<VisibilityState>((acc, id) => {
    acc[id] = visibleColumns.includes(id);
    return acc;
  }, {});

export function DataGrid<TData extends Extended<TData> | undefined = undefined>({
  data,
  columns,
  params,
  paramsChanged,
  loading,
  getRowProps,
  rowSelection,
  setRowSelection,
  queuedFolders,
}: {
  data: TData[];
  columns: ColumnDef<TData, string>[];
  params: DataGridParams;
  paramsChanged: (args: { page?: number; pageSize?: number; sortParams?: SortParams }) => void;
  loading: boolean;
  getRowProps?: (record: TData) => TableRowProps;
  rowSelection?: RowSelectionState;
  setRowSelection?: OnChangeFn<RowSelectionState>;
  queuedFolders?: string[];
}): React.ReactElement {
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  // TODO: Refactor this when the DataGrid is refactored
  const allColumns = React.useMemo(
    () =>
      setRowSelection
        ? [
            createColumnHelper<TData>().display({
              id: 'select',
              maxSize: 1,
              header: ({ table }) => (
                <Checkbox
                  size="small"
                  sx={{
                    padding: 0,
                    '&.Mui-checked, &.MuiCheckbox-indeterminate': { color: 'text.secondary' },
                  }}
                  checked={table.getIsAllRowsSelected()}
                  indeterminate={table.getIsSomeRowsSelected()}
                  onChange={table.getToggleAllRowsSelectedHandler()}
                />
              ),
              cell: ({ row }) => (
                <Checkbox
                  size="small"
                  sx={{ padding: 0, '&.Mui-checked': { color: 'text.secondary' } }}
                  checked={row.getIsSelected()}
                  indeterminate={row.getIsSomeSelected()}
                  onChange={row.getToggleSelectedHandler()}
                />
              ),
            }),
            ...columns,
          ]
        : columns,
    [columns, setRowSelection],
  );

  React.useEffect(() => setColumnOrder(allColumns.map((column) => column.id ?? '')), [allColumns]);

  const isExpanded = React.useMemo(
    () => data.some((dataItem) => dataItem && !!dataItem.nested),
    [data],
  );

  // TODO: Refactor in task #382
  const instance = useReactTable({
    data,
    columns: allColumns,
    state: {
      rowSelection,
      columnOrder,
      expanded,
      ...(params.visibleColumns
        ? {
            columnVisibility: getVisibleColumns(
              allColumns.flatMap(({ id }) => id || []),
              params.visibleColumns || [],
            ),
          }
        : {}),
    },
    onExpandedChange: setExpanded,
    ...(isExpanded && {
      getSubRows: (row: TData) => row && (row.nested ? row.nested : undefined),
      getExpandedRowModel: getExpandedRowModel(),
    }),
    columnResizeMode: 'onChange',
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onColumnOrderChange: setColumnOrder,
    defaultColumn: {
      size: 120,
      minSize: 50,
    },
  });

  const rowModel = instance.getRowModel();

  return rowModel.rows.length && !loading && params.visibleColumns?.length !== 0 ? (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            {instance.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {rowModel.rows.length
                  ? headerGroup.headers.map((header, index) => (
                      <ColumnHeader
                        key={header.id}
                        index={index}
                        header={header}
                        instance={instance}
                        sortParams={params.sortParams}
                        sortByChanged={(sortParams) => paramsChanged({ sortParams })}
                      />
                    ))
                  : null}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rowModel.rows.map((row) => {
              const isLoading =
                row.original?.relatedContext?.folderId &&
                queuedFolders?.includes(row.original.relatedContext.folderId);
              return (
                <React.Fragment key={row.id}>
                  <TableRow {...(getRowProps && row.original ? getRowProps(row.original) : {})}>
                    {row.getVisibleCells().map((cell: Cell<TData, unknown>, index) => (
                      <TableCell
                        sx={{
                          ...(cell.column.columnDef.meta?.isSticky &&
                            createStickyColumnStyle(index, 152)),
                          ...((isLoading || params.hideRowDividers) && {
                            borderBottom: 'none',
                          }),
                        }}
                        key={cell.id}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: cell.column.getSize(),
                            ...(cell.column.columnDef.meta?.isSticky && {
                              minWidth: 'min-content',
                            }),
                            '& *': {
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                            },
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                  {isLoading && (
                    <TableRow sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                      <TableCell sx={{ padding: 1 }}>
                        <Loading />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {params.rowsPerPage && (
        <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ py: 1 }}>
          <Paginator
            page={params.page}
            pageSize={params.pageSize}
            totalCount={params.totalCount}
            rowsPerPage={params.rowsPerPage}
            next={params.next}
            pageChanged={paramsChanged}
          />
        </Box>
      )}
    </>
  ) : (
    <>{loading ? <Loading /> : <NoDataCard />}</>
  );
}
