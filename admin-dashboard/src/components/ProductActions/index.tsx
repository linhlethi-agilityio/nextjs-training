'use client';

import { memo } from 'react';
import { Button, Flex } from '@chakra-ui/react';

// Icons
import { FileArrowUpIcon, PrinterIcon, CreateFolderIcon } from '@/icons';

// Components
import { SearchInput } from '@/components';

const ProductActions = () => {
  const handleChangeSearchInput = () => {
    //TODO: update later
  };

  return (
    <Flex justifyContent="space-between" mt={26} ml={8}>
      <SearchInput onChange={handleChangeSearchInput} w={465} />
      <Flex gap={25}>
        <Button variant="outline" rightIcon={<FileArrowUpIcon />}>
          Export
        </Button>
        <Button variant="outline" rightIcon={<PrinterIcon />}>
          Print
        </Button>
        <Button rightIcon={<CreateFolderIcon />} colorScheme="brand" px={25}>
          Create Folder
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(ProductActions);
