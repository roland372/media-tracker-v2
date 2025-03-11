<template>
	<v-img
		@click="dialog = !dialog"
		class="rounded image-hover"
		cover
		:src="media.imageURL || placeholderImg"
		:style="{
			borderBottom: `5px ${statusColor(media)} solid`,
			borderRight: `5px ${statusColor(media)} solid`,
		}"
	>
		<div class="image-overlay-icon">
			<v-icon v-if="media.favourites" color="yellow-accent-4" icon="mdi-star" />
		</div>
		<ChipComponent
			v-if="
				mediaType !== EMediaType.CHARACTER &&
				mediaType !== EMediaType.MANGA &&
				mediaType !== EMediaType.MOVIE
			"
			class="bg-black image-text-overlay"
			color="white"
			size="x-small"
			text-color="white"
			:text="displayImageText(media)"
		/>
		<ChipComponent
			class="bg-black image-title-overlay"
			color="white"
			size="x-small"
			:text="mediaType === EMediaType.CHARACTER ? (media as TCharacter).name : (media as TAnime | TBook | TGame | TManga | TMovie).title"
			text-color="white"
		/>
		<MediaModal
			v-if="dialog"
			v-model="dialog"
			:media="media"
			:media-type="mediaType"
			:title="mediaType === EMediaType.CHARACTER ? (media as TCharacter).name : (media as TAnime | TBook | TGame | TManga | TMovie).title"
		/>
	</v-img>
</template>
<script setup lang="ts">
import MediaModal from '@/components/media/MediaModal.vue';
import {
	EAnimeStatus,
	EBookStatus,
	ECharacterSource,
	EGameStatus,
	EMangaStatus,
	EMediaType,
	EMovieStatus,
	TAnime,
	TBook,
	TCharacter,
	TGame,
	TManga,
	TMedia,
	TMovie,
} from '@/types';
import { placeholderImg } from '@/utils/mediaUtils';
import { defineProps, ref } from 'vue';
import ChipComponent from '../ui/ChipComponent.vue';

interface IMediaCardProps {
	media: TMedia;
	mediaType: EMediaType;
}

const props = defineProps<IMediaCardProps>();

const dialog = ref<boolean>(false);

const displayImageText = (media: TMedia) => {
	let imageText = '';
	switch (props.mediaType) {
		case EMediaType.ANIME:
			imageText = `Ep ${(media as TAnime).episodesMin} / ${
				(media as TAnime).episodesMax
			}`;
			break;
		case EMediaType.BOOK:
			imageText = `${(media as TBook).author}`;
			break;
		case EMediaType.GAME:
			imageText = `${(media as TGame).playtime} hours`;
			break;
		default:
			break;
	}
	return imageText;
};

const statusColor = (media: TMedia) => {
	let color = '';
	if ((media as TCharacter).source) {
		switch ((media as TCharacter).source) {
			case ECharacterSource.ANIME:
				color = 'green';
				break;
			case ECharacterSource.GAME:
				color = 'blue';
				break;
			case ECharacterSource.MANGA:
				color = 'yellow';
				break;
		}
	} else {
		switch ((media as TAnime | TBook | TGame | TManga | TMovie).status) {
			case EAnimeStatus.WATCHING:
			case EBookStatus.READING:
			case EGameStatus.PLAYING:
			case EMangaStatus.READING:
			case EMovieStatus.WATCHING:
				color = 'green';
				break;
			case EAnimeStatus.COMPLETED:
			case EBookStatus.COMPLETED:
			case EGameStatus.COMPLETED:
			case EMangaStatus.COMPLETED:
			case EMovieStatus.COMPLETED:
				color = 'blue';
				break;
			case EAnimeStatus.ON_HOLD:
			case EBookStatus.ON_HOLD:
			case EGameStatus.ON_HOLD:
			case EMangaStatus.ON_HOLD:
			case EMovieStatus.ON_HOLD:
				color = 'yellow';
				break;
			case EAnimeStatus.DROPPED:
			case EBookStatus.DROPPED:
			case EGameStatus.DROPPED:
			case EMangaStatus.DROPPED:
			case EMovieStatus.DROPPED:
				color = 'red';
				break;
			case EAnimeStatus.PLAN_TO_WATCH:
			case EBookStatus.PLAN_TO_READ:
			case EGameStatus.PLAN_TO_PLAY:
			case EMangaStatus.PLAN_TO_READ:
			case EMovieStatus.PLAN_TO_WATCH:
				color = 'white';
				break;
		}
	}
	return color;
};
</script>
<style>
.image-overlay-icon {
	position: absolute;
	right: 5px;
	top: 5px;
}

.image-text-overlay {
	position: absolute;
	left: 0;
	top: 0;
}

.image-title-overlay {
	position: absolute;
	left: 0;
	bottom: 0;
}

.image-manga-chapters {
	position: absolute;
	left: 0;
	top: 0;
}

.image-manga-volumes {
	position: absolute;
	left: 0;
	top: 20px;
}

.delete-dialog-position {
	margin-top: -50vh;
}
</style>
