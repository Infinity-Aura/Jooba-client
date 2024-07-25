import React from 'react';
import { useStore } from 'effector-react';

import { Box, Button, Checkbox, Drawer, TextField, Typography } from 'shared/ui/kit';

import { OneGoods } from 'entities/goods';

import * as model from '../model';

export const CreateGoodsForm: React.FC = () => {
  const drawerOpen = useStore(model.$drawerOpen);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: Partial<OneGoods> = {
      name: form.get('name')?.toString() ?? '',
      article: form.get('article')?.toString() ?? '',
      brand: form.get('brand')?.toString() ?? '',
      category: form.get('category')?.toString() ?? '',
      subcategory: form.get('subcategory')?.toString() ?? '',
      colour: form.get('colour')?.toString() ?? '',
      size: form.get('size')?.toString() ?? '',
      description: form.get('description')?.toString() ?? '',
      quantity: +(form.get('quantity') ?? 0),
      price: form.get('price')?.toString() ?? '',
      sale: form.get('sale')?.toString() ?? '',
      availability: !!form.get('availability'),
    };

    model.createOneGoodsRequested(data);
  };

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => model.drawerOpenRequested(false)}
      PaperProps={{
        sx: {
          backgroundColor: '#FFFFFF',
          color: '#3B3B47',
          width: '35%',
        },
      }}
    >
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ p: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 500, mb: '10px' }}>
          Add goods
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Name
            </Typography>
            <TextField
              required
              fullWidth
              name="name"
              type="text"
              id="name"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Article
            </Typography>
            <TextField
              required
              fullWidth
              name="article"
              type="text"
              id="article"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Brand
            </Typography>
            <TextField
              required
              fullWidth
              name="brand"
              type="text"
              id="brand"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Category
            </Typography>
            <TextField
              required
              fullWidth
              name="category"
              type="text"
              id="category"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Subcategory
            </Typography>
            <TextField
              required
              fullWidth
              name="subcategory"
              type="text"
              id="subcategory"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Colour
            </Typography>
            <TextField
              required
              fullWidth
              name="colour"
              type="text"
              id="colour"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Size
            </Typography>
            <TextField
              required
              fullWidth
              name="size"
              type="text"
              id="size"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Description
            </Typography>
            <TextField
              required
              fullWidth
              name="description"
              type="text"
              id="description"
              multiline
              rows={4}
              inputProps={{ style: { fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Quantity
            </Typography>
            <TextField
              required
              fullWidth
              name="quantity"
              type="number"
              id="quantity"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Price
            </Typography>
            <TextField
              required
              fullWidth
              name="price"
              type="text"
              id="price"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
            >
              Sale
            </Typography>
            <TextField
              required
              fullWidth
              name="sale"
              type="text"
              id="sale"
              inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
              InputLabelProps={{ style: { fontWeight: 300 } }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">Availability</Typography>
            <Checkbox name="availability" id="availability" defaultChecked />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { md: 'normal', xs: 'center' },
            mt: '20px',
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              fontWeight: 900,
              fontSize: '0.8rem',
              lineHeight: '1.1rem',
              border: 'none',
              mr: '10px',
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
