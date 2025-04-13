<template>
	<v-dialog max-width="500">
		<template v-slot:default>
			<v-card max-width="500">
				<div
					class="d-flex justify-space-between align-center bg-primary-light text-color px-5 py-3 text-h6"
				>
					{{ title }}
					<ButtonIcon
						@click="handleCloseModal"
						class="me-n3"
						icon="mdi-close"
						icon-color="white"
						icon-size="large"
						variant="text"
					/>
				</div>
				<v-card-text>
					<!--? ANIME -->
					<section v-if="props.mediaType === EMediaType.ANIME" class="mb-n12">
						<v-form @submit.prevent="handleSubmitAddAnime" validate-on="input">
							<v-text-field
								v-model="newAnime.title"
								autofocus
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-select
								v-model="newAnime.type"
								class="mb-n3"
								density="compact"
								:items="animeType"
								label="Select Type"
								variant="outlined"
							/>
							<v-text-field
								v-model="newAnime.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="newAnime.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="newAnime.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="newAnime.status"
								class="mb-n3"
								density="compact"
								:items="animeStatus"
								label="Status"
								variant="outlined"
							/>
							<section class="d-flex align-center me-n2">
								<div class="pe-2">Episodes</div>
								<v-text-field
									v-model.number="newAnime.episodesMin"
									density="compact"
									hide-details="auto"
									label="Min"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
								<v-text-field
									v-model.number="newAnime.episodesMax"
									class="mx-2"
									density="compact"
									hide-details="auto"
									label="Max"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
							</section>
							<section class="d-flex align-center">
								<div>Add to Favourites?</div>
								<v-checkbox v-model="newAnime.favourites" hide-details />
							</section>
							<ButtonText color="green" text="Add" type="submit" />
						</v-form>
					</section>

					<!--? MANGA -->
					<section v-if="props.mediaType === EMediaType.MANGA" class="mb-n12">
						<v-form @submit.prevent="handleSubmitAddManga" validate-on="input">
							<v-text-field
								v-model="newManga.title"
								autofocus
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-select
								v-model="newManga.type"
								class="mb-n3"
								density="compact"
								:items="mangaType"
								label="Select Type"
								variant="outlined"
							/>
							<v-text-field
								v-model="newManga.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="newManga.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="newManga.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="newManga.status"
								class="mb-n3"
								density="compact"
								:items="mangaStatus"
								label="Status"
								variant="outlined"
							/>
							<section class="d-flex align-center me-n2">
								<div class="pe-2">Chapters</div>
								<v-text-field
									v-model.number="newManga.chaptersMin"
									density="compact"
									hide-details="auto"
									label="Min"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
								<v-text-field
									v-model.number="newManga.chaptersMax"
									class="mx-2"
									density="compact"
									hide-details="auto"
									label="Max"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
							</section>
							<section class="d-flex align-center mt-3 me-n2">
								<div class="pe-2">Volumes</div>
								<v-text-field
									v-model.number="newManga.volumesMin"
									density="compact"
									hide-details="auto"
									label="Min"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
								<v-text-field
									v-model.number="newManga.volumesMax"
									class="mx-2"
									density="compact"
									hide-details="auto"
									label="Max"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
							</section>
							<section class="d-flex align-center">
								<div>Add to Favourites?</div>
								<v-checkbox v-model="newManga.favourites" hide-details />
							</section>
							<ButtonText color="green" text="Add" type="submit" />
						</v-form>
					</section>

					<!--? GAMES -->
					<section v-if="props.mediaType === EMediaType.GAME" class="mb-n12">
						<v-form @submit.prevent="handleSubmitAddGame" validate-on="input">
							<v-text-field
								v-model="newGame.title"
								autofocus
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-select
								v-model="newGame.type"
								class="mb-n3"
								density="compact"
								:items="gameType"
								label="Select Type"
								variant="outlined"
							/>
							<v-text-field
								v-model="newGame.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="newGame.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="newGame.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="newGame.status"
								class="mb-n3"
								density="compact"
								:items="gameStatus"
								label="Status"
								variant="outlined"
							/>
							<section class="d-flex align-center">
								<div class="pe-2">Playtime (Hours)</div>
								<v-text-field
									v-model.number="newGame.playtime"
									density="compact"
									hide-details="auto"
									label="Playtime"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
							</section>
							<section class="d-flex align-center">
								<div>Add to Favourites?</div>
								<v-checkbox v-model="newGame.favourites" hide-details />
							</section>
							<ButtonText color="green" text="Add" type="submit" />
						</v-form>
					</section>

					<!--? CHARACTERS -->
					<section
						v-if="props.mediaType === EMediaType.CHARACTER"
						class="mb-n12"
					>
						<v-form
							@submit.prevent="handleSubmitAddCharacter"
							validate-on="input"
						>
							<v-text-field
								v-model="newCharacter.name"
								autofocus
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Name"
								:rules="stringRules('Name')"
								variant="outlined"
							/>
							<v-select
								v-model="newCharacter.source"
								class="mb-n3"
								density="compact"
								:items="characterSource"
								label="Select Source"
								variant="outlined"
							/>
							<v-select
								v-model="newCharacter.gender"
								class="mb-n3"
								density="compact"
								:items="characterGender"
								label="Select Gender"
								variant="outlined"
							/>
							<v-text-field
								v-model="newCharacter.series"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Series Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="newCharacter.hairColor"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Hair Color"
								variant="outlined"
							/>
							<v-text-field
								v-model="newCharacter.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="newCharacter.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="newCharacter.imageURL"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<section class="d-flex align-center">
								<div>Add to Favourites?</div>
								<v-checkbox v-model="newCharacter.favourites" hide-details />
							</section>
							<ButtonText color="green" text="Add" type="submit" />
						</v-form>
					</section>

					<!--? BOOKS -->
					<section v-if="props.mediaType === EMediaType.BOOK" class="mb-n12">
						<v-form @submit.prevent="handleSubmitAddBook" validate-on="input">
							<v-text-field
								v-model="newBook.title"
								autofocus
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-text-field
								v-model="newBook.author"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Author"
								:rules="stringRules('Author')"
								variant="outlined"
							/>
							<v-text-field
								v-model="newBook.genre"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Genre"
								variant="outlined"
							/>
							<v-text-field
								v-model="newBook.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="newBook.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="newBook.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="newBook.status"
								class="mb-n3"
								density="compact"
								:items="bookStatus"
								label="Status"
								variant="outlined"
							/>
							<v-text-field
								v-model.number="newBook.pages"
								density="compact"
								hide-details="auto"
								label="Pages"
								maxlength="4"
								:rules="numberRules"
								style="max-width: 50%"
								variant="outlined"
							/>
							<section class="d-flex align-center">
								<div>Add to Favourites?</div>
								<v-checkbox v-model="newBook.favourites" hide-details />
							</section>
							<ButtonText color="green" text="Add" type="submit" />
						</v-form>
					</section>

					<!--? MOVIES -->
					<section v-if="props.mediaType === EMediaType.MOVIE" class="mb-n12">
						<v-form @submit.prevent="handleSubmitAddMovie" validate-on="input">
							<v-text-field
								v-model="newMovie.title"
								autofocus
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-select
								v-model="newMovie.type"
								class="mb-n3"
								density="compact"
								:items="movieType"
								label="Select Type"
								variant="outlined"
							/>
							<v-text-field
								v-model="newMovie.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="newMovie.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="newMovie.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="newMovie.status"
								class="mb-n3"
								density="compact"
								:items="movieStatus"
								label="Status"
								variant="outlined"
							/>
							<div v-if="newMovie.type === EMovieType.TV_SHOW">
								<section class="d-flex align-center me-n2">
									<div class="pe-2">Episodes</div>
									<v-text-field
										v-model.number="newMovie.episodesMin"
										density="compact"
										hide-details="auto"
										label="Min"
										maxlength="4"
										:rules="numberRules"
										style="max-width: 50%"
										variant="outlined"
									/>
									<v-text-field
										v-model.number="newMovie.episodesMax"
										class="mx-2"
										density="compact"
										hide-details="auto"
										label="Max"
										maxlength="4"
										:rules="numberRules"
										style="max-width: 50%"
										variant="outlined"
									/>
								</section>
								<section class="d-flex align-center mt-3 me-n2">
									<div class="pe-2">Seasons</div>
									<v-text-field
										v-model.number="newMovie.seasonsMin"
										density="compact"
										hide-details="auto"
										label="Min"
										maxlength="4"
										:rules="numberRules"
										style="max-width: 50%"
										variant="outlined"
									/>
									<v-text-field
										v-model.number="newMovie.seasonsMax"
										class="mx-2"
										density="compact"
										hide-details="auto"
										label="Max"
										maxlength="4"
										:rules="numberRules"
										style="max-width: 50%"
										variant="outlined"
									/>
								</section>
							</div>
							<section class="d-flex align-center">
								<div>Add to Favourites?</div>
								<v-checkbox v-model="newMovie.favourites" hide-details />
							</section>
							<ButtonText color="green" text="Add" type="submit" />
						</v-form>
					</section>
				</v-card-text>
				<v-card-actions class="d-flex justify-space-around"> </v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>
