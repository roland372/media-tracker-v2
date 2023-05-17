import axios from "axios";

const GOOGLE_CALLBACK_URL =
  process.env.NODE_ENV?.trim() === "development"
    ? process.env.VUE_APP_GOOGLE_CALLBACK_DEVELOPMENT
    : process.env.VUE_APP_GOOGLE_CALLBACK;

const LOGOUT_URL =
  process.env.NODE_ENV?.trim() === "development"
    ? process.env.VUE_APP_LOGOUT_URL_DEVELOPMENT
    : process.env.VUE_APP_LOGOUT_URL;

const LOGIN_SUCCESS_URL =
  process.env.NODE_ENV?.trim() === "development"
    ? process.env.VUE_APP_LOGIN_SUCCESS_URL_DEVELOPMENT
    : process.env.VUE_APP_LOGIN_SUCCESS_URL;

export const login = async () => {
  window.open(GOOGLE_CALLBACK_URL, "_self");
};

export const logout = async () => {
  await axios.get(LOGOUT_URL as string, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
};

//? only if logged in
export const getUserData = async () => {
  try {
    const sessionID = localStorage.getItem("sessionID");
    const googleId = localStorage.getItem("googleId");

    //? no session in localStorage
    if (!sessionID && !googleId) {
      const response = await axios.get(LOGIN_SUCCESS_URL as string, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      localStorage.setItem("sessionID", response.data.sessionID);
      localStorage.setItem("googleId", response.data.user.googleId);

      return response.data.user;
    } else {
      //? session in LocalStorage - send back session and user and validate them
      const response = await axios.get(LOGIN_SUCCESS_URL as string, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          sessionID,
          googleId,
        },
      });

      localStorage.setItem("sessionID", response.data.sessionID);
      localStorage.setItem("googleId", response.data.user.googleId);

      return response.data.user;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
