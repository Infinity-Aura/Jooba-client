import React from 'react';

import { MoreHorizIcon } from 'shared/ui/icons';
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from 'shared/ui/kit';

import { Sx } from '../ui/theme';

type MenuActions = {
  title?: string;
  icon?: React.ReactNode;
  show?: () => boolean;
};

export type ActionParams<T> = {
  title: string;
  show: (item: T) => boolean;
  icon: React.ReactNode;
  action: (item: T) => void;
};

export const ActionsMenu = <T,>({
  menu = {},
  actions,
  items,
  actionContext,
  minWidth = 216,
  buttonSx,
  closeOnSelect,
}: React.PropsWithChildren<{
  menu?: MenuActions;
  actions?: ActionParams<T>[];
  items?: React.ReactNode[];
  minWidth?: number;
  actionContext?: T;
  buttonSx?: Sx;
  closeOnSelect?: boolean;
}>): JSX.Element => {
  const [openActions, setOpenActions] = React.useState(false);
  const actionsRef = React.useRef<HTMLButtonElement | null>(null);
  menu.show =
    menu?.show ||
    (() =>
      !!items?.length ||
      (actions && actionContext && !!actions.filter((item) => item.show(actionContext)).length) ||
      false);
  return (
    <>
      {menu.show() && (
        <Box ref={actionsRef} position="relative">
          <Button
            variant="text"
            sx={{ p: 0, ...buttonSx }}
            onClick={() => {
              setOpenActions(true);
            }}
          >
            {menu.icon || <MoreHorizIcon />}
            <Typography>{menu.title}</Typography>
          </Button>
        </Box>
      )}
      <Menu
        sx={{
          '& .MuiListItemIcon-root': { minWidth: 'auto', mr: 1 },
        }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        onClose={() => setOpenActions(false)}
        onClick={() => (closeOnSelect ? setOpenActions(false) : null)}
        open={openActions}
        anchorEl={actionsRef.current}
        PaperProps={{ sx: { maxWidth: '100%', minWidth, br: 16 } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {!!actions &&
          !!actionContext &&
          actions
            .filter((item) => item.show(actionContext))
            .map((item) => (
              <MenuItem
                key={item.title}
                sx={{ padding: '2px 15px' }}
                onClick={() => item.action(actionContext)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </MenuItem>
            ))}
        {items}
      </Menu>
    </>
  );
};
