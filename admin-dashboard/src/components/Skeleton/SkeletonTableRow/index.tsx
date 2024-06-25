import { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Skeleton as SkeletonBase } from '@chakra-ui/react';

// Components
import { TableCell, TableColumnType, TableRow } from '@/components';

interface SkeletonTableRowProps<T> {
  columns: TableColumnType<T>[];
}

const SkeletonTableRow = <T,>({ columns }: SkeletonTableRowProps<T>) => {
  const skeletonRows = [];

  for (let i = 0; i < 3; i++) {
    skeletonRows.push(
      <TableRow key={`table-row-${i}`}>
        {columns.map((_, indexColumn) => (
          <TableCell
            bgColor="backgroundLight"
            borderBottomWidth={1}
            key={`table-cell-${indexColumn}`}
          >
            <SkeletonBase h={7} w={16} borderRadius={0} />
          </TableCell>
        ))}
      </TableRow>,
    );
  }

  return skeletonRows;
};

export const SkeletonTable = memo(SkeletonTableRow, isEqual) as <T>(
  props: SkeletonTableRowProps<T>,
) => JSX.Element;
