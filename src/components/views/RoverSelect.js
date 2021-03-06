import React from "react";
import {
  Box,
  Stack,
  VStack,
  Button,
  ButtonGroup,
  Text,
  Image,
} from "@chakra-ui/react";
import { useAppContext } from "../appContext";
import logo from "../../img/nasa-logo.svg";

function RoverSelect() {
  const { selectRover, setActiveView } = useAppContext();

  function handleCuriositySelect() {
    setActiveView("gallery");
    selectRover("curiosity");
  }
  function handleOpportunitySelect() {
    setActiveView("gallery");
    selectRover("opportunity");
  }
  function handleSpiritSelect() {
    setActiveView("gallery");
    selectRover("spirit");
  }

  return (
    <VStack className="roverSelectWrapper" w="100%" minH="100%">
      <Box
        display="flex"
        flexDirection={["column", "column", "row"]}
        wrap={"nowrap"}
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Image
          src={logo}
          borderRadius="full"
          boxSize="120px"
          pl={["0", "0", "20px"]}
        />
        <Stack
          className="selectRoverTitle"
          w="50%"
          h="55%"
          alignItems="center"
          justifyContent="center"
          letterSpacing="0.5rem"
        >
          <Text
            display={"flex"}
            fontSize="6xl"
            color="white"
            textAlign={"center"}
          >
            {" "}
            SELECT ROVER
          </Text>
        </Stack>
        <Box boxSize="120px" display={["none", "none", "flex"]} />
      </Box>

      <Box
        className="roverSelectButtons"
        display="flex"
        direction="row"
        w="100%"
        h="100%"
        justifyContent="space-around"
        alignItems={"center"}
        pb="1rem"
      >
        <ButtonGroup
          w="80%"
          justifyContent="space-around"
          colorScheme="whiteAlpha"
          variant="nasa"
        >
          <Button
            w="10rem"
            h="10rem"
            letterSpacing={["0", "0.1rem"]}
            onClick={handleCuriositySelect}
          >
            CURIOSITY
          </Button>
          <Button
            w="10rem"
            h="10rem"
            borderRadius="0"
            letterSpacing={["0", "0.1rem"]}
            onClick={handleOpportunitySelect}
          >
            OPPORTUNITY
          </Button>
          <Button
            w="10rem"
            h="10rem"
            letterSpacing={["0", "0.1rem"]}
            onClick={handleSpiritSelect}
          >
            SPIRIT
          </Button>
        </ButtonGroup>
      </Box>
    </VStack>
  );
}

export default RoverSelect;
