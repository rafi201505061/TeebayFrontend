import { CommonUtils } from "../../utils/common-utils";

export const SignUpUtils = {
  INITIAL_STATE: {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNo: "",
    password: "",
    retypedPassword: "",
  },
  validateState: (state) => {
    const {
      firstName,
      lastName,
      address,
      email,
      phoneNo,
      password,
      retypedPassword,
    } = state;
    return (
      firstName !== "" &&
      lastName != "" &&
      address !== "" &&
      password.length >= 6 &&
      password === retypedPassword &&
      CommonUtils.isValidEmail(email) &&
      CommonUtils.isPhoneNumberValid(phoneNo)
    );
  },
  validatePassword: (password) => {
    return password.length >= 6 && password.length <= 20;
  },
};
