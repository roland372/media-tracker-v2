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
								<div class="text-h5 white--text text-center">{{ item.value }} days</div>
								<div v-if="item.subvalue" class="text-caption white--text text-center">
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
									{{ totalBooksRead + anime.length + movies.length }}
								</div>
								<div class="text-caption white--text text-center">
									{{ totalBooksRead }} books, {{ anime.length }} anime,
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
										(acc, item) => acc + (item.volumesMin || 0),
										0
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
										enhancedTotalPages / 60
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
								<div class="text-h5 white--text text-center">{{ item.value }}</div>
								<div v-if="item.subvalue" class="text-caption white--text text-center">
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
					<section class="text-color">
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
										<div class="text-subtitle-2 font-weight-medium text-left text-truncate" style="max-width: 200px;">
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
										class="text-caption text-left text-grey-lighten-1 text-truncate"
										v-if="activity.developer || activity.studio || activity.author"
										style="max-width: 200px;"
									>
										<span>
											{{ activity.developer || activity.studio || activity.author }}
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
					<section class="text-color">
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
								<div class="text-subtitle-2 font-weight-medium text-left text-truncate" style="max-width: 200px;">
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
				<CardComponent title="Game Stats">
					<v-row class="mx-n1 mx-n3 pt-2">
						<v-col cols="12" sm="4">
							<section class="stat-section text-color">
								<h3 class="text-h6 mb-3">All Games</h3>
								<div class="stat-table">
									<div class="stat-row">
										<span>Playing</span>
										<span>{{ gameStatusCounts.playing }}</span>
										<span
											>{{
												calculatePercentage(
													gameStatusCounts.playing,
													totalGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>Completed</span>
										<span>{{ gameStatusCounts.completed }}</span>
										<span
											>{{
												calculatePercentage(
													gameStatusCounts.completed,
													totalGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>On-Hold</span>
										<span>{{ gameStatusCounts.onHold }}</span>
										<span
											>{{
												calculatePercentage(
													gameStatusCounts.onHold,
													totalGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>Dropped</span>
										<span>{{ gameStatusCounts.dropped }}</span>
										<span
											>{{
												calculatePercentage(
													gameStatusCounts.dropped,
													totalGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>Plan to Play</span>
										<span>{{ gameStatusCounts.planToPlay }}</span>
										<span
											>{{
												calculatePercentage(
													gameStatusCounts.planToPlay,
													totalGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row highlight">
										<span>Favourites</span>
										<span>{{ gameFavouritesCount }}</span>
										<span
											>{{
												calculatePercentage(gameFavouritesCount, totalGames)
											}}%</span
										>
									</div>
									<div class="stat-row highlight">
										<span>Total Playtime (Hours)</span>
										<span>{{ totalPlaytime }}</span>
										<span></span>
									</div>
									<div class="stat-row highlight">
										<span>Total Playtime (Days)</span>
										<span>{{ (totalPlaytime / 24).toFixed(1) }}</span>
										<span></span>
									</div>
									<div class="stat-row highlight">
										<span>Total Games</span>
										<span>{{ totalGames }}</span>
										<span></span>
									</div>
								</div>
							</section>
						</v-col>

						<v-col cols="12" sm="4">
							<section class="stat-section text-color">
								<h3 class="text-h6 mb-3">Games</h3>
								<div class="stat-table">
									<div class="stat-row">
										<span>Playing</span>
										<span>{{ standardGameStatusCounts.playing }}</span>
										<span
											>{{
												calculatePercentage(
													standardGameStatusCounts.playing,
													totalStandardGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>Completed</span>
										<span>{{ standardGameStatusCounts.completed }}</span>
										<span
											>{{
												calculatePercentage(
													standardGameStatusCounts.completed,
													totalStandardGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>On-Hold</span>
										<span>{{ standardGameStatusCounts.onHold }}</span>
										<span
											>{{
												calculatePercentage(
													standardGameStatusCounts.onHold,
													totalStandardGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>Dropped</span>
										<span>{{ standardGameStatusCounts.dropped }}</span>
										<span
											>{{
												calculatePercentage(
													standardGameStatusCounts.dropped,
													totalStandardGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>Plan to Play</span>
										<span>{{ standardGameStatusCounts.planToPlay }}</span>
										<span
											>{{
												calculatePercentage(
													standardGameStatusCounts.planToPlay,
													totalStandardGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row highlight">
										<span>Favourites</span>
										<span>{{ standardGameFavouritesCount }}</span>
										<span
											>{{
												calculatePercentage(
													standardGameFavouritesCount,
													totalStandardGames
												)
											}}%</span
										>
									</div>
									<div class="stat-row highlight">
										<span>Total Playtime (Hours)</span>
										<span>{{ standardGamePlaytime }}</span>
										<span></span>
									</div>
									<div class="stat-row highlight">
										<span>Total Playtime (Days)</span>
										<span>{{ (standardGamePlaytime / 24).toFixed(1) }}</span>
										<span></span>
									</div>
									<div class="stat-row highlight">
										<span>Total Games</span>
										<span>{{ totalStandardGames }}</span>
										<span></span>
									</div>
								</div>
							</section>
						</v-col>

						<v-col cols="12" sm="4">
							<section class="stat-section text-color">
								<h3 class="text-h6 mb-3">Visual Novels</h3>
								<div class="stat-table">
									<div class="stat-row">
										<span>Playing</span>
										<span>{{ vnStatusCounts.playing }}</span>
										<span
											>{{
												calculatePercentage(vnStatusCounts.playing, totalVNs)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>Completed</span>
										<span>{{ vnStatusCounts.completed }}</span>
										<span
											>{{
												calculatePercentage(vnStatusCounts.completed, totalVNs)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>On-Hold</span>
										<span>{{ vnStatusCounts.onHold }}</span>
										<span
											>{{
												calculatePercentage(vnStatusCounts.onHold, totalVNs)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>Dropped</span>
										<span>{{ vnStatusCounts.dropped }}</span>
										<span
											>{{
												calculatePercentage(vnStatusCounts.dropped, totalVNs)
											}}%</span
										>
									</div>
									<div class="stat-row">
										<span>Plan to Play</span>
										<span>{{ vnStatusCounts.planToPlay }}</span>
										<span
											>{{
												calculatePercentage(
													vnStatusCounts.planToPlay,
													totalVNs
												)
											}}%</span
										>
									</div>
									<div class="stat-row highlight">
										<span>Favourites</span>
										<span>{{ vnFavouritesCount }}</span>
										<span
											>{{
												calculatePercentage(vnFavouritesCount, totalVNs)
											}}%</span
										>
									</div>
									<div class="stat-row highlight">
										<span>Total Playtime (Hours)</span>
										<span>{{ vnPlaytime }}</span>
										<span></span>
									</div>
									<div class="stat-row highlight">
										<span>Total Playtime (Days)</span>
										<span>{{ (vnPlaytime / 24).toFixed(1) }}</span>
										<span></span>
									</div>
									<div class="stat-row highlight">
										<span>Total Visual Novels</span>
										<span>{{ totalVNs }}</span>
										<span></span>
									</div>
								</div>
							</section>
						</v-col>
					</v-row>

					<v-row class="mt-6 text-color">
						<v-col cols="12" md="4">
							<div class="chart-container">
								<h3 class="text-h6 mb-4">All Games Status</h3>
								<canvas id="all-games-status-chart"></canvas>
							</div>
						</v-col>
						<v-col cols="12" md="4">
							<div class="chart-container">
								<h3 class="text-h6 mb-4">Standard Games Status</h3>
								<canvas id="standard-games-status-chart"></canvas>
							</div>
						</v-col>
						<v-col cols="12" md="4">
							<div class="chart-container">
								<h3 class="text-h6 mb-4">Visual Novels Status</h3>
								<canvas id="vn-status-chart"></canvas>
							</div>
						</v-col>
					</v-row>

					<v-row class="mt-6 text-color">
						<v-col cols="12">
							<div class="chart-container" style="height: 800px">
								<h3 class="text-h6 mb-4">Top Developers</h3>
								<canvas id="game-developers-chart"></canvas>
							</div>
						</v-col>
					</v-row>

					<v-row class="mt-6 text-color">
						<v-col cols="12" md="4">
							<div class="chart-container">
								<h3 class="text-h6 mb-4">All Games by Year</h3>
								<canvas id="all-games-by-year-chart"></canvas>
							</div>
						</v-col>
						<v-col cols="12" md="4">
							<div class="chart-container">
								<h3 class="text-h6 mb-4">Standard Games by Year</h3>
								<canvas id="standard-games-by-year-chart"></canvas>
							</div>
						</v-col>
						<v-col cols="12" md="4">
							<div class="chart-container">
								<h3 class="text-h6 mb-4">Visual Novels by Year</h3>
								<canvas id="vn-games-by-year-chart"></canvas>
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
								<div class="d-flex align-center flex-wrap stats-container">
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
										<th>Title</th>
										<th>Type</th>
										<th>Playtime (Hours)</th>
										<th>Completion Date</th>
									</tr>
								</thead>
								<tbody class="text-left">
									<tr
										v-for="(game, index) in thisYearCompletedGames"
										:key="index"
									>
										<td>{{ game.title }}</td>
										<td>{{ game.type }}</td>
										<td>{{ game.playtime }}</td>
										<td>{{ formatDate(game.updatedAt) }}</td>
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
								<div class="d-flex align-center flex-wrap stats-container">
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
										<th>Title</th>
										<th>Type</th>
										<th>Playtime (Hours)</th>
										<th>Completion Date</th>
									</tr>
								</thead>
								<tbody class="text-left">
									<tr
										v-for="(game, index) in lastYearCompletedGames"
										:key="index"
									>
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
	Legend
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
		moviesCount.value
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
	() => filter(anime.value, { status: 'Watching' }).length
);
const readingCount = computed(
	() =>
		filter(manga.value, { status: 'Reading' }).length +
		filter(books.value, { status: 'Reading' }).length
);
const playingCount = computed(
	() => filter(games.value, { status: 'Playing' }).length
);
const completedCount = computed(
	() =>
		filter(anime.value, { status: 'Completed' }).length +
		filter(manga.value, { status: 'Completed' }).length +
		filter(games.value, { status: 'Completed' }).length +
		filter(books.value, { status: 'Completed' }).length +
		filter(movies.value, { status: 'Completed' }).length
);
const onHoldCount = computed(
	() =>
		filter(anime.value, { status: 'On-Hold' }).length +
		filter(manga.value, { status: 'On-Hold' }).length +
		filter(games.value, { status: 'On-Hold' }).length +
		filter(books.value, { status: 'On-Hold' }).length +
		filter(movies.value, { status: 'On-Hold' }).length
);
const droppedCount = computed(
	() =>
		filter(anime.value, { status: 'Dropped' }).length +
		filter(manga.value, { status: 'Dropped' }).length +
		filter(games.value, { status: 'Dropped' }).length +
		filter(books.value, { status: 'Dropped' }).length +
		filter(movies.value, { status: 'Dropped' }).length
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
			.length
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
const mediaDistribution = computed(() => [
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
]);

// Consumption stats
// Add back the totalPlaytime property
const totalPlaytime = computed(() =>
	games.value.reduce((acc, item) => acc + (item.playtime || 0), 0)
);

// Calculate total time spent across all media
const animeHours = computed(() => {
	const episodeLength = 0.4; // 24 minutes average
	return totalEpisodesWatched.value * episodeLength;
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
		0
	);
	return totalBookPages / 60; // 1 page per minute = 60 pages per hour
});

// Add a new metric that combines all media consumption time
const totalConsumptionHours = computed(() => {
	return Math.round(
		animeHours.value + mangaHours.value + bookHours.value + totalPlaytime.value
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
			} as ActivityItem)
	);

	const mangaItems = manga.value.map(
		item =>
			({
				...item,
				mediaType: EMediaType.MANGA,
				action: getStatusAction(item.status),
			} as ActivityItem)
	);

	const gameItems = games.value.map(
		item =>
			({
				...item,
				mediaType: EMediaType.GAME,
				action: getStatusAction(item.status),
			} as ActivityItem)
	);

	const bookItems = books.value.map(
		item =>
			({
				...item,
				mediaType: EMediaType.BOOK,
				action: getStatusAction(item.status),
			} as ActivityItem)
	);

	const movieItems = movies.value.map(
		item =>
			({
				...item,
				mediaType: EMediaType.MOVIE,
				action: getStatusAction(item.status),
			} as ActivityItem)
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
	orderBy(allMedia.value, ['updatedAt'], ['desc']).slice(0, 20)
);

// Helper functions
function getStatusAction(status: string): string {
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
}

function getStatusColor(status: string): string {
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
}

function getMediaTypeIcon(mediaType: EMediaType): string {
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
}

function getMediaTypeColor(mediaType: EMediaType): string {
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
}

function formatDate(dateString: string | Date | undefined): string {
	if (!dateString) return 'Unknown';
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

// Game Status Counts (specifically for game status chart)
const gameStatusCounts = computed(() => ({
	playing: filter(games.value, { status: 'Playing' }).length,
	completed: filter(games.value, { status: 'Completed' }).length,
	onHold: filter(games.value, { status: 'On-Hold' }).length,
	dropped: filter(games.value, { status: 'Dropped' }).length,
	planToPlay: filter(games.value, status => status.status.includes('Plan to'))
		.length,
}));

// Helper function to calculate percentage
function calculatePercentage(value: number, total: number): string {
	if (total === 0) return '0.00';
	return ((value / total) * 100).toFixed(2);
}

// Game calculations
// All games
const totalGames = computed(() => gamesCount.value);
const gameFavouritesCount = computed(
	() => games.value.filter(game => game.favourites).length
);

// Standard games (excluding VNs)
const standardGames = computed(() =>
	games.value.filter(game => game.type === 'Game')
);
const totalStandardGames = computed(() => standardGames.value.length);
const standardGameFavouritesCount = computed(
	() => standardGames.value.filter(game => game.favourites).length
);
const standardGamePlaytime = computed(() =>
	standardGames.value.reduce((acc, game) => acc + (game.playtime || 0), 0)
);

// Visual Novels
const visualNovels = computed(() =>
	games.value.filter(game => game.type === 'Visual Novel')
);
const totalVNs = computed(() => visualNovels.value.length);
const vnFavouritesCount = computed(
	() => visualNovels.value.filter(game => game.favourites).length
);
const vnPlaytime = computed(() =>
	visualNovels.value.reduce((acc, game) => acc + (game.playtime || 0), 0)
);

// Status counts for each game type
const standardGameStatusCounts = computed(() => ({
	playing: filter(standardGames.value, { status: 'Playing' }).length,
	completed: filter(standardGames.value, { status: 'Completed' }).length,
	onHold: filter(standardGames.value, { status: 'On-Hold' }).length,
	dropped: filter(standardGames.value, { status: 'Dropped' }).length,
	planToPlay: filter(standardGames.value, (game: TGame) =>
		game.status.includes('Plan to')
	).length,
}));

const vnStatusCounts = computed(() => ({
	playing: filter(visualNovels.value, { status: 'Playing' }).length,
	completed: filter(visualNovels.value, { status: 'Completed' }).length,
	onHold: filter(visualNovels.value, { status: 'On-Hold' }).length,
	dropped: filter(visualNovels.value, { status: 'Dropped' }).length,
	planToPlay: filter(visualNovels.value, (game: TGame) =>
		game.status.includes('Plan to')
	).length,
}));

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
		}
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
		}
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
		['desc']
	);
});

// Calculate total playtime for this year's completed games
const thisYearTotalPlaytime = computed(() => {
	return thisYearCompletedGames.value.reduce(
		(total, game) => total + (game.playtime || 0),
		0
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
		['desc']
	);
});

// Calculate total playtime for last year's completed games
const lastYearTotalPlaytime = computed(() => {
	return lastYearCompletedGames.value.reduce(
		(total, game) => total + (game.playtime || 0),
		0
	);
});

// Total books read (completed books + manga volumes)
const totalBooksRead = computed(() => {
	const completedBooks = filter(books.value, { status: 'Completed' }).length;

	// Count all manga types as volumes
	const completedMangaVolumes = manga.value.reduce((acc, item) => {
		// Count volumes for all manga types (Manga, Light Novel, Novel, Manhua, Webtoon, etc.)
		if (item.status === 'Completed') {
			return acc + (item.volumesMin || 0);
		}
		return acc;
	}, 0);

	return completedBooks + completedMangaVolumes;
});

// Enhanced page calculation (book pages + estimated manga/LN pages)
const enhancedTotalPages = computed(() => {
	// Actual book pages
	const bookPages = books.value.reduce(
		(acc, item) => acc + (item.pages || 0),
		0
	);

	// Estimated manga pages (200 pages per volume for all manga types)
	const mangaPages = manga.value.reduce((acc, item) => {
		const volumesRead = item.volumesMin || 0;
		// All manga types use the same page estimation
		return acc + volumesRead * 200; // Assuming 200 pages per volume
	}, 0);

	// Light novels from books collection
	const lightNovelPages = books.value.reduce((acc, item) => {
		if (item.genre === 'Light Novel') {
			return acc + 250; // Assuming 250 pages per light novel
		}
		return acc;
	}, 0);

	return bookPages + mangaPages + lightNovelPages;
});

// Total episodes calculation (anime + TV shows/movies)
const totalEpisodesWatched = computed(() => {
	const animeEpisodes = anime.value.reduce(
		(acc, item) => acc + (item.episodesMin || 0),
		0
	);
	const movieEpisodes = movies.value.reduce(
		(acc, item) => acc + (item.episodesMin || 0),
		0
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
	// Create all the game stats charts
	createGameStatusCharts();
	createDeveloperChart();
	createGamesByYearCharts();
});

function createGameStatusCharts() {
	// All Games Status Chart
	const allGamesStatusChart = document.getElementById(
		'all-games-status-chart'
	) as HTMLCanvasElement;
	if (allGamesStatusChart) {
		new Chart(allGamesStatusChart, {
			type: 'pie',
			data: {
				labels: ['Playing', 'Completed', 'On-Hold', 'Dropped', 'Plan to Play'],
				datasets: [
					{
						data: [
							gameStatusCounts.value.playing,
							gameStatusCounts.value.completed,
							gameStatusCounts.value.onHold,
							gameStatusCounts.value.dropped,
							gameStatusCounts.value.planToPlay,
						],
						backgroundColor: [
							'#4CAF50',
							'#2196F3',
							'#FFEB3B',
							'#F44336',
							'#FFFFFF',
						],
						borderWidth: 0,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
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
			},
		});
	}

	// Standard Games Status Chart
	const standardGamesStatusChart = document.getElementById(
		'standard-games-status-chart'
	) as HTMLCanvasElement;
	if (standardGamesStatusChart) {
		new Chart(standardGamesStatusChart, {
			type: 'pie',
			data: {
				labels: ['Playing', 'Completed', 'On-Hold', 'Dropped', 'Plan to Play'],
				datasets: [
					{
						data: [
							standardGameStatusCounts.value.playing,
							standardGameStatusCounts.value.completed,
							standardGameStatusCounts.value.onHold,
							standardGameStatusCounts.value.dropped,
							standardGameStatusCounts.value.planToPlay,
						],
						backgroundColor: [
							'#4CAF50',
							'#2196F3',
							'#FFEB3B',
							'#F44336',
							'#FFFFFF',
						],
						borderWidth: 0,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
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
			},
		});
	}

	// Visual Novels Status Chart
	const vnStatusChart = document.getElementById(
		'vn-status-chart'
	) as HTMLCanvasElement;
	if (vnStatusChart) {
		new Chart(vnStatusChart, {
			type: 'pie',
			data: {
				labels: ['Playing', 'Completed', 'On-Hold', 'Dropped', 'Plan to Play'],
				datasets: [
					{
						data: [
							vnStatusCounts.value.playing,
							vnStatusCounts.value.completed,
							vnStatusCounts.value.onHold,
							vnStatusCounts.value.dropped,
							vnStatusCounts.value.planToPlay,
						],
						backgroundColor: [
							'#4CAF50',
							'#2196F3',
							'#FFEB3B',
							'#F44336',
							'#FFFFFF',
						],
						borderWidth: 0,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
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
			},
		});
	}
}

function createDeveloperChart() {
	// Developer counts and filter for those with > 5 games
	const developers: { [key: string]: number } = {};

	games.value.forEach((game: TGame) => {
		if (game.developer) {
			developers[game.developer] = (developers[game.developer] || 0) + 1;
		}
	});

	const topDevelopers = Object.entries(developers)
		.filter(([, count]) => count >= 5)
		.sort((a, b) => b[1] - a[1]);

	// Developer Chart
	const developersChart = document.getElementById(
		'game-developers-chart'
	) as HTMLCanvasElement;
	if (developersChart) {
		new Chart(developersChart, {
			type: 'bar',
			data: {
				labels: topDevelopers.map(([name]) => name),
				datasets: [
					{
						label: 'Number of Games',
						data: topDevelopers.map(([, count]) => count),
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
						bottom: 50,
					},
				},
			},
		});
	}
}

function createGamesByYearCharts() {
	// All Games by Year Chart
	const allGamesYearChart = document.getElementById(
		'all-games-by-year-chart'
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
				maintainAspectRatio: true,
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
			},
		});
	}

	// Standard Games by Year Chart
	const standardGamesYearChart = document.getElementById(
		'standard-games-by-year-chart'
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
				maintainAspectRatio: true,
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
			},
		});
	}

	// VN Games by Year Chart
	const vnGamesYearChart = document.getElementById(
		'vn-games-by-year-chart'
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
				maintainAspectRatio: true,
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
			},
		});
	}
}

// Add todo items computed property
const todoItems = computed<TodoItem[]>(() => {
	const animeItems = anime.value
		.filter(
			item =>
				item.charactersDone !== undefined &&
				(item.charactersDone === ETodoStatus.TODO ||
					item.charactersDone === ETodoStatus.INCOMPLETE)
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
					item.charactersDone === ETodoStatus.INCOMPLETE)
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
					item.charactersDone === ETodoStatus.INCOMPLETE)
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
					item.musicDownloaded === ETodoStatus.INCOMPLETE)
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
		['desc']
	).slice(0, 20);
});

// Helper function to get todo status color
function getTodoStatusColor(status: ETodoStatus | undefined): string {
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
}

// Helper function to get todo type label
function getTodoTypeLabel(item: TodoItem): string {
	switch (item.todoType) {
		case 'charactersDone':
			return 'Characters';
		case 'musicDownloaded':
			return 'Music';
		default:
			return item.todoType;
	}
}

// Games completed in the current year - by type
const thisYearStandardGames = computed(() => {
	return thisYearCompletedGames.value.filter(
		game => game.type !== 'Visual Novel'
	);
});

const thisYearVisualNovels = computed(() => {
	return thisYearCompletedGames.value.filter(
		game => game.type === 'Visual Novel'
	);
});

// Games completed in the previous year - by type
const lastYearStandardGames = computed(() => {
	return lastYearCompletedGames.value.filter(
		game => game.type !== 'Visual Novel'
	);
});

const lastYearVisualNovels = computed(() => {
	return lastYearCompletedGames.value.filter(
		game => game.type === 'Visual Novel'
	);
});
</script>

<style scoped>
.stat-card {
	min-width: 150px;
	border-radius: 8px;
	padding: 8px;
}

.bg-indigo {
	background-color: rgba(63, 81, 181, 0.3);
}

.bg-green {
	background-color: rgba(76, 175, 80, 0.3);
}

.bg-amber {
	background-color: rgba(255, 193, 7, 0.3);
}

.bg-purple {
	background-color: rgba(156, 39, 176, 0.3);
}

.bg-yellow {
	background-color: rgba(255, 235, 59, 0.3);
}

.bg-red {
	background-color: rgba(244, 67, 54, 0.3);
}

.stat-detail {
	min-width: 150px;
	flex: 1 0 150px;
	text-align: center;
	max-width: 200px;
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 8px;
	transition: all 0.3s ease;
	overflow: hidden;
	word-break: break-word;
}

.stat-detail:hover {
	background-color: rgba(255, 255, 255, 0.1);
	transform: translateY(-2px);
}

.chart-container {
	padding: 16px;
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	height: 100%;
}

.stat-section {
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 8px;
	padding: 16px;
	height: 100%;
	margin-bottom: 16px;
}

.stat-table {
	width: 100%;
}

.stat-row {
	display: grid;
	grid-template-columns: 50% 25% 25%;
	padding: 6px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-row.highlight {
	background-color: rgba(255, 255, 255, 0.05);
	font-weight: bold;
}

:root {
	--indigo-color-transparent: rgba(63, 81, 181, 0.2);
	--green-color-transparent: rgba(76, 175, 80, 0.2);
	--amber-color-transparent: rgba(255, 193, 7, 0.2);
	--purple-color-transparent: rgba(156, 39, 176, 0.2);
	--yellow-color-transparent: rgba(255, 235, 59, 0.2);
	--red-color-transparent: rgba(244, 67, 54, 0.2);
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

	.stat-detail {
		width: 100%;
		min-width: 100%;
		max-width: 100%;
		margin: 8px 0;
		padding: 12px 8px !important;
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
