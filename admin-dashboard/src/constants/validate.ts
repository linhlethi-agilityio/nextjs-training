export const REGEX_PATTERN = {
  NAME: /^[a-zA-Z ]{1,40}$/,
  NON_TRAILING_ZEROS: /^0+(?!$)/,
  DECIMAL: /^\d+(\.\d{0,2})?$/,
};

export const LIMIT_PAGE = [10, 20, 50];

export const DEFAULT_LIMIT = 10;
