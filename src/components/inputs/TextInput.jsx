/* eslint-disable react/prop-types */
import { Input } from "antd";
import "./css/text-input.css";
import classNames from "classnames";
const TextInput = ({
  placeholder = "",
  value = "",
  onChange = () => {},
  error = false,
  errorMessage = "",
}) => {
  return (
    <div className="custom-input-wrapper">
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={classNames({
          "custom-input": true,
          "custom-input-error": error,
        })}
        type={"text"}
        placeholder={placeholder}
      />
      {error && <p className="error-text">{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
