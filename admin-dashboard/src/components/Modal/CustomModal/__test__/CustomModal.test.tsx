import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Box } from '@chakra-ui/react';

// Components
import { CustomModal } from '..';

const mockProps = {
  isOpen: true,
  onClose: jest.fn(),
  title: 'Order Detail',
  children: (
    <Box>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt quasi
      Aliquid totam blanditiis quae quia repellat eos unde consequuntur laborum!
    </Box>
  ),
};

describe('CustomModal component', () => {
  it('should match snapshot for CustomModal', () => {
    const { container } = render(<CustomModal {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
