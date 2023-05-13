<template>
  <CardComponent title="Not Found"
    ><div class="d-flex align-center justify-center page-container">
      <div>
        <div class="text-h3">Oops!</div>
        <br />
        <h3>The page you are looking for was not found.</h3>
        <router-link to="/">
          <ButtonText class="mt-3" text="Return Home" />
        </router-link>
      </div></div
  ></CardComponent>
</template>
<script setup lang="ts">
import CardComponent from "@/components/media/CardComponent.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
</script>
<style scoped>
.page-container {
  min-height: 70vh;
}
</style>
