import { toast } from 'react-toastify';

export const notifyError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.';
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000
  });
};
