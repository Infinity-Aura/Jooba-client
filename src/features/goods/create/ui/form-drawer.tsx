import React from 'react';

import { Box, Button, Checkbox, Drawer, TextField, Typography } from 'shared/ui/kit';
import { AddCircleRoundedIcon } from 'shared/ui/icons';

import { OneGoods } from 'entities/goods';

import { model } from '../model';

export const CreateGoodsForm = () => {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const data: Partial<OneGoods> = {
      name: form.get('name')?.toString() ?? '',
      sale: form.get('sale')?.toString() ?? '',
      article: form.get('article')?.toString() ?? '',
      brand: form.get('brand')?.toString() ?? '',
      category: form.get('category')?.toString() ?? '',
      price: form.get('price')?.toString() ?? '',
      availability: !!form.get('availability'),
    };

    model.createOneGoodsRequested(data);
  };

  return (
    <>
      <Button
        startIcon={<AddCircleRoundedIcon color="secondary" />}
        onClick={() => setDrawerOpen(true)}
        variant="contained"
      >
        Add goods
      </Button>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#FFFFFF',
            color: '#3B3B47',
          },
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ p: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 500, mb: '10px' }}>
            Add goods
          </Typography>
          <Box sx={{ mb: '13px' }}>
            <Box sx={{ mb: '16px' }}>
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
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
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
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
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
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
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
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
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
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
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
                sx={{ borderRadius: '8px' }}
                inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
                InputLabelProps={{ style: { fontWeight: 300 } }}
              />
            </Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Availability
              </Typography>
              <Checkbox name="availability" id="availability" defaultChecked />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { md: 'normal', xs: 'center' },
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
    </>
  );
};
