<template>
	<CardComponent :title="title">
		<slot></slot>

		<!--? ANIME -->
		<h3
			v-if="!media.length && mediaType === EMediaType.ANIME"
			class="text-color"
		>
			Not found any items.
		</h3>
		<v-table
			v-else-if="media.length && mediaType === EMediaType.ANIME"
			class="bg-blue"
			density="compact"
			fixed-header
			height="500px"
		>
			<thead class="text-left">
				<tr>
					<th>#</th>
					<th>Image</th>
					<th width="15%">Title</th>
					<th>Rating</th>
					<th>Type</th>
					<th>Progress</th>
					<th>Created At</th>
					<th>Updated At</th>
				</tr>
			</thead>
			<tbody class="text-left">
				<tr v-for="(anime, index) in (media as TAnime[])" :key="index">
					<td>{{ index + 1 }}</td>
					<td>
						<v-img :src="anime.imageURL || placeholderImg" max-height="92px" />
					</td>
					<td>{{ anime.title }}</td>
					<td>{{ anime.rating }}</td>
					<td>{{ anime.type }}</td>
					<td>{{ anime.episodesMin }} / {{ anime.episodesMax }}</td>
					<td>{{ formatDate(anime.createdAt) }}</td>
					<td>{{ formatDate(anime.updatedAt) }}</td>
				</tr>
			</tbody>
		</v-table>

		<!--? BOOKS -->
		<h3
			v-if="!media.length && mediaType === EMediaType.BOOK"
			class="text-color"
		>
			Not found any items.
		</h3>
		<v-table
			v-else-if="media.length && mediaType === EMediaType.BOOK"
			density="compact"
			fixed-header
			height="500px"
		>
			<thead class="text-left">
				<tr>
					<th>#</th>
					<th>Image</th>
					<th width="15%">Title</th>
					<th>Author</th>
					<th>Genre</th>
					<th>Pages</th>
					<th>Rating</th>
					<th>Created At</th>
					<th>Updated At</th>
				</tr>
			</thead>
			<tbody class="text-left">
				<tr v-for="(book, index) in (media as TBook[])" :key="index">
					<td>{{ index + 1 }}</td>
					<td>
						<v-img :src="book.imageURL || placeholderImg" max-height="92px" />
					</td>
					<td>{{ book.title }}</td>
					<td>{{ book.author }}</td>
					<td>{{ book.genre }}</td>
					<td>{{ book.pages }}</td>
					<td>{{ book.rating }}</td>
					<td>{{ formatDate(book.createdAt) }}</td>
					<td>{{ formatDate(book.updatedAt) }}</td>
				</tr>
			</tbody>
		</v-table>

		<!--? CHARACTERS -->
		<h3
			v-if="!media.length && mediaType === EMediaType.CHARACTER"
			class="text-color"
		>
			Not found any items.
		</h3>
		<v-table
			v-else-if="media.length && mediaType === EMediaType.CHARACTER"
			density="compact"
			fixed-header
			height="500px"
		>
			<thead class="text-left">
				<tr>
					<th>#</th>
					<th>Image</th>
					<th width="15%">Name</th>
					<th>Source</th>
					<th>Gender</th>
					<th>Series</th>
					<th>Hair Color</th>
					<th>Created At</th>
					<th>Updated At</th>
				</tr>
			</thead>
			<tbody class="text-left">
				<tr v-for="(character, index) in (media as TCharacter[])" :key="index">
					<td>{{ index + 1 }}</td>
					<td>
						<v-img
							:src="character.imageURL || placeholderImg"
							max-height="92px"
						/>
					</td>
					<td>{{ character.name }}</td>
					<td>{{ character.source }}</td>
					<td>{{ character.gender }}</td>
					<td>{{ character.series }}</td>
					<td>{{ character.hairColor }}</td>
					<td>{{ formatDate(character.createdAt) }}</td>
					<td>{{ formatDate(character.updatedAt) }}</td>
				</tr>
			</tbody>
		</v-table>

		<!--? GAMES -->
		<h3
			v-if="!media.length && mediaType === EMediaType.GAME"
			class="text-color"
		>
			Not found any items.
		</h3>
		<v-table
			v-else-if="media.length && mediaType === EMediaType.GAME"
			density="compact"
			fixed-header
			height="500px"
		>
			<thead class="text-left">
				<tr>
					<th>#</th>
					<th>Image</th>
					<th width="15%">Title</th>
					<th>Type</th>
					<th>Playtime</th>
					<th>Created At</th>
					<th>Updated At</th>
				</tr>
			</thead>
			<tbody class="text-left">
				<tr v-for="(game, index) in (media as TGame[])" :key="index">
					<td>{{ index + 1 }}</td>
					<td>
						<v-img :src="game.imageURL || placeholderImg" max-height="92px" />
					</td>
					<td>{{ game.title }}</td>
					<td>{{ game.type }}</td>
					<td>{{ game.playtime }}</td>
					<td>{{ formatDate(game.createdAt) }}</td>
					<td>{{ formatDate(game.updatedAt) }}</td>
				</tr>
			</tbody>
		</v-table>

		<!--? MANGA -->
		<h3
			v-if="!media.length && mediaType === EMediaType.MANGA"
			class="text-color"
		>
			Not found any items.
		</h3>
		<v-table
			v-else-if="media.length && mediaType === EMediaType.MANGA"
			density="compact"
			fixed-header
			height="500px"
		>
			<thead class="text-left">
				<tr>
					<th>#</th>
					<th>Image</th>
					<th width="15%">Title</th>
					<th>Rating</th>
					<th>Type</th>
					<th>Chapters</th>
					<th>Volumes</th>
					<th>Created At</th>
					<th>Updated At</th>
				</tr>
			</thead>
			<tbody class="text-left">
				<tr v-for="(manga, index) in (media as TManga[])" :key="index">
					<td>{{ index + 1 }}</td>
					<td>
						<v-img :src="manga.imageURL || placeholderImg" max-height="92px" />
					</td>
					<td>{{ manga.title }}</td>
					<td>{{ manga.rating }}</td>
					<td>{{ manga.type }}</td>
					<td>{{ manga.chaptersMin }} / {{ manga.chaptersMax }}</td>
					<td>{{ manga.volumesMin }} / {{ manga.volumesMax }}</td>
					<td>{{ formatDate(manga.createdAt) }}</td>
					<td>{{ formatDate(manga.updatedAt) }}</td>
				</tr>
			</tbody>
		</v-table>

		<!--? MOVIES -->
		<h3
			v-if="!media.length && mediaType === EMediaType.MOVIE"
			class="text-color"
		>
			Not found any items.
		</h3>
		<v-table
			v-else-if="media.length && mediaType === EMediaType.MOVIE"
			density="compact"
			fixed-header
			height="500px"
		>
			<thead class="text-left">
				<tr>
					<th>#</th>
					<th>Image</th>
					<th width="15%">Title</th>
					<th>Rating</th>
					<th>Type</th>
					<th>Episodes</th>
					<th>Seasons</th>
					<th>Created At</th>
					<th>Updated At</th>
				</tr>
			</thead>
			<tbody class="text-left">
				<tr v-for="(movie, index) in (media as TMovie[])" :key="index">
					<td>{{ index + 1 }}</td>
					<td>
						<v-img :src="movie.imageURL || placeholderImg" max-height="92px" />
					</td>
					<td>{{ movie.title }}</td>
					<td>{{ movie.rating }}</td>
					<td>{{ movie.type }}</td>
					<td>{{ movie.episodesMin }} / {{ movie.episodesMax }}</td>
					<td>{{ movie.seasonsMin }} / {{ movie.seasonsMax }}</td>
					<td>{{ formatDate(movie.createdAt) }}</td>
					<td>{{ formatDate(movie.updatedAt) }}</td>
				</tr>
			</tbody>
		</v-table>
	</CardComponent>
</template>
<script setup lang="ts">
import CardComponent from '@/components/media/CardComponent.vue';
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
import { formatDate, placeholderImg } from '@/utils/mediaUtils';
import { defineProps } from 'vue';

interface IMediaTableProps {
	media: TMedia[];
	mediaType: EMediaType;
	title: string;
}

defineProps<IMediaTableProps>();
</script>
<style>
th {
	background-color: var(--bg-primary-dark) !important;
	color: var(--text-color) !important;
}

table,
v-table,
.v-table__wrapper {
	background-color: var(--bg-secondary-medium);
	color: var(--text-color);
}
</style>
