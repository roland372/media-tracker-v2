<template>
	<HeaderComponent :title="game?.title || 'Game Details'"> </HeaderComponent>

	<v-container v-if="game" class="pa-0" fluid>
		<v-row>
			<!-- Main Game Section -->
			<v-col cols="12">
				<CardComponent title="Game Information">
					<v-row class="pt-2">
						<!-- Game Cover -->
						<v-col cols="12" sm="4" md="3">
							<v-img
								:src="game.imageURL || placeholderImg"
								:aspect-ratio="3 / 4"
								cover
								class="game-image rounded"
							>
								<template v-slot:placeholder>
									<v-row
										class="fill-height ma-0"
										align="center"
										justify="space-between"
									>
										<v-progress-circular
											indeterminate
											color="primary"
										></v-progress-circular>
									</v-row>
								</template>
							</v-img>
							<div class="d-flex flex-column align-center mt-4">
								<v-btn
									v-if="game.link?.includes('vndb.org')"
									color="primary"
									:href="game.link"
									target="_blank"
									prepend-icon="mdi-open-in-new"
									variant="tonal"
									class="mb-2"
									block
								>
									View on VNDB
								</v-btn>
								<v-btn
									v-if="game.youtubeLink"
									color="error"
									:href="game.youtubeLink"
									target="_blank"
									prepend-icon="mdi-youtube"
									variant="tonal"
									block
								>
									Watch on YouTube
								</v-btn>
							</div>
						</v-col>

						<!-- Game Details -->
						<v-col cols="12" sm="8" md="9" class="mt-n2">
							<v-row>
								<v-col cols="12" sm="6" class="mb-n10 mb-sm-n0">
									<v-list class="transparent">
										<v-list-item>
											<template v-slot:prepend>
												<v-icon :color="statusColor(game)">mdi-circle</v-icon>
											</template>
											<v-list-item-title class="text-color"
												>Status</v-list-item-title
											>
											<v-list-item-subtitle class="text-color">{{
												game.status
											}}</v-list-item-subtitle>
										</v-list-item>

										<v-list-item>
											<template v-slot:prepend>
												<v-icon color="indigo">mdi-tag-multiple</v-icon>
											</template>
											<v-list-item-title class="text-color"
												>Type</v-list-item-title
											>
											<v-list-item-subtitle class="text-color">{{
												formatTypes(game.type || 'Not specified')
											}}</v-list-item-subtitle>
										</v-list-item>

										<v-list-item>
											<template v-slot:prepend>
												<v-icon color="blue">mdi-clock-outline</v-icon>
											</template>
											<v-list-item-title class="text-color"
												>Playtime</v-list-item-title
											>
											<v-list-item-subtitle class="text-color"
												>{{ game.playtime || 0 }} hours</v-list-item-subtitle
											>
										</v-list-item>

										<v-list-item>
											<template v-slot:prepend>
												<v-icon color="amber">mdi-star</v-icon>
											</template>
											<v-list-item-title class="text-color"
												>Favorites</v-list-item-title
											>
											<v-list-item-subtitle class="text-color">{{
												game.favourites ? 'Yes' : 'No'
											}}</v-list-item-subtitle>
										</v-list-item>
									</v-list>
								</v-col>

								<v-col cols="12" sm="6">
									<v-list class="transparent">
										<v-list-item>
											<template v-slot:prepend>
												<v-icon color="green">mdi-account-group</v-icon>
											</template>
											<v-list-item-title class="text-color"
												>Developer</v-list-item-title
											>
											<v-list-item-subtitle>
												<a
													v-if="game.developerLink"
													:href="game.developerLink"
													target="_blank"
													class="text-decoration-none link-color"
												>
													{{ game.developer || 'Unknown' }}
												</a>
												<span v-else class="text-color">{{
													game.developer || 'Unknown'
												}}</span>
											</v-list-item-subtitle>
										</v-list-item>

										<v-list-item>
											<template v-slot:prepend>
												<v-icon color="purple">mdi-account-multiple</v-icon>
											</template>
											<v-list-item-title class="text-color"
												>Characters Done</v-list-item-title
											>
											<v-list-item-subtitle class="text-color">{{
												game.charactersDone || 'Not started'
											}}</v-list-item-subtitle>
										</v-list-item>

										<v-list-item>
											<template v-slot:prepend>
												<v-icon color="pink">mdi-music</v-icon>
											</template>
											<v-list-item-title class="text-color"
												>Music Downloaded</v-list-item-title
											>
											<v-list-item-subtitle class="text-color">{{
												game.musicDownloaded || 'Not downloaded'
											}}</v-list-item-subtitle>
										</v-list-item>

										<v-list-item>
											<template v-slot:prepend>
												<v-icon color="cyan">mdi-calendar-plus</v-icon>
											</template>
											<v-list-item-title class="text-color"
												>Created</v-list-item-title
											>
											<v-list-item-subtitle class="text-color">{{
												formatDate(game.createdAt)
											}}</v-list-item-subtitle>
										</v-list-item>

										<v-list-item>
											<template v-slot:prepend>
												<v-icon color="teal">mdi-calendar-edit</v-icon>
											</template>
											<v-list-item-title class="text-color"
												>Last Updated</v-list-item-title
											>
											<v-list-item-subtitle class="text-color">{{
												formatDate(game.updatedAt)
											}}</v-list-item-subtitle>
										</v-list-item>
									</v-list>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</CardComponent>

				<!-- VNDB Information -->
				<CardComponent
					v-if="vndbInfo?.results[0]"
					title="VNDB Information"
					class="mb-4"
				>
					<v-row>
						<v-col cols="12" sm="6" class="mb-n10 mb-sm-n0">
							<v-list class="transparent">
								<v-list-item v-if="vndbInfo.results[0].released">
									<template v-slot:prepend>
										<v-icon color="cyan">mdi-calendar</v-icon>
									</template>
									<v-list-item-title class="text-color"
										>Release Date</v-list-item-title
									>
									<v-list-item-subtitle class="text-color">{{
										vndbInfo.results[0].released
									}}</v-list-item-subtitle>
								</v-list-item>
							</v-list>
						</v-col>

						<v-col cols="12" sm="6">
							<v-list class="transparent">
								<v-list-item v-if="vndbInfo.results[0].length_minutes">
									<template v-slot:prepend>
										<v-icon color="orange">mdi-clock-outline</v-icon>
									</template>
									<v-list-item-title class="text-color"
										>Average Playtime</v-list-item-title
									>
									<v-list-item-subtitle class="text-color">{{
										formatPlaytimeWithVotes(
											vndbInfo.results[0].length_minutes,
											vndbInfo.results[0].length_votes
										)
									}}</v-list-item-subtitle>
								</v-list-item>
							</v-list>
						</v-col>

						<v-col cols="12" v-if="vndbInfo.results[0].description">
							<div class="text-h6 mb-2 text-color">Description</div>
							<div
								class="text-body-1 text-color description-text"
								v-html="formatDescription(vndbInfo.results[0].description)"
							></div>
						</v-col>
					</v-row>
				</CardComponent>
			</v-col>
		</v-row>
	</v-container>

	<div v-else class="d-flex justify-center align-center" style="height: 100vh">
		<v-progress-circular indeterminate color="primary"></v-progress-circular>
	</div>
