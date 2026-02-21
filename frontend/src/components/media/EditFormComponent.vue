<template>
	<v-dialog
		max-width="500"
		content-class="edit-form-dialog-content"
		v-model="dialogVisible"
	>
		<template v-slot:default>
			<v-card max-width="500" class="pb-2">
				<div
					class="d-flex justify-space-between align-center bg-primary-light text-color px-5 py-3 text-h6"
				>
					Edit {{ title }}
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
						<v-form
							id="edit-form-anime"
							@submit.prevent="handleSubmitEditAnime"
							validate-on="input"
						>
							<v-text-field
								v-model="animeRef.title"
                dense="true"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-text-field
								v-model="animeRef.series"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Series"
								variant="outlined"
							/>
							<v-select
								v-model="animeRef.type"
								class="mb-n3"
								density="compact"
								:items="animeType"
								label="Type"
								variant="outlined"
							/>
							<v-text-field
								v-model="animeRef.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="animeRef.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="animeRef.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="animeRef.studio"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Studio"
								variant="outlined"
							/>
							<v-text-field
								v-model="animeRef.studioLink"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Studio Link"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="animeRef.characters"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Characters URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="animeRef.status"
								class="mb-n3"
								density="compact"
								:items="animeStatus"
								label="Status"
								variant="outlined"
							/>
							<section class="d-flex align-center me-n2 mb-2">
								<div class="pe-2">Episodes</div>
								<v-text-field
									v-model.number="animeRef.episodesMin"
									density="compact"
									hide-details="auto"
									label="Min"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
								<v-text-field
									v-model.number="animeRef.episodesMax"
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
							<v-text-field
								v-model="animeRef.notes"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Notes"
								variant="outlined"
							/>
							<section class="d-flex align-center">
								<div>Favourites?</div>
								<v-checkbox v-model="animeRef.favourites" hide-details />
							</section>
						</v-form>
					</section>

					<!--? MANGA -->
					<section v-if="props.mediaType === EMediaType.MANGA" class="mb-n12">
						<v-form
							id="edit-form-manga"
							@submit.prevent="handleSubmitEditManga"
							validate-on="input"
						>
							<v-text-field
								v-model="mangaRef.title"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-text-field
								v-model="mangaRef.author"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Author"
								variant="outlined"
							/>
							<v-text-field
								v-model="mangaRef.authorLink"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Author Link"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="mangaRef.type"
								class="mb-n3"
								density="compact"
								:items="mangaType"
								label="Type"
								variant="outlined"
							/>
							<v-text-field
								v-model="mangaRef.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="mangaRef.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="mangaRef.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="mangaRef.characters"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Characters URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="mangaRef.status"
								class="mb-n3"
								density="compact"
								:items="mangaStatus"
								label="Status"
								variant="outlined"
							/>
							<section class="d-flex align-center me-n2">
								<div class="pe-2">Chapters</div>
								<v-text-field
									v-model.number="mangaRef.chaptersMin"
									density="compact"
									hide-details="auto"
									label="Min"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
								<v-text-field
									v-model.number="mangaRef.chaptersMax"
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
							<section class="d-flex align-center mt-3 me-n2 mb-2">
								<div class="pe-2">Volumes</div>
								<v-text-field
									v-model.number="mangaRef.volumesMin"
									density="compact"
									hide-details="auto"
									label="Min"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
								<v-text-field
									v-model.number="mangaRef.volumesMax"
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
							<v-text-field
								v-model="mangaRef.notes"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Notes"
								variant="outlined"
							/>
							<section class="d-flex align-center">
								<div>Favourites?</div>
								<v-checkbox v-model="mangaRef.favourites" hide-details />
							</section>
						</v-form>
					</section>

					<!--? GAMES -->
					<section v-if="props.mediaType === EMediaType.GAME" class="mb-n12">
						<v-form
							id="edit-form-game"
							@submit.prevent="handleSubmitEditGame"
							validate-on="input"
						>
							<v-text-field
								v-model="gameRef.title"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-select
								v-model="gameRef.type"
								class="mb-n3"
								density="compact"
								:items="gameType"
								label="Type"
								variant="outlined"
							/>
							<v-text-field
								v-model="gameRef.series"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Series"
								variant="outlined"
							/>
							<v-text-field
								v-model="gameRef.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="gameRef.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="gameRef.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="gameRef.developer"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Developer"
								variant="outlined"
							/>
							<v-text-field
								v-model="gameRef.developerLink"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Developer Link"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="gameRef.characters"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Characters URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="gameRef.youtubeLink"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="YouTube Link"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="gameRef.status"
								class="mb-n3"
								density="compact"
								:items="gameStatus"
								label="Status"
								variant="outlined"
							/>
							<section class="d-flex align-center mb-2">
								<div class="pe-2">Playtime (Hours)</div>
								<v-text-field
									v-model.number="gameRef.playtime"
									density="compact"
									hide-details="auto"
									label="Playtime"
									maxlength="4"
									:rules="numberRules"
									style="max-width: 50%"
									variant="outlined"
								/>
							</section>
							<v-text-field
								v-model="gameRef.notes"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Notes"
								variant="outlined"
							/>
							<section class="d-flex align-center">
								<div>Favourites?</div>
								<v-checkbox v-model="gameRef.favourites" hide-details />
							</section>
						</v-form>
					</section>

					<!--? CHARACTERS -->
					<section
						v-if="props.mediaType === EMediaType.CHARACTER"
						class="mb-n12"
					>
						<v-form
							id="edit-form-character"
							@submit.prevent="handleSubmitEditCharacter"
							validate-on="input"
						>
							<v-text-field
								v-model="characterRef.name"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Name"
								:rules="stringRules('Name')"
								variant="outlined"
							/>
							<v-select
								v-model="characterRef.source"
								class="mb-n3"
								density="compact"
								:items="characterSource"
								label="Source"
								variant="outlined"
							/>
							<v-select
								v-model="characterRef.gender"
								class="mb-n3"
								density="compact"
								:items="characterGender"
								label="Gender"
								variant="outlined"
							/>
							<v-text-field
								v-model="characterRef.series"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Series"
								variant="outlined"
							/>
							<v-text-field
								v-model="characterRef.hairColor"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Hair Color"
								variant="outlined"
							/>
							<v-text-field
								v-model="characterRef.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="characterRef.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="characterRef.imageURL"
								density="compact"
                class="mb-2"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="characterRef.notes"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Notes"
								variant="outlined"
							/>
							<section class="d-flex align-center">
								<div>Favourites?</div>
								<v-checkbox v-model="characterRef.favourites" hide-details />
							</section>
						</v-form>
					</section>

					<!--? BOOKS -->
					<section v-if="props.mediaType === EMediaType.BOOK" class="mb-n12">
						<v-form
							id="edit-form-book"
							@submit.prevent="handleSubmitEditBook"
							validate-on="input"
						>
							<v-text-field
								v-model="bookRef.title"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-text-field
								v-model="bookRef.author"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Author"
								:rules="stringRules('Author')"
								variant="outlined"
							/>
							<v-text-field
								v-model="bookRef.genre"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Genre"
								variant="outlined"
							/>
							<v-text-field
								v-model="bookRef.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="bookRef.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="bookRef.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="bookRef.status"
								class="mb-n3"
								density="compact"
								:items="bookStatus"
								label="Status"
								variant="outlined"
							/>
							<v-text-field
								v-model.number="bookRef.pages"
								density="compact"
                class="mb-2"
								hide-details="auto"
								label="Pages"
								maxlength="4"
								:rules="numberRules"
								style="max-width: 50%"
								variant="outlined"
							/>
							<v-text-field
								v-model="bookRef.notes"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Notes"
								variant="outlined"
							/>
							<section class="d-flex align-center">
								<div>Favourites?</div>
								<v-checkbox v-model="bookRef.favourites" hide-details />
							</section>
						</v-form>
					</section>

					<!--? MOVIES -->
					<section v-if="props.mediaType === EMediaType.MOVIE" class="mb-n12">
						<v-form
							id="edit-form-movie"
							@submit.prevent="handleSubmitEditMovie"
							validate-on="input"
						>
							<v-text-field
								v-model="movieRef.title"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Title"
								:rules="stringRules('Title')"
								variant="outlined"
							/>
							<v-select
								v-model="movieRef.type"
								class="mb-n3"
								density="compact"
								:items="movieType"
								label="Type"
								variant="outlined"
							/>
							<v-text-field
								v-model="movieRef.linkName"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link Name"
								variant="outlined"
							/>
							<v-text-field
								v-model="movieRef.link"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Link URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-text-field
								v-model="movieRef.imageURL"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Image URL"
								:rules="emptyURLRules"
								variant="outlined"
							/>
							<v-select
								v-model="movieRef.status"
								class="mb-n3"
								density="compact"
								:items="movieStatus"
								label="Status"
								variant="outlined"
							/>
							<div v-if="movieRef.type === EMovieType.TV_SHOW">
								<section class="d-flex align-center me-n2">
									<div class="pe-2">Episodes</div>
									<v-text-field
										v-model.number="movieRef.episodesMin"
										density="compact"
										hide-details="auto"
										label="Min"
										maxlength="4"
										:rules="numberRules"
										style="max-width: 50%"
										variant="outlined"
									/>
									<v-text-field
										v-model.number="movieRef.episodesMax"
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
								<section class="d-flex align-center mt-3 me-n2 mb-2">
									<div class="pe-2">Seasons</div>
									<v-text-field
										v-model.number="movieRef.seasonsMin"
										density="compact"
										hide-details="auto"
										label="Min"
										maxlength="4"
										:rules="numberRules"
										style="max-width: 50%"
										variant="outlined"
									/>
									<v-text-field
										v-model.number="movieRef.seasonsMax"
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
							<v-text-field
								v-model="movieRef.notes"
								class="mb-2"
								density="compact"
								hide-details="auto"
								label="Notes"
								variant="outlined"
							/>
							<section class="d-flex align-center">
								<div>Favourites?</div>
								<v-checkbox v-model="movieRef.favourites" hide-details />
							</section>
						</v-form>
					</section>
				</v-card-text>
				<v-card-actions class="px-4 pb-4 pt-0">
					<v-btn
						:form="formId"
						class="text-none"
						color="yellow"
						:loading="isSubmitting"
						type="submit"
						variant="flat"
					>
						Update
					</v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>
