<template>
	<HeaderComponent title="Profile">
		<section>
			<h3 class="mb-4 pt-2 text-color">Welcome {{ userRef.email }}</h3>
			<section class="d-sm-flex mx-md-16 px-md-16">
				<main
					:style="{ backgroundColor: userRef.color }"
					class="py-5 px-7 v-col-sm-4 rounded"
				>
					<img
						alt="Avatar"
						class="rounded-circle"
						:src="userRef.profileImg"
						style="width: 80px"
					/>
					<div style="overflow-wrap: break-word">
						<h3>
							{{ userRef.username }}
						</h3>
						<p>
							{{ userRef.profileDesc }}
						</p>
					</div>
				</main>
				<aside
					class="bg-primary-dark text-color px-5 pt-2 pb-5 v-col-sm-8 rounded"
				>
					<section>
						<h3>Information</h3>
						<hr />
						<div class="pa-3">
							<h4>Email</h4>
							<p>{{ userRef.email }}</p>
						</div>
					</section>
					<section>
						<h3>Database</h3>
						<hr />
						<section
							class="v-row wrap align-center justify-space-evenly pa-3 text-no-wrap"
						>
							<section
								v-for="media in mediaType.filter(el => !el.isAdmin)"
								:key="media.media"
								class="pb-1 v-col-6 v-col-sm-4"
							>
								<b class="text-decoration-underline">{{ media.media }}</b>
								<div>
									{{ media.total }}
									{{ media.media === 'Music' ? 'Songs' : media.media }}
								</div>
							</section>
						</section>
					</section>
					<section>
						<h3>Color Themes</h3>
						<hr />
						<div class="d-flex align-center justify-start flex-wrap py-3">
							<ButtonText
								v-for="button in colorThemeButtons"
								:key="button.text"
								@click="setAppTheme(button.theme)"
								:class="button.class"
								:color="button.color"
								:size="button.size"
								:text="button.text"
							/>
							<ButtonText
								@click="generateAndSetRandomTheme"
								class="mt-2 bg-rainbow"
								color="pink"
								size="small"
								text="Random"
							/>
						</div>
					</section>
					<section>
						<h3>Export Data</h3>
						<hr />
						<div class="d-flex align-center justify-start flex-wrap py-3">
							<ButtonText
								v-for="button in backupButtons.filter(el => !el.isAdmin)"
								:key="button.text"
								@click="handleDownloadMedia(button.data, button.text)"
								:class="button.class"
								:color="button.color"
								:size="button.size"
								:text="button.text"
							/>
						</div>
					</section>
					<section>
						<h3>Settings</h3>
						<hr />
						<div
							class="d-flex align-center justify-space-evenly flex-wrap py-3"
						>
							<ButtonText
								@click="handleLogout"
								class="me-2 mt-2"
								color="indigo"
								size="small"
								text="Log Out"
							/>
						</div>
					</section>
				</aside>
			</section>
		</section>
		<v-dialog v-if="settingsModal" v-model="settingsModal" max-width="500">
			<v-card>
				<div
					class="d-flex justify-space-between align-center bg-primary-light text-color px-5 py-3 text-h6"
				>
					Edit Profile
					<ButtonIcon
						@click="handleOpenSettings"
						class="me-n3"
						icon="mdi-close"
						icon-color="white"
						icon-size="large"
						variant="text"
					/>
				</div>
			</v-card>
		</v-dialog>
	</HeaderComponent>
</template>
<script setup lang="ts">
import { supabase } from '@/auth/supabaseClient';
import HeaderComponent from '@/components/media/HeaderComponent.vue';
import ButtonIcon from '@/components/ui/ButtonIcon.vue';
import ButtonText from '@/components/ui/ButtonText.vue';
import { useMediaRefs } from '@/stores/useMediaRefs';
import { useUtilsStore } from '@/stores/useUtilsStore';
import { EUserRole } from '@/types';
import {
	TAnime,
	TBook,
	TCharacter,
	TEmote,
	TGame,
	TManga,
	TMovie,
	TMusic,
	TTheme,
} from '@/types/index';
import { beigeTheme, blueTheme, grayTheme, setAppTheme } from '@/utils/themes';
import { computed, ref } from 'vue';

