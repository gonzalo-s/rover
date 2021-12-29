import { Stack, Box } from "@chakra-ui/react";
import { useAppContext } from "./appContext";

export default function NavBar() {
  // selectRover | gallery | photo
  const { setActiveView, activeView } = useAppContext();

  function handleGalleryClick() {
    setActiveView("gallery");
  }

  function handleRoverClick() {
    setGalleryItems([]);
    setActiveView("selectRover");
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
        {activeView === "photo" ? (
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
