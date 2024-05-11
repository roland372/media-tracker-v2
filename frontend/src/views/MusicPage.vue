<template>
  <HeaderComponent title="Music">
    <section class="d-flex align-center justify-space-between">
      <ButtonText
        @click="handleOpenAddMusicModal"
        color="indigo"
        text="Add Song"
      />
      <div class="px-3 text-color">
        <p>or</p>
      </div>
      <v-text-field
        v-model="musicFetchSearch"
        @click:append-inner="handleFetchMusicSearch"
        @click:clear="handleClearMusicSearch"
        @keydown.enter="handleFetchMusicSearch"
        append-inner-icon="mdi-magnify"
        class="text-color"
        clearable
        density="compact"
        hide-details="auto"
        label="Search for a Song"
        variant="outlined"
      />
      <!-- <ButtonText color="yellow" text="Settings" /> -->
    </section>
    <section v-if="fetchedMusic?.length" class="pt-3">
      <section class="d-flex flex-wrap justify-space-between">
        <div
          v-for="(song, index) in fetchedMusic"
          :key="index"
          class="d-flex flex-fill align-stretch pa-1"
        >
          <div
            class="bg-primary-dark d-flex align-end justify-center flex-grow-1 position-relative rounded"
          >
            <v-card class="media-music-card" variant="text">
              <v-img
                :alt="song.snippet.title"
                class="media-music-img"
                cover
                :src="displayYouTubeImg(song.snippet.thumbnails)"
              />
              <div class="text-start text-color">
                <v-card-title class="mb-n2">{{
                  he.decode(song.snippet.title)
                }}</v-card-title>
                <v-card-subtitle>
                  <div>
                    <b>Link: </b>
                    <a
                      :href="`https://www.youtube.com/watch?v=${song.id.videoId}`"
                      class="link-color"
                      target="_blank"
                      >YouTube</a
                    >
                  </div>
                  <div>
                    <b>Published at: </b>
                    <span>
                      {{
                        new Date(song?.snippet?.publishedAt)
                          .toISOString()
                          .split("T")[0] || ""
                      }}
                    </span>
                  </div>
                </v-card-subtitle>
              </div>
              <v-card-actions class="d-flex justify-start ms-1 mb-1">
                <ButtonText
                  @click="handleOpenAddFetchedMusicModal(song)"
                  color="green"
                  size="small"
                  text="Add Song"
                  type="submit"
                  variant="flat"
                />
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </section>
    </section>
  </HeaderComponent>
  <HeaderComponent title="Favourite Music">
    <h3 v-if="!favouriteMusic.length" class="text-color">
      Not found any items.
    </h3>
    <section v-else class="d-flex flex-wrap justify-space-between">
      <div
        v-for="song in favouriteMusic"
        :key="song.id"
        class="d-flex flex-fill align-stretch pa-1"
      >
        <div
          class="bg-primary-dark d-flex align-end justify-center flex-grow-1 position-relative rounded"
        >
          <v-card class="media-music-card" variant="text">
            <v-img
              @click="handleOpenViewMusicModal(song._id, song)"
              :alt="song.title"
              :class="
                song.imageURL.includes('youtube') ? '' : 'media-music-img'
              "
              :cover="song.imageURL.includes('youtube') ? true : false"
              :src="song.imageURL || placeholderMusicImg"
              style="cursor: pointer"
            />
            <v-icon
              v-if="song.favourites"
              class="image-overlay-icon"
              color="yellow-accent-4"
              icon="mdi-star"
            />
            <div class="text-start text-color pb-4">
              <v-card-title class="mb-n2">{{ song.artist }}</v-card-title>
              <v-card-subtitle> {{ song.title }}</v-card-subtitle>
            </div>
          </v-card>
        </div>
      </div>
    </section>
    <ButtonText
      v-if="favouriteMusicCount.length > 20"
      @click="displayFavouriteMusic"
      :append-icon="
        displayFavouriteMusicFlag === 20
          ? 'mdi-arrow-down-bold'
          : 'mdi-arrow-up-bold'
      "
      class="mt-3"
      color="indigo"
      :text="displayFavouriteMusicFlag === 20 ? 'Display All' : 'Display Less'"
    />
  </HeaderComponent>
  <HeaderComponent title="All Music">
    <v-text-field
      v-model="musicSearch"
      @click:clear="() => (musicSearch = '')"
      clearable
      class="mb-2 text-color"
      density="compact"
      hide-details="auto"
      label="Search for a Song"
      variant="outlined"
    />
    <h3 v-if="!allMusic.length" class="text-color">Not found any items.</h3>
    <section v-else class="d-flex flex-wrap justify-space-between">
      <div
        v-for="song in allMusic"
        :key="song.id"
        class="d-flex flex-fill align-stretch pa-1"
      >
        <div
          class="bg-primary-dark d-flex align-end justify-center flex-grow-1 position-relative rounded"
        >
          <v-card class="media-music-card" variant="text">
            <v-img
              @click="handleOpenViewMusicModal(song._id, song)"
              :alt="song.title"
              :class="
                song.imageURL.includes('youtube') ? '' : 'media-music-img'
              "
              :cover="song.imageURL.includes('youtube') ? true : false"
              :src="song.imageURL || placeholderMusicImg"
              style="cursor: pointer"
            />
            <v-icon
              v-if="song.favourites"
              class="image-overlay-icon"
              color="yellow-accent-4"
              icon="mdi-star"
            />
            <div class="text-start text-color pb-4">
              <v-card-title class="mb-n2">{{ song.artist }}</v-card-title>
              <v-card-subtitle> {{ song.title }}</v-card-subtitle>
            </div>
          </v-card>
        </div>
      </div>
    </section>
    <ButtonText
      v-if="music.length > 20"
      @click="displayMusic"
      :append-icon="
        displayMusicFlag === 20 ? 'mdi-arrow-down-bold' : 'mdi-arrow-up-bold'
      "
      class="mt-3"
      color="indigo"
      :text="displayMusicFlag === 20 ? 'Display All' : 'Display Less'"
    />
  </HeaderComponent>
  <v-dialog v-if="addMusicModal" v-model="addMusicModal" max-width="500"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">Add Song</div>
      <v-form @submit.prevent="handleSubmitAddMusic" validate-on="input">
        <v-card-text>
          <v-text-field
            v-model="newMusic.artist"
            autofocus
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Artist"
            :rules="stringRules('Artist')"
            variant="outlined"
          />
          <v-text-field
            v-model="newMusic.title"
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Title"
            :rules="stringRules('Title')"
            variant="outlined"
          />
          <v-text-field
            v-model="newMusic.link"
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Link"
            :rules="emptyURLRules"
            variant="outlined"
          />
          <v-text-field
            v-model="newMusic.imageURL"
            class="mb-3"
            density="compact"
            hide-details="auto"
            label="Image URL"
            :rules="emptyURLRules"
            variant="outlined"
          />
          <!-- <div class="v-select">
            <label
              for="category"
              :class="{
                'select-text-gray': !selectActive,
                'select-text-black': selectActive,
              }"
              >Category</label
            >
            <select
              id="category"
              v-model="newMusic.category"
              @focus="selectActive = true"
              @blur="selectActive = false"
            >
              <option
                v-for="category in musicCategory"
                :value="category"
                :key="category"
              >
                {{ category }}
              </option>
            </select>
          </div> -->
          <v-select
            v-model="newMusic.category"
            class="mb-n3"
            density="compact"
            :items="musicCategory"
            label="Select Category"
            variant="outlined"
          />
          <section class="d-flex align-center ms-1 mt-n8 mb-n7">
            <div>Add to Favourites?</div>
            <v-checkbox v-model="newMusic.favourites" hide-details />
          </section>
        </v-card-text>
        <v-card-actions class="d-flex justify-start ms-2 mb-2">
          <ButtonText
            color="green"
            text="Add Song"
            type="submit"
            variant="flat"
          />
        </v-card-actions>
      </v-form> </v-card
  ></v-dialog>
  <v-dialog
    v-if="addFetchedMusicModal"
    v-model="addFetchedMusicModal"
    max-width="500"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">Add Song</div>
      <v-form @submit.prevent="handleSubmitAddMusic" validate-on="input">
        <v-card-text>
          <v-text-field
            v-model="newMusic.artist"
            autofocus
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Artist"
            :rules="stringRules('Artist')"
            variant="outlined"
          />
          <v-text-field
            v-model="newMusic.title"
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Title"
            :rules="stringRules('Title')"
            variant="outlined"
          />
          <v-text-field
            v-model="newMusic.link"
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Link"
            :rules="emptyURLRules"
            variant="outlined"
          />
          <v-text-field
            v-model="newMusic.imageURL"
            class="mb-3"
            density="compact"
            hide-details="auto"
            label="Image URL"
            :rules="emptyURLRules"
            variant="outlined"
          />
          <!-- <div class="v-select">
            <label
              for="category"
              :class="{
                'select-text-gray': !selectActive,
                'select-text-black': selectActive,
              }"
              >Category</label
            >
            <select
              id="category"
              v-model="newMusic.category"
              @focus="selectActive = true"
              @blur="selectActive = false"
            >
              <option
                v-for="category in musicCategory"
                :value="category"
                :key="category"
              >
                {{ category }}
              </option>
            </select>
          </div> -->
          <v-select
            v-model="newMusic.category"
            class="mb-n3"
            density="compact"
            :items="musicCategory"
            label="Select Category"
            variant="outlined"
          />
          <section class="d-flex align-center ms-1 mt-n8 mb-n7">
            <div>Add to Favourites?</div>
            <v-checkbox v-model="newMusic.favourites" hide-details />
          </section>
        </v-card-text>
        <v-card-actions class="d-flex justify-start ms-2 mb-2">
          <ButtonText
            color="green"
            text="Add Song"
            type="submit"
            variant="flat"
          />
        </v-card-actions>
      </v-form> </v-card
  ></v-dialog>
  <v-dialog v-if="editMusicModal" v-model="editMusicModal" max-width="500">
    <v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">Edit Song</div>
      <v-form @submit.prevent="handleSubmitEditMusic" validate-on="input">
        <v-card-text>
          <v-text-field
            v-model="musicRef.artist"
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Artist"
            :rules="stringRules('Artist')"
            variant="outlined"
          />
          <v-text-field
            v-model="musicRef.title"
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Title"
            :rules="stringRules('Title')"
            variant="outlined"
          />
          <v-text-field
            v-model="musicRef.link"
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Link"
            :rules="emptyURLRules"
            variant="outlined"
          />
          <v-text-field
            v-model="musicRef.imageURL"
            class="mb-3"
            density="compact"
            hide-details="auto"
            label="Image URL"
            :rules="emptyURLRules"
            variant="outlined"
          />
          <!-- <div class="v-select">
            <label
              for="category"
              :class="{
                'select-text-gray': !selectActive,
                'select-text-black': selectActive,
              }"
              >Category</label
            >
            <select
              id="category"
              v-model="musicRef.category"
              @focus="selectActive = true"
              @blur="selectActive = false"
            >
              <option
                v-for="category in musicCategory"
                :value="category"
                :key="category"
              >
                {{ category }}
              </option>
            </select>
          </div> -->
          <v-select
            v-model="musicRef.category"
            class="mb-n3"
            density="compact"
            :items="musicCategory"
            label="Select Category"
            variant="outlined"
          />
          <section class="d-flex align-center ms-1 mt-n8 mb-n7">
            <div>Add to Favourites?</div>
            <v-checkbox v-model="musicRef.favourites" hide-details />
          </section>
        </v-card-text>
        <v-card-actions class="d-flex justify-start ms-2 mb-2">
          <ButtonText
            color="yellow"
            text="Update"
            type="submit"
            variant="flat"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <v-dialog
    v-if="deleteMusicModal"
    v-model="deleteMusicModal"
    class="delete-dialog-position"
    max-width="300"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        Deleting {{ musicRef.artist }} - {{ musicRef.title }}
      </div>
      <v-card-text>
        <p>Are you sure you want to delete this song?</p>
      </v-card-text>
      <v-card-actions class="d-flex justify-start mb-2 ms-2">
        <ButtonText
          @click="handleDeleteCancel"
          color="yellow"
          text="Cancel"
          variant="flat"
        />
        <ButtonText
          @click="handleDeleteConfirm"
          color="red"
          text="Delete"
          variant="flat"
        />
      </v-card-actions> </v-card
  ></v-dialog>
  <v-dialog v-if="viewMusicModal" v-model="viewMusicModal" max-width="500"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        {{ musicRef.artist }} - {{ musicRef.title }}
      </div>
      <div class="d-sm-flex align-start">
        <v-img
          class="rounded ms-2 me-2 me-sm-0 mt-2"
          :src="musicRef.imageURL || placeholderMusicImg"
        />
        <v-card-text style="max-width: 200px">
          <div><b>Category:</b> {{ musicRef.category }}</div>
          <div>
            <b>Link: </b>
            <a :href="musicRef.link" target="_blank">{{ displayLinkText() }}</a>
          </div>
        </v-card-text>
      </div>
      <v-card-actions class="d-flex justify-start">
        <ButtonText
          @click="handleOpenEditMusicModal"
          color="green"
          text="Edit"
          variant="flat"
        />
        <ButtonText
          @click="handleOpenDeleteMusicModal"
          color="red"
          text="Delete"
          variant="flat"
        />
      </v-card-actions> </v-card
  ></v-dialog>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { filter, orderBy } from "lodash";
