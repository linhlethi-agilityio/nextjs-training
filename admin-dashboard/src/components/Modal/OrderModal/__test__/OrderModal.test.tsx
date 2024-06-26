import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { OrderModal } from '..';

// Mock handleOnChange function
const mockHandleSubmitForm = jest.fn();
const mockOnclose = jest.fn();

const mockProps = {
  isOpen: true,
  onClose: mockOnclose,
  handleSubmitForm: mockHandleSubmitForm,
};

describe('OrderModal component', () => {
  it('should match snapshot for OrderModal', () => {
    const { container } = render(<OrderModal {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
