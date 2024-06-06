/* eslint-disable react/prop-types */
import { Trash } from "@phosphor-icons/react";
import { Button } from "antd";

const DangerIconButton = ({ onClick = () => {}, ...props }) => {
  return (
    <Button
      className="danger-icon-button"
      type="primary"
      shape="round"
      icon={<Trash />}
      size="small"
      onClick={onClick}
      {...props}
    />
  );
};

export default DangerIconButton;
