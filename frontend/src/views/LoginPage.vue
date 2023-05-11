<template>
  <HeaderComponent title="Login">
    <div class="mt-2">
      <div>
        <button :onclick="login">login</button>
      </div>
      <!-- <div>
        <button :onclick="getData">get data</button>
      </div> -->
      <div>
        <button :onclick="getData">get data</button>
      </div>
      <GoogleLogin :callback="callback" auto-login />
    </div>
  </HeaderComponent>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import {
  CallbackTypes,
  decodeCredential,
  GoogleLogin,
} from "vue3-google-login";
import axios from "axios";
import router from "@/router";
import { useMediaStore } from "@/stores/useMediaStore";
import { getAllGames } from "@/graphql";

const mediaStore = useMediaStore();
const { fetchGames } = mediaStore;

const login = () => {
  window.open("http://localhost:5000/google/callback", "_self");
};

// const getData = async () => {
//   await fetchGames();
// };

const getData = async () => {
  await axios
    .get("http://localhost:5000/login/success", {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    .then(async (res) => {
      console.log("response", res.data.user.email);
      await getAllGames(res.data.user.email).then((res) =>
        console.log(res.data)
      );
    });
};

const callback: CallbackTypes.CredentialCallback = (response) => {
  const userData = decodeCredential(response.credential);
  console.log("Handle the userData", userData);
  console.log("Handle the response", response);
  // router.push({ path: "/" });
};

onMounted(async () => {
  console.log("PROFILE MOUNTED");
  // await getData();
});
</script>
