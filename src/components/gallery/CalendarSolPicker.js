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
  const { solParameters, selectDate } = useAppContext();
  const { maxSol, minSol, sol } = solParameters;

  const [isValidNumber, setIsValidNumber] = useState(true);
  const [value, setValue] = useState(null);
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
            w="10rem"
            bg="whiteAlpha.500"
            display="flex"
            alignItems={"center"}
            justifyContent={"flex-end"}
            fontWeight="semibold"
            color={isValidNumber ? "white" : "red"}
            textDecoration={isValidNumber ? "none" : "line-through"}
          >
            <Text textAlign={"center"}>
              {value == null ? "Select Sol" : "Sol: "}
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

        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Box>
  );
}
