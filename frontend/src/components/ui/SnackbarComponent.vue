<template>
	<v-snackbar
		:color="options.color"
		location="top"
		timeout="3000"
		variant="flat"
	>
		<div class="d-flex justify-start align-center">
			<v-img
				v-if="options.img"
				class="me-3"
				max-width="32px"
				:src="options.img"
			/>
			{{ options.text }}
		</div>
	</v-snackbar>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

interface ISnackbarComponentProps {
	options: {
		color?: string;
		img?: string;
		text: string;
	};
}

defineProps<ISnackbarComponentProps>();
</script>
