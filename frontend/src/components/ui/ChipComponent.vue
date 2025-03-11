<template>
	<v-chip
		:closable="closable"
		:color="color"
		:label="label"
		:prepend-icon="prependIcon"
		:size="size"
	>
		<div class="text-truncate">
			{{ text }}
		</div>
	</v-chip>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

interface IChipComponentProps {
	closable?: boolean;
	color?: string;
	icon?: boolean;
	label?: boolean;
	prependIcon?: string;
	size?: string;
	text: string | number;
}

withDefaults(defineProps<IChipComponentProps>(), {
	color: 'primary',
	size: 'default',
});
</script>
<style scoped></style>
