import { attach, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Company, companyModel } from 'entities/company';

export const Gate = createGate();

const domain = createDomain('features/profile/settings/company');

export const companyUpdateRequested = domain.event<Partial<Company>>();
export const uploadCompanyImageRequested = domain.event<File>();

const getMyCompaniesFx = attach({ effect: companyModel.getMyCompaniesFx });
const updateCompanyFx = attach({ effect: companyModel.updateCompanyFx });
const uploadCompanyImageFx = attach({ effect: companyModel.uploadCompanyImageFx });

export const $company = domain.store<Company | null>(null);

$company.on(getMyCompaniesFx.doneData, (_, companies) => companies[0] ?? null);

sample({
  clock: Gate.open,
  target: getMyCompaniesFx,
});

sample({
  clock: companyUpdateRequested,
  source: $company,
  filter: (company, updatedCompany) =>
    updatedCompany.name !== company?.name ||
    updatedCompany.country !== company?.country ||
    updatedCompany.address !== company?.address ||
    updatedCompany.dateOfEstablishment !== company?.dateOfEstablishment,
  fn: (company, updatedCompany) => ({ ...updatedCompany, id: company?.id ?? '' }),
  target: updateCompanyFx,
});

sample({
  clock: uploadCompanyImageRequested,
  source: $company,
  filter: (_, photo) => !!photo.size,
  fn: (company, photo) => ({
    id: company?.id ?? '',
    photo,
  }),
  target: uploadCompanyImageFx,
});
