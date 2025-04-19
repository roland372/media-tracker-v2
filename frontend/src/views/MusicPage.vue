<template>
	<div class="music-page">
		<!-- <HeaderComponent title="Music" /> -->

		<div class="music-container">
			<!-- Folder selection -->
			<div v-if="!audioFiles.length" class="folder-selection">
				<div class="folder-prompt">
					<h2>Select music folder to start</h2>
					<p>Choose a folder containing your audio files (.mp3, .wav, etc.)</p>
					<ButtonText
						@click="selectFolder"
						text="Select Folder"
						color="indigo"
					/>
				</div>
			</div>

			<!-- Music player with playlist side by side -->
			<div v-else class="player-layout">
				<!-- Left side - Now Playing -->
				<div class="now-playing" :class="{'now-playing-horizontal': windowWidth < 1024}">
					<h2 class="section-title">Now Playing</h2>

					<div class="track-info" :class="{'track-info-horizontal': windowWidth < 1024}">
						<div class="cover-art" v-if="currentTrack" :class="{'cover-art-small': windowWidth < 1024}">
							<img
								:src="currentTrack.imageURL || defaultCoverArt"
								alt="Album Art"
							/>
							<div class="playback-overlay" @click="togglePlay">
								<i :class="playing ? 'fas fa-pause' : 'fas fa-play'"></i>
							</div>
						</div>

						<div class="track-details" v-if="currentTrack" :class="{'track-details-horizontal': windowWidth < 1024}">
							<h3 class="title">{{ currentTrack.title }}</h3>
							<p class="artist">{{ currentTrack.artist }}</p>
							<p class="album" v-if="currentTrack.album">
								<i class="fas fa-compact-disc"></i> {{ currentTrack.album }}
							</p>

							<div class="additional-meta">
								<p v-if="currentTrack.year">
									<i class="fas fa-calendar-alt"></i> {{ currentTrack.year }}
								</p>
								<p v-if="currentTrack.genre">
									<i class="fas fa-tag"></i> {{ currentTrack.genre }}
								</p>
								<p v-if="currentTrack.bitrate">
									<i class="fas fa-signal"></i>
									{{ Math.round(currentTrack.bitrate / 1000) }} kbps
								</p>
								<p v-if="currentTrack.codec">
									<i class="fas fa-file-audio"></i> {{ currentTrack.codec }}
								</p>
							</div>

							<!-- Filename display -->
							<p class="filename">
								<i class="fas fa-file"></i> {{ getFilename(currentTrack.link) }}
							</p>
						</div>
					</div>
				</div>

				<!-- Right side - Playlist -->
				<div class="playlist">
					<h2 class="section-title">Your Playlist</h2>
					<div class="playlist-table">
						<div class="playlist-header">
							<div class="track-number">#</div>
							<div class="track-title">TITLE</div>
							<div class="track-artist">ARTIST</div>
							<div class="track-album">ALBUM</div>
							<div class="track-duration">DURATION</div>
						</div>
						<div class="track-list" ref="trackListRef">
							<div
								v-for="(track, index) in sortedPlaylist"
								:key="originalIndices[index]"
								@click="playTrack(index)"
								:class="[
									'track-item',
									{ active: originalIndices[index] === currentTrackIndex },
								]"
							>
								<div class="track-number">
									<span v-if="originalIndices[index] !== currentTrackIndex">{{
										index + 1
									}}</span>
									<i v-else class="fas fa-volume-up playing-icon"></i>
								</div>
								<div class="track-title">
									<img
										:src="track.imageURL || defaultCoverArt"
										alt="Thumbnail"
										class="track-thumbnail"
									/>
									<span>{{ track.title }}</span>
								</div>
								<div class="track-artist">{{ track.artist }}</div>
								<div class="track-album">{{ track.album || '-' }}</div>
								<div class="track-duration">
									{{ formatTime(trackDurations[originalIndices[index]] || 0) }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Fixed bottom player controls -->
		<div v-if="audioFiles.length > 0" class="fixed-player-controls">
			<div class="player-controls-inner">
				<div class="track-info-mini" v-if="currentTrack">
					<img
						:src="currentTrack.imageURL || defaultCoverArt"
						alt="Album Art"
						class="mini-art"
					/>
					<div class="mini-details">
						<div class="mini-title">{{ currentTrack.title }}</div>
						<div class="mini-artist">{{ currentTrack.artist }}</div>
					</div>
				</div>

				<div class="controls-container">
					<div class="main-controls">
						<button
							@click="toggleShuffle"
							:class="{ active: isShuffled }"
							class="control-btn"
						>
							<i class="fas fa-random"></i>
						</button>
						<button @click="previousTrack" class="control-btn">
							<i class="fas fa-step-backward"></i>
						</button>
						<button @click="togglePlay" class="play-btn">
							<i :class="playing ? 'fas fa-pause' : 'fas fa-play'"></i>
						</button>
						<button @click="nextTrack" class="control-btn">
							<i class="fas fa-step-forward"></i>
						</button>
						<button
							@click="toggleLoop"
							:class="{ active: isLooped }"
							class="control-btn"
						>
							<i class="fas fa-repeat"></i>
						</button>
					</div>

					<div class="progress-container">
						<span class="time-display">{{ formatTime(currentTime) }}</span>
						<input
							type="range"
							min="0"
							:max="duration || 100"
							:value="currentTime"
							@input="onProgressChange"
							class="progress-slider"
						/>
						<span class="time-display">{{ formatTime(duration) }}</span>
					</div>
				</div>

				<div class="volume-control">
					<i class="fas fa-volume-down"></i>
					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						:value="volume"
						@input="onVolumeChange"
						class="volume-slider"
					/>
					<i class="fas fa-volume-up"></i>
				</div>
			</div>
		</div>

		<!-- Error/info message -->
		<div
			v-if="errorMessage"
			:class="['error-message', { info: messageIsInfo }]"
		>
			{{ errorMessage }}
			<button @click="dismissError" class="dismiss-btn">
				<i class="fas fa-times"></i>
			</button>
		</div>

		<!-- Hidden audio element -->
		<audio
			ref="audioElement"
			@ended="handleTrackEnd"
			@timeupdate="updateTime"
			@loadedmetadata="updateDuration"
			@play="updatePlaying(true)"
			@pause="updatePlaying(false)"
			@error="handleAudioError"
		></audio>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, onUnmounted } from 'vue';