const utilsStore = useUtilsStore();
const { setSnackbar } = utilsStore;

const { anime, characters, emotes, games, manga, books, movies, user } =
	useMediaRefs();
const isAdmin = user.value?.role === EUserRole.ADMIN;

const userProfile = computed(() => ({
	color: user.value?.color ?? '',
	email: user.value?.email ?? '',
	profileDesc: user.value?.profileDesc ?? '',
	profileImg: user.value?.profileImg ?? '',
	role: user.value?.role ?? '',
	username: user.value?.username ?? '',
}));

const settingsModal = ref<boolean>(false);
const userRef = ref(userProfile);

const backupButtons = computed(() => [
	{
		class: 'me-2 mt-2',
		color: 'indigo',
		data: anime.value,
		size: 'small',
		text: 'Anime',
	},
	{
		class: 'me-2 mt-2',
		color: 'purple',
		data: books.value,
		size: 'small',
		text: 'Books',
	},
	{
		class: 'me-2 mt-2',
		color: 'red',
		data: characters.value,
		size: 'small',
		text: 'Characters',
	},
	{
		class: 'me-2 mt-2',
		color: 'cyan',
		data: emotes.value,
		size: 'small',
		text: 'Emotes',
		isAdmin: !isAdmin,
	},
	{
		class: 'me-2 mt-2',
		color: 'amber',
		data: games.value,
		size: 'small',
		text: 'Games',
	},
	{
		class: 'me-2 mt-2',
		color: 'green',
		data: manga.value,
		size: 'small',
		text: 'Manga',
	},
	{
		class: 'me-2 mt-2',
		color: 'yellow',
		data: movies.value,
		size: 'small',
		text: 'Movies',
	},
]);

const colorThemeButtons = [
	{
		class: 'me-2 mt-2',
		color: 'indigo',
		size: 'small',
		text: 'Blue',
		theme: blueTheme,
	},
	{
		class: 'me-2 mt-2',
		color: 'grey-darken-3',
		size: 'small',
		text: 'Gray',
		theme: grayTheme,
	},
	{
		class: 'me-2 mt-2',
		color: 'amber-darken-1',
		size: 'small',
		text: 'Beige',
		theme: beigeTheme,
	},
];

const mediaType = computed(() => [
	{ media: 'Anime', total: anime.value.length },
	{ media: 'Books', total: books.value.length },
	{ media: 'Characters', total: characters.value.length },
	{ media: 'Emotes', total: emotes.value.length, isAdmin: !isAdmin },
	{ media: 'Games', total: games.value.length },
	{ media: 'Manga', total: manga.value.length },
	{ media: 'Movies', total: movies.value.length },
]);

const generateAndSetRandomTheme = () => {
	const randomColor1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor2 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor3 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor4 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor5 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor6 = '#' + Math.floor(Math.random() * 16777215).toString(16);

	const randomTheme: TTheme = {
		primaryDark: randomColor1,
		primaryMedium: randomColor2,
		primaryLight: randomColor3,
		secondaryMedium: randomColor4,
		secondaryLight: randomColor5,
		textColor: randomColor6,
	};

	setAppTheme(randomTheme);
};

const handleDownloadMedia = (
	jsonData:
		| TAnime[]
		| TBook[]
		| TCharacter[]
		| TEmote[]
		| TGame[]
		| TManga[]
		| TMovie[]
		| TMusic[],
	fileName: string
) => {
	const fileData = JSON.stringify(jsonData);
	const blob = new Blob([fileData], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.download = `${fileName}.json`;
	link.href = url;
	link.click();
};

const handleLogout = async () => {
	try {
		await supabase.auth.signOut();

		setSnackbar(true, {
			color: 'green',
			text: 'Logged out',
		});

		localStorage.removeItem('snackbarShown');

		window.open('/login', '_self');
	} catch (error) {
		console.error('Logout failed:', error);
	}
};

const handleOpenSettings = () => {
	settingsModal.value = !settingsModal.value;
};
</script>
