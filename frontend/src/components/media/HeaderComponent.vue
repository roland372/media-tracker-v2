<template>
  <CardComponent :title="props.title">
    <slot></slot>
  </CardComponent>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import CardComponent from "@/components/media/CardComponent.vue";

const props = defineProps({
  title: { type: String, required: true },
});
</script>
