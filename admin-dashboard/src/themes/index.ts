import { extendTheme } from '@chakra-ui/react';

// Colors
import { colors } from './colors';

// Components
import { Button, Heading, Text, Input } from './components';

// Typography
import { radius, fontSizes, fonts, lineHeights } from './typography';

export const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  lineHeights,
  radii: radius,
  components: {
    Text,
    Button,
    Heading,
    Input,
  },
});
