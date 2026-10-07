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
				@filter-updated-at-range="handleUpdatedAtRange"
				@search="handleGameSearch"
				@sort="handleGameSort"
				:display-flag="displayFlag"
				:filter-type="gameType"
				:filter-type-options="gameTypeOptions"
				:favourites-filter="favouritesFilter"
				:media-status="status"
				:media-type="EMediaType.GAME"
				:search-term="searchTerm"
				:sort-fields="sortFields"
				:sorting-options="sortingOptions"
				:selected-statuses="gameStatuses"
				:updated-at-range="updatedAtRange"
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
				@filter-updated-at-range="handleUpdatedAtRange"
				@search="handleGameSearch"
				@sort="handleGameSort"
				:display-flag="displayFlag"
				:filter-type="gameType"
				:filter-type-options="gameTypeOptions"
				:favourites-filter="favouritesFilter"
				:media-status="status"
				:media-type="EMediaType.GAME"
				:search-term="searchTerm"
				:sort-fields="sortFields"
				:sorting-options="sortingOptions"
				:selected-statuses="gameStatuses"
				:updated-at-range="updatedAtRange"
			/>
		</MediaComponent>
		<MediaComponent
			:media="orderBy(games, ['updatedAt'], ['desc']).slice(0, 20)"
			:media-type="EMediaType.GAME"
			title="Recent Games"
		/>
		<!-- <MediaComponent
			:media-type="EMediaType.GAME"
			:media="
				orderBy(
					filter(games, { favourites: true }),
					[(game: TGame) => game.title.toLowerCase()],
					['asc'],
				)
			"
			title="Favourite Games"
		/> -->

		<!-- TODO: Create separate component for Details -->
		<CardComponent title="Details">
			<v-row class="pt-1 text-color">
				<v-col cols="12" md="6">
					<div class="chart-container custom-chart-scroll">
						<h3 class="text-h6 mb-4">Top Developers</h3>
						<!-- The inner wrapper dictates how long the canvas stretches internally -->
						<div :style="{ height: topDevelopers.length * 20 + 'px' }">
							<canvas id="game-developers-chart"></canvas>
						</div>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<div class="chart-container custom-chart-scroll">
						<h3 class="text-h6 mb-4">Top Series</h3>
						<div :style="{ height: topSeries.length * 20 + 'px' }">
							<canvas id="game-series-chart"></canvas>
						</div>
					</div>
				</v-col>
			</v-row>

			<v-row class="mt-2 text-color">
				<v-col cols="12" md="4">
					<div
						class="chart-container"
						:class="{ 'custom-chart-scroll': allGamesByYear.length > 25 }"
					>
						<h3 class="text-h6 mb-4">All Games by Year</h3>
						<div
							:style="{
								height: Math.max(allGamesByYear.length * 20, 250) + 'px', // Ensure a minimum height of 250px
							}"
						>
							<canvas id="all-games-by-year-chart"></canvas>
						</div>
					</div>
				</v-col>
				<v-col cols="12" md="4">
					<div
						class="chart-container"
						:class="{ 'custom-chart-scroll': standardGamesByYear.length > 25 }"
					>
						<h3 class="text-h6 mb-4">Standard Games by Year</h3>
						<div
							:style="{
								height: Math.max(standardGamesByYear.length * 20, 250) + 'px',
							}"
						>
							<canvas id="standard-games-by-year-chart"></canvas>
						</div>
					</div>
				</v-col>
				<v-col cols="12" md="4">
					<div
						class="chart-container"
						:class="{ 'custom-chart-scroll': vnGamesByYear.length > 25 }"
					>
						<h3 class="text-h6 mb-4">Visual Novels by Year</h3>
						<div
							:style="{
								height: Math.max(vnGamesByYear.length * 20, 250) + 'px',
							}"
						>
							<canvas id="vn-games-by-year-chart"></canvas>
						</div>
					</div>
				</v-col>
			</v-row>

			<v-row class="mt-6 text-color">
				<v-col cols="12">
					<h3 class="text-h6 mb-4 text-left d-flex align-center flex-wrap">
						<div class="d-flex align-center">
							<v-icon color="amber" class="mr-2">mdi-gamepad-square</v-icon>
							<span class="header-title">Games Completed This Year</span>
						</div>
						<div
							class="d-flex align-center flex-wrap stats-container mt-3 mt-lg-0"
						>
							<div class="stat-group mr-2">
								<v-icon size="small" color="primary" class="mx-1"
									>mdi-counter</v-icon
								>
								<span class="text-subtitle-1"
									>{{ thisYearCompletedGames.length }} games</span
								>
							</div>

							<div class="stat-group mx-2">
								<v-icon size="small" color="secondary" class="mx-1"
									>mdi-clock-outline</v-icon
								>
								<span class="text-subtitle-1 mr-2"
									>{{ thisYearTotalPlaytime }} hours</span
								>
								<v-icon size="small" color="success" class="mx-1"
									>mdi-calendar-clock</v-icon
								>
								<span class="text-subtitle-1"
									>{{ Math.floor(thisYearTotalPlaytime / 24) }} days</span
								>
							</div>

							<div class="stat-group ml-2">
								<v-icon size="small" color="info" class="mx-1"
									>mdi-controller</v-icon
								>
								<span class="text-subtitle-1 mr-2"
									>{{ thisYearStandardGames.length }} games</span
								>
								<v-icon size="small" color="warning" class="mx-1"
									>mdi-book-open-page-variant</v-icon
								>
								<span class="text-subtitle-1"
									>{{ thisYearVisualNovels.length }} VNs</span
								>
							</div>
						</div>
					</h3>
					<v-table
						density="compact"
						fixed-header
						height="400px"
						class="games-table"
					>
						<thead class="text-left">
							<tr>
								<th style="min-width: 250px">Title</th>
								<th style="min-width: 150px">Type</th>
								<th style="min-width: 50px">Playtime (Hours)</th>
								<th style="min-width: 130px">Completion Date</th>
							</tr>
						</thead>
						<tbody class="text-left">
							<tr v-for="(game, index) in thisYearCompletedGames" :key="index">
								<td>{{ game.title }}</td>
								<td>{{ game.type }}</td>
								<td>{{ game.playtime }}</td>
								<td style="white-space: nowrap">
									{{ formatDate(game.updatedAt) }}
								</td>
							</tr>
						</tbody>
					</v-table>
				</v-col>
			</v-row>

			<v-row class="mt-6 text-color">
				<v-col cols="12">
					<h3 class="text-h6 mb-4 text-left d-flex align-center flex-wrap">
						<div class="d-flex align-center">
							<v-icon color="amber" class="mr-2">mdi-gamepad-square</v-icon>
							<span class="header-title">Games Completed Last Year</span>
						</div>
						<div
							class="d-flex align-center flex-wrap stats-container mt-3 mt-lg-0"
						>
							<div class="stat-group mr-2">
								<v-icon size="small" color="primary" class="mx-1"
									>mdi-counter</v-icon
								>
								<span class="text-subtitle-1"
									>{{ lastYearCompletedGames.length }} games</span
								>
							</div>

							<div class="stat-group mx-2">
								<v-icon size="small" color="secondary" class="mx-1"
									>mdi-clock-outline</v-icon
								>
								<span class="text-subtitle-1 mr-2"
									>{{ lastYearTotalPlaytime }} hours</span
								>
								<v-icon size="small" color="success" class="mx-1"
									>mdi-calendar-clock</v-icon
								>
								<span class="text-subtitle-1"
									>{{ Math.floor(lastYearTotalPlaytime / 24) }} days</span
								>
							</div>

							<div class="stat-group ml-2">
								<v-icon size="small" color="info" class="mx-1"
									>mdi-controller</v-icon
								>
								<span class="text-subtitle-1 mr-2"
									>{{ lastYearStandardGames.length }} games</span
								>
								<v-icon size="small" color="warning" class="mx-1"
									>mdi-book-open-page-variant</v-icon
								>
								<span class="text-subtitle-1"
									>{{ lastYearVisualNovels.length }} VNs</span
								>
							</div>
						</div>
					</h3>
					<v-table
						density="compact"
						fixed-header
						height="400px"
						class="games-table"
					>
						<thead class="text-left">
							<tr>
								<th style="min-width: 250px">Title</th>
								<th style="min-width: 150px">Type</th>
								<th style="min-width: 50px">Playtime (Hours)</th>
								<th style="min-width: 130px">Completion Date</th>
							</tr>
						</thead>
						<tbody class="text-left">
							<tr v-for="(game, index) in lastYearCompletedGames" :key="index">
								<td>{{ game.title }}</td>
								<td>{{ game.type }}</td>
								<td>{{ game.playtime }}</td>
								<td>{{ formatDate(game.updatedAt) }}</td>
							</tr>
						</tbody>
					</v-table>
				</v-col>
			</v-row>
		</CardComponent>
	</template>
