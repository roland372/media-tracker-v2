<template>
	<v-navigation-drawer
		class="nd-bg-color text-color rounded"
		expand-on-hover
		permanent
		rail
	>
		<v-list-item
			class="pa-2"
			:prepend-avatar="require('@/../public/img/icons/mstile-150x150.png')"
			title="Media-Tracker"
			to="/"
		>
		</v-list-item>

		<v-divider></v-divider>

		<v-list-item
			class="pa-2"
			:prepend-avatar="user?.profileImg"
			:subtitle="user?.email"
			:title="user?.username"
			to="/profile"
		>
		</v-list-item>

		<v-divider></v-divider>

		<v-list density="compact">
			<v-list-item
				v-for="(link, index) in filteredLinks"
				:key="index"
				:color="link.color"
				height="20"
				min-height="35"
				:to="link.url"
			>
				<div class="d-flex align-center">
					<v-icon class="pe-1" :color="link.color">{{ link.icon }}</v-icon>
					<div class="ps-5">
						{{ link.text }}
					</div>
				</div>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>
<script setup lang="ts">
import { useUsersStore } from '@/stores/useUsersStore';
import { EUserRole } from '@/types';
import { navLinks } from '@/utils/links';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const usersStore = useUsersStore();
const { user } = storeToRefs(usersStore);

const filteredLinks = computed(() =>
	navLinks
		.filter(link => {
			if (user.value?.role === EUserRole.ADMIN) {
				return link.route;
			} else {
				return link.route !== EUserRole.ADMIN;
			}
		})
		.slice(1)
);
</script>
<style>
.nd-bg-color {
	background-color: var(--bg-secondary-medium);
	border-right: 3px solid var(--bg-secondary-light);
}
</style>