import he from "he";
import {
  stringRules,
  emptyURLRules,
  URLRegex,
} from "@/utils/validations/formValidations";
import {
  fetchMusicURL,
  musicCategory,
  placeholderMusicImg,
} from "@/utils/mediaUtils";
import ButtonText from "@/components/ui/ButtonText.vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import { TMusic, TMusicInput, TYouTubeVideo, TThumbnailUrls } from "@/types";
import { EMusicCategory } from "../../../common/types";

const mediaStore = useMediaStore();
const { userFromDB } = mediaStore;
const { music } = storeToRefs(mediaStore);

const newMusic: TMusicInput = reactive({
  artist: "",
  category: EMusicCategory.JAPANESE,
  favourites: false,
  imageURL: "",
  link: "",
  owner: userFromDB?.email as string,
  title: "",
});

const addMusicModal = ref<boolean>(false);
const addFetchedMusicModal = ref<boolean>(false);
const deleteMusicModal = ref<boolean>(false);
const displayMusicFlag = ref<number>(20);
const displayFavouriteMusicFlag = ref<number>(20);
const editMusicModal = ref<boolean>(false);
const fetchedMusic = ref();
const musicID = ref<string>("");
const musicRef = ref<TMusicInput>(newMusic);
const musicFetchSearch = ref<string>("");
const musicSearch = ref<string>("");
// const selectActive = ref<boolean>(false);
const viewMusicModal = ref<boolean>(false);

