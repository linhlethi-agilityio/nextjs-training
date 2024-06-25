import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import SearchInput from '..';

const mockOnChange = jest.fn();

const mockProps = {
  onChange: mockOnChange,
};
describe('SearchInput component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should match snapshot for SearchInput', () => {
    const { container } = render(<SearchInput {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('calls onChange with the deferred query value', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput placeholder="Search" value="" onChange={handleChange} />,
    );

    const inputElement = getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'apple' } });

    // Simulate useDeferredValue delay
    jest.runAllTimers();

    expect(handleChange).toHaveBeenCalledWith({
      target: { value: 'apple' },
    });
  });
});
