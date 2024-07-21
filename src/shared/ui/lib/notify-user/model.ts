import { createEffect, sample, Unit } from 'effector';
import { toast } from 'react-toastify';

import { captureException, parseServerError } from 'shared/lib/utils';

export type Notification = { text: string; level?: 'error' | 'warning' | 'info' | 'success' };

export const notifyUser = (config: Notification): void =>
  void toast(config.text, { type: config.level });

export const notifyUserFx = createEffect(notifyUser);
export const notifyUserSub = <T>(config: { source: Unit<T>; fn(v: T): Notification }): void => {
  sample({ source: config.source, fn: config.fn, target: notifyUserFx });
};

export const showErrorMessage = (errMessage: string): void =>
  notifyUser({ text: errMessage, level: 'error' });

export const showFxErrors = <T>(clock: Unit<T>[]): void => {
  sample({
    clock,
    fn: (err): Notification => {
      captureException(err as Error);
      return { text: parseServerError(err), level: 'error' };
    },
    target: notifyUserFx,
  });
};
