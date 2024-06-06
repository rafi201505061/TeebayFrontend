import { HttpStatusCode } from "axios";
import { axiosInstance } from "../utils/common-utils";

const logIn = async (data) => {
  try {
    const response = await axiosInstance.post("log-in", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const errorResponseStatus = error.response.status;
      switch (errorResponseStatus) {
        case HttpStatusCode.NotFound:
          throw new Error("User doesn't exist. Please sign up first.");
        case HttpStatusCode.BadRequest:
          throw new Error("Please fill up the form properly.");
        case HttpStatusCode.Unauthorized:
          throw new Error("Username and password don't match.");
        default:
          throw new Error("Couldn't sign you in. Please try again.");
      }
    } else {
      throw new Error("Couldn't sign you in. Please try again.");
    }
  }
};
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
          throw new Error("Please fill up the form properly.");
        default:
          throw new Error("Couldn't sign up now. Please try again.");
      }
    } else {
      throw new Error("Couldn't sign up now. Please try again.");
    }
  }
};

const checkAccessToken = async (token) => {
  try {
    const response = await axiosInstance.post(
      "validate-jwt-token",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const errorResponseStatus = error.response.status;
      switch (errorResponseStatus) {
        case HttpStatusCode.Unauthorized:
          throw new Error("Username and password don't match.");
        default:
          throw error;
      }
    }
  }
};

export const AuthService = { logIn, signUp, checkAccessToken };
