<template>
	<StatsComponent
		:mean-score="meanScore"
		:media-type="EMediaType.GAME"
		:progress="progress"
		:status="status"
		:stats="stats"
		:total-days="totalDays"
	/>
	<MediaTable
		v-if="displayFlag === 'table'"
		:media="filteredGames"
		:media-type="EMediaType.GAME"
		title="All Games"
	>
		<DisplayFilterSearchPanel
			@display="handleChangeDisplayFlag"
			@filter="handleGameFilter"
			@filter-type="handleGameFilterType"
			@search="handleGameSearch"
			@sort="handleGameSort"
			:display-flag="displayFlag"
			:filter-type="gameType"
			:media-status="status"
			:media-type="EMediaType.GAME"
			:sort-fields="sortFields"
		/>
	</MediaTable>
	<MediaComponent
		v-if="displayFlag === 'grid'"
		all-media
		:media="filteredGames"
		:media-type="EMediaType.GAME"
		title="All Games"
	>
		<DisplayFilterSearchPanel
			@display="handleChangeDisplayFlag"
			@filter="handleGameFilter"
			@filter-type="handleGameFilterType"
			@search="handleGameSearch"
			@sort="handleGameSort"
			:display-flag="displayFlag"
			:filter-type="gameType"
			:media-status="status"
			:media-type="EMediaType.GAME"
			:sort-fields="sortFields"
		/>
	</MediaComponent>
	<MediaComponent
		:media="orderBy(games, ['updatedAt'], ['desc']).slice(0, 20)"
		:media-type="EMediaType.GAME"
		title="Recent Games"
	/>
	<MediaComponent
		:media-type="EMediaType.GAME"
		:media="
			orderBy(
				filter(games, { favourites: true }),
				[game => game.title.toLowerCase()],
				['asc']
			)
		"
		title="Favourite Games"
	/>
</template>
<script setup lang="ts">
import DisplayFilterSearchPanel from '@/components/media/DisplayFilterSearchPanel.vue';
import MediaComponent from '@/components/media/MediaComponent.vue';
import MediaTable from '@/components/media/MediaTable.vue';
import StatsComponent from '@/components/media/StatsComponent.vue';
import { useGamesStore } from '@/stores/useGamesStore';
import {
	EGameStatus,
	EGameType,
	EMediaType,
	TGame,
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

const gamesStore = useGamesStore();
const { games } = storeToRefs(gamesStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const gameFilter = ref<string>('');
const gameType = ref<string[]>([...Object.values(EGameType)]);
const sortingOptions = ref<TSortingOptions>({
	sortField: 'title',
	sortOrder: 'asc',
});
const sortFields = [
	{
		label: 'Playtime',
		value: 'playtime',
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
	() => games.value.filter(games => games.favourites).length
);

const filteredGames = computed(() => {
	if (gameType.value.length === 0) {
		return [];
	}

	const filteredItems = games.value.filter(el => {
		const searchTermMatch = el.title
			.toLowerCase()
			.includes(searchTerm.value.toLowerCase());
		const statusMatch =
			gameFilter.value === '' || el.status === gameFilter.value;
		const typeMatch =
			gameType.value.length === 0 || gameType.value.includes(el.type);

		return searchTermMatch && statusMatch && typeMatch;
	});

	const sortedGames = orderBy(
		filteredItems,
		[game => sortBy(game, sortingOptions.value.sortField as keyof TGame)],
		[sortingOptions.value.sortOrder]
	);

	return sortedGames;
});

const filterZeroRating = computed(
	() => games.value.filter(games => games.rating !== 0).length
);

const totalDays = computed(() => round(totalPlaytime.value / 24, 1));
const totalGames = computed(() => games.value.length);
const totalPlaytime = computed(() =>
	games.value.reduce((accumulator, object) => {
		return accumulator + object.playtime;
	}, 0)
);

const totalRating = computed(() =>
	games.value.reduce((accumulator, object) => accumulator + object.rating, 0)
);

const meanScore = computed(() =>
	filterZeroRating.value === 0
		? 0
		: round(totalRating.value / filterZeroRating.value, 2)
);

const playing = computed(() => filterMediaStatus(games, 'playing').length);
const completed = computed(() => filterMediaStatus(games, 'completed').length);
const onHold = computed(() => filterMediaStatus(games, 'on-hold').length);
const dropped = computed(() => filterMediaStatus(games, 'dropped').length);
const planToPlay = computed(
	() => filterMediaStatus(games, 'Plan to Play').length
);

const progress = computed(() => [
	{
		color: 'green',
		value: calculatePercentage(playing.value, totalGames.value),
	},
	{
		color: 'blue',
		value: calculatePercentage(completed.value, totalGames.value),
	},
	{
		color: 'yellow',
		value: calculatePercentage(onHold.value, totalGames.value),
	},
	{
		color: 'red',
		value: calculatePercentage(dropped.value, totalGames.value),
	},
	{
		color: 'white',
		value: calculatePercentage(planToPlay.value, totalGames.value),
	},
]);

const status = computed(() => [
	{ color: 'green', name: EGameStatus.PLAYING, value: playing },
	{ color: 'blue', name: EGameStatus.COMPLETED, value: completed },
	{ color: 'yellow', name: EGameStatus.ON_HOLD, value: onHold },
	{ color: 'red', name: EGameStatus.DROPPED, value: dropped },
	{ color: 'white', name: EGameStatus.PLAN_TO_PLAY, value: planToPlay },
]);

const stats = computed(() => [
	{ name: 'Total Games', value: totalGames.value },
	{ name: 'Favourites', value: favourites },
	{ name: 'Playtime', value: totalPlaytime.value + ' hours' },
]);

const handleChangeDisplayFlag = () => {
	if (displayFlag.value === 'table') {
		displayFlag.value = 'grid';
	} else if (displayFlag.value === 'grid') {
		displayFlag.value = 'table';
	}
};

const handleGameFilter = (emittedValue: string) =>
	(gameFilter.value = emittedValue);

const handleGameFilterType = (emittedValue: string[]) =>
	(gameType.value = emittedValue);

const handleGameSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleGameSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);
</script>
