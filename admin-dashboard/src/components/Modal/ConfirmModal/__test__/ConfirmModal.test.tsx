import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import ConfirmModal from '..';

const mockProps = {
  isOpen: true,
  description: 'Are you sure you would like to delete order',
  title: 'Delete Order',
  buttonLabel: 'Submit',
  onConfirm: jest.fn(),
  onCancel: jest.fn(),
};

describe('ConfirmModal component', () => {
  it('should match snapshot for ConfirmModal', () => {
    const { container } = render(<ConfirmModal {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
