import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import RoverSelect from "./components/views/roverSelect";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/provider";
import theme from "./themes/theme";
import NavBar from "./components/navBar";
import Gallery from "./components/views/gallery";
import { useActiveView } from "./ViewsContext";

const queryClient = new QueryClient();

function App() {
  // selectRover | gallery | photo

  const view = useActiveView();

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
        <Stack className="App" bg="red" w="100%" h="100%">
          {view !== "selectRover" ? <NavBar /> : title}
          {view === "selectRover" ? (
            <RoverSelect />
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
