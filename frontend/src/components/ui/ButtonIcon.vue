<template>
  <v-btn
    @click="props.onClick"
    :color="props.buttonColor"
    :density="props.density"
    :disabled="props.disabled"
    icon="true"
    :size="props.buttonSize"
    :variant="props.variant"
  >
    <v-icon
      :color="props.iconColor"
      :icon="props.icon"
      :size="props.iconSize"
    />
  </v-btn>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  buttonColor: { type: String, default: "primary" },
  buttonSize: { type: String, default: "default" },
  density: { type: null, default: "default" },
  disabled: { type: Boolean, default: false },
  icon: { type: String, required: true },
  iconColor: { type: String },
  iconSize: { type: String },
  onClick: {
    type: Function,
    default: () => {
      return;
    },
  },
  variant: { type: null, default: "flat" },
});
</script>
