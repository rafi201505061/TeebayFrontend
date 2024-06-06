/* eslint-disable react/prop-types */
import styles from "./css/text-with-link.module.css";
import { NavLink } from "react-router-dom";
const TextWithLink = ({ title = "", linkTitle = "", to = "" }) => {
  return (
    <div className={styles["container"]}>
      <p className={styles["title"]}>{title}</p>
      <NavLink to={to}>{linkTitle}</NavLink>
    </div>
  );
};

export default TextWithLink;
