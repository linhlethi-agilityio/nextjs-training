export const ERROR_MESSAGES = {
  FIELD_REQUIRED: 'This field is required',
  INVALID_PRICE: 'Invalid price. Please help to try again. example: 5.05',
  INVALID_NAME: (fieldName: string) => `Please enter a valid ${fieldName}`,
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_NOT_MATCH:
    'Confirm password not matching. Please help to try again!',
  MIN_PASSWORD_LENGTH: (length: number) =>
    `Please enter at least ${length} characters`,
};

export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'Register user success!!',
  LOGIN_SUCCESS: 'Login success!!',
  LOGOUT_SUCCESS: 'Logout success!!',
  ADD_PRODUCT_SUCCESS: 'Add product order success!!',
  REMOVE_PRODUCT_SUCCESS: 'Remove product order success!!',
  REMOVE_CUSTOMER_SUCCESS: 'Remove product customer success!!',
};

export const MESSAGES = {
  EMPTY_DATA: 'There is no data to show you right now!',
  EMPTY_SEARCH: 'No result is matched with this searching.',
};
