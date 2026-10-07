<template>
	<v-container fluid class="pa-0">
		<v-row>
			<v-col cols="12">
				<CardComponent title="Media Overview">
					<!-- section below instead of responsive-margin mx-n0 mx-md-n0 mx-sm-n2 -->
					<section
						class="d-flex flex-wrap justify-space-between responsive-margin"
					>
						<div
							v-for="(stat, index) in mediaOverview"
							:key="index"
							class="stat-card ma-2 pa-4 rounded-lg"
							:class="`bg-${stat.color}`"
						>
							<h3 class="text-h5 mb-2 white--text">{{ stat.name }}</h3>
							<div class="text-h4 white--text">{{ stat.count }}</div>
						</div>
					</section>
				</CardComponent>
			</v-col>
		</v-row>

		<v-row class="mt-n5">
			<v-col cols="12" md="6">
				<CardComponent title="Completion Status">
					<section class="d-flex flex-column text-color px-1">
						<div
							v-for="(status, index) in statusBreakdown"
							:key="index"
							class="mb-2"
						>
							<div class="d-flex justify-space-between align-center mb-1">
								<div class="d-flex align-center">
									<v-icon
										:color="status.color"
										icon="mdi-circle"
										class="mr-2"
									/>
									<span>{{ status.name }}</span>
								</div>
								<span>{{ status.count }}</span>
							</div>
							<v-progress-linear
								:model-value="status.percentage"
								height="8"
								:color="status.color"
								rounded
							></v-progress-linear>
						</div>
					</section>
				</CardComponent>
			</v-col>

			<v-col cols="12" md="6" class="mt-n5 mt-md-0 mt-sm-n0">
				<CardComponent title="Media Distribution">
					<section class="d-flex flex-column text-color px-1">
						<div
							v-for="(type, index) in mediaDistribution"
							:key="index"
							class="mb-2"
						>
							<div class="d-flex justify-space-between align-center mb-1">
								<span>{{ type.name }}</span>
								<span
									>{{ type.count }} ({{ Math.round(type.percentage) }}%)</span
								>
							</div>
							<v-progress-linear
								:model-value="type.percentage"
								height="8"
								:color="type.color"
								rounded
							></v-progress-linear>
						</div>
					</section>
				</CardComponent>
			</v-col>
		</v-row>

		<v-row class="mt-n5">
			<v-col cols="12">
				<CardComponent title="Consumption Stats" class="text-color">
					<section
						class="d-flex flex-wrap consumption-stats-container mb-n2 mt-2"
					>
						<div
							v-for="(item, index) in [
								{
									title: 'Total Media Time',
									value: totalConsumptionDays,
									subvalue: totalConsumptionHours,
									subtext: 'hours',
									icon: 'mdi-clock-outline',
									iconColor: 'white',
									bgColor: 'primary-dark',
								},
								{
									title: 'Anime Time',
									value: Math.round((animeHours / 24) * 10) / 10,
									subvalue: Math.round(animeHours),
									subtext: 'hours',
									icon: 'mdi-cat',
									iconColor: 'indigo',
									bgColor: 'primary-dark',
								},
								{
									title: 'Reading Time',
									value: Math.round(((mangaHours + bookHours) / 24) * 10) / 10,
									subvalue: Math.round(mangaHours + bookHours),
									subtext: 'hours',
									icon: 'mdi-book-open-variant',
									iconColor: 'green',
									bgColor: 'primary-dark',
								},
								{
									title: 'Gaming Time',
									value: Math.round((totalPlaytime / 24) * 10) / 10,
									subvalue: totalPlaytime,
									subtext: 'hours',
									icon: 'mdi-gamepad-square',
									iconColor: 'amber',
									bgColor: 'primary-dark',
								},
							]"
							:key="index"
							class="consumption-stat-item pa-1"
						>
							<div
								class="stat-card pa-3 rounded-lg bg-secondary-medium w-100"
								style="border: 1px solid rgba(255, 255, 255, 0.15)"
							>
								<div class="d-flex align-center justify-center mb-1">
									<v-icon :color="item.iconColor" size="20" class="mr-1">{{
										item.icon
									}}</v-icon>
									<h3 class="text-subtitle-2 mb-0">{{ item.title }}</h3>
								</div>
								<div class="text-h5 white--text text-center">
									{{ item.value }} days
								</div>
								<div
									v-if="item.subvalue"
									class="text-caption white--text text-center"
								>
									{{ item.subvalue }} {{ item.subtext }}
								</div>
							</div>
						</div>

						<div class="consumption-stat-item media-items-card pa-1">
							<div
								class="stat-card pa-3 rounded-lg bg-secondary-medium w-100"
								style="border: 1px solid rgba(255, 255, 255, 0.15)"
							>
								<div class="d-flex align-center justify-center mb-1">
									<v-icon color="blue" size="20" class="mr-1"
										>mdi-chart-bar</v-icon
									>
									<h3 class="text-subtitle-2 mb-0">Media Items</h3>
								</div>
								<div class="text-h5 white--text text-center">
									{{ booksCount + anime.length + movies.length }}
								</div>
								<div class="text-caption white--text text-center">
									{{ booksCount }} books, {{ anime.length }} anime,
									{{ movies.length }} shows
								</div>
							</div>
						</div>
					</section>

					<section
						class="d-flex flex-wrap mt-2 consumption-stats-container mb-n2"
					>
						<div
							v-for="(item, index) in [
								{
									title: 'Episodes Watched',
									value: totalEpisodesWatched,
									subvalue: totalWatchTimeHours,
									subtext: 'watch hours',
									icon: 'mdi-television-classic',
									iconColor: 'blue',
									bgColor: 'primary-dark',
								},
								{
									title: 'Books Read',
									value: totalBooksRead,
									subvalue: Math.round(bookHours),
									subtext: 'reading hours',
									icon: 'mdi-book-open-page-variant',
									iconColor: 'purple',
									bgColor: 'primary-dark',
								},
								{
									title: 'Manga Read',
									value: manga.reduce(
										(acc: number, item: TManga) => acc + (item.volumesMin || 0),
										0,
									),
									subvalue: Math.round(mangaHours),
									subtext: 'reading hours',
									icon: 'mdi-book-account',
									iconColor: 'green',
									bgColor: 'primary-dark',
								},
								{
									title: 'Pages Read',
									value: enhancedTotalPages,
									subvalue: `${Math.round(
										enhancedTotalPages / 60,
									)} hours at 1 page/min`,
									subtext: '',
									icon: 'mdi-file-document-outline',
									iconColor: 'grey',
									bgColor: 'primary-dark',
								},
							]"
							:key="index"
							class="consumption-stat-item pa-1"
						>
							<div
								class="stat-card pa-3 rounded-lg bg-secondary-medium w-100"
								style="border: 1px solid rgba(255, 255, 255, 0.15)"
							>
								<div class="d-flex align-center justify-center mb-1">
									<v-icon :color="item.iconColor" size="20" class="mr-1">{{
										item.icon
									}}</v-icon>
									<h3 class="text-subtitle-2 mb-0">{{ item.title }}</h3>
								</div>
								<div class="text-h5 white--text text-center">
									{{ item.value }}
								</div>
								<div
									v-if="item.subvalue"
									class="text-caption white--text text-center"
								>
									{{ item.subvalue }} {{ item.subtext }}
								</div>
							</div>
						</div>
					</section>
				</CardComponent>
			</v-col>
		</v-row>

		<v-row class="mt-n5">
			<v-col cols="12" md="6" class="mb-n5 mb-md-0 mb-sm-n0">
				<CardComponent title="Recent Activity">
					<section class="text-color scroll-list">
						<div
							v-for="(activity, index) in recentActivity.slice(0, 20)"
							:key="index"
							class="d-flex align-center mb-3"
						>
							<v-avatar size="36" class="mr-2">
								<v-icon
									:color="getMediaTypeColor(activity.mediaType)"
									size="20"
									>{{ getMediaTypeIcon(activity.mediaType) }}</v-icon
								>
							</v-avatar>
							<div class="w-100 d-flex">
								<div class="flex-grow-1">
									<div class="d-flex align-center">
										<div
											class="text-subtitle-2 font-weight-medium text-left stats-title-truncate"
										>
											{{ activity.title }}
											<v-icon
												v-if="activity.favourites"
												color="yellow-accent-4"
												size="small"
												icon="mdi-star"
											></v-icon>
										</div>
									</div>
									<div
										class="text-caption text-left text-grey-lighten-1 stats-title-truncate"
										v-if="
											activity.developer || activity.studio || activity.author
										"
									>
										<span>
											{{
												activity.developer || activity.studio || activity.author
											}}
										</span>
									</div>
									<div class="d-flex align-center text-left">
										<span class="text-caption mr-1">{{
											formatDate(activity.updatedAt)
										}}</span>
										<span class="mx-1 text-caption">•</span>
										<v-chip
											:color="getStatusColor(activity.action)"
											size="x-small"
											class="ml-1"
											text-color="white"
										>
											{{ activity.action }}
										</v-chip>
									</div>
								</div>
							</div>
						</div>
					</section>
				</CardComponent>
			</v-col>

			<v-col cols="12" md="6">
				<CardComponent title="Todo Items">
					<section class="text-color scroll-list">
						<div
							v-for="(item, index) in todoItems.slice(0, 20)"
							:key="index"
							class="d-flex align-center mb-3"
						>
							<v-avatar size="36" class="mr-2">
								<v-icon :color="getMediaTypeColor(item.mediaType)" size="20">{{
									getMediaTypeIcon(item.mediaType)
								}}</v-icon>
							</v-avatar>
							<div class="w-100">
								<div
									class="text-subtitle-2 font-weight-medium text-left stats-title-truncate"
								>
									{{ item.title }}
								</div>
								<div class="d-flex align-center text-left">
									<span class="text-caption mr-1">{{
										formatDate(item.updatedAt)
									}}</span>
									<span class="mx-1 text-caption">•</span>
									<v-chip
										:color="getTodoStatusColor(item.todoStatus)"
										size="x-small"
										class="ml-1"
										text-color="white"
									>
										{{ item.todoStatus }}
									</v-chip>
									<span class="ml-1 text-caption">{{
										getTodoTypeLabel(item)
									}}</span>
								</div>
							</div>
						</div>
					</section>
				</CardComponent>
			</v-col>
		</v-row>

		<v-row class="mt-n5">
			<v-col cols="12">
				<CardComponent title="Media Growth Over Time">
					<v-row class="mt-2 text-color">
						<v-col cols="12">
							<div class="chart-container" style="height: 400px">
								<h3 class="text-h6 mb-4">Media Collection Growth By Year</h3>
								<canvas id="media-growth-chart"></canvas>
							</div>
						</v-col>
					</v-row>

					<v-row class="mt-2 text-color">
						<v-col cols="12">
							<h3 class="text-h6 mb-4 text-left d-flex align-center flex-wrap">
								<div class="d-flex align-center">
									<v-icon color="blue" class="mr-2">mdi-chart-line</v-icon>
									<span class="header-title">Media Growth By Year</span>
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
										<th>Year</th>
										<th>Anime</th>
										<th>Books</th>
										<th>Games</th>
										<th>Manga</th>
										<th style="min-width: 110px">Movies & TV</th>
										<th style="min-width: 100px">Total Items</th>
									</tr>
								</thead>
								<tbody class="text-left">
									<tr
										v-for="(yearData, index) in mediaGrowthByYear"
										:key="index"
									>
										<td>{{ yearData.year }}</td>
										<td>{{ yearData.anime }}</td>
										<td>{{ yearData.books }}</td>
										<td>{{ yearData.games }}</td>
										<td>{{ yearData.manga }}</td>
										<td>{{ yearData.movies }}</td>
										<td>
											<strong>{{ yearData.total }}</strong>
										</td>
									</tr>
								</tbody>
							</v-table>
						</v-col>
					</v-row>
				</CardComponent>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
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
import CardComponent from '@/components/media/CardComponent.vue';
import { useAnimeStore } from '@/stores/useAnimeStore';
import { useMangaStore } from '@/stores/useMangaStore';
import { useGamesStore } from '@/stores/useGamesStore';
import { useBooksStore } from '@/stores/useBooksStore';
import { useMoviesStore } from '@/stores/useMoviesStore';
import {
	EMediaType,
	TAnime,
	TManga,
	TGame,
	TBook,
	TMovie,
	ETodoStatus,
} from '@/types';
import { filter, orderBy } from 'lodash';

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

