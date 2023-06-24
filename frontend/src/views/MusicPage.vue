<template>
  <HeaderComponent title="Music">
    <section class="d-flex align-center justify-space-between">
      <ButtonText
        @click="handleOpenAddMusicModal"
        class="me-2"
        color="indigo"
        text="Add Music"
      />
      <ButtonText color="yellow" text="Settings" />
    </section>
  </HeaderComponent>
  <HeaderComponent title="Favourite Music">
    <h3 v-if="!favouriteMusic.length" class="text-color">
      Not found any items.
    </h3>
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
              :alt="song.title"
              :class="
                song.imageURL.includes('youtube') ? null : 'media-music-img'
              "
              :cover="song.imageURL.includes('youtube') ? true : false"
              :src="song.imageURL"
            />
            <div class="text-start text-color pb-4">
              <v-card-title> Top western road trips</v-card-title>
              <v-card-subtitle>
                1,000 miles of wonder
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</v-card-subtitle
              >
            </div>
          </v-card>
        </div>
      </div>
    </section>
  </HeaderComponent>
  <HeaderComponent title="All Music">
    <h3 v-if="!allMusic.length" class="text-color">Not found any items.</h3>
  </HeaderComponent>
  <v-dialog v-if="addMusicModal" v-model="addMusicModal" max-width="500">
    <v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">Add Music</div>
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
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Image URL"
            :rules="emptyURLRules"
            variant="outlined"
          />
          <v-select
            v-model="newMusic.category"
            class="mb-n3"
            density="compact"
            :items="musicCategory"
            label="Select Category"
            variant="outlined"
          />
          <section class="d-flex align-center ms-1 mt-n6 mb-n6">
            <div>Add to Favourites?</div>
            <v-checkbox v-model="newMusic.favourites" hide-details />
          </section>
        </v-card-text>
        <v-card-actions class="d-flex justify-start ms-2 mb-2">
          <ButtonText
            color="green"
            text="Add Music"
            type="submit"
            variant="flat"
          />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <v-dialog v-if="editMusicModal" v-model="editMusicModal" max-width="500">
    <v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        Edit Music
      </div>
      <v-form @submit.prevent="handleSubmitEditMusic" validate-on="input">
        <v-card-text>
          <v-text-field
            v-model="musicRef.artist"
            autofocus
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
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Image URL"
            :rules="emptyURLRules"
            variant="outlined"
          />
          <v-select
            v-model="musicRef.category"
            class="mb-n3"
            density="compact"
            :items="musicCategory"
            label="Select Category"
            variant="outlined"
          />
          <section class="d-flex align-center ms-1 mt-n6 mb-n6">
            <div>Add to Favourites?</div>
            <v-checkbox v-model="musicRef.favourites" hide-details />
          </section>
        </v-card-text>
        <v-card-actions class="d-flex justify-start ms-2 mb-2">
          <ButtonText
            color="green"
            text="Add Music"
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
        <p>Are you sure you want to delete this music?</p>
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
  <v-dialog v-if="viewMusicModal" v-model="viewMusicModal" max-width="300"
    ><v-card>
      <div class="bg-primary-light text-color px-5 py-3 text-h6">
        {{ musicRef.artist }} - {{ musicRef.title }}
      </div>
      <v-card-text>
        <p>Are you sure you want to delete this music?</p>
      </v-card-text>
    </v-card></v-dialog
  >
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { filter, orderBy } from "lodash";
import {
  stringRules,
  emptyURLRules,
  URLRegex,
} from "@/utils/validations/formValidations";
import { musicCategory } from "@/utils/mediaUtils";
import ButtonIcon from "@/components/ui/ButtonIcon.vue";
import ButtonText from "@/components/ui/ButtonText.vue";
import HeaderComponent from "@/components/media/HeaderComponent.vue";
import SnackbarComponent from "@/components/ui/SnackbarComponent.vue";
import { EMusicCategory, TMusic, TMusicInput } from "@/types";

const mediaStore = useMediaStore();
const { submitAddMusic, submitEditMusic, submitDeleteMusic, userFromDB } =
  mediaStore;
const { music } = storeToRefs(mediaStore);

const newMusic: TMusicInput = reactive({
  artist: "",
  category: EMusicCategory.JAPANESE,
  favourites: false,
  imageURL: "",
  lastModified: Date.now(),
  link: "",
  owner: userFromDB?.email as string,
  title: "",
});

const addMusicModal = ref<boolean>(false);
const deleteMusicModal = ref<boolean>(false);
const displayMusicFlag = ref<number>(20);
const editMusicModal = ref<boolean>(false);
const musicID = ref<string>("");
const musicRef = ref<TMusicInput>(newMusic);
const musicSearch = ref<string>("");
const viewMusicModal = ref<boolean>(false);

const snackbar = ref({
  text: "",
  value: false,
});

const allMusic = music.value;
const favouriteMusic = computed(() =>
  orderBy(filter(music.value, { favourites: true }), ["artist"], ["asc"])
);

