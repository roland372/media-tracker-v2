<template>
	<v-snackbar
		:color="options.color"
		location="top"
		:timeout="options.actionText ? 8000 : 3000"
		variant="flat"
	>
		<div class="d-flex justify-space-between align-center flex-grow-1">
			<div class="d-flex justify-start align-center">
				<v-img
					v-if="options.img"
					class="me-3"
					max-width="32px"
					:src="options.img"
				/>
				{{ options.text }}
			</div>
			<v-btn
				v-if="options.actionText"
				:color="options.color ? 'white' : 'primary'"
				size="small"
				variant="text"
				@click="$emit('action', options.actionId)"
			>
				{{ options.actionText }}
			</v-btn>
		</div>
	</v-snackbar>
</template>
<script setup lang="ts">
interface ISnackbarComponentProps {
	options: {
		actionId?: string;
		actionText?: string;
		color?: string;
		img?: string;
		text: string;
	};
}

/* eslint-disable no-undef -- defineEmits/defineProps are script-setup compiler macros */
defineProps<ISnackbarComponentProps>();
defineEmits<{ (e: 'action', actionId?: string): void }>();
</script>
