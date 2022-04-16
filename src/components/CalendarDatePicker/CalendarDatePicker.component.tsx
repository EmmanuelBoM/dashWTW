import React from "react";
import ReactDOM from "react-dom";
import {
  DateRangePicker,
  isInclusivelyBeforeDay
} from "react-dates";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./react_dates_overrides.css";

import LeftArrow from '../../assets/angle-left-solid.svg';
import RightArrow from '../../assets/angle-right-solid.svg';

function CalendarDatePicker() {
  const [startDate, setStartDate] = React.useState<any>(null);
  const [endDate, setEndDate] = React.useState<any>(null);
  const [focusedInput, setFocusedInput] = React.useState<any>(null);

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
        }}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
        initialVisibleMonth={() => moment().subtract(1, "month")}
        orientation={"horizontal"}
        monthFormat="MMMM YYYY"
        showClearDates={true}
        displayFormat="MMMM DD YYYY"
        keepOpenOnDateSelect= {true}
        reopenPickerOnClearDates= {true}
        readOnly={true}
      />
    </div>
  );
}

export default CalendarDatePicker