<script setup lang="ts">
import { useMediaStore } from '@/stores/useMediaStore';
import {
	EAnimeStatus,
	EAnimeType,
	EBookStatus,
	ECharacterGender,
	ECharacterSource,
	EGameStatus,
	EGameType,
	EMangaStatus,
	EMangaType,
	EMediaType,
	EMovieStatus,
	EMovieType,
	TAnimeInput,
	TBookInput,
	TCharacterInput,
	TGameInput,
	TMangaInput,
	TMovieInput,
} from '@/types';
import {
	animeStatus,
	animeType,
	bookStatus,
	characterGender,
	characterSource,
	gameStatus,
	gameType,
	mangaStatus,
	mangaType,
	movieStatus,
	movieType,
} from '@/utils/mediaUtils';
import {
	digitRegex,
	emptyURLRules,
	numberRules,
	stringRules,
	URLRegex,
} from '@/utils/validations/formValidations';
import { defineEmits, defineProps, reactive } from 'vue';
import ButtonIcon from '../ui/ButtonIcon.vue';
import ButtonText from '../ui/ButtonText.vue';

interface IFormComponentProps {
	mediaType: EMediaType | string;
	title: string;
}

const emit = defineEmits(['submit', 'close']);
const props = defineProps<IFormComponentProps>();