// Store instances
const animeStore = useAnimeStore();
const mangaStore = useMangaStore();
const gamesStore = useGamesStore();
const booksStore = useBooksStore();
const moviesStore = useMoviesStore();

// Data access
const anime = computed(() => animeStore.anime);
const manga = computed(() => mangaStore.manga);
const games = computed(() => gamesStore.games);
const books = computed(() => booksStore.books);
const movies = computed(() => moviesStore.movies);

// Overall counts
const animeCount = computed(() => anime.value.length);
const mangaCount = computed(() => manga.value.length);
const gamesCount = computed(() => games.value.length);
const booksCount = computed(() => books.value.length);
const moviesCount = computed(() => movies.value.length);
const totalMediaCount = computed(
	() =>
		animeCount.value +
		mangaCount.value +
		gamesCount.value +
		booksCount.value +
		moviesCount.value,
);

// Media overview cards
const mediaOverview = computed(() => [
	{ name: 'Anime', count: animeCount.value, color: 'indigo' },
	{ name: 'Books', count: booksCount.value, color: 'purple' },
	{ name: 'Games', count: gamesCount.value, color: 'amber' },
	{ name: 'Manga', count: mangaCount.value, color: 'green' },
	{ name: 'Movies & TV', count: moviesCount.value, color: 'yellow' },
]);

