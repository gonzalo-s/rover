import React, { useState } from "react";
import { useAppContext } from "../appContext";
import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";

export default function Solpicker() {
  const { solParameters, selectDate, filters, daypickerParameters } =
    useAppContext();
  const { maxSol, minSol, sol } = solParameters;
  const [isValidNumber, setIsValidNumber] = useState(true);

  let selectedDate = filters.date.value;
  if (filters.date.type !== "sol") {
    let equivalentDate = daypickerParameters.equivalentDates.find(
      (d) => d.equivalentEarthDate === filters.date.value
    ).sol;

    selectedDate = equivalentDate;
  }

  const [value, setValue] = useState(selectedDate);

  function handleOnChange(value) {
    setValue(value);
    setIsValidNumber(sol.includes(value));
  }
  function handleOnBlur(value) {
    isValidNumber && value !== ""
      ? selectDate("sol", value)
      : console.log("NO PHOTOS ON THAT DAY");
  }

  return (
    <Box w="100%">
      <NumberInput
        className="numberInput"
        value={value}
        max={maxSol}
        min={minSol}
        keepWithinRange={true}
        clampValueOnBlur={true}
        allowMouseWheel
        inputMode="numeric"
        onChange={(value) => handleOnChange(parseInt(value))}
        p="0"
        onBlur={(e) => handleOnBlur(e.target.value)}
        color="white"
        border="none"
        variant="nasa"
      >
        <Box display="flex">
          <Box
            w={["20rem", "20rem", "10rem"]}
            bg="whiteAlpha.500"
            display={["none", "none", "flex"]}
            alignItems={"center"}
            justifyContent={"flex-end"}
            fontWeight="semibold"
            color={isValidNumber ? "white" : "red"}
            textDecoration={isValidNumber ? "none" : "line-through"}
          >
            <Text textAlign={"center"}>
              {value == null ? "Select Sol: " : "Sol: "}
            </Text>
          </Box>
          <NumberInputField
            className="numberInputField"
            bg="whiteAlpha.500"
            borderRadius="0"
            fontWeight="semibold"
            border="none"
            color={isValidNumber ? "white" : "red"}
            textDecoration={isValidNumber ? "none" : "line-through"}
          />
        </Box>
        <NumberInputStepper
          w={["5rem", "5rem", "1rem"]}
          display={"flex"}
          flexDirection={["row", "row", "column"]}
        >
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
}
