import toast from 'react-hot-toast';

export const handleSuccess = (message: string) => {
    toast.success(message)
}

export const handleError = (message: string) => {
    toast.error(message)
}