import { memo } from 'react';
import { Flex, HStack, IconProps, Text } from '@chakra-ui/react';
import Link from 'next/link';

export interface SideBarItemProps {
  isFocused?: boolean;
  icon: React.FC<IconProps>;
  label: string;
  path: string;
}

const SideBarItem = ({
  label = '',
  isFocused = false,
  icon,
  path,
}: SideBarItemProps) => {
  const Icon = icon;

  return (
    <Link href={path} style={{ width: '-webkit-fill-available' }}>
      <HStack
        data-testid={`sidebar-item-${label}`}
        spacing={isFocused ? 2 : 3}
        py={3.5}
        pl={15}
        transition="1s"
        color={isFocused ? 'textPrimary' : 'textDefault'}
        cursor="pointer"
        {...(isFocused && {
          border: '1px solid',
          borderRadius: '2xl',
          borderColor: 'borderPrimary',
        })}
      >
        <Flex
          {...(isFocused && {
            p: 1,
            bgColor: 'backgroundSiBarItem',
            borderRadius: 'base',
          })}
        >
          <Icon w={4} h={4} />
        </Flex>
        <Text color={isFocused ? 'textPrimary' : 'textDefault'} size="xs">
          {label}
        </Text>
      </HStack>
    </Link>
  );
};

export default memo(SideBarItem);
