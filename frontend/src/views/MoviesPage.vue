<template>
	<StatsComponent
		:mean-score="meanScore"
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
			@filter-type="handleMovieFilterType"
			@search="handleMovieSearch"
			@sort="handleMovieSort"
			:display-flag="displayFlag"
			:filter-type="movieType"
			:media-status="status"
			:media-type="EMediaType.MOVIE"
			:sort-fields="sortFields"
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
			@filter-type="handleMovieFilterType"
			@search="handleMovieSearch"
			@sort="handleMovieSort"
			:display-flag="displayFlag"
			:filter-type="movieType"
			:media-status="status"
			:media-type="EMediaType.MOVIE"
			:sort-fields="sortFields"
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
				[movie => movie.title.toLowerCase()],
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
	TSortingOptions,
} from '@/types';
import {
	calculatePercentage,
	filterMediaStatus,
	round,
	sortBy,
} from '@/utils/mediaUtils';
import { filter, orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const moviesStore = useMoviesStore();
const { movies } = storeToRefs(moviesStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const movieFilter = ref<string>('');
const movieType = ref<string[]>([...Object.values(EMovieType)]);
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
		label: 'Rating',
		value: 'rating',
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

const favourites = computed(
	() => movies.value.filter(movies => movies.favourites).length
);

const filteredMovies = computed(() => {
	if (movieType.value.length === 0) {
		return [];
	}

	const filteredItems = movies.value.filter(el => {
		const searchTermMatch = el.title
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase());
		const statusMatch =
			movieFilter.value === '' || el.status === movieFilter.value;
		const typeMatch =
			movieType.value.length === 0 || movieType.value.includes(el.type);
		return searchTermMatch && statusMatch && typeMatch;
	});

	const sortedMovies = orderBy(
		filteredItems,
		[movie => sortBy(movie, sortingOptions.value.sortField as keyof TMovie)],
		[sortingOptions.value.sortOrder]
	);

	return sortedMovies;
});

const filterZeroRating = computed(
	() => movies.value.filter(movies => movies.rating !== 0).length
);

const filteredTotalMoviesAmount = computed(
	() => movies.value.filter(movie => movie.type === 'Movie').length
);

const filteredTotalTVShowsAmount = computed(
	() => movies.value.filter(movie => movie.type === 'TV-Show').length
);

const filteredTVShowsEpisodes = computed(() =>
	movies.value
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

const totalMovies = computed(() => movies.value.length);
const totalRating = computed(() =>
	movies.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);

const meanScore = computed(() =>
	filterZeroRating.value === 0
		? 0
		: round(totalRating.value / filterZeroRating.value, 2)
);

const watching = computed(() => filterMediaStatus(movies, 'watching').length);
const completed = computed(() => filterMediaStatus(movies, 'completed').length);
const onHold = computed(() => filterMediaStatus(movies, 'on-hold').length);
const dropped = computed(() => filterMediaStatus(movies, 'dropped').length);
const planToWatch = computed(
	() => filterMediaStatus(movies, 'Plan to Watch').length
);

const progress = computed(() => [
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
]);

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

const handleMovieFilter = (emittedValue: string) =>
	(movieFilter.value = emittedValue);

const handleMovieFilterType = (emittedValue: string[]) =>
	(movieType.value = emittedValue);

const handleMovieSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleMovieSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);
</script>
