<template>
  <v-btn
    @click="onClick"
    :color="color"
    :disabled="disabled"
    :prepend-icon="icon"
    :size="size"
  >
    {{ text }}
  </v-btn>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface IButtonTextProps {
  color?: string;
  disabled?: boolean;
  icon?: string;
  onClick?: () => void;
  size?: string;
  text: string;
}

withDefaults(defineProps<IButtonTextProps>(), {
  color: "primary",
  disabled: false,
  onClick: () => {
    return;
  },
  size: "default",
});
</script>
