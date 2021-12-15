// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    body: "Titillium Web",
  },
  colors: {
    brand: {
      bg: "#15418c",
    },
  },
};

// 3. extend the theme
const myTheme = extendTheme(config);

export default myTheme;
