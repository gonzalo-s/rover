import React, { useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import RoverSelect from "./components/views/roverSelect";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/provider";
import theme from "./themes/theme";
import NavBar from "./components/navBar";
import Gallery from "./components/views/gallery";

const queryClient = new QueryClient();

function App() {
  // selectRover | gallery | photo
  const [view, setView] = useState("selectRover");

  function goToView(goTo) {
    setView(goTo);
  }

  const title = (
    <Stack
      className="menuWrapper"
      w="100%"
      bg="orange"
      h="15vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="4xl"> SELECT ROVER</Text>
    </Stack>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Stack className="App" bg="red" w="100vw" h="100vh">
          {view != "selectRover" ? (
            <NavBar view={view} goToView={goToView} />
          ) : (
            title
          )}
          {view === "selectRover" ? (
            <RoverSelect view={view} goToView={goToView} />
          ) : view === "gallery" ? (
            <Gallery />
          ) : (
            ""
          )}
        </Stack>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
