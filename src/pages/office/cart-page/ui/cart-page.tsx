import React from 'react';
import { useParams } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';

import { AppBar, Box, Toolbar, Typography } from 'shared/ui/kit';
import { Loading } from 'shared/components/loading';

import * as model from '../model';

export const CartPage = () => {
  const { courseId } = useParams();

  useGate(model.Gate, courseId);

  // const orders = useStore(model.$course);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>Cart</Typography>
        </Toolbar>
      </AppBar>
      {/* {orders ? <Box></Box> : <Loading />} */}
    </>
  );
};
