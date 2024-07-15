import { Icon, IconProps } from '@chakra-ui/react';

const PasswordIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 22 23" fill="none" {...rest}>
      <path
        d="M15.3178 12.3637L17.0451 14.0909L20.4996 10.6364L18.7723 8.90912"
        stroke="currentColor"
        strokeWidth="2.30303"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3451 12.1546L20.4997 2"
        stroke="currentColor"
        strokeWidth="2.30303"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.68182 21C9.54366 21 11.8636 18.68 11.8636 15.8182C11.8636 12.9563 9.54366 10.6364 6.68182 10.6364C3.81998 10.6364 1.5 12.9563 1.5 15.8182C1.5 18.68 3.81998 21 6.68182 21Z"
        stroke="currentColor"
        strokeWidth="2.30303"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default PasswordIcon;
