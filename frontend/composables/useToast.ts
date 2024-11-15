// ~/composables/useToast.ts
import { useToast } from 'maz-ui';

export const useCustomToast = () => {
  const toast = useToast();

  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  const showErrorToast = (message: string) => {
    toast.error(message);
  };

  const showInfoToast = (message: string) => {
    toast.info(message);
  };

  const showWarnToast = (message: string) => {
    toast.warning(message);
  }

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarnToast
  };
};
