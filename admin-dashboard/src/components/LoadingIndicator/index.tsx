import { Box, Spinner as SpinnerChakraUI } from '@chakra-ui/react';

const LoadingIndicator = (): JSX.Element => {
  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
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
