import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { useAppContext } from "../appContext";

export default function GalleryFilters() {
  const { filters, filterParameters, selectCameras } = useAppContext();

  let availableCameras = filterParameters.availableCameras;

  function isCameraInFilters(camera) {
    return filters.cameras.includes(camera);
  }

  function handleOnClick(camera) {
    let filteredCamerasCopy = [...filters.cameras];
    console.log("filtered cameras copy: ", filteredCamerasCopy);
    if (isCameraInFilters(camera)) {
      console.log("camera is in filters");
      filteredCamerasCopy = filteredCamerasCopy.filter(
        (filterCam) => filterCam !== camera
      );
    } else {
      filteredCamerasCopy.push(camera);
    }

    selectCameras(filteredCamerasCopy);
  }

  return (
    <Box display="flex" alignItems="center" w="100%" h="100%" p="0.5rem">
      <ButtonGroup className="cameras" spacing="2px">
        {availableCameras.map((camera, id) => {
          return (
            <Button
              w="6rem"
              key={id}
              letterSpacing="0.1rem"
              colorScheme="whiteAlpha"
              variant="nasa"
              isActive={isCameraInFilters(camera)}
              value={camera}
              onClick={(event) => handleOnClick(event.target.value)}
            >
              {camera}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
}