// Status counts
const watchingCount = computed(
	() => filter(anime.value, { status: 'Watching' }).length,
);
const readingCount = computed(
	() =>
		filter(manga.value, { status: 'Reading' }).length +
		filter(books.value, { status: 'Reading' }).length,
);
const playingCount = computed(
	() => filter(games.value, { status: 'Playing' }).length,
);
const completedCount = computed(
	() =>
		filter(anime.value, { status: 'Completed' }).length +
		filter(manga.value, { status: 'Completed' }).length +
		filter(games.value, { status: 'Completed' }).length +
		filter(books.value, { status: 'Completed' }).length +
		filter(movies.value, { status: 'Completed' }).length,
);
const onHoldCount = computed(
	() =>
		filter(anime.value, { status: 'On-Hold' }).length +
		filter(manga.value, { status: 'On-Hold' }).length +
		filter(games.value, { status: 'On-Hold' }).length +
		filter(books.value, { status: 'On-Hold' }).length +
		filter(movies.value, { status: 'On-Hold' }).length,
);
const droppedCount = computed(
	() =>
		filter(anime.value, { status: 'Dropped' }).length +
		filter(manga.value, { status: 'Dropped' }).length +
		filter(games.value, { status: 'Dropped' }).length +
		filter(books.value, { status: 'Dropped' }).length +
		filter(movies.value, { status: 'Dropped' }).length,
);
const plannedCount = computed(
	() =>
		filter(anime.value, (status: TAnime) => status.status.includes('Plan to'))
			.length +
		filter(manga.value, (status: TManga) => status.status.includes('Plan to'))
			.length +
		filter(games.value, (status: TGame) => status.status.includes('Plan to'))
			.length +
		filter(books.value, (status: TBook) => status.status.includes('Plan to'))
			.length +
		filter(movies.value, (status: TMovie) => status.status.includes('Plan to'))
			.length,
);