import * as mm from 'music-metadata';
import HeaderComponent from '@/components/media/HeaderComponent.vue';
import ButtonText from '@/components/ui/ButtonText.vue';
import {
	EMusicCategory,
	TMusic,
	FileSystemDirectoryHandle,
	FileSystemFileHandle,
} from '@/types';

// Audio player refs and state
const audioElement = ref<HTMLAudioElement | null>(null);
const audioFiles = ref<TMusic[]>([]);
const currentTrackIndex = ref(-1);
const trackDurations = ref<number[]>([]);
const isShuffled = ref(false);
const isLooped = ref(false);
const defaultCoverArt = '/default-cover.jpg'; // Default cover art path
const errorMessage = ref('');
const messageIsInfo = ref(false);

// Track the original order when shuffle is enabled
const originalOrder = ref<number[]>([]);
const shuffledOrder = ref<number[]>([]);

// Media controls (our own implementation instead of useMediaControls)
const playing = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);

// Add a ref for the track list element
const trackListRef = ref<HTMLElement | null>(null);

// Toggle this to true to use mock data, false to revert to folder selection
const useMockData = ref(false);

// Window width tracking for responsive layout
const windowWidth = ref(window.innerWidth);
const updateWindowWidth = () => {
	windowWidth.value = window.innerWidth;
};

// Add resize event listener
onMounted(() => {
	window.addEventListener('resize', updateWindowWidth);

	// Load mock data if flag is enabled
	if (useMockData.value) {
		loadMockData();
	}
});

// Remove event listener on component unmount
onUnmounted(() => {
	window.removeEventListener('resize', updateWindowWidth);
});

// Sorted playlist
const sortedPlaylist = computed(() => {
	if (audioFiles.value.length === 0) {
		return [];
	}

	// Use shuffled order if shuffle is enabled
	if (isShuffled.value && shuffledOrder.value.length > 0) {
		return shuffledOrder.value.map(index => audioFiles.value[index]);
	}

	// Otherwise use original order
	return audioFiles.value;
});

// Map to track the original indices
const originalIndices = computed(() => {
	if (audioFiles.value.length === 0) {
		return [];
	}

	// Use shuffled order if shuffle is enabled
	if (isShuffled.value && shuffledOrder.value.length > 0) {
		return shuffledOrder.value;
	}

	// Otherwise use original order
	return audioFiles.value.map((_, i) => i);
});

// Error handling
const handleAudioError = (e: Event) => {
	console.error('Audio error:', e);
	errorMessage.value = 'Error playing track. Try another file.';

	// Since this track failed, try the next one after a short delay
	setTimeout(() => {
		nextTrack();
	}, 2000);
};

const dismissError = () => {
	errorMessage.value = '';
	messageIsInfo.value = false;
};

// Update media state handlers
const updateTime = () => {
	if (audioElement.value) {
		currentTime.value = audioElement.value.currentTime;
	}
};

const updateDuration = () => {
	if (audioElement.value && !isNaN(audioElement.value.duration)) {
		duration.value = audioElement.value.duration;

		// Update the track duration in our list if it's different from what we estimated
		if (currentTrackIndex.value >= 0 && audioFiles.value.length > 0) {
			// Only update if it's significantly different (e.g., our estimate was way off)
			const diffThreshold = 10; // 10 seconds threshold
			const currentDuration =
				trackDurations.value[currentTrackIndex.value] || 0;

			if (Math.abs(currentDuration - duration.value) > diffThreshold) {
				trackDurations.value[currentTrackIndex.value] = duration.value;

				// Also update the duration metadata of the current track
				if (audioFiles.value[currentTrackIndex.value]) {
					audioFiles.value[currentTrackIndex.value].duration = duration.value;
				}
			}
		}
	}
};

const updatePlaying = (isPlaying: boolean) => {
	playing.value = isPlaying;
};

// Current track computed property
const currentTrack = computed(() => {
	if (currentTrackIndex.value >= 0 && audioFiles.value.length > 0) {
		return audioFiles.value[currentTrackIndex.value];
	}
	return null;
});

// Polyfill for File System Access API
const openFileSelector = async () => {
	return new Promise<File[]>(resolve => {
		try {
			const input = document.createElement('input');
			input.type = 'file';
			input.multiple = true;
			input.accept = 'audio/*';

			input.onchange = () => {
				if (input.files && input.files.length > 0) {
					resolve(Array.from(input.files));
				} else {
					resolve([]);
				}
			};

			// Make sure this doesn't get garbage collected before the user interacts with it
			document.body.appendChild(input);
			input.style.display = 'none';
			input.click();

			// Remove it after selection
			setTimeout(() => {
				document.body.removeChild(input);
			}, 5000);
		} catch (e) {
			console.error('Error opening file selector:', e);
			resolve([]);
		}
	});
};

