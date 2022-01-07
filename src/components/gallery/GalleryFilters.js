import { Box } from "@chakra-ui/react";
import React from "react";
import CalendarDayPicker from "./CalendarDayPicker";
import CameraFilter from "../filterComponents/CameraFilter";
import Solpicker from "./CalendarSolPicker";

export default function GalleryFilters() {
  return (
    <Box
      className="filtersWrapper"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      w="100%"
      h="100%"
    >
      <Box w="12.5rem" pl="0.5rem">
        <CameraFilter />
      </Box>
      <Box w="12.5rem" pl="0.5rem">
        <CalendarDayPicker />
      </Box>
      <Box w="12.5rem" pl="0.5rem">
        <Solpicker />
      </Box>
    </Box>
  );
}
