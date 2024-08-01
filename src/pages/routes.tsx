import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { PATHS } from 'shared/config';

import { AuthGuard } from 'entities/session';

import { Layout } from 'pages/office';
import { NotFoundPage } from 'pages/not-found-page';
import { LoginPage } from 'pages/auth/login-page';
import { RegistrationCompanyPage } from 'pages/auth/registration-company-page';
import { RegistrationSupplierPage } from 'pages/auth/registration-supplier-page';
import { GoodsPage } from 'pages/office/goods-page';
import { SettingsLayout } from 'pages/office/profile/settings-page';
import { SettingsCompanyPage } from 'pages/office/profile/settings-page/company-page';
import { SettingsOwnerPage } from 'pages/office/profile/settings-page/owner-page';
import { SettingsContactsPage } from 'pages/office/profile/settings-page/contacts-page';
import { SettingsPasswordPage } from 'pages/office/profile/settings-page/password-page';
import { AuthLayout } from './auth';
import { CartPage } from './office/cart-page/ui/cart-page';
import { MyGoodsPage } from './office/my-goods-page';
import { SuppliersPage } from './office/suppliers-page';
import { MyOrdersPage } from './office/my-orders-page';
import { OneGoodsPage } from './office/one-goods-page';

const routesMap = [
  {
    path: PATHS.root,
    element: <Navigate to={PATHS.office.root} />,
  },
  {
    path: PATHS.auth.root,
    element: <AuthLayout />,
    children: [
      {
        path: PATHS.auth.login,
        element: <LoginPage />,
      },
      {
        path: PATHS.auth.registrationSupplier,
        element: <RegistrationSupplierPage />,
      },
      {
        path: PATHS.auth.registrationCompany,
        element: <RegistrationCompanyPage />,
      },
    ],
  },
  {
    path: PATHS.office.root,
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        path: PATHS.office.cart,
        element: <CartPage />,
      },
      {
        path: PATHS.office.allGoods,
        element: <GoodsPage />,
      },
      {
        path: PATHS.office.myGoods,
        element: <MyGoodsPage />,
      },
      {
        path: PATHS.office.oneGoods + '/:oneGoodsId',
        element: <OneGoodsPage />,
      },
      {
        path: PATHS.office.suppliers,
        element: <SuppliersPage />,
      },
      {
        path: PATHS.office.orders,
        element: <MyOrdersPage />,
      },
      {
        path: PATHS.office.profile.root,
        element: <Navigate to={PATHS.office.profile.courses} />,
      },
      {
        path: PATHS.office.profile.settings.root,
        element: <SettingsLayout />,
        children: [
          {
            path: PATHS.office.profile.settings.owner,
            element: <SettingsOwnerPage />,
          },
          {
            path: PATHS.office.profile.settings.company,
            element: <SettingsCompanyPage />,
          },
          {
            path: PATHS.office.profile.settings.contacts,
            element: <SettingsContactsPage />,
          },
          {
            path: PATHS.office.profile.settings.password,
            element: <SettingsPasswordPage />,
          },
        ],
      },
    ],
  },
  {
    path: PATHS.notFound.root,
    element: <NotFoundPage />,
  },
];

export const Routes: React.FC = () => useRoutes(routesMap);
