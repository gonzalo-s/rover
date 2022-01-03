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
      lightBlue: "#2164D9",
      blue: "#15418c",
      darkBlue: "#113573",
      red: "#fc3d21",
    },
  },
  components: {
    MenuButton: {
      bg: "brand.blue",
    },
    Button: {
      variants: {
        nasa: {
          bg: "whiteAlpha.500",
          color: "white",
          letterSpacing: "0.1rem",
          borderRadius: "0",
          _hover: {
            bg: "brand.blue",
            color: "brand.red",
          },
          _disabled: {
            bg: "brand.blue",
          },
        },
        nasaFiltersActive: {
          bg: "brand.blue",
          color: "white",
          letterSpacing: "0.1rem",
          borderRadius: "0",
          _hover: {
            //bg: "brand.darkBlue",
            color: "brand.red",
          },
          _disabled: {
            bg: "brand.blue",
          },
          _focus: {
            boxShadow: "none",
            bg: "red",
          },
          _active: {
            bg: "red",
          },
        },
        nasaFiltersInactive: {
          bg: "blackAlpha.500",
          color: "green",
          letterSpacing: "0.1rem",
          borderRadius: "0",
          _hover: {
            //bg: "brand.lightBlue",
            color: "brand.red",
          },
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
  },
};

// 3. extend the theme
const myTheme = extendTheme(config);

export default myTheme;
