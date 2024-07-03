'use client';

import { useCallback, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';

// Components
import { Dropdown } from '@/components';

// Constants
import { OPTIONS_PAGINATION } from '@/constants';

interface OrderHeaderProps {
  limit: number;
}

const OrderHeader = ({ limit }: OrderHeaderProps) => {
  const [value, setValue] = useState<number>(limit);

  const pathname = usePathname();
  const { replace } = useRouter();

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

export default OrderHeader;
