import { clearErrorOnChange } from '..'; // Adjust the import path according to your project structure

// Mock the errors object and clearErrorFunc
const mockErrors: any = {
  fieldName1: { message: 'Error message 1' },
  fieldName2: { message: 'Error message 2' },
};

const mockClearErrorFunc = jest.fn();

describe('clearErrorOnChange', () => {
  beforeEach(() => {
    mockClearErrorFunc.mockClear();
  });

  it('clears error when message exists for the specified field name', () => {
    clearErrorOnChange('fieldName1', mockErrors, mockClearErrorFunc);
    expect(mockClearErrorFunc).toHaveBeenCalledWith('fieldName1');
  });

  it('does not clear error when message does not exist for the specified field name', () => {
    clearErrorOnChange('fieldName3', mockErrors, mockClearErrorFunc);
    expect(mockClearErrorFunc).not.toHaveBeenCalled();
  });
});
