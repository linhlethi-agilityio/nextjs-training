'use client';

import { ChangeEvent, memo } from 'react';
import { Select, SelectProps } from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

export interface Option {
  value: string;
  label: string;
}

interface DropdownProps extends SelectProps {
  options: Option[];
  color?: string;
  placeholder?: string;
  onChangeValue: (value: string) => void;
}

const DropdownUI = ({
  options,
  placeholder = '',
  color = 'textDefault',
  width = 108,
  onChangeValue,
  ...rest
}: DropdownProps) => {
  /**
   * Function handle select dropdown
   */
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    onChangeValue(newValue);
  };

  return (
    <Select
      placeholder={placeholder}
      color={color}
      aria-label="Select"
      onChange={handleSelect}
      lineHeight={2}
      w={width}
      {...rest}
    >
      {options.map((option) => {
        const { value = '', label = '' } = option;

        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </Select>
  );
};

export const Dropdown = memo(DropdownUI, isEqual);
