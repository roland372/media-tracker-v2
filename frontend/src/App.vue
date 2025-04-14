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
/* App-specific styles */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-primary-dark);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
