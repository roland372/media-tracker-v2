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
  <HeaderComponent title="Favourite Music"> </HeaderComponent>
  <HeaderComponent title="All Music"> </HeaderComponent>
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
            autofocus
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Title"
            :rules="stringRules('Title')"
            variant="outlined"
          />
          <v-text-field
            v-model="newMusic.link"
            autofocus
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Link"
            variant="outlined"
          />
          <v-text-field
            v-model="newMusic.link"
            autofocus
            class="mb-2"
            density="compact"
            hide-details="auto"
            label="Link"
            variant="outlined"
          />
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
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { filter, orderBy } from "lodash";
import {
  stringRules,
  URLRegex,
  URLRules,
} from "@/utils/validations/formValidations";
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
  await submitAddMusic(newMusic);
  snackbar.value = { text: "Music Added", value: true };
  addMusicModal.value = false;

  newMusic.artist = "";
  newMusic.category = EMusicCategory.JAPANESE;
  newMusic.favourites = false;
  newMusic.imageURL = "";
  newMusic.link = "";
  newMusic.title = "";
};

const handleSubmitEditMusic = async () => {
  await submitEditMusic(musicID.value, musicRef.value);
  snackbar.value = { text: "Music Updated", value: true };
  editMusicModal.value = false;
};

onMounted(() => console.log(music.value));
</script>
<style scoped>
.image-overlay-icon {
  position: absolute;
  right: 5px;
  top: 5px;
}
.delete-dialog-position {
  margin-top: -50vh;
}
</style>
