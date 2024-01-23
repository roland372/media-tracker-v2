<template>
  <v-snackbar :color="color" location="top" timeout="2000" variant="flat">
    <div class="d-flex justify-start align-center">
      <v-img v-if="img" class="me-3" max-width="32px" :src="img" />
      {{ text }}
    </div>
  </v-snackbar>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

interface ISnackbarComponentProps {
  color?: string;
  img?: string;
  text: string;
}

defineProps<ISnackbarComponentProps>();
</script>