const handleDeleteCancel = () => {
  deleteMusicModal.value = false;
};

const handleDeleteConfirm = async () => {
  await submitDeleteMusic(musicID.value);
  snackbar.value = { text: "Music Deleted", value: true };
  musicID.value = "";
  deleteMusicModal.value = false;
};

const displayMusic = () => {
  displayMusicFlag.value === 20
    ? (displayMusicFlag.value = music.value.length)
    : (displayMusicFlag.value = 20);
};

const handleOpenAddMusicModal = () => {
  addMusicModal.value = !addMusicModal.value;
};

const handleOpenDeleteMusicModal = (id: string, music: TMusic) => {
  deleteMusicModal.value = !deleteMusicModal.value;

  musicID.value = id;
  musicRef.value = music;
};

const handleOpenEditMusicModal = (id: string, music: TMusic) => {
  editMusicModal.value = !editMusicModal.value;

  const updatedMusic: TMusicInput = reactive({
    artist: music.artist,
    category: music.category,
    favourites: music.favourites,
    imageURL: music.imageURL,
    lastModified: Date.now(),
    link: music.link,
    owner: userFromDB?.email as string,
    title: music.title,
  });
  musicRef.value = updatedMusic;
  musicID.value = id;
};

const handleSubmitAddMusic = async () => {
  if (
    newMusic.artist &&
    newMusic.title &&
    (!newMusic.link || URLRegex.test(String(newMusic.link))) &&
    (!newMusic.imageURL || URLRegex.test(String(newMusic.imageURL)))
  ) {
    await submitAddMusic(newMusic);
    snackbar.value = { text: "Music Added", value: true };
    addMusicModal.value = false;

    newMusic.artist = "";
    newMusic.category = EMusicCategory.JAPANESE;
    newMusic.favourites = false;
    newMusic.imageURL = "";
    newMusic.link = "";
    newMusic.title = "";
  }
};

const handleSubmitEditMusic = async () => {
  await submitEditMusic(musicID.value, musicRef.value);
  snackbar.value = { text: "Music Updated", value: true };
  editMusicModal.value = false;
};

onMounted(() => console.log(music.value));
</script>
<style scoped>
/* .image-overlay-icon {
  position: absolute;
  right: 5px;
  top: 5px;
} */
/* .delete-dialog-position {
  margin-top: -50vh;
}
.media-music-img {
  max-height: 260px;
}
.media-music-card {
  max-width: 350px;
}
@media (max-width: 3250px) {
  .media-music-img {
    max-height: 260px;
  }
  .media-music-card {
    max-width: 350px;
  }
}
@media (max-width: 2560px) {
  .media-music-img {
    max-height: 210px;
  }
  .media-music-card {
    max-width: 280px;
  }
}
@media (max-width: 2550px) {
  .media-music-img {
    max-height: 210px;
  }
  .media-music-card {
    max-width: 280px;
  }
}
@media (max-width: 1920px) {
  .media-music-img {
    max-height: 205px;
  }
  .media-music-card {
    max-width: 275px;
  }
}
@media (max-width: 1440px) {
  .media-music-img {
    max-height: 260px;
  }
  .media-music-card {
    max-width: 350px;
  }
}
@media (max-width: 1280px) {
  .media-music-img {
    max-height: 200px;
  }
  .media-music-card {
    max-width: 270px;
  }
}
@media (max-width: 1024px) {
  .media-music-img {
    max-height: 270px;
  }
  .media-music-card {
    max-width: 400px;
  }
}
@media (max-width: 960px) {
  .media-music-img {
    max-height: 270px;
  }
  .media-music-card {
    max-width: 370px;
  }
}
@media (max-width: 880px) {
  .media-music-img {
    max-height: 255px;
  }
  .media-music-card {
    max-width: 340px;
  }
}
@media (max-width: 768px) {
  .media-music-img {
    max-height: 230px;
  }
  .media-music-card {
    max-width: 310px;
  }
}
@media (max-width: 700px) {
  .media-music-img {
    max-height: 205px;
  }
  .media-music-card {
    max-width: 275px;
  }
}
@media (max-width: 630px) {
  .media-music-img {
    max-height: 185px;
  }
  .media-music-card {
    max-width: 250px;
  }
}
@media (max-width: 580px) {
  .media-music-img {
    max-height: 155px;
  }
  .media-music-card {
    max-width: 210px;
  }
}
@media (max-width: 500px) {
  .media-music-img {
    max-height: 125px;
  }
  .media-music-card {
    max-width: 170px;
  }
}
@media (max-width: 425px) {
  .media-music-img {
    max-height: 110px;
  }
  .media-music-card {
    max-width: 145px;
  }
}
@media (max-width: 375px) {
  .media-music-img {
    max-height: 90px;
  }
  .media-music-card {
    max-width: 120px;
  }
}
@media (max-width: 320px) {
  .media-music-img {
    max-height: 90px;
  }
  .media-music-card {
    max-width: 120px;
  }
} */
</style>