// Extract metadata from audio file
const extractAudioMetadata = async (
	file: File,
	fileUrl: string
): Promise<TMusic> => {
	// Default metadata
	const metadata: TMusic = {
		title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
		artist: 'Unknown Artist',
		category: EMusicCategory.OTHER,
		favourites: false,
		imageURL: defaultCoverArt,
		link: fileUrl,
		owner: 'local',
	};

	try {
		// Use music-metadata to parse the file
		const parsedMetadata = await mm.parseBlob(file);

		// Extract common metadata if available
		if (parsedMetadata.common) {
			const common = parsedMetadata.common;

			// Basic metadata
			if (common.title) metadata.title = common.title;
			if (common.artist) metadata.artist = common.artist;
			if (common.album) metadata.album = common.album;
			if (common.year) metadata.year = common.year.toString();
			if (common.genre && common.genre.length > 0)
				metadata.genre = common.genre[0];
			if (common.track) metadata.trackNumber = common.track.no || undefined;

			// Extract album art
			if (common.picture && common.picture.length > 0) {
				const picture = common.picture[0];
				const blob = new Blob([picture.data], { type: picture.format });
				metadata.imageURL = URL.createObjectURL(blob);
			}
		}

		// Format-specific metadata
		if (parsedMetadata.format) {
			if (parsedMetadata.format.duration)
				metadata.duration = parsedMetadata.format.duration;
			if (parsedMetadata.format.bitrate)
				metadata.bitrate = parsedMetadata.format.bitrate;
			if (parsedMetadata.format.sampleRate)
				metadata.sampleRate = parsedMetadata.format.sampleRate;
			if (parsedMetadata.format.codec)
				metadata.codec = parsedMetadata.format.codec;
		}

		// If no picture was found in the metadata, assign a default based on genre
		if (metadata.imageURL === defaultCoverArt && metadata.genre) {
			const genre = metadata.genre.toLowerCase();
			if (genre.includes('rock')) {
				metadata.imageURL =
					'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=300';
			} else if (genre.includes('pop')) {
				metadata.imageURL =
					'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300';
			} else if (genre.includes('jazz')) {
				metadata.imageURL =
					'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=300';
			} else if (genre.includes('classical')) {
				metadata.imageURL =
					'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=300';
			} else if (genre.includes('electronic')) {
				metadata.imageURL =
					'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=300';
			} else if (genre.includes('hip hop') || genre.includes('rap')) {
				metadata.imageURL =
					'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300';
			}
		}

		// If still using default and we have an album name, try to generate an album art
		if (metadata.imageURL === defaultCoverArt && metadata.album) {
			// Create a canvas to generate album art
			const canvas = document.createElement('canvas');
			canvas.width = 300;
			canvas.height = 300;
			const ctx = canvas.getContext('2d');

			if (ctx) {
				// Generate a random color based on the album name
				const hash = metadata.album.split('').reduce((acc, char) => {
					return char.charCodeAt(0) + ((acc << 5) - acc);
				}, 0);

				const r = (hash & 0xff0000) >> 16;
				const g = (hash & 0x00ff00) >> 8;
				const b = hash & 0x0000ff;

				// Fill background
				ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
				ctx.fillRect(0, 0, 300, 300);

				// Add album name
				ctx.fillStyle = 'white';
				ctx.font = 'bold 30px Arial';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				// Handle long album names
				let displayAlbum = metadata.album;
				if (displayAlbum.length > 20) {
					displayAlbum = displayAlbum.substring(0, 17) + '...';
				}

				ctx.fillText(displayAlbum, 150, 130);

				// Add artist name if available
				if (metadata.artist !== 'Unknown Artist') {
					ctx.font = '20px Arial';

					let displayArtist = metadata.artist;
					if (displayArtist.length > 25) {
						displayArtist = displayArtist.substring(0, 22) + '...';
					}

					ctx.fillText(displayArtist, 150, 180);
				}

				// Convert to data URL
				metadata.imageURL = canvas.toDataURL('image/jpeg');
			}
		}
	} catch (error) {
		console.error('Error extracting metadata:', error);

		// Fall back to filename parsing if music-metadata fails
		try {
			// Try to extract metadata from filename
			// Common pattern: Artist - Title
			const fileNameParts = file.name.replace(/\.[^/.]+$/, '').split(' - ');
			if (fileNameParts.length >= 2) {
				metadata.artist = fileNameParts[0].trim();
				metadata.title = fileNameParts[1].trim();

				// Check if there's album info in brackets
				const albumMatch = metadata.title.match(/\[(.*?)\]/);
				if (albumMatch && albumMatch[1]) {
					metadata.album = albumMatch[1];
					metadata.title = metadata.title.replace(/\[.*?\]/, '').trim();
				}
			}

			// Try to extract year from filename (4 digit number)
			const yearMatch = file.name.match(/\b(19|20)\d{2}\b/);
			if (yearMatch && yearMatch[0]) {
				metadata.year = yearMatch[0];
			}
		} catch (e) {
			// Just use default metadata in worst case
			console.error('Fallback metadata extraction failed:', e);
		}
	}

	return metadata;
};

