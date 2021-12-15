import { Box, Stack } from "@chakra-ui/react";
import RoverSelect from "./components/views/roverSelect";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/provider";
import theme from "../src/themes/theme";

const queryClient = new QueryClient();

function App() {
  console.log(theme);
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Stack className="App" bg="red" w="100vw" h="100vh">
          <Box w="100%" bg="orange" h="15vh" />
          <RoverSelect />
        </Stack>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
