'use client';

import { ChangeEvent, memo, useEffect, useRef } from 'react';
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

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <InputGroup width="auto">
      <InputLeftElement pl={30} style={{ cursor: 'pointer' }}>
        <SearchIcon />
      </InputLeftElement>
      <Input
        bgColor="backgroundLight"
        pl={66}
        ref={searchInputRef}
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
