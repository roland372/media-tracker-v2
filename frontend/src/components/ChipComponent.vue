<template>
  <v-chip
    :closable="props.closable"
    :color="props.color"
    :density="props.density"
    :label="props.label"
    :prepend-icon="props.prependIcon"
    :size="props.size"
    :variant="props.variant"
  >
    {{ props.text }}
  </v-chip>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  closable: { type: Boolean },
  color: { type: String, default: "primary" },
  density: { type: null, default: "default" },
  icon: { type: Boolean },
  label: { type: Boolean },
  prependIcon: { type: String },
  size: { type: String, default: "default" },
  text: { type: String, required: true },
  variant: { type: null },
});
</script>
