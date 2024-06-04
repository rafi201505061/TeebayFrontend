/* eslint-disable react/prop-types */
import styles from "./css/auth-layout.module.css";
const AuthLayout = ({ children }) => {
  return (
    <div className={styles["container"]}>
      <h1>Sign In</h1>
      <div className={styles["content-wrapper"]}>{children}</div>
    </div>
  );
};

export default AuthLayout;
