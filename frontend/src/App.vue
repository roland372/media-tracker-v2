<template>
  <div class="text-center ma-2">
    <ButtonComponent :on-click="handleClick" text="hello" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const handleClick = () => {
  console.log("hello");
};

onMounted(async () => {
  console.log("MOUNTED");
});
</script>
