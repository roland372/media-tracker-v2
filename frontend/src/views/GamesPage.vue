<template>
	<!-- Show game details when on a game detail route -->
	<router-view v-if="$route.name === 'GameDetailsPage'" />

	<!-- Show games list when not on a game detail route -->
	<template v-else>
		<StatsComponent
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
				@filter-favourites="handleFavouritesFilter"
				@filter-type="handleGameFilterType"
				@search="handleGameSearch"
				@sort="handleGameSort"
				:display-flag="displayFlag"
				:filter-type="gameType"
				:media-status="status"
				:media-type="EMediaType.GAME"
				:sort-fields="sortFields"
				:selected-statuses="gameStatuses"
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
				@filter-favourites="handleFavouritesFilter"
				@filter-type="handleGameFilterType"
				@search="handleGameSearch"
				@sort="handleGameSort"
				:display-flag="displayFlag"
				:filter-type="gameType"
				:media-status="status"
				:media-type="EMediaType.GAME"
				:sort-fields="sortFields"
				:selected-statuses="gameStatuses"
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
					[(game: TGame) => game.title.toLowerCase()],
					['asc']
				)
			"
			title="Favourite Games"
		/>
	</template>
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
	TMediaStatus,
} from '@/types';
import {
	calculatePercentage,
	filterMediaStatus,
	getProgressItems,
	round,
	sortBy,
	advancedSearch,
} from '@/utils/mediaUtils';
import { filter, orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const gamesStore = useGamesStore();
const { games } = storeToRefs(gamesStore);

const displayFlag = ref<string>('grid');
const searchTerm = ref<string>('');
const gameStatuses = ref<TMediaStatus[]>([]);
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
	() => filteredGames.value.filter(games => games.favourites).length
);

const filteredGames = computed(() => {
	if (gameType.value.length === 0) {
		return [];
	}

	const flagConfigs: Array<{ field: keyof TGame; flag: string }> = [
		{ field: 'title', flag: 't:' },
		{ field: 'developer', flag: 'd:' },
	];

	const additionalFilters = (el: TGame) => {
		const statusMatch =
			gameStatuses.value.length === 0 ||
			!gameStatuses.value.includes(el.status as TMediaStatus);

		// Handle comma-separated type values with special handling for Expansion
		const typeMatch = (() => {
			if (gameType.value.length === 0) return true; // If no types selected, don't filter by type

			// Split the item's type by comma and trim each value
			const itemTypes = el.type.split(',').map(t => t.trim());

			// Check if Expansion is one of the selected filters
			const hasExpansionFilter = gameType.value.includes('Expansion');
			// Check if other types besides Expansion are selected
			const otherSelectedTypes = gameType.value.filter(t => t !== 'Expansion');

			// Case 1: Only Expansion is selected - show all items with Expansion type
			if (hasExpansionFilter && otherSelectedTypes.length === 0) {
				return itemTypes.includes('Expansion');
			}

			// Case 2: Expansion + one other type (e.g., Visual Novel) are selected
			// Show only items that have BOTH the selected type AND Expansion
			if (hasExpansionFilter && otherSelectedTypes.length === 1) {
				return (
					itemTypes.includes('Expansion') &&
					itemTypes.includes(otherSelectedTypes[0])
				);
			}

			// Case 3: Multiple types selected but no Expansion
			// Or more than 2 filters including Expansion
			// Regular behavior - show any item that matches at least one selected type
			return gameType.value.some(selectedType =>
				itemTypes.includes(selectedType)
			);
		})();

		const favouritesMatch =
			favouritesFilter.value === 'favourites'
				? el.favourites
				: favouritesFilter.value === 'non-favourites'
					? !el.favourites
					: true;

		return statusMatch && typeMatch && favouritesMatch;
	};

	const filteredItems = advancedSearch(
		games.value,
		searchTerm.value,
		flagConfigs,
		additionalFilters
	);

	const sortedGames = orderBy(
		filteredItems,
		[game => sortBy(game, sortingOptions.value.sortField as keyof TGame)],
		[sortingOptions.value.sortOrder]
	);

	return sortedGames;
});

const totalDays = computed(() => round(totalPlaytime.value / 24, 1));
const totalGames = computed(() => filteredGames.value.length);
const totalPlaytime = computed(() =>
	filteredGames.value.reduce((accumulator, object) => {
		return accumulator + object.playtime;
	}, 0)
);

const playing = computed(
	() => filterMediaStatus(filteredGames, 'playing').length
);
const completed = computed(
	() => filterMediaStatus(filteredGames, 'completed').length
);
const onHold = computed(
	() => filterMediaStatus(filteredGames, 'on-hold').length
);
const dropped = computed(
	() => filterMediaStatus(filteredGames, 'dropped').length
);
const planToPlay = computed(
	() => filterMediaStatus(filteredGames, 'Plan to Play').length
);

const progress = computed(() =>
	getProgressItems(totalGames.value, [
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
	])
);

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

const handleGameFilter = (emittedValue: TMediaStatus[]) =>
	(gameStatuses.value = emittedValue);

const handleGameFilterType = (emittedValue: string[]) =>
	(gameType.value = emittedValue);

const handleGameSearch = (emittedValue: string) =>
	(searchTerm.value = emittedValue);

const handleGameSort = (emittedValue: TSortingOptions) =>
	(sortingOptions.value = emittedValue);
</script>
