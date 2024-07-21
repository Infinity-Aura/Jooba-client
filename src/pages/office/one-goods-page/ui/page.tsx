import React from 'react';
import { useParams } from 'react-router-dom';
import { useGate } from 'effector-react';

import { Container } from 'shared/ui/kit';

import * as model from '../model';

export const OneGoodsPage = () => {
  const { oneGoodsId } = useParams();

  useGate(model.Gate, oneGoodsId);

  return <Container maxWidth="xl"></Container>;
};
