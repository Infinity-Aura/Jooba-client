import React from 'react';
import { useParams } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';

import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Toolbar,
  Typography,
} from 'shared/ui/kit';

import * as model from '../model';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 500,
    width: '100%',
  },
});

export const OneGoodsPage = () => {
  const classes = useStyles();
  const { oneGoodsId } = useParams();

  useGate(model.Gate, oneGoodsId);

  const oneGoods = useStore(model.$oneGoods);

  return (
    <>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography>{oneGoods?.name}</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Card>
          <CardMedia
            className={classes.media}
            image="https://assets.siakadcloud.com/cbtfront/img/default100.jpg"
            title={oneGoods?.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {oneGoods?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {oneGoods?.article}
            </Typography>
            <Typography variant="h6" component="div">
              ${oneGoods?.price || '35'}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
