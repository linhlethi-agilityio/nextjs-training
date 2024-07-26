import { ReactNode, memo } from 'react';
import { Tr, TableRowProps as ChakraTableRowProps } from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

interface TableRowProps extends ChakraTableRowProps {
  children: ReactNode;
  handleClickRow?: () => void;
}

const TableRowUI = ({ children, handleClickRow, ...rest }: TableRowProps) => (
  <Tr onClick={handleClickRow} {...rest}>
    {children}
  </Tr>
);

export const TableRow = memo(TableRowUI, isEqual);
