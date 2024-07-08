import { REGEX_PATTERN } from '@/constants';

// Function to remove leading zeros from integer values
export const normalizeValue = (val: string) => {
  if (val.includes('.')) {
    // For decimals, remove leading zeros only from the integer part
    const [integerPart, decimalPart] = val.split('.');
    const normalizedIntegerPart = integerPart.replace(
      REGEX_PATTERN.NON_TRAILING_ZEROS,
      '',
    );

    return `${normalizedIntegerPart}.${decimalPart}`;
  }

  // For integers, remove leading zeros
  return val.replace(REGEX_PATTERN.NON_TRAILING_ZEROS, '');
};
