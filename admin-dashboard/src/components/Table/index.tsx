import { ReactNode, memo } from 'react';
import { Table as BaseTable, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import isEqual from 'react-fast-compare';

// Components
import { SkeletonTable, TableCell, TableRow } from '@/components';

export type TTableAccessor<T> =
  | ((item: T, inputProps?: object) => ReactNode)
  | keyof T;

export interface TableColumnType<T> {
  fieldName?: string;
  accessor: TTableAccessor<T>;
  header?: string | ReactNode;
}

interface CustomTableProps<T> {
  columns: TableColumnType<T>[];
  data: T[];
  isLoading: boolean;
}

const TableCustom = <T extends { id: string }>({
  columns,
  data,
  isLoading,
}: CustomTableProps<T>) => {
  const headerRow = (
    <Tr>
      {columns.map((columnConfig, index) => {
        const { header } = columnConfig;

        return (
          <Th
            key={`${header}${index}`}
            borderBottomWidth={1}
            py={4}
            color="textDefault"
            fontWeight="normal"
            textTransform="capitalize"
            lineHeight={1}
            fontSize="md"
          >
            {header}
          </Th>
        );
      })}
    </Tr>
  );

  const renderCell = (item: T, accessor: TTableAccessor<T>): ReactNode => {
    if (typeof accessor === 'string') return item[accessor] as ReactNode;

    if (typeof accessor === 'function') return accessor(item);
  };

  return (
    <BaseTable bgColor="backgroundLight">
      <Thead>{headerRow}</Thead>
      <Tbody>
        {isLoading ? (
          <SkeletonTable columns={columns} />
        ) : (
          data.map((item, index) => (
            <TableRow key={`table-row-${index}`} data-id={item.id}>
              {columns.map((columnConfig, indexColumn) => (
                <TableCell key={`table-cell-${indexColumn}`}>
                  {renderCell(item, columnConfig.accessor)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </Tbody>
    </BaseTable>
  );
};

export const Table = memo(TableCustom, isEqual) as <T>(
  props: CustomTableProps<T>,
) => JSX.Element;
