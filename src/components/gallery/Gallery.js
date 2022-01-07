import React from "react";
import { Box, SimpleGrid, Image } from "@chakra-ui/react";
import { useAppContext } from "../appContext";

export default function Gallery({ activePage }) {
  const { activeView, setActiveView, selectActivePhoto } = useAppContext();

  function handleOnClick(photo) {
    selectActivePhoto(photo);
    setActiveView("photo");
  }

  return (
    <Box
      w="100%"
      h="100%"
      backgroundColor="whiteAlpha.200"
      p="1rem"
      display="flex"
      justifyContent="center"
    >
      {activeView === "gallery" ? (
        <SimpleGrid columns={5} spacingX="1rem" spacingY="1rem">
          {activePage.map((photo) => {
            return (
              <Box
                w="150px"
                h="150px"
                key={photo.id}
                as="button"
                onClick={() => handleOnClick(photo)}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  boxSize="150px"
                  src={photo.img_src}
                  alt={`Photo from ${photo.rover}`}
                  borderRadius="2%"
                  _hover={{
                    p: "2px",
                  }}
                />
              </Box>
            );
          })}
        </SimpleGrid>
      ) : (
        ""
      )}
    </Box>
  );
}
