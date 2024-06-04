import { PhoneNumberUtil } from "google-libphonenumber";
import { toast } from "react-toastify";
import { TOAST_TYPE } from "../enums/toast-type";
import axios from "axios";

const phoneNumberUtil = PhoneNumberUtil.getInstance();
const isPhoneNumberValid = (phoneNumber) => {
  try {
    const parsedNumber = phoneNumberUtil.parseAndKeepRawInput(
      "+" + phoneNumber
    );
    return phoneNumberUtil.isValidNumber(parsedNumber);
  } catch (error) {
    return false;
  }
};
const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const showToast = (type, text) => {
  switch (type) {
    case TOAST_TYPE.SUCCESS:
      toast.success(text);
      break;
    case TOAST_TYPE.ERROR:
      toast.error(text);
      break;
    case TOAST_TYPE.INFO:
      toast.info(text);
      break;
    default:
  }
};
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
export const CommonUtils = {
  isValidEmail,
  isPhoneNumberValid,
  showToast,
};