<script setup lang="ts">
import { watch, reactive, ref, computed } from 'vue';
import { supabase } from '@/auth/supabaseClient';
import {
	digitRegex,
	emptyURLRules,
	numberRules,
	stringRules,
	URLRegex,
} from '@/utils/validations/formValidations';
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
import { getSheetNameForMediaType, updateSheetRow } from '@/utils/sheetsUtils';
import { useUtilsStore } from '@/stores/useUtilsStore';
import ButtonIcon from '@/components/ui/ButtonIcon.vue';
import {
	TAnime,
	TBook,
	TCharacter,
	TGame,
	TManga,
	TMovie,
} from '@/types';
import { EMediaType, EMovieType } from '@/types';

interface IEditFormComponentProps {
	media: TAnime | TBook | TCharacter | TGame | TManga | TMovie;
	mediaType: EMediaType;
	title: string;
	rowIndex: number;
	modelValue: boolean;
}

/* eslint-disable no-undef -- defineEmits/defineProps are script-setup compiler macros */
const emit = defineEmits(['edit', 'close', 'update:modelValue']);
const props = defineProps<IEditFormComponentProps>();

const utilsStore = useUtilsStore();
const isSubmitting = ref(false);

const dialogVisible = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:modelValue', val),
});

const formId = computed(
	() => 'edit-form-' + String(props.mediaType).toLowerCase()
);

