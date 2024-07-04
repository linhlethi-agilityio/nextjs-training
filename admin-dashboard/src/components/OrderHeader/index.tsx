'use client';

import { useCallback, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';

// Components
import { Dropdown } from '@/components';

// Constants
import { OPTIONS_PAGINATION } from '@/constants';

interface OrderHeaderProps {
  limit?: number;
  page?: number;
}

const OrderHeader = ({ limit = 10, page = 1 }: OrderHeaderProps) => {
  const [value, setValue] = useState<number>(limit);

  const pathname = usePathname();
  const { replace } = useRouter();

  const startResult = (page - 1) * limit + 1;
  const endResult = page * limit;

  /**
   * Function handle change limit page
   */
  const handleChangeLimitPage = useCallback(
    (value: string) => {
      setValue(Number(value));
      replace(`${pathname}?limit=${value}`);
    },
    [pathname, replace],
  );

  return (
    <Flex pl={7} mb={4} justifyContent="space-between" alignItems="center">
      <Text color="textDefault">
        Showing result {startResult}-{endResult} Result
      </Text>
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

export default OrderHeader;
