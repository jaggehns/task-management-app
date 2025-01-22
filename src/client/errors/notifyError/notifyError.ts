import { toast } from 'react-toastify';

export const notifyError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000
  });
};
