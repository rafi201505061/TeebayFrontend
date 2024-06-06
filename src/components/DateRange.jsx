/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Col, DatePicker, Row } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
function disabledDate(current) {
  return current && current < moment().endOf("day");
}

function disabledTime(current) {
  if (moment(current).isSame(moment(), "day")) {
    return {
      disabledHours: () => [...Array(24).keys()].splice(moment().hour() + 1),
    };
  }

  return {};
}
const DateRange = ({
  fromTimestamp,
  toTimestamp,
  updateState,
  marginBottom = 0,
  showHour = true,
  ...props
}) => {
  return (
    <Col span={24} style={{ marginBottom }}>
      <Row
        gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}
        style={{ padding: "0px 8px" }}
      >
        <RangePicker
          disabledDate={disabledDate}
          disabledTime={disabledTime}
          placement="bottom"
          format={showHour ? "MM/DD/YYYY hh A" : "MM/DD/YYYY"}
          defaultValue={
            !isNaN(fromTimestamp) &&
            !isNaN(toTimestamp) &&
            fromTimestamp &&
            toTimestamp
              ? [moment(fromTimestamp), moment(toTimestamp)]
              : null
          }
          showTime={showHour}
          onCalendarChange={(dates) => {
            // console.log({ dates });
            const from = dates?.[0]?._d;
            const to = dates?.[1]?._d;
            if (from instanceof Date && to instanceof Date) {
              const fromHour = from.getHours();
              const toHour = to.getHours();
              const fromStartTimestamp = Number(
                new Date((dates?.[0]).format("MM/DD/YYYY"))
              );
              const toStartTimestamp = Number(
                new Date((dates?.[1]).format("MM/DD/YYYY"))
              );
              updateState({
                fromTimestamp: showHour
                  ? fromStartTimestamp + fromHour * 3600000
                  : fromStartTimestamp,
                toTimestamp: showHour
                  ? toStartTimestamp + toHour * 3600000
                  : toStartTimestamp + 86400000 - 1,
              });
            }
          }}
          allowClear={false}
          {...props}
        />
      </Row>
    </Col>
  );
};

export default DateRange;