// Select folder handler (using file input as fallback)
const selectFolder = async () => {
	try {
		let usedFallback = false;
		let files: TMusic[] = [];
		let durations: number[] = [];

		// Try to use File System Access API if available
		if ('showDirectoryPicker' in window) {
			try {
				const dirHandle = await window.showDirectoryPicker();

				// Process all files in the directory
				for await (const entry of dirHandle.values()) {
					// Check if it's a file and has audio extension
					if (entry.kind === 'file' && isAudioFile(entry.name)) {
						const file = await entry.getFile();
						const fileUrl = URL.createObjectURL(file);

						// Extract metadata
						const metadata = await extractAudioMetadata(file, fileUrl);
						files.push(metadata);

						// Get duration
						const duration =
							metadata.duration || (await getAudioDuration(fileUrl));
						durations.push(duration);
					}
				}
			} catch (error) {
				console.warn(
					'Directory picker failed, falling back to file input:',
					error
				);
				usedFallback = true;
			}
		} else {
			usedFallback = true;
		}

		// Fallback to regular file input if needed
		if (usedFallback || files.length === 0) {
			console.log('Using file input fallback...');
			const selectedFiles = await openFileSelector();

			files = [];
			durations = [];

			for (const file of selectedFiles) {
				if (isAudioFile(file.name)) {
					const fileUrl = URL.createObjectURL(file);

					// Extract metadata
					const metadata = await extractAudioMetadata(file, fileUrl);
					files.push(metadata);

					// Get duration
					const duration =
						metadata.duration || (await getAudioDuration(fileUrl));
					durations.push(duration);
				}
			}
		}

		// Set the files if we found any
		if (files.length > 0) {
			setAudioFiles(files, durations);
		} else {
			console.warn('No audio files were selected or found in the directory');
		}
	} catch (error) {
		console.error('Error selecting folder:', error);
	}
};

// Set audio files and initialize player
const setAudioFiles = (files: TMusic[], durations: number[]) => {
	// Update state with the files
	audioFiles.value = files;
	trackDurations.value = durations;

	// Initialize the original order
	originalOrder.value = Array.from({ length: files.length }, (_, i) => i);

	// Play the first track if we have files
	if (files.length > 0) {
		currentTrackIndex.value = 0;
		playTrack(0);

		// Scroll to the first track after a short delay to ensure DOM is ready
		setTimeout(scrollToActiveSong, 300);
	}
};

// Check if a file is an audio file based on extension
const isAudioFile = (filename: string): boolean => {
	const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.flac', '.aac'];
	return audioExtensions.some(ext => filename.toLowerCase().endsWith(ext));
};

// Get audio duration (with error handling)
const getAudioDuration = (url: string): Promise<number> => {
	return new Promise(resolve => {
		const audio = new Audio();

		// Set timeout in case audio loading takes too long
		const timeout = setTimeout(() => {
			console.warn('Audio duration fetch timed out, using default');
			resolve(180); // Default to 3 minutes
		}, 5000);

		audio.onloadedmetadata = () => {
			clearTimeout(timeout);
			resolve(audio.duration);
		};

		audio.onerror = () => {
			clearTimeout(timeout);
			console.warn('Error getting audio duration, using default');
			resolve(180); // Default to 3 minutes
		};

		audio.src = url;
	});
};

// Format time in seconds to MM:SS
const formatTime = (timeInSeconds: number): string => {
	if (!timeInSeconds) return '0:00';

	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = Math.floor(timeInSeconds % 60);
	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Play a specific track by index
const playTrack = (index: number) => {
	// Get the original index (in case we're using shuffled order)
	const originalIndex = originalIndices.value[index];

	if (originalIndex >= 0 && originalIndex < audioFiles.value.length) {
		currentTrackIndex.value = originalIndex;
		if (audioElement.value) {
			try {
				// Clear any previous error
				errorMessage.value = '';

				// Set the source and play
				audioElement.value.src = audioFiles.value[originalIndex].link;
				audioElement.value.load();

				const playPromise = audioElement.value.play();

				// Handle play promise (required for modern browsers)
				if (playPromise !== undefined) {
					playPromise.catch(error => {
						console.error('Play error:', error);
						errorMessage.value = `Couldn't play track: ${error.message || 'Unknown error'}`;
					});
				}
			} catch (error) {
				console.error('Error starting playback:', error);
				errorMessage.value = 'Error starting playback';
			}
		}
	}
};

// Toggle play/pause
const togglePlay = () => {
	if (!audioElement.value) return;

	if (playing.value) {
		audioElement.value.pause();
	} else {
		audioElement.value.play();
	}
};

// Go to next track
const nextTrack = () => {
	if (audioFiles.value.length === 0) return;

	// Find the index of the currently playing track in the playlist
	const currentIndex = originalIndices.value.indexOf(currentTrackIndex.value);
	const nextIndex = (currentIndex + 1) % originalIndices.value.length;

	// Play the next track
	playTrack(nextIndex);
};

// Go to previous track
const previousTrack = () => {
	if (audioFiles.value.length === 0) return;

	// If we're more than 3 seconds into the track, restart it instead of going to previous
	if (currentTime.value > 3) {
		if (audioElement.value) {
			audioElement.value.currentTime = 0;
		}
		return;
	}

	// Find the index of the currently playing track in the playlist
	const currentIndex = originalIndices.value.indexOf(currentTrackIndex.value);
	const prevIndex =
		(currentIndex - 1 + originalIndices.value.length) %
		originalIndices.value.length;

	// Play the previous track
	playTrack(prevIndex);
};

// Handle track end
const handleTrackEnd = () => {
	if (isLooped.value) {
		// Replay the current track
		if (audioElement.value) {
			audioElement.value.currentTime = 0;
			audioElement.value.play();
		}
	} else {
		// Go to next track
		nextTrack();
	}
};

// Toggle shuffle mode
const toggleShuffle = () => {
	isShuffled.value = !isShuffled.value;

	if (isShuffled.value) {
		// Create a shuffled order
		shuffledOrder.value = [...originalOrder.value];
		// Fisher-Yates shuffle algorithm
		for (let i = shuffledOrder.value.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledOrder.value[i], shuffledOrder.value[j]] = [
				shuffledOrder.value[j],
				shuffledOrder.value[i],
			];
		}

		// Display a message about shuffle mode
		if (audioFiles.value.length > 0) {
			showInfoMessage('Shuffle mode enabled. Next song will be random.');

			// Scroll to show the active song in the new order
			setTimeout(scrollToActiveSong, 100);
		}
	} else {
		// Display a message about normal mode
		if (audioFiles.value.length > 0) {
			showInfoMessage('Playing songs in original order.');

			// Scroll to show the active song in the new order
			setTimeout(scrollToActiveSong, 100);
		}
	}
};

