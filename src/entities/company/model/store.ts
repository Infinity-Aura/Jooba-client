import { createDomain } from 'effector';

import { showFxErrors } from 'shared/ui/lib/notify-user';

import {
  createCompany,
  deleteCompany,
  getCompany,
  getCompanies,
  getMyCompanies,
  updateCompany,
  uploadCompanyImage,
} from './api';

const domain = createDomain('entities/Company');

export const getCompaniesFx = domain.effect(getCompanies);
export const getCompanyFx = domain.effect(getCompany);
export const getMyCompaniesFx = domain.effect(getMyCompanies);
export const createCompanyFx = domain.effect(createCompany);
export const updateCompanyFx = domain.effect(updateCompany);
export const uploadCompanyImageFx = domain.effect(uploadCompanyImage);
export const deleteCompanyFx = domain.effect(deleteCompany);

showFxErrors([
  createCompanyFx.failData,
  updateCompanyFx.failData,
  uploadCompanyImageFx.failData,
  deleteCompanyFx.failData,
  getCompaniesFx.failData,
  getCompanyFx.failData,
  getMyCompaniesFx.failData,
]);