// Status breakdown
const statusBreakdown = computed(() => {
	const activeCount =
		watchingCount.value + readingCount.value + playingCount.value;
	return [
		{
			name: 'Active',
			count: activeCount,
			percentage: (activeCount / totalMediaCount.value) * 100,
			color: 'green',
		},
		{
			name: 'Completed',
			count: completedCount.value,
			percentage: (completedCount.value / totalMediaCount.value) * 100,
			color: 'blue',
		},
		{
			name: 'On Hold',
			count: onHoldCount.value,
			percentage: (onHoldCount.value / totalMediaCount.value) * 100,
			color: 'yellow',
		},
		{
			name: 'Dropped',
			count: droppedCount.value,
			percentage: (droppedCount.value / totalMediaCount.value) * 100,
			color: 'red',
		},
		{
			name: 'Planned',
			count: plannedCount.value,
			percentage: (plannedCount.value / totalMediaCount.value) * 100,
			color: 'white',
		},
	];
});

// Media distribution
const mediaDistribution = computed(() => {
	const items = [
		{
			name: 'Anime',
			count: animeCount.value,
			percentage: (animeCount.value / totalMediaCount.value) * 100,
			color: 'indigo',
		},
		{
			name: 'Books',
			count: booksCount.value,
			percentage: (booksCount.value / totalMediaCount.value) * 100,
			color: 'purple',
		},
		{
			name: 'Games',
			count: gamesCount.value,
			percentage: (gamesCount.value / totalMediaCount.value) * 100,
			color: 'amber',
		},
		{
			name: 'Manga',
			count: mangaCount.value,
			percentage: (mangaCount.value / totalMediaCount.value) * 100,
			color: 'green',
		},
		{
			name: 'Movies & TV',
			count: moviesCount.value,
			percentage: (moviesCount.value / totalMediaCount.value) * 100,
			color: 'yellow',
		},
	];

	// Round percentages but ensure they sum to 100%
	const roundedItems = items.map(item => ({
		...item,
		percentage: Math.round(item.percentage),
	}));

	// Calculate the sum of the rounded percentages
	const sum = roundedItems.reduce((acc, item) => acc + item.percentage, 0);

	// If the sum is not 100, adjust the largest value
	if (sum !== 100) {
		// Find the item with the largest percentage
		const largestItem = roundedItems.reduce((prev, current) =>
			prev.percentage > current.percentage ? prev : current,
		);

		// Adjust the largest item to make the sum 100
		largestItem.percentage += 100 - sum;
	}

	return roundedItems;
});

