<template>
  <ButtonIcon
    v-if="isVisible"
    @click="scrollToTop"
    button-size="small"
    class="fixed-button"
    color="indigo"
    icon="mdi-arrow-up"
    icon-size="x-large"
  />
</template>
<script setup lang="ts">
import ButtonIcon from "./ButtonIcon.vue";
import { ref, onMounted } from "vue";

const isVisible = ref<boolean>(false);
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    isVisible.value = window.scrollY > 300;
  });
});
</script>
<style scoped>
.fixed-button {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
