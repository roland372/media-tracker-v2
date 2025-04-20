<template>
	<v-dialog width="auto">
		<template v-slot:default>
			<!-- <v-card max-width="450" class="pb-2">
				<div class="bg-primary-light text-color px-5 py-3 text-h6"></div> -->
			<v-card :class="cardClass" class="pb-2">
				<div
					class="media-modal-title bg-primary-light text-color px-5 py-3 text-h6"
				>
					{{ title }}
				</div>
				<div class="d-sm-flex align-start">
					<v-img
						class="rounded ms-2 me-2 me-sm-0 mt-2"
						cover
						min-height="200px"
						min-width="150px"
						:src="media.imageURL || placeholderImg"
					/>
					<v-card-text>
						<!--? ANIME -->
						<section v-if="mediaType === EMediaType.ANIME">
							<div><b>Type:</b> {{ (media as TAnime).type }}</div>
							<div>
								<b>Link: </b>
								<a :href="media.link" target="_blank">{{ media.linkName }}</a>
							</div>
							<div v-if="(media as TAnime).studio">
								<b>Studio: </b>
								<a
									v-if="(media as TAnime).studioLink"
									:href="(media as TAnime).studioLink"
									target="_blank"
								>
									{{ (media as TAnime).studio }}
								</a>
								<span v-else>{{ (media as TAnime).studio }}</span>
							</div>
							<div>
								<b>Episodes:</b> {{ (media as TAnime).episodesMin }} /
								{{ (media as TAnime).episodesMax }}
							</div>
							<div><b>Status:</b> {{ (media as TAnime).status }}</div>
						</section>

						<!--? BOOKS -->
						<section v-if="mediaType === EMediaType.BOOK">
							<div><b>Author:</b> {{ (media as TBook).author }}</div>
							<div>
								<b>Link: </b>
								<a :href="media.link" target="_blank">{{ media.linkName }}</a>
							</div>
							<div><b>Genre:</b> {{ (media as TBook).genre }}</div>
							<div><b>Pages:</b> {{ (media as TBook).pages }}</div>
							<div><b>Status:</b> {{ (media as TBook).status }}</div>
						</section>

						<!--? CHARACTERS -->
						<section v-if="mediaType === EMediaType.CHARACTER">
							<div>
								<b>Link: </b>
								<a :href="media.link" target="_blank">{{ media.linkName }}</a>
							</div>
							<div><b>Source:</b> {{ (media as TCharacter).source }}</div>
							<div><b>Gender:</b> {{ (media as TCharacter).gender }}</div>
							<div><b>Series:</b> {{ (media as TCharacter).series }}</div>
							<div>
								<b>Hair Color:</b> {{ (media as TCharacter).hairColor }}
							</div>
						</section>

						<!--? GAMES -->
						<section v-if="mediaType === EMediaType.GAME">
							<div><b>Type:</b> {{ formatTypes((media as TGame).type) }}</div>
							<div v-if="media.link">
								<b>Link: </b>
								<a :href="media.link" target="_blank">{{ media.linkName }}</a>
								<span>
									<span class="mx-1">|</span>
									<a
										:href="`/games/${encodeURIComponent((media as TGame).title)}`"
										target="_blank"
										>View Details</a
									>
								</span>
							</div>
							<div v-if="(media as TGame).developer">
								<b>Developer: </b>
								<a
									v-if="(media as TGame).developerLink"
									:href="(media as TGame).developerLink"
									target="_blank"
								>
									{{ (media as TGame).developer }}
								</a>
								<span v-else>{{ (media as TGame).developer }}</span>
							</div>
							<div v-if="(media as TGame).youtubeLink">
								<b>YouTube: </b>
								<a :href="(media as TGame).youtubeLink" target="_blank"
									>Watch</a
								>
							</div>
							<div><b>Playtime:</b> {{ (media as TGame).playtime }} hours</div>
							<div><b>Status:</b> {{ (media as TGame).status }}</div>
							<div v-if="(media as TGame).notes">
								<b>Notes:</b>
								<div
									v-for="(note, index) in formatNotes((media as TGame).notes)"
									:key="index"
									class="pl-3"
								>
									{{ note }}
								</div>
							</div>
						</section>

						<!--? MANGA -->
						<section v-if="mediaType === EMediaType.MANGA">
							<div><b>Type:</b> {{ (media as TManga).type }}</div>
							<div>
								<b>Link: </b>
								<a :href="media.link" target="_blank">{{ media.linkName }}</a>
							</div>
							<div v-if="(media as TManga).author">
								<b>Author: </b>
								<a
									v-if="(media as TManga).authorLink"
									:href="(media as TManga).authorLink"
									target="_blank"
								>
									{{ (media as TManga).author }}
								</a>
								<span v-else>{{ (media as TManga).author }}</span>
							</div>
							<div>
								<b>Chapters:</b> {{ (media as TManga).chaptersMin }} /
								{{ (media as TManga).chaptersMax }}
							</div>
							<div>
								<b>Volumes:</b> {{ (media as TManga).volumesMin }} /
								{{ (media as TManga).volumesMax }}
							</div>
							<div><b>Status:</b> {{ (media as TManga).status }}</div>
						</section>

						<!--? MOVIES -->
						<section v-if="mediaType === EMediaType.MOVIE">
							<div><b>Type:</b> {{ (media as TMovie).type }}</div>
							<div>
								<b>Link: </b>
								<a :href="media.link" target="_blank">{{ media.linkName }}</a>
							</div>
							<div v-if="(media as TMovie).type === 'TV-Show'">
								<div>
									<b>Episodes:</b> {{ (media as TMovie).episodesMin }} /
									{{ (media as TMovie).episodesMax }}
								</div>
								<div>
									<b>Seasons:</b> {{ (media as TMovie).seasonsMin }} /
									{{ (media as TMovie).seasonsMax }}
								</div>
							</div>
							<div><b>Status:</b> {{ (media as TMovie).status }}</div>
						</section>

						<section>
							<div><b>Created At:</b> {{ media.createdAt }}</div>
							<div><b>Updated At:</b> {{ media.updatedAt }}</div>
						</section>
					</v-card-text>
				</div>
			</v-card>
		</template>
	</v-dialog>
