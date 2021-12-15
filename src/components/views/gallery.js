import { Stack, Box } from "@chakra-ui/react";

export default function Gallery() {
  return (
    <Stack>
      <Box
        className="roverSelectWrapper"
        display="flex"
        direction="row"
        w="100%"
        h="85vh"
        minH="lg"
        bg="black"
        justifyContent="space-around"
        pt="1rem"
        pb="1rem"
      >
        Gallery
      </Box>
    </Stack>
  );
}
