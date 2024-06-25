import { Box, Spinner as SpinnerChakraUI } from '@chakra-ui/react';

const LoadingIndicator = (): JSX.Element => {
  return (
    <Box>
      <SpinnerChakraUI
        size="lg"
        thickness="4px"
        speed="0.65s"
        color="brand.500"
      />
    </Box>
  );
};

export default LoadingIndicator;
