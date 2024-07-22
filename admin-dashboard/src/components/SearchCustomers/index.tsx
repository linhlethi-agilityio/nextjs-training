'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box } from '@chakra-ui/react';

// Components
import { SearchInput } from '@/components';

const SearchCustomers = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchValue = useMemo(
    () => searchParams.get('query') ?? '',
    [searchParams],
  );

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      params.set('page', '1');

      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  return (
    <Box mt={26} ml={8} w="fit-content">
      <SearchInput
        placeholder="Search by customer name"
        w={465}
        onSearch={handleSearch}
        defaultValue={searchValue}
      />
    </Box>
  );
};

export default SearchCustomers;