</template>
<script setup lang="ts">
import CardComponent from '@/components/media/CardComponent.vue';
import DisplayFilterSearchPanel from '@/components/media/DisplayFilterSearchPanel.vue';
import MediaComponent from '@/components/media/MediaComponent.vue';
import MediaTable from '@/components/media/MediaTable.vue';
import StatsComponent from '@/components/media/StatsComponent.vue';
import { useGamesStore } from '@/stores/useGamesStore';
import { useMediaPageFilters } from '@/composables/useMediaPageFilters';
import {
	EGameStatus,
	EGameType,
	EMediaType,
	TGame,
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
	compareGamesBySeries,
} from '@/utils/mediaUtils';
import { filter, orderBy } from 'lodash';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import {
	Chart,
	PieController,
	DoughnutController,
	BarController,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';

// Register Chart.js components
Chart.register(
	PieController,
	DoughnutController,
	BarController,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Tooltip,
	Legend,
);

const gamesStore = useGamesStore();
const { games } = storeToRefs(gamesStore);

const gameTypeOptions = [...Object.values(EGameType)];
const {
	displayFlag,
	searchTerm,
	selectedStatuses: gameStatuses,
	typeFilter: gameType,
	updatedAtRange,
	sortingOptions,
	favouritesFilter,
} = useMediaPageFilters(EMediaType.GAME, {
	sortField: 'series',
	typeFilter: gameTypeOptions,
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
		label: 'Series',
		value: 'series',
	},
	{
		label: 'Type',
		value: 'type',
	},
];

const handleFavouritesFilter = (
	filterValue: 'all' | 'favourites' | 'non-favourites',
) => {
	favouritesFilter.value = filterValue;
};

const favourites = computed(
	() => filteredGames.value.filter(games => games.favourites).length,
);

const filteredGames = computed(() => {
	if (gameType.value.length === 0) {
		return [];
	}

	const flagConfigs: Array<{ field: keyof TGame; flag: string }> = [
		{ field: 'title', flag: 't:' },
		{ field: 'developer', flag: 'd:' },
		{ field: 'series', flag: 's:' },
	];

	const additionalFilters = (el: TGame) => {
		const statusMatch =
			gameStatuses.value.length === 0 ||
			!gameStatuses.value.includes(el.status as TMediaStatus);
		const updatedAtMatch = isWithinDateRange(
			el.updatedAt,
			updatedAtRange.value,
		);

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
				itemTypes.includes(selectedType),
			);
		})();

		const favouritesMatch =
			favouritesFilter.value === 'favourites'
				? el.favourites
				: favouritesFilter.value === 'non-favourites'
					? !el.favourites
					: true;

		return statusMatch && typeMatch && favouritesMatch && updatedAtMatch;
	};

	const filteredItems = advancedSearch(
		games.value,
		searchTerm.value,
		flagConfigs,
		additionalFilters,
	);

	const sortedGames =
		sortingOptions.value.sortField === 'series'
			? [...filteredItems].sort((a, b) =>
					compareGamesBySeries(a, b, sortingOptions.value.sortOrder),
				)
			: orderBy(
					filteredItems,
					[game => sortBy(game, sortingOptions.value.sortField as keyof TGame)],
					[sortingOptions.value.sortOrder],
				);

	return sortedGames;
});

