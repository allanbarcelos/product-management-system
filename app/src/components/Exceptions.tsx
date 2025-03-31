import { useEffect } from 'react';
import { toast, ToastContent, ToastOptions } from 'react-toastify';

const Exceptions = () => {
    useEffect(() => {
        const handleGlobalError = (event: ErrorEvent) => {
            const message: ToastContent = `Erro: ${event.message}`;
            const options: ToastOptions = {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                toastId: `${message}`,
            };
            if (!toast.isActive(`${message}`)) {
                toast.error(message, options);
            }
        };

        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            toast.error(`Promise error: ${event.reason.message || event.reason}`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        };

        window.addEventListener('error', handleGlobalError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('error', handleGlobalError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    return null; // O componente não renderiza nada
};

export default Exceptions;