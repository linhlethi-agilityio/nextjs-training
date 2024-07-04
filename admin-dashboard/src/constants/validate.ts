export const REGEX_PATTERN = {
  NAME: /^[a-zA-Z ]{1,40}$/,
  STRING: /^[a-zA-Z]*$/,
  NOT_NUMBER: /\D/g,
  NON_TRAILING_ZEROS: /^0+(?!$)/,
  DECIMAL: /^\d+(\.\d{0,2})?$/,
};
