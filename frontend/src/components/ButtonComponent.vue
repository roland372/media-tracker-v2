<template>
  <v-btn
    @click="props.onClick"
    :color="props.color"
    :density="props.density"
    :size="props.size"
    :variant="props.variant"
  >
    {{ props.text }}
  </v-btn>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  color: { type: String, default: "primary" },
  density: { type: null, default: "default" },
  onClick: {
    type: Function,
    default: () => {
      return;
    },
  },
  size: { type: String, default: "default" },
  text: { type: String, required: true },
  variant: { type: null, default: "flat" },
});
</script>
