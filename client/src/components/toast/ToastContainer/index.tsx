import Toast from '../Toast';
import { useToastStateContext } from '@contexts/toastContext';

export default function ToastContainer(): JSX.Element {
  const { toasts } = useToastStateContext();

  return (
    <div>
      {toasts &&
        toasts.map((toast) => <Toast id={toast.id} key={toast.id} type={toast.type} message={toast.message} />)}
    </div>
  );
}