// Consumption stats
// Add back the totalPlaytime property
const totalPlaytime = computed(() =>
	games.value.reduce((acc, item) => acc + (item.playtime || 0), 0),
);

// Calculate total time spent across all media
const animeHours = computed(() => {
	const episodeLength = 0.4; // 24 minutes average
	const animeEpisodes = anime.value.reduce(
		(acc, item) => acc + (item.episodesMin || 0),
		0,
	);
	return animeEpisodes * episodeLength;
});

const mangaHours = computed(() => {
	// Using estimated manga pages with 1 page per minute reading rate
	const totalMangaPages = manga.value.reduce((acc, item) => {
		const volumesRead = item.volumesMin || 0;
		return acc + volumesRead * 200; // 200 pages per volume
	}, 0);

	return totalMangaPages / 60; // 1 page per minute = 60 pages per hour
});

const bookHours = computed(() => {
	// Using book pages with 1 page per minute reading rate
	const totalBookPages = books.value.reduce(
		(acc, item) => acc + (item.pages || 0),
		0,
	);
	return totalBookPages / 60; // 1 page per minute = 60 pages per hour
});

// Add a new metric that combines all media consumption time
const totalConsumptionHours = computed(() => {
	return Math.round(
		animeHours.value + mangaHours.value + bookHours.value + totalPlaytime.value,
	);
});

// Calculate total consumption days
const totalConsumptionDays = computed(() => {
	return Math.round((totalConsumptionHours.value / 24) * 10) / 10; // Round to 1 decimal place
});

// Define a proper type for todo items
type TodoItem = {
	mediaType: EMediaType;
	todoStatus?: ETodoStatus;
	todoType: string;
	title: string;
	developer?: string;
	studio?: string;
	author?: string;
	updatedAt?: Date;
};

// Define a proper activity item type
type ActivityItem = {
	mediaType: EMediaType;
	action: string;
	title: string;
	favourites: boolean;
	developer?: string;
	studio?: string;
	author?: string;
	authorLink?: string;
	developerLink?: string;
	studioLink?: string;
	updatedAt?: Date;
};

// Recent activity with enhanced information
const allMedia = computed(() => {
	const animeItems = anime.value.map(
		item =>
			({
				...item,
				mediaType: EMediaType.ANIME,
				action: getStatusAction(item.status),
			}) as ActivityItem,
	);

	const mangaItems = manga.value.map(
		item =>
			({
				...item,
				mediaType: EMediaType.MANGA,
				action: getStatusAction(item.status),
			}) as ActivityItem,
	);

	const gameItems = games.value.map(
		item =>
			({
				...item,
				mediaType: EMediaType.GAME,
				action: getStatusAction(item.status),
			}) as ActivityItem,
	);

	const bookItems = books.value.map(
		item =>
			({
				...item,
				mediaType: EMediaType.BOOK,
				action: getStatusAction(item.status),
			}) as ActivityItem,
	);

	const movieItems = movies.value.map(
		item =>
			({
				...item,
				mediaType: EMediaType.MOVIE,
				action: getStatusAction(item.status),
			}) as ActivityItem,
	);

	return [
		...animeItems,
		...mangaItems,
		...gameItems,
		...bookItems,
		...movieItems,
	] as ActivityItem[];
});

const recentActivity = computed<ActivityItem[]>(() =>
	orderBy(allMedia.value, ['updatedAt'], ['desc']).slice(0, 20),
);

