import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const withDnD = (component: () => React.ReactNode) =>
  function withDnD() {
    return <DndProvider backend={HTML5Backend}>{component()}</DndProvider>;
  };
