import { HttpStatusCode } from "axios";
import { axiosInstance } from "../utils/common-utils";

const logIn = async () => {};
const signUp = async (data) => {
  try {
    const response = await axiosInstance.post(
      "sign-up",
      { ...data, phoneNo: "+" + data.phoneNo },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const errorResponseStatus = error.response.status;
      switch (errorResponseStatus) {
        case HttpStatusCode.Conflict:
          throw new Error("User already exists. Please log in.");
        case HttpStatusCode.BadRequest:
          throw new Error("Please sign up the form properly.");
        default:
          throw error;
      }
    }
  }
};

export const AuthService = { logIn, signUp };
