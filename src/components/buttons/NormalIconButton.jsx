/* eslint-disable react/prop-types */
import { Pencil } from "@phosphor-icons/react";
import { Button } from "antd";

const NormalIconButton = ({ onClick = () => {}, ...props }) => {
  return (
    <Button
      className="normal-icon-button"
      type="primary"
      shape="round"
      icon={<Pencil />}
      size="small"
      onClick={onClick}
      {...props}
    />
  );
};

export default NormalIconButton;
