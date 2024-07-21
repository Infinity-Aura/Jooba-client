import { theme } from 'shared/ui/theme';

type StickyColumn = {
  position: string;
  left: number;
  background: string;
  zIndex: number;
};

const stickyColumnsCache: Record<string, StickyColumn> = {};

export const createStickyColumnStyle = (index: number, minWidth: number): StickyColumn => {
  const cache = stickyColumnsCache[index];

  if (cache) {
    return { ...cache, left: cache.left };
  }

  const prevCache = stickyColumnsCache[index - 1];
  const left = prevCache ? prevCache.left + minWidth : 0;

  const style: StickyColumn = {
    position: 'sticky',
    left,
    background: theme.palette.background.paper,
    zIndex: 1,
  };

  stickyColumnsCache[index] = style;

  return style;
};
