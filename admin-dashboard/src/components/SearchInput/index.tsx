'use client';

import { memo, useState, useDeferredValue, useEffect } from 'react';
import {
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react';

// Icons
import { SearchIcon, SlidersIcon } from '@/icons';

interface SearchInputProps extends InputProps {
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  placeholder = 'Search',
  value = '',
  onChange,
  ...rest
}: SearchInputProps) => {
  const [query, setQuery] = useState(value);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    // Trigger the parent's onChange handler with the deferred query value
    onChange({
      target: { value: deferredQuery },
    } as React.ChangeEvent<HTMLInputElement>);
  }, [deferredQuery, onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <InputGroup width="auto">
      <InputLeftElement pl={30} style={{ cursor: 'pointer' }}>
        <SearchIcon />
      </InputLeftElement>
      <Input
        pl={66}
        placeholder={placeholder}
        onChange={handleChange}
        value={query}
        {...rest}
      />
      <InputRightElement pr={10} style={{ cursor: 'pointer' }}>
        <SlidersIcon />
      </InputRightElement>
    </InputGroup>
  );
};

export default memo(SearchInput);
