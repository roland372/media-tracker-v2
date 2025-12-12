<template>
	<StatsComponent
		:media-type="EMediaType.MOVIE"
		:progress="progress"
		:status="status"
		:stats="stats"
		:total-days="totalDays"
	/>
	<MediaTable
		v-if="displayFlag === 'table'"
		:media="filteredMovies"
		:media-type="EMediaType.MOVIE"
		title="All Movies"
	>
		<DisplayFilterSearchPanel
			@display="handleChangeDisplayFlag"
			@filter="handleMovieFilter"
			@filter-favourites="handleFavouritesFilter"
			@filter-type="handleMovieFilterType"
			@filter-updated-at-range="handleUpdatedAtRange"
			@search="handleMovieSearch"
			@sort="handleMovieSort"
			:display-flag="displayFlag"
			:filter-type="movieType"
			:media-status="status"
			:media-type="EMediaType.MOVIE"
			:sort-fields="sortFields"
			:selected-statuses="movieStatuses"
			:updated-at-range="updatedAtRange"
		/>
	</MediaTable>
	<MediaComponent
		v-if="displayFlag === 'grid'"
		all-media
		:media="filteredMovies"
		:media-type="EMediaType.MOVIE"
		title="All Movies"
	>
		<DisplayFilterSearchPanel
			@display="handleChangeDisplayFlag"
			@filter="handleMovieFilter"
			@filter-favourites="handleFavouritesFilter"
			@filter-type="handleMovieFilterType"
			@filter-updated-at-range="handleUpdatedAtRange"
			@search="handleMovieSearch"
			@sort="handleMovieSort"
			:display-flag="displayFlag"
			:filter-type="movieType"
			:media-status="status"
			:media-type="EMediaType.MOVIE"
			:sort-fields="sortFields"
			:selected-statuses="movieStatuses"
			:updated-at-range="updatedAtRange"
		/>
	</MediaComponent>
	<MediaComponent
		:media="orderBy(movies, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.MOVIE"
		title="Recent Movies"
	/>
	<MediaComponent
		:media-type="EMediaType.MOVIE"
		:media="
			orderBy(
				filter(movies, { favourites: true }),
				[(movie: TMovie) => movie.title.toLowerCase()],
				['asc']
			)
		"
		title="Favourite Movies"
	/>