const totalDays = computed(() => round(totalPlaytime.value / 24, 1));
const totalGames = computed(() => filteredGames.value.length);
const totalPlaytime = computed(() =>
	filteredGames.value.reduce((accumulator, object) => {
		return accumulator + object.playtime;
	}, 0),
);

const playing = computed(
	() => filterMediaStatus(filteredGames, 'playing').length,
);
const completed = computed(
	() => filterMediaStatus(filteredGames, 'completed').length,
);
const onHold = computed(
	() => filterMediaStatus(filteredGames, 'on-hold').length,
);
const dropped = computed(
	() => filterMediaStatus(filteredGames, 'dropped').length,
);
const planToPlay = computed(
	() => filterMediaStatus(filteredGames, 'Plan to Play').length,
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
	]),
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
const handleUpdatedAtRange = (emittedValue: TDateRange) =>
	(updatedAtRange.value = emittedValue);

// TODO Move these functions to to separate utils file

const formatDate = (dateString: string | Date | undefined): string => {
	if (!dateString) return 'Unknown';
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

// Game calculations
// Standard games (excluding VNs)
const standardGames = computed(() =>
	games.value.filter(game => game.type === 'Game'),
);

// Visual Novels
const visualNovels = computed(() =>
	games.value.filter(game => game.type === 'Visual Novel'),
);

// Games By Year (separated by type)
const allGamesByYear = computed(() => {
	const yearCounts: { [key: string]: number } = {};

	(filter(games.value, { status: 'Completed' }) as TGame[]).forEach(game => {
		if (game.updatedAt) {
			const year = new Date(game.updatedAt).getFullYear().toString();
			yearCounts[year] = (yearCounts[year] || 0) + 1;
		}
	});

	return Object.entries(yearCounts).sort((a, b) => Number(a[0]) - Number(b[0]));
});

const standardGamesByYear = computed(() => {
	const yearCounts: { [key: string]: number } = {};

	(filter(standardGames.value, { status: 'Completed' }) as TGame[]).forEach(
		game => {
			if (game.updatedAt) {
				const year = new Date(game.updatedAt).getFullYear().toString();
				yearCounts[year] = (yearCounts[year] || 0) + 1;
			}
		},
	);

	return Object.entries(yearCounts).sort((a, b) => Number(a[0]) - Number(b[0]));
});

const vnGamesByYear = computed(() => {
	const yearCounts: { [key: string]: number } = {};

	(filter(visualNovels.value, { status: 'Completed' }) as TGame[]).forEach(
		game => {
			if (game.updatedAt) {
				const year = new Date(game.updatedAt).getFullYear().toString();
				yearCounts[year] = (yearCounts[year] || 0) + 1;
			}
		},
	);

	return Object.entries(yearCounts).sort((a, b) => Number(a[0]) - Number(b[0]));
});

// Games completed in the current year
const thisYearCompletedGames = computed(() => {
	const currentYear = new Date().getFullYear();

	return orderBy(
		filter(games.value, (game: TGame) => {
			if (game.status !== 'Completed' || !game.updatedAt) return false;
			const completionYear = new Date(game.updatedAt).getFullYear();
			return completionYear === currentYear;
		}),
		['updatedAt'],
		['desc'],
	);
});

// Calculate total playtime for this year's completed games
const thisYearTotalPlaytime = computed(() => {
	return thisYearCompletedGames.value.reduce(
		(total, game) => total + (game.playtime || 0),
		0,
	);
});

// Games completed in the previous year
const lastYearCompletedGames = computed(() => {
	const currentYear = new Date().getFullYear();
	const lastYear = currentYear - 1;

	return orderBy(
		filter(games.value, (game: TGame) => {
			if (game.status !== 'Completed' || !game.updatedAt) return false;
			const completionYear = new Date(game.updatedAt).getFullYear();
			return completionYear === lastYear;
		}),
		['updatedAt'],
		['desc'],
	);
});

// Calculate total playtime for last year's completed games
const lastYearTotalPlaytime = computed(() => {
	return lastYearCompletedGames.value.reduce(
		(total, game) => total + (game.playtime || 0),
		0,
	);
});

// Chart initialization
onMounted(() => {
	createDeveloperChart();
	createSeriesChart();
	createGamesByYearCharts();
});

const topDevelopers = computed(() => {
	// Developer counts and filter for those with > 5 games
	const developers: { [key: string]: number } = {};

	games.value.forEach((game: TGame) => {
		if (game.developer) {
			developers[game.developer] = (developers[game.developer] || 0) + 1;
		}
	});

	return Object.entries(developers)
		.filter(([, count]) => count >= 5)
		.sort((a, b) => b[1] - a[1]);
});

const createDeveloperChart = () => {
	// Developer Chart
	const developersChart = document.getElementById(
		'game-developers-chart',
	) as HTMLCanvasElement;
	if (developersChart) {
		new Chart(developersChart, {
			type: 'bar',
			data: {
				labels: topDevelopers.value.map(([name]) => name),
				datasets: [
					{
						label: 'Number of Games',
						data: topDevelopers.value.map(([, count]) => count),
						backgroundColor: '#3F51B5',
						borderWidth: 0,
						barThickness: 12, // Reduce the bar height
					},
				],
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false, // Allow the chart to adjust its height
				plugins: {
					legend: {
						labels: {
							color: 'white',
							usePointStyle: true,
							boxWidth: 10,
							boxHeight: 10,
						},
					},
				},
				scales: {
					x: {
						ticks: { color: 'white' },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
					y: {
						ticks: { color: 'white' },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
				},
				layout: {
					padding: {
						bottom: 10,
					},
				},
			},
		});
	}
};

const topSeries = computed(() => {
	// Series counts and filter for those with > 5 games
	const series: { [key: string]: number } = {};

	games.value.forEach((game: TGame) => {
		if (game.series) {
			series[game.series] = (series[game.series] || 0) + 1;
		}
	});

	return Object.entries(series)
		.filter(([, count]) => count >= 5)
		.sort((a, b) => b[1] - a[1]);
});

const createSeriesChart = () => {
	// Series Chart
	const seriesChart = document.getElementById(
		'game-series-chart',
	) as HTMLCanvasElement;
	if (seriesChart) {
		new Chart(seriesChart, {
			type: 'bar',
			data: {
				labels: topSeries.value.map(([name]) => name),
				datasets: [
					{
						label: 'Number of Games',
						data: topSeries.value.map(([, count]) => count),
						backgroundColor: '#4CAF50',
						borderWidth: 0,
						barThickness: 12, // Reduce the bar height
					},
				],
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false, // Allow the chart to adjust its height
				plugins: {
					legend: {
						labels: {
							color: 'white',
							usePointStyle: true,
							boxWidth: 10,
							boxHeight: 10,
						},
					},
				},
				scales: {
					x: {
						ticks: { color: 'white' },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
					y: {
						ticks: { color: 'white' },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
				},
				layout: {
					padding: {
						bottom: 10,
					},
				},
			},
		});
	}
};

const createGamesByYearCharts = () => {
	// All Games by Year Chart
	const allGamesYearChart = document.getElementById(
		'all-games-by-year-chart',
	) as HTMLCanvasElement;
	if (allGamesYearChart) {
		new Chart(allGamesYearChart, {
			type: 'bar',
			data: {
				labels: allGamesByYear.value.map(([year]) => year),
				datasets: [
					{
						label: 'Completed Games',
						data: allGamesByYear.value.map(([, count]) => count),
						backgroundColor: '#2196F3',
						borderWidth: 0,
					},
				],
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						labels: {
							color: 'white',
							usePointStyle: true,
							boxWidth: 10,
							boxHeight: 10,
						},
					},
				},
				scales: {
					x: {
						ticks: { color: 'white' },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
					y: {
						ticks: { color: 'white', autoSkip: false },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
				},
				layout: {
					padding: {
						bottom: 10,
					},
				},
			},
		});
	}

	// Standard Games by Year Chart
	const standardGamesYearChart = document.getElementById(
		'standard-games-by-year-chart',
	) as HTMLCanvasElement;
	if (standardGamesYearChart) {
		new Chart(standardGamesYearChart, {
			type: 'bar',
			data: {
				labels: standardGamesByYear.value.map(([year]) => year),
				datasets: [
					{
						label: 'Completed Games',
						data: standardGamesByYear.value.map(([, count]) => count),
						backgroundColor: '#4CAF50',
						borderWidth: 0,
					},
				],
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						labels: {
							color: 'white',
							usePointStyle: true,
							boxWidth: 10,
							boxHeight: 10,
						},
					},
				},
				scales: {
					x: {
						ticks: { color: 'white' },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
					y: {
						ticks: { color: 'white', autoSkip: false },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
				},
				layout: {
					padding: {
						bottom: 10,
					},
				},
			},
		});
	}

	// VN Games by Year Chart
	const vnGamesYearChart = document.getElementById(
		'vn-games-by-year-chart',
	) as HTMLCanvasElement;
	if (vnGamesYearChart) {
		new Chart(vnGamesYearChart, {
			type: 'bar',
			data: {
				labels: vnGamesByYear.value.map(([year]) => year),
				datasets: [
					{
						label: 'Completed VNs',
						data: vnGamesByYear.value.map(([, count]) => count),
						backgroundColor: '#FF5722',
						borderWidth: 0,
					},
				],
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						labels: {
							color: 'white',
							usePointStyle: true,
							boxWidth: 10,
							boxHeight: 10,
						},
					},
				},
				scales: {
					x: {
						ticks: { color: 'white' },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
					y: {
						ticks: { color: 'white', autoSkip: false },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
						border: { display: false },
					},
				},
				layout: {
					padding: {
						bottom: 10,
					},
				},
			},
		});
	}
};

// Games completed in the current year - by type
const thisYearStandardGames = computed(() => {
	return thisYearCompletedGames.value.filter(
		game => game.type !== 'Visual Novel',
	);
});

const thisYearVisualNovels = computed(() => {
	return thisYearCompletedGames.value.filter(
		game => game.type === 'Visual Novel',
	);
});

// Games completed in the previous year - by type
const lastYearStandardGames = computed(() => {
	return lastYearCompletedGames.value.filter(
		game => game.type !== 'Visual Novel',
	);
});

const lastYearVisualNovels = computed(() => {
	return lastYearCompletedGames.value.filter(
		game => game.type === 'Visual Novel',
	);
});
</script>
<style scoped>
.chart-container {
	padding: 16px;
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	height: 100%;
}

/* New: Forces independent scrolling areas for massive list datasets */
.custom-chart-scroll {
	height: 500px !important; /* Forces an external layout bounding box */
	overflow-y: auto; /* Triggers standard vertical scrollbars */
	overflow-x: hidden; /* Prevents unwanted horizontal layout shifts */
}

.games-table th {
	background-color: var(--bg-primary-dark) !important;
	color: var(--text-color) !important;
}

.games-table,
.games-table .v-table__wrapper {
	background-color: var(--bg-secondary-medium) !important;
	color: var(--text-color) !important;
}

.stat-group {
	display: flex;
	align-items: center;
	padding: 4px 8px;
	background-color: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(255, 255, 255, 0.15);
	border-radius: 6px;
	margin-bottom: 4px;
}

.stats-container {
	width: 100%;
}

@media (max-width: 600px) {
	.stats-container {
		margin-left: 0 !important;
		justify-content: flex-start !important;
		margin-top: 8px;
	}

	.stat-group {
		margin-left: 0 !important;
		margin-right: 8px !important;
	}
}

.header-title {
	margin-right: 16px;
}

@media (min-width: 960px) {
	.stats-container {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
