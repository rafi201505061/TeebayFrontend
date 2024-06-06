import { useContext, useState } from "react";
import TextInput from "../components/inputs/TextInput";
import { Button } from "antd";
import { AuthService } from "../services/auth-service";
import TextWithLink from "../components/generic/TextWithLink";
import PasswordInput from "../components/inputs/PasswordInput";
import AuthLayout from "./layouts/AuthLayout";
import { LocalStorageService } from "../services/local-storage-service";
import { CommonUtils } from "../utils/common-utils";
import { TOAST_TYPE } from "../enums/toast-type";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogIn = async () => {
    try {
      setLoading(true);
      const data = await AuthService.logIn({ email, password });
      LocalStorageService.setAuthToken(data.access_token);
      setUser(data.user);
      setLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      setLoading(false);
      CommonUtils.showToast(TOAST_TYPE.ERROR, error?.message);
    }
  };
  return (
    <AuthLayout title="Sign In">
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
          to="/sign-up"
        />
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
