<template>
	<HeaderComponent title="All Emotes">
		<v-text-field
			v-model="emoteSearch"
			@click:clear="() => (emoteSearch = '')"
			clearable
			class="mb-2 text-color"
			density="compact"
			hide-details="auto"
			label="Search for an Emote"
			variant="outlined"
		/>
		<h3 v-if="!allEmotes.length" class="text-color">Not found any items.</h3>
		<section v-else class="d-flex flex-wrap justify-space-between">
			<div
				v-for="emote in allEmotes"
				:key="`${emote.name}-${emote.url}`"
				class="d-flex flex-fill align-stretch pa-1"
			>
				<v-tooltip activator="parent" location="top">{{
					emote.name
				}}</v-tooltip>
				<div
					@click="handleEmoteClick(emote.url)"
					class="bg-primary-dark pa-1 d-flex align-center justify-center flex-grow-1 position-relative rounded"
					style="cursor: pointer"
				>
					<img :alt="emote.name" :src="emote.url" style="height: 64px" />
					<v-icon
						v-if="emote.favourites"
						class="image-overlay-icon"
						color="yellow-accent-4"
						icon="mdi-star"
					/>
				</div>
			</div>
		</section>
		<ButtonText
			v-if="emotes.length > DEFAULT_EMOTE_DISPLAY_COUNT"
			@click="displayEmotes"
			:append-icon="
				displayEmotesFlag === DEFAULT_EMOTE_DISPLAY_COUNT
					? 'mdi-arrow-down-bold'
					: 'mdi-arrow-up-bold'
			"
			class="mt-3"
			color="indigo"
			:text="
				displayEmotesFlag === DEFAULT_EMOTE_DISPLAY_COUNT
					? 'Display All'
					: 'Display Less'
			"
		/>
	</HeaderComponent>
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/media/HeaderComponent.vue';
import ButtonText from '@/components/ui/ButtonText.vue';
import { useEmotesStore } from '@/stores/useEmotesStore';
import { useUtilsStore } from '@/stores/useUtilsStore';
import { copyImageToClipboard } from 'copy-image-clipboard';
import { orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const emotesStore = useEmotesStore();
const utilsStore = useUtilsStore();
const { setSnackbar } = utilsStore;
const { emotes } = storeToRefs(emotesStore);

const DEFAULT_EMOTE_DISPLAY_COUNT = 100;
const displayEmotesFlag = ref<number>(DEFAULT_EMOTE_DISPLAY_COUNT);
const emoteSearch = ref<string>('');

const allEmotes = computed(() =>
	orderBy(emotes.value, [emote => emote.name.toLowerCase()], ['asc'])
		.filter(e => e.name.toLowerCase().includes(emoteSearch.value.toLowerCase()))
		.slice(0, displayEmotesFlag.value)
);

const displayEmotes = () => {
	displayEmotesFlag.value === DEFAULT_EMOTE_DISPLAY_COUNT
		? (displayEmotesFlag.value = emotes.value.length)
		: (displayEmotesFlag.value = DEFAULT_EMOTE_DISPLAY_COUNT);
};

const handleEmoteClick = (url: string): void => {
	copyImageToClipboard(url)
		.then(() => {
			setSnackbar(true, {
				color: 'green',
				img: url,
				text: 'Copied to Clipboard',
			});
		})
		.catch(() => {
			navigator.clipboard.writeText(url);
			setSnackbar(true, {
				color: 'green',
				img: url,
				text: 'Copied to Clipboard',
			});
		});
};
</script>
<style scoped>
.image-overlay-icon {
	position: absolute;
	right: 5px;
	top: 5px;
}

.delete-dialog-position {
	margin-top: -50vh;
}
</style>
