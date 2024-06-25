import { Icon, IconProps } from '@chakra-ui/react';

const CreateFolderIcon = ({ ...rest }: IconProps) => {
  return (
    <Icon viewBox="0 0 17 16" fill="none" {...rest}>
      <g clipPath="url(#clip0_16_135)">
        <path
          d="M3.41638 0C3.25038 0 3.08638 0.016 2.92938 0.048L3.12338 1.028C3.2199 1.00915 3.31804 0.99977 3.41638 1H3.87438V0H3.41638ZM5.70838 0H4.79138V1H5.70838V0ZM7.54138 0H6.62438V1H7.54138V0ZM9.37438 0H8.45838V1H9.37438V0ZM11.2084 0H10.2914V1H11.2084V0ZM13.0414 0H12.1244V1H13.0414V0ZM14.4164 0H13.9584V1H14.4164C14.5164 1 14.6154 1.01 14.7094 1.029L14.9034 0.048C14.743 0.0161758 14.5799 9.94507e-05 14.4164 0V0ZM16.4954 1.11C16.3126 0.837453 16.0782 0.603373 15.8054 0.421L15.2494 1.252C15.4134 1.362 15.5544 1.503 15.6644 1.667L16.4944 1.111L16.4954 1.11ZM2.02638 0.421C1.75383 0.603769 1.51975 0.838188 1.33738 1.111L2.16838 1.667C2.27838 1.503 2.41938 1.362 2.58338 1.252L2.02638 0.422V0.421ZM16.9164 2.5C16.9164 2.334 16.9004 2.17 16.8684 2.013L15.8884 2.207C15.9064 2.301 15.9164 2.399 15.9164 2.5V2.958H16.9164V2.5ZM0.964382 2.013C0.932558 2.17338 0.916481 2.33649 0.916382 2.5L0.916382 2.958H1.91638V2.5C1.91638 2.4 1.92638 2.301 1.94538 2.207L0.964382 2.013ZM0.916382 3.875V4.792H1.91638V3.875H0.916382ZM16.9164 4.792V3.875H15.9164V4.792H16.9164ZM0.916382 5.708V6.625H1.91638V5.708H0.916382ZM16.9164 6.625V5.708H15.9164V6.625H16.9164ZM0.916382 7.542V8.458H1.91638V7.542H0.916382ZM15.9164 8.458H16.9164V7.542H15.9164V8.458ZM0.916382 9.375V10.292H1.91638V9.375H0.916382ZM16.9164 10.292V9.375H15.9164V10.292H16.9164ZM0.916382 11.208V12.125H1.91638V11.208H0.916382ZM16.9164 12.125V11.208H15.9164V12.125H16.9164ZM0.916382 13.042V13.5C0.916382 13.666 0.932382 13.83 0.964382 13.987L1.94438 13.793C1.92553 13.6965 1.91615 13.5983 1.91638 13.5V13.042H0.916382ZM16.9164 13.5V13.042H15.9164V13.5C15.9164 13.6 15.9064 13.699 15.8874 13.793L16.8684 13.987C16.9004 13.829 16.9164 13.667 16.9164 13.5ZM1.33738 14.89C1.52038 15.162 1.75438 15.396 2.02738 15.579L2.58338 14.748C2.41924 14.6381 2.27824 14.4971 2.16838 14.333L1.33838 14.889L1.33738 14.89ZM15.8064 15.579C16.0784 15.396 16.3124 15.162 16.4954 14.889L15.6644 14.333C15.5544 14.497 15.4134 14.638 15.2494 14.748L15.8054 15.578L15.8064 15.579ZM2.92938 15.952C3.08738 15.984 3.24938 16 3.41638 16H3.87438V15H3.41638C3.31638 15 3.21738 14.99 3.12338 14.971L2.92938 15.952ZM14.4164 16C14.5824 16 14.7464 15.984 14.9034 15.952L14.7094 14.972C14.6129 14.9909 14.5147 15.0002 14.4164 15H13.9584V16H14.4164ZM4.79138 16H5.70838V15H4.79138V16ZM6.62438 16H7.54138V15H6.62438V16ZM8.45838 15V16H9.37438V15H8.45838ZM10.2914 16H11.2084V15H10.2914V16ZM12.1244 16H13.0414V15H12.1244V16ZM9.41638 4.5C9.41638 4.36739 9.3637 4.24021 9.26994 4.14645C9.17617 4.05268 9.04899 4 8.91638 4C8.78377 4 8.6566 4.05268 8.56283 4.14645C8.46906 4.24021 8.41638 4.36739 8.41638 4.5V7.5H5.41638C5.28377 7.5 5.1566 7.55268 5.06283 7.64645C4.96906 7.74021 4.91638 7.86739 4.91638 8C4.91638 8.13261 4.96906 8.25979 5.06283 8.35355C5.1566 8.44732 5.28377 8.5 5.41638 8.5H8.41638V11.5C8.41638 11.6326 8.46906 11.7598 8.56283 11.8536C8.6566 11.9473 8.78377 12 8.91638 12C9.04899 12 9.17617 11.9473 9.26994 11.8536C9.3637 11.7598 9.41638 11.6326 9.41638 11.5V8.5H12.4164C12.549 8.5 12.6762 8.44732 12.7699 8.35355C12.8637 8.25979 12.9164 8.13261 12.9164 8C12.9164 7.86739 12.8637 7.74021 12.7699 7.64645C12.6762 7.55268 12.549 7.5 12.4164 7.5H9.41638V4.5Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_16_135">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.916382)"
          />
        </clipPath>
      </defs>
    </Icon>
  );
};

export default CreateFolderIcon;
