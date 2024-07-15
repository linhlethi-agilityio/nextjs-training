import { Icon, IconProps } from '@chakra-ui/react';

const ShowEyeIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ShowEyeIcon;
