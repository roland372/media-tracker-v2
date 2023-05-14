import axios from "axios";

export const login = async () => {
  window.open("http://localhost:5000/google/callback", "_self");
};

export const logout = async () => {
  await axios.get("http://localhost:5000/logout", {
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
      const response = await axios.get("http://localhost:5000/login/success", {
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
      const response = await axios.get("http://localhost:5000/login/success", {
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