const animeRef = reactive<Partial<TAnime>>({});
const bookRef = reactive<Partial<TBook>>({});
const characterRef = reactive<Partial<TCharacter>>({});
const gameRef = reactive<Partial<TGame>>({});
const mangaRef = reactive<Partial<TManga>>({});
const movieRef = reactive<Partial<TMovie>>({});

const toSheetData = (obj: Record<string, unknown>): Record<string, string | number | boolean> => {
	const out: Record<string, string | number | boolean> = {};
	for (const [k, v] of Object.entries(obj)) {
		if (v !== undefined && v !== null) {
			out[k] = typeof v === 'boolean' ? v : String(v);
		}
	}
	return out;
};

const doUpdate = async (data: Record<string, string | number | boolean>) => {
	const { data: sessionData } = await supabase.auth.getSession();
	const token = sessionData.session?.provider_token;
	if (!token) {
		utilsStore.setSnackbar(true, {
			color: 'warning',
			text: 'No Google token. Sign out and sign back in to get Sheets access.',
		});
		return false;
	}
	const sheetName = getSheetNameForMediaType(props.mediaType);
	const result = await updateSheetRow(token, sheetName, props.rowIndex, data);
	if (result.success) {
		utilsStore.setSnackbar(true, { color: 'green', text: 'Updated successfully.' });
		emit('edit');
		emit('update:modelValue', false);
	} else {
		utilsStore.setSnackbar(true, { color: 'error', text: result.error || 'Update failed.' });
	}
	return result.success;
};

