'use client';

import { ChangeEvent, memo } from 'react';
import {
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react';
import { useDebouncedCallback } from 'use-debounce';

// Icons
import { SearchIcon, SlidersIcon } from '@/icons';

interface SearchInputProps extends InputProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch: (value: string) => void;
}

const SearchInput = ({
  placeholder = 'Search',
  defaultValue = '',
  onSearch,
  ...rest
}: SearchInputProps) => {
  const handleChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      onSearch(value);
    },
    300,
  );

  return (
    <InputGroup width="auto">
      <InputLeftElement pl={30} style={{ cursor: 'pointer' }}>
        <SearchIcon />
      </InputLeftElement>
      <Input
        bgColor="backgroundLight"
        pl={66}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...rest}
      />
      <InputRightElement pr={10} style={{ cursor: 'pointer' }}>
        <SlidersIcon />
      </InputRightElement>
    </InputGroup>
  );
};

export default memo(SearchInput);
