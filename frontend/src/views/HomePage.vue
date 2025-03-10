<template>
	<HeaderComponent title="Welcome to Media-Tracker"> </HeaderComponent>
	<MediaComponent
		:media="orderBy(anime, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.ANIME"
		title="Recent Anime"
	/>
	<ButtonText class="mt-n1 mb-3" color="indigo" text="All Anime" to="/anime" />
	<MediaComponent
		:media="orderBy(characters, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.CHARACTER"
		title="Recent Characters"
	/>
	<ButtonText
		class="mt-n1 mb-3"
		color="indigo"
		text="All Characters"
		to="/characters"
	/>
	<MediaComponent
		:media="orderBy(games, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.GAME"
		title="Recent Games"
	/>
	<ButtonText class="mt-n1 mb-3" color="indigo" text="All Games" to="/games" />
	<MediaComponent
		:media="orderBy(manga, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.MANGA"
		title="Recent Manga"
	/>
	<ButtonText class="mt-n1 mb-3" color="indigo" text="All Books" to="/books" />
	<MediaComponent
		:media="orderBy(books, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.BOOK"
		title="Recent Books"
	/>
	<ButtonText class="mt-n1 mb-3" color="indigo" text="All Books" to="/books" />
	<MediaComponent
		:media="orderBy(movies, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.MOVIE"
		title="Recent Movies"
	/>
	<ButtonText
		class="mt-n1 mb-3"
		color="indigo"
		text="All Movies"
		to="/movies"
	/>
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/media/HeaderComponent.vue';
import MediaComponent from '@/components/media/MediaComponent.vue';
import ButtonText from '@/components/ui/ButtonText.vue';
import { useMediaRefs } from '@/stores/useMediaRefs';
import { EMediaType } from '@/types';
import { orderBy } from 'lodash';

const { anime, characters, games, manga, books, movies } = useMediaRefs();
</script>
