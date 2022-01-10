import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";
import { useAppContext } from "../appContext";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function CameraFilter() {
  const { filters, filterParameters, selectCameras, setPages } =
    useAppContext();

  let availableCameras = filterParameters.availableCameras;

  function isCameraInFilter(camera) {
    return filters.cameras.includes(camera);
  }

  function handleOnClick(camera) {
    // check if camera is in filters.cameras
    // if true => remove camera from filters
    // if false => push camera in filters.cameras

    let newCameras = filters.cameras;

    if (isCameraInFilter(camera)) {
      if (filters.cameras.length === 1) {
        return;
      }
      newCameras = filters.cameras.filter((cam) => cam !== camera);
    } else {
      newCameras.push(camera);
    }
    selectCameras(newCameras);
    setPages(null);
  }

  return (
    <Menu isLazy autoSelect={false} matchWidth="true">
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="nasa"
        w="100%"
      >
        Select Camera:
      </MenuButton>
      <MenuList
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        p="0"
        border="none"
        bg="blackAlpha.50"
        borderRadius="0"
        color="white"
        variant="nasa"
      >
        {availableCameras.map((camera, id) => {
          return (
            <MenuItem
              as={Button}
              w="12.5rem"
              // minW="0"
              key={id}
              p="0"
              letterSpacing="0.1rem"
              variant={
                isCameraInFilter(camera)
                  ? "nasaFiltersActive"
                  : "nasaFiltersInactive"
              }
              value={camera}
              onClick={(event) => handleOnClick(event.target.value)}
            >
              {camera}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
