import { http } from 'shared/config';

import { Company } from '../types';

export const getCompanies = async (): Promise<Company[]> => {
  const { data } = await http.get('/company');
  return data?.map((company: { _id: string }) => ({
    id: company._id,
    ...company,
  }));
};

export const getCompany = async (companyId: string): Promise<Company> => {
  const { data } = await http.get(`/company/${companyId}`);
  return {
    id: data._id,
    ...data,
  };
};

export const getMyCompanies = async (): Promise<Company[]> => {
  const { data } = await http.get(`/company/own`);

  return data;
};

export const createCompany = async (company: Partial<Company>): Promise<boolean> => {
  try {
    await http.post(`/company`, company);
    return true;
  } catch (e) {
    return false;
  }
};

export const updateCompany = async (company: Partial<Company>): Promise<boolean> => {
  try {
    await http.patch(`/company/${company.id}`, company);
    return true;
  } catch (e) {
    return false;
  }
};

export const uploadCompanyImage = async ({
  id,
  photo,
}: {
  id: string;
  photo: File;
}): Promise<void> => {
  await http.put(
    `/company/${id}/logo`,
    { photo },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const deleteCompany = async (companyId: string): Promise<boolean> => {
  try {
    await http.delete(`/company/${companyId}`);
    return true;
  } catch (e) {
    return false;
  }
};
