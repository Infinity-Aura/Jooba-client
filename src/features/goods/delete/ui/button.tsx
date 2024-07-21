import React from 'react';

import { Button } from 'shared/ui/kit';
import { DeleteIcon } from 'shared/ui/icons';

import { model } from '../model';

export const DeleteOneGoods: React.FC<{ goodsId: string }> = ({ goodsId }) => {
  return (
    <Button
      startIcon={<DeleteIcon color="secondary" />}
      onClick={() => model.deleteOneGoodsRequested(goodsId)}
      variant="contained"
    >
      Delete
    </Button>
  );
};