</template>
<script setup lang="ts">
import {
	EMediaType,
	TAnime,
	TBook,
	TCharacter,
	TGame,
	TManga,
	TMedia,
	TMovie,
} from '@/types';
import { placeholderImg } from '@/utils/mediaUtils';
import { computed, defineProps } from 'vue';

interface IMediaModalProps {
	media: TMedia;
	mediaType: EMediaType;
	title: string;
}

const cardClass = computed(() => {
	return window.innerWidth <= 600 ? 'mobile-card' : 'desktop-card';
});

// Function to format the types field to properly display comma-separated types
// with Expansion always as the second item if present
const formatTypes = (types?: string) => {
	if (!types) return '';

	// If there's no comma, just return the type as is
	if (!types.includes(',')) return types;

	// Split the types by comma and trim each one
	const typeArray = types.split(',').map(t => t.trim());

	// Check if Expansion is in the list
	const hasExpansion = typeArray.includes('Expansion');

	// If Expansion exists and it's not already the second item (or first if there's only one other type)
	if (hasExpansion) {
		// Remove Expansion from its current position
		const filteredTypes = typeArray.filter(t => t !== 'Expansion');

		// If there's at least one other type, put Expansion as the second item
		if (filteredTypes.length > 0) {
			// Insert Expansion as the second item
			return `${filteredTypes[0]}, Expansion${filteredTypes.length > 1 ? ', ' + filteredTypes.slice(1).join(', ') : ''}`;
		} else {
			// If Expansion is the only type
			return 'Expansion';
		}
	}

	// If no Expansion or already in the right position, return as is
	return types;
};

// Function to format notes with semicolons as separate lines
const formatNotes = (notes?: string) => {
	if (!notes) return [];
	return notes.split(';').map(note => note.trim());
};

defineProps<IMediaModalProps>();
</script>
<style scoped>
/* Default for larger screens */
.desktop-card {
	max-width: 450px; /* Max width for desktop */
}

/* Mobile-specific class */
.mobile-card {
	max-width: 200px; /* Max width for mobile */
	width: 100%; /* Ensure it's not too narrow on mobile */
	min-width: 200px; /* Ensure it stays at least 200px */
}

.media-modal-title {
	word-wrap: break-word;
	white-space: normal;
}
</style>