// Show an informational message
const showInfoMessage = (message: string, duration = 2000) => {
	errorMessage.value = message;
	messageIsInfo.value = true;

	setTimeout(() => {
		if (errorMessage.value === message) {
			errorMessage.value = '';
			messageIsInfo.value = false;
		}
	}, duration);
};

// Toggle loop mode
const toggleLoop = () => {
	isLooped.value = !isLooped.value;
};

// Handle progress change from slider
const onProgressChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (audioElement.value) {
		audioElement.value.currentTime = Number(target.value);
	}
};

// Handle volume change from slider
const onVolumeChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	volume.value = Number(target.value);

	if (audioElement.value) {
		audioElement.value.volume = volume.value;
	}
};

// Set initial volume when audio element is available
onMounted(() => {
	if (audioElement.value) {
		audioElement.value.volume = volume.value;
	}
});

// Watch for volume changes
watch(volume, newVolume => {
	if (audioElement.value) {
		audioElement.value.volume = newVolume;
	}
});

// Get filename from URL or file path
const getFilename = (url: string): string => {
	try {
		// For blob URLs, extract the last part or generate a name
		if (url.startsWith('blob:')) {
			// Try to find a filename in the original file object
			const currentTrack = audioFiles.value[currentTrackIndex.value];
			if (currentTrack && currentTrack.title) {
				// Try to recreate a filename based on metadata
				let filename = currentTrack.title;
				if (currentTrack.artist && currentTrack.artist !== 'Unknown Artist') {
					filename = `${currentTrack.artist} - ${filename}`;
				}
				return filename;
			}

			// If all else fails, return a placeholder
			return 'audio-file';
		}

		// For file URLs, extract the filename
		const urlObj = new URL(url);
		const pathname = urlObj.pathname;
		const segments = pathname.split('/');
		return decodeURIComponent(segments[segments.length - 1]);
	} catch (e) {
		// If parsing fails, try to extract from the URL string directly
		try {
			const parts = url.split('/');
			return parts[parts.length - 1];
		} catch (err) {
			return 'Unknown file';
		}
	}
};

// Function to scroll to the currently active song
const scrollToActiveSong = () => {
	if (!trackListRef.value) return;

	// Find the index of the currently playing track in the playlist
	const currentIndex = originalIndices.value.indexOf(currentTrackIndex.value);
	if (currentIndex < 0) return;

	// Find the active track element
	const activeTrack = trackListRef.value.children[currentIndex] as HTMLElement;
	if (!activeTrack) return;

	// Scroll to the active track with smooth animation
	activeTrack.scrollIntoView({
		behavior: 'smooth',
		block: 'center',
	});
};

// Watch for changes to currentTrackIndex and scroll to the active song
watch(currentTrackIndex, () => {
	// Small delay to ensure DOM is updated
	setTimeout(scrollToActiveSong, 100);
});