// Helper functions
const getStatusAction = (status: string): string => {
	// Convert to lowercase for case-insensitive comparison
	const statusLower = status.toLowerCase();

	if (statusLower === 'completed') {
		return 'Completed';
	} else if (
		statusLower.includes('watching') ||
		statusLower.includes('playing') ||
		statusLower.includes('reading')
	) {
		return 'In Progress';
	} else if (statusLower.includes('on-hold')) {
		return 'On Hold';
	} else if (statusLower.includes('dropped')) {
		return 'Dropped';
	} else if (statusLower.includes('plan')) {
		return 'Planned';
	} else {
		// If none of the above match, default to showing the original status
		return status;
	}
};

const getStatusColor = (status: string): string => {
	switch (status) {
		case 'Completed':
			return 'blue';
		case 'In Progress':
			return 'green';
		case 'On Hold':
			return 'amber';
		case 'Dropped':
			return 'red';
		case 'Planned':
			return 'white';
		default:
			return 'white';
	}
};

const getMediaTypeIcon = (mediaType: EMediaType): string => {
	switch (mediaType) {
		case EMediaType.ANIME:
			return 'mdi-cat';
		case EMediaType.BOOK:
			return 'mdi-book-open-variant';
		case EMediaType.GAME:
			return 'mdi-gamepad-square';
		case EMediaType.MANGA:
			return 'mdi-book-account';
		case EMediaType.MOVIE:
			return 'mdi-movie-open';
		default:
			return 'mdi-help-circle';
	}
};

const getMediaTypeColor = (mediaType: EMediaType): string => {
	switch (mediaType) {
		case EMediaType.ANIME:
			return 'indigo';
		case EMediaType.MANGA:
			return 'green';
		case EMediaType.GAME:
			return 'amber';
		case EMediaType.BOOK:
			return 'purple';
		case EMediaType.MOVIE:
			return 'yellow';
		default:
			return 'grey';
	}
};

