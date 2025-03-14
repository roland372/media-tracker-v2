<template>
	<LoaderComponent v-if="isLoading" />
	<MainLayout v-else />
</template>

<script setup lang="ts">
import LoaderComponent from '@/components/ui/LoaderComponent.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useMediaStore } from '@/stores/useMediaStore';
import { setDefaultTheme } from '@/utils/themes';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { supabase } from './auth/supabaseClient';
import { useUsersStore } from './stores/useUsersStore';
import { useUtilsStore } from './stores/useUtilsStore';
import { fetchAllSheetsData } from './utils/sheetsUtils';

const mediaStore = useMediaStore();
const usersStore = useUsersStore();
const utilsStore = useUtilsStore();
const { fetchAllMedia } = mediaStore;
const { setLoading } = utilsStore;
const { fetchUser } = usersStore;
const { isLoading } = storeToRefs(utilsStore);

onMounted(() => {
	// console.log("APP MOUNTED");
	setDefaultTheme();

	const snackbarShown = localStorage.getItem('snackbarShown');

	supabase.auth.onAuthStateChange(async (_event, session) => {
		if (session?.user) {
			const { usersData, mediaData } = await fetchAllSheetsData();

			if (usersData.length > 0) {
				fetchUser(usersData[0]);
			}
			fetchAllMedia(mediaData);

			setLoading(false);

			if (!snackbarShown) {
				utilsStore.setSnackbar(true, {
					color: 'green',
					text: `Welcome ${session.user.email}`,
				});

				localStorage.setItem('snackbarShown', 'true');
			}
		} else {
			setLoading(false);
			utilsStore.setSnackbar(false);
		}
	});
});
</script>
<style>
:root {
	--text-color: #ffffff;
	--link-color: #0dcaf0;

	--blue-500: #12232e;
	--blue-400: #203647;
	--blue-300: #284155;
	--blue-200: #023e8a;
	--blue-100: #4da8da;

	--gray-500: #1c1c1c;
	--gray-400: #343434;
	--gray-300: #555555;
	--gray-200: #696969;
	--gray-100: #7c7c7c;

	--bg-primary-dark: var(--blue-500);
	--bg-primary-medium: var(--blue-400);
	--bg-primary-light: var(--blue-200);
	--bg-secondary-medium: var(--blue-300);
	--bg-secondary-light: var(--blue-100);
}

body {
	background-color: var(--bg-primary-dark);
}

.bg-primary-dark {
	background-color: var(--bg-primary-dark);
}

.bg-primary-medium {
	background-color: var(--bg-primary-medium);
}

.bg-primary-light {
	background-color: var(--bg-primary-light);
}

.bg-secondary-medium {
	background-color: var(--bg-secondary-medium);
}

.bg-secondary-light {
	background-color: var(--bg-secondary-light);
}

.bg-rainbow {
	background: linear-gradient(
		90deg,
		rgba(255, 0, 0, 1) 0%,
		rgba(255, 154, 0, 1) 10%,
		rgba(208, 222, 33, 1) 20%,
		rgba(79, 220, 74, 1) 30%,
		rgba(63, 218, 216, 1) 40%,
		rgba(47, 201, 226, 1) 50%,
		rgba(28, 127, 238, 1) 60%,
		rgba(95, 21, 242, 1) 70%,
		rgba(186, 12, 248, 1) 80%,
		rgba(251, 7, 217, 1) 90%,
		rgba(255, 0, 0, 1) 100%
	);
}

.text-color {
	color: var(--text-color);
}

.link-color {
	color: var(--link-color);
}

::-webkit-scrollbar {
	width: 10px;
}

::-webkit-scrollbar-thumb {
	border-radius: 5px;
	background-color: var(--bg-primary-light);
}

::-webkit-scrollbar-track {
	background-color: var(--bg-primary-dark);
}

::-webkit-scrollbar-thumb:hover {
	background-color: var(--bg-secondary-light);
}

@media (max-width: 480px) {
	html {
		font-size: 0.75rem !important;
	}
}

@media (min-width: 480px) {
	html {
		font-size: 0.8rem !important;
	}
}

@media (min-width: 768px) {
	html {
		font-size: 0.85rem !important;
	}
}

@media (min-width: 992px) {
	html {
		font-size: 0.9rem !important;
	}
}

@media (min-width: 1200px) {
	html {
		font-size: 1rem !important;
	}
}
</style>
