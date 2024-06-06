import { Input } from "antd";

/* eslint-disable react/prop-types */
import "./css/text-input.css";
const NumericInput = ({
  style = {},
  value = "",
  onChange = () => {},
  placeholder = "",
}) => {
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, "$1"));
  };

  return (
    <Input
      className={"custom-input"}
      style={style}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      maxLength={16}
    />
  );
};
export default NumericInput;
