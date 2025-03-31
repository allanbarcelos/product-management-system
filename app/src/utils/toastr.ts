import { toast, ToastOptions } from "react-toastify";
export const toastr = (type: 'error' | 'warning' | 'success', message: string) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    toastId: `${message}`,
  };
  if (!toast.isActive(`${message}`)) {
    switch (type) {
        case 'error': toast.error(message, options); break;
        case 'warning': toast.warning(message, options); break;
        case 'success': toast.success(message, options); break;
        default: toast.info(message, options); break;
    }
  }
};