const allMusic = computed(() =>
  orderBy(music.value, ["artist", "title"], ["asc", "asc"])
    .filter((el) => {
      const searchTermMatch =
        el.artist.toLowerCase().includes(musicSearch.value.toLowerCase()) ||
        el.title.toLowerCase().includes(musicSearch.value.toLowerCase());

      return searchTermMatch;
    })
    .slice(0, displayMusicFlag.value)
);

const favouriteMusic = computed(() =>
  orderBy(filter(music.value, { favourites: true }), ["artist"], ["asc"]).slice(
    0,
    displayFavouriteMusicFlag.value
  )
);

const favouriteMusicCount = computed(() =>
  filter(music.value, { favourites: true })
);

const handleClearMusicSearch = () => {
  musicFetchSearch.value = "";
  fetchedMusic.value = [];
};

const handleDeleteCancel = () => {
  deleteMusicModal.value = false;
};

const handleDeleteConfirm = async () => {
  musicID.value = "";
  deleteMusicModal.value = false;
};

const handleFetchMusicSearch = async () => {
  if (musicFetchSearch.value.length) {
    const fetchMusic = await fetch(fetchMusicURL(musicFetchSearch.value)).then(
      (res) => res.json()
    );

    fetchedMusic.value = fetchMusic.items;
  } else {
    console.log("empty search");
  }
};

