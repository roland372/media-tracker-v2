<template>
	<v-dialog
		:model-value="modelValue"
		max-width="90vw"
		width="auto"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<v-card class="media-series-modal">
			<div class="bg-primary-light text-color px-5 py-3 text-h6 text-center">
				{{ series }}
			</div>
			<v-card-text class="series-content">
				<div
					v-if="seriesMedia.length"
					class="series-media-grid mx-n3 mb-n3 mt-n1"
					:style="{ width: seriesGridWidth }"
				>
					<MediaCard
						v-for="item in seriesMedia"
						:key="
							(item as TAnime | TBook | TGame | TManga | TMovie).title ||
							(item as TCharacter).name
						"
						class="series-media-card"
						:media="item"
						:media-type="mediaType"
						series-modal
						@open-series="$emit('open-series', $event)"
					/>
				</div>
				<p v-else class="text-color">No media found in this series.</p>
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
	TMovie,
} from '@/types';
import { useAnimeStore } from '@/stores/useAnimeStore';
import { useGamesStore } from '@/stores/useGamesStore';
import { compareGamesBySeries } from '@/utils/mediaUtils';
import { computed, defineEmits, defineProps } from 'vue';

interface IMediaSeriesModalProps {
	modelValue: boolean;
	series: string;
	mediaType: EMediaType;
}

const props = defineProps<IMediaSeriesModalProps>();
defineEmits<{
	(event: 'update:modelValue', value: boolean): void;
	(event: 'open-series', series: string): void;
}>();

const animeStore = useAnimeStore();
const gamesStore = useGamesStore();
const seriesMedia = computed<TMedia[]>(() => {
	if (props.mediaType === EMediaType.GAME) {
		return gamesStore.games
			.filter(game => game.series === props.series)
			.sort((a, b) => compareGamesBySeries(a, b, 'asc'));
	}
	if (props.mediaType === EMediaType.ANIME) {
		return animeStore.anime
			.filter(anime => anime.series === props.series)
			.sort((a, b) => a.title.localeCompare(b.title));
	}
	return [];
});
const seriesGridWidth = computed(() => {
	const columns = Math.min(seriesMedia.value.length, 10);
	const cardWidth = window.innerWidth <= 600 ? 110 : 140;
	return `${columns * cardWidth + Math.max(columns - 1, 0) * 12}px`;
});
</script>
<style scoped>
.media-series-modal {
	max-height: 90vh;
	max-width: 90vw;
	overflow-y: auto;
	width: fit-content;
}

.series-content {
	overflow-y: auto;
	max-width: 90vw;
}

.series-media-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	max-width: calc(90vw - 32px);
}

.series-media-card {
	aspect-ratio: 3 / 4;
	min-width: 0;
}

@media (max-width: 600px) {
	.series-media-grid {
		grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
	}

	.series-media-card {
		aspect-ratio: 3 / 4;
	}
}
</style>
