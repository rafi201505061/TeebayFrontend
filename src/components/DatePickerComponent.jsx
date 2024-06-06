/* eslint-disable react/prop-types */
import { CalendarBlank } from "@phosphor-icons/react";
import { DatePicker } from "antd";
import moment from "moment";

function DatePickerComponent({
  date,
  setDate,
  placeholder,
  style = {},
  disableDate = (current) => current.isBefore(moment()),
}) {
  const onChange = (date, dateString) => {
    setDate(dateString);
  };
  return (
    <DatePicker
      onChange={onChange}
      defaultValue={moment()}
      allowClear={false}
      value={date ? moment(date) : null}
      style={style}
      disabledDate={disableDate}
      placeholder={placeholder ?? ""}
      suffixIcon={<CalendarBlank size={20} color={"#656F78"} />}
    />
  );
}

export default DatePickerComponent;
