import React from 'react';
import { useGate, useStore } from 'effector-react';

import { Box, Button, TextField, Typography } from 'shared/ui/kit';
import { InsertPhotoOutlinedIcon } from 'shared/ui/icons';
import { Loading } from 'shared/components/loading';
import { API_URL } from 'shared/config';

import { model } from '../model';
import { Company } from 'entities/company';

export const SettingsCompanyForm = () => {
  useGate(model.Gate);

  const company = useStore(model.$company);

  const [photo, setPhoto] = React.useState('');

  React.useEffect(
    () => setPhoto(company?.logo ? `${API_URL}/company/logo/${company.logo}` : ''),
    [company],
  );

  const handleFileSelect = ({ target }: { target: HTMLInputElement & EventTarget }) => {
    if (!target?.files) {
      throw new Error('Error');
    }

    setPhoto(URL.createObjectURL(target.files[0]));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const photo = form.get('photo') as File;

    const data: Partial<Company> = {
      name: (form.get('name')?.toString() || company?.name) ?? '',
      country: (form.get('company')?.toString() || company?.country) ?? '',
      address: (form.get('address')?.toString() || company?.address) ?? '',
      dateOfEstablishment:
        (form.get('dateOfEstablishment')?.toString() || company?.dateOfEstablishment) ?? '',
    };

    if (
      !company?.name &&
      !company?.country &&
      !company?.address &&
      !company?.dateOfEstablishment &&
      !company?.logo
    ) {
      throw new Error('Update error');
    }

    model.companyUpdateRequested(data);
    model.uploadCompanyImageRequested(photo);
  };

  return company ? (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Box sx={{ mb: '13px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '30px' }}>
          <Box
            sx={{
              display: 'flex',
              background: photo ? `url("${photo}") center center no-repeat` : '#E0673A',
              backgroundSize: 'cover',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '70px',
              minWidth: '106px',
              minHeight: '106px',
              p: '31px',
              mr: '15px',
            }}
          >
            <Box></Box>
            {photo ? '' : <InsertPhotoOutlinedIcon fontSize="large" sx={{ color: '#FFFFFF' }} />}
          </Box>
          <Box>
            <Box sx={{ mb: '16px' }}>
              <Typography
                sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
              >
                Upload company logo...
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 200, fontFamily: '"Montserrat", sans-serif' }}
              >
                The file size is at least 300px × 300px
              </Typography>
            </Box>
            <Box>
              <Button
                component="label"
                variant="contained"
                sx={{ fontWeight: 900, fontSize: '0.8rem', lineHeight: '1.1rem', border: 'none' }}
              >
                <input
                  style={{ display: 'none' }}
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                Choose the file
              </Button>
            </Box>
          </Box>
        </Box>
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
            defaultValue={company.name}
            sx={{ borderRadius: '8px' }}
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Country
          </Typography>
          <TextField
            required
            fullWidth
            name="firstName"
            type="text"
            id="firstName"
            defaultValue={company.country}
            sx={{ borderRadius: '8px' }}
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Address
          </Typography>
          <TextField
            required
            fullWidth
            name="address"
            type="text"
            id="address"
            defaultValue={company.address}
            sx={{ borderRadius: '8px' }}
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
        </Box>
        <Box sx={{ mb: '16px' }}>
          <Typography
            sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', mb: '10px' }}
          >
            Date of establishment
          </Typography>
          <TextField
            required
            fullWidth
            name="dateOfEstablishment"
            type="date"
            id="dateOfEstablishment"
            defaultValue={company.dateOfEstablishment}
            sx={{ borderRadius: '8px' }}
            inputProps={{ style: { padding: '9px 11px', fontWeight: 300 } }}
            InputLabelProps={{ style: { fontWeight: 300 } }}
          />
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
          Save
        </Button>
        {/* <Typography sx={{ fontWeight: 200, fontSize: '0.8rem', lineHeight: '1.1rem', mr: '2px' }}>
          або
        </Typography>
        <Button
          variant="text"
          sx={{ fontWeight: 500, fontSize: '0.8rem', lineHeight: '1.1rem', minWidth: 'auto' }}
        >
          Відміна
        </Button> */}
      </Box>
    </Box>
  ) : (
    <Loading />
  );
};
