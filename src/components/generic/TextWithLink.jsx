/* eslint-disable react/prop-types */
import { Button } from "antd";
import styles from "./css/text-with-link.module.css";
const TextWithLink = ({ title = "", linkTitle = "", onClick = () => {} }) => {
  return (
    <div className={styles["container"]}>
      <p className={styles["title"]}>{title}</p>
      <Button ghost type="default" className={"link-button"} onClick={onClick}>
        {linkTitle}
      </Button>
    </div>
  );
};

export default TextWithLink;
