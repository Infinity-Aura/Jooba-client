import { Column, ColumnOrderState, Header, Table } from '@tanstack/react-table';
import { useDrag, useDrop } from 'react-dnd';

export const useDragAndDrop = <TData,>(instance: Table<TData>, header: Header<TData, unknown>) => {
  const { getState, setColumnOrder } = instance;
  const { columnOrder } = getState();
  const { column } = header;

  const reorderColumn = (
    draggedColumnId: string,
    targetColumnId: string,
    columnOrder: string[],
  ): ColumnOrderState => {
    const newColumnOrder = [...columnOrder];
    const dragIndex = newColumnOrder.indexOf(draggedColumnId);
    const targetIndex = newColumnOrder.indexOf(targetColumnId);

    [newColumnOrder[dragIndex], newColumnOrder[targetIndex]] = [
      newColumnOrder[targetIndex],
      newColumnOrder[dragIndex],
    ];

    return newColumnOrder;
  };

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<TData>) => {
      const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  return [dropRef, dragRef, previewRef, isDragging] as const;
};
