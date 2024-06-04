import { useState } from "react";
import TextInput from "../components/inputs/TextInput";
import { Button } from "antd";
import { AuthService } from "../services/auth-service";
import TextWithLink from "../components/generic/TextWithLink";
import PasswordInput from "../components/inputs/PasswordInput";
import AuthLayout from "./AuthLayout";
const LoginScreen = () => {
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
    <AuthLayout>
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
      <div className={"center"}>
        <Button loading={loading} type="primary" onClick={handleLogIn}>
          Log In
        </Button>
      </div>
      <div className={"center"}>
        <TextWithLink
          title="Don't have an account?"
          linkTitle="Sign Up"
          onClick={() => {}}
        />
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
