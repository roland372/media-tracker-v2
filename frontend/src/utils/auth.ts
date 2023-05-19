import axios from "axios";
import { decodeCredential, CallbackTypes } from "vue3-google-login";
import router from "@/router";

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

// export const login = async () => {
//   window.open(GOOGLE_CALLBACK_URL, "_self");
// };

export const login: CallbackTypes.CredentialCallback = async (cbRes) => {
  const userData: any = decodeCredential(cbRes.credential);
  console.log("response", cbRes);
  console.log("userData", userData);

  const response = await axios.get(LOGIN_SUCCESS_URL as string, {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      googleId: userData.sub,
    },
  });

  localStorage.setItem("googleId", response.data.user.googleId);

  router.push("/");
  // return response.data.user;
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
  localStorage.removeItem("googleId");
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
    throw error;
  }
};

// export const getUserData = async () => {
//   try {
//     const response = await axios.get(
//       "https://media-tracker-v2-production.up.railway.app/login/success",
//       {
//         withCredentials: true,
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Credentials": true,
//         },
//       }
//     );
//     console.log("response", response);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
