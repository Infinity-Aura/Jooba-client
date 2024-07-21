export const captureException = (e: Error, info?: unknown): void => {
  console.error('Exception captured: ', e, info);
};

type ServerError = {
  message?: string;
  body?: { message: string };
  response?: { statusCode?: string; status: string; data: { message: string } | string };
};

export const parseServerError = (e: ServerError | unknown): string => {
  const err = e as ServerError;
  if (err?.body?.message.length) {
    return err.body.message;
  } else if ('message' in (e as ServerError) || 'response' in (e as ServerError)) {
    if (err.response && err.response.statusCode?.toString()[0] !== '2') {
      const message =
        typeof err.response.data === 'string' ? err.response.data : err.response.data.message;
      let errorMessage = '';

      if (message) {
        errorMessage = message;
      } else if (err.response.status && err.response.statusCode) {
        errorMessage = `Server error (${err.response?.status} ${err.response?.statusCode})`;
      } else {
        errorMessage = 'Server error';
      }

      return errorMessage;
    } else {
      return err.message || 'Something went wrong';
    }
  } else {
    return String(e);
  }
};
