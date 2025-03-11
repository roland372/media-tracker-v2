<template>
	<v-btn
		@click="onClick"
		:append-icon="appendIcon"
		class="text-none"
		:color="color"
		:disabled="disabled"
		:prepend-icon="prependIcon"
		:size="size"
	>
		{{ text }}
	</v-btn>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

interface IButtonTextProps {
	appendIcon?: string;
	color?: string;
	disabled?: boolean;
	prependIcon?: string;
	size?: string;
	text: string;
	onClick?: () => void;
}

withDefaults(defineProps<IButtonTextProps>(), {
	color: 'primary',
	disabled: false,
	size: 'default',
	onClick: () => {
		return;
	},
});
</script>
