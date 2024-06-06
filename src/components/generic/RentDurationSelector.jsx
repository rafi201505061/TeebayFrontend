/* eslint-disable react/prop-types */
import { Select } from "antd";

const RentDurationSelector = ({ value = null, onChange = () => {} }) => {
  return (
    <Select
      style={{ width: "100%" }}
      value={value}
      onChange={onChange}
      placeholder="Select rent duration"
      options={[
        { value: "HOURLY", label: "Hourly" },
        { value: "DAILY", label: "Daily" },
        { value: "MONTHLY", label: "Monthly" },
      ]}
    />
  );
};

export default RentDurationSelector;
