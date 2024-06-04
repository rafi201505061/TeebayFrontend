import { useState } from "react";
import TextInput from "../components/inputs/TextInput";
import styles from "./css/log-in.module.css";
import { Button } from "antd";
import { AuthService } from "../services/auth-service";
import TextWithLink from "../components/generic/TextWithLink";
import PasswordInput from "../components/inputs/PasswordInput";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogIn = async () => {
    try {
      setLoading(true);
      const data = await AuthService.logIn({ email, password });
      console.log({ data });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className={styles["container"]}>
      <h1>Sign In</h1>
      <div className={styles["content-wrapper"]}>
        <TextInput
          value={email}
          onChange={(email) => setEmail(email)}
          placeholder="Email"
        />
        <PasswordInput
          value={password}
          onChange={(password) => setPassword(password)}
          placeholder="Password"
        />
        <div className={styles["button-container"]}>
          <Button loading={loading} type="primary" onClick={handleLogIn}>
            Log In
          </Button>
        </div>
        <div className={styles["button-container"]}>
          <TextWithLink
            title="Don't have an account?"
            linkTitle="Sign Up"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
