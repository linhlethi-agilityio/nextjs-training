import { OPTIONS_STATUS } from '@/constants';

/**
 * Get color by value status
 */
export const getColorByValue = (value: string) => {
  const { color, bgColor } =
    OPTIONS_STATUS.find((status) => status.value === value) || {};

  return { color, bgColor };
};
