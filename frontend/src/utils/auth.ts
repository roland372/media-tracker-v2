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
    const response = await axios.get("http://localhost:5000/login/success", {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });

    return response.data.user;
    // return response.data.user.email;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
