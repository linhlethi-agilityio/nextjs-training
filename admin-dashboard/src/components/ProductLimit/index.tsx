'use client';

import { useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';

// Components
import { Dropdown } from '@/components';

// Constants
import { OPTIONS_PAGINATION } from '@/constants';

interface ProductProps {
  limit: number;
}

const ProductLimit = ({ limit }: ProductProps) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const [value, setValue] = useState<number>(limit);

  const handleChangeLimitPage = (value: string) => {
    setValue(Number(value));
    replace(`${pathname}?limit=${value}`);
  };

  return (
    <Flex pl={7} mb={4} justifyContent="space-between" alignItems="center">
      <Text color="textDefault">Showing result 101-120 Result</Text>
      <Flex alignItems="center" gap={15}>
        <Text color="textDefault">Item per page</Text>
        <Dropdown
          value={value}
          color="textDark"
          options={OPTIONS_PAGINATION}
          onChangeValue={handleChangeLimitPage}
          h={26}
          w={70}
        />
      </Flex>
    </Flex>
  );
};

export default ProductLimit;
