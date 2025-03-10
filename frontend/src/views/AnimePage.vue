<template>
	<StatsComponent
		:mean-score="meanScore"
		:media-type="EMediaType.ANIME"
		:progress="progress"
		:status="status"
		:stats="stats"
		:total-days="totalDays"
	/>
	<MediaTable
		v-if="displayFlag === 'table'"
		:media="filteredAnime"
		:media-type="EMediaType.ANIME"
		title="All Anime"
	>
		<DisplayFilterSearchPanel
			@display="handleChangeDisplayFlag"
			@filter="handleAnimeFilter"
			@filter-type="handleAnimeFilterType"
			@search="handleAnimeSearch"
			@sort="handleAnimeSort"
			:display-flag="displayFlag"
			:filter-type="animeType"
			:media-status="status"
			:media-type="EMediaType.ANIME"
			:sort-fields="sortFields"
		/>
	</MediaTable>
	<MediaComponent
		v-if="displayFlag === 'grid'"
		all-media
		:media="filteredAnime"
		:media-type="EMediaType.ANIME"
		title="All Anime"
	>
		<DisplayFilterSearchPanel
			@display="handleChangeDisplayFlag"
			@filter="handleAnimeFilter"
			@filter-type="handleAnimeFilterType"
			@search="handleAnimeSearch"
			@sort="handleAnimeSort"
			:display-flag="displayFlag"
			:filter-type="animeType"
			:media-status="status"
			:media-type="EMediaType.ANIME"
			:sort-fields="sortFields"
		/>
	</MediaComponent>
	<MediaComponent
		:media="orderBy(anime, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.ANIME"
		title="Recent Anime"
	/>
	<MediaComponent
		:media-type="EMediaType.ANIME"
		:media="orderBy(filter(anime, { favourites: true }), ['title'], ['asc'])"
		title="Favourite Anime"
	/>
</template>
<script setup lang="ts">
import DisplayFilterSearchPanel from '@/components/media/DisplayFilterSearchPanel.vue';
import MediaComponent from '@/components/media/MediaComponent.vue';
import MediaTable from '@/components/media/MediaTable.vue';
import StatsComponent from '@/components/media/StatsComponent.vue';
import { useAnimeStore } from '@/stores/useAnimeStore';
import { EAnimeStatus, EAnimeType, EMediaType, TSortingOptions } from '@/types';
import {
	calculatePercentage,
	filterMediaStatus,
	round,
} from '@/utils/mediaUtils';
import { filter, orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const animeStore = useAnimeStore();
const { anime } = storeToRefs(animeStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const animeFilter = ref<string>('');
const animeType = ref<string[]>([...Object.values(EAnimeType)]);
const sortingOptions = ref<TSortingOptions>({
	sortField: 'title',
	sortOrder: 'asc',
});
const sortFields = [
	{
		label: 'Progress',
		value: 'episodesMin',
	},
	{
		label: 'Rating',
		value: 'rating',
	},
	{
		label: 'Status',
		value: 'status',
	},
	{
		label: 'Title',
		value: 'title',
	},
	{
		label: 'Type',
		value: 'type',
	},
];

const favourites = computed(
	() => anime.value.filter(anime => anime.favourites).length
);

const filteredAnime = computed(() => {
	if (animeType.value.length === 0) {
		return [];
	}

	const filteredItems = anime.value.filter(el => {
		const searchTermMatch = el.title
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase());
		const statusMatch =
			animeFilter.value === '' || el.status === animeFilter.value;
		const typeMatch =
			animeType.value.length === 0 || animeType.value.includes(el.type);

		return searchTermMatch && statusMatch && typeMatch;
	});

	const sortedAnime = orderBy(
		filteredItems,
		[sortingOptions.value.sortField],
		[sortingOptions.value.sortOrder]
	);

	return sortedAnime;
});

const filterZeroRating = computed(
	() => anime.value.filter(anime => anime.rating !== 0).length
);

const watchedEpisodesSum = computed(() =>
	anime.value.reduce(
		(accumulator, object) => accumulator + object.episodesMin,
		0
	)
);

const totalAnime = computed(() => anime.value.length);
const totalDays = computed(() => round(watchedEpisodesSum.value / 60, 1));
const totalEpisodesSum = computed(() =>
	anime.value.reduce(
		(accumulator, object) => accumulator + object.episodesMax,
		0
	)
);

const totalRating = computed(() =>
	anime.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);

const meanScore = computed(() =>
	filterZeroRating.value === 0
		? 0
		: round(totalRating.value / filterZeroRating.value, 2)
);

const watching = computed(() => filterMediaStatus(anime, 'watching').length);
const completed = computed(() => filterMediaStatus(anime, 'completed').length);
const onHold = computed(() => filterMediaStatus(anime, 'on-hold').length);
const dropped = computed(() => filterMediaStatus(anime, 'dropped').length);
const planToWatch = computed(
	() => filterMediaStatus(anime, 'Plan to Watch').length
);

const progress = computed(() => [
	{
		color: 'green',
		value: calculatePercentage(watching.value, totalAnime.value),
	},
	{
		color: 'blue',
		value: calculatePercentage(completed.value, totalAnime.value),
	},
	{
		color: 'yellow',
		value: calculatePercentage(onHold.value, totalAnime.value),
	},
	{
		color: 'red',
		value: calculatePercentage(dropped.value, totalAnime.value),
	},
	{
		color: 'white',
		value: calculatePercentage(planToWatch.value, totalAnime.value),
	},
]);

const status = computed(() => [
	{ color: 'green', name: EAnimeStatus.WATCHING, value: watching },
	{ color: 'blue', name: EAnimeStatus.COMPLETED, value: completed },
	{ color: 'yellow', name: EAnimeStatus.ON_HOLD, value: onHold },
	{ color: 'red', name: EAnimeStatus.DROPPED, value: dropped },
	{ color: 'white', name: EAnimeStatus.PLAN_TO_WATCH, value: planToWatch },
]);

const stats = computed(() => [
	{ name: 'Total Anime', value: totalAnime },
	{ name: 'Favourites', value: favourites },
	{ name: 'Total Episodes', value: totalEpisodesSum },
	{ name: 'Watched Episodes', value: watchedEpisodesSum },
	{ name: '', value: null },
]);

const handleAnimeFilter = (emittedValue: string) =>
	(animeFilter.value = emittedValue);

const handleAnimeFilterType = (emittedValue: string[]) =>
	(animeType.value = emittedValue);

const handleAnimeSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleAnimeSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);

const handleChangeDisplayFlag = () => {
	if (displayFlag.value === 'table') {
		displayFlag.value = 'grid';
	} else if (displayFlag.value === 'grid') {
		displayFlag.value = 'table';
	}
};
</script>
