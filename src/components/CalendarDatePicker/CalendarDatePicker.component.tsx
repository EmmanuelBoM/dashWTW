import React, { useState } from "react"; // The useState Hook is required for the DatePicker performance

// Importing elements from react-dates library
import {
  DateRangePicker,
  isInclusivelyBeforeDay
} from "react-dates";

// Importing moment library to parse dates
import moment, { Moment } from "moment";

// Initialising react-dates library and importing the stylesheet that personalises look and feel
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./react_dates_overrides.css";

// Importing elements from ChakraUI
import { Grid, GridItem, Center } from "@chakra-ui/react";

// CALENDAR DATE PICKER COMPONENT-------------------------------------------
function CalendarDatePicker(props:any) {

  // Hooks for changing date selection on screen
  const [ startDate, setStartDate ] = useState<any>(moment().startOf("week"));
  const [ endDate, setEndDate ] = useState<any>(moment());
  const [ focusedInput, setFocusedInput ] = useState<any>(null);

  const [ thisWeekController, setThisWeekController ] = useState<string|undefined>('clicked');
  const [ lastWeekController, setLastWeekController ] = useState<string|undefined>(undefined);

  const [ thisMonthController, setThisMonthController ] = useState<string|undefined>(undefined);
  const [ lastMonthController, setLastMonthController ] = useState<string|undefined>(undefined);

  const [ thisTrimesterController, setThisTrimesterController ] = useState<string|undefined>(undefined);
  const [ lastTrimesterController, setLastTrimesterController ] = useState<string|undefined>(undefined);

  const [ thisYearController, setThisYearController ] = useState<string|undefined>(undefined);
  const [ lastYearController, setLastYearController ] = useState<string|undefined>(undefined);

  // Function that handles date changes when clicking the default selectors
  function handleDateChanges (event:any):void {
    event.preventDefault();
    if(event.target.name === 'This Week') {
      setStartDate(moment().startOf("week"))
      setEndDate(moment())
      props.setCalendarStartDate(moment().startOf("week").format("YYYY-MM-DD"))
      props.setCalendarEndDate(moment().format("YYYY-MM-DD"))
      setThisWeekController('clicked')
      setLastWeekController(undefined)
      setThisMonthController(undefined)
      setLastMonthController(undefined)
      setThisTrimesterController(undefined)
      setLastTrimesterController(undefined)
      setThisYearController(undefined)
      setLastYearController(undefined)
      props.setDatePickerSelection(event.target.name)
    }

    else if(event.target.name === 'Last Week') {
      setStartDate(moment().subtract(1, "weeks").startOf("week"))
      setEndDate(moment().subtract(1, "weeks").endOf("week"))
      props.setCalendarStartDate(moment().subtract(1, "weeks").startOf("week").format("YYYY-MM-DD"))
      props.setCalendarEndDate(moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD"))
      setThisWeekController(undefined)
      setLastWeekController('clicked')
      setThisMonthController(undefined)
      setLastMonthController(undefined)
      setThisTrimesterController(undefined)
      setLastTrimesterController(undefined)
      setThisYearController(undefined)
      setLastYearController(undefined)
      props.setDatePickerSelection(event.target.name)
    }

    else if(event.target.name === 'This Month') {
      setStartDate(moment().startOf("month"))
      setEndDate(moment())
      props.setCalendarStartDate(moment().startOf("month").format("YYYY-MM-DD"))
      props.setCalendarEndDate(moment().format("YYYY-MM-DD"))
      setThisWeekController(undefined)
      setLastWeekController(undefined)
      setThisMonthController('clicked')
      setLastMonthController(undefined)
      setThisTrimesterController(undefined)
      setLastTrimesterController(undefined)
      setThisYearController(undefined)
      setLastYearController(undefined)
      props.setDatePickerSelection(event.target.name)
    }

    else if(event.target.name === 'Last Month') {
      setStartDate(moment().subtract(1, "months").startOf("month"))
      setEndDate(moment().subtract(1, "months").endOf("month"))
      props.setCalendarStartDate(moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD"))
      props.setCalendarEndDate(moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD"))
      setThisWeekController(undefined)
      setLastWeekController(undefined)
      setThisMonthController(undefined)
      setLastMonthController('clicked')
      setThisTrimesterController(undefined)
      setLastTrimesterController(undefined)
      setThisYearController(undefined)
      setLastYearController(undefined)
      props.setDatePickerSelection(event.target.name)
    }

    else if(event.target.name === 'This Trimester') {
      setStartDate(moment().subtract(2, "months").startOf("month"))
      setEndDate(moment())
      props.setCalendarStartDate(moment().subtract(2, "months").startOf("month").format("YYYY-MM-DD"))
      props.setCalendarEndDate(moment().format("YYYY-MM-DD"))
      setThisWeekController(undefined)
      setLastWeekController(undefined)
      setThisMonthController(undefined)
      setLastMonthController(undefined)
      setThisTrimesterController('clicked')
      setLastTrimesterController(undefined)
      setThisYearController(undefined)
      setLastYearController(undefined)
      props.setDatePickerSelection(event.target.name)
    }

    else if(event.target.name === 'Last Trimester') {
      setStartDate(moment().subtract(6, "months").startOf("month"))
      setEndDate(moment().subtract(3, "months").endOf("month"))
      props.setCalendarStartDate(moment().subtract(6, "months").startOf("month").format("YYYY-MM-DD"))
      props.setCalendarEndDate(moment().subtract(3, "months").endOf("month").format("YYYY-MM-DD"))
      setThisWeekController(undefined)
      setLastWeekController(undefined)
      setThisMonthController(undefined)
      setLastMonthController(undefined)
      setThisTrimesterController(undefined)
      setLastTrimesterController('clicked')
      setThisYearController(undefined)
      setLastYearController(undefined)
      props.setDatePickerSelection(event.target.name)
    }

    else if(event.target.name === 'This Year') {
      setStartDate(moment().startOf("year"))
      setEndDate(moment())
      props.setCalendarStartDate(moment().startOf("year").format("YYYY-MM-DD"))
      props.setCalendarEndDate(moment().format("YYYY-MM-DD"))
      setThisWeekController(undefined)
      setLastWeekController(undefined)
      setThisMonthController(undefined)
      setLastMonthController(undefined)
      setThisTrimesterController(undefined)
      setLastTrimesterController(undefined)
      setThisYearController('clicked')
      setLastYearController(undefined)
      props.setDatePickerSelection(event.target.name)
    }

    else if(event.target.name === 'Last Year') {
      setStartDate(moment().subtract(1, "years").startOf("year"))
      setEndDate(moment().subtract(1, "years").endOf("year"))
      props.setCalendarStartDate(moment().subtract(1, "years").startOf("year").format("YYYY-MM-DD"))
      props.setCalendarEndDate(moment().subtract(1, "years").endOf("year").format("YYYY-MM-DD"))
      setThisWeekController(undefined)
      setLastWeekController(undefined)
      setThisMonthController(undefined)
      setLastMonthController(undefined)
      setThisTrimesterController(undefined)
      setLastTrimesterController(undefined)
      setThisYearController(undefined)
      setLastYearController('clicked')
      props.setDatePickerSelection(event.target.name)
    }
  }

  // Function that handles the state of selectors when calendar picker closes
  function handleCloseCalendar (event:any):void{
    setThisWeekController(undefined)
    setLastWeekController(undefined)
    setThisMonthController(undefined)
    setLastMonthController(undefined)
    setThisTrimesterController(undefined)
    setLastTrimesterController(undefined)
    setThisYearController(undefined)
    setLastYearController(undefined)
  }

  // Function that renders the default date selectors
  function renderDatePresets() {
    return (
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
        p="1.5vw"
      >
        <GridItem>
          <Center>
            <button
              className="buttonsDatePresets"
              id={thisWeekController}
              name="This Week"
              onClick={handleDateChanges}
            >
              This week
            </button>
          </Center>
        </GridItem>

        <GridItem>
          <Center>
            <button
              className="buttonsDatePresets"
              id={thisMonthController}
              name="This Month"
              onClick={handleDateChanges}
            >
              This month
            </button>
          </Center>
        </GridItem>

        <GridItem>
          <Center>
            <button
              className="buttonsDatePresets"
              id={thisTrimesterController}
              name="This Trimester"
              onClick={handleDateChanges}
            >
              This trimester
            </button>
          </Center>
        </GridItem>

        <GridItem>
          <Center>
            <button
              className="buttonsDatePresets"
              id={thisYearController}
              name="This Year"
              onClick={handleDateChanges}
            >
              This year
            </button>
          </Center>
        </GridItem>

        <GridItem>
          <Center>
            <button
              className="buttonsDatePresets"
              id={lastWeekController}
              name="Last Week"
              onClick={handleDateChanges}
            >
              Last week
            </button>
          </Center>
        </GridItem>

        <GridItem>
          <Center>
            <button
              className="buttonsDatePresets"
              id={lastMonthController}
              name="Last Month"
              onClick={handleDateChanges}
            >
              Last month
            </button>
          </Center>
        </GridItem>

        <GridItem>
          <Center>
            <button
              className="buttonsDatePresets"
              id={lastTrimesterController}
              name="Last Trimester"
              onClick={handleDateChanges}
            >
              Last trimester
            </button>
          </Center>
        </GridItem>

        <GridItem>
          <Center>
            <button
              className="buttonsDatePresets"
              id={lastYearController}
              name="Last Year"
              onClick={handleDateChanges}
            >
              Last year
            </button>
          </Center>
        </GridItem>
      </Grid>
    );
  }

  return (
    <div className="App">
      <DateRangePicker
        startDate={startDate}
        startDateId="startDate"
        endDate={endDate}
        endDateId="endDate"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
          props.setCalendarStartDate(moment(startDate).format("YYYY-MM-DD"))
          props.setCalendarEndDate(moment(endDate).format("YYYY-MM-DD"))
          setThisWeekController(undefined)
          setLastWeekController(undefined)
          setThisMonthController(undefined)
          setLastMonthController(undefined)
          setThisTrimesterController(undefined)
          setLastTrimesterController(undefined)
          setThisYearController(undefined)
          setLastYearController(undefined)
          props.setDatePickerSelection("Custom Date")}}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
        initialVisibleMonth={() => moment().subtract(1, "month")}
        orientation={"horizontal"}
        monthFormat="MMMM YYYY"
        showClearDates={true}
        displayFormat="MMMM DD YYYY"
        keepOpenOnDateSelect= {true}
        reopenPickerOnClearDates= {false}
        readOnly={true}
        renderCalendarInfo={renderDatePresets}
        onClose={handleCloseCalendar}
      />
    </div>
  );
}

export default CalendarDatePicker