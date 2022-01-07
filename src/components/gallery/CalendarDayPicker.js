import React, { forwardRef, createRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../appContext";
import { parseISO, lightFormat } from "date-fns";
import { Button } from "@chakra-ui/react";

export default function CalendarDatePicker() {
  const { filters, daypickerParameters, selectDate } = useAppContext();

  let selectedDate;
  if (filters.date.type === "earth") {
    selectedDate = parseISO(filters.date.value);
  } else {
    let equivalentDate = daypickerParameters.equivalentDates.find(
      (d) => d.sol === filters.date.value
    ).equivalentEarthDate;

    selectedDate = parseISO(equivalentDate);
  }

  function handleOnDateChange(date) {
    let dateValue = lightFormat(date, "yyyy-MM-dd");
    selectDate("earth", dateValue); //dateType, dateValue
  }
  const ref = createRef();
  const CustomImput = forwardRef(({ value, onClick }, ref) => (
    <Button variant="nasa" w="100%" ref={ref} onClick={onClick}>
      {" "}
      {value}
    </Button>
  ));
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => handleOnDateChange(date)}
      dateFormat="yyyy/MM/dd"
      maxDate={daypickerParameters.maxDate}
      minDate={daypickerParameters.minDate}
      includeDates={daypickerParameters.dates}
      customInput={<CustomImput ref={ref}></CustomImput>}
    />
  );
}
