<template>
  <HeaderComponent title="Login">
    <div class="page-container d-flex align-center justify-center">
      <v-btn @click="signInWithGoogle">Sign in with google</v-btn>
    </div>
  </HeaderComponent>
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import router from "@/router";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const res = await signInWithPopup(auth, provider);
  console.log("login res", res.user);
  router.push("/");
};
</script>
<style scoped>
.page-container {
  min-height: 75vh;
}
</style>
