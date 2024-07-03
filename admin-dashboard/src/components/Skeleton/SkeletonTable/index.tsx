import { Table, Thead, Tbody, Tr, Th, Td, Skeleton } from '@chakra-ui/react';

const SkeletonTable = () => {
  return (
    <Table>
      <Thead>
        <Tr>
          {Array(4)
            .fill('')
            .map((_, index) => (
              <Th key={index}>
                <Skeleton height={4} />
              </Th>
            ))}
        </Tr>
      </Thead>
      <Tbody>
        {Array(5)
          .fill('')
          .map((_, rowIndex) => (
            <Tr key={rowIndex}>
              {Array(4)
                .fill('')
                .map((_, colIndex) => (
                  <Td key={colIndex}>
                    <Skeleton height={4} />
                  </Td>
                ))}
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default SkeletonTable;
