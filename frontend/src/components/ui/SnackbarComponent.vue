<template>
  <v-snackbar color="green" location="bottom" timeout="2000" variant="flat">
    {{ text }}</v-snackbar
  >
</template>
<script setup lang="ts">
import { defineProps } from "vue";

interface ISnackbarComponentProps {
  text: string;
}

defineProps<ISnackbarComponentProps>();
</script>