const mediaStore = useMediaStore();
const {
	submitAddAnime,
	submitAddBook,
	submitAddCharacter,
	submitAddGame,
	submitAddManga,
	submitAddMovie,
	userFromDB,
} = mediaStore;

const newAnime: TAnimeInput = reactive({
	episodesMax: 0,
	episodesMin: 0,
	favourites: false,
	imageURL: '',
	link: '',
	linkName: 'MAL',
	owner: userFromDB?.email as string,
	status: EAnimeStatus.PLAN_TO_WATCH,
	title: '',
	type: EAnimeType.TV_SHOW,
});

const newBook: TBookInput = reactive({
	author: '',
	favourites: false,
	genre: '',
	imageURL: '',
	link: '',
	linkName: 'Link',
	owner: userFromDB?.email as string,
	pages: 0,
	status: EBookStatus.PLAN_TO_READ,
	title: '',
});

const newCharacter: TCharacterInput = reactive({
	favourites: false,
	gender: ECharacterGender.FEMALE,
	hairColor: '',
	imageURL: '',
	link: '',
	linkName: 'Link',
	name: '',
	owner: userFromDB?.email as string,
	series: '',
	source: ECharacterSource.ANIME,
});

const newGame: TGameInput = reactive({
	favourites: false,
	imageURL: '',
	link: '',
	linkName: 'Link',
	owner: userFromDB?.email as string,
	playtime: 0,
	status: EGameStatus.PLAN_TO_PLAY,
	title: '',
	type: EGameType.GAME,
});

