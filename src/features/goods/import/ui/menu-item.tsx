import React from 'react';

import { ListItemIcon, ListItemText, MenuItem } from 'shared/ui/kit';
import { PublishIcon } from 'shared/ui/icons';

import * as model from '../model';

export const ImportGoodsMenuItem: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <MenuItem
      onClick={() => {
        onClick();
        model.dialogOpenRequested(true);
      }}
    >
      <ListItemIcon>
        <PublishIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Import Excel</ListItemText>
    </MenuItem>
  );
};
