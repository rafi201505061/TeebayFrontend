import { Button } from "antd";
import PasswordInput from "../components/inputs/PasswordInput";
import TextInput from "../components/inputs/TextInput";
import AuthLayout from "./layouts/AuthLayout";
import styles from "./css/sign-up.module.css";
import { AuthService } from "../services/auth-service";
import { useMemo, useReducer, useState } from "react";
import { SignUpUtils } from "./utils/sign-up-utils";
import { CommonUtils } from "../utils/common-utils";
import { TOAST_TYPE } from "../enums/toast-type";
import TextWithLink from "../components/generic/TextWithLink";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "update-state":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
const SignUpScreen = () => {
  const [state, dispatch] = useReducer(reducer, SignUpUtils.INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const updateState = (partialState) => {
    dispatch({ type: "update-state", payload: partialState });
  };
  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (!SignUpUtils.validateState(state)) {
        setShowError(true);
        setLoading(false);
        return;
      }
      await AuthService.signUp({ ...state });
      setLoading(false);
      navigate("/login", { replace: true });
    } catch (error) {
      setLoading(false);
      CommonUtils.showToast(TOAST_TYPE.ERROR, error?.message);
    }
  };
  const isEmailValid = useMemo(() => {
    return CommonUtils.isValidEmail(state.email);
  }, [state.email]);

  const isPhoneNumberValid = useMemo(() => {
    return CommonUtils.isPhoneNumberValid(state.phoneNo);
  }, [state.phoneNo]);
  return (
    <AuthLayout title="Sign Up">
      <div className={styles["multi-input-container"]}>
        <div>
          <TextInput
            placeholder="First Name"
            value={state.firstName}
            onChange={(firstName) => updateState({ firstName })}
            error={showError && state.firstName === ""}
            errorMessage="First name is required"
          />
        </div>
        <div>
          <TextInput
            placeholder="Last Name"
            value={state.lastName}
            onChange={(lastName) => updateState({ lastName })}
            error={showError && state.lastName === ""}
            errorMessage="Last name is required"
          />
        </div>
      </div>
      <TextInput
        placeholder="Address"
        value={state.address}
        onChange={(address) => updateState({ address })}
        error={showError && state.address === ""}
        errorMessage="Address is required"
      />
      <div className={styles["multi-input-container"]}>
        <div>
          <TextInput
            placeholder="Email"
            value={state.email}
            onChange={(email) => updateState({ email })}
            error={showError && !isEmailValid}
            errorMessage="Enter a valid email"
          />
        </div>
        <div>
          <TextInput
            placeholder="Phone Number"
            value={state.phoneNo}
            onChange={(phoneNo) => updateState({ phoneNo })}
            error={showError && !isPhoneNumberValid}
            errorMessage="Enter a valid phone no."
          />
        </div>
      </div>
      <PasswordInput
        placeholder="Password"
        value={state.password}
        onChange={(password) => updateState({ password })}
        error={showError && !SignUpUtils.validatePassword(state.password)}
        errorMessage="Password should be between 6-20 characters long."
      />
      <PasswordInput
        placeholder="Confirm password"
        value={state.retypedPassword}
        onChange={(retypedPassword) => updateState({ retypedPassword })}
        error={showError && state.password !== state.retypedPassword}
        errorMessage="Passwords don't match"
      />
      <div className="center">
        <Button loading={loading} type="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>

      <div className={"center"}>
        <TextWithLink
          title="Already have an account?"
          linkTitle="Sign In"
          to="/login"
        />
      </div>
    </AuthLayout>
  );
};

export default SignUpScreen;