const newManga: TMangaInput = reactive({
	chaptersMax: 0,
	chaptersMin: 0,
	favourites: false,
	imageURL: '',
	link: '',
	linkName: 'MAL',
	owner: userFromDB?.email as string,
	status: EMangaStatus.PLAN_TO_READ,
	title: '',
	type: EMangaType.MANGA,
	volumesMax: 0,
	volumesMin: 0,
});

const newMovie: TMovieInput = reactive({
	episodesMin: 0,
	episodesMax: 0,
	favourites: false,
	imageURL: '',
	link: '',
	linkName: 'Link',
	owner: userFromDB?.email as string,
	seasonsMin: 0,
	seasonsMax: 0,
	status: EMovieStatus.PLAN_TO_WATCH,
	title: '',
	type: EMovieType.MOVIE,
});

const handleSubmitAddAnime = async () => {
	try {
		if (
			newAnime.title &&
			digitRegex.test(String(newAnime.episodesMax)) &&
			digitRegex.test(String(newAnime.episodesMin)) &&
			(!newAnime.link || URLRegex.test(String(newAnime.link))) &&
			(!newAnime.imageURL || URLRegex.test(String(newAnime.imageURL)))
		) {
			await submitAddAnime(newAnime);
			emit('submit');
		}
	} catch (err) {
		console.log(err);
	}
};

const handleSubmitAddBook = async () => {
	try {
		if (
			newBook.title &&
			newBook.author &&
			digitRegex.test(String(newBook.pages)) &&
			(!newBook.link || URLRegex.test(String(newBook.link))) &&
			(!newBook.imageURL || URLRegex.test(String(newBook.imageURL)))
		) {
			await submitAddBook(newBook);
			emit('submit');
		}
	} catch (err) {
		console.log(err);
	}
};

const handleSubmitAddCharacter = async () => {
	try {
		if (
			newCharacter.name &&
			(!newCharacter.link || URLRegex.test(String(newCharacter.link))) &&
			(!newCharacter.imageURL || URLRegex.test(String(newCharacter.imageURL)))
		) {
			await submitAddCharacter(newCharacter);
			emit('submit');
		}
	} catch (err) {
		console.log(err);
	}
};

const handleSubmitAddGame = async () => {
	try {
		if (
			newGame.title &&
			digitRegex.test(String(newGame.playtime)) &&
			(!newGame.link || URLRegex.test(String(newGame.link))) &&
			(!newGame.imageURL || URLRegex.test(String(newGame.imageURL)))
		) {
			await submitAddGame(newGame);
			emit('submit');
		}
	} catch (err) {
		console.log(err);
	}
};

const handleSubmitAddManga = async () => {
	try {
		if (
			newManga.title &&
			digitRegex.test(String(newManga.chaptersMax)) &&
			digitRegex.test(String(newManga.chaptersMin)) &&
			digitRegex.test(String(newManga.volumesMax)) &&
			digitRegex.test(String(newManga.volumesMin)) &&
			(!newManga.link || URLRegex.test(String(newManga.link))) &&
			(!newManga.imageURL || URLRegex.test(String(newManga.imageURL)))
		) {
			await submitAddManga(newManga);
			emit('submit');
		}
	} catch (err) {
		console.log(err);
	}
};

const handleSubmitAddMovie = async () => {
	try {
		if (
			newMovie.title &&
			digitRegex.test(String(newMovie.episodesMax)) &&
			digitRegex.test(String(newMovie.episodesMin)) &&
			digitRegex.test(String(newMovie.seasonsMax)) &&
			digitRegex.test(String(newMovie.seasonsMin)) &&
			(!newMovie.link || URLRegex.test(String(newMovie.link))) &&
			(!newMovie.imageURL || URLRegex.test(String(newMovie.imageURL)))
		) {
			await submitAddMovie(newMovie);
			emit('submit');
		}
	} catch (err) {
		console.log(err);
	}
};

const handleCloseModal = () => {
	emit('close');
};
</script>
