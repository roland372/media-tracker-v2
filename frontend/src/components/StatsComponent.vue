<template>
  <CardComponent :title="`${props.media} Stats`">
    <slot></slot>
  </CardComponent>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import CardComponent from "./CardComponent.vue";

const props = defineProps({
  media: { type: String, required: true },
});
</script>
