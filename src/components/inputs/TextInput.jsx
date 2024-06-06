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
  onEnter = () => {},
}) => {
  return (
    <div className="custom-input-wrapper">
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && typeof onEnter === "function") {
            onEnter(value);
          }
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
