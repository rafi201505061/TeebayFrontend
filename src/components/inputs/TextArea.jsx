/* eslint-disable react/prop-types */
import { Input } from "antd";

const TextArea = ({ value = "", onChange = () => {}, onEnter = () => {} }) => {
  return (
    <Input.TextArea
      showCount
      value={value}
      maxLength={1000}
      onChange={(e) => {
        onChange(e.target.value);
        e.stopPropagation();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && typeof onEnter === "function") {
          onEnter(value);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      placeholder=""
      style={{ height: 120, resize: "none" }}
    />
  );
};

export default TextArea;
