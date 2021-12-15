import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Curiosity from "../curiosity";
import Opportunity from "../opportunity";
import Spirit from "../spirit";

function RoverSelect({ view, goToView }) {
  return (
    <Stack>
      <Box
        className="roverSelectWrapper"
        display="flex"
        direction="row"
        w="100%"
        h="70vh"
        minH="lg"
        bg="black"
        justifyContent="space-around"
        pt="1rem"
        pb="1rem"
      >
        <Curiosity view={view} goToView={goToView} />
        <Opportunity view={view} goToView={goToView} />
        <Spirit view={view} goToView={goToView} />
      </Box>
    </Stack>
  );
}

export default RoverSelect;
