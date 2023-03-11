<template>
  <section class="bg-green rounded mb-4 pa-4">
    <h2 class="bg-blue rounded pa-2 text-center mb-2">
      {{ props.title }}
    </h2>
    <slot></slot>
  </section>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  title: { type: String, required: true },
});
</script>
