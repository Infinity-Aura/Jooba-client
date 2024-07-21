import { createEffect } from 'effector';
import { NavigateFunction } from 'react-router-dom';

let navigateFunc: NavigateFunction | null = null;
export const setNavigate = (navigate: NavigateFunction): void => void (navigateFunc = navigate);
export const navigateTo = (path: string): void => navigateFunc?.(path);
export const navigateToFx = createEffect(navigateTo);

export const PATHS = {
  root: '/',
  office: {
    root: '/office',
    cart: '/office/cart',
    orders: '/office/orders',
    allgoods: '/office/allgoods',
    mygoods: '/office/mygoods',
    suppliers: '/office/suppliers',
    settings: '/office/settings',
    profile: {
      root: '/office/profile',
      courses: '/office/profile/courses',
      course: '/office/profile/course',
      settings: {
        root: '/office/profile/settings',
        company: '/office/profile/settings/company',
        owner: '/office/profile/settings/owner',
        contacts: '/office/profile/settings/contacts',
        password: '/office/profile/settings/password',
      },
    },
  },
  admin: {
    root: '/admin',
    orders: '/admin/orders',
    courses: '/admin/courses',
    teachers: '/admin/teachers',
    students: '/admin/students',
  },
  auth: {
    root: '/auth',
    login: '/auth/login',
    registrationSupplier: '/auth/registration/supplier',
    registrationCompany: '/auth/registration/company',
  },
  notFound: {
    root: '*',
  },
} as const;
