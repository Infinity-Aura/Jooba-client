/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header as TanStackHeader, Cell as TanStackCell } from '@tanstack/react-table';

export type ColumnDef = Record<string, any>; // TODO: Create normal type

// TODO: Refactor this when the DataGrid is refactored
export type Header<TData, TValue> = TanStackHeader<TData, TValue> & {
  column: {
    columnDef: {
      meta?: {
        infoTooltip?: string;
        isSticky?: boolean;
      };
    };
  };
};

export type Cell<TData, TValue> = TanStackCell<TData, TValue> & {
  column: {
    columnDef: {
      meta?: {
        isSticky?: boolean;
      };
    };
  };
};

type SortOrder = 'Ascending' | 'Descending';

export type SortParams = {
  sortLevel: number;
  sortBy: string;
  sortOrder?: SortOrder;
};

export type Extended<TData> = {
  id?: string;
  nested?: TData[] | null;
  relatedContext?: { folderId?: string };
};
