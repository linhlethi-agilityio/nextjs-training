'use client';

import { Flex, Text } from '@chakra-ui/react';

// Components
import { Dropdown } from '@/components';

// Constants
import { OPTIONS_PAGINATION } from '@/constants';

const ProductLimit = () => {
  const handleChangeLimitPage = () => {
    // TODO: update later
  };

  return (
    <Flex pl={7} mb={4} justifyContent="space-between" alignItems="center">
      <Text color="textDefault">Showing result 101-120 Result</Text>
      <Flex alignItems="center" gap={15}>
        <Text color="textDefault">Item per page</Text>
        <Dropdown
          value="10"
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
