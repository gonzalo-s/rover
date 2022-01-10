import { Box } from "@chakra-ui/react";
import React from "react";
import CalendarDayPicker from "../filterComponents/CalendarDayPicker";
import CameraFilter from "../filterComponents/CameraFilter";
import Solpicker from "../filterComponents/CalendarSolPicker";

export default function GalleryFilters() {
  return (
    <Box
      className="filtersWrapper"
      display={"flex"}
      flexDirection={["column", "column", "row"]}
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100%"
    >
      <Box w="12.5rem" pl={["0", "0", "0.5rem"]} pt={["0.2rem", "0.2rem", "0"]}>
        <CameraFilter />
      </Box>
      <Box w="12.5rem" pl={["0", "0", "0.5rem"]} pt={["0.2rem", "0.2rem", "0"]}>
        <CalendarDayPicker />
      </Box>
      <Box w="12.5rem" pl={["0", "0", "0.5rem"]} pt={["0.2rem", "0.2rem", "0"]}>
        <Solpicker />
      </Box>
    </Box>
  );
}
