import { decodeCredential, CallbackTypes } from "vue3-google-login";
import router from "@/router";
import axios from "axios";

const LOGIN_SUCCESS_URL =
  process.env.NODE_ENV?.trim() === "development"
    ? process.env.VUE_APP_LOGIN_SUCCESS_URL_DEVELOPMENT
    : process.env.VUE_APP_LOGIN_SUCCESS_URL;

export const login: CallbackTypes.CredentialCallback = async (cbRes) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData: any = decodeCredential(cbRes.credential);
  const user = {
    email: userData.email,
    googleId: userData.sub,
    profileImg: userData.picture,
    username: userData.name,
  };

  const response = await axios.get(LOGIN_SUCCESS_URL as string, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      user: JSON.stringify(user),
    },
  });

  localStorage.setItem("googleId", response.data.user.googleId);
  return window.open("/", "_self");
};

export const logout = async () => {
  // await axios.get(LOGOUT_URL as string, {
  //   withCredentials: true,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Credentials": true,
  //   },
  // });
  localStorage.removeItem("googleId");
  window.open("/login", "_self");
};

//? only if logged in
export const getUserData = async () => {
  try {
    const googleId = localStorage.getItem("googleId");

    if (googleId) {
      //? user in LocalStorage - send back user and validate it
      const response = await axios.get(LOGIN_SUCCESS_URL as string, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          googleId,
        },
      });

      return response.data.user;
    }

    router.push("/login");
  } catch (error) {
    console.error(error);
    router.push("/login");
    throw error;
  }
};
