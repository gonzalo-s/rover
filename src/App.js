import React from "react";
import { ChakraProvider } from "@chakra-ui/provider";
import { Box } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAppContext } from "./components/appContext";
import theme from "./themes/theme";
import RoverSelect from "./components/views/RoverSelect";
import GalleryContainer from "./components/views/GalleryContainer";
import Photo from "./components/views/Photo";
import "@fontsource/titillium-web";

const queryClient = new QueryClient();

function App() {
  // roverSelect | gallery | photo

  const { activeView } = useAppContext();

  //console.log(theme);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box
          className="appWrapper"
          minH="100%"
          display="flex"
          backgroundColor="black"
          backgroundImage="url('https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/starfield-banner.jpg')"
          backgroundRepeat="repeat"
          justifyContent="center"
        >
          {activeView === "roverSelect" ? <RoverSelect /> : ""}
          {activeView === "gallery" ? <GalleryContainer /> : ""}
          {activeView === "photo" ? <Photo /> : ""}
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