watch(
	() => props.media,
	(newMedia) => {
		if (!newMedia) return;
		const m = newMedia as Record<string, unknown>;
		Object.assign(animeRef, props.mediaType === EMediaType.ANIME ? m : {});
		Object.assign(bookRef, props.mediaType === EMediaType.BOOK ? m : {});
		Object.assign(characterRef, props.mediaType === EMediaType.CHARACTER ? m : {});
		Object.assign(gameRef, props.mediaType === EMediaType.GAME ? m : {});
		Object.assign(mangaRef, props.mediaType === EMediaType.MANGA ? m : {});
		Object.assign(movieRef, props.mediaType === EMediaType.MOVIE ? m : {});
	},
	{ immediate: true }
);

const handleSubmitEditAnime = async () => {
	if (
		!animeRef.title ||
		!digitRegex.test(String(animeRef.episodesMax ?? 0)) ||
		!digitRegex.test(String(animeRef.episodesMin ?? 0)) ||
		(animeRef.link && !URLRegex.test(String(animeRef.link))) ||
		(animeRef.imageURL && !URLRegex.test(String(animeRef.imageURL)))
	)
		return;
	isSubmitting.value = true;
	await doUpdate(toSheetData(animeRef as Record<string, unknown>));
	isSubmitting.value = false;
};

const handleSubmitEditBook = async () => {
	if (
		!bookRef.title ||
		!bookRef.author ||
		!digitRegex.test(String(bookRef.pages ?? 0)) ||
		(bookRef.link && !URLRegex.test(String(bookRef.link))) ||
		(bookRef.imageURL && !URLRegex.test(String(bookRef.imageURL)))
	)
		return;
	isSubmitting.value = true;
	await doUpdate(toSheetData(bookRef as Record<string, unknown>));
	isSubmitting.value = false;
};

const handleSubmitEditCharacter = async () => {
	if (
		!characterRef.name ||
		(characterRef.link && !URLRegex.test(String(characterRef.link))) ||
		(characterRef.imageURL && !URLRegex.test(String(characterRef.imageURL)))
	)
		return;
	isSubmitting.value = true;
	await doUpdate(toSheetData(characterRef as Record<string, unknown>));
	isSubmitting.value = false;
};

const handleSubmitEditGame = async () => {
	if (
		!gameRef.title ||
		!digitRegex.test(String(gameRef.playtime ?? 0)) ||
		(gameRef.link && !URLRegex.test(String(gameRef.link))) ||
		(gameRef.imageURL && !URLRegex.test(String(gameRef.imageURL)))
	)
		return;
	isSubmitting.value = true;
	await doUpdate(toSheetData(gameRef as Record<string, unknown>));
	isSubmitting.value = false;
};

const handleSubmitEditManga = async () => {
	if (
		!mangaRef.title ||
		!digitRegex.test(String(mangaRef.chaptersMax ?? 0)) ||
		!digitRegex.test(String(mangaRef.chaptersMin ?? 0)) ||
		!digitRegex.test(String(mangaRef.volumesMax ?? 0)) ||
		!digitRegex.test(String(mangaRef.volumesMin ?? 0)) ||
		(mangaRef.link && !URLRegex.test(String(mangaRef.link))) ||
		(mangaRef.imageURL && !URLRegex.test(String(mangaRef.imageURL)))
	)
		return;
	isSubmitting.value = true;
	await doUpdate(toSheetData(mangaRef as Record<string, unknown>));
	isSubmitting.value = false;
};

const handleSubmitEditMovie = async () => {
	if (
		!movieRef.title ||
		!digitRegex.test(String(movieRef.episodesMax ?? 0)) ||
		!digitRegex.test(String(movieRef.episodesMin ?? 0)) ||
		!digitRegex.test(String(movieRef.seasonsMax ?? 0)) ||
		!digitRegex.test(String(movieRef.seasonsMin ?? 0)) ||
		(movieRef.link && !URLRegex.test(String(movieRef.link))) ||
		(movieRef.imageURL && !URLRegex.test(String(movieRef.imageURL)))
	)
		return;
	isSubmitting.value = true;
	await doUpdate(toSheetData(movieRef as Record<string, unknown>));
	isSubmitting.value = false;
};

const handleCloseModal = () => {
	emit('close');
	emit('update:modelValue', false);
};
</script>

<style>
/* Match MediaModal: no height cap so no internal scroll; content can grow */
.edit-form-dialog-content {
	max-height: none !important;
	overflow: visible !important;
}
.edit-form-dialog-content .v-card,
.edit-form-dialog-content .v-card-text {
	max-height: none !important;
	overflow: visible !important;
}
</style>

