// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,

  styles: {
    global: {
      html: {
        position: "relative",
        height: "100%",
      },
      body: {
        position: "relative",
        height: "100%",
      },
      "#root": {
        height: "100%",
        position: "relative",
      },
    },
  },

  fonts: {
    body: "Titillium Web",
  },
  colors: {
    brand: {
      blue: "#15418c",
      red: "#fc3d21",
    },
  },
  components: {
    Button: {
      variants: {
        nasa: {
          bg: "whiteAlpha.500",
          color: "white",
          letterSpacing: "0.1rem",
          borderRadius: "0",
          _hover: {
            bg: "brand.blue",
          },
          _disabled: {
            bg: "brand.blue",
          },
          _active: {
            bg: "brand.blue",
          },
        },
      },
    },
  },
};

// 3. extend the theme
const myTheme = extendTheme(config);

export default myTheme;