const displayLinkText = () => {
  if (musicRef.value.link?.toLowerCase().includes("youtube")) {
    return "YouTube";
  } else if (musicRef.value.link?.toLowerCase().includes("spotify")) {
    return "Spotify";
  } else {
    return "Link";
  }
};

const displayYouTubeImg = (thumbnails: TThumbnailUrls) => {
  if (thumbnails.high.url) return thumbnails.high.url;
  else if (thumbnails.medium.url) return thumbnails.medium.url;
  else return thumbnails.low.url;
};

const displayMusic = () => {
  displayMusicFlag.value === 20
    ? (displayMusicFlag.value = music.value.length)
    : (displayMusicFlag.value = 20);
};

const displayFavouriteMusic = () => {
  displayFavouriteMusicFlag.value === 20
    ? (displayFavouriteMusicFlag.value = favouriteMusicCount.value.length)
    : (displayFavouriteMusicFlag.value = 20);
};

const handleOpenAddMusicModal = () => {
  addMusicModal.value = !addMusicModal.value;
};

const handleOpenAddFetchedMusicModal = (song: TYouTubeVideo) => {
  addFetchedMusicModal.value = !addFetchedMusicModal.value;
  newMusic.title = he.decode(song.snippet.title);
  newMusic.link = `https://www.youtube.com/watch?v=${song.id.videoId}`;
  newMusic.imageURL = displayYouTubeImg(song.snippet.thumbnails);
};

const handleOpenDeleteMusicModal = () => {
  viewMusicModal.value = false;
  deleteMusicModal.value = !deleteMusicModal.value;
};

