/* eslint-disable react/prop-types */
import { Select } from "antd";

const MultiSelect = ({
  value = [],
  onChange = () => {},
  options = [],
  maxCount = 5,
}) => {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select"
      value={value}
      onChange={onChange}
      options={options}
      maxCount={maxCount}
    />
  );
};

export default MultiSelect;
