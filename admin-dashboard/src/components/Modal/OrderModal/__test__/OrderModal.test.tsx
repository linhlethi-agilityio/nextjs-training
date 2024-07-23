import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import OrderModal from '..';

// Api
import * as api from '@/api';

jest.mock('@/api');

// Mock handleOnChange function
const mockOnSubmitForm = jest.fn();
const mockOnclose = jest.fn();

const mockProps = {
  title: 'Add order',
  isLoading: false,
  isOpen: true,
  onClose: mockOnclose,
  onSubmitForm: mockOnSubmitForm,
};

describe('OrderModal component', () => {
  it('should match snapshot for OrderModal', async () => {
    jest.spyOn(api, 'getTotalCustomers').mockResolvedValue({
      data: [
        {
          createdAt: '2024-07-21T00:07:42.462Z',
          name: 'Connie Smitham',
          email: 'Ansley_Jast7@hotmail.com',
          phoneNumber: '566-231-4136',
          dateOfBirth: '1979-11-21T13:46:01.346Z',
          shippingAddress: 'East',
          id: '1',
        },
        {
          createdAt: '2024-07-21T05:43:59.000Z',
          name: 'Terence Murphy',
          email: 'Johnson_Mayer@hotmail.com',
          phoneNumber: '263-583-0766',
          dateOfBirth: '1966-05-03T08:57:27.517Z',
          shippingAddress: 'South',
          id: '2',
        },
      ],
    });

    const OrderModalRender = await OrderModal({
      ...mockProps,
    });

    const { container } = render(OrderModalRender);

    expect(container).toMatchSnapshot();
  });
});
