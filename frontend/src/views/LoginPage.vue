<template>
  <HeaderComponent title="Login">
    <div class="page-container d-flex align-center justify-center">
      <v-btn @click="signInWithGoogle">Sign in with google</v-btn>
    </div>
  </HeaderComponent>
</template>
<script setup lang="ts">
import { useMediaStore } from "@/stores/useMediaStore";
import router from "@/router";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import HeaderComponent from "@/components/media/HeaderComponent.vue";

const mediaStore = useMediaStore();
const { setSnackbar } = mediaStore;

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  await signInWithPopup(auth, provider);

  setSnackbar(true, {
    color: "green",
    text: `Welcome ${auth.currentUser?.displayName}`,
  });

  router.push("/");
};
</script>
<style scoped>
.page-container {
  min-height: 75vh;
}
</style>