// Mock data for development and styling
const loadMockData = () => {
	const mockFiles: TMusic[] = [
		{
			title: 'Starlight',
			artist: 'Stellardrone',
			album: 'Light Years',
			year: '2022',
			genre: 'Electronic',
			category: EMusicCategory.OTHER,
			favourites: false,
			imageURL:
				'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=300',
			link: 'https://example.com/audio1.mp3',
			owner: 'local',
			bitrate: 320000,
			codec: 'MP3',
			duration: 240,
		},
		{
			title: 'Ocean Waves',
			artist: 'Aquatic Dreams',
			album: 'Deep Blue',
			year: '2021',
			genre: 'Ambient',
			category: EMusicCategory.OTHER,
			favourites: true,
			imageURL:
				'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300',
			link: 'https://example.com/audio2.mp3',
			owner: 'local',
			bitrate: 256000,
			codec: 'AAC',
			duration: 180,
		},
		{
			title: 'Mountain Echo',
			artist: 'Nature Sound',
			album: 'Wilderness',
			year: '2020',
			genre: 'Folk',
			category: EMusicCategory.OTHER,
			favourites: false,
			imageURL:
				'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=300',
			link: 'https://example.com/audio3.mp3',
			owner: 'local',
			bitrate: 192000,
			codec: 'FLAC',
			duration: 320,
		},
		{
			title: 'Urban Rhythm',
			artist: 'City Pulse',
			album: 'Downtown',
			year: '2019',
			genre: 'Hip Hop',
			category: EMusicCategory.OTHER,
			favourites: false,
			imageURL:
				'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300',
			link: 'https://example.com/audio4.mp3',
			owner: 'local',
			bitrate: 320000,
			codec: 'MP3',
			duration: 210,
		},
		{
			title: 'Desert Wind',
			artist: 'Sand Dunes',
			album: 'Horizon',
			year: '2023',
			genre: 'World',
			category: EMusicCategory.OTHER,
			favourites: true,
			imageURL:
				'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?q=80&w=300',
			link: 'https://example.com/audio5.mp3',
			owner: 'local',
			bitrate: 256000,
			codec: 'OGG',
			duration: 280,
		},
		{
			title: 'Desert Wind',
			artist: 'Sand Dunes',
			album: 'Horizon',
			year: '2023',
			genre: 'World',
			category: EMusicCategory.OTHER,
			favourites: true,
			imageURL:
				'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?q=80&w=300',
			link: 'https://example.com/audio5.mp3',
			owner: 'local',
			bitrate: 256000,
			codec: 'OGG',
			duration: 280,
		},
		{
			title: 'Desert Wind',
			artist: 'Sand Dunes',
			album: 'Horizon',
			year: '2023',
			genre: 'World',
			category: EMusicCategory.OTHER,
			favourites: true,
			imageURL:
				'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?q=80&w=300',
			link: 'https://example.com/audio5.mp3',
			owner: 'local',
			bitrate: 256000,
			codec: 'OGG',
			duration: 280,
		},
		{
			title: 'Desert Wind',
			artist: 'Sand Dunes',
			album: 'Horizon',
			year: '2023',
			genre: 'World',
			category: EMusicCategory.OTHER,
			favourites: true,
			imageURL:
				'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?q=80&w=300',
			link: 'https://example.com/audio5.mp3',
			owner: 'local',
			bitrate: 256000,
			codec: 'OGG',
			duration: 280,
		},
		{
			title: 'Desert Wind',
			artist: 'Sand Dunes',
			album: 'Horizon',
			year: '2023',
			genre: 'World',
			category: EMusicCategory.OTHER,
			favourites: true,
			imageURL:
				'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?q=80&w=300',
			link: 'https://example.com/audio5.mp3',
			owner: 'local',
			bitrate: 256000,
			codec: 'OGG',
			duration: 280,
		},
		{
			title: 'Desert Wind',
			artist: 'Sand Dunes',
			album: 'Horizon',
			year: '2023',
			genre: 'World',
			category: EMusicCategory.OTHER,
			favourites: true,
			imageURL:
				'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?q=80&w=300',
			link: 'https://example.com/audio5.mp3',
			owner: 'local',
			bitrate: 256000,
			codec: 'OGG',
			duration: 280,
		},
		{
			title: 'Desert Wind',
			artist: 'Sand Dunes',
			album: 'Horizon',
			year: '2023',
			genre: 'World',
			category: EMusicCategory.OTHER,
			favourites: true,
			imageURL:
				'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?q=80&w=300',
			link: 'https://example.com/audio5.mp3',
			owner: 'local',
			bitrate: 256000,
			codec: 'OGG',
			duration: 280,
		},
	];

	const mockDurations = mockFiles.map(file => file.duration || 180);

	// Set the mock data
	audioFiles.value = mockFiles;
	trackDurations.value = mockDurations;

	// Initialize the original order
	originalOrder.value = Array.from({ length: mockFiles.length }, (_, i) => i);

	// Set the first track as current
	currentTrackIndex.value = 0;

	// Show info message
	showInfoMessage('Mock data loaded for styling purposes', 3000);
};
</script>

<style scoped>
.music-page {
	display: flex;
	flex-direction: column;
	height: calc(100vh - 100px);
	background-color: var(--bg-primary-dark);
	color: var(--text-color);
	position: relative;
	overflow: hidden;
}

@media (max-width: 960px) {
	.music-page {
		margin-top: -10px;
	}
}

.music-container {
	flex: 1;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	height: calc(100% - 70px); /* Account for player controls (70px) */
}

@media (max-width: 960px) {
	.music-container {
		padding-bottom: 30px;
	}
}

/* Folder selection styles */
.folder-selection {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	text-align: center;
	padding: 40px 0;
}

.folder-prompt {
	max-width: 400px;
	padding: 30px;
	border-radius: 10px;
	background-color: var(--bg-primary-medium);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.folder-prompt h2 {
	margin-bottom: 15px;
	font-size: 24px;
	color: var(--text-color);
}

.folder-prompt p {
	margin-bottom: 25px;
	color: #b3b3b3;
}

/* Layout for player and playlist */
.player-layout {
	display: flex;
	flex-direction: column;
	gap: 15px;
	flex: 1;
	overflow: hidden;
	min-height: 0;
	max-height: 100%;
}

@media (min-width: 1024px) {
	.player-layout {
		display: grid;
		grid-template-columns: 400px 1fr; /* Fixed width for Now Playing, rest for playlist */
		gap: 20px;
	}
}

/* Now Playing section */
.now-playing {
	background-color: var(--bg-primary-medium);
	border-radius: 10px;
	padding: 12px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	max-height: 100%;
}

.now-playing-horizontal {
	display: flex;
	flex-direction: column;
}

@media (min-width: 1024px) {
	.now-playing {
		padding: 20px;
		overflow-y: auto;
	}
}

/* Mobile optimizations for Now Playing */
@media (max-width: 767px) {
	.now-playing {
		/* padding: 10px; */
		max-height: min-content;
	}

	.section-title {
		margin-bottom: 10px;
	}
	
	.track-info {
		gap: 10px;
	}

	.cover-art {
		width: 150px;
		height: 150px;
	}

	.track-details .title {
		font-size: 18px;
		margin-bottom: 4px;
	}

	.track-details .artist {
		font-size: 14px;
		margin-bottom: 3px;
	}

	.track-details .album {
		font-size: 12px;
		margin-bottom: 6px;
	}

	.additional-meta {
		gap: 6px;
		margin-top: 8px;
		margin-bottom: 8px;
	}

	.additional-meta p {
		font-size: 11px;
		padding: 3px 6px;
	}

	.filename {
		margin-top: 6px;
		font-size: 10px;
		padding: 4px 8px;
	}
}

.section-title {
	font-size: 20px;
	margin-bottom: 15px;
	color: var(--text-color);
	font-weight: 700;
}

@media (min-width: 768px) {
	.section-title {
		font-size: 24px;
		margin-bottom: 20px;
	}
}

.track-info {
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-items: center;
}

.track-info-horizontal {
	flex-direction: row !important;
	align-items: flex-start !important;
	gap: 20px;
}

.track-info-horizontal .additional-meta {
	justify-content: flex-start;
	margin-top: 8px;
	margin-bottom: 8px;
}

.track-info-horizontal .filename {
	margin-left: 0;
	margin-right: auto;
	margin-top: 5px;
}

.cover-art {
	position: relative;
	width: 180px;
	height: 180px;
	overflow: hidden;
	border-radius: 8px;
	flex-shrink: 0;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
	margin: 0 auto;
}

.cover-art-small {
	width: 100px !important;
	height: 100px !important;
	margin: 0 !important;
}

@media (min-width: 768px) {
	.cover-art {
		width: 220px;
		height: 220px;
	}
}

@media (min-width: 1024px) {
	.cover-art {
		width: 250px;
		height: 250px;
		margin: 0 auto;
	}
}

.cover-art img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.3s ease;
}

