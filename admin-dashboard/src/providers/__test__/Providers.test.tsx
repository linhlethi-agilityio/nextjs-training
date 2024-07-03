// Libs
import { render } from '@testing-library/react';

// Components
import { ChakraUIProvider } from '..';

jest.mock('next/font/google', () => ({
  Open_Sans: jest.fn().mockReturnValue({ style: { fontFamily: 'open_sans' } }),
}));

describe('ChakraUIProvider component', () => {
  it('should render ChakraUIProvider successfully', () => {
    const { getByText } = render(
      <ChakraUIProvider>
        <div>Test</div>
      </ChakraUIProvider>,
    );

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('should match snapshot for ChakraUIProvider', () => {
    const { container } = render(
      <ChakraUIProvider>
        <div>Test</div>
      </ChakraUIProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
