<template>
	<div v-if="isVisible" class="fixed-buttons">
		<v-btn
			v-if="mediaDisplayControls?.hasExpandedMedia.value"
			aria-label="Display fewer items"
			class="fixed-button"
			color="indigo"
			icon
			size="small"
			title="Display fewer items"
			@click="collapseExpandedMedia"
		>
			<v-icon icon="mdi-arrow-collapse-up" size="x-large" />
		</v-btn>
		<ButtonIcon
			@click="scrollToTop"
			button-size="small"
			class="fixed-button"
			color="indigo"
			icon="mdi-arrow-up"
			icon-size="x-large"
		/>
	</div>
</template>
<script setup lang="ts">
import { mediaDisplayControlsKey } from '@/composables/mediaDisplayControls';
import { inject, onMounted, onUnmounted, ref } from 'vue';
import ButtonIcon from './ButtonIcon.vue';

const isVisible = ref<boolean>(false);
const mediaDisplayControls = inject(mediaDisplayControlsKey, null);
const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};
const collapseExpandedMedia = () => {
	mediaDisplayControls?.collapseAll();
};

const updateVisibility = () => {
	isVisible.value = window.scrollY > 300;
};

onMounted(() => {
	window.addEventListener('scroll', updateVisibility);
	updateVisibility();
});

onUnmounted(() => window.removeEventListener('scroll', updateVisibility));
</script>
<style scoped>
.fixed-buttons {
	position: fixed;
	bottom: 50px;
	right: 50px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.fixed-button {
	position: static;
}
</style>
