import { Table, flexRender } from '@tanstack/react-table';
import React from 'react';

import { ArrowDownwardRoundedIcon, ArrowUpwardRoundedIcon, InfoIcon } from 'shared/ui/icons';
import { Box, IconButton, TableCell, Tooltip } from 'shared/ui/kit';
import { theme } from 'shared/ui/theme';

import { createStickyColumnStyle } from './helpers/sticky-columns';
import { useDragAndDrop } from './hooks';
import { Header, SortParams } from './types';

export function ColumnHeader<TData>({
  header,
  instance,
  sortParams,
  sortByChanged,
  index,
}: {
  header: Header<TData, unknown>;
  instance: Table<TData>;
  sortParams?: SortParams;
  sortByChanged: (sortParams?: SortParams) => void;
  index: number;
}): React.ReactElement {
  const [dropRef, dragRef, previewRef, isDragging] = useDragAndDrop<TData>(instance, header);

  const canResize = header.column.getCanResize();
  const canSort = sortParams && header.column.getCanSort();
  const isSticky = header.column.columnDef.meta?.isSticky;
  const infoTooltip = header.column.columnDef.meta?.infoTooltip;

  return (
    <TableCell
      key={header.id}
      colSpan={header.colSpan}
      ref={isSticky ? null : dropRef}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        minHeight: 40,
        maxWidth: isSticky ? 120 : {},
        userSelect: 'none',
        p: 2,
        ...(isSticky ? createStickyColumnStyle(index, 152) : {}),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: theme.palette.background.paper,
          justifyContent: 'space-between',
          '&:hover .resizer': { visibility: canResize ? 'visible' : 'hidden' },
          '&:hover .sorter': { visibility: canSort ? 'visible' : 'hidden' },
        }}
      >
        {header.isPlaceholder ? null : (
          <Box
            ref={isSticky ? null : previewRef}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: header.column.getSize(),
              ...(header.column.columnDef.meta?.isSticky && {
                minWidth: 'min-content',
              }),
              '& *': {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              },
            }}
          >
            <Box
              sx={{
                cursor: isSticky ? 'auto' : 'move',
                pr: 1,
              }}
              ref={isSticky ? null : dragRef}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Box>
            {infoTooltip && (
              <Tooltip
                title={infoTooltip}
                placement="right-start"
                arrow
                disableInteractive
                PopperProps={{
                  sx: {
                    '& .MuiTooltip-tooltip': {
                      maxWidth: 300,
                    },
                  },
                }}
              >
                <InfoIcon
                  color="disabled"
                  sx={{ '&:hover': { color: theme.palette.primary.main } }}
                />
              </Tooltip>
            )}
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {sortParams?.sortBy === header.column.id ? (
            sortParams.sortOrder === 'Ascending' ? (
              <IconButton
                className="sorter"
                sx={{
                  visibility: sortParams.sortOrder ? 'visible' : 'hidden',
                }}
                onClick={() => sortByChanged({ sortBy: '', sortOrder: undefined, sortLevel: 0 })}
              >
                <ArrowUpwardRoundedIcon fontSize="small" />
              </IconButton>
            ) : sortParams.sortOrder === 'Descending' ? (
              <IconButton
                className="sorter"
                sx={{
                  visibility: sortParams.sortOrder ? 'visible' : 'hidden',
                }}
                onClick={() =>
                  sortByChanged({
                    sortBy: header.column.id,
                    sortOrder: 'Ascending',
                    sortLevel: 0,
                  })
                }
              >
                <ArrowDownwardRoundedIcon fontSize="small" />
              </IconButton>
            ) : null
          ) : (
            <IconButton
              className="sorter"
              sx={{
                visibility: 'hidden',
              }}
              onClick={() =>
                sortByChanged({ sortBy: header.column.id, sortOrder: 'Descending', sortLevel: 0 })
              }
            >
              <ArrowDownwardRoundedIcon fontSize="small" color="disabled" />
            </IconButton>
          )}
          {canResize ? (
            <Box
              onMouseDown={header.getResizeHandler()} // TODO: Refactor resizing functionality (rerender)
              onTouchStart={header.getResizeHandler()}
              className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
              sx={{
                visibility: header.column.getIsResizing() ? 'visible' : 'hidden',
                cursor: 'col-resize',
                px: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.grey['400'],
                  height: 20,
                  width: 2,
                }}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </TableCell>
  );
}
