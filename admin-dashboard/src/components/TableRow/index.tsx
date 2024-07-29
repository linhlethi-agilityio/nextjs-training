import { MouseEvent, ReactNode, memo } from 'react';
import { Tr, TableRowProps as ChakraTableRowProps } from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

interface TableRowProps extends ChakraTableRowProps {
  children: ReactNode;
  handleClickRow?: (event: MouseEvent<HTMLTableRowElement>) => void;
}

const TableRowUI = ({ children, handleClickRow, ...rest }: TableRowProps) => (
  <Tr onClick={handleClickRow} {...rest}>
    {children}
  </Tr>
);

export const TableRow = memo(TableRowUI, isEqual);
