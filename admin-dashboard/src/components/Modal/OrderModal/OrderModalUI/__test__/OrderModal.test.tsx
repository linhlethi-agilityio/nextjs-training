import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import OrderModal from '..';

const customers = [
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
];

// Mock handleOnChange function
const mockOnSubmitForm = jest.fn();
const mockOnclose = jest.fn();

const mockProps = {
  title: 'Add order',
  isOpen: true,
  onClose: mockOnclose,
  onSubmitForm: mockOnSubmitForm,
  getTotalCustomers: jest.fn(() =>
    Promise.resolve({
      data: customers,
    }),
  ),
};

describe('OrderModal component', () => {
  it('should match snapshot for OrderModal', () => {
    const { container } = render(<OrderModal {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
