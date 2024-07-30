// Models
import { Order } from '@/models';

// Components
import OrderModalUI from './OrderModalUI';

// Api
import { getTotalCustomers } from '@/api';

interface CustomerModalDetailModalProps {
  title?: string;
  isOpen: boolean;
  isLoading?: boolean;
  previewData?: Order | null;
  onSubmitForm: (data: Partial<Order>) => void;
  onClose: () => void;
}

const OrderModal = async ({
  title = 'Add Order',
  isLoading = false,
  isOpen,
  previewData,
  onClose,
  onSubmitForm,
}: CustomerModalDetailModalProps) => {
  return (
    <OrderModalUI
      isOpen={isOpen}
      isLoading={isLoading}
      title={title}
      previewData={previewData}
      onClose={onClose}
      getTotalCustomers={getTotalCustomers}
      onSubmitForm={onSubmitForm}
    />
  );
};

export default OrderModal;