.playback-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: all 0.3s ease;
	cursor: pointer;
}

.playback-overlay i {
	font-size: 40px;
	color: white;
	filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5));
}

@media (min-width: 768px) {
	.playback-overlay i {
		font-size: 50px;
	}
}

.cover-art:hover .playback-overlay {
	background-color: rgba(0, 0, 0, 0.3);
	opacity: 1;
}

.cover-art:hover img {
	transform: scale(1.05);
}

.track-details {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.track-details-horizontal {
	align-items: flex-start !important;
	text-align: left !important;
}

.track-details .title {
	font-size: 20px;
	margin-bottom: 6px;
	font-weight: 700;
	color: var(--text-color);
}

@media (min-width: 768px) {
	.track-details .title {
		font-size: 24px;
		margin-bottom: 8px;
	}
}

@media (min-width: 1024px) {
	.track-details .title {
		font-size: 28px;
	}
}

.track-details .artist {
	color: var(--link-color);
	font-size: 16px;
	margin-bottom: 4px;
	font-weight: 500;
}

@media (min-width: 768px) {
	.track-details .artist {
		font-size: 18px;
		margin-bottom: 5px;
	}
}

.track-details .album {
	color: #b3b3b3;
	font-size: 14px;
	margin-bottom: 8px;
	display: flex;
	align-items: center;
	gap: 5px;
}

@media (min-width: 768px) {
	.track-details .album {
		font-size: 16px;
		margin-bottom: 10px;
		gap: 7px;
	}
}

.additional-meta {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 10px;
	margin-bottom: 10px;
	justify-content: center;
}

@media (min-width: 768px) {
	.additional-meta {
		gap: 10px;
		margin-top: 15px;
		margin-bottom: 15px;
	}
}

.additional-meta p {
	color: var(--text-color);
	font-size: 12px;
	background-color: var(--bg-secondary-medium);
	padding: 4px 8px;
	border-radius: 15px;
	display: flex;
	align-items: center;
	gap: 4px;
}

@media (min-width: 768px) {
	.additional-meta p {
		font-size: 13px;
		padding: 5px 10px;
		gap: 5px;
	}
}

.additional-meta i {
	color: var(--link-color);
	font-size: 11px;
}

@media (min-width: 768px) {
	.additional-meta i {
		font-size: 12px;
	}
}

.filename {
	margin-top: 8px;
	color: #b3b3b3;
	font-size: 11px;
	background-color: var(--bg-primary-dark);
	padding: 6px 10px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	gap: 6px;
	font-family: monospace;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100%;
	width: fit-content;
	margin-left: auto;
	margin-right: auto;
}

@media (min-width: 768px) {
	.filename {
		margin-top: 10px;
		font-size: 12px;
		padding: 8px 12px;
		gap: 8px;
	}
}

.filename i {
	color: var(--link-color);
}

/* Playlist styles */
.playlist {
	background-color: var(--bg-primary-medium);
	border-radius: 10px;
	padding: 15px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 0;
	overflow: hidden;
}

@media (min-width: 768px) {
	.playlist {
		padding: 20px;
	}
}

@media (max-width: 1024px) {
	.playlist {
		/* margin-bottom: 20px; */
	}
}

.playlist-table {
	position: relative;
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	min-height: 0;
}

.playlist-header {
	display: grid;
	grid-template-columns: 50px 2fr 1fr 1fr 100px;
	padding: 10px;
	border-bottom: 1px solid var(--bg-secondary-medium);
	color: #8892b0;
	font-size: 12px;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
	position: sticky;
	top: 0;
	background-color: var(--bg-primary-medium);
	z-index: 1;
}

@media (max-width: 768px) {
	.playlist-header {
		grid-template-columns: 40px 3fr 80px;
	}
	
	.playlist-header .track-artist,
	.playlist-header .track-album {
		display: none;
	}
}

.track-list {
	flex: 1;
	overflow-y: auto;
	padding-right: 5px;
	scroll-behavior: smooth;
	max-height: 100%;
}

/* Use global scrollbar styles */
.track-item {
	display: grid;
	grid-template-columns: 50px 2fr 1fr 1fr 100px;
	align-items: center;
	padding: 10px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;
	border-bottom: 1px solid var(--bg-secondary-medium);
}

@media (max-width: 768px) {
	.track-item {
		grid-template-columns: 40px 3fr 80px;
	}
	
	.track-item .track-artist,
	.track-item .track-album {
		display: none;
	}
}

.track-item.active {
	background-color: var(--bg-primary-light);
}

.track-number {
	color: #8892b0;
	font-size: 14px;
	text-align: center;
}

.playing-icon {
	color: var(--link-color);
	animation: pulse 1.5s infinite;
}

.track-thumbnail {
	width: 30px;
	height: 30px;
	border-radius: 4px;
	margin-right: 12px;
	object-fit: cover;
}

.track-title {
	display: flex;
	align-items: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: 500;
	color: var(--text-color);
}

.track-artist,
.track-album {
	color: #8892b0;
	font-size: 14px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.track-duration {
	color: #8892b0;
	font-size: 14px;
	text-align: right;
}

/* Fixed player controls at bottom */
.fixed-player-controls {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: var(--bg-primary-dark);
	border-top: 1px solid var(--bg-secondary-medium);
	padding: 8px 0;
	display: flex;
	justify-content: center;
	z-index: 1000;
	height: 70px;
}

@media (max-width: 768px) {
	.fixed-player-controls {
		height: auto;
		padding: 10px 0;
	}
}

.player-controls-inner {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin: 0 auto;
	padding: 0 20px;
}

@media (max-width: 768px) {
	.player-controls-inner {
		flex-direction: column;
		gap: 10px;
		padding: 0 10px;
	}
	
	.track-info-mini {
		max-width: 100%;
		width: 100%;
		justify-content: center;
		margin-bottom: 5px;
	}
	
	.volume-control {
		max-width: 100%;
		width: 100%;
		justify-content: center;
		order: -1;
		margin-bottom: 5px;
	}
}

@media (min-width: 960px) {
	.player-controls-inner {
		max-width: calc(100% - 56px);
		margin-left: auto;
		margin-right: 0;
	}
}

.track-info-mini {
	display: flex;
	align-items: center;
	gap: 10px;
	flex: 1;
	max-width: 200px;
}

.mini-art {
	width: 50px;
	height: 50px;
	border-radius: 5px;
	object-fit: cover;
}

.mini-details {
	overflow: hidden;
}

.mini-title {
	font-weight: 600;
	font-size: 14px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--text-color);
}

.mini-artist {
	font-size: 12px;
	color: #8892b0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.controls-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 2;
	max-width: 500px;
}

.main-controls {
	display: flex;
	align-items: center;
	gap: 15px;
	margin-bottom: 5px;
}

@media (max-width: 768px) {
	.main-controls {
		gap: 20px;
	}
}

.progress-container {
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
}

@media (max-width: 768px) {
	.progress-container {
		padding: 5px 0;
	}
	
	.progress-slider {
		height: 6px;
	}
	
	.progress-slider::-webkit-slider-thumb {
		width: 16px;
		height: 16px;
	}
}

.progress-slider {
	flex: 1;
	height: 4px;
	-webkit-appearance: none;
	background: var(--bg-secondary-medium);
	border-radius: 2px;
	outline: none;
}

.progress-slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	width: 12px;
	height: 12px;
	background: var(--link-color);
	border-radius: 50%;
	cursor: pointer;
	transition: transform 0.1s;
}

