import { Icon, IconProps } from '@chakra-ui/react';

const SearchIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 17 16" fill="none" {...rest}>
      <g clipPath="url(#clip0_16_102)">
        <path
          d="M12.0725 10.344C13.0408 9.0227 13.4745 7.3845 13.2869 5.75716C13.0992 4.12982 12.304 2.63335 11.0603 1.56714C9.81666 0.50093 8.2163 -0.0563875 6.57938 0.00668566C4.94247 0.0697588 3.38973 0.748571 2.23182 1.90732C1.0739 3.06606 0.396199 4.61929 0.334297 6.25624C0.272396 7.8932 0.830858 9.49317 1.89796 10.7361C2.96505 11.9789 4.46209 12.7731 6.08957 12.9596C7.71704 13.1461 9.35493 12.7112 10.6755 11.742H10.6745C10.7045 11.782 10.7365 11.82 10.7725 11.857L14.6225 15.707C14.8101 15.8946 15.0644 16.0001 15.3297 16.0002C15.595 16.0003 15.8494 15.895 16.037 15.7075C16.2247 15.52 16.3302 15.2656 16.3303 15.0004C16.3303 14.7351 16.2251 14.4806 16.0375 14.293L12.1875 10.443C12.1518 10.4068 12.1134 10.3734 12.0725 10.343V10.344ZM12.3305 6.50001C12.3305 7.22228 12.1883 7.93748 11.9119 8.60477C11.6355 9.27206 11.2304 9.87837 10.7196 10.3891C10.2089 10.8998 9.6026 11.3049 8.93531 11.5813C8.26802 11.8577 7.55282 12 6.83055 12C6.10828 12 5.39308 11.8577 4.72579 11.5813C4.0585 11.3049 3.45218 10.8998 2.94146 10.3891C2.43074 9.87837 2.02561 9.27206 1.74921 8.60477C1.47281 7.93748 1.33055 7.22228 1.33055 6.50001C1.33055 5.04132 1.91001 3.64237 2.94146 2.61092C3.97291 1.57947 5.37186 1.00001 6.83055 1.00001C8.28924 1.00001 9.68819 1.57947 10.7196 2.61092C11.7511 3.64237 12.3305 5.04132 12.3305 6.50001Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_16_102">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.330566)"
          />
        </clipPath>
      </defs>
    </Icon>
  );
};

export default SearchIcon;
