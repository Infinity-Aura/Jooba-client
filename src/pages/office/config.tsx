import React from 'react';
import { PATHS } from 'shared/config/paths';
import {
  HandshakeIcon,
  LocalMallIcon,
  SettingsIcon,
  ShoppingCartIcon,
  StoreIcon,
  StorefrontIcon,
} from 'shared/ui/icons';

export type DropdownNavigation = {
  title: string;
  perms?: string[];
  path: string;
  icon: React.ReactNode;
};

export const ITEMS_TOP: DropdownNavigation[] = [
  {
    title: 'Cart',
    path: PATHS.office.cart,
    perms: ['company'],
    icon: <ShoppingCartIcon />,
  },
  {
    title: 'Orders',
    path: PATHS.office.orders,
    icon: <LocalMallIcon />,
  },
  {
    title: 'All Goods',
    path: PATHS.office.allgoods,
    icon: <StoreIcon />,
  },
  {
    title: 'My Goods',
    path: PATHS.office.mygoods,
    icon: <StorefrontIcon />,
  },
  {
    title: 'Suppliers',
    path: PATHS.office.suppliers,
    icon: <HandshakeIcon />,
  },
];

export const ITEMS_BOTTOM: DropdownNavigation[] = [
  {
    title: 'Settings',
    path: PATHS.office.profile.settings.owner,
    icon: <SettingsIcon />,
  },
];
