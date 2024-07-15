import { Icon, IconProps } from '@chakra-ui/react';

const EmailIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 22 18" {...rest}>
      <path
        d="M21.5 2.15001C21.5 0.967503 20.5325 0 19.35 0H2.14998C0.967472 0 -3.05176e-05 0.967503 -3.05176e-05 2.15001V15.05C-3.05176e-05 16.2325 0.967472 17.2001 2.14998 17.2001H19.35C20.5325 17.2001 21.5 16.2325 21.5 15.05V2.15001ZM19.35 2.15001L10.75 7.52502L2.14998 2.15001H19.35ZM19.35 15.05H2.14998V4.30001L10.75 9.67503L19.35 4.30001V15.05Z"
        fill="currentColor"
      />
    </Icon>
  );
};

export default EmailIcon;
