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
function isSameCentury(year1, year2) {
  return Math.floor(year1 / 100) === Math.floor(year2 / 100);
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const prettifyDate = (miliSeconds) => {
  if (typeof miliSeconds !== "number" || isNaN(Number(miliSeconds))) return "";
  const date = new Date(miliSeconds);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currDate = new Date();
  const currYear = currDate.getFullYear();

  const hour = date.getHours();
  const min = date.getMinutes();

  return `${day} ${months[month]}-${
    isSameCentury(currYear, year) ? year % 100 : year
  } ${hour % 12 === 0 ? 12 : hour % 12}:${min >= 10 ? min : "0" + min} ${
    hour < 12 ? "AM" : "PM"
  }`;
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
  prettifyDate,
};
