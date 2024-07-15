import { Icon, IconProps } from '@chakra-ui/react';

const UsersIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 22 22" fill="none" {...rest}>
      <circle
        cx={8.25}
        cy={6.417}
        r={3.667}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
      />
      <circle
        cx={8.25}
        cy={6.417}
        r={3.667}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M2.75 19.25v-1.833a3.667 3.667 0 0 1 3.667-3.667h3.666a3.667 3.667 0 0 1 3.667 3.667v1.833"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M2.75 19.25v-1.833a3.667 3.667 0 0 1 3.667-3.667h3.666a3.667 3.667 0 0 1 3.667 3.667v1.833M14.667 2.87a3.667 3.667 0 0 1 0 7.103"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M14.667 2.87a3.667 3.667 0 0 1 0 7.103M19.25 19.25v-1.833a3.667 3.667 0 0 0-2.75-3.53"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M19.25 19.25v-1.833a3.667 3.667 0 0 0-2.75-3.53"
      />
    </Icon>
  );
};

export default UsersIcon;
