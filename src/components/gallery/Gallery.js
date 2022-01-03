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
    <Box w="100%" h="100%" backgroundColor="whiteAlpha.200" p="1rem">
      {activeView === "gallery" ? (
        <SimpleGrid columns={5} spacingX="1rem" spacingY="1rem">
          {activePage.map((photo) => {
            return (
              <Box
                w="100%"
                h="100%"
                key={photo.id}
                as="button"
                onClick={() => handleOnClick(photo)}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                _hover={{
                  p: "2px",
                }}
              >
                <Image
                  src={photo.img_src}
                  alt={`Photo from ${photo.rover}`}
                  borderRadius="2%"
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
