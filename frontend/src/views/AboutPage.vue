<template>
	<HeaderComponent title="About">
		<div class="about-page text-start text-color pa-2 pa-sm-4">
			<section class="about-intro mb-8">
				<p>
					Media-Tracker is a web app where you can keep track of your favourite
					media like anime, games, manga, books, etc.
				</p>
				<p>
					You can browse a limited demo without signing in. To use your own
					library and edit entries you need to log in with Google, since the
					full data is stored in Google Sheets.
				</p>
				<p>
					After signing in you can start updating your media straight away, just
					open an entry and fill out the form (only title is required, you can
					fill the rest later).
				</p>
				<p>
					And after that you can easily access your media, change the status,
					keep track of progress, sort, filter or even view various statistics
					and charts.
				</p>
			</section>

			<section class="mb-8">
				<h3 class="about-heading mb-4">
					Here's full list of features that you can find on a website:
				</h3>
				<div class="about-features">
					<div class="about-feature">
						<div class="about-feature__icon bg-primary-light">
							<v-icon color="white" icon="mdi-library" />
						</div>
						<div>
							<p class="about-feature__title mb-2">Your library</p>
							<p class="about-feature__text mb-3">
								Add and update your favourite media. Here you can also see your
								selected media stats, display them as a grid or a table, search,
								sort or filter them out by status.
							</p>
							<div class="d-flex flex-wrap ga-2">
								<router-link
									v-for="link in mediaLinks"
									:key="link.url"
									class="about-chip"
									:to="link.url"
								>
									<v-icon :color="link.color" :icon="link.icon" size="18" />
									{{ link.text }}
								</router-link>
							</div>
						</div>
					</div>

					<router-link class="about-feature about-feature--link" to="/stats">
						<div class="about-feature__icon bg-primary-light">
							<v-icon color="white" icon="mdi-chart-bar" />
						</div>
						<div>
							<p class="about-feature__title mb-2">Stats</p>
							<p class="about-feature__text">
								Quickly see some interesting stats like how much time you spent
								playing games, how many anime episodes have you watched, etc.
							</p>
						</div>
					</router-link>

					<router-link class="about-feature about-feature--link" to="/profile">
						<div class="about-feature__icon bg-primary-light">
							<v-icon color="white" icon="mdi-account" />
						</div>
						<div>
							<p class="about-feature__title mb-2">Profile</p>
							<p class="about-feature__text">
								Customize your own profile where you can change your avatar,
								update name, bio, background color or even change theme of the
								whole app.
							</p>
						</div>
					</router-link>

					<router-link class="about-feature about-feature--link" to="/">
						<div class="about-feature__icon bg-primary-light">
							<v-icon color="white" icon="mdi-home" />
						</div>
						<div>
							<p class="about-feature__title mb-2">Home</p>
							<p class="about-feature__text">
								See recently updated media from your library.
							</p>
						</div>
					</router-link>
				</div>
			</section>

			<section>
				<h3 class="about-heading mb-4">
					Languages and technologies used in this project:
				</h3>
				<div class="about-tech">
					<div
						v-for="tech in technologies"
						:key="tech.name"
						class="about-tech__item"
					>
						<span class="about-tech__name">{{ tech.name }}</span>
						<span class="about-tech__desc">{{ tech.desc }}</span>
					</div>
				</div>
			</section>
		</div>
	</HeaderComponent>
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/media/HeaderComponent.vue';
import { navLinks } from '@/utils/links';

const mediaLinks = navLinks.filter(link =>
	['Anime', 'Books', 'Characters', 'Games', 'Manga', 'Movies'].includes(
		link.text
	)
);

const technologies = [
	{ name: 'Vue 3', desc: 'main frontend framework' },
	{ name: 'TypeScript', desc: 'type checking' },
	{ name: 'Vue Router', desc: 'routing' },
	{ name: 'Pinia', desc: 'state throughout the app' },
	{ name: 'Supabase', desc: 'Google authentication' },
	{ name: 'Google Sheets', desc: 'database' },
	{ name: 'Axios', desc: 'fetching data' },
	{ name: 'Chart.js', desc: 'charts' },
	{ name: 'TinyMCE', desc: 'notes editor' },
	{ name: 'Jikan API', desc: 'anime / manga search' },
	{ name: 'Vuetify', desc: 'UI components' },
	{ name: 'CSS', desc: 'custom styles' },
];
</script>
<style scoped>
.about-page {
	color: #ffffff;
	max-width: 920px;
	margin: 0 auto;
}

.about-intro p,
.about-heading,
.about-feature__title,
.about-feature__text,
.about-tech__name,
.about-tech__desc {
	color: #ffffff;
}

.about-intro p {
	font-size: 1.05rem;
	line-height: 1.7;
	margin-bottom: 1rem;
}

.about-heading {
	font-size: 1.15rem;
	font-weight: 600;
}

.about-features {
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;
}

.about-feature {
	display: flex;
	gap: 16px;
	align-items: flex-start;
	text-align: left;
	background-color: var(--bg-primary-dark);
	border: 1px solid var(--bg-secondary-medium);
	border-radius: 12px;
	padding: 16px 18px;
}

.about-feature--link {
	text-decoration: none;
	transition: border-color 0.15s ease, background-color 0.15s ease;
}

.about-feature--link:hover {
	border-color: var(--bg-secondary-light);
	background-color: var(--bg-secondary-medium);
}

.about-feature__icon {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	width: 40px;
	height: 40px;
	border-radius: 10px;
}

.about-feature__title {
	font-size: 1.05rem;
	font-weight: 600;
}

.about-feature__text {
	font-size: 0.95rem;
	line-height: 1.55;
	opacity: 0.92;
}

.about-chip {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 4px 10px;
	border-radius: 999px;
	background-color: var(--bg-secondary-medium);
	color: #ffffff;
	text-decoration: none;
	font-size: 0.85rem;
	border: 1px solid var(--bg-primary-light);
}

.about-chip:hover {
	background-color: var(--bg-primary-light);
}

.about-tech {
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
}

.about-tech__item {
	display: flex;
	flex-wrap: wrap;
	align-items: baseline;
	gap: 8px;
	background-color: var(--bg-primary-dark);
	border: 1px solid var(--bg-secondary-medium);
	border-radius: 10px;
	padding: 10px 14px;
}

.about-tech__name {
	font-weight: 700;
}

.about-tech__desc {
	opacity: 0.85;
}

@media (min-width: 768px) {
	.about-features {
		grid-template-columns: 1fr 1fr;
	}

	.about-features > .about-feature:first-child {
		grid-column: 1 / -1;
	}

	.about-tech {
		grid-template-columns: 1fr 1fr;
	}
}
</style>
