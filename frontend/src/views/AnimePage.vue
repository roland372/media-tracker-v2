<template>
	<StatsComponent
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
			@filter-favourites="handleFavouritesFilter"
			@filter-type="handleAnimeFilterType"
			@filter-updated-at-range="handleUpdatedAtRange"
			@search="handleAnimeSearch"
			@sort="handleAnimeSort"
			:display-flag="displayFlag"
			:filter-type="animeType"
			:media-status="status"
			:media-type="EMediaType.ANIME"
			:sort-fields="sortFields"
			:selected-statuses="animeStatuses"
			:updated-at-range="updatedAtRange"
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
			@filter-favourites="handleFavouritesFilter"
			@filter-type="handleAnimeFilterType"
			@filter-updated-at-range="handleUpdatedAtRange"
			@search="handleAnimeSearch"
			@sort="handleAnimeSort"
			:display-flag="displayFlag"
			:filter-type="animeType"
			:media-status="status"
			:media-type="EMediaType.ANIME"
			:sort-fields="sortFields"
			:selected-statuses="animeStatuses"
			:updated-at-range="updatedAtRange"
		/>
	</MediaComponent>
	<MediaComponent
		:media="orderBy(anime, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.ANIME"
		title="Recent Anime"
	/>
	<MediaComponent
		:media-type="EMediaType.ANIME"
		:media="
			orderBy(
				filter(anime, { favourites: true }),
				[(anime: TAnime) => anime.title.toLowerCase()],
				['asc']
			)
		"
		title="Favourite Anime"
	/>
</template>
<script setup lang="ts">
import DisplayFilterSearchPanel from '@/components/media/DisplayFilterSearchPanel.vue';
import MediaComponent from '@/components/media/MediaComponent.vue';
import MediaTable from '@/components/media/MediaTable.vue';
import StatsComponent from '@/components/media/StatsComponent.vue';
import { useAnimeStore } from '@/stores/useAnimeStore';
import {
	EAnimeStatus,
	EAnimeType,
	EMediaType,
	TAnime,
	TDateRange,
	TSortingOptions,
	TMediaStatus,
} from '@/types';
import {
	calculatePercentage,
	filterMediaStatus,
	getProgressItems,
	round,
	sortBy,
	advancedSearch,
	isWithinDateRange,
} from '@/utils/mediaUtils';
import { filter, orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const animeStore = useAnimeStore();
const { anime } = storeToRefs(animeStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const animeStatuses = ref<TMediaStatus[]>([]);
const animeType = ref<string[]>([...Object.values(EAnimeType)]);
const updatedAtRange = ref<TDateRange>({ start: '', end: '' });
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

const favouritesFilter = ref<'all' | 'favourites' | 'non-favourites'>('all');
const handleFavouritesFilter = (
	filterValue: 'all' | 'favourites' | 'non-favourites'
) => {
	favouritesFilter.value = filterValue;
};

const favourites = computed(
	() => filteredAnime.value.filter(anime => anime.favourites).length
);

const filteredAnime = computed(() => {
	if (animeType.value.length === 0) {
		return [];
	}

	const flagConfigs: Array<{ field: keyof TAnime; flag: string }> = [
		{ field: 'title', flag: 't:' },
		{ field: 'studio', flag: 's:' },
	];

	const additionalFilters = (el: TAnime) => {
		const statusMatch =
			animeStatuses.value.length === 0 ||
			!animeStatuses.value.includes(el.status as TMediaStatus);
		const updatedAtMatch = isWithinDateRange(
			el.updatedAt,
			updatedAtRange.value
		);

		const typeMatch =
			animeType.value.length === 0 || animeType.value.includes(el.type);

		const favouritesMatch =
			favouritesFilter.value === 'favourites'
				? el.favourites
				: favouritesFilter.value === 'non-favourites'
					? !el.favourites
					: true;

		return statusMatch && typeMatch && favouritesMatch && updatedAtMatch;
	};

	const filteredItems = advancedSearch(
		anime.value,
		searchTerm.value,
		flagConfigs,
		additionalFilters
	);

	const sortedAnime = orderBy(
		filteredItems,
		[anime => sortBy(anime, sortingOptions.value.sortField as keyof TAnime)],
		[sortingOptions.value.sortOrder]
	);

	return sortedAnime;
});

const watchedEpisodesSum = computed(() =>
	filteredAnime.value.reduce(
		(accumulator, object) => accumulator + object.episodesMin,
		0
	)
);

const totalAnime = computed(() => filteredAnime.value.length);
const totalDays = computed(() => round(watchedEpisodesSum.value / 60, 1));
const totalEpisodesSum = computed(() =>
	filteredAnime.value.reduce(
		(accumulator, object) => accumulator + object.episodesMax,
		0
	)
);

const watching = computed(
	() => filterMediaStatus(filteredAnime, 'watching').length
);
const completed = computed(
	() => filterMediaStatus(filteredAnime, 'completed').length
);
const onHold = computed(
	() => filterMediaStatus(filteredAnime, 'on-hold').length
);
const dropped = computed(
	() => filterMediaStatus(filteredAnime, 'dropped').length
);
const planToWatch = computed(
	() => filterMediaStatus(filteredAnime, 'Plan to Watch').length
);

const progress = computed(() =>
	getProgressItems(totalAnime.value, [
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
	])
);

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

const handleAnimeFilter = (emittedValue: TMediaStatus[]) =>
	(animeStatuses.value = emittedValue);

const handleAnimeFilterType = (emittedValue: string[]) =>
	(animeType.value = emittedValue);

const handleAnimeSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleAnimeSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);
const handleUpdatedAtRange = (emittedValue: TDateRange) =>
	(updatedAtRange.value = emittedValue);

const handleChangeDisplayFlag = () => {
	if (displayFlag.value === 'table') {
		displayFlag.value = 'grid';
	} else if (displayFlag.value === 'grid') {
		displayFlag.value = 'table';
	}
};
</script>
