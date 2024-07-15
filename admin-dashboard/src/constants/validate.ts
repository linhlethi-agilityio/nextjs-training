export const REGEX_PATTERN = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NAME: /^[a-zA-Z ]{1,40}$/,
  NON_TRAILING_ZEROS: /^0+(?!$)/,
  DECIMAL: /^\d+(\.\d{0,2})?$/,
};

export const MIN_PASSWORD_LENGTH = 6;

export const LIMIT_PAGE = [10, 20, 50];

export const DEFAULT_LIMIT = 10;