const formatDate = (dateString: string | Date | undefined): string => {
	if (!dateString) return 'Unknown';
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

// Completed books only (manga volumes are tracked separately)
const totalBooksRead = computed(
	() => filter(books.value, { status: 'Completed' }).length,
);

// Enhanced page calculation (book pages + estimated manga/LN pages)
const enhancedTotalPages = computed(() => {
	// Actual book pages
	const bookPages = books.value.reduce(
		(acc, item) => acc + (item.pages || 0),
		0,
	);

	// Estimated manga pages (200 pages per volume for all manga types)
	const mangaPages = manga.value.reduce((acc, item) => {
		const volumesRead = item.volumesMin || 0;
		return acc + volumesRead * 200;
	}, 0);

	return bookPages + mangaPages;
});

// Total episodes calculation (anime + TV shows/movies)
const totalEpisodesWatched = computed(() => {
	const animeEpisodes = anime.value.reduce(
		(acc, item) => acc + (item.episodesMin || 0),
		0,
	);
	const movieEpisodes = movies.value.reduce(
		(acc, item) => acc + (item.episodesMin || 0),
		0,
	);
	return animeEpisodes + movieEpisodes;
});

// Estimated watch time in hours
const totalWatchTimeHours = computed(() => {
	// Average anime episode = 24 minutes
	const animeHours =
		(anime.value.reduce((acc, item) => acc + (item.episodesMin || 0), 0) * 24) /
		60;

	// Average TV episode = 45 minutes, movies = 120 minutes
	const movieHours = movies.value.reduce((acc, item) => {
		const episodeCount = item.episodesMin || 0;
		// Assuming tv shows have type 'TV-Show' and movies have type 'Movie'
		const minutesPerEpisode = item.type === 'Movie' ? 120 : 45;
		return acc + (episodeCount * minutesPerEpisode) / 60;
	}, 0);

	return Math.round(animeHours + movieHours);
});

// Chart initialization
onMounted(() => {
	createMediaGrowthChart();
});

// Add todo items computed property
const todoItems = computed<TodoItem[]>(() => {
	const animeItems = anime.value
		.filter(
			item =>
				item.charactersDone !== undefined &&
				(item.charactersDone === ETodoStatus.TODO ||
					item.charactersDone === ETodoStatus.INCOMPLETE),
		)
		.map(item => ({
			...item,
			mediaType: EMediaType.ANIME,
			todoStatus: item.charactersDone,
			todoType: 'charactersDone',
		}));

	const mangaItems = manga.value
		.filter(
			item =>
				item.charactersDone !== undefined &&
				(item.charactersDone === ETodoStatus.TODO ||
					item.charactersDone === ETodoStatus.INCOMPLETE),
		)
		.map(item => ({
			...item,
			mediaType: EMediaType.MANGA,
			todoStatus: item.charactersDone,
			todoType: 'charactersDone',
		}));

	const gameCharItems = games.value
		.filter(
			item =>
				item.charactersDone !== undefined &&
				(item.charactersDone === ETodoStatus.TODO ||
					item.charactersDone === ETodoStatus.INCOMPLETE),
		)
		.map(item => ({
			...item,
			mediaType: EMediaType.GAME,
			todoStatus: item.charactersDone,
			todoType: 'charactersDone',
		}));

	const gameMusicItems = games.value
		.filter(
			item =>
				item.musicDownloaded !== undefined &&
				(item.musicDownloaded === ETodoStatus.TODO ||
					item.musicDownloaded === ETodoStatus.INCOMPLETE),
		)
		.map(item => ({
			...item,
			mediaType: EMediaType.GAME,
			todoStatus: item.musicDownloaded,
			todoType: 'musicDownloaded',
		}));

	return orderBy(
		[...animeItems, ...mangaItems, ...gameCharItems, ...gameMusicItems],
		['updatedAt'],
		['desc'],
	).slice(0, 20);
});

// Helper function to get todo status color
const getTodoStatusColor = (status: ETodoStatus | undefined): string => {
	if (status === undefined) return 'grey';

	switch (status) {
		case ETodoStatus.COMPLETED:
			return 'blue';
		case ETodoStatus.TODO:
			return 'green';
		case ETodoStatus.INCOMPLETE:
			return 'yellow';
		case ETodoStatus.SKIP:
			return 'red';
		default:
			return 'grey';
	}
};

// Helper function to get todo type label
const getTodoTypeLabel = (item: TodoItem): string => {
	switch (item.todoType) {
		case 'charactersDone':
			return 'Characters';
		case 'musicDownloaded':
			return 'Music';
		default:
			return item.todoType;
	}
};

// Media Growth By Year calculations
const mediaGrowthByYear = computed(() => {
	// Get years range for all media
	const getAllYears = () => {
		const years = new Set<number>();

		// Collect years from all media types
		anime.value.forEach(item => {
			if (item.createdAt) {
				years.add(new Date(item.createdAt).getFullYear());
			}
		});

		manga.value.forEach(item => {
			if (item.createdAt) {
				years.add(new Date(item.createdAt).getFullYear());
			}
		});

		books.value.forEach(item => {
			if (item.createdAt) {
				years.add(new Date(item.createdAt).getFullYear());
			}
		});

		games.value.forEach(item => {
			if (item.createdAt) {
				years.add(new Date(item.createdAt).getFullYear());
			}
		});

		movies.value.forEach(item => {
			if (item.createdAt) {
				years.add(new Date(item.createdAt).getFullYear());
			}
		});

		// Convert to array and sort
		return Array.from(years).sort();
	};

	const years = getAllYears();
	const result = [];

	// For each year, calculate the cumulative count for each media type
	for (const year of years) {
		const animeCount = anime.value.filter(
			item => item.createdAt && new Date(item.createdAt).getFullYear() <= year,
		).length;

		const mangaCount = manga.value.filter(
			item => item.createdAt && new Date(item.createdAt).getFullYear() <= year,
		).length;

		const booksCount = books.value.filter(
			item => item.createdAt && new Date(item.createdAt).getFullYear() <= year,
		).length;

		const gamesCount = games.value.filter(
			item => item.createdAt && new Date(item.createdAt).getFullYear() <= year,
		).length;

		const moviesCount = movies.value.filter(
			item => item.createdAt && new Date(item.createdAt).getFullYear() <= year,
		).length;

		const totalCount =
			animeCount + mangaCount + booksCount + gamesCount + moviesCount;

		result.push({
			year,
			anime: animeCount,
			manga: mangaCount,
			books: booksCount,
			games: gamesCount,
			movies: moviesCount,
			total: totalCount,
		});
	}

	// Sort by year in descending order (newest first)
	return result.sort((a, b) => b.year - a.year);
});

// Create the media growth chart
const createMediaGrowthChart = () => {
	const mediaGrowthChart = document.getElementById(
		'media-growth-chart',
	) as HTMLCanvasElement;

	if (mediaGrowthChart && mediaGrowthByYear.value.length > 0) {
		// Sort by year in ascending order for the chart
		const sortedData = [...mediaGrowthByYear.value].sort(
			(a, b) => a.year - b.year,
		);

		new Chart(mediaGrowthChart, {
			type: 'bar',
			data: {
				labels: sortedData.map(item => item.year.toString()),
				datasets: [
					{
						label: 'Anime',
						data: sortedData.map(item => item.anime),
						backgroundColor: '#3F51B5', // Indigo
						stack: 'Stack 0',
					},
					{
						label: 'Books',
						data: sortedData.map(item => item.books),
						backgroundColor: '#9C27B0', // Purple
						stack: 'Stack 0',
					},
					{
						label: 'Games',
						data: sortedData.map(item => item.games),
						backgroundColor: '#FFC107', // Amber
						stack: 'Stack 0',
					},
					{
						label: 'Manga',
						data: sortedData.map(item => item.manga),
						backgroundColor: '#4CAF50', // Green
						stack: 'Stack 0',
					},
					{
						label: 'Movies & TV',
						data: sortedData.map(item => item.movies),
						backgroundColor: '#FFEB3B', // Yellow
						stack: 'Stack 0',
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'top',
						labels: {
							color: 'white',
						},
					},
					tooltip: {
						mode: 'index',
						callbacks: {
							afterBody: tooltipItems => {
								// Add total to tooltip
								const dataIndex = tooltipItems[0].dataIndex;
								const year = sortedData[dataIndex];
								return `Total: ${year.total}`;
							},
						},
					},
				},
				scales: {
					x: {
						stacked: true,
						ticks: { color: 'white' },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
					},
					y: {
						stacked: true,
						ticks: { color: 'white' },
						grid: { color: 'rgba(255, 255, 255, 0.1)' },
					},
				},
				layout: {
					padding: {
						bottom: 50, // Add padding at the bottom
					},
				},
			},
		});
	}
};
</script>

<style scoped>
.stat-card {
	min-width: 150px;
	border-radius: 8px;
	padding: 8px;
}

.chart-container {
	padding: 16px;
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	height: 100%;
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

/* Mobile styling */
@media (max-width: 750px) {
	.stat-card {
		width: 100%;
		margin: 8px;
	}

	.consumption-stat-item {
		width: 100% !important;
		flex: 0 0 100% !important;
		max-width: none !important;
	}

	.consumption-stats-container {
		width: 100%;
		margin: 0 !important;
		padding: 0 !important;
	}

	.media-items-card {
		width: 100% !important;
		min-width: auto !important;
		max-width: none !important;
	}
}

@media (min-width: 751px) {
	.consumption-stat-item {
		display: flex;
		flex: 1 1 auto;
		align-items: stretch;
		max-width: 25%;
	}
}

@media (min-width: 751px) {
	.consumption-stat-item {
		display: flex;
		flex: 1 1 auto;
		align-items: stretch;
		max-width: 25%;
		min-width: 140px;
	}
}

@media (max-width: 750px) {
	.consumption-stat-item {
		width: 100% !important;
		flex: 0 0 100% !important;
		max-width: none !important;
		min-width: 100% !important;
	}

	.consumption-stats-container {
		width: 100%;
		margin: 0 !important;
		padding: 0 !important;
	}
}

.consumption-stat-item {
	padding: 4px;
}

.consumption-stats-container {
	width: 100%;
	margin: 0 !important;
}

/* Desktop styling */
@media (min-width: 751px) {
	.consumption-stat-item {
		display: flex;
		flex: 1 1 auto;
		align-items: stretch;
		max-width: 25%;
		min-width: 140px;
	}
}

/* Mobile styling with stronger overrides */
@media (max-width: 750px) {
	.stat-card {
		width: 100% !important;
		margin: 4px 0 !important;
	}

	.consumption-stat-item {
		width: 100% !important;
		flex: 0 0 100% !important;
		max-width: 100% !important;
		min-width: auto !important;
		display: block !important;
	}

	.consumption-stats-container {
		width: 100% !important;
		margin: 0 !important;
		padding: 0 !important;
	}
}

.responsive-margin {
	margin-left: 0 !important;
	margin-right: 0 !important;
}

@media (min-width: 750px) {
	.responsive-margin {
		margin-left: -8px !important;
		margin-right: -8px !important;
	}
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

.scroll-list {
	max-height: 370px;
	overflow-y: auto;
	padding-right: 6px;
}

.stats-title-truncate {
	max-width: 350px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
