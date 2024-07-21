import React from 'react';

import { TablePagination } from 'shared/ui/kit';

export const Paginator: React.FC<{
  totalCount: number;
  page: number;
  pageSize: number;
  next?: boolean;
  rowsPerPage?: number[];
  pageChanged: (args: { page?: number; pageSize?: number }) => void;
}> = ({ totalCount, page, pageChanged, pageSize, rowsPerPage = [25, 50, 100, 200] }) => (
  <TablePagination
    component="div"
    count={totalCount}
    page={page - 1}
    onPageChange={(e, page) => pageChanged({ page: page + 1 })}
    rowsPerPage={pageSize}
    onRowsPerPageChange={(event) =>
      pageChanged({ pageSize: parseInt(event.target.value, 10), page: 1 })
    }
    rowsPerPageOptions={[...rowsPerPage]}
    backIconButtonProps={{ sx: { mr: 1 } }}
    sx={{ minHeight: 70 }}
  />
);
