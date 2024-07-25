import React from 'react';

import { ListItemIcon, ListItemText, MenuItem } from 'shared/ui/kit';
import { AddCircleRoundedIcon } from 'shared/ui/icons';

import * as model from '../model';

export const CreateGoodsMenuItem: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <MenuItem
      onClick={() => {
        onClick();
        model.drawerOpenRequested(true);
      }}
    >
      <ListItemIcon>
        <AddCircleRoundedIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Add one goods</ListItemText>
    </MenuItem>
  );
};