</template>
<script setup lang="ts">
import DisplayFilterSearchPanel from '@/components/media/DisplayFilterSearchPanel.vue';
import MediaComponent from '@/components/media/MediaComponent.vue';
import MediaTable from '@/components/media/MediaTable.vue';
import StatsComponent from '@/components/media/StatsComponent.vue';
import { useMoviesStore } from '@/stores/useMoviesStore';
import {
	EMediaType,
	EMovieStatus,
	EMovieType,
	TMovie,
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

const moviesStore = useMoviesStore();
const { movies } = storeToRefs(moviesStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const movieStatuses = ref<TMediaStatus[]>([]);
const movieType = ref<string[]>([...Object.values(EMovieType)]);
const updatedAtRange = ref<TDateRange>({ start: '', end: '' });
const sortingOptions = ref<TSortingOptions>({
	sortField: 'title',
	sortOrder: 'asc',
});
const sortFields = [
	{
		label: 'Episodes',
		value: 'episodesMin',
	},
	{
		label: 'Seasons',
		value: 'seasonsMin',
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
	() => filteredMovies.value.filter(movies => movies.favourites).length
);

const filteredMovies = computed(() => {
	if (movieType.value.length === 0) {
		return [];
	}

	const flagConfigs: Array<{ field: keyof TMovie; flag: string }> = [
		{ field: 'title', flag: 't:' },
	];

	const additionalFilters = (el: TMovie) => {
		const statusMatch =
			movieStatuses.value.length === 0 ||
			!movieStatuses.value.includes(el.status as TMediaStatus);
		const updatedAtMatch = isWithinDateRange(
			el.updatedAt,
			updatedAtRange.value
		);

		const typeMatch =
			movieType.value.length === 0 || movieType.value.includes(el.type);

		const favouritesMatch =
			favouritesFilter.value === 'favourites'
				? el.favourites
				: favouritesFilter.value === 'non-favourites'
					? !el.favourites
					: true;

		return statusMatch && typeMatch && favouritesMatch && updatedAtMatch;
	};

	const filteredItems = advancedSearch(
		movies.value,
		searchTerm.value,
		flagConfigs,
		additionalFilters
	);

	const sortedMovies = orderBy(
		filteredItems,
		[movie => sortBy(movie, sortingOptions.value.sortField as keyof TMovie)],
		[sortingOptions.value.sortOrder]
	);

	return sortedMovies;
});

const filteredTotalMoviesAmount = computed(
	() => filteredMovies.value.filter(movie => movie.type === 'Movie').length
);

const filteredTotalTVShowsAmount = computed(
	() => filteredMovies.value.filter(movie => movie.type === 'TV-Show').length
);

const filteredTVShowsEpisodes = computed(() =>
	filteredMovies.value
		.filter(movie => movie.type === 'TV-Show')
		.reduce((accumulator, object) => {
			return accumulator + object.episodesMin;
		}, 0)
);

const totalDays = computed(() =>
	round(
		(filteredTotalMoviesAmount.value * 2) / 24 +
			(filteredTVShowsEpisodes.value * 1) / 24,
		1
	)
);

const totalMovies = computed(() => filteredMovies.value.length);

const watching = computed(
	() => filterMediaStatus(filteredMovies, 'watching').length
);
const completed = computed(
	() => filterMediaStatus(filteredMovies, 'completed').length
);
const onHold = computed(
	() => filterMediaStatus(filteredMovies, 'on-hold').length
);
const dropped = computed(
	() => filterMediaStatus(filteredMovies, 'dropped').length
);
const planToWatch = computed(
	() => filterMediaStatus(filteredMovies, 'Plan to Watch').length
);

const progress = computed(() =>
	getProgressItems(totalMovies.value, [
		{
			color: 'green',
			value: calculatePercentage(watching.value, totalMovies.value),
		},
		{
			color: 'blue',
			value: calculatePercentage(completed.value, totalMovies.value),
		},
		{
			color: 'yellow',
			value: calculatePercentage(onHold.value, totalMovies.value),
		},
		{
			color: 'red',
			value: calculatePercentage(dropped.value, totalMovies.value),
		},
		{
			color: 'white',
			value: calculatePercentage(planToWatch.value, totalMovies.value),
		},
	])
);

const status = computed(() => [
	{ color: 'green', name: EMovieStatus.WATCHING, value: watching },
	{ color: 'blue', name: EMovieStatus.COMPLETED, value: completed },
	{ color: 'yellow', name: EMovieStatus.ON_HOLD, value: onHold },
	{ color: 'red', name: EMovieStatus.DROPPED, value: dropped },
	{ color: 'white', name: EMovieStatus.PLAN_TO_WATCH, value: planToWatch },
]);

const stats = computed(() => [
	{ name: 'Total Movies', value: filteredTotalMoviesAmount.value },
	{ name: 'Total TV-Shows', value: filteredTotalTVShowsAmount.value },
	{ name: 'Favourites', value: favourites },
]);

const handleChangeDisplayFlag = () => {
	if (displayFlag.value === 'table') {
		displayFlag.value = 'grid';
	} else if (displayFlag.value === 'grid') {
		displayFlag.value = 'table';
	}
};

const handleMovieFilter = (emittedValue: TMediaStatus[]) =>
	(movieStatuses.value = emittedValue);

const handleMovieFilterType = (emittedValue: string[]) =>
	(movieType.value = emittedValue);

const handleMovieSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleMovieSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);
const handleUpdatedAtRange = (emittedValue: TDateRange) =>
	(updatedAtRange.value = emittedValue);
</script>
