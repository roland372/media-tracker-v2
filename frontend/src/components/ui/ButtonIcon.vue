<template>
  <v-btn
    @click="onClick"
    :color="buttonColor"
    :disabled="disabled"
    icon="true"
    :size="buttonSize"
  >
    <v-icon :color="iconColor" :icon="icon" :size="iconSize" />
  </v-btn>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface IButtonIconProps {
  buttonColor?: string;
  buttonSize?: string;
  disabled?: boolean;
  icon: string;
  iconColor?: string;
  iconSize?: string;
  onClick?: () => void;
}

withDefaults(defineProps<IButtonIconProps>(), {
  buttonColor: "primary",
  buttonSize: "default",
  disabled: false,
  onClick: () => {
    return;
  },
});
</script>
