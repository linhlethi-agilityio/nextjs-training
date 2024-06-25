import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { Dropdown } from '..';

const options = [
  {
    value: 'ascending',
    label: 'Ascending',
  },
  {
    value: 'descending',
    label: 'Descending',
  },
];

// Mock handleOnChange function
const mockHandleOnChange = jest.fn();

const mockProps = {
  placeholder: 'Sort by',
  options: options,
  onChangeValue: mockHandleOnChange,
};

describe('Dropdown component', () => {
  it('should match snapshot for BrandLogo', () => {
    const { container } = render(<Dropdown {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('calls handleOnChange when an option is selected', () => {
    const { getByRole } = render(<Dropdown {...mockProps} />);

    const selectElement = getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'ascending' } });

    expect(mockHandleOnChange).toHaveBeenCalled();
  });
});
