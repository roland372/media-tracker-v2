<template>
	<v-dialog
		:model-value="modelValue"
		max-width="90vw"
		width="auto"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<v-card class="media-group-modal">
			<div class="bg-primary-light text-color px-5 py-3 text-h6 text-center">
				{{ value }}
			</div>
			<v-card-text class="group-content">
				<div
					v-if="groupMedia.length"
					class="group-media-grid mx-n3 mb-n3 mt-n1"
					:style="{ width: groupGridWidth }"
				>
					<MediaCard
						v-for="item in groupMedia"
						:key="
							(item as TAnime | TBook | TGame | TManga | TMovie).title ||
							(item as TCharacter).name
						"
						class="group-media-card"
						:media="item"
						:media-type="mediaType"
						group-modal
						@open-group="$emit('open-group', $event)"
					/>
				</div>
				<p v-else class="text-color">{{ emptyMessage }}</p>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
<script setup lang="ts">
import MediaCard from '@/components/media/MediaCard.vue';
import {
	EMediaType,
	TAnime,
	TBook,
	TCharacter,
	TGame,
	TManga,
	TMedia,
	TMediaGroup,
	TMediaGroupFilter,
	TMovie,
} from '@/types';
import { useAnimeStore } from '@/stores/useAnimeStore';
import { useGamesStore } from '@/stores/useGamesStore';
import { compareGamesBySeries } from '@/utils/mediaUtils';
import { computed, defineEmits, defineProps } from 'vue';

interface IMediaGroupModalProps {
	modelValue: boolean;
	filter: TMediaGroupFilter;
	mediaType: EMediaType;
	value: string;
}

const props = defineProps<IMediaGroupModalProps>();
defineEmits<{
	(event: 'update:modelValue', value: boolean): void;
	(event: 'open-group', group: TMediaGroup): void;
}>();

const animeStore = useAnimeStore();
const gamesStore = useGamesStore();
const groupMedia = computed<TMedia[]>(() => {
	if (props.mediaType === EMediaType.GAME) {
		const matchingGames = gamesStore.games.filter(game =>
			props.filter === 'series'
				? game.series === props.value
				: game.developer === props.value,
		);
		return matchingGames.sort((a, b) => compareGamesBySeries(a, b, 'asc'));
	}
	if (props.mediaType === EMediaType.ANIME && props.filter === 'series') {
		return animeStore.anime
			.filter(anime => anime.series === props.value)
			.sort((a, b) => a.title.localeCompare(b.title));
	}
	return [];
});
const emptyMessage = computed(() =>
	props.filter === 'developer'
		? 'No games found for this developer.'
		: 'No media found in this series.',
);
const groupGridWidth = computed(() => {
	const columns = Math.min(groupMedia.value.length, 10);
	const cardWidth = window.innerWidth <= 600 ? 110 : 140;
	return `${columns * cardWidth + Math.max(columns - 1, 0) * 12}px`;
});
</script>
<style scoped>
.media-group-modal {
	max-height: 90vh;
	max-width: 90vw;
	overflow-y: auto;
	width: fit-content;
}

.group-content {
	overflow-y: auto;
	max-width: 90vw;
}

.group-media-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
	max-width: calc(90vw - 34px);
	min-width: fit-content;
}

.group-media-card {
	aspect-ratio: 3 / 4;
	min-width: 0;
}

@media (max-width: 600px) {
	.group-media-grid {
		grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
	}

	.group-media-card {
		aspect-ratio: 3 / 4;
	}
}
</style>
