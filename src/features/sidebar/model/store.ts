import { createDomain } from 'effector';

const domain = createDomain('entities/session');

export const openRequested = domain.event();
export const closeRequested = domain.event();

export const $opened = domain.store<boolean>(false);

$opened.on(openRequested, () => true).on(closeRequested, () => false);
