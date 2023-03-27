<template>
  <v-snackbar v-model="showSnackbar" timeout="2000"> {{ text }}</v-snackbar>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";

interface ISnackbarComponentProps {
  snackbar: boolean;
  text: string;
}

const props = defineProps<ISnackbarComponentProps>();

const showSnackbar = ref(props.snackbar);
</script>
