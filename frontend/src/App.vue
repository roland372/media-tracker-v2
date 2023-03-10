<template>
  <div class="text-center ma-2">
    <ButtonText :on-click="handleClick" text="hello" />
    <ChipComponent text="12" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import ButtonText from "@/components/ButtonText.vue";
import ChipComponent from "./components/ChipComponent.vue";

const handleClick = () => {
  console.log("hello");
};

onMounted(async () => {
  console.log("MOUNTED");
});
</script>