const handleOpenEditMusicModal = () => {
  viewMusicModal.value = false;
  editMusicModal.value = !editMusicModal.value;

  const updatedMusic: TMusicInput = reactive({
    artist: musicRef.value.artist,
    category: musicRef.value.category,
    favourites: musicRef.value.favourites,
    imageURL: musicRef.value.imageURL,
    link: musicRef.value.link,
    owner: userFromDB?.email as string,
    title: musicRef.value.title,
  });

  musicRef.value = updatedMusic;
};

const handleOpenViewMusicModal = (id: string, song: TMusic) => {
  viewMusicModal.value = !viewMusicModal.value;
  musicRef.value = song;
  musicID.value = id;
};

const handleSubmitAddMusic = async () => {
  if (
    newMusic.artist &&
    newMusic.title &&
    (!newMusic.link || URLRegex.test(String(newMusic.link))) &&
    (!newMusic.imageURL || URLRegex.test(String(newMusic.imageURL)))
  ) {
    addMusicModal.value = false;
    addFetchedMusicModal.value = false;

    newMusic.artist = "";
    newMusic.category = EMusicCategory.JAPANESE;
    newMusic.favourites = false;
    newMusic.imageURL = "";
    newMusic.link = "";
    newMusic.title = "";
  }
};

const handleSubmitEditMusic = async () => {
  if (
    musicRef.value.artist &&
    musicRef.value.title &&
    (!musicRef.value.link || URLRegex.test(String(musicRef.value.link))) &&
    (!musicRef.value.imageURL || URLRegex.test(String(musicRef.value.imageURL)))
  ) {
    editMusicModal.value = false;
  }
};
</script>
<style scoped>
/* .v-select {
  display: inline-block;
  position: relative;
}
.v-select label {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: white;
  padding: 0 5px;
}
.v-select select {
  appearance: none;
  padding: 8px 32px 8px 10px;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  background-image: url("https://cdn.jsdelivr.net/npm/material-design-icons/iconfont/material-icons.css");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 24px;
  background-color: white;
  width: 200px;
}
.select-text-gray {
  color: gray;
}
.select-text-black {
  color: black;
} */
.image-overlay-icon {
  position: absolute;
  right: 5px;
  top: 5px;
}
.delete-dialog-position {
  margin-top: -50vh;
}
.media-music-img {
  height: 260px;
}
.media-music-card {
  width: 350px;
}
@media (max-width: 3250px) {
  .media-music-img {
    height: 260px;
  }
  .media-music-card {
    width: 350px;
  }
}
@media (max-width: 2560px) {
  .media-music-img {
    height: 210px;
  }
  .media-music-card {
    width: 280px;
  }
}
@media (max-width: 2550px) {
  .media-music-img {
    height: 210px;
  }
  .media-music-card {
    width: 280px;
  }
}
@media (max-width: 1920px) {
  .media-music-img {
    height: 205px;
  }
  .media-music-card {
    width: 275px;
  }
}
@media (max-width: 1440px) {
  .media-music-img {
    height: 260px;
  }
  .media-music-card {
    width: 350px;
  }
}
@media (max-width: 1280px) {
  .media-music-img {
    height: 200px;
  }
  .media-music-card {
    width: 270px;
  }
}
@media (max-width: 1024px) {
  .media-music-img {
    height: 270px;
  }
  .media-music-card {
    width: 400px;
  }
}
@media (max-width: 960px) {
  .media-music-img {
    height: 270px;
  }
  .media-music-card {
    width: 370px;
  }
}
@media (max-width: 880px) {
  .media-music-img {
    height: 255px;
  }
  .media-music-card {
    width: 340px;
  }
}
@media (max-width: 768px) {
  .media-music-img {
    height: 230px;
  }
  .media-music-card {
    width: 310px;
  }
}
@media (max-width: 700px) {
  .media-music-img {
    height: 205px;
  }
  .media-music-card {
    width: 275px;
  }
}
@media (max-width: 630px) {
  .media-music-img {
    height: 185px;
  }
  .media-music-card {
    width: 250px;
  }
}
@media (max-width: 580px) {
  .media-music-img {
    height: 155px;
  }
  .media-music-card {
    width: 210px;
  }
}
@media (max-width: 500px) {
  .media-music-img {
    height: 125px;
  }
  .media-music-card {
    width: 170px;
  }
}
@media (max-width: 425px) {
  .media-music-img {
    height: 110px;
  }
  .media-music-card {
    width: 145px;
  }
}
@media (max-width: 375px) {
  .media-music-img {
    height: 90px;
  }
  .media-music-card {
    width: 120px;
  }
}
@media (max-width: 320px) {
  .media-music-img {
    height: 90px;
  }
  .media-music-card {
    width: 120px;
  }
}
</style>