</template>

<script setup lang="ts">
import { useGamesStore } from '@/stores/useGamesStore';
import { EGameStatus, TGame } from '@/types';
import { placeholderImg } from '@/utils/mediaUtils';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { fetchVNDBInfo } from '@/services/vndbService';
import type { VNDBResponse } from '@/services/vndbService';
import CardComponent from '@/components/media/CardComponent.vue';
import HeaderComponent from '@/components/media/HeaderComponent.vue';

const route = useRoute();
const router = useRouter();
const gamesStore = useGamesStore();
const { games } = storeToRefs(gamesStore);

const game = ref<TGame | null>(null);
const vndbInfo = ref<VNDBResponse | null>(null);

onMounted(async () => {
	const title = decodeURIComponent(route.params.title as string);
	game.value =
		games.value.find(g => g.title.toLowerCase() === title.toLowerCase()) ||
		null;

	if (!game.value) {
		router.push('/games');
		return;
	}

	if (game.value.link?.includes('vndb.org')) {
		vndbInfo.value = await fetchVNDBInfo(game.value.title);
	}
});

const formatDate = (date: string | Date | undefined) => {
	if (!date) return 'Not available';
	const d = new Date(date);
	return (
		d.getFullYear() +
		'-' +
		String(d.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(d.getDate()).padStart(2, '0')
	);
};

const formatDescription = (description: string) => {
	return description.replace(/\n/g, '<br>');
};

const statusColor = (game: TGame) => {
	switch (game.status) {
		case EGameStatus.PLAYING:
			return 'success';
		case EGameStatus.COMPLETED:
			return 'primary';
		case EGameStatus.ON_HOLD:
			return 'warning';
		case EGameStatus.DROPPED:
			return 'error';
		case EGameStatus.PLAN_TO_PLAY:
			return 'grey';
		default:
			return 'grey';
	}
};

const formatTypes = (types?: string) => {
	if (!types) return '';
	if (!types.includes(',')) return types;

	const typeArray = types.split(',').map(t => t.trim());
	const hasExpansion = typeArray.includes('Expansion');

	if (hasExpansion) {
		const filteredTypes = typeArray.filter(t => t !== 'Expansion');
		if (filteredTypes.length > 0) {
			return `${filteredTypes[0]}, Expansion${
				filteredTypes.length > 1 ? ', ' + filteredTypes.slice(1).join(', ') : ''
			}`;
		}
		return 'Expansion';
	}

	return types;
};

const formatPlaytimeWithVotes = (minutes: number, votes: number) => {
	if (!minutes || !votes) return 'Unknown';

	// Convert minutes to hours and minutes
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	let playtimeText = '';
	if (hours === 0) {
		playtimeText = `${remainingMinutes}m`;
	} else if (remainingMinutes === 0) {
		playtimeText = `${hours}h`;
	} else {
		playtimeText = `${hours}h${remainingMinutes}m`;
	}

	// Add vote count
	return `${playtimeText} from ${votes} votes`;
};
</script>
<style scoped>
.game-image {
	width: 100%;
	max-width: 300px;
	margin: 0;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

:deep(.v-list) {
	background-color: transparent !important;
}

:deep(.v-list-item-title) {
	font-size: 0.875rem !important;
	font-weight: 500;
}

:deep(.v-list-item-subtitle) {
	font-size: 0.875rem !important;
}

.description-text {
	background-color: rgba(255, 255, 255, 0.05);
	border-radius: 8px;
	padding: 16px;
	line-height: 1.6;
}

/* Card styling */
:deep(.v-card) {
	background-color: var(--bg-primary-medium) !important;
	border: 1px solid rgba(255, 255, 255, 0.15);
}

:deep(.v-card-text) {
	background-color: transparent !important;
}

/* List styling */
:deep(.v-list-item) {
	background-color: rgba(255, 255, 255, 0.05) !important;
	border-radius: 5px !important;
	margin-bottom: 8px;
	padding: 10px;
}

:deep(.v-list-item:hover) {
	background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Timeline styling */
:deep(.v-timeline-item__body) {
	background-color: rgba(255, 255, 255, 0.05) !important;
	border-radius: 8px;
	padding: 12px;
	margin-bottom: 8px;
}

:deep(.v-timeline-item__dot) {
	background-color: var(--primary) !important;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
	.game-image {
		max-width: 100%;
		aspect-ratio: 3/4;
	}

	:deep(.v-list-item) {
		padding: 12px;
	}

	:deep(.v-timeline-item__body) {
		padding: 16px;
	}
}

/* Link styling */
.link-color {
	color: var(--primary) !important;
	text-decoration: none;
}

.link-color:hover {
	text-decoration: underline;
}

/* Chip styling */
:deep(.v-chip) {
	border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Button styling */
:deep(.v-btn) {
	border: 1px solid rgba(255, 255, 255, 0.15);
}

:deep(.v-btn:hover) {
	background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