.progress-slider::-webkit-slider-thumb:hover {
	transform: scale(1.2);
}

.time-display {
	font-size: 12px;
	color: #8892b0;
	min-width: 40px;
}

.control-btn {
	background: none;
	border: none;
	color: #8892b0;
	font-size: 16px;
	cursor: pointer;
	transition:
		color 0.3s,
		transform 0.2s;
}

@media (max-width: 768px) {
	.control-btn {
		font-size: 20px;
		padding: 8px;
	}
}

.control-btn:hover {
	color: var(--link-color);
	transform: scale(1.1);
}

.control-btn.active {
	color: var(--link-color);
}

.play-btn {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: var(--link-color);
	color: var(--bg-primary-dark);
	border: none;
	font-size: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition:
		transform 0.2s,
		background-color 0.3s;
}

@media (max-width: 768px) {
	.play-btn {
		width: 50px;
		height: 50px;
		font-size: 20px;
	}
}

.volume-control {
	display: flex;
	align-items: center;
	gap: 10px;
	flex: 1;
	max-width: 200px;
	justify-content: flex-end;
}

.volume-slider {
	width: 80px;
	height: 4px;
	-webkit-appearance: none;
	background: var(--bg-secondary-medium);
	border-radius: 2px;
	outline: none;
}

.volume-slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	width: 12px;
	height: 12px;
	background: var(--link-color);
	border-radius: 50%;
	cursor: pointer;
}

/* Error/info message styles */
.error-message {
	position: fixed;
	bottom: 90px;
	left: 50%;
	transform: translateX(-50%);
	color: white;
	padding: 12px 20px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	z-index: 1000;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	animation: slideUp 0.3s forwards;
}

.error-message.info {
	background-color: var(--bg-secondary-light);
}

.error-message:not(.info) {
	background-color: #e63946;
}

.dismiss-btn {
	background: none;
	border: none;
	color: white;
	font-size: 16px;
	margin-left: 15px;
	cursor: pointer;
	opacity: 0.8;
	transition: opacity 0.3s;
}

.dismiss-btn:hover {
	opacity: 1;
}

@keyframes slideUp {
	from {
		opacity: 0;
		transform: translate(-50%, 20px);
	}
	to {
		opacity: 1;
		transform: translate(-50%, 0);
	}
}

@keyframes pulse {
	0% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0.5;
	}
}

/* Add FontAwesome for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>
