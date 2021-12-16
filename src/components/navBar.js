import { Stack, Box } from "@chakra-ui/react";
import { useActiveView, useViewUpdate } from "./ViewsContext";

export default function NavBar() {
  // selectRover | gallery | photo

  const goToView = useViewUpdate();
  const view = useActiveView();

  function handleGalleryClick() {
    goToView("gallery");
  }

  function handleRoverClick() {
    goToView("selectRover");
  }

  return (
    <Stack
      className="menuWrapper"
      w="100%"
      bg="orange"
      h="15vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Stack className="menuItemsWrapper" border="1px" w="50%" direction="row">
        {view === "photo" ? (
          <Box as="button" onClick={handleGalleryClick} w="10rem" border="1px">
            {" "}
            Gallery
          </Box>
        ) : (
          ""
        )}

        <Box as="button" onClick={handleRoverClick} w="10rem" border="1px">
          {" "}
          Select Rover
        </Box>
      </Stack>
    </Stack>
  );
}
