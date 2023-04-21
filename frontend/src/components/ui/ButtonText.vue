<template>
  <v-btn
    @click="onClick"
    :append-icon="appendIcon"
    :color="color"
    :disabled="disabled"
    :prepend-icon="prependIcon"
    :size="size"
    class="text-none"
  >
    {{ text }}
  </v-btn>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface IButtonTextProps {
  appendIcon?: string;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
  prependIcon?: string;
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
