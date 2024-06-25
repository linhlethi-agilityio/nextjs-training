import { ReactNode, memo } from 'react';
import { Flex, HStack, Text } from '@chakra-ui/react';

export interface SideBarItemProps {
  isFocused?: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const SideBarItem = ({
  label = '',
  isFocused = false,
  icon,
  onClick,
}: SideBarItemProps) => (
  <HStack
    data-testid={`sidebar-item-${label}`}
    spacing={isFocused ? 2 : 3}
    onClick={onClick}
    py={3.5}
    pl={15}
    w="full"
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
      {icon}
    </Flex>
    <Text color={isFocused ? 'textPrimary' : 'textDefault'} size="xs">
      {label}
    </Text>
  </HStack>
);

export default memo(SideBarItem);
