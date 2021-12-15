import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Curiosity from "../curiosity";
import Opportunity from "../opportunity";
import Spirit from "../spirit";

function RoverSelect() {
  return (
    <Stack>
      <Box
        display="flex"
        direction="row"
        w="100%"
        h="70vh"
        bg="black"
        justifyContent="space-around"
      >
        <Curiosity />
        <Opportunity />
        <Spirit />
      </Box>
    </Stack>
  );
}

export default RoverSelect;
