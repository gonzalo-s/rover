import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { useAppContext } from "../appContext";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function GalleryFilters() {
  const { filters, filterParameters, selectCameras } = useAppContext();

  let availableCameras = filterParameters.availableCameras;

  function handleOnClick(camera) {
    selectCameras(camera);
  }
  console.log("filters in galleryFilters: ", filters.camera);
  return (
    <Box display="flex" alignItems="center" w="100%" h="100%" p="0.5rem">
      <Menu isLazy autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="nasa"
          w="25rem"
        >
          Selected Camera: {filters.camera}
        </MenuButton>
        <MenuList
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          minW="0"
          border="none"
          bg="blackAlpha.500"
          p="8px"
          borderRadius="0"
          color="white"
          variant="nasa"
        >
          <MenuItem
            as={Button}
            w="12rem"
            key={0}
            letterSpacing="0.1rem"
            value={"ALL"}
            variant={
              filters.camera === "ALL"
                ? "nasaFiltersActive"
                : "nasaFiltersInactive"
            }
            onClick={(event) => handleOnClick(event.target.value)}
          >
            ALL
          </MenuItem>
          {availableCameras.map((camera, id) => {
            return (
              <MenuItem
                as={Button}
                w="12rem"
                key={id}
                letterSpacing="0.1rem"
                colorScheme="whiteAlpha"
                variant={
                  filters.camera === camera
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
    </Box>
  );
}
