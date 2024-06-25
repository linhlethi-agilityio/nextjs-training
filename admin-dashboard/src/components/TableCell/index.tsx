import { ReactNode, memo } from 'react';
import isEqual from 'react-fast-compare';
import { Td, TableCellProps as ChakraTableCellProps } from '@chakra-ui/react';

interface TableCellProps extends ChakraTableCellProps {
  children: ReactNode;
}

const TableCell = ({ children, ...rest }: TableCellProps) => (
  <Td fontSize="md" lineHeight={2} color="textDark" {...rest}>
    {children}
  </Td>
);

export default memo(TableCell, isEqual);
