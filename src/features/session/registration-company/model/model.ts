import { attach, createDomain, sample } from 'effector';
import { Role, sessionModel } from 'entities/session';
import { RegistrationCompany, companyModel } from 'entities/company';
import { Registration } from 'features/session/registration-supplier/model';

const domain = createDomain('features/session/registration');

export const registrationRequested = domain.event<{
  user: Registration;
  company: RegistrationCompany;
}>();

export const registrationFx = attach({ effect: sessionModel.registrationFx });
export const createCompanyFx = attach({ effect: companyModel.createCompanyFx });

export const $registrationParams = domain.store<{
  user: Registration;
  company: RegistrationCompany;
} | null>(null);

$registrationParams.on(registrationRequested, (_, registrationParams) => registrationParams);

sample({
  clock: $registrationParams,
  fn: (params) => {
    if (!params) {
      throw new Error('Registration params doesn`t exist');
    }

    return {
      ...params.user,
      role: 'company' as Role,
    };
  },
  target: registrationFx,
});

sample({
  clock: registrationFx.doneData,
  source: $registrationParams,
  fn: (params, user) => {
    if (!params) {
      throw new Error('Registration params doesn`t exist');
    }

    return { ...params.company, ownerId: user.id };
  },
  target: createCompanyFx,
});